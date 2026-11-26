import { createDecipheriv, generateKeyPairSync, privateDecrypt, randomUUID } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { banca, correzioniAperte } from './leggi-banca-verifica.mjs';
import { contenutiVerifica, oggi } from './contenuti-verifica.mjs';

const leggi = nome => readFile(new URL(nome, import.meta.url), 'utf8');
const [anno, mese] = oggi().split('-').map(Number);
const inizio = anno - Number(mese < 9);
const annoScolastico = inizio + '/' + (inizio + 1);
const annoPrecedente = (inizio - 1) + '/' + inizio;
const profili = [
  { id: '101', nome: 'Linda', cognome: 'Tessari', classe: '5A', completati: 6 },
  { id: '102', nome: 'Elio', cognome: 'Mancini', classe: '5A', completati: 6 },
  { id: '103', nome: 'Flora', cognome: 'Lenzi', classe: '5A', completati: 5 },
  { id: '104', nome: 'Dario', cognome: 'Valli', classe: '5A', completati: 6 },
  { id: '105', nome: 'Iris', cognome: 'Riva', classe: '5B', completati: 6 },
  { id: '201', nome: 'Ada', cognome: 'Villa', classe: '5A', completati: 6, anno: annoPrecedente },
  { id: '202', nome: 'Gioele', cognome: 'Marchi', classe: '5A', completati: 5, anno: annoPrecedente }
].map(profilo => ({ anno: annoScolastico, ...profilo }));
const anniConClassi = [
  { anno: annoScolastico, classi: ['5A', '5B'] },
  { anno: annoPrecedente, classi: ['5A'] }
];
const classi = [...new Set(profili.map(alunno => alunno.classe))];
const classeValida = (anno, classe) => anniConClassi.some(voce => voce.anno === anno && voce.classi.includes(classe));
const sottomoduli = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'];
const sessioni = new Map();

function accedi(res, ruolo, profilo) {
  const token = randomUUID();
  sessioni.set(token, { ruolo, profilo });
  res.setHeader('Set-Cookie', 'demo_' + ruolo + '=' + token + '; HttpOnly; SameSite=Strict; Path=/');
}

function sessione(req, ruolo) {
  const cookie = (req.headers.cookie ?? '').split(/;\s*/).find(voce => voce.startsWith('demo_' + ruolo + '='));
  const dati = sessioni.get(cookie?.split('=')[1]);
  return dati?.ruolo === ruolo ? dati : null;
}
const { creaProva, pubblica, risposteValide } = contenutiVerifica(banca, correzioniAperte);

function rispostaAlunno(prova) {
  if (!prova.consegnata) return { ...pubblica(prova), recupero: prova.recupero, chiaveCopia: chiaviCopia.pubblica };
  const { anagrafica, consegnata, residuo, revisione } = prova;
  return { anagrafica, consegnata, residuo, revisione };
}

const port = Number(process.env.VERIFICA_PORT ?? 8765);
const durataTest = Number(process.env.VERIFICA_SECONDI ?? 0) * 1000;
if (!Number.isSafeInteger(durataTest) || durataTest < 0) throw new Error('Durata di prova non valida.');
const percorsoDb = process.env.VERIFICA_DB ??
  fileURLToPath(new URL('../../.local/verifica-wifi/prove.sqlite', import.meta.url));
if (percorsoDb !== ':memory:') await mkdir(dirname(percorsoDb), { recursive: true });
const db = new DatabaseSync(percorsoDb);
db.exec('CREATE TABLE IF NOT EXISTS chiavi_recupero (id INTEGER PRIMARY KEY, pubblica TEXT NOT NULL, privata TEXT NOT NULL)');
const cercaChiavi = db.prepare('SELECT pubblica, privata FROM chiavi_recupero WHERE id = 1');
if (!cercaChiavi.get()) {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'der' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
  db.prepare('INSERT OR IGNORE INTO chiavi_recupero VALUES (1, ?, ?)').run(publicKey.toString('base64'), privateKey);
}
const chiaviCopia = cercaChiavi.get();

function leggiCopia(copia) {
  if (copia?.versione !== 1) throw new Error('Versione di copia non supportata.');
  const chiave = privateDecrypt({ key: chiaviCopia.privata, oaepHash: 'sha256' }, Buffer.from(copia.chiave, 'base64'));
  const iv = Buffer.from(copia.iv, 'base64');
  const cifrata = Buffer.from(copia.dati, 'base64');
  if (iv.length !== 12 || cifrata.length <= 16) throw new Error('Copia incompleta.');
  const decifra = createDecipheriv('aes-256-gcm', chiave, iv);
  decifra.setAuthTag(cifrata.subarray(-16));
  return JSON.parse(Buffer.concat([decifra.update(cifrata.subarray(0, -16)), decifra.final()]).toString('utf8'));
}

db.exec('CREATE TABLE IF NOT EXISTS prove (codice TEXT PRIMARY KEY, stato TEXT NOT NULL)');
const cerca = db.prepare('SELECT stato FROM prove WHERE codice = ?');
const inserisci = db.prepare('INSERT INTO prove (codice, stato) VALUES (?, ?) ON CONFLICT(codice) DO NOTHING');
const aggiorna = db.prepare('UPDATE prove SET stato = ? WHERE codice = ? AND stato = ?');
const proveClasse = db.prepare("SELECT codice, stato FROM prove WHERE codice LIKE ?");
db.exec("CREATE TABLE IF NOT EXISTS configurazioni (chiave TEXT PRIMARY KEY, minuti INTEGER, autorizzati TEXT, stato TEXT NOT NULL DEFAULT 'aperta')");
if (!db.prepare('PRAGMA table_info(configurazioni)').all().some(colonna => colonna.name === 'stato')) {
  db.exec("ALTER TABLE configurazioni ADD COLUMN stato TEXT NOT NULL DEFAULT 'aperta'");
}
db.exec(`
  CREATE TABLE IF NOT EXISTS edizioni (
    id TEXT PRIMARY KEY, anno TEXT NOT NULL, classe TEXT NOT NULL, modulo TEXT NOT NULL,
    creata TEXT NOT NULL, minuti INTEGER NOT NULL, presenze TEXT NOT NULL, stato TEXT NOT NULL
  );
`);
const nuovaEdizione = db.prepare('INSERT OR IGNORE INTO edizioni VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
for (const riga of db.prepare("SELECT * FROM configurazioni WHERE stato <> 'bozza'").all()) {
  const [anno, classe] = riga.chiave.split(':');
  if (!classe || !anno) continue;
  const date = proveClasse.all(riga.chiave + ':%').map(prova => JSON.parse(prova.stato).anagrafica?.data).filter(Boolean).sort();
  const presenze = Object.fromEntries(JSON.parse(riga.autorizzati).map(id => [id, 'presente']));
  nuovaEdizione.run(riga.chiave, anno, classe, 'wifi', date[0] ?? oggi(), riga.minuti, JSON.stringify(presenze), riga.stato);
}
const cercaEdizione = db.prepare('SELECT * FROM edizioni WHERE id = ?');
const edizioniClasse = db.prepare('SELECT * FROM edizioni WHERE anno = ? AND classe = ? ORDER BY creata DESC, rowid DESC');
const tutteEdizioni = db.prepare('SELECT * FROM edizioni ORDER BY creata DESC, rowid DESC');
const aggiornaEdizione = db.prepare('UPDATE edizioni SET presenze = ?, stato = ? WHERE id = ?');
db.exec('CREATE TABLE IF NOT EXISTS copie_urgenza (prova TEXT PRIMARY KEY, data TEXT NOT NULL)');
const registraCopia = db.prepare('INSERT INTO copie_urgenza VALUES (?, ?) ON CONFLICT(prova) DO NOTHING');
const copiaRegistrata = db.prepare('SELECT data FROM copie_urgenza WHERE prova = ?');

function schedaDocente(id, prova) {
  return { id, ...pubblica(prova), origine: prova.origine, chiuse: prova.chiuse,
    aperte: prova.aperte.map(domanda => correzioniAperte.find(voce => voce.id === domanda.id)) };
}

function sintesi(piano, prove = proveClasse.all(piano.id + ':%')) {
  const date = prove.map(riga => JSON.parse(riga.stato).anagrafica?.data).filter(Boolean).sort();
  return { id: piano.id, anno: piano.anno, classe: piano.classe, modulo: piano.modulo,
    creata: piano.creata, data: date[0] ?? null, stato: piano.stato, iniziata: prove.length > 0 };
}

function situazione(classe, piano, annoScelto = piano?.anno ?? annoScolastico) {
  const presenze = piano ? JSON.parse(piano.presenze) : {};
  const righe = piano ? proveClasse.all(piano.id + ':%') : [];
  const prove = new Map(righe.map(riga => [riga.codice, JSON.parse(riga.stato)]));
  return { edizione: piano ? sintesi(piano, righe) : null, stato: piano?.stato ?? 'nuova', minuti: piano?.minuti ?? 45,
    alunni: profili.filter(alunno => alunno.classe === classe && (alunno.anno === annoScelto ||
      (piano && (presenze[alunno.id] || prove.has(piano.id + ':' + alunno.id))))).map(alunno => {
      const chiave = piano ? piano.id + ':' + alunno.id : null;
      const prova = prove.get(chiave);
      const presenza = presenze[alunno.id] ?? '';
      return { ...alunno, mancanti: sottomoduli.slice(alunno.completati), presenza,
        autorizzato: presenza === 'presente',
        copiaScaricata: chiave ? copiaRegistrata.get(chiave)?.data ?? null : null,
        avvio: prova?.anagrafica?.data ?? null,
        stato: prova?.consegnata ? 'Consegnata' : prova ?
          (piano.stato === 'chiusa' ? 'Non consegnata' : 'In corso') : presenza === 'assente' ? 'Assente' : 'Non avviata' };
    }).sort((a, b) => a.cognome.localeCompare(b.cognome, 'it')),
    consegne: [...prove].filter(([, prova]) => prova.consegnata).map(([id, prova]) => schedaDocente(id, prova))
      .sort((a, b) => a.anagrafica.cognome.localeCompare(b.anagrafica.cognome, 'it'))
  };
}

function perAlunno(alunno) {
  return edizioniClasse.all(alunno.anno, alunno.classe).filter(piano =>
    cerca.get(piano.id + ':' + alunno.id) ||
    (piano.stato === 'aperta' && JSON.parse(piano.presenze)[alunno.id] === 'presente'));
}

function sessioneAlunno(alunno) {
  return alunno ? { id: alunno.id, nome: alunno.nome, edizioni: perAlunno(alunno).map(piano => ({
    id: piano.id, creata: piano.creata, stato: piano.stato,
    consegnata: Boolean(JSON.parse(cerca.get(piano.id + ':' + alunno.id)?.stato ?? '{}').consegnata)
  })) } : {};
}
const stile = ['../../assets/css/style.css', 'text/css; charset=utf-8'];
const pagine = new Map([
  ['/', ['verifica-demo.html', 'text/html; charset=utf-8']],
  ['/index.html', ['../../index.html', 'text/html; charset=utf-8']],
  ['/verifica-demo.css', ['verifica-demo.css', 'text/css; charset=utf-8']],
  ['/verifica-demo.js', ['verifica-demo.js', 'text/javascript; charset=utf-8']],
  ['/docente', ['scheda-docente.html', 'text/html; charset=utf-8']],
  ['/anteprima-archivio.html', ['anteprima-archivio.html', 'text/html; charset=utf-8']],
  ['/anteprima-archivio.js', ['anteprima-archivio.js', 'text/javascript; charset=utf-8']],
  ['/anteprima-archivio.css', ['anteprima-archivio.css', 'text/css; charset=utf-8']],
  ['/scheda-docente.css', ['scheda-docente.css', 'text/css; charset=utf-8']],
  ['/scheda-docente.js', ['scheda-docente.js', 'text/javascript; charset=utf-8']],
  ['/verifica-tema.css', ['verifica-tema.css', 'text/css; charset=utf-8']],
  ['/verifica-tema.js', ['verifica-tema.js', 'text/javascript; charset=utf-8']],
  ['/style.css', stile], ['/assets/css/style.css', stile],
  ['/assets/css/introduzione-lezioni.css', ['../../assets/css/introduzione-lezioni.css', 'text/css; charset=utf-8']],
  ['/assets/css/margini-indici.css', ['../../assets/css/margini-indici.css', 'text/css; charset=utf-8']],
  ['/assets/css/accesso-studio.css', ['../../assets/css/accesso-studio.css', 'text/css; charset=utf-8']],
  ['/assets/js/app.js', ['../../assets/js/app.js', 'text/javascript; charset=utf-8']],
  ...['indice-rete-radio', 'indice-nodi-wan', 'quiz-wlan-rete', 'quiz-wlan-scambio', 'esercizi-wlan-tempo', 'esercizi-wlan-segnale'].map(
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
    if (req.url === '/index.html') {
      body = body.replace(/<a href="[^"]+">Area docente<\/a>/, '<a href="/docente">Area docente</a>')
        .replace(/<script type="module" src="assets\/js\/accesso-studio\.js"[^>]*><\/script>/, '');
    }
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
    return res.end(body);
  }
  if (req.method === 'GET' && req.url === '/api/sessione') {
    const alunno = sessione(req, 'alunno')?.profilo;
    return invia(res, 200, sessioneAlunno(alunno));
  }
  if (req.method === 'GET' && req.url === '/api/docente/sessione') {
    return invia(res, 200, { attiva: Boolean(sessione(req, 'docente')), annoScolastico, anniConClassi });
  }
  if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json' || ![
    '/api/accesso', '/api/avvia', '/api/salva', '/api/consegna', '/api/copia',
    '/api/docente/accesso', '/api/docente/classe', '/api/docente/configura', '/api/docente/recupero', '/api/docente/archivio', '/api/docente/codici'
  ].includes(req.url)) {
    return invia(res, 404, { errore: 'Pagina non trovata.' });
  }
  let corpo = '';
  req.setEncoding('utf8');
  for await (const pezzo of req) {
    corpo += pezzo;
    const limite = req.url === '/api/docente/recupero' ? 48000 : 16000;
    if (corpo.length > limite) return invia(res, 413, { errore: 'Salvataggio troppo grande.' });
  }
  let dati;
  try { dati = JSON.parse(corpo); } catch { return invia(res, 400, { errore: 'Dati non validi.' }); }
  if (!dati || typeof dati !== 'object') return invia(res, 400, { errore: 'Dati non validi.' });
  if (req.url === '/api/docente/accesso') {
    if (dati.password !== 'DOCENTE-DEMO') return invia(res, 401, { errore: 'Password demo non valida.' });
    accedi(res, 'docente');
    return invia(res, 200, { attiva: true, annoScolastico, anniConClassi });
  }
  if (req.url.startsWith('/api/docente/')) {
    if (!sessione(req, 'docente')) return invia(res, 401, { errore: 'Accedi come docente dimostrativo.' });
    if (req.url === '/api/docente/archivio') {
      const storico = tutteEdizioni.all().map(piano => sintesi(piano)).filter(piano => piano.iniziata);
      return invia(res, 200, { anni: [...new Set([annoScolastico, ...storico.map(piano => piano.anno)])].sort().reverse(),
        classi: [...new Set([...classi, ...storico.map(piano => piano.classe)])], verifiche: storico });
    }
    if (req.url === '/api/docente/codici') {
      return invia(res, 200, { alunni: profili.filter(alunno => alunno.anno === annoScolastico).map(({ id, nome, cognome, classe }) =>
        ({ nome, cognome, classe, codice: 'WIFI-' + id })) });
    }
    const { id, minuti, azione, presenze } = dati;
    const piano = typeof id === 'string' ? cercaEdizione.get(id) : null;
    if (id && !piano) return invia(res, 404, { errore: 'Verifica non trovata.' });
    const classe = piano?.classe ?? dati.classe;
    const annoScelto = piano?.anno ?? dati.anno ?? annoScolastico;
    if (!piano && !classeValida(annoScelto, classe)) return invia(res, 400, { errore: 'Scegli una classe dell’anno selezionato.' });
    if (req.url === '/api/docente/recupero') {
      let copia;
      try { copia = leggiCopia(dati.copia); }
      catch { return invia(res, 400, { errore: 'La copia è danneggiata o non appartiene a questo archivio.' }); }
      if (!piano) return invia(res, 400, { errore: 'Apri la verifica a cui appartiene la copia.' });
      const righe = proveClasse.all(piano.id + ':%');
      for (const riga of righe) {
        const prova = JSON.parse(riga.stato);
        if (!prova.recupero || prova.recupero !== copia?.recupero) continue;
        if (!risposteValide(copia.risposte, prova)) return invia(res, 400, { errore: 'Risposte del file non valide.' });
        const adesso = new Date().toISOString();
        registraCopia.run(riga.codice, adesso);
        if (prova.consegnata) return invia(res, 200, { id: riga.codice, giaRicevuta: true });
        const recuperata = { ...prova, risposte: copia.risposte, revisione: prova.revisione + 1,
          consegnata: adesso, origine: 'recupero' };
        if (!aggiorna.run(JSON.stringify(recuperata), riga.codice, riga.stato).changes) {
          return invia(res, 409, { errore: 'La prova è cambiata durante il recupero. Riprova a importare il file.' });
        }
        return invia(res, 200, { id: riga.codice, giaRicevuta: false });
      }
      return invia(res, 404, { errore: 'La copia non corrisponde a una prova di questa classe.' });
    }
    if (req.url === '/api/docente/configura') {
      if (azione === 'chiudi' && piano) {
        aggiornaEdizione.run(piano.presenze, 'chiusa', piano.id);
        return invia(res, 200, situazione(classe, cercaEdizione.get(piano.id)));
      }
      if ((!piano && azione !== 'crea') || (piano && !['salva', 'apri'].includes(azione))) {
        return invia(res, 400, { errore: 'Scegli un’azione per la verifica.' });
      }
      if (!piano && (!Number.isInteger(minuti) || minuti < 1 || !Number.isSafeInteger(minuti * 60000))) {
        return invia(res, 400, { errore: 'Imposta una durata valida prima di aprire la verifica.' });
      }
      const alunni = new Set(situazione(classe, piano, annoScelto).alunni.map(alunno => alunno.id));
      if (!presenze || typeof presenze !== 'object' || Array.isArray(presenze) ||
          !Object.entries(presenze).every(([id, esito]) => ['presente', 'assente'].includes(esito) &&
            alunni.has(id))) {
        return invia(res, 400, { errore: 'Controlla le presenze della classe scelta.' });
      }
      if (azione !== 'salva' && !Object.values(presenze).includes('presente')) {
        return invia(res, 400, { errore: 'Segna almeno un alunno come Presente prima di aprire la verifica.' });
      }
      const presenti = JSON.stringify(presenze);
      if (piano) {
        aggiornaEdizione.run(presenti, azione === 'apri' ? 'aperta' : piano.stato, piano.id);
        return invia(res, 200, situazione(classe, cercaEdizione.get(piano.id)));
      }
      if (dati.modulo !== 'wifi') {
        return invia(res, 400, { errore: 'Scegli il Modulo 1 Wi-Fi.' });
      }
      const creata = dati.operazione;
      if (typeof creata !== 'string' || !/^[0-9a-f-]{36}$/.test(creata)) {
        return invia(res, 400, { errore: 'Richiesta di creazione non valida.' });
      }
      const precedente = cercaEdizione.get(creata);
      if (precedente && (precedente.classe !== classe || precedente.anno !== annoScelto)) {
        return invia(res, 409, { errore: 'Questa richiesta appartiene a un’altra verifica.' });
      }
      nuovaEdizione.run(creata, annoScelto, classe, 'wifi', new Date().toISOString(), minuti, presenti, 'aperta');
      return invia(res, 200, situazione(classe, cercaEdizione.get(creata)));
    }
    return invia(res, 200, piano ? situazione(classe, piano) : { ...situazione(classe, null, annoScelto),
      precedenti: edizioniClasse.all(annoScelto, classe).map(edizione => sintesi(edizione)) });
  }
  if (req.url === '/api/accesso') {
    const alunno = profili.find(profilo => 'WIFI-' + profilo.id === dati.codice);
    if (!alunno) return invia(res, 403, { errore: 'Codice di prova non valido.' });
    accedi(res, 'alunno', alunno);
    return invia(res, 200, sessioneAlunno(alunno));
  }
  const alunno = sessione(req, 'alunno')?.profilo;
  if (!alunno) return invia(res, 401, { errore: 'Accedi prima con il tuo codice personale.' });
  const piano = typeof dati.id === 'string' ? cercaEdizione.get(dati.id) : perAlunno(alunno)[0];
  if (!piano || piano.anno !== alunno.anno || piano.classe !== alunno.classe) {
    return invia(res, 403, { errore: 'Non hai una verifica disponibile. Chiedi al docente.' });
  }
  const codice = piano.id + ':' + alunno.id;
  let riga = cerca.get(codice);
  if (req.url === '/api/copia') {
    const prova = riga && JSON.parse(riga.stato);
    if (!prova?.recupero || dati.recupero !== prova.recupero) {
      return invia(res, 404, { errore: 'Copia non associata alla tua prova.' });
    }
    registraCopia.run(codice, new Date().toISOString());
    return invia(res, 200, {});
  }
  if (!riga && piano?.stato !== 'aperta') {
    return invia(res, 403, { errore: 'La verifica è chiusa. Aspetta che il docente la apra.' });
  }
  if (riga && req.url === '/api/avvia' && JSON.parse(riga.stato).consegnata) {
    return invia(res, 200, rispostaAlunno(JSON.parse(riga.stato)));
  }
  if (JSON.parse(piano.presenze)[alunno.id] !== 'presente') {
    return invia(res, 403, { errore: 'Il docente non ti ha ancora autorizzato per questa verifica.' });
  }
  if (req.url === '/api/avvia') {
    if (!riga) {
      inserisci.run(codice, JSON.stringify(creaProva(durataTest || piano.minuti * 60000, alunno)));
      riga = cerca.get(codice);
    }
    const prova = JSON.parse(riga.stato);
    if (!prova.recupero) {
      prova.recupero = randomUUID();
      aggiorna.run(JSON.stringify(prova), codice, riga.stato);
    }
    return invia(res, 200, rispostaAlunno(prova));
  }
  if (!riga) return invia(res, 404, { errore: 'Avvia prima la prova.' });
  const prova = JSON.parse(riga.stato);
  if (prova.consegnata) {
    return req.url === '/api/consegna' && dati.revisione === prova.revisione - 1 ?
      invia(res, 200, rispostaAlunno(prova)) : invia(res, 409, { errore: 'La prova è già consegnata.' });
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
  return invia(res, 200, rispostaAlunno(successiva));
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
