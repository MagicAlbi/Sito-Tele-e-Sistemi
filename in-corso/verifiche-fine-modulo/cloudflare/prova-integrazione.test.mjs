import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const pacchetto = new URL('../../../.local/verifica-wifi/cloudflare/', import.meta.url);
const leggi = url => readFile(url, 'utf8');
const origine = 'https://docente.example.test';
const sito = 'https://magicalbi.github.io';
const fakeCookie = header => header.split(';')[0];

function d1(sqlite) {
  return {
    prepare(query) {
      const prepara = valori => {
        const numerati = [];
        const testo = query.replace(/\?(\d+)/g, (_, numero) => { numerati.push(valori[Number(numero) - 1]); return '?'; });
        const args = numerati.length ? numerati : valori;
        return {
          first: () => sqlite.prepare(testo).get(...args) ?? null,
          all: () => ({ results: sqlite.prepare(testo).all(...args) }),
          run: () => ({ meta: { changes: Number(sqlite.prepare(testo).run(...args).changes) } })
        };
      };
      return { ...prepara([]), bind: (...args) => prepara(args) };
    },
    batch(statements) {
      sqlite.exec('BEGIN');
      try {
        const out = statements.map(stmt => stmt.all());
        sqlite.exec('COMMIT');
        return out;
      } catch (error) {
        sqlite.exec('ROLLBACK');
        throw error;
      }
    }
  };
}

function richiesta(path, { cookie, form, dati, origin = origine } = {}) {
  const headers = { 'CF-Connecting-IP': '192.0.2.21' };
  if (cookie) headers.Cookie = cookie;
  if (form || dati) headers.Origin = origin;
  if (form) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (dati) headers['Content-Type'] = 'application/json';
  return new Request(new URL(path, origine), { headers, method: form || dati ? 'POST' : 'GET',
    body: form ? new URLSearchParams(form) : dati ? JSON.stringify(dati) : undefined });
}

async function ambiente(t, password) {
  await import('./prepara.mjs');
  const credenziali = { SYNC_SECRET: randomBytes(32).toString('hex'),
    TEACHER_PASSWORD_SHA256: createHash('sha256').update(password).digest('hex') };
  const studioSetup = { SYNC_SECRET: randomBytes(32).toString('hex'), STUDY_ORIGIN: sito };
  if (process.env.VERIFICA_D1_REALE === '1') {
    const require = createRequire(new URL('../../../.local/verifica-wifi/strumenti/package.json', import.meta.url));
    const { Miniflare } = require('miniflare');
    const comune = { modules: true, compatibilityDate: '2026-07-30', d1Databases: { DB: 'studio-verifiche-test' } };
    const runtime = new Miniflare({ workers: [
      { ...comune, name: 'docente', bindings: credenziali, scriptPath: fileURLToPath(new URL('docente.mjs', pacchetto)),
        serviceBindings: { STUDIO: 'studio' } },
      { ...comune, name: 'studio', bindings: studioSetup,
        scriptPath: fileURLToPath(new URL('../../accesso-codici-studenti/studenti.mjs', import.meta.url)),
        serviceBindings: { VERIFICA_DOCENTE: { name: 'docente', entrypoint: 'VerificaCodice' } } }
    ] });
    t.after(() => runtime.dispose());
    const studio = await runtime.getWorker('studio');
    const passa = async (handler, request) => handler(request.url, {
      method: request.method, headers: Object.fromEntries(request.headers), redirect: 'manual',
      body: request.body ? await request.text() : undefined
    });
    return { db: await runtime.getD1Database('DB', 'docente'),
      docente: request => passa(runtime.dispatchFetch.bind(runtime), request),
      studio: request => passa(studio.fetch.bind(studio), request) };
  }
  const worker = await leggi(new URL('docente.mjs', pacchetto));
  const testModule = new URL('docente-test.mjs', pacchetto);
  const testWorker = worker.replace(/import \{ WorkerEntrypoint \} from 'cloudflare:workers';/,
    'class WorkerEntrypoint { constructor(context, env) { this.env = env; } }');
  assert.notEqual(testWorker, worker);
  await writeFile(testModule, testWorker, 'utf8');
  const { default: docente, VerificaCodice } = await import(testModule);
  const { default: studio } = await import('../../accesso-codici-studenti/studenti.mjs');
  const sqlite = new DatabaseSync(':memory:');
  t.after(() => sqlite.close());
  const db = d1(sqlite);
  const env = { DB: db, ...credenziali };
  const studioEnv = { DB: db, ...studioSetup, VERIFICA_DOCENTE: new VerificaCodice(null, env) };
  env.STUDIO = { fetch: request => studio.fetch(request, studioEnv) };
  return { db, docente: request => docente.fetch(request, env), studio: request => studio.fetch(request, studioEnv) };
}

test('Riusa password, codici e sessioni esistenti e conserva prove, recuperi e archivio separati', async t => {
  const password = randomBytes(24).toString('base64url');
  const runtime = await ambiente(t, password);
  const { db } = runtime;
  const schema = [
    await leggi(new URL('../../../sincronizzazione/schema.sql', import.meta.url)),
    await leggi(new URL('schema-verifiche.sql', import.meta.url)),
    `
    CREATE TABLE teacher_classes (id TEXT PRIMARY KEY, year TEXT NOT NULL, label TEXT NOT NULL, UNIQUE(year,label));
    CREATE TABLE teacher_roster (profile_id TEXT PRIMARY KEY, class_id TEXT NOT NULL, position INTEGER,
      encrypted_code TEXT NOT NULL, encrypted_name TEXT);
    CREATE TABLE teacher_login_attempts (scope TEXT PRIMARY KEY, window_start INTEGER NOT NULL, attempts INTEGER NOT NULL);
    CREATE TABLE study_records (profile_id TEXT, kind TEXT, record_key TEXT, payload TEXT);
  `].join('\n');
  await db.batch(schema.split(';').map(testo => testo.trim()).filter(Boolean).map(testo => db.prepare(testo)));
  const fetch = (path, options) => runtime.docente(richiesta(path, options));
  const protetta = '/docente/verifiche/api/';
  const prova = '/prova/api/';

  assert.match(await (await fetch('/docente/')).text(), /Password personale/);
  assert.equal((await fetch(protetta + 'sessione')).status, 403);
  assert.equal((await fetch('/docente/verifiche-risorse/scheda-docente.js')).status, 403);
  assert.equal((await fetch('/docente/accesso', { form: { password: 'errata' } })).status, 401);
  const accesso = await fetch('/docente/accesso', { form: { password } });
  assert.equal(accesso.status, 303);
  const cookie = fakeCookie(accesso.headers.get('Set-Cookie'));
  const home = await (await fetch('/docente/', { cookie })).text();
  assert.match(home, /Area docente/);
  assert.match(home, /Wi-Fi prende in tutta l’aula/);
  assert.ok(home.indexOf('>Verifiche</h2>') < home.indexOf('>Codici alunni</h2>'));
  assert.doesNotMatch(home, /DOCENTE-DEMO|domande-allenamento\.js/);
  assert.match(home, /data-session-ms="\d+"/);
  const meta = await fetch(protetta + 'sessione', { cookie });
  assert.equal(meta.headers.get('Set-Cookie'), null);
  const { annoScolastico: anno } = await meta.json();
  const auth = (azione, dati) => fetch(protetta + azione, { cookie, dati });
  const classe = '5X';
  const creazione = await fetch('/docente/crea', { cookie, form: { anno, classe, numero: '3' } });
  assert.equal(creazione.status, 303);
  assert.match(await (await fetch('/docente/codici/', { cookie })).text(), /Nuova classe/);
  const urlClasse = creazione.headers.get('Location').split('?')[0];
  const gruppo = await (await fetch(urlClasse, { cookie })).text();
  const codici = [...gruppo.matchAll(/<code>([A-HJ-NP-Z2-9]{8})<\/code>/g)].map(m => m[1]);
  const { results: elenco } = await db.prepare('SELECT profile_id FROM teacher_roster ORDER BY position').all();
  assert.equal(codici.length, 3);
  await fetch(urlClasse + '/' + elenco[0].profile_id + '/nome', { cookie, form: { nome: 'Livia', cognome: 'Bruni' } });
  await db.prepare("INSERT INTO study_records VALUES (?, 'lesson', 'm1-1', '{\"done\":true}')").bind(elenco[0].profile_id).run();

  const scelta = { anno, classe, modulo: 'wifi' };
  const rispostaClasse = await (await auth('classe', scelta)).json();
  assert.equal(rispostaClasse.alunni.length, 3);
  assert.equal(rispostaClasse.alunni[0].nome, 'Livia');
  assert.equal(rispostaClasse.alunni[0].completati, 1);
  const presenze = { [elenco[0].profile_id]: 'presente', [elenco[1].profile_id]: 'assente' };
  const apri = operazione => auth('configura', { ...scelta, presenze, azione: 'crea', minuti: 35, operazione });
  const id = crypto.randomUUID();
  assert.equal((await apri(id)).status, 200);
  assert.equal((await apri(id)).status, 200);
  assert.equal((await db.prepare('SELECT count(*) totale FROM verifiche_edizioni').first()).totale, 1);
  assert.equal((await (await auth('archivio', {})).json()).verifiche.length, 0);

  const origineStudente = await runtime.studio(new Request('https://studio.example.test/session', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: codici[0] })
  }));
  const { token } = await origineStudente.json();
  assert.match(token, /^[a-f0-9]{64}$/);
  assert.equal((await fetch('/prova/accesso-sito', { form: { token }, origin: 'https://altro.example.test' })).status, 403);
  const passa = await fetch('/prova/accesso-sito', { form: { token }, origin: sito });
  assert.equal(passa.status, 303);
  const cookieAlunno = fakeCookie(passa.headers.get('Set-Cookie'));
  assert.match(passa.headers.get('Set-Cookie'), /HttpOnly/);
  assert.equal((await (await fetch(prova + 'sessione', { cookie: cookieAlunno })).json()).edizioni[0].id, id);
  const assente = await fetch(prova + 'accesso', { dati: { codice: codici[1] } });
  assert.equal(assente.status, 200);
  const cookieAssente = fakeCookie(assente.headers.get('Set-Cookie'));
  assert.equal((await fetch(prova + 'avvia', { cookie: cookieAssente, dati: { id } })).status, 403);
  const alunno = (azione, dati) => fetch(prova + azione, { cookie: cookieAlunno, dati });
  const foglio = await (await alunno('avvia', { id })).json();
  assert.equal(foglio.chiuse.length, 20);
  assert.equal(foglio.residuo, 35 * 60000);
  assert.equal(foglio.anagrafica.nome, 'Livia');
  assert.ok(foglio.chiuse.every(item => !Object.hasOwn(item, 'soluzione')));
  const simboli = Uint8Array.from(atob(foglio.chiaveCopia), c => c.charCodeAt(0));
  const rsa = await crypto.subtle.importKey('spki', simboli, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['wrapKey']);
  const aes = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  foglio.risposte.aperte[foglio.aperte[0].id] = 'Risposta fittizia da recuperare';
  const payload = new TextEncoder().encode(JSON.stringify({ recupero: foglio.recupero, risposte: foglio.risposte }));
  const b64 = value => btoa(String.fromCharCode(...new Uint8Array(value)));
  const copia = { versione: 1, iv: b64(iv), chiave: b64(await crypto.subtle.wrapKey('raw', aes, rsa, 'RSA-OAEP')),
    dati: b64(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aes, payload)) };
  const altra = crypto.randomUUID();
  assert.equal((await apri(altra)).status, 200);
  assert.equal((await auth('recupero', { id: altra, copia })).status, 404);
  assert.deepEqual(await (await auth('recupero', { id, copia })).json(), { id: id + ':' + elenco[0].profile_id, giaRicevuta: false });
  const receipt = await (await alunno('avvia', { id })).json();
  assert.ok(receipt.consegnata);
  assert.equal(receipt.chiuse, undefined);
  const consultata = await (await auth('classe', { id })).json();
  assert.equal(consultata.edizione.data, foglio.anagrafica.data);
  assert.equal(consultata.alunni[1].stato, 'Assente');
  assert.equal(consultata.consegne[0].origine, 'recupero');
  assert.equal(consultata.consegne[0].risposte.aperte[foglio.aperte[0].id], 'Risposta fittizia da recuperare');
  assert.equal(await (await alunno('salva', { id, residuo: 1000, revisione: receipt.revisione, risposte: foglio.risposte })).status, 409);
  assert.equal((await (await auth('archivio', {})).json()).verifiche.length, 1);
  assert.equal((await auth('configura', { id, azione: 'chiudi' })).status, 200);
  presenze[elenco[1].profile_id] = 'presente';
  assert.equal((await auth('configura', { id, presenze, azione: 'apri' })).status, 200);
  const recupero = await (await fetch(prova + 'avvia', { cookie: cookieAssente, dati: { id } })).json();
  assert.equal(recupero.chiuse.length, 20);
  assert.ok((await (await fetch(prova + 'consegna', { cookie: cookieAssente,
    dati: { id, residuo: 0, revisione: 0, risposte: recupero.risposte } })).json()).consegnata);
  await db.prepare('UPDATE profiles SET code_version = code_version + 1 WHERE id = ?').bind(elenco[0].profile_id).run();
  assert.equal((await alunno('avvia', { id })).status, 401);
  assert.equal((await db.prepare('SELECT count(*) totale FROM profiles').first()).totale, 3);

  if (process.env.VERIFICA_BROWSER === '1') await provaInterfaccia(runtime, cookie, t);
});

async function provaInterfaccia(runtime, cookie, t) {
  const require = createRequire(import.meta.url);
  const { chromium } = require(join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  t.after(() => browser.close());
  const context = await browser.newContext();
  const [name, value] = cookie.split('=');
  await context.addCookies([{ name, value, domain: new URL(origine).hostname, path: '/', secure: true, httpOnly: true }]);
  await context.route('**/*', async route => {
    const req = route.request();
    if (new URL(req.url()).origin !== origine) return route.abort();
    const headers = await req.allHeaders();
    const risposta = await runtime.docente(new Request(req.url(), {
      method: req.method(), headers, body: req.postData() ?? undefined
    }));
    return route.fulfill({ status: risposta.status, headers: Object.fromEntries(risposta.headers),
      body: Buffer.from(await risposta.arrayBuffer()) });
  });
  const pagina = await context.newPage();
  const errori = [];
  pagina.on('pageerror', errore => errori.push(errore.message));
  await pagina.goto(origine + '/docente/');
  await pagina.locator('.docente-verifiche').click({ timeout: 6000 });
  await pagina.getByRole('button', { name: 'Archivio', exact: true }).click();
  await pagina.getByRole('button', { name: /5X.*Prima somministrazione/ }).click();
  await pagina.getByText(/Consegne ricevute: 2/, { exact: false }).waitFor({ timeout: 6000 });
  await pagina.getByLabel('Consegna').selectOption({ label: 'Bruni Livia · Recuperata da file' });
  await pagina.getByText('Risposta fittizia da recuperare', { exact: true }).waitFor();
  await pagina.evaluate(() => { window.print = () => {}; });
  await pagina.getByRole('button', { name: 'Stampa tutte le consegne' }).click();
  assert.equal(await pagina.locator('#stampa-classe > article').count(), 2);
  assert.match(await pagina.locator('#stampa-classe').innerText(), /Avvio:.*Griglia di correzione/s);
  await pagina.pdf({ path: fileURLToPath(new URL('stampa-prova.pdf', pacchetto)), preferCSSPageSize: true });
  await pagina.getByRole('button', { name: 'Esci', exact: true }).click();
  await pagina.getByLabel('Password personale').waitFor({ timeout: 6000 });
  assert.deepEqual(errori, []);
}
