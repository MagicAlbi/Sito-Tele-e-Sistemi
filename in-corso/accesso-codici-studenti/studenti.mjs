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

async function readObject(request, maxBytes = MAX_BODY_BYTES) {
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
      if (length > maxBytes) return null;
      text += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(text + decoder.decode());
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  } finally {
    if (length > maxBytes) void reader.cancel().catch(() => {});
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
  const insertSession = env.DB.prepare(`
    INSERT INTO sessions (token_digest, profile_id, code_version, expires_at)
    SELECT ?1, id, code_version, ?2 FROM profiles WHERE code_digest = ?3
    RETURNING expires_at
  `);
  let session = await insertSession.bind(tokenDigest, expiresAt, codeDigest).first();
  if (!session && env.VERIFICA_DOCENTE) {
    const teacherDigest = await env.VERIFICA_DOCENTE.improntaCodice(code);
    session = await insertSession.bind(tokenDigest, expiresAt, teacherDigest).first();
  }
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
    if (request.method === 'GET') {
      const session = await db.prepare(`SELECT s.expires_at ${activeProfile}`).bind(tokenDigest, now).first();
      return session ? json({ expiresAt: session.expires_at }) : denied();
    }
    await db.prepare('DELETE FROM sessions WHERE token_digest = ?1').bind(tokenDigest).run();
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  }

  if (path === '/studio') return studyAction(request, db, tokenDigest, now);

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

function studyRecord(row) {
  return { kind: row.kind, key: row.record_key, value: JSON.parse(row.payload), revision: row.revision };
}

async function studyAction(request, db, tokenDigest, now) {
  if (request.method === 'GET') {
    const { results } = await db.prepare(`
      WITH owner AS (SELECT p.id ${activeProfile})
      SELECT r.kind, r.record_key, r.payload, r.revision
      FROM owner LEFT JOIN study_records r ON r.profile_id = owner.id
      ORDER BY r.kind, r.record_key
    `).bind(tokenDigest, now).all();
    return results.length ? json({ records: results.filter(row => row.kind !== null).map(studyRecord) }) : denied();
  }

  const data = await readObject(request, 48 * 1024);
  const { kind, key, value, revision } = data ?? {};
  if (Object.keys(data ?? {}).length !== 4 || !['lesson', 'quiz', 'highlight', 'note'].includes(kind) ||
      typeof key !== 'string' || !/^[a-zA-Z0-9:_-]{1,100}$/.test(key) ||
      !Number.isSafeInteger(revision) || revision < 0 || revision >= Number.MAX_SAFE_INTEGER ||
      (value !== null && (!value || typeof value !== 'object' || Array.isArray(value)))) {
    return json({ error: 'Dati di studio non validi.' }, 400);
  }

  // Revision checks prevent an older change from overwriting another device's update.
  // Keep a revision even after deletion so an older copy cannot restore the item.
  const updated = await db.prepare(`
    WITH owner AS (SELECT p.id ${activeProfile})
    INSERT INTO study_records (profile_id, kind, record_key, payload, revision)
    SELECT id, ?3, ?4, ?5, 1 FROM owner
    WHERE ?6 = 0 OR EXISTS (
      SELECT 1 FROM study_records r
      WHERE r.profile_id = owner.id AND r.kind = ?3 AND r.record_key = ?4 AND r.revision = ?6
    )
    ON CONFLICT (profile_id, kind, record_key)
    DO UPDATE SET payload = excluded.payload, revision = study_records.revision + 1
    WHERE study_records.revision = ?6
    RETURNING kind, record_key, payload, revision
  `).bind(tokenDigest, now, kind, key, JSON.stringify(value), revision).first();
  if (updated) return json(studyRecord(updated));

  const active = await db.prepare(`SELECT 1 ${activeProfile}`).bind(tokenDigest, now).first();
  return active ? json({ error: 'Il dato è già cambiato. Aggiorna prima di riprovare.' }, 409) : denied();
}

const methods = new Map([
  ['/session', ['GET', 'POST', 'DELETE']],
  ['/progress', ['GET', 'PUT']],
  ['/studio', ['GET', 'PUT']],
]);

function withOrigin(response, origin) {
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Vary', 'Origin');
  }
  return response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    if (origin && origin !== env.STUDY_ORIGIN) {
      return json({ error: 'Origine non autorizzata.' }, 403, { Vary: 'Origin' });
    }
    const reply = response => withOrigin(response, origin);
    const allowed = methods.get(url.pathname);
    if (url.search || !allowed) return reply(json({ error: 'Percorso non disponibile.' }, 404));

    if (request.method === 'OPTIONS' && origin) {
      return reply(new Response(null, { status: 204, headers: {
        'Access-Control-Allow-Methods': allowed.join(', '),
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '600',
      } }));
    }
    if (!allowed.includes(request.method)) {
      return reply(json({ error: 'Operazione non disponibile.' }, 405, { Allow: allowed.join(', ') }));
    }
    if (!/^[a-f0-9]{64}$/.test(env.SYNC_SECRET || '') || !env.DB) {
      return reply(json({ error: 'Servizio non disponibile.' }, 503));
    }

    const now = Math.floor(Date.now() / 1000);
    try {
      const response = url.pathname === '/session' && request.method === 'POST'
        ? await signIn(request, env, now)
        : await profileAction(request, env.DB, now, url.pathname);
      return reply(response);
    } catch {
      return reply(json({ error: 'Servizio non disponibile. Riprova tra poco.' }, 503));
    }
  },
};

