import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { test } from 'node:test';
import { digestCode, generateCode, localEnvironment, prepareDatabase } from './ambiente-locale.mjs';

async function fixture(t) {
  const secret = randomBytes(32).toString('hex');
  const firstCode = generateCode();
  const secondCode = generateCode([firstCode]);
  const env = localEnvironment(secret);
  t.after(() => env.dispose());
  const db = await prepareDatabase(env, secret, [
    { id: 'demo-1', code: firstCode },
    { id: 'demo-2', code: secondCode },
  ]);

  function request(path, { method = 'GET', token, body, source } = {}) {
    const headers = {};
    if (token) headers.Authorization = 'Bearer ' + token;
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (source) headers['CF-Connecting-IP'] = source;
    return env.dispatchFetch(new URL(path, 'http://localhost'), {
      method, headers, body: body === undefined ? undefined : JSON.stringify(body),
    });
  }

  function login(code, source) {
    return request('/session', { method: 'POST', body: { code }, source });
  }

  return { db, secret, firstCode, secondCode, request, login };
}

async function session(response) {
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const { token, expiresAt } = await response.json();
  assert.ok(/^[a-f0-9]{64}$/.test(token));
  const remaining = expiresAt - Math.floor(Date.now() / 1000);
  assert.ok(remaining >= 30 * 24 * 60 * 60 - 10 && remaining <= 30 * 24 * 60 * 60);
  return token;
}

test('I due profili leggono e modificano solo i propri dati', async t => {
  const { request, login, firstCode, secondCode } = await fixture(t);
  const validCode = /^[A-HJ-NP-Z2-9]{8}$/;
  assert.ok(firstCode !== secondCode && validCode.test(firstCode) && validCode.test(secondCode));
  assert.equal((await login(generateCode([firstCode, secondCode]))).status, 401);
  assert.equal((await request('/progress')).status, 401);
  assert.equal((await request('/progress', { method: 'PUT', body: { completed: true } })).status, 401);

  const first = await session(await login(firstCode.toLowerCase()));
  const second = await session(await login(secondCode));
  assert.equal((await request('/progress', {
    method: 'PUT', token: first, body: { completed: true },
  })).status, 200);
  assert.deepEqual(await (await request('/progress', { token: first })).json(), { completed: true });
  assert.deepEqual(await (await request('/progress', { token: second })).json(), {});
  assert.equal((await request('/progress?profile=demo-2', { token: first })).status, 404);
  assert.equal((await request('/progress/demo-2', { token: first })).status, 404);
  assert.equal((await request('/progress', {
    method: 'PUT', token: first, body: { completed: false, profileId: 'demo-2' },
  })).status, 400);
  assert.equal((await request('/progress', {
    method: 'PUT', token: second, body: { completed: false },
  })).status, 200);
  assert.deepEqual(await (await request('/progress', { token: first })).json(), { completed: true });
  assert.deepEqual(await (await request('/progress', { token: second })).json(), { completed: false });
});

test('La sostituzione del codice revoca le sessioni e conserva i progressi', async t => {
  const { db, secret, request, login, firstCode, secondCode } = await fixture(t);
  const first = await session(await login(firstCode));
  const another = await session(await login(firstCode));
  const second = await session(await login(secondCode));
  assert.equal((await request('/progress', {
    method: 'PUT', token: first, body: { completed: true },
  })).status, 200);

  const replacement = generateCode([firstCode, secondCode]);
  await db.prepare(`
    UPDATE profiles SET code_digest = ?1, code_version = code_version + 1 WHERE id = ?2
  `).bind(digestCode(secret, replacement), 'demo-1').run();

  assert.equal((await login(firstCode)).status, 401);
  assert.equal((await request('/progress', { token: first })).status, 401);
  assert.equal((await request('/progress', {
    method: 'PUT', token: another, body: { completed: false },
  })).status, 401);
  assert.equal((await request('/progress', { token: second })).status, 200);

  const updated = await session(await login(replacement));
  assert.deepEqual(await (await request('/progress', { token: updated })).json(), { completed: true });
  assert.equal((await request('/session', { method: 'DELETE', token: updated })).status, 204);
  assert.equal((await request('/progress', { token: updated })).status, 401);
});

test('I tentativi cambiano codice ma consumano comunque il limite per indirizzo e quello globale', async t => {
  const { db, login, firstCode, secondCode } = await fixture(t);
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - now % 300;
  // Preload earlier attempts to keep the test small and exercise the real thresholds.
  await db.prepare('INSERT INTO login_attempts VALUES (?1, ?2, ?3)').bind('global', windowStart, 297).run();

  const excluded = [firstCode, secondCode];
  const wrong1 = generateCode(excluded);
  const wrong2 = generateCode([...excluded, wrong1]);
  const source = '192.0.2.1';
  assert.equal((await login(wrong1, source)).status, 401);
  const local = await db.prepare("SELECT scope FROM login_attempts WHERE scope <> 'global'").first();
  await db.prepare('UPDATE login_attempts SET attempts = 99 WHERE scope = ?1').bind(local.scope).run();

  assert.equal((await login(wrong2, source)).status, 401);
  const limited = await login(firstCode, source);
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('Retry-After')) > 0);
  assert.equal((await login(wrong1, '192.0.2.2')).status, 401);
  assert.equal((await login(secondCode, '192.0.2.3')).status, 429);

  await db.prepare('UPDATE login_attempts SET window_start = window_start - 300').run();
  await session(await login(firstCode, source));
});

test('Ottanta accessi dalla stessa rete rientrano nel limite', async t => {
  const { login, firstCode, secondCode } = await fixture(t);
  const attempts = Array.from({ length: 80 }, (_, index) =>
    login(index % 2 ? firstCode : secondCode, '192.0.2.1')
  );
  for (const response of await Promise.all(attempts)) await session(response);
});
