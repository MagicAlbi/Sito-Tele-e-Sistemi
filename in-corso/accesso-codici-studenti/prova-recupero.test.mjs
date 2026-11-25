import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { localEnvironment, prepareDatabase, generateCode } from '../../../Bozze sito/sincronizzazione/ambiente-locale.mjs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../Bozze sito/sincronizzazione/package.json', import.meta.url));
const { Miniflare } = require('miniflare');
const workerPath = name => fileURLToPath(new URL(name, import.meta.url));

test('L’area privata genera codici compatibili, aggiorna i nominativi e preserva il progresso dopo la rotazione', async t => {
  const secret = randomBytes(32).toString('hex');
  const studentSecret = randomBytes(32).toString('hex');
  const password = randomBytes(24).toString('base64url');
  const digest = value => createHash('sha256').update(value).digest('hex');
  const origin = 'https://area.example.test';
  const common = { modules: true, compatibilityDate: '2026-07-30', d1Databases: { DB: 'studio-demo' } };
  const runtime = new Miniflare({ workers: [
    { ...common, name: 'docente', scriptPath: workerPath('docente.mjs'),
      bindings: { SYNC_SECRET: secret, TEACHER_PASSWORD_SHA256: digest(password) } },
    { ...common, name: 'studio', scriptPath: workerPath('studenti.mjs'),
      bindings: { SYNC_SECRET: studentSecret },
      serviceBindings: { VERIFICA_DOCENTE: { name: 'docente', entrypoint: 'VerificaCodice' } } },
  ] });
  t.after(() => runtime.dispose());
  const legacyCode = generateCode();
  const db = await prepareDatabase(runtime, studentSecret, [{ id: 'solo-prova', code: legacyCode }]);
  const schema = await readFile(new URL('../../../Bozze sito/sincronizzazione/docente-schema.sql', import.meta.url), 'utf8');
  await db.batch(schema.split(';').map(sql => sql.trim()).filter(Boolean).map(sql => db.prepare(sql)));
  const studio = await runtime.getWorker('studio');
  let session;
  const request = (path, { form, signedIn = true, source = origin, ip = '192.0.2.1' } = {}) => runtime.dispatchFetch(
    new URL(path, origin).href, {
      redirect: 'manual',
      method: form ? 'POST' : 'GET',
      headers: { ...(form ? { Origin: source, 'Content-Type': 'application/x-www-form-urlencoded' } : {}), ...(signedIn && session ? { Cookie: session } : {}),
        'CF-Connecting-IP': ip },
      body: form ? new URLSearchParams(form).toString() : undefined,
    },
  );
  const gateResponse = await request('/docente/');
  assert.equal(gateResponse.headers.get('Referrer-Policy'), 'same-origin');
  const gate = await gateResponse.text();
  assert.match(gate, /Password personale/);
  assert.doesNotMatch(gate, /Nuova classe/);
  const form = { anno: '2026/2027', classe: '5X', numero: '3' };
  assert.equal((await request('/docente/crea', { form })).status, 403);
  const wrong = { password: 'una-password-errata' };
  assert.equal((await request('/docente/accesso', { form: wrong, source: 'null' })).status, 403);
  for (let attempt = 0; attempt < 6; attempt++) {
    assert.equal((await request('/docente/accesso', { form: wrong, ip: '192.0.2.2' })).status, 401);
  }
  assert.equal((await request('/docente/accesso', { form: wrong, ip: '192.0.2.2' })).status, 429);
  const signedIn = await request('/docente/accesso', { form: { password } });
  assert.equal(signedIn.status, 303);
  const cookie = signedIn.headers.get('Set-Cookie');
  assert.match(cookie, /HttpOnly; Secure; SameSite=Lax/);
  session = cookie.split(';')[0];
  assert.equal((await request('/docente/crea', { form, source: 'https://altro.example.test' })).status, 403);
  const created = await request('/docente/crea', { form });
  assert.equal(created.status, 303);
  assert.equal((await request('/docente/crea', { form })).status, 409);
  const path = created.headers.get('Location');
  const area = await request(path);
  assert.match(area.headers.get('Cache-Control'), /no-store/);
  assert.match(await (await request('/docente/stile.css')).text(), /progress-value.*--success/);
  const body = await area.text();
  const code = body.match(/<code>([A-HJ-NP-Z2-9]{8})<\/code>/)?.[1];
  assert.ok(code?.length === 8);
  assert.equal([...body.matchAll(/<code>[A-HJ-NP-Z2-9]{8}<\/code>/g)].length, 3);
  assert.equal((await request(path, { signedIn: false })).status, 403);
  const action = body.match(/action="([^"]+\/nome)"/)[1];
  const roster = await request(action, { form: { nome: 'Nora', cognome: "D'Orma" } });
  assert.equal(roster.status, 303);
  const login = value => studio.fetch('https://allievi.example.test/session', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: value }),
  });
  assert.equal((await login(legacyCode)).status, 200);
  const initial = await login(code);
  assert.equal(initial.status, 200);
  const oldSession = (await initial.json()).token;
  const progress = token => studio.fetch('https://allievi.example.test/studio', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const saved = await studio.fetch('https://allievi.example.test/studio', {
    method: 'PUT', headers: { Authorization: 'Bearer ' + oldSession, 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'lesson', key: 'm1-1', value: { done: true }, revision: 0 }),
  });
  assert.equal(saved.status, 200);
  const updated = await request(action.replace(/nome$/, 'sostituisci'), { form: {} });
  assert.equal(updated.status, 303);
  assert.equal((await login(code)).status, 401);
  assert.equal((await progress(oldSession)).status, 401);
  const renewed = await (await request(updated.headers.get('Location'))).text();
  assert.match(renewed, /value="D&#39;Orma"/);
  assert.match(renewed, />1\/6</);
  const newCode = renewed.match(/<code>([A-HJ-NP-Z2-9]{8})<\/code>/)?.[1];
  assert.ok(newCode && newCode !== code);
  const nextLogin = await login(newCode);
  assert.equal(nextLogin.status, 200);
  const remote = await progress((await nextLogin.json()).token);
  assert.deepEqual((await remote.json()).records, [{ kind: 'lesson', key: 'm1-1', value: { done: true }, revision: 1 }]);
  const stored = await db.prepare('SELECT encrypted_name, encrypted_code FROM teacher_roster WHERE encrypted_name IS NOT NULL').first();
  assert.ok(!stored.encrypted_name.includes('Nora') && !stored.encrypted_code.includes(newCode));
  assert.equal((await request('/improntaCodice', { signedIn: false })).status, 403);
  const neverIssued = generateCode([legacyCode, code, newCode, ...[...body.matchAll(/<code>([A-HJ-NP-Z2-9]{8})<\/code>/g)].map(match => match[1])]);
  const rejected = await login(neverIssued);
  assert.equal(rejected.status, 401);
  let limited = false;
  for (let attempt = 0; attempt <= 100; attempt++) {
    const result = await login(neverIssued);
    if (result.status === 429) {
      limited = true;
      break;
    }
    assert.equal(result.status, 401);
  }
  assert.ok(limited);
});
