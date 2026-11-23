import { createHmac, randomBytes, randomInt } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const folder = new URL('../.local/sincronizzazione/', import.meta.url);

export function generateCode(excluded = []) {
  let code;
  do {
    code = Array.from({ length: 8 }, () => alphabet[randomInt(alphabet.length)]).join('');
  } while (excluded.includes(code));
  return code;
}

export function digestCode(secret, code) {
  return createHmac('sha256', secret).update('code:' + code).digest('hex');
}

export function localEnvironment(secret, options = {}) {
  return new Miniflare({
    host: '127.0.0.1',
    modules: true,
    scriptPath: fileURLToPath(new URL('worker.mjs', import.meta.url)),
    compatibilityDate: '2026-07-30',
    bindings: { SYNC_SECRET: secret },
    d1Databases: { DB: 'studio-demo' },
    ...options,
  });
}

export async function prepareDatabase(env, secret, profiles) {
  const db = await env.getD1Database('DB');
  const schema = await readFile(new URL('schema.sql', import.meta.url), 'utf8');
  const statements = schema.split(';').map(statement => statement.trim()).filter(Boolean);
  await db.batch(statements.map(statement => db.prepare(statement)));
  await db.batch(profiles.map(({ id, code }) => db.prepare(`
    INSERT INTO profiles (id, code_digest) VALUES (?1, ?2)
    ON CONFLICT (id) DO NOTHING
  `).bind(id, digestCode(secret, code))));
  return db;
}

async function readLocalProfiles() {
  await mkdir(folder, { recursive: true });
  const file = new URL('profili-demo.json', folder);
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const code = generateCode();
  const setup = {
    secret: randomBytes(32).toString('hex'),
    profiles: [{ id: 'demo-1', code }, { id: 'demo-2', code: generateCode([code]) }],
  };
  try {
    await writeFile(file, JSON.stringify(setup, null, 2), { flag: 'wx', mode: 0o600 });
    return setup;
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    return JSON.parse(await readFile(file, 'utf8'));
  }
}

if (import.meta.main) {
  const setup = await readLocalProfiles();
  const env = localEnvironment(setup.secret, {
    port: 8787,
    d1Persist: fileURLToPath(new URL('database/', folder)),
  });
  try {
    await prepareDatabase(env, setup.secret, setup.profiles);
    if (process.argv.includes('--init')) {
      await env.dispose();
      console.log('Database di prova inizializzato.');
    } else {
      console.log('Database di prova attivo su ' + await env.ready);
    }
    console.log('I codici restano in .local/sincronizzazione/profili-demo.json.');
  } catch (error) {
    await env.dispose();
    throw error;
  }
}
