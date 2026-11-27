import { WorkerEntrypoint } from 'cloudflare:workers';
// Il valore SHA-256 nella politica degli script corrisponde a THEME_BOOTSTRAP.
const THEME_BOOTSTRAP = `(() => {
  const url = new URL(location.href);
  const requested = url.searchParams.get('tema');
  if (requested === 'dark' || requested === 'light') {
    document.documentElement.dataset.theme = requested;
    try {
      localStorage.setItem('tele5a-docente:theme', requested);
      url.searchParams.delete('tema');
      history.replaceState(history.state, '', url);
    } catch {}
    return;
  }
  try {
    const saved = localStorage.getItem('tele5a-docente:theme');
    if (saved === 'light') document.documentElement.dataset.theme = saved;
  } catch {}
})();`;
const SITE = 'https://magicalbi.github.io/Sito-Tele-e-Sistemi/';
const CSS = ".teacher-main { grid-column: 1 / -1; }\n.teacher-wrap { max-width: 1180px; }\n.teacher-trail { color: var(--text-muted); font-size: .86rem; margin: 0 0 1rem; }\n.teacher-trail a { color: var(--primary); }\n.teacher-trail span { margin: 0 .35rem; }\n.teacher-intro { display: flex; align-items: start; justify-content: space-between; gap: 1rem; padding: 1.4rem 0 2rem; }\n.teacher-intro h1, .teacher-gate h1 { font-size: clamp(2rem, 5vw, 3.35rem); letter-spacing: -.05em; line-height: 1.05; }\n.teacher-intro p, .teacher-gate p { color: var(--text-muted); margin-top: .6rem; }\n.teacher-badge { display: inline-flex; width: fit-content; padding: .2rem .65rem; border: 1px solid var(--border-2); border-radius: 99px; color: var(--text-muted); font-size: .75rem; white-space: nowrap; }\n.teacher-card { padding: clamp(1rem, 2.5vw, 1.6rem); border: 1px solid var(--border-2); border-radius: var(--r-lg); background: var(--surface); }\n.teacher-card h2, .teacher-line h2 { font-size: 1.22rem; margin-bottom: .75rem; }\n.teacher-create { display: grid; grid-template-columns: 1.15fr 1fr .9fr auto; align-items: end; gap: .85rem; }\n.teacher-wrap label { display: grid; gap: .3rem; color: var(--text-muted); font-size: .8rem; }\n.teacher-wrap input, .teacher-wrap select { width: 100%; min-width: 0; padding: .5rem .55rem; background: var(--bg); color: var(--text); border: 1px solid var(--border-2); border-radius: var(--r-sm); font: inherit; }\n.teacher-wrap :focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }\n.teacher-classes { margin-top: 2rem; }\n.teacher-line { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: .5rem; margin-bottom: .75rem; }\n.teacher-line form { display: flex; align-items: end; gap: .5rem; }\n.teacher-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(100%,14rem),1fr)); gap: .9rem; }\n.teacher-class { display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto; color: var(--text); text-decoration: none; }\n.teacher-class:hover { border-color: var(--primary); }\n.teacher-class strong { font-size: 1.55rem; color: var(--primary); line-height: 1.2; }\n.teacher-class span:not(.teacher-arrow) { color: var(--text-muted); font-size: .85rem; }\n.teacher-arrow { grid-area: 1 / 2 / 3 / 3; align-self: center; color: var(--primary); }\n.teacher-muted { color: var(--text-muted); font-size: .8rem; }\n.teacher-alert { margin: 0 0 1rem; padding: .65rem .9rem; border-left: 3px solid var(--primary); background: var(--primary-subtle); }\n.teacher-table { overflow-x: auto; }\n.teacher-table table { width: 100%; min-width: 900px; border-collapse: collapse; }\n.teacher-table :is(th,td) { text-align: left; vertical-align: middle; padding: .33rem .4rem; border-bottom: 1px solid var(--border); }\n.teacher-table thead th { vertical-align: top; font-size: .78rem; color: var(--text-muted); }\n.teacher-table .teacher-module { min-width: 89px; }\n.teacher-module strong { display: block; color: var(--text); font-size: .74rem; }\n.teacher-module span { display: block; max-width: 15ch; margin-top: .12rem; font-size: .69rem; line-height: 1.2; font-weight: 500; }\n.teacher-table td:first-child { width: 29%; }\n.teacher-table td:nth-child(2) { width: 17%; }\n.teacher-table tr { scroll-margin-top: calc(var(--header-h) + .75rem); }\n.teacher-table tr:target td { background: var(--primary-subtle); }\n.teacher-table td code { color: var(--primary); letter-spacing: .04em; white-space: nowrap; }\n.teacher-person { display: grid; grid-template-columns: 1.35rem minmax(5rem,1fr) minmax(5rem,1fr) auto; align-items: center; gap: .26rem; }\n.teacher-person > span { text-align: center; font-family: var(--font-mono); }\n.teacher-person input { padding: .22rem .36rem; font-size: .8rem; }\n.teacher-code { display: flex; align-items: center; gap: .35rem; white-space: nowrap; }\n.teacher-table .btn { padding: .23rem .38rem; font-size: .7rem; }\n.teacher-numeric { font: .85rem var(--font-mono); }\n.teacher-table progress {\n  appearance: none;\n  display: block;\n  width: 3.1rem;\n  height: .28rem;\n  margin-top: .18rem;\n  border: 0;\n  border-radius: 99px;\n  overflow: hidden;\n  background: var(--surface-3);\n  accent-color: var(--success);\n}\n.teacher-table progress::-webkit-progress-bar { background: var(--surface-3); }\n.teacher-table progress::-webkit-progress-value { background: var(--success); }\n.teacher-table progress::-moz-progress-bar { background: var(--success); }\n.teacher-gate { max-width: 34rem; padding: clamp(1.4rem,4vw,2.2rem); }\n.teacher-gate h1 { margin-top: .9rem; }\n.teacher-gate form { margin-top: 1.2rem; }\n@media (max-width: 700px) {\n  .teacher-intro { flex-direction: column; }\n  .teacher-create { grid-template-columns: repeat(2,minmax(0,1fr)); }\n}\n@media (max-width: 410px) {\n  .teacher-create { grid-template-columns: 1fr; }\n}\n";
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const studentNameOrder = new Intl.Collator('it', { sensitivity: 'accent' });
const cookieName = '__Host-tele5a-docente';
const sessionLength = 10 * 60;
const loginWindow = 10 * 60;
const headers = {
  'Cache-Control': 'private, no-store',
  'Content-Security-Policy': "default-src 'none'; style-src 'self' https://magicalbi.github.io https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self' 'sha256-+JqcPkWhO2S3nJFPbmCwgjc4XxwqW3j1EUe37tPW1DA='; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'Referrer-Policy': 'same-origin',
  'X-Content-Type-Options': 'nosniff',
};

const modules = [
  ['Reti locali wireless', 6],
  ['Sistemi di accesso remoto e reti WAN', 5],
  ['Tecniche di trasmissione digitali', 6],
  ['Sistemi di comunicazione in mobilità', 4],
  ['Reti convergenti multiservizio', 5],
];

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

function response(body, status = 200, type = 'text/html', extra = {}) {
  return new Response(body, { status, headers: { ...headers, 'Content-Type': type + '; charset=utf-8', ...extra } });
}

function redirect(location, extra = {}) {
  return response(null, 303, 'text/plain', { Location: location, ...extra });
}

function schoolYear() {
  const date = new Date();
  const year = date.getUTCFullYear() - Number(date.getUTCMonth() < 8);
  return year + '/' + (year + 1);
}

function page(title, body, expiresAt = 0) {
  const signedIn = expiresAt > 0;
  const sessionTime = signedIn ? ` data-session-ms="${Math.max(0, expiresAt * 1000 - Date.now())}"` : '';
  return `<!doctype html><html lang="it" data-theme="dark"${sessionTime}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script>${THEME_BOOTSTRAP}</script>
<title>${esc(title)} · Area docente</title>
<link rel="stylesheet" href="${SITE}assets/css/style.css"><link rel="stylesheet" href="/docente/stile.css">
</head><body><div class="app-layout"><header class="site-header">
<a class="logo-link" href="${SITE}"><div class="logo-icon" aria-hidden="true"><svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#10213a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="1.8"/><path d="M8.5 6.5a5 5 0 0 0 0 7m7-7a5 5 0 0 1 0 7M5.5 3.5a9 9 0 0 0 0 13m13-13a9 9 0 0 1 0 13M11.3 12l-3.2 8h7.8l-3.2-8"/></svg></div>
<div class="logo-text"><span class="logo-title text-gradient">Telecomunicazioni</span>
<span class="logo-sub">IIS J.C. Maxwell · Area docente</span></div></a>
<div class="header-actions">${signedIn ? '<form method="post" action="/docente/esci"><button class="btn btn-ghost">Esci</button></form>' : ''}
<button class="btn btn-icon btn-ghost" data-theme-toggle aria-label="Cambia tema"><svg aria-hidden="true" data-theme-icon="dark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg aria-hidden="true" data-theme-icon="light" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button></div>
</header><main class="main-content teacher-main"><div class="content-wrap teacher-wrap">${body}
</div></main></div><script src="/docente/pannello.js" defer></script></body></html>`;
}

async function readForm(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded') || !request.body) return null;
  const reader = request.body.getReader();
  const formDecoder = new TextDecoder();
  let bytes = 0;
  let data = '';
  try {
    for (;;) {
      const part = await reader.read();
      if (part.done) return new URLSearchParams(data + formDecoder.decode());
      bytes += part.value.length;
      if (bytes > 4096) {
        void reader.cancel().catch(() => {});
        return null;
      }
      data += formDecoder.decode(part.value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

function hex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function keys(secret) {
  const hmac = await crypto.subtle.importKey('raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const seal = async value => await crypto.subtle.sign('HMAC', hmac, encoder.encode(value));
  const privateKey = await crypto.subtle.importKey('raw', await seal('tele5a:teacher:data:v1'),
    'AES-GCM', false, ['encrypt', 'decrypt']);
  return { seal, privateKey };
}

function sameDigest(a, b) {
  if (a.length !== b.length) return false;
  let different = 0;
  for (let i = 0; i < a.length; i++) different |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return different === 0;
}

function sessionCookie(value, maxAge) {
  return cookieName + '=' + value + '; Path=/; Max-Age=' + maxAge + '; HttpOnly; Secure; SameSite=Lax';
}

async function sessionSignature(env, value) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(env.SYNC_SECRET),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(
    'tele5a:teacher:session:v2:' + env.TEACHER_PASSWORD_SHA256 + ':' + value,
  ));
  return hex(new Uint8Array(signed));
}

async function sessionExpiry(request, env, now) {
  const cookie = request.headers.get('Cookie')?.split(';').map(item => item.trim())
    .find(item => item.startsWith(cookieName + '='));
  const value = cookie?.slice(cookieName.length + 1);
  const match = /^(\d{1,12}\.[a-f0-9]{32})\.([a-f0-9]{64})$/.exec(value || '');
  if (!match) return 0;
  const expiresAt = Number.parseInt(match[1], 10);
  if (expiresAt <= now || !sameDigest(match[2], await sessionSignature(env, match[1]))) return 0;
  return expiresAt;
}

function accessPage(message = '', status = 200, extra = {}) {
  return response(page('Accesso', `
    <p class="teacher-trail"><a href="${SITE}">Home</a> <span aria-hidden="true">/</span> Area docente</p>
    <section class="teacher-card teacher-gate"><h1>Area docente</h1>
    ${message ? '<p class="teacher-alert" role="alert">' + esc(message) + '</p>' : ''}
    <form action="/docente/accesso" method="post">
      <label>Password personale<input type="password" name="password" required maxlength="128" autocomplete="current-password"></label>
      <button class="btn btn-primary">Accedi</button>
    </form></section>`), status, 'text/html', extra);
}

async function renewedSessionCookie(env, expiresAt) {
  const value = expiresAt + '.' + hex(crypto.getRandomValues(new Uint8Array(16)));
  return sessionCookie(value + '.' + await sessionSignature(env, value), sessionLength);
}

async function checkLogin(request, env, now) {
  const form = await readForm(request);
  const password = form?.get('password') || '';
  if (!password || password.length > 128) return accessPage('Password non valida. Controlla e riprova.', 401);
  const { seal } = await keys(env.SYNC_SECRET);
  const address = request.headers.get('CF-Connecting-IP') || 'unknown';
  const scope = hex(new Uint8Array(await seal('tele5a:teacher:rate:' + address)));
  const start = now - now % loginWindow;
  const attempt = await env.DB.prepare(`
    INSERT INTO teacher_login_attempts (scope, window_start, attempts) VALUES (?, ?, 1)
    ON CONFLICT (scope) DO UPDATE SET
      attempts = CASE WHEN teacher_login_attempts.window_start = excluded.window_start
        THEN teacher_login_attempts.attempts + 1 ELSE 1 END,
      window_start = excluded.window_start
    WHERE teacher_login_attempts.window_start < excluded.window_start OR teacher_login_attempts.attempts < 6
    RETURNING attempts
  `).bind(scope, start).first();
  if (!attempt) return accessPage('Troppi tentativi. Aspetta qualche minuto e riprova.', 429, {
    'Retry-After': String(start + loginWindow - now),
  });
  const digest = hex(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(password))));
  if (!sameDigest(digest, env.TEACHER_PASSWORD_SHA256)) {
    return accessPage('Password non valida. Controlla e riprova.', 401);
  }
  await env.DB.batch([
    env.DB.prepare('DELETE FROM teacher_login_attempts WHERE scope = ?').bind(scope),
    env.DB.prepare('DELETE FROM teacher_login_attempts WHERE window_start < ?').bind(start),
  ]);
  return redirect('/docente/', { 'Set-Cookie': await renewedSessionCookie(env, now + sessionLength) });
}

async function encrypt(privateKey, id, field, value) {
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce, additionalData: encoder.encode(id + ':' + field) },
    privateKey, encoder.encode(value),
  ));
  return btoa(String.fromCharCode(...nonce, ...ciphertext));
}

async function decrypt(privateKey, id, field, value) {
  const bytes = Uint8Array.from(atob(value), char => char.charCodeAt(0));
  return decoder.decode(await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: bytes.subarray(0, 12), additionalData: encoder.encode(id + ':' + field) },
    privateKey, bytes.subarray(12),
  ));
}

function freshCode(excluded) {
  let code;
  do {
    code = Array.from(crypto.getRandomValues(new Uint8Array(8)), byte => alphabet[byte % alphabet.length]).join('');
  } while (excluded.has(code));
  excluded.add(code);
  return code;
}

async function createClass(db, secret, year, label, count) {
  const id = crypto.randomUUID();
  const used = new Set();
  const { seal, privateKey } = await keys(secret);
  const students = await Promise.all(Array.from({ length: count }, async (_, index) => {
    const profile = crypto.randomUUID();
    const code = freshCode(used);
    const [digest, encrypted] = await Promise.all([
      seal('code:' + code).then(buffer => hex(new Uint8Array(buffer))),
      encrypt(privateKey, profile, 'code', code),
    ]);
    return { profile, position: index + 1, digest, encrypted };
  }));
  const commands = [db.prepare('INSERT INTO teacher_classes (id, year, label) VALUES (?, ?, ?)').bind(id, year, label)];
  for (let index = 0; index < students.length; index += 20) {
    const group = students.slice(index, index + 20);
    commands.push(
      db.prepare('INSERT INTO profiles (id, code_digest) VALUES ' + group.map(() => '(?, ?)').join(','))
        .bind(...group.flatMap(student => [student.profile, student.digest])),
      db.prepare('INSERT INTO teacher_roster (profile_id, class_id, position, encrypted_code) VALUES ' +
        group.map(() => '(?, ?, ?, ?)').join(','))
        .bind(...group.flatMap(student => [student.profile, id, student.position, student.encrypted])),
    );
  }
  await db.batch(commands);
  return id;
}

async function listClasses(db, url, expiresAt, notice = '') {
  const { results: classes } = await db.prepare(`
    SELECT c.id, c.year, c.label, count(r.profile_id) AS size
    FROM teacher_classes c LEFT JOIN teacher_roster r ON r.class_id = c.id
    GROUP BY c.id ORDER BY c.year DESC, c.label
  `).all();
  const years = [...new Set([schoolYear(), ...classes.map(item => item.year)])].sort().reverse();
  const picked = url.searchParams.get('anno');
  const selected = years.includes(picked) ? picked : schoolYear();
  return page('Classi', `
    <p class="teacher-trail"><a href="${SITE}">Home</a> <span aria-hidden="true">/</span> Area docente</p>
    <section class="teacher-intro"><div><h1>Area docente</h1><p>Gestisci classi, codici e avanzamento.</p></div></section>
    ${notice ? '<p class="teacher-alert" role="alert">' + esc(notice) + '</p>' : ''}
    <section class="teacher-card"><h2>Nuova classe</h2>
    <form class="teacher-create" action="/docente/crea" method="post">
      <label>Anno scolastico<input name="anno" required pattern="[0-9]{4}/[0-9]{4}" value="${esc(selected)}"></label>
      <label>Classe<input name="classe" required maxlength="16" placeholder="5C"></label>
      <label>Numero di alunni<input name="numero" type="number" min="1" max="80" required value="25"></label>
      <button class="btn btn-primary" type="submit">Genera codici</button>
    </form></section>
    <section class="teacher-classes"><div class="teacher-line"><h2>Classi</h2>
      <form method="get" action="/docente/"><label class="teacher-year">Anno scolastico
        <select name="anno">${years.map(year => '<option' + (year === selected ? ' selected' : '') + '>' + esc(year) + '</option>').join('')}</select>
      </label><button class="btn btn-ghost" type="submit">Mostra</button></form></div>
    <div class="teacher-grid">${classes.filter(item => item.year === selected).map(item =>
      '<a class="teacher-card teacher-class" href="/docente/classe/' + item.id + '"><strong>' + esc(item.label) +
      '</strong><span>' + item.size + ' alunni</span><span class="teacher-arrow" aria-hidden="true">→</span></a>').join('') ||
      '<p class="teacher-muted">Nessuna classe per questo anno scolastico.</p>'}</div></section>`, expiresAt);
}

async function showClass(db, secret, group, expiresAt, outcome) {
  const [{ results: students }, { results: progress }] = await db.batch([
    db.prepare('SELECT * FROM teacher_roster WHERE class_id = ? ORDER BY position').bind(group.id),
    db.prepare(`
      SELECT s.profile_id, s.record_key FROM study_records s
      JOIN teacher_roster r ON r.profile_id = s.profile_id AND r.class_id = ?
      WHERE s.kind = 'lesson' AND json_extract(s.payload, '$.done') = 1
    `).bind(group.id),
  ]);
  const completed = new Map();
  for (const record of progress) {
    const match = /^m([1-5])-([1-9][0-9]*)$/.exec(record.record_key);
    if (!match || Number(match[2]) > modules[Number(match[1]) - 1][1]) continue;
    const key = record.profile_id + ':' + match[1];
    completed.set(key, (completed.get(key) || 0) + 1);
  }
  const { privateKey } = await keys(secret);
  const roster = await Promise.all(students.map(async student => {
    const name = student.encrypted_name
      ? JSON.parse(await decrypt(privateKey, student.profile_id, 'name', student.encrypted_name))
      : {};
    return { student, first: name.first ?? '', last: name.last ?? '' };
  }));
  roster.sort((a, b) => Number(!a.last) - Number(!b.last)
    || studentNameOrder.compare(a.last, b.last)
    || studentNameOrder.compare(a.first, b.first)
    || a.student.position - b.student.position);
  const rows = await Promise.all(roster.map(async ({ student, first, last }) => {
    const id = student.profile_id;
    const code = await decrypt(privateKey, id, 'code', student.encrypted_code);
    const row = '/docente/classe/' + group.id + '/' + id;
    return `<tr id="profilo-${id}"><td><form class="teacher-person" method="post" action="${row}/nome">
      <span class="teacher-muted" aria-label="Profilo ${student.position}">${student.position}</span>
      <input name="cognome" aria-label="Cognome, profilo ${student.position}" placeholder="Cognome" maxlength="60" value="${esc(last)}">
      <input name="nome" aria-label="Nome, profilo ${student.position}" placeholder="Nome" maxlength="60" value="${esc(first)}">
      <button class="btn btn-ghost" type="submit" aria-label="Salva nominativo, profilo ${student.position}">Salva</button></form></td>
      <td><form class="teacher-code" method="post" action="${row}/sostituisci" data-confirm-code>
      <code>${esc(code)}</code><button class="btn btn-ghost" type="submit" aria-label="Sostituisci codice, profilo ${student.position}">Sostituisci</button></form></td>
      ${modules.map(([name, total], index) => {
        const done = completed.get(id + ':' + (index + 1)) || 0;
        return '<td><span class="teacher-numeric">' + done + '/' + total + '</span><progress aria-label="' +
          esc(name) + '" max="' + total + '" value="' + done + '"></progress></td>';
      }).join('')}</tr>`;
  }));
  return page(group.label, `
    <p class="teacher-trail"><a href="${SITE}">Home</a> <span aria-hidden="true">/</span>
    <a href="/docente/?anno=${encodeURIComponent(group.year)}">Area docente</a> <span aria-hidden="true">/</span> ${esc(group.label)}</p>
    <section class="teacher-intro"><div><h1>Classe ${esc(group.label)}</h1>
    <p>${esc(group.year)} · ${students.length} alunni</p></div></section>
    ${outcome ? '<p class="teacher-alert" role="status">' + esc(outcome) + '</p>' : ''}
    <section class="teacher-card teacher-report"><h2>Avanzamento per alunno</h2>
    <div class="teacher-table" tabindex="0" aria-label="Tabella dell’avanzamento"><table>
    <thead><tr><th scope="col">Alunno</th><th scope="col">Codice</th>
    ${modules.map(([name], index) => '<th scope="col" class="teacher-module"><strong>Modulo ' +
      (index + 1) + '</strong><span>' + esc(name) + '</span></th>').join('')}
    </tr></thead><tbody>${rows.join('')}</tbody></table></div></section>`, expiresAt);
}

async function rosterAction(request, env, group, id, action) {
  const row = await env.DB.prepare('SELECT encrypted_code FROM teacher_roster WHERE class_id = ? AND profile_id = ?')
    .bind(group.id, id).first();
  if (!row) return response('Profilo non trovato.', 404, 'text/plain');
  const base = '/docente/classe/' + group.id;
  const { seal, privateKey } = await keys(env.SYNC_SECRET);
  if (action === 'nome') {
    const form = await readForm(request);
    if (!form) return response('Dati del modulo non validi.', 400, 'text/plain');
    const name = JSON.stringify({
      first: (form.get('nome') ?? '').trim().slice(0, 60),
      last: (form.get('cognome') ?? '').trim().slice(0, 60),
    });
    const encrypted = await encrypt(privateKey, id, 'name', name);
    await env.DB.prepare('UPDATE teacher_roster SET encrypted_name = ? WHERE profile_id = ?').bind(encrypted, id).run();
    return redirect(base + '?stato=salvato#profilo-' + id);
  }
  const code = freshCode(new Set([await decrypt(privateKey, id, 'code', row.encrypted_code)]));
  const [digest, encrypted] = await Promise.all([
    seal('code:' + code).then(buffer => hex(new Uint8Array(buffer))),
    encrypt(privateKey, id, 'code', code),
  ]);
  await env.DB.batch([
    env.DB.prepare('UPDATE profiles SET code_digest = ?, code_version = code_version + 1 WHERE id = ?').bind(digest, id),
    env.DB.prepare('UPDATE teacher_roster SET encrypted_code = ? WHERE profile_id = ?').bind(encrypted, id),
  ]);
  return redirect(base + '?stato=sostituito#profilo-' + id);
}

const PANEL_JS = `
  const sessionTime = document.documentElement.dataset.sessionMs;
  if (sessionTime !== undefined) {
    const idleMs = ${sessionLength * 1000};
    const renewInterval = 1000;
    let expiresAt = Date.now() + Number(sessionTime);
    let lastActivity = 0;
    let lastRenewal = 0;
    let expiryTimer;
    let renewalTimer;
    let renewing = false;
    let leaving = false;
    const activityChannel = typeof BroadcastChannel === 'function'
      ? new BroadcastChannel('tele5a-docente:attivita') : null;

    function leaveExpiredSession() {
      if (leaving) return;
      leaving = true;
      clearTimeout(renewalTimer);
      location.replace('/docente/?stato=sessione-scaduta');
    }
    function checkExpiry() {
      clearTimeout(expiryTimer);
      if (leaving) return;
      const remaining = expiresAt - Date.now();
      if (remaining > 0) expiryTimer = setTimeout(checkExpiry, remaining);
      else if (!renewing) leaveExpiredSession();
    }
    function updateExpiry(deadline) {
      expiresAt = Math.max(expiresAt, deadline);
      checkExpiry();
    }
    async function renewSession() {
      renewalTimer = undefined;
      if (leaving || renewing || lastActivity <= lastRenewal) return;
      const activity = lastActivity;
      lastRenewal = Date.now();
      renewing = true;
      try {
        const result = await fetch('/docente/attivita', { method: 'POST', signal: AbortSignal.timeout(5000) });
        if (result.status === 403) leaveExpiredSession();
        if (result.status === 204 && !leaving) {
          const deadline = activity + idleMs;
          updateExpiry(deadline);
          activityChannel?.postMessage(deadline);
        }
      } catch {
        // A later interaction can retry after a connection interruption.
      } finally {
        renewing = false;
        checkExpiry();
        if (!leaving && lastActivity > lastRenewal) scheduleRenewal();
      }
    }
    function scheduleRenewal() {
      if (renewalTimer !== undefined || renewing) return;
      renewalTimer = setTimeout(renewSession, Math.max(0, lastRenewal + renewInterval - Date.now()));
    }
    function recordActivity(event) {
      if (leaving || !event.isTrusted || event.repeat) return;
      if (Date.now() >= expiresAt) {
        leaveExpiredSession();
        return;
      }
      lastActivity = Date.now();
      scheduleRenewal();
    }

    activityChannel?.addEventListener('message', event => updateExpiry(event.data));
    activityChannel?.postMessage(expiresAt);
    for (const type of ['pointerdown', 'keydown', 'wheel', 'touchmove']) {
      document.addEventListener(type, recordActivity, { passive: true });
    }
    window.addEventListener('pageshow', checkExpiry);
    document.addEventListener('visibilitychange', checkExpiry);
    checkExpiry();
  }
  let theme = document.documentElement.dataset.theme;
  const button = document.querySelector('[data-theme-toggle]');
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro');
  }
  applyTheme();
  button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tele5a-docente:theme', theme); } catch {}
    applyTheme();
  });
  for (const form of document.querySelectorAll('[data-confirm-code]')) {
    form.addEventListener('submit', event => {
      if (!confirm('Sostituire il codice? Il codice precedente verrà disattivato.')) event.preventDefault();
    });
  }`;

async function teacherPanel(request, env, url, expiresAt) {
  const path = url.pathname;
  if (path === '/docente/' && request.method === 'GET') return response(await listClasses(env.DB, url, expiresAt));
  if (path === '/docente/esci' && request.method === 'POST') {
    return redirect('/docente/', { 'Set-Cookie': sessionCookie('', 0) });
  }
  if (path === '/docente/crea' && request.method === 'POST') {
    const form = await readForm(request);
    const year = form?.get('anno')?.trim() ?? '';
    const label = form?.get('classe')?.trim().toUpperCase() ?? '';
    const count = Number(form?.get('numero'));
    if (!/^20\d\d\/20\d\d$/.test(year) || Number(year.slice(0, 4)) + 1 !== Number(year.slice(5)) ||
        !/^[A-Z0-9][A-Z0-9 -]{0,15}$/.test(label) || !Number.isInteger(count) || count < 1 || count > 80) {
      return response(await listClasses(env.DB, url, expiresAt, 'Controlla anno scolastico, classe e numero di alunni.'), 400);
    }
    const alreadyExists = () => env.DB.prepare('SELECT 1 FROM teacher_classes WHERE year = ? AND label = ?')
      .bind(year, label).first();
    if (!await alreadyExists()) {
      try {
        const id = await createClass(env.DB, env.SYNC_SECRET, year, label, count);
        return redirect('/docente/classe/' + id + '?stato=generati');
      } catch (error) {
        if (!await alreadyExists()) throw error;
      }
    }
    return response(await listClasses(env.DB, url, expiresAt, 'Questa classe esiste già per l’anno indicato.'), 409);
  }
  const match = path.match(/^\/docente\/classe\/([a-f0-9-]{36})(?:\/([a-f0-9-]{36})\/(nome|sostituisci))?$/);
  if (!match) return response('Pagina non trovata.', 404, 'text/plain');
  const [, classId, id, action] = match;
  const group = await env.DB.prepare('SELECT id, year, label FROM teacher_classes WHERE id = ?').bind(classId).first();
  if (!group) return response('Classe non trovata.', 404, 'text/plain');
  if (!action && request.method === 'GET') {
    const outcomes = new Map([
      ['generati', 'Codici generati. Puoi aggiungere ora i nominativi.'],
      ['salvato', 'Nominativo salvato.'],
      ['sostituito', 'Nuovo codice attivo. I progressi sono stati conservati.'],
    ]);
    return response(await showClass(env.DB, env.SYNC_SECRET, group, expiresAt, outcomes.get(url.searchParams.get('stato'))));
  }
  if (action && request.method === 'POST') return rosterAction(request, env, group, id, action);
  return response('Operazione non disponibile.', 405, 'text/plain');
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (request.method === 'GET') {
        if (path === '/' || path === '/docente') return redirect('/docente/');
        if (path === '/docente/stile.css') {
          const loginLayout = '\n.teacher-gate form { display: grid; gap: 1rem; }'
            + '\n.teacher-gate form > button { justify-self: start; }';
          const themeIcons = '\n[data-theme="dark"] [data-theme-icon="light"], [data-theme="light"] [data-theme-icon="dark"] { display: none; }';
          return response(CSS + loginLayout + themeIcons, 200, 'text/css');
        }
        if (path === '/docente/pannello.js') return response(PANEL_JS, 200, 'text/javascript');
      }
      if (!/^[a-f0-9]{64}$/.test(env.SYNC_SECRET || '') ||
          !/^[a-f0-9]{64}$/.test(env.TEACHER_PASSWORD_SHA256 || '') || !env.DB) {
        return response('Area docente momentaneamente non disponibile.', 503, 'text/plain');
      }
      if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) {
        return response('Richiesta non autorizzata.', 403, 'text/plain');
      }
      const now = Math.floor(Date.now() / 1000);
      if (path === '/docente/accesso' && request.method === 'POST') return await checkLogin(request, env, now);
      const expiresAt = await sessionExpiry(request, env, now);
      if (!expiresAt) {
        return path === '/docente/' && request.method === 'GET'
          ? accessPage(url.searchParams.get('stato') === 'sessione-scaduta'
            ? 'La sessione è scaduta. Inserisci di nuovo la password.' : '')
          : response('Area riservata al docente.', 403, 'text/plain');
      }
      const nextExpiry = now + sessionLength;
      if (path === '/docente/attivita' && request.method === 'POST') {
        return response(null, 204, 'text/plain', { 'Set-Cookie': await renewedSessionCookie(env, nextExpiry) });
      }
      if (path === '/docente/esci' || url.searchParams.get('stato') === 'sessione-scaduta') {
        return await teacherPanel(request, env, url, expiresAt);
      }
      const panel = await teacherPanel(request, env, url, nextExpiry);
      if (panel.status < 400 || panel.headers.get('Content-Type')?.startsWith('text/html')) {
        panel.headers.set('Set-Cookie', await renewedSessionCookie(env, nextExpiry));
      }
      return panel;
    } catch {
      return response('Area docente momentaneamente non disponibile.', 503, 'text/plain');
    }
  },
};

export class VerificaCodice extends WorkerEntrypoint {
  async improntaCodice(code) {
    if (typeof code !== 'string' || !/^[A-HJ-NP-Z2-9]{8}$/.test(code)) {
      throw new Error('Formato codice non valido.');
    }
    const { seal } = await keys(this.env.SYNC_SECRET);
    return hex(new Uint8Array(await seal('code:' + code)));
  }
}

