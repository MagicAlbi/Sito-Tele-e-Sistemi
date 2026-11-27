import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';
import { risorse } from '../../.local/verifica-wifi/cloudflare/risorse.mjs';
import { default as servizioDocente } from '../../.local/verifica-wifi/cloudflare/docente-test.mjs';
import { aggiornaPaginaTema, aggiornaScriptTema } from './icone-docente.mjs';
import { preparaIntestazioniStampa } from '../stampa-verifica-chiara/scheda-stampa.mjs';

const archivio = 'http://127.0.0.1:18765';
const indirizzo = 'http://127.0.0.1:18766';
const edizioneDimostrativa = '652f1a1f-258d-444c-9955-3538177a0348';
const paginaDocente = '/docente/';
const apiDocente = '/docente/verifiche/api/';
const percorsoAperta = paginaDocente + '?vista=in-corso';
const percorsoArchivio = paginaDocente + '?vista=archivio';
const contenuto = risorse['/docente/verifiche'][1]
  .replace('Telecomunicazioni 5A</p>', 'Telecomunicazioni 5A · Anteprima locale</p>')
  .replace('    <form class="scheda-comandi" method="post" action="/docente/esci"><button class="btn btn-ghost">Esci</button></form>\n', '')
  .replace('href="/docente/codici/"', 'href="#codici"');

const richiesta = (percorso, dati, cookie) => fetch(archivio + percorso, {
  method: dati === undefined ? 'GET' : 'POST',
  headers: { ...(cookie && { Cookie: cookie }), ...(dati !== undefined && { 'Content-Type': 'application/json' }) },
  body: dati === undefined ? undefined : JSON.stringify(dati)
});

async function accedi(percorso, dati) {
  const risposta = await richiesta(percorso, dati);
  if (!risposta.ok) throw new Error('Accesso all’archivio dimostrativo non riuscito.');
  return risposta.headers.get('Set-Cookie').split(';')[0];
}

async function verifica(risposta) {
  const dati = await risposta.json();
  if (!risposta.ok) throw new Error(dati.errore || 'Archivio dimostrativo non disponibile.');
  return dati;
}

const docente = await accedi('/api/docente/accesso', { password: 'DOCENTE-DEMO' });
const impostazioni = await verifica(await richiesta('/api/docente/classe', { id: edizioneDimostrativa }, docente));
const presenze = Object.fromEntries(impostazioni.alunni.filter(voce => voce.presenza).map(voce => [voce.id, voce.presenza]));
presenze['103'] = 'presente';
await verifica(await richiesta('/api/docente/configura', {
  id: edizioneDimostrativa, azione: impostazioni.stato === 'aperta' ? 'salva' : 'apri', presenze
}, docente));
const studente = await accedi('/api/accesso', { codice: 'WIFI-103' });
const lavoro = await verifica(await richiesta('/api/avvia', { id: edizioneDimostrativa }, studente));
if (!lavoro.consegnata && lavoro.revisione === 0) {
  await verifica(await richiesta('/api/salva', {
    id: edizioneDimostrativa, revisione: 0, residuo: lavoro.residuo - 120000,
    risposte: { chiuse: { [lavoro.chiuse[0].id]: 1, [lavoro.chiuse[1].id]: 2 }, aperte: {}, esercizi: {} }
  }, studente));
}

const [tipoGestione, gestione] = risorse['/docente/verifiche-risorse/scheda-docente.js'];
const percorsoStileScheda = '/docente/verifiche-risorse/scheda-docente.css';
const stileScheda = risorse[percorsoStileScheda][1] + '\n' +
  await readFile(new URL('../stampa-verifica-chiara/stampa-chiara.css', import.meta.url), 'utf8');
const gestioneAnteprima = gestione.replace('  if (dati.attiva) navigaDocente();', `  if (dati.attiva) {
    const vistaDemo = new URLSearchParams(location.search).get('vista');
    if (location.hash || !['in-corso', 'archivio'].includes(vistaDemo)) {
      navigaDocente();
      return;
    }
    void mostraVista('archivio').then(() => {
      if (vistaDemo !== 'in-corso' || navigazione !== 'archivio') return;
      const esempio = storico.find(voce => voce.id === '${edizioneDimostrativa}');
      if (!esempio) return;
      edizione = esempio.id;
      void aggiornaClasse('classe', true);
    });
  }`);
if (gestioneAnteprima === gestione) throw new Error('Apertura della vista dimostrativa non configurata.');

const loginDemo = await servizioDocente.fetch(new Request(indirizzo + paginaDocente), {
  SYNC_SECRET: '0'.repeat(64), TEACHER_PASSWORD_SHA256: '0'.repeat(64), DB: {}
});
const paginaIngresso = aggiornaPaginaTema(await loginDemo.text())
  .replace('https://magicalbi.github.io/Sito-Tele-e-Sistemi/assets/css/style.css', '/docente/verifiche-risorse/style.css');
const pannelloOriginale = await servizioDocente.fetch(new Request(indirizzo + '/docente/pannello.js'), {});
const pannello = aggiornaScriptTema(await pannelloOriginale.text());

function invia(res, tipo, corpo, status = 200) {
  res.writeHead(status, { 'Content-Type': tipo + '; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(corpo);
}

function reindirizza(res, percorso) {
  res.writeHead(303, { Location: percorso });
  res.end();
}

async function gestisci(req, res) {
  const { pathname } = new URL(req.url, indirizzo);
  if (pathname === '/') return reindirizza(res, percorsoAperta);
  if (pathname === paginaDocente) return invia(res, 'text/html', contenuto);
  if (pathname === '/docente/ingresso-demo') return invia(res, 'text/html', paginaIngresso);
  if (pathname === '/docente/accesso' && req.method === 'POST') return reindirizza(res, percorsoArchivio);
  if (pathname === '/docente/pannello.js') return invia(res, 'text/javascript', pannello);
  if (pathname === '/docente/verifiche-risorse/scheda-docente.js') {
    return invia(res, tipoGestione, preparaIntestazioniStampa(gestioneAnteprima));
  }
  if (pathname === percorsoStileScheda) return invia(res, 'text/css', stileScheda);
  if (pathname === '/docente/verifiche-risorse/style.css') {
    return invia(res, 'text/css', risorse[pathname][1].replace(/^@import .+;\r?\n/m, ''));
  }
  if (pathname.startsWith(apiDocente)) {
    const corpo = req.method === 'POST' ? await new Response(Readable.toWeb(req)).json() : undefined;
    const esito = await richiesta('/api/docente/' + pathname.slice(apiDocente.length), corpo, docente);
    return invia(res, 'application/json', await esito.text(), esito.status);
  }
  const risorsa = risorse[pathname];
  if (risorsa) return invia(res, ...risorsa);
  if (pathname === '/docente/stile.css') {
    const stile = await servizioDocente.fetch(new Request(indirizzo + pathname), {});
    return invia(res, 'text/css', await stile.text());
  }
  invia(res, 'text/plain', 'Pagina non trovata.', 404);
}

createServer((req, res) => {
  gestisci(req, res).catch(errore => {
    console.error(errore);
    invia(res, 'text/plain', 'Anteprima locale non disponibile.', 500);
  });
}).listen(18766, '127.0.0.1', () => console.log('Area docente esplorabile: ' + indirizzo));
