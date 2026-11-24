export const studioLesson = /^m1-[1-6]$/;

const address = window.tele5aPreviewService || document.querySelector('script[data-service]')?.dataset.service ||
  'https://tele5a-studio.alberto-pignato.workers.dev';
export const studioService = new URL(address);
const sessionKey = 'tele5a:studio:v1:session:' + studioService.origin;
const lessons = Array.from({ length: 6 }, (_, index) => 'm1-' + (index + 1));
const annotationsKey = 'telecomunicazioni:annotazioni:v1:';
const recordId = (kind, key) => kind + ':' + key;

function read(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function storedSession() {
  const saved = read(sessionKey);
  if (/^[a-f0-9]{64}$/.test(saved?.token) && Number.isInteger(saved.expiresAt)) return saved;
  return null;
}

let access = storedSession();
let status = '';
let timer;
let task;
let badge;

function context() {
  if (!access) return null;
  const namespace = 'tele5a:studio:v1:' + studioService.origin + ':' + (access.account || access.token.slice(0, 24));
  return { ...access, cache: namespace + ':cache', prefix: namespace + ':pending:' };
}

function pending(ctx) {
  return Object.keys(localStorage).filter(key => key.startsWith(ctx.prefix));
}

function values(ctx) {
  const records = new Map(read(ctx.cache, []).map(entry => [recordId(entry.kind, entry.key), entry]));
  for (const key of pending(ctx)) {
    const next = read(key);
    if (next) records.set(recordId(next.kind, next.key), next);
  }
  return [...records.values()];
}

function publish(message) {
  status = message;
  if (badge) badge.textContent = status;
  window.dispatchEvent(new Event('studio-change'));
}

function sameValue(record, operation) {
  if (operation.kind === 'lesson' && record?.value?.done && operation.value?.done) return true;
  return JSON.stringify(record?.value) === JSON.stringify(operation.value);
}

async function pull(ctx) {
  const response = await fetch(new URL('/studio', studioService), {
    headers: { Authorization: 'Bearer ' + ctx.token },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return response;
  const state = await response.json();
  localStorage.setItem(ctx.cache, JSON.stringify(state.records));
  return null;
}

async function synchronize(ctx) {
  if (!navigator.onLine) throw new Error('Offline');
  const failure = await pull(ctx);
  if (failure) return failure;
  for (const key of pending(ctx)) {
    if (access?.token !== ctx.token) break;
    const op = read(key);
    if (!op || op.conflict) continue;
    const original = read(ctx.cache, []).find(item => recordId(item.kind, item.key) === recordId(op.kind, op.key));
    if (sameValue(original, op)) {
      if (read(key)?.edit === op.edit) localStorage.removeItem(key);
      continue;
    }
    const response = await fetch(new URL('/studio', studioService), {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + ctx.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: op.kind, key: op.key, value: op.value, revision: op.revision ?? original?.revision ?? 0 }),
      signal: AbortSignal.timeout(8000),
    });
    if (response.status === 409) {
      const refreshError = await pull(ctx);
      if (refreshError) return refreshError;
      const current = read(key);
      const saved = read(ctx.cache, []).find(item => recordId(item.kind, item.key) === recordId(op.kind, op.key));
      if (current?.edit === op.edit) {
        if (sameValue(saved, op)) localStorage.removeItem(key);
        else localStorage.setItem(key, JSON.stringify({ ...current, conflict: true }));
      }
      continue;
    }
    if (!response.ok) return response;
    const saved = await response.json();
    const records = read(ctx.cache, []).filter(item => recordId(item.kind, item.key) !== recordId(saved.kind, saved.key));
    localStorage.setItem(ctx.cache, JSON.stringify([...records, saved]));
    const current = read(key);
    if (current?.edit === op.edit) localStorage.removeItem(key);
    else if (current) localStorage.setItem(key, JSON.stringify({ ...current, revision: saved.revision, conflict: false }));
  }
  return null;
}

function send() {
  if (task) return task;
  const ctx = context();
  if (!ctx) return;
  clearTimeout(timer);
  task = (async () => {
    if (ctx.expiresAt <= Date.now() / 1000) {
      publish('Accesso scaduto. Inserisci il codice nella home.');
      return;
    }
    try {
      const work = () => synchronize(ctx);
      const failure = navigator.locks ? await navigator.locks.request(ctx.prefix, work) : await work();
      if (access?.token !== ctx.token) return;
      if (failure?.status === 401) {
        publish('Accesso scaduto. Inserisci il codice nella home.');
        return;
      }
      if (failure) throw new Error('Sync failed');
      const queued = pending(ctx).map(readKey => read(readKey)).filter(Boolean);
      if (queued.some(entry => entry.conflict)) {
        publish('Modifica in conflitto, conservata su questo PC.');
      } else if (queued.length) {
        timer = setTimeout(send, 120);
      } else {
        publish('Salvato');
      }
    } catch {
      if (access?.token === ctx.token) {
        publish('Modifiche in attesa. Riprovo a salvare.');
        timer = setTimeout(send, 5000);
      }
    }
  })().finally(() => {
    task = null;
    if (access && access.token !== ctx.token) void send();
  });
  return task;
}

function write(kind, key, value) {
  const ctx = context();
  if (!ctx) return false;
  const pendingKey = ctx.prefix + recordId(kind, key);
  const earlier = read(pendingKey);
  const cached = read(ctx.cache);
  const found = cached?.find(item => item.kind === kind && item.key === key);
  try {
    const item = {
      kind, key, value, edit: crypto.randomUUID(),
      revision: earlier && !earlier.conflict ? earlier.revision : found?.revision ?? (cached ? 0 : null),
    };
    localStorage.setItem(pendingKey, JSON.stringify(item));
  } catch {
    publish('Impossibile conservare la modifica su questo PC.');
    return false;
  }
  publish('Salvataggio in corso…');
  void send();
  return true;
}

function localRecords() {
  const progress = read('tele5a-progress', {});
  return lessons.flatMap(lesson => {
    const stored = read(annotationsKey + lesson, []);
    const entries = Array.isArray(stored) ? stored : [];
    return [
      ...(progress[lesson]?.done ? [{ kind: 'lesson', key: lesson, value: progress[lesson] }] : []),
      ...entries.filter(entry => entry?.id && entry?.anchor)
        .map(entry => ({ kind: entry.color ? 'highlight' : 'note', key: lesson + ':' + entry.id, value: entry })),
    ];
  });
}

function missingLocalRecords(ctx) {
  const existing = new Set(values(ctx).map(item => recordId(item.kind, item.key)));
  return localRecords().filter(item => !existing.has(recordId(item.kind, item.key)));
}

export const StudySync = {
  active: () => Boolean(access),
  status: () => status,
  session: () => access,
  async signIn(token, expiresAt, code) {
    const deviceKey = 'tele5a:studio:v1:device';
    const salt = read(deviceKey) || crypto.randomUUID();
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + code));
    const account = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
    if (!read(deviceKey)) localStorage.setItem(deviceKey, JSON.stringify(salt));
    const next = { token, expiresAt, account };
    localStorage.setItem(sessionKey, JSON.stringify(next));
    access = next;
    publish('Recupero dei dati di studio…');
    void send();
  },
  refresh: send,
  progress() {
    const ctx = context();
    return ctx ? Object.fromEntries(values(ctx).filter(item => item.kind === 'lesson' && studioLesson.test(item.key) && item.value)
      .map(item => [item.key, item.value])) : {};
  },
  markDone: (lesson, value) => write('lesson', lesson, value),
  latestQuiz(lesson) {
    const ctx = context();
    return ctx ? values(ctx).filter(item => item.kind === 'quiz' && item.key.startsWith(lesson + ':') && item.value)
      .sort((a, b) => String(b.value.at).localeCompare(String(a.value.at)))[0]?.value : undefined;
  },
  quiz: (lesson, score, total) => write('quiz', lesson + ':' + crypto.randomUUID(),
    { score, total, at: new Date().toISOString() }),
  annotations(lesson) {
    const ctx = context();
    return ctx ? values(ctx).filter(item =>
      ['highlight', 'note'].includes(item.kind) && item.key.startsWith(lesson + ':') && item.value)
      .map(item => item.value) : [];
  },
  setAnnotations(lesson, before, after) {
    const next = new Map(after.map(entry => [entry.id, entry]));
    const original = new Map(before.map(entry => [entry.id, entry]));
    const removed = before.filter(entry => !next.has(entry.id)).map(entry => [entry, null]);
    const changed = after.filter(entry => JSON.stringify(original.get(entry.id)) !== JSON.stringify(entry))
      .map(entry => [entry, entry]);
    return [...removed, ...changed].every(([entry, value]) =>
      write(entry.color ? 'highlight' : 'note', lesson + ':' + entry.id, value));
  },
  canImport: () => {
    const ctx = context();
    return Boolean(ctx && status === 'Salvato' && missingLocalRecords(ctx).length);
  },
  async importLocal() {
    const ctx = context();
    if (!ctx) return;
    await send();
    if (access?.token !== ctx.token || status !== 'Salvato') return;
    for (const item of missingLocalRecords(ctx)) write(item.kind, item.key, item.value);
  },
  showStatus() {
    if (badge || !document.querySelector('.header-actions')) return;
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = new URL('../css/accesso-studio.css', import.meta.url);
    document.head.append(style);
    badge = document.createElement('span');
    badge.className = 'study-sync-status';
    badge.setAttribute('role', 'status');
    badge.textContent = status;
    document.querySelector('.header-actions').prepend(badge);
  },
};

window.StudySync = StudySync;
window.addEventListener('online', send);
window.addEventListener('focus', send);
window.addEventListener('pageshow', event => { if (event.persisted) void send(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') void send();
});
window.addEventListener('storage', event => {
  const ctx = context();
  if (event.key === sessionKey) {
    access = storedSession();
    publish('');
    void send();
  } else if (ctx && (event.key === ctx.cache || event.key?.startsWith(ctx.prefix))) {
    window.dispatchEvent(new Event('studio-change'));
  }
});
if (access) {
  publish('Recupero dei dati di studio…');
  void send();
}
