import { randomInt } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const leggi = nome => readFile(new URL(nome, import.meta.url), 'utf8');
const banca = runInNewContext(
  await leggi('../../modulo1/domande-allenamento.js') + '\ndomandeAllenamento',
  { QuizAllenamento: { init() {} }, document: { getElementById() {} } }
).map(({ prompt, source, options }, indice) => ({
  id: 'a' + (indice + 1), lezione: Number(source.href.match(/lezione-1-(\d)/)[1]), prompt, options
}));
for (const riga of (await leggi('DOMANDE-CHIUSE.md')).split(/\r?\n/)) {
  if (!/^\| \d{2} \|/.test(riga)) continue;
  const [numero, prompt, a, b, c, d, soluzione] = riga.split('|').slice(1, -1).map(cella => cella.trim());
  banca.push({
    id: 'n' + numero, lezione: Math.ceil(Number(numero) / 4), prompt,
    options: [a, b, c, d].map((text, indice) => ({ text, correct: 'ABCD'[indice] === soluzione[0] }))
  });
}
const correzioniAperte = runInNewContext(await leggi('aperte-docente.js') + '\naperteDocente')
  .map((domanda, indice) => ({ ...domanda, id: [2, 5, 6, 7][indice] }));
const aperte = correzioniAperte.map(({ id, title, prompt }) => ({ id, title, prompt }));
const esercizi = {
  file: [[450, 240, 65], [480, 250, 68]],
  radio: [[17, 3, 2, 75, 12, -67], [18, 4, 2, 77, 13, -69]]
};
const autorizzati = new Set(['WIFI-101', 'WIFI-102', 'WIFI-103']);
const quote = [3, 3, 3, 3, 4, 4];
if (banca.length !== 100 || aperte.length !== 4 || new Set(banca.map(domanda => domanda.id)).size !== 100 ||
    banca.some(({ options }) => options.length !== 4 || new Set(options.map(opzione => opzione.text)).size !== 4 ||
      options.filter(opzione => opzione.correct).length !== 1)) {
  throw new Error('Controllare la banca delle domande della bozza.');
}

function mescola(valori) {
  const copia = [...valori];
  for (let indice = copia.length - 1; indice > 0; indice--) {
    const altro = randomInt(indice + 1);
    [copia[indice], copia[altro]] = [copia[altro], copia[indice]];
  }
  return copia;
}

function creaProva(durata) {
  const estratte = mescola(quote.flatMap((quota, indice) =>
    mescola(banca.filter(domanda => domanda.lezione === indice + 1)).slice(0, quota)
  ));
  const posizioni = mescola(estratte.map((_, indice) => indice % 4));
  const chiuse = estratte.map(({ id, lezione, prompt, options }, indice) => {
    const opzioni = mescola(options.filter(opzione => !opzione.correct)).map(opzione => opzione.text);
    opzioni.splice(posizioni[indice], 0, options.find(opzione => opzione.correct).text);
    return { id, lezione, prompt, opzioni, soluzione: posizioni[indice] };
  });
  return {
    chiuse, aperte: mescola(aperte).slice(0, 2),
    esercizi: { file: esercizi.file[randomInt(2)], radio: esercizi.radio[randomInt(2)] },
    risposte: { chiuse: {}, aperte: {}, esercizi: {} },
    residuo: durata, revisione: 0, consegnata: null
  };
}

function pubblica(prova) {
  return {
    chiuse: prova.chiuse.map(({ id, lezione, prompt, opzioni }) => ({ id, lezione, prompt, opzioni })),
    aperte: prova.aperte, esercizi: prova.esercizi, risposte: prova.risposte, residuo: prova.residuo,
    revisione: prova.revisione, consegnata: prova.consegnata
  };
}

function risposteValide(risposte, prova) {
  if (!risposte || typeof risposte !== 'object') return false;
  const gruppi = [
    ['chiuse', prova.chiuse.map(domanda => domanda.id), valore => Number.isInteger(valore) && valore >= 0 && valore <= 3],
    ['aperte', prova.aperte.map(domanda => String(domanda.id)), valore => typeof valore === 'string' && valore.length <= 4000],
    ['esercizi', ['velocita', 'tempo', 'potenza', 'margine'], valore => typeof valore === 'string' && valore.length <= 30]
  ];
  return gruppi.every(([nome, chiavi, valido]) => {
    const gruppo = risposte[nome];
    return gruppo && typeof gruppo === 'object' && !Array.isArray(gruppo) &&
      Object.entries(gruppo).every(([chiave, valore]) => chiavi.includes(chiave) && valido(valore));
  });
}

const port = Number(process.env.VERIFICA_PORT ?? 8765);
const durata = Number(process.env.VERIFICA_SECONDI ?? 45 * 60) * 1000;
if (!Number.isSafeInteger(durata) || durata < 1000) throw new Error('Durata di prova non valida.');
const percorsoDb = process.env.VERIFICA_DB ??
  fileURLToPath(new URL('../../.local/verifica-wifi/prove.sqlite', import.meta.url));
if (percorsoDb !== ':memory:') await mkdir(dirname(percorsoDb), { recursive: true });
const db = new DatabaseSync(percorsoDb);
db.exec('CREATE TABLE IF NOT EXISTS prove (codice TEXT PRIMARY KEY, stato TEXT NOT NULL)');
const cerca = db.prepare('SELECT stato FROM prove WHERE codice = ?');
const inserisci = db.prepare('INSERT INTO prove (codice, stato) VALUES (?, ?) ON CONFLICT(codice) DO NOTHING');
const aggiorna = db.prepare('UPDATE prove SET stato = ? WHERE codice = ? AND stato = ?');
const consegne = db.prepare("SELECT codice, stato FROM prove WHERE json_extract(stato, '$.consegnata') IS NOT NULL ORDER BY codice");
const stile = ['../../assets/css/style.css', 'text/css; charset=utf-8'];
const pagine = new Map([
  ['/', ['verifica-demo.html', 'text/html; charset=utf-8']],
  ['/verifica-demo.css', ['verifica-demo.css', 'text/css; charset=utf-8']],
  ['/verifica-demo.js', ['verifica-demo.js', 'text/javascript; charset=utf-8']],
  ['/docente', ['scheda-docente.html', 'text/html; charset=utf-8']],
  ['/scheda-docente.css', ['scheda-docente.css', 'text/css; charset=utf-8']],
  ['/scheda-docente.js', ['scheda-docente.js', 'text/javascript; charset=utf-8']],
  ['/verifica-tema.css', ['verifica-tema.css', 'text/css; charset=utf-8']],
  ['/verifica-tema.js', ['verifica-tema.js', 'text/javascript; charset=utf-8']],
  ['/style.css', stile], ['/assets/css/style.css', stile],
  ['/assets/css/introduzione-lezioni.css', ['../../assets/css/introduzione-lezioni.css', 'text/css; charset=utf-8']],
  ...['indice-rete-radio', 'quiz-wlan-rete', 'quiz-wlan-scambio', 'esercizi-wlan-tempo', 'esercizi-wlan-segnale'].map(
    nome => ['/assets/img/' + nome + '.svg', ['../../assets/img/' + nome + '.svg', 'image/svg+xml']]
  )
]);

function invia(res, codice, dati) {
  res.writeHead(codice, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(dati));
}

async function gestisci(req, res) {
  if (req.method === 'GET' && req.url === '/api/salute') return invia(res, 200, {});
  const pagina = req.method === 'GET' && pagine.get(req.url);
  if (pagina) {
    const [nome, contentType] = pagina;
    let body = await leggi(nome);
    if (pagina === stile) body = body.replace(/^@import .+;\r?\n/m, '');
    if (req.url === '/docente') body = body.replace(/<!-- SOLO FILE LOCALE -->[\s\S]*?<!-- FINE SOLO FILE LOCALE -->/, '');
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
    return res.end(body);
  }
  if (req.method !== 'POST' || !['/api/avvia', '/api/salva', '/api/consegna', '/api/docente'].includes(req.url)) {
    return invia(res, 404, { errore: 'Pagina non trovata.' });
  }
  let corpo = '';
  req.setEncoding('utf8');
  for await (const pezzo of req) {
    corpo += pezzo;
    if (corpo.length > 16000) return invia(res, 413, { errore: 'Salvataggio troppo grande.' });
  }
  let dati;
  try { dati = JSON.parse(corpo); } catch { return invia(res, 400, { errore: 'Dati non validi.' }); }
  const codice = dati?.codice;
  if (req.url === '/api/docente') {
    if (codice !== 'DOCENTE-DEMO') return invia(res, 403, { errore: 'Codice docente di prova non valido.' });
    return invia(res, 200, consegne.all().map(riga => {
      const prova = JSON.parse(riga.stato);
      return {
        codice: riga.codice, ...pubblica(prova), chiuse: prova.chiuse,
        aperte: prova.aperte.map(domanda => correzioniAperte.find(voce => voce.id === domanda.id))
      };
    }));
  }
  if (!autorizzati.has(codice)) return invia(res, 403, { errore: 'Codice di prova assente o non abilitato.' });
  let riga = cerca.get(codice);
  if (req.url === '/api/avvia') {
    if (!riga) {
      inserisci.run(codice, JSON.stringify(creaProva(durata)));
      riga = cerca.get(codice);
    }
    return invia(res, 200, pubblica(JSON.parse(riga.stato)));
  }
  if (!riga) return invia(res, 404, { errore: 'Avvia prima la prova.' });
  const prova = JSON.parse(riga.stato);
  if (prova.consegnata) {
    return req.url === '/api/consegna' && dati.revisione === prova.revisione - 1 ?
      invia(res, 200, pubblica(prova)) : invia(res, 409, { errore: 'La prova è già consegnata.' });
  }
  if (dati.revisione !== prova.revisione) return invia(res, 409, { errore: 'C’è un salvataggio più recente. Riprendi la prova.' });
  if (!Number.isSafeInteger(dati.residuo) || dati.residuo < 0 || !risposteValide(dati.risposte, prova)) {
    return invia(res, 400, { errore: 'Risposte o tempo residuo non validi.' });
  }
  const residuo = Math.min(prova.residuo, dati.residuo);
  const consegnata = req.url === '/api/consegna' || residuo === 0 ? new Date().toISOString() : null;
  const successiva = {
    ...prova, residuo, consegnata, revisione: prova.revisione + 1,
    risposte: { chiuse: dati.risposte.chiuse, aperte: dati.risposte.aperte, esercizi: dati.risposte.esercizi }
  };
  if (!aggiorna.run(JSON.stringify(successiva), codice, riga.stato).changes) {
    return invia(res, 409, { errore: 'C’è un salvataggio più recente. Riprendi la prova.' });
  }
  return invia(res, 200, pubblica(successiva));
}

const server = createServer((req, res) => {
  gestisci(req, res).catch(error => {
    console.error(error);
    if (!res.headersSent) invia(res, 500, { errore: 'Archivio della bozza non disponibile.' });
    else res.end();
  });
});
server.listen(port, '127.0.0.1', () => {
  console.log('Bozza verifica Wi-Fi: http://127.0.0.1:' + server.address().port + '/');
});
