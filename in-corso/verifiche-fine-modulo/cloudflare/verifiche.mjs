import { contenutiVerifica, oggi } from './contenuti-verifica.mjs';
import { banca, correzioniAperte } from './banca.mjs';
import { risorse } from './risorse.mjs';

const { creaProva, pubblica, risposteValide } = contenutiVerifica(banca, correzioniAperte);
const lezioni = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'];
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const b64 = data => btoa(String.fromCharCode(...new Uint8Array(data)));
const bytes = data => Uint8Array.from(atob(data), c => c.charCodeAt(0));
const cookieNome = '__Host-tele5a-prova';
const json = (data, status = 200, extra = {}) => Response.json(data, {
  status, headers: { 'Cache-Control': 'private, no-store', ...extra }
});
const errore = (message, status = 400) => json({ errore: message }, status);
const sql = (db, query, ...params) => db.prepare(query).bind(...params);
const uno = (db, query, ...params) => sql(db, query, ...params).first();
const righe = async (db, query, ...params) => (await sql(db, query, ...params).all()).results;
const salva = (db, query, ...params) => sql(db, query, ...params).run();
const nomeEdizione = row => ({ id: row.id, anno: row.anno, classe: row.classe, modulo: row.modulo,
  creata: row.creata, data: row.prima_data, stato: row.stato });

function annoCorrente() {
  const [anno, mese] = oggi().split('-').map(Number);
  const inizio = anno - Number(mese < 9);
  return inizio + '/' + (inizio + 1);
}

async function corpo(request, limite = 48000) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json') || !request.body) return null;
  const lettore = request.body.getReader();
  const decodifica = new TextDecoder();
  let lunghezza = 0;
  let testo = '';
  try {
    for (;;) {
      const { value, done } = await lettore.read();
      if (done) break;
      lunghezza += value.byteLength;
      if (lunghezza > limite) { await lettore.cancel(); return null; }
      testo += decodifica.decode(value, { stream: true });
    }
    const dati = JSON.parse(testo + decodifica.decode());
    return dati && typeof dati === 'object' && !Array.isArray(dati) ? dati : null;
  } catch { return null; }
}

export function risorsaVerifica(path, sessioneMs) {
  const voce = risorse[path];
  if (!voce) return null;
  const [tipo, contenuto] = voce;
  return new Response(sessioneMs ? contenuto.replace('<html ', '<html data-session-ms="' + sessioneMs + '" ') : contenuto, {
    headers: { 'Content-Type': tipo + '; charset=utf-8', 'Cache-Control': 'private, no-store' }
  });
}

async function chiaveProtezione(secret) {
  const materiale = await crypto.subtle.digest('SHA-256', encoder.encode('tele5a:verifiche:chiave:v1:' + secret));
  return crypto.subtle.importKey('raw', materiale, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

async function chiavi(env) {
  const db = env.DB;
  let chiave = await uno(db, 'SELECT pubblica, privata FROM verifiche_chiavi WHERE id = 1');
  if (chiave) return chiave;
  const coppia = await crypto.subtle.generateKey({
    name: 'RSA-OAEP', modulusLength: 2048, publicExponent: Uint8Array.of(1, 0, 1), hash: 'SHA-256'
  }, true, ['encrypt', 'decrypt']);
  const [pubblica, privata] = await Promise.all([crypto.subtle.exportKey('spki', coppia.publicKey),
    crypto.subtle.exportKey('pkcs8', coppia.privateKey)]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const privataProtetta = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await chiaveProtezione(env.SYNC_SECRET), privata);
  await salva(db, 'INSERT OR IGNORE INTO verifiche_chiavi VALUES (1, ?, ?)', b64(pubblica), b64(iv) + '.' + b64(privataProtetta));
  chiave = await uno(db, 'SELECT pubblica, privata FROM verifiche_chiavi WHERE id = 1');
  return chiave;
}

async function leggiCopia(env, copia) {
  if (copia?.versione !== 1 || !['chiave', 'iv', 'dati'].every(campo => typeof copia[campo] === 'string')) {
    throw new Error('Copia non valida');
  }
  const { privata } = await chiavi(env);
  const [nonce, codificata] = privata.split('.').map(bytes);
  const chiave = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: nonce }, await chiaveProtezione(env.SYNC_SECRET), codificata);
  const rsa = await crypto.subtle.importKey('pkcs8', chiave, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']);
  const key = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, rsa, bytes(copia.chiave));
  const aes = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
  return JSON.parse(decoder.decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(copia.iv) }, aes, bytes(copia.dati))));
}

const elencoClassi = db => righe(db, 'SELECT id, year, label FROM teacher_classes ORDER BY year DESC, label');
const classeDi = (db, anno, classe) => uno(db, 'SELECT id, year, label FROM teacher_classes WHERE year = ? AND label = ?', anno, classe);
const elaborato = (db, id, profilo) => uno(db, 'SELECT * FROM verifiche_elaborati WHERE edizione_id = ? AND profilo_id = ?', id, profilo);

async function elencoAlunni(db, classeId, leggiNome) {
  const [elenco, progressi] = await Promise.all([
    righe(db, 'SELECT profile_id, position, encrypted_name FROM teacher_roster WHERE class_id = ? ORDER BY position', classeId),
    righe(db, `SELECT s.profile_id, s.record_key FROM study_records s JOIN teacher_roster r USING(profile_id)
      WHERE r.class_id = ? AND s.kind = 'lesson' AND json_extract(s.payload, '$.done') = 1`, classeId)
  ]);
  return Promise.all(elenco.map(async riga => {
    const nome = await leggiNome(riga);
    const completate = new Set(progressi.filter(v => v.profile_id === riga.profile_id).map(v => v.record_key));
    const mancanti = lezioni.filter((_, indice) => !completate.has('m1-' + (indice + 1)));
    return { id: riga.profile_id, nome: nome.first ?? '', cognome: nome.last ?? ('Posto ' + riga.position),
      mancanti, completati: lezioni.length - mancanti.length };
  }));
}

async function situazione(db, classe, edizione, leggiNome) {
  const [elenco, righeProve] = await Promise.all([
    elencoAlunni(db, classe.id, leggiNome),
    edizione ? righe(db, 'SELECT * FROM verifiche_elaborati WHERE edizione_id = ?', edizione.id) : []
  ]);
  const presenze = edizione ? JSON.parse(edizione.presenze) : {};
  const prove = new Map(righeProve.map(row => [row.profilo_id, { ...row, prova: JSON.parse(row.stato) }]));
  const alunni = elenco.map(alunno => {
    const riga = prove.get(alunno.id);
    const prova = riga?.prova;
    const presenza = presenze[alunno.id] ?? '';
    return { ...alunno, presenza, copiaScaricata: riga?.copia_scaricata, avvio: prova?.anagrafica.data,
      stato: prova?.consegnata ? 'Consegnata' : prova ? (edizione.stato === 'chiusa' ? 'Non consegnata' : 'In corso') :
        presenza === 'assente' ? 'Assente' : 'Non avviata' };
  });
  const consegne = righeProve.flatMap(row => {
    const prova = prove.get(row.profilo_id).prova;
    if (!prova.consegnata) return [];
    return [{ id: edizione.id + ':' + row.profilo_id, ...pubblica(prova), origine: prova.origine, chiuse: prova.chiuse,
      aperte: prova.aperte.map(domanda => correzioniAperte.find(voce => voce.id === domanda.id)) }];
  });
  return { edizione: edizione && nomeEdizione(edizione), stato: edizione?.stato ?? 'nuova', minuti: edizione?.minuti ?? 45,
    alunni, consegne };
}

export async function apiDocente(request, env, azione, leggiNome) {
  const db = env.DB;
  if (azione === 'sessione' && request.method === 'GET') {
    const classi = await elencoClassi(db);
    const anni = [...new Set([annoCorrente(), ...classi.map(c => c.year)])].sort().reverse();
    return json({ attiva: true, annoScolastico: annoCorrente(),
      anniConClassi: anni.map(anno => ({ anno, classi: classi.filter(c => c.year === anno).map(c => c.label) })) });
  }
  if (request.method !== 'POST') return errore('Metodo non consentito.', 405);
  const dati = await corpo(request);
  if (!dati) return errore('Richiesta non valida.');
  if (azione === 'archivio') {
    const storico = await righe(db, 'SELECT * FROM verifiche_edizioni WHERE prima_data IS NOT NULL ORDER BY prima_data DESC, creata DESC');
    return json({ anni: [...new Set([annoCorrente(), ...storico.map(p => p.anno)])].sort().reverse(),
      classi: [...new Set(storico.map(p => p.classe))], verifiche: storico.map(nomeEdizione) });
  }
  const edizione = dati.id ? await uno(db, 'SELECT * FROM verifiche_edizioni WHERE id = ?', dati.id) : null;
  if (dati.id && !edizione) return errore('Verifica non trovata.', 404);
  const classe = edizione ? { id: edizione.classe_id, year: edizione.anno, label: edizione.classe } :
    await classeDi(db, dati.anno, dati.classe);
  if (!classe) return errore('Scegli una classe registrata.');
  if (azione === 'classe') {
    const situazioneClasse = await situazione(db, classe, edizione, leggiNome);
    if (!edizione) situazioneClasse.precedenti = (await righe(db,
      "SELECT * FROM verifiche_edizioni WHERE classe_id = ? AND modulo = 'wifi' ORDER BY creata DESC", classe.id)).map(nomeEdizione);
    return json(situazioneClasse);
  }
  if (azione === 'recupero' && edizione) {
    let copia;
    try { copia = await leggiCopia(env, dati.copia); }
    catch { return errore('La copia è danneggiata o non appartiene a questo archivio.'); }
    const riga = await uno(db, 'SELECT * FROM verifiche_elaborati WHERE edizione_id = ? AND recupero = ?', edizione.id, copia?.recupero ?? '');
    if (!riga) return errore('La copia non appartiene a questa verifica.', 404);
    const prova = JSON.parse(riga.stato);
    if (!risposteValide(copia.risposte, prova)) return errore('Risposte del file non valide.');
    const id = edizione.id + ':' + riga.profilo_id;
    const adesso = new Date().toISOString();
    if (prova.consegnata) {
      await salva(db, 'UPDATE verifiche_elaborati SET copia_scaricata = COALESCE(copia_scaricata, ?) WHERE recupero = ?', adesso, riga.recupero);
      return json({ id, giaRicevuta: true });
    }
    const recuperata = { ...prova, risposte: copia.risposte, revisione: prova.revisione + 1, consegnata: adesso, origine: 'recupero' };
    const risultato = await salva(db, 'UPDATE verifiche_elaborati SET stato = ?, copia_scaricata = COALESCE(copia_scaricata, ?) WHERE recupero = ? AND stato = ?',
      JSON.stringify(recuperata), adesso, riga.recupero, riga.stato);
    return risultato.meta.changes ? json({ id, giaRicevuta: false }) : errore('La prova è cambiata. Riprova a importare.', 409);
  }
  if (azione !== 'configura') return errore('Comando non disponibile.', 404);
  if (edizione && dati.azione === 'chiudi') {
    await salva(db, "UPDATE verifiche_edizioni SET stato = 'chiusa' WHERE id = ?", edizione.id);
    return json(await situazione(db, classe, { ...edizione, stato: 'chiusa' }, leggiNome));
  }
  if (edizione ? !['salva', 'apri'].includes(dati.azione) : dati.azione !== 'crea') return errore('Azione non valida.');
  const roster = new Set((await righe(db, 'SELECT profile_id FROM teacher_roster WHERE class_id = ?', classe.id)).map(r => r.profile_id));
  if (!dati.presenze || typeof dati.presenze !== 'object' || Array.isArray(dati.presenze) ||
      !Object.entries(dati.presenze).every(([id, stato]) => roster.has(id) && ['presente', 'assente'].includes(stato))) {
    return errore('Controlla le presenze della classe scelta.');
  }
  if (dati.azione !== 'salva' && !Object.values(dati.presenze).includes('presente')) return errore('Segna almeno un presente.');
  const presenze = JSON.stringify(dati.presenze);
  if (edizione) {
    const stato = dati.azione === 'apri' ? 'aperta' : edizione.stato;
    await salva(db, 'UPDATE verifiche_edizioni SET presenze = ?, stato = ? WHERE id = ?', presenze, stato, edizione.id);
    return json(await situazione(db, classe, { ...edizione, presenze, stato }, leggiNome));
  }
  if (dati.modulo !== 'wifi' || !Number.isInteger(dati.minuti) || dati.minuti < 1 ||
      !Number.isSafeInteger(dati.minuti * 60000) || !/^[a-f0-9-]{36}$/.test(dati.operazione ?? '')) return errore('Impostazioni della prova non valide.');
  await salva(db, "INSERT OR IGNORE INTO verifiche_edizioni VALUES (?, ?, ?, ?, 'wifi', ?, NULL, ?, ?, 'aperta')",
    dati.operazione, classe.id, classe.year, classe.label, new Date().toISOString(), dati.minuti, presenze);
  const creata = await uno(db, 'SELECT * FROM verifiche_edizioni WHERE id = ?', dati.operazione);
  if (creata?.classe_id !== classe.id) return errore('Questa richiesta appartiene a un’altra classe.', 409);
  return json(await situazione(db, classe, creata, leggiNome));
}

async function profiloAttivo(db, token) {
  if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return null;
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(token));
  const impronta = Array.from(new Uint8Array(hash), n => n.toString(16).padStart(2, '0')).join('');
  return uno(db, `SELECT p.id, r.encrypted_name, r.position, c.id classe_id, c.year anno, c.label classe, s.expires_at
    FROM sessions s JOIN profiles p ON p.id = s.profile_id AND p.code_version = s.code_version
    JOIN teacher_roster r ON r.profile_id = p.id JOIN teacher_classes c ON c.id = r.class_id
    WHERE s.token_digest = ? AND s.expires_at > ?`, impronta, Math.floor(Date.now() / 1000));
}

const cookieAlunno = (token, expiresAt) => cookieNome + '=' + token + '; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=' +
  Math.max(0, expiresAt - Math.floor(Date.now() / 1000));

async function identita(db, profilo, leggiNome) {
  const nome = await leggiNome({ ...profilo, profile_id: profilo.id });
  const edizioni = await righe(db, `SELECT e.*, a.stato elaborato FROM verifiche_edizioni e
    LEFT JOIN verifiche_elaborati a ON a.edizione_id = e.id AND a.profilo_id = ?1
    WHERE e.classe_id = ?2 AND (a.profilo_id IS NOT NULL OR (e.stato = 'aperta' AND
      EXISTS (SELECT 1 FROM json_each(e.presenze) WHERE key = ?1 AND value = 'presente')))
    ORDER BY e.creata DESC`, profilo.id, profilo.classe_id);
  return { id: profilo.id, nome: nome.first ?? ('Posto ' + profilo.position), edizioni: edizioni.map(row =>
    ({ ...nomeEdizione(row), consegnata: Boolean(JSON.parse(row.elaborato ?? '{}').consegnata) })) };
}

async function rispostaAlunno(env, prova) {
  const { anagrafica, consegnata, residuo, revisione, recupero } = prova;
  if (consegnata) return json({ anagrafica, consegnata, residuo, revisione });
  return json({ ...pubblica(prova), recupero, chiaveCopia: (await chiavi(env)).pubblica });
}

export async function accessoDalSito(request, env, sito) {
  if (request.method !== 'POST' || request.headers.get('Origin') !== new URL(sito).origin ||
      !request.headers.get('Content-Type')?.startsWith('application/x-www-form-urlencoded')) {
    return errore('Accesso dal sito non autorizzato.', 403);
  }
  const testo = await request.text();
  const token = testo.length <= 128 ? new URLSearchParams(testo).get('token') : null;
  const profilo = await profiloAttivo(env.DB, token);
  const headers = { Location: '/prova/', 'Cache-Control': 'private, no-store' };
  headers['Set-Cookie'] = profilo ? cookieAlunno(token, profilo.expires_at) : cookieAlunno('', 0);
  return new Response(null, { status: 303, headers });
}

export async function apiAlunno(request, env, azione, leggiNome) {
  const db = env.DB;
  if (azione === 'salute' && request.method === 'GET') return json({});
  const credenziale = /(?:^|;\s*)__Host-tele5a-prova=([a-f0-9]{64})(?:;|$)/.exec(request.headers.get('Cookie') ?? '')?.[1];
  if (azione === 'sessione' && request.method === 'GET') {
    const profilo = await profiloAttivo(db, credenziale);
    return json(profilo ? await identita(db, profilo, leggiNome) : {});
  }
  if (request.method !== 'POST') return errore('Metodo non consentito.', 405);
  const dati = await corpo(request);
  if (!dati) return errore('Richiesta non valida.');
  if (azione === 'accesso') {
    if (!env.STUDIO) return errore('Accesso studenti momentaneamente non disponibile.', 503);
    const headers = { 'Content-Type': 'application/json' };
    const indirizzo = request.headers.get('CF-Connecting-IP');
    if (indirizzo) headers['CF-Connecting-IP'] = indirizzo;
    const sessione = await env.STUDIO.fetch(new Request('https://studio-interno/session', {
      method: 'POST', headers, body: JSON.stringify({ code: dati.codice })
    }));
    if (!sessione.ok) return errore(sessione.status === 429 ? 'Troppi tentativi. Riprova tra poco.' :
      'Codice personale non valido o accesso non disponibile.', sessione.status);
    const { token } = await sessione.json();
    const profilo = await profiloAttivo(db, token);
    return profilo ? json(await identita(db, profilo, leggiNome), 200,
      { 'Set-Cookie': cookieAlunno(token, profilo.expires_at) }) : errore('Il codice non è associato a una classe.', 403);
  }
  const profilo = await profiloAttivo(db, credenziale);
  if (!profilo) return errore('Accedi prima con il tuo codice personale.', 401);
  if (typeof dati.id !== 'string') return errore('Scegli la verifica.');
  const piano = await uno(db, 'SELECT * FROM verifiche_edizioni WHERE id = ? AND classe_id = ?', dati.id, profilo.classe_id);
  if (!piano) return errore('Verifica non disponibile per questa classe.', 403);
  let riga = await elaborato(db, piano.id, profilo.id);
  if (azione === 'copia') {
    if (!riga || riga.recupero !== dati.recupero) return errore('Copia non associata alla tua prova.', 404);
    await salva(db, 'UPDATE verifiche_elaborati SET copia_scaricata = COALESCE(copia_scaricata, ?) WHERE recupero = ?',
      new Date().toISOString(), riga.recupero);
    return json({});
  }
  if (!['avvia', 'salva', 'consegna'].includes(azione)) return errore('Comando non disponibile.', 404);
  if (!riga && piano.stato !== 'aperta') return errore('La verifica è chiusa.', 403);
  if (riga && azione === 'avvia' && JSON.parse(riga.stato).consegnata) return rispostaAlunno(env, JSON.parse(riga.stato));
  if (JSON.parse(piano.presenze)[profilo.id] !== 'presente') return errore('Il docente non ti ha ancora autorizzato.', 403);
  if (!riga && azione === 'avvia') {
    const nominativo = await leggiNome({ ...profilo, profile_id: profilo.id });
    const prova = creaProva(piano.minuti * 60000, { nome: nominativo.first ?? '', cognome: nominativo.last ?? ('Posto ' + profilo.position),
      classe: piano.classe, anno: piano.anno });
    await db.batch([
      sql(db, `INSERT OR IGNORE INTO verifiche_elaborati (edizione_id, profilo_id, recupero, stato)
        SELECT id, ?1, ?2, ?3 FROM verifiche_edizioni WHERE id = ?4 AND stato = 'aperta'
        AND EXISTS (SELECT 1 FROM json_each(presenze) WHERE key = ?1 AND value = 'presente')`,
      profilo.id, prova.recupero, JSON.stringify(prova), piano.id),
      sql(db, `UPDATE verifiche_edizioni SET prima_data = ? WHERE id = ? AND prima_data IS NULL
        AND EXISTS (SELECT 1 FROM verifiche_elaborati WHERE edizione_id = verifiche_edizioni.id)`, prova.anagrafica.data, piano.id)
    ]);
    riga = await elaborato(db, piano.id, profilo.id);
  }
  if (!riga) return errore('La prova non è aperta per te.', 403);
  const prova = JSON.parse(riga.stato);
  if (azione === 'avvia') return rispostaAlunno(env, prova);
  if (prova.consegnata) {
    return azione === 'consegna' && dati.revisione === prova.revisione - 1 ? rispostaAlunno(env, prova) :
      errore('La prova è già consegnata.', 409);
  }
  if (dati.revisione !== prova.revisione) return errore('C’è un salvataggio più recente. Riprendi la prova.', 409);
  if (!Number.isSafeInteger(dati.residuo) || dati.residuo < 0 || !risposteValide(dati.risposte, prova)) return errore('Risposte o tempo residuo non validi.');
  const residuo = Math.min(prova.residuo, dati.residuo);
  const aggiornata = { ...prova, residuo, revisione: prova.revisione + 1, risposte: dati.risposte,
    consegnata: azione === 'consegna' || residuo === 0 ? new Date().toISOString() : null };
  const esito = await salva(db, 'UPDATE verifiche_elaborati SET stato = ? WHERE edizione_id = ? AND profilo_id = ? AND stato = ?',
    JSON.stringify(aggiornata), piano.id, profilo.id, riga.stato);
  return esito.meta.changes ? rispostaAlunno(env, aggiornata) : errore('C’è un salvataggio più recente. Riprendi la prova.', 409);
}
