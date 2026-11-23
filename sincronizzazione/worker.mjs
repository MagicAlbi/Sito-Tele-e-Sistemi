const CODE_PATTERN = /^[A-HJ-NP-Z2-9]{8}$/;
const TOKEN_PATTERN = /^Bearer ([a-f0-9]{64})$/;
const WINDOW_SECONDS = 300;
const SESSION_SECONDS = 30 * 24 * 60 * 60;
const MAX_BODY_BYTES = 1024;
const encoder = new TextEncoder();

const activeProfile = `
  FROM sessions AS s JOIN profiles AS p ON p.id = s.profile_id
  WHERE s.token_digest = ?1 AND s.expires_at > ?2
    AND s.code_version = p.code_version
`;

function hex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function digestToken(token) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(token));
  return hex(new Uint8Array(digest));
}

async function digestPrivate(secret, purpose, value) {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const digest = await crypto.subtle.sign('HMAC', key, encoder.encode(purpose + ':' + value));
  return hex(new Uint8Array(digest));
}

function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function denied() {
  return json({ error: 'Accesso non valido.' }, 401);
}

async function readObject(request) {
  if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json' || !request.body) {
    return null;
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let length = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) return null;
      text += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(text + decoder.decode());
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  } finally {
    if (length > MAX_BODY_BYTES) void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

async function countAttempt(db, scope, windowStart, limit) {
  const result = await db.prepare(`
    INSERT INTO login_attempts (scope, window_start, attempts) VALUES (?1, ?2, 1)
    ON CONFLICT (scope) DO UPDATE SET
      window_start = excluded.window_start,
      attempts = CASE WHEN login_attempts.window_start = excluded.window_start
        THEN login_attempts.attempts + 1 ELSE 1 END
    WHERE login_attempts.window_start < excluded.window_start OR login_attempts.attempts < ?3
    RETURNING attempts
  `).bind(scope, windowStart, limit).first();
  return result !== null;
}

async function signIn(request, env, now) {
  const data = await readObject(request);
  const code = typeof data?.code === 'string' ? data.code.trim().toUpperCase() : '';
  if (!CODE_PATTERN.test(code)) return denied();

  // Cloudflare sets this header at the edge. An absent address shares one limit.
  const source = request.headers.get('CF-Connecting-IP') || 'unknown';
  const sourceDigest = await digestPrivate(env.SYNC_SECRET, 'source', source);
  const windowStart = now - now % WINDOW_SECONDS;
  if (!await countAttempt(env.DB, 'source:' + sourceDigest, windowStart, 100) ||
      !await countAttempt(env.DB, 'global', windowStart, 300)) {
    return json({ error: 'Troppi tentativi. Riprova tra poco.' }, 429, {
      'Retry-After': String(windowStart + WINDOW_SECONDS - now),
    });
  }

  const codeDigest = await digestPrivate(env.SYNC_SECRET, 'code', code);
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const tokenDigest = await digestToken(token);
  const expiresAt = now + SESSION_SECONDS;
  // The code check and session creation share a statement to handle code rotation safely.
  const session = await env.DB.prepare(`
    INSERT INTO sessions (token_digest, profile_id, code_version, expires_at)
    SELECT ?1, id, code_version, ?2 FROM profiles WHERE code_digest = ?3
    RETURNING expires_at
  `).bind(tokenDigest, expiresAt, codeDigest).first();
  if (!session) return denied();

  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE expires_at <= ?1').bind(now),
    env.DB.prepare('DELETE FROM login_attempts WHERE window_start < ?1').bind(windowStart),
  ]);
  return json({ token, expiresAt });
}

async function profileAction(request, db, now, path) {
  const token = TOKEN_PATTERN.exec(request.headers.get('Authorization') || '')?.[1];
  if (!token) return denied();
  const tokenDigest = await digestToken(token);

  if (path === '/session') {
    await db.prepare('DELETE FROM sessions WHERE token_digest = ?1').bind(tokenDigest).run();
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  }

  if (request.method === 'GET') {
    const saved = await db.prepare(`SELECT p.progress ${activeProfile}`).bind(tokenDigest, now).first();
    return saved ? json(JSON.parse(saved.progress)) : denied();
  }

  const progress = await readObject(request);
  if (Object.keys(progress ?? {}).length !== 1 || typeof progress.completed !== 'boolean') {
    return json({ error: 'Dati di prova non validi.' }, 400);
  }
  // Resolve the owner from the session inside the write, even if the code is rotated concurrently.
  const saved = await db.prepare(`
    UPDATE profiles SET progress = ?3 WHERE id = (SELECT p.id ${activeProfile})
    RETURNING progress
  `).bind(tokenDigest, now, JSON.stringify(progress)).first();
  return saved ? json(JSON.parse(saved.progress)) : denied();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const route = request.method + ' ' + url.pathname;
    if (url.search || !['POST /session', 'DELETE /session', 'GET /progress', 'PUT /progress'].includes(route)) {
      return json({ error: 'Percorso non disponibile.' }, 404);
    }
    if (!/^[a-f0-9]{64}$/.test(env.SYNC_SECRET || '') || !env.DB) {
      return json({ error: 'Servizio non disponibile.' }, 503);
    }

    const now = Math.floor(Date.now() / 1000);
    try {
      if (route === 'POST /session') return await signIn(request, env, now);
      return await profileAction(request, env.DB, now, url.pathname);
    } catch {
      return json({ error: 'Servizio non disponibile. Riprova tra poco.' }, 503);
    }
  },
};
