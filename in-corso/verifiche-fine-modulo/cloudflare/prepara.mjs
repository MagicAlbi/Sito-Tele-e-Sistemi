import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { banca, correzioniAperte } from '../leggi-banca-verifica.mjs';

const leggi = nome => readFile(new URL(nome, import.meta.url), 'utf8');
const destinazione = new URL('../../../.local/verifica-wifi/cloudflare/', import.meta.url);
const scrivi = (nome, contenuto) => writeFile(new URL(nome, destinazione), contenuto, 'utf8');
const risorse = {};
const docente = '/docente/verifiche-risorse/';
const prova = '/prova/risorse/';
const css = 'text/css';
const js = 'text/javascript';
const html = 'text/html';
const risorsa = (url, tipo, testo) => { risorse[url] = [tipo, testo]; };

let scolastica = await leggi('../scheda-docente.html');
scolastica = scolastica.replace(/<!-- SOLO FILE LOCALE -->[\s\S]*?<!-- FINE SOLO FILE LOCALE -->/, '')
  .replace('Telecomunicazioni 5A · Bozza locale', 'Telecomunicazioni 5A')
  .replace('<script defer src="verifica-tema.js"></script>', '')
  .replace('data-verifica-tema', 'data-theme-toggle')
  .replace(/<form id="accesso-docente"[\s\S]*?<\/form>/, '<form id="accesso-docente" hidden></form>')
  .replace('href="#codici"', 'href="/docente/codici/"')
  .replace('href="#area-docente"', 'href="/docente/"')
  .replace('href="/index.html"', 'href="https://magicalbi.github.io/Sito-Tele-e-Sistemi/"')
  .replace('    <p id="torna-home"', '    <form class="scheda-comandi" method="post" action="/docente/esci"><button class="btn btn-ghost">Esci</button></form>\n    <p id="torna-home"')
  .replace(/(?<=href="|src=")(?:\.\.\/\.\.\/assets\/(?:css\/|img\/))?([\w-]+\.(?:css|svg|js))(?=")/g, docente + '$1')
  .replace('</head>', '<script src="/docente/pannello.js" defer></script></head>');
risorsa('/docente/verifiche', html, scolastica);
risorsa(docente + 'scheda-docente.js', js, (await leggi('../scheda-docente.js'))
  .replace("'/api/docente/'", "'/docente/verifiche/api/'"));
risorsa(docente + 'scheda-docente.css', css, await leggi('../scheda-docente.css'));

let alunno = await leggi('../verifica-demo.html');
alunno = alunno.replace('Codice di prova', 'Codice personale')
  .replace('Accedi alla bozza', 'Accedi')
  .replace('Cambia profilo demo', 'Usa un altro codice')
  .replace(/<p class="prova-aiuto">Bozza con dati inventati[^<]*<\/p>/, '')
  .replace('id="codice" type="text"', 'id="codice" type="password" minlength="8" maxlength="8"')
  .replace(/(?<=href="|src=")\/(?:assets\/(?:css\/|img\/))?([\w-]+\.(?:css|svg|js))(?=")/g, prova + '$1');
risorsa('/prova/', html, alunno);
risorsa(prova + 'verifica-demo.js', js, (await leggi('../verifica-demo.js')).replace("'/api/'", "'/prova/api/'"));
risorsa(prova + 'verifica-demo.css', css, await leggi('../verifica-demo.css'));

for (const percorso of [docente, prova]) {
  risorsa(percorso + 'style.css', css, await leggi('../../../assets/css/style.css'));
  risorsa(percorso + 'introduzione-lezioni.css', css, await leggi('../../../assets/css/introduzione-lezioni.css'));
  risorsa(percorso + 'verifica-tema.css', css, await leggi('../verifica-tema.css'));
  for (const nome of ['esercizi-wlan-tempo', 'esercizi-wlan-segnale', 'quiz-wlan-rete', 'quiz-wlan-scambio', 'indice-rete-radio']) {
    risorsa(percorso + nome + '.svg', 'image/svg+xml', await leggi('../../../assets/img/' + nome + '.svg'));
  }
}
risorsa(prova + 'verifica-tema.js', js, await leggi('../verifica-tema.js'));

let worker = await leggi('../../logout-area-docente/docente.mjs');
function cambia(prima, dopo) {
  if (!worker.includes(prima)) throw new Error('La base del servizio docente è cambiata. Controllare: ' + prima);
  worker = worker.replace(prima, dopo);
}
cambia("import { WorkerEntrypoint } from 'cloudflare:workers';",
  "import { WorkerEntrypoint } from 'cloudflare:workers';\nimport { accessoDalSito, apiDocente, apiAlunno, risorsaVerifica } from './verifiche.mjs';");
cambia("connect-src 'self'; form-action", "connect-src 'self'; img-src 'self'; form-action");
cambia('method="get" action="/docente/"', 'method="get" action="/docente/codici/"');
cambia("  if (path === '/docente/' && request.method === 'GET') return response(await listClasses(env.DB, url, expiresAt));", `
  if (request.method === 'GET' && path === '/docente/') {
    return paginaVerifiche(risorsaVerifica('/docente/verifiche', Math.max(0, expiresAt * 1000 - Date.now())));
  }
  if (request.method === 'GET' && path === '/docente/codici/') return response(await listClasses(env.DB, url, expiresAt));
  if (path === '/docente/verifiche' && request.method === 'GET') return redirect('/docente/#verifiche');
  if (path.startsWith('/docente/verifiche-risorse/') && request.method === 'GET') {
    return paginaVerifiche(risorsaVerifica(path));
  }`.trimStart());
cambia('export default {', `
function paginaVerifiche(risorsa) {
  if (!risorsa) return response('Risorsa non trovata.', 404, 'text/plain');
  const intestazioni = new Headers(headers);
  intestazioni.set('Content-Type', risorsa.headers.get('Content-Type'));
  return new Response(risorsa.body, { headers: intestazioni });
}

function nomiVerifiche(env) {
  let chiave;
  const privata = () => (chiave ??= keys(env.SYNC_SECRET).then(chiavi => chiavi.privateKey));
  return async riga => riga.encrypted_name
    ? JSON.parse(await decrypt(await privata(), riga.profile_id, 'name', riga.encrypted_name))
    : {};
}

export default {`.trimStart());
cambia("      if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) {", `
      if (path === '/prova/accesso-sito') return await accessoDalSito(request, env, SITE);
      if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) {`.slice(1));
cambia("      const now = Math.floor(Date.now() / 1000);", `
      if (path === '/prova') return redirect('/prova/');
      if (request.method === 'GET' && (path === '/prova/' || path.startsWith('/prova/risorse/'))) {
        return paginaVerifiche(risorsaVerifica(path));
      }
      if (path.startsWith('/prova/api/')) {
        return await apiAlunno(request, env, path.slice('/prova/api/'.length), nomiVerifiche(env));
      }
      const now = Math.floor(Date.now() / 1000);`.slice(1));
cambia("      const nextExpiry = now + sessionLength;", `
      if (path.startsWith('/docente/verifiche/api/')) {
        return await apiDocente(request, env, path.slice('/docente/verifiche/api/'.length), nomiVerifiche(env));
      }
      const nextExpiry = now + sessionLength;`.slice(1));

const ingresso = '<p><a class="btn btn-primary" id="verifica-docente" href="https://tele5a-docente.alberto-pignato.workers.dev/prova/">Apri la verifica del docente</a></p>';
const paginaModulo = (await leggi('../../../modulo1/verifica.html'))
  .replace('<main class="main-content">', '<main class="main-content">\n    ' + ingresso)
  .replace('</body>', '<script type="module">\n' + await leggi('accesso-prova.js') + '\n</script>\n</body>');
if (!paginaModulo.includes(ingresso)) throw new Error('Aggiornare il punto di ingresso nella pagina del Modulo 1.');

await mkdir(destinazione, { recursive: true });
await Promise.all([
  scrivi('docente.mjs', worker),
  scrivi('verifiche.mjs', await leggi('verifiche.mjs')),
  scrivi('contenuti-verifica.mjs', await leggi('../contenuti-verifica.mjs')),
  scrivi('schema-verifiche.sql', await leggi('schema-verifiche.sql')),
  scrivi('modulo1-verifica.html', paginaModulo),
  scrivi('banca.mjs', 'export const banca = ' + JSON.stringify(banca) + ';\nexport const correzioniAperte = ' + JSON.stringify(correzioniAperte) + ';\n'),
  scrivi('risorse.mjs', 'export const risorse = ' + JSON.stringify(risorse) + ';\n')
]);
console.log('Pacchetto locale pronto in', destinazione.pathname);
