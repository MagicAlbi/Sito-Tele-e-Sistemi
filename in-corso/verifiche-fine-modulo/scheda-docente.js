'use strict';

const esempi = [
  {
    indiciAperte: [0, 2],
    risposte: [
      'Una cella ha un Access Point. Le celle hanno lo stesso SSID e il portatile si associa al punto più vicino.',
      'I due terminali non si sentono. I segnali possono scontrarsi quando arrivano al punto di accesso. Il terminale aspetta il CTS prima di mandare i dati.'
    ],
    file: [450, 240, 65],
    radio: [18, 4, 2, 77, 13, -69],
    risultati: ['156', '23,1', '−67', '0']
  },
  {
    indiciAperte: [1, 3],
    risposte: [
      'I terminali ascoltano e aspettano per un tempo scelto a caso. Se il canale è occupato fermano il contatore. L’ACK indica che i dati sono arrivati.',
      'Con il MIMO si possono inviare più flussi indipendenti. Il beamforming rinforza il segnale verso un dispositivo. OFDM usa più sottoportanti.'
    ],
    file: [480, 250, 68],
    radio: [17, 3, 2, 75, 12, -67],
    risultati: ['170', '22,59', '−65', '+2']
  }
];

const selettore = document.querySelector('#esempio');
const consegna = document.querySelector('#consegna');
const accessoDocente = document.querySelector('#accesso-docente');
const passwordDocente = document.querySelector('#password-docente-demo');
const esitoAccesso = document.querySelector('#esito-accesso');
const battutaDocente = document.querySelector('#battuta-docente');
const statoDocente = document.querySelector('#stato-docente');
const stampa = document.querySelector('#stampa');
const valutazioni = new Map();
let consegneVisibili = new Map();
const configurazione = document.querySelector('#configurazione');
const classe = document.querySelector('#classe');
const configura = document.querySelector('#configura');
const minuti = document.querySelector('#minuti');
const elencoAlunni = document.querySelector('#elenco-alunni');
const apriVerifica = document.querySelector('#apri-verifica');
const chiudiVerifica = document.querySelector('#chiudi-verifica');
const salvaImpostazioni = configura.querySelector('[value="salva"]');
const statoVerifica = document.querySelector('#stato-verifica');
const importaCopia = document.querySelector('#importa-copia');
const fileCopia = document.querySelector('#file-copia');
const statoImportazione = document.querySelector('#stato-importazione');
const oraCopia = new Intl.DateTimeFormat('it-IT', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Rome' });
const stampaTutte = document.querySelector('#stampa-tutte');
const stampaClasse = document.querySelector('#stampa-classe');
const dataItaliana = new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome' });
let richiestaClasse = 0;
let salvaConfigurazione = false;
const formato = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 2 });

function mescola(elementi) {
  const copia = [...elementi];
  for (let indice = copia.length - 1; indice > 0; indice--) {
    const altro = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[altro]] = [copia[altro], copia[indice]];
  }
  return copia;
}

function consegneDiEsempio() {
  const chiuse = [3, 3, 3, 3, 4, 4].flatMap((quota, indice) => domandeAllenamento
    .filter(domanda => domanda.source.href.startsWith('lezione-1-' + (indice + 1) + '.html'))
    .slice(0, quota));
  return esempi.map((esempio, numero) => {
    const posizioni = mescola(chiuse.map((_, indice) => indice % 4));
    const domande = chiuse.map(({ prompt, options }, indice) => {
      const opzioni = mescola(options.filter(opzione => !opzione.correct)).map(opzione => opzione.text);
      const soluzione = posizioni[indice];
      opzioni.splice(soluzione, 0, options.find(opzione => opzione.correct).text);
      const posizione = indice + numero;
      const scelta = posizione % 9 === 0 ? -1 : posizione % 4 === 0 ? (soluzione + 1) % 4 : soluzione;
      return { prompt, opzioni, soluzione, scelta };
    });
    return {
      ...esempio, codice: 'Esempio ' + (numero + 1), chiuse: domande,
      aperte: esempio.indiciAperte.map((id, indice) => ({ ...aperteDocente[id], risposta: esempio.risposte[indice] }))
    };
  });
}

function testo(valore) {
  return String(valore).replace(/[&<>"]/g, carattere => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
  })[carattere]);
}

function riquadro(titolo, corpo, classe = '') {
  return '<div class="scheda-riquadro ' + classe + '"><h4>' + titolo + '</h4>' + corpo + '</div>';
}

function griglia(criteri, gruppo, indice) {
  const sigla = gruppo + '-' + indice;
  const righe = criteri.map(({ text, points }, posizione) =>
    '<tr><th scope="row">' + testo(text) + '</th><td>' + points + '</td><td>' +
    '<input type="number" min="0" max="' + points + '" step="any" name="' + sigla + '-' + posizione +
    '" data-punti="' + gruppo + '" aria-label="Punti per ' + testo(text) + '">' +
    '<span class="scheda-solo-stampa">_____</span></td></tr>').join('');
  const massimo = criteri.reduce((totale, criterio) => totale + criterio.points, 0);
  const schemi = gruppo === 'aperte' ?
    '<tr><th scope="row">Schemi</th><td>—</td><td>' +
    '<input type="text" class="scheda-giudizio" name="schemi-' + indice +
    '" aria-label="Schemi per la domanda ' + (indice + 1) +
    '"><span class="scheda-solo-stampa">_____</span></td></tr>' : '';
  return '<table class="scheda-tabella scheda-griglia"><thead><tr><th scope="col">Criterio</th>' +
    '<th scope="col">Punti ideali</th><th scope="col">Punti assegnati</th></tr></thead><tbody>' +
    righe + schemi + '</tbody><tfoot><tr><th scope="row">Totale</th><td>' + massimo +
    '</td><td data-subtotale="' + sigla + '">—</td></tr></tfoot></table>';
}

function sezioneChiuse(chiuse) {
  let totale = 0;
  const domande = chiuse.map(({ prompt, opzioni, soluzione, scelta }, indice) => {
    totale += Number(scelta === soluzione);
    const elenco = opzioni.map((opzione, posizione) => {
      const giusta = posizione === soluzione;
      const errata = posizione === scelta && !giusta;
      const stato = giusta ? 'giusta' : errata ? 'errata' : '';
      const etichetta = giusta ? 'Risposta corretta' : errata ? 'Risposta errata dell’alunno' : '';
      return '<li class="scheda-opzione ' + stato + '"><span class="scheda-lettera" aria-hidden="true">' +
        'ABCD'[posizione] + '</span><span>' + testo(opzione) + '</span>' +
        (stato ? '<span class="scheda-pallino ' + stato + '" role="img" aria-label="' + etichetta + '"></span>' : '') +
        '</li>';
    }).join('');
    const stato = scelta < 0 ? 'omessa' : scelta === soluzione ? 'giusta' : 'errata';
    return '<article class="scheda-blocco scheda-chiusa ' + stato + '"><h3><span class="scheda-numero">' +
      (indice + 1) + '</span><span>' + testo(prompt) + '</span>' +
      '</h3><ol class="scheda-opzioni">' + elenco + '</ol>' +
      (scelta < 0 ? '<p class="scheda-etichetta">Risposta non data</p>' : '') + '</article>';
  }).join('');
  return '<section><h2>Domande chiuse</h2><p class="scheda-legenda">' +
    '<span><i class="scheda-pallino giusta"></i> Risposta giusta</span>' +
    '<span><i class="scheda-pallino errata"></i> Risposta errata dell’alunno</span></p>' + domande +
    '<p class="scheda-totale" data-chiuse="' + totale + '">Totale domande chiuse ' + totale + ' / 20</p></section>';
}

function sezioneAperte(aperte) {
  const domande = aperte.map(({ title, prompt, model, rubric, risposta }, indice) => {
    return '<article class="scheda-blocco scheda-articolata"><h3>Domanda ' + (indice + 1) + ' · ' + testo(title) + '</h3>' +
      riquadro('Consegna', '<p>' + testo(prompt) + '</p>', 'scheda-consegna') +
      riquadro('Risposta dell’alunno', '<p>' + testo(risposta || 'Risposta non data') + '</p>', 'scheda-risposta') +
      riquadro('Risposta modello', '<p>' + testo(model) + '</p>') +
      riquadro('Griglia di correzione', griglia(rubric, 'aperte', indice) +
        '<p class="scheda-nota">Per ogni criterio, assegna tutti i punti se il concetto è corretto, anche se espresso con parole diverse dalla risposta modello. Assegna parte dei punti se è incompleto e zero se manca o è errato.</p>') +
      '</article>';
  }).join('');
  return '<section><h2>Domande aperte</h2>' + domande + '</section>';
}

function esercizio(indice, titolo, traccia, risultati, passaggi, criteri) {
  const righe = risultati.map(([campo, risposta, atteso, unita, tolleranza = 0]) => {
    const omessa = !risposta.trim();
    const valore = omessa ? NaN : Number(risposta.replace('−', '-').replace(',', '.'));
    const corretto = tolleranza === 0 ? valore === atteso :
      Math.abs(valore - atteso) <= Math.abs(atteso) * tolleranza;
    const minimo = Math.ceil((atteso - Math.abs(atteso) * tolleranza) * 100) / 100;
    const massimo = Math.floor((atteso + Math.abs(atteso) * tolleranza) * 100) / 100;
    const intervallo = tolleranza === 0 ? 'Valore esatto' :
      formato.format(minimo) + '–' + formato.format(massimo) + ' ' + unita + ' (±3%)';
    const inserito = omessa ? 'Non dato' : testo(risposta + ' ' + unita) +
      '<br><strong>' + (corretto ? 'Corretto' : 'Da rivedere') + '</strong>';
    return '<tr><th scope="row">' + testo(campo) + '</th><td>' + inserito + '</td><td>' +
      testo(formato.format(atteso).replace('-', '−') + ' ' + unita) + '</td><td>' +
      testo(intervallo) + '</td></tr>';
  }).join('');
  const tabella = '<table class="scheda-tabella"><thead><tr><th scope="col">Risultato</th><th scope="col">Inserito</th>' +
    '<th scope="col">Atteso</th><th scope="col">Intervallo accettato</th></tr></thead><tbody>' + righe + '</tbody></table>';
  const guida = '<ol class="scheda-passaggi">' + passaggi.map(([formula, descrizione, calcolo]) =>
    '<li><p class="scheda-formula">' + formula + '</p><p class="scheda-formula-parole">' + descrizione +
    '</p><p class="scheda-calcolo">' + calcolo + '</p></li>').join('') + '</ol>';
  return '<article class="scheda-blocco scheda-articolata"><h3>' + titolo + '</h3>' +
    riquadro('Consegna', '<p>' + traccia + '</p>', 'scheda-consegna') +
    riquadro('Risultati', tabella) + riquadro('Formule e svolgimento', guida) +
    riquadro('Griglia di correzione', griglia(criteri, 'esercizi', indice)) + '</article>';
}

function sezioneEsercizi(esempio) {
  const [mb, nominale, percento] = esempio.file;
  const mbit = mb * 8;
  const utile = nominale * percento / 100;
  const secondi = formato.format(mbit / utile);
  const [tx, antennaTx, antennaRx, percorso, parete, soglia] = esempio.radio;
  const perdite = percorso + parete;
  const ricevuta = tx + antennaTx + antennaRx - perdite;
  const margine = ricevuta - soglia;
  const segno = valore => String(valore).replace('-', '−');
  return '<section><h2>Esercizi</h2>' + esercizio(0, '1. Trasferimento di un file',
    'Una postazione del laboratorio trasferisce un video da ' + mb +
    ' MB. La velocità nominale Wi-Fi è ' + nominale + ' Mbit/s e quella utile è il ' + percento +
    '% della nominale. Assumi che resti costante e usa 1 MB = 8 Mbit. Calcola velocità utile e tempo.',
    [['Velocità utile', esempio.risultati[0], utile, 'Mbit/s'],
      ['Tempo di trasferimento', esempio.risultati[1], mbit / utile, 's', 0.03]],
    [['<var>R</var><sub>u</sub> = <var>R</var><sub>n</sub> × <var>p</var> / 100',
      'Velocità utile = velocità nominale × percentuale utile ÷ 100', nominale + ' Mbit/s × ' + formato.format(percento / 100) + ' = ' + utile + ' Mbit/s.'],
      ['<var>D</var><sub>Mbit</sub> = 8 × <var>D</var><sub>MB</sub>',
        'Dimensione (Mbit) = dimensione (MB) × 8', mb + ' MB × 8 Mbit/MB = ' + mbit + ' Mbit.'],
      ['<var>t</var> = <var>D</var><sub>Mbit</sub> / <var>R</var><sub>u</sub>',
        'Tempo = dimensione (Mbit) ÷ velocità utile (Mbit/s)', mbit + ' Mbit ÷ (' + utile + ' Mbit/s) ≈ ' + secondi + ' s.']],
    [{ text: 'Calcolo della velocità utile', points: 2 }, { text: 'Conversione da MB a Mbit', points: 1 },
      { text: 'Calcolo del tempo e unità', points: 2 }]) + esercizio(1, '2. Copertura oltre una parete',
    'Un access point trasmette a ' + tx + ' dBm. Le antenne hanno guadagni di ' + antennaTx + ' dBi in trasmissione e ' +
    antennaRx + ' dBi in ricezione. Il percorso perde ' + percorso + ' dB e la parete aggiunge ' + parete +
    ' dB di perdita. La soglia è ' + segno(soglia) + ' dBm. Calcola potenza ricevuta e margine rispetto alla soglia.',
    [['Potenza ricevuta', esempio.risultati[2], ricevuta, 'dBm'],
      ['Margine', esempio.risultati[3], margine, 'dB']],
    [['<var>L</var><sub>tot</sub> = <var>L</var><sub>percorso</sub> + <var>L</var><sub>parete</sub>',
      'Perdite totali = perdita sul percorso + perdita della parete', percorso + ' dB + ' + parete + ' dB = ' + perdite + ' dB.'],
      ['<var>P</var><sub>rx</sub> = <var>P</var><sub>tx</sub> + <var>G</var><sub>tx</sub> + <var>G</var><sub>rx</sub> − <var>L</var><sub>tot</sub>',
        'Potenza ricevuta = potenza trasmessa + guadagni delle antenne − perdite totali',
        tx + ' dBm + ' + antennaTx + ' dBi + ' + antennaRx + ' dBi − ' + perdite + ' dB = ' + segno(ricevuta) + ' dBm.'],
      ['<var>M</var> = <var>P</var><sub>rx</sub> − <var>P</var><sub>soglia</sub>',
        'Margine = potenza ricevuta − soglia richiesta', segno(ricevuta) + ' dBm − (' + segno(soglia) + ' dBm) = +' + margine + ' dB.']],
    [{ text: 'Somma delle perdite', points: 1 }, { text: 'Calcolo della potenza ricevuta e unità', points: 2 },
      { text: 'Calcolo del margine e unità', points: 2 }]) + '</section>';
}

function riepilogo() {
  return '<section class="scheda-blocco scheda-articolata scheda-riepilogo"><h2>Calcolo del totale</h2>' +
    '<table class="scheda-tabella"><thead><tr><th scope="col">Sezione</th>' +
    '<th scope="col">Punti assegnati</th><th scope="col">Punti massimi</th></tr></thead><tbody>' +
    '<tr><th scope="row">Domande chiuse</th><td data-totale="chiuse"></td><td>20</td></tr>' +
    '<tr><th scope="row">Domande aperte</th><td data-totale="aperte">—</td><td>20</td></tr>' +
    '<tr><th scope="row">Esercizi</th><td data-totale="esercizi">—</td><td>10</td></tr></tbody>' +
    '<tfoot><tr><th scope="row">Totale della verifica</th><td data-totale="verifica" aria-live="polite">—</td>' +
    '<td>50</td></tr></tfoot></table></section>';
}

function sommaCampi(campi) {
  const valori = [...campi].filter(campo => campo.value !== '' && campo.validity.valid);
  if (valori.length !== campi.length) return null;
  return valori.reduce((somma, campo) => somma + campo.valueAsNumber, 0);
}

function aggiornaTotali(scheda) {
  const chiuseCorrette = Number(scheda.querySelector('[data-chiuse]').dataset.chiuse);
  const aperte = sommaCampi(scheda.querySelectorAll('[data-punti="aperte"]'));
  const esercizi = sommaCampi(scheda.querySelectorAll('[data-punti="esercizi"]'));
  scheda.querySelector('[data-totale="chiuse"]').textContent = chiuseCorrette;
  scheda.querySelector('[data-totale="aperte"]').textContent = aperte === null ? '—' : formato.format(aperte);
  scheda.querySelector('[data-totale="esercizi"]').textContent = esercizi === null ? '—' : formato.format(esercizi);
  scheda.querySelector('[data-totale="verifica"]').textContent = aperte === null || esercizi === null ?
    '—' : formato.format(chiuseCorrette + aperte + esercizi);
  for (const cella of scheda.querySelectorAll('[data-subtotale]')) {
    const punti = sommaCampi(scheda.querySelectorAll('input[name^="' + cella.dataset.subtotale + '-"]'));
    cella.textContent = punti === null ? '—' : formato.format(punti);
  }
}

function aggiornaStampa(campo) {
  const valore = campo.type === 'number' ? formato.format(campo.valueAsNumber) : campo.value.trim();
  campo.nextElementSibling.textContent = campo.validity.valid && campo.value !== '' ? valore : '_____';
}

function compilaScheda(scheda, assegnata) {
  const id = assegnata.codice;
  if (!valutazioni.has(id)) valutazioni.set(id, {});
  const voti = valutazioni.get(id);
  scheda.innerHTML = '<section aria-label="Dati della prova"><p><strong>' +
    testo(assegnata.intestazione ?? id) + '</strong> · Punteggio massimo 50</p></section>' +
    sezioneChiuse(assegnata.chiuse) + sezioneAperte(assegnata.aperte) + sezioneEsercizi(assegnata) + riepilogo();
  for (const campo of scheda.querySelectorAll('input')) {
    campo.value = voti[campo.name] ?? '';
    aggiornaStampa(campo);
  }
  aggiornaTotali(scheda);
}

function mostraConsegna() {
  const assegnata = consegneVisibili.get(selettore.value);
  stampa.disabled = !assegnata;
  stampa.hidden = !assegnata;
  if (assegnata) compilaScheda(consegna, assegnata);
  else consegna.replaceChildren();
}

function elencaConsegne(elenco) {
  const precedente = selettore.value;
  const prima = [...consegneVisibili.keys()];
  consegneVisibili = new Map(elenco.map(voce => [voce.codice, voce]));
  if (prima.length === elenco.length && elenco.every((voce, indice) => voce.codice === prima[indice])) return;
  selettore.replaceChildren(...elenco.map(voce => new Option(voce.etichetta ?? voce.codice, voce.codice)));
  if (consegneVisibili.has(precedente)) selettore.value = precedente;
  document.querySelector('#scelta-consegna').hidden = elenco.length === 0;
  stampaTutte.disabled = elenco.length === 0;
  mostraConsegna();
}

async function apiDocente(percorso, dati) {
  const opzioni = { signal: AbortSignal.timeout(5000), cache: 'no-store' };
  if (dati) Object.assign(opzioni, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dati)
  });
  const risposta = await fetch('/api/docente/' + percorso, opzioni);
  const risultato = await risposta.json();
  if (!risposta.ok) throw new Error(risultato.errore);
  return risultato;
}

const menuDocente = document.querySelector('#menu-docente');
const tornaDocente = document.querySelector('#torna-docente');
const menuVerifiche = document.querySelector('#menu-verifiche');
const annoNuovo = document.querySelector('#anno-scolastico');
const archivio = document.querySelector('#archivio-docente');
const annoArchivio = document.querySelector('#archivio-anno');
const classeArchivio = document.querySelector('#archivio-classe');
const moduloArchivio = document.querySelector('#archivio-modulo');
const elencoArchivio = document.querySelector('#elenco-archivio');
const codici = document.querySelector('#codici-alunni');
const classeCodici = document.querySelector('#classe-codici');
const elencoCodici = document.querySelector('#elenco-codici');
const titoloConfigurazione = document.querySelector('#titolo-configurazione');
const contestoEdizione = document.querySelector('#contesto-edizione');
const filtriNuova = document.querySelector('#filtri-nuova');
const avvisoEdizioni = document.querySelector('#avviso-edizioni');
const edizioniPrecedenti = document.querySelector('#edizioni-precedenti');
const dataOraItaliana = new Intl.DateTimeFormat('it-IT', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'Europe/Rome' });
let navigazione = 'inizio';
let autenticato = false;
let edizione = null;
let anniConClassi = [];
let storico = [];
let codiciDemo = [];
let creazionePendente;

function opzioni(selettore, valori, primo = null) {
  const scelta = selettore.value;
  selettore.replaceChildren(...(primo ? [new Option(primo, '')] : []), ...valori.map(voce => new Option(voce, voce)));
  if (valori.includes(scelta)) selettore.value = scelta;
}

function pulsanteEdizione(voce) {
  const pulsante = document.createElement('button');
  pulsante.type = 'button';
  pulsante.className = 'btn btn-ghost';
  const data = voce.data ? 'Prima somministrazione ' + dataItaliana.format(new Date(voce.data)) : 'Mai avviata';
  const creazione = voce.creata.includes('T') ? dataOraItaliana.format(new Date(voce.creata)) : dataItaliana.format(new Date(voce.creata));
  pulsante.textContent = [voce.classe, data, 'Creata ' + creazione, voce.stato === 'aperta' ? 'Aperta' : 'Chiusa'].join(' · ');
  pulsante.addEventListener('click', () => {
    edizione = voce.id;
    configura.hidden = true;
    elencaConsegne([]);
    void aggiornaClasse('classe', true);
  });
  return pulsante;
}

function disegnaArchivio() {
  const visibili = storico.filter(voce => voce.anno === annoArchivio.value &&
    (!classeArchivio.value || classeArchivio.value === voce.classe) &&
    (!moduloArchivio.value || moduloArchivio.value === voce.modulo));
  elencoArchivio.replaceChildren(...visibili.map(pulsanteEdizione));
  if (!visibili.length) elencoArchivio.textContent = 'Nessuna verifica svolta per questi filtri.';
}

function disegnaCodici() {
  elencoCodici.replaceChildren(...codiciDemo.filter(voce => voce.classe === classeCodici.value).map(voce => {
    const riga = document.createElement('tr');
    riga.insertCell().textContent = voce.cognome + ' ' + voce.nome;
    riga.insertCell().textContent = voce.codice;
    return riga;
  }));
}

async function mostraVista(vista) {
  navigazione = vista;
  richiestaClasse++;
  creazionePendente = null;
  edizione = null;
  const verifiche = vista === 'nuova' || vista === 'archivio';
  menuDocente.hidden = vista !== 'inizio';
  tornaDocente.hidden = vista === 'inizio';
  menuVerifiche.hidden = !verifiche;
  codici.hidden = vista !== 'codici';
  archivio.hidden = vista !== 'archivio';
  configurazione.hidden = vista !== 'nuova';
  configura.hidden = true;
  contestoEdizione.hidden = true;
  importaCopia.hidden = true;
  stampaTutte.hidden = true;
  statoDocente.textContent = '';
  statoImportazione.textContent = '';
  elencaConsegne([]);
  for (const pulsante of menuVerifiche.querySelectorAll('button')) {
    pulsante.setAttribute('aria-pressed', String(pulsante.value === vista));
  }
  try {
    if (vista === 'archivio') {
      const dati = await apiDocente('archivio', {});
      if (navigazione !== vista) return;
      storico = dati.verifiche;
      opzioni(annoArchivio, dati.anni);
      opzioni(classeArchivio, dati.classi, 'Tutte le classi');
      moduloArchivio.replaceChildren(new Option('Tutti i moduli', ''), new Option('Modulo 1 · Wi-Fi', 'wifi'));
      disegnaArchivio();
    } else if (vista === 'codici') {
      const dati = await apiDocente('codici', {});
      if (navigazione !== vista) return;
      codiciDemo = dati.alunni;
      disegnaCodici();
    } else if (vista === 'nuova') {
      disegnaIntestazione(null);
      if (classe.value) void aggiornaClasse('classe', true);
    }
  } catch (errore) {
    if (navigazione === vista) statoDocente.textContent = errore.message;
  }
}

function mostraAccesso(dati) {
  autenticato = dati.attiva;
  accessoDocente.hidden = dati.attiva;
  battutaDocente.hidden = !dati.attiva;
  anniConClassi = dati.anniConClassi;
  opzioni(annoNuovo, anniConClassi.map(voce => voce.anno));
  annoNuovo.value = dati.annoScolastico;
  const classiCorrenti = anniConClassi.find(voce => voce.anno === annoNuovo.value).classi;
  opzioni(classe, classiCorrenti, 'Scegli una classe');
  opzioni(classeCodici, classiCorrenti);
  if (dati.attiva) navigaDocente();
}

function navigaDocente() {
  if (!autenticato) return;
  const vista = { '#verifiche': 'nuova', '#codici': 'codici' }[location.hash] ?? 'inizio';
  void mostraVista(vista);
}

function disegnaIntestazione(voce) {
  configurazione.hidden = false;
  titoloConfigurazione.textContent = voce ? 'Verifica Wi-Fi · ' + voce.classe : 'Nuova verifica';
  filtriNuova.hidden = Boolean(voce);
  contestoEdizione.hidden = !voce;
  contestoEdizione.textContent = voce ? voce.anno + ' · ' +
    (voce.data ? 'Prima somministrazione ' + dataItaliana.format(new Date(voce.data)) : 'Mai avviata') : '';
  avvisoEdizioni.textContent = '';
  edizioniPrecedenti.replaceChildren();
}

function disegnaConfigurazione(dati) {
  disegnaIntestazione(dati.edizione);
  configura.hidden = false;
  minuti.value = dati.minuti;
  minuti.readOnly = Boolean(dati.edizione);
  salvaImpostazioni.hidden = !dati.edizione;
  if (dati.precedenti?.length) {
    avvisoEdizioni.textContent = (dati.precedenti.length === 1 ?
      'Per questa classe e questo modulo c’è già una verifica.' :
      'Per questa classe e questo modulo ci sono già ' + dati.precedenti.length + ' verifiche.') + ' Puoi crearne un’altra.';
    edizioniPrecedenti.replaceChildren(...dati.precedenti.map(pulsanteEdizione));
  }
  elencoAlunni.replaceChildren(...dati.alunni.map(alunno => {
    const riga = document.createElement('div');
    riga.className = 'presenza-alunno';
    const nome = document.createElement('label');
    nome.htmlFor = 'presenza-' + alunno.id;
    nome.textContent = alunno.cognome + ' ' + alunno.nome;
    const presenza = document.createElement('select');
    presenza.id = nome.htmlFor;
    presenza.name = alunno.id;
    presenza.setAttribute('aria-label', 'Presenza di ' + nome.textContent);
    presenza.append(new Option('Non segnato', ''), new Option('Presente', 'presente'), new Option('Assente', 'assente'));
    presenza.value = alunno.presenza;
    const spunta = document.createElement('span');
    spunta.className = 'scheda-spunta-consegna';
    spunta.textContent = '✓';
    spunta.setAttribute('aria-hidden', 'true');
    spunta.dataset.consegnaAlunno = alunno.id;
    const stato = document.createElement('span');
    stato.dataset.statoAlunno = alunno.id;
    nome.append(' ', spunta);
    riga.append(nome, presenza, stato);
    return riga;
  }));
}

async function aggiornaClasse(percorso = 'classe', aggiornaControlli = false, azione) {
  if (!classe.value && !edizione) return;
  const richiesta = ++richiestaClasse;
  const corpo = edizione ? { id: edizione } : { classe: classe.value, anno: annoNuovo.value, modulo: 'wifi' };
  if (percorso === 'configura') {
    corpo.azione = azione;
    corpo.minuti = minuti.valueAsNumber;
    corpo.presenze = Object.fromEntries([...elencoAlunni.querySelectorAll('select')].filter(voce => voce.value)
      .map(voce => [voce.name, voce.value]));
    if (azione === 'crea') {
      creazionePendente ??= crypto.randomUUID();
      corpo.operazione = creazionePendente;
    }
  }
  try {
    const dati = await apiDocente(percorso, corpo);
    if (richiesta !== richiestaClasse) return;
    if (azione === 'crea') creazionePendente = null;
    if (dati.edizione) edizione = dati.edizione.id;
    if (aggiornaControlli) disegnaConfigurazione(dati);
    apriVerifica.hidden = dati.stato === 'aperta';
    apriVerifica.value = dati.edizione ? 'apri' : 'crea';
    apriVerifica.textContent = dati.edizione ? 'Riapri verifica' : 'Crea e apri verifica';
    chiudiVerifica.hidden = dati.stato !== 'aperta';
    const messaggio = {
      nuova: 'La verifica si crea quando dai il via.',
      aperta: 'Verifica aperta. Gli alunni segnati come presenti possono iniziare.',
      chiusa: 'Verifica chiusa ai nuovi avvii. Chi ha già iniziato può finire e consegnare.'
    }[dati.stato];
    if (statoVerifica.textContent !== messaggio) statoVerifica.textContent = messaggio;
    for (const alunno of dati.alunni) {
      const stato = elencoAlunni.querySelector('[data-stato-alunno="' + alunno.id + '"]');
      const spunta = elencoAlunni.querySelector('[data-consegna-alunno="' + alunno.id + '"]');
      if (spunta) spunta.hidden = alunno.stato !== 'Consegnata';
      const avanzamento = alunno.completati + '/6 completati' +
        (alunno.mancanti.length ? ' (mancano ' + alunno.mancanti.join(', ') + ')' : '');
      const avvio = alunno.avvio && alunno.stato !== 'Consegnata' ? ' · Avviata il ' + dataItaliana.format(new Date(alunno.avvio)) : '';
      const copia = alunno.copiaScaricata ? ' · Scaricamento copia avviato (' + oraCopia.format(new Date(alunno.copiaScaricata)) + ')' : '';
      const nota = avanzamento + (dati.edizione ? ' · ' + alunno.stato + avvio + copia : '');
      if (stato && stato.textContent !== nota) stato.textContent = nota;
    }
    elencaConsegne(dati.consegne.map(prova => {
      const { nome, cognome, classe, data, annoScolastico } = prova.anagrafica;
      return {
        codice: prova.id, etichetta: cognome + ' ' + nome + (prova.origine === 'recupero' ? ' · Recuperata da file' : ''),
        intestazione: [nome + ' ' + cognome, classe, annoScolastico, 'Avvio: ' + dataItaliana.format(new Date(data)),
          prova.origine === 'recupero' ? 'Recuperata da file' : null].filter(Boolean).join(' · '),
        chiuse: prova.chiuse.map(domanda => ({ ...domanda, scelta: prova.risposte.chiuse[domanda.id] ?? -1 })),
        aperte: prova.aperte.map(domanda => ({ ...domanda, risposta: prova.risposte.aperte[domanda.id] })),
        ...prova.esercizi,
        risultati: ['velocita', 'tempo', 'potenza', 'margine'].map(campo => prova.risposte.esercizi[campo] ?? '')
      };
    }));

    const conteggio = dati.edizione ? 'Consegne ricevute: ' + dati.consegne.length +
      ' · Assenti: ' + dati.alunni.filter(alunno => alunno.presenza === 'assente').length : '';
    if (statoDocente.textContent !== conteggio) statoDocente.textContent = conteggio;
    if (dati.edizione?.data) contestoEdizione.textContent = dati.edizione.anno + ' · Prima somministrazione ' +
      dataItaliana.format(new Date(dati.edizione.data));
    importaCopia.hidden = !dati.edizione;
    stampaTutte.hidden = !dati.edizione;
  } catch (errore) {
    if (richiesta === richiestaClasse) statoDocente.textContent = errore.message;
  }
}

accessoDocente.addEventListener('submit', async evento => {
  evento.preventDefault();
  const pulsante = accessoDocente.querySelector('button');
  pulsante.disabled = true;
  esitoAccesso.textContent = '';
  try {
    const dati = await apiDocente('accesso', { password: passwordDocente.value });
    passwordDocente.value = '';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    mostraAccesso(dati);
    document.querySelector('h1').focus();
  } catch (errore) {
    passwordDocente.value = '';
    esitoAccesso.textContent = errore.message;
    passwordDocente.focus();
  } finally {
    pulsante.disabled = false;
  }
});
window.addEventListener('hashchange', navigaDocente);
for (const pulsante of menuVerifiche.querySelectorAll('button')) {
  pulsante.addEventListener('click', () => void mostraVista(pulsante.value));
}
for (const filtro of [annoArchivio, classeArchivio, moduloArchivio]) filtro.addEventListener('change', disegnaArchivio);
classeCodici.addEventListener('change', disegnaCodici);
function cambiaClasse() {
  richiestaClasse++;
  creazionePendente = null;
  edizione = null;
  configura.hidden = true;
  disegnaIntestazione(null);
  if (classe.value) void aggiornaClasse('classe', true);
}
classe.addEventListener('change', cambiaClasse);
annoNuovo.addEventListener('change', () => {
  opzioni(classe, anniConClassi.find(voce => voce.anno === annoNuovo.value).classi, 'Scegli una classe');
  cambiaClasse();
});
fileCopia.addEventListener('change', async () => {
  const file = fileCopia.files[0];
  const aperta = edizione;
  if (!file || !aperta) return;
  fileCopia.disabled = true;
  try {
    if (file.size > 47000) throw new Error('Il file è troppo grande per essere una copia della verifica.');
    let copia;
    try { copia = JSON.parse(await file.text()); }
    catch { throw new Error('Scegli il file .verifica scaricato dalla pagina della prova.'); }
    const esito = await apiDocente('recupero', { id: aperta, copia });
    if (edizione !== aperta) return;
    await aggiornaClasse();
    if (consegneVisibili.has(esito.id)) {
      selettore.value = esito.id;
      mostraConsegna();
    }
    statoImportazione.textContent = esito.giaRicevuta ? 'Questa prova era già in archivio. È stata aperta la copia salvata.' :
      'Verifica recuperata e salvata nell’archivio. Ora puoi stamparla.';
  } catch (errore) {
    if (edizione === aperta) statoImportazione.textContent = errore.message;
  } finally {
    fileCopia.disabled = false;
    fileCopia.value = '';
  }
});
configura.addEventListener('submit', async evento => {
  evento.preventDefault();
  if (salvaConfigurazione) return;
  const pulsante = evento.submitter ?? apriVerifica;
  salvaConfigurazione = true;
  classe.disabled = true;
  pulsante.disabled = true;
  try { await aggiornaClasse('configura', true, pulsante.value); }
  finally {
    salvaConfigurazione = false;
    classe.disabled = false;
    pulsante.disabled = false;
  }
});
stampaTutte.addEventListener('click', () => {
  stampaClasse.replaceChildren(...[...consegneVisibili.values()].map(assegnata => {
    const scheda = document.createElement('article');
    compilaScheda(scheda, assegnata);
    const titolo = document.createElement('h2');
    titolo.className = 'scheda-titolo-stampa';
    titolo.textContent = 'Verifica Wi-Fi · Scheda di correzione';
    scheda.firstElementChild.prepend(titolo);
    return scheda;
  }));
  document.body.classList.add('stampa-tutte');
  window.print();
});
window.addEventListener('afterprint', () => {
  document.body.classList.remove('stampa-tutte');
  stampaClasse.replaceChildren();
});
consegna.addEventListener('input', evento => {
  const campo = evento.target;
  if (!campo.matches('input')) return;
  valutazioni.get(selettore.value)[campo.name] = campo.value;
  aggiornaStampa(campo);
  aggiornaTotali(consegna);
});
selettore.addEventListener('change', mostraConsegna);
stampa.addEventListener('click', () => window.print());
if (typeof domandeAllenamento !== 'undefined') {
  elencaConsegne(consegneDiEsempio());
} else {
  document.querySelector('#scelta-consegna').hidden = true;
  apiDocente('sessione').then(mostraAccesso).catch(errore => { statoDocente.textContent = errore.message; });
  setInterval(() => {
    if (edizione && !salvaConfigurazione && !configura.hidden) void aggiornaClasse();
  }, 3000);
}
