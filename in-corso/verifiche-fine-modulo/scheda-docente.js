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
const statoDocente = document.querySelector('#stato-docente');
const stampa = document.querySelector('#stampa');
const valutazioni = new Map();
let consegneVisibili = new Map();
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
    '<tr><th scope="row">Domande chiuse</th><td id="totale-chiuse"></td><td>20</td></tr>' +
    '<tr><th scope="row">Domande aperte</th><td id="totale-aperte">—</td><td>20</td></tr>' +
    '<tr><th scope="row">Esercizi</th><td id="totale-esercizi">—</td><td>10</td></tr></tbody>' +
    '<tfoot><tr><th scope="row">Totale della verifica</th><td id="totale-verifica" aria-live="polite">—</td>' +
    '<td>50</td></tr></tfoot></table></section>';
}

function sommaCampi(campi) {
  const valori = [...campi].filter(campo => campo.value !== '' && campo.validity.valid);
  if (valori.length !== campi.length) return null;
  return valori.reduce((somma, campo) => somma + campo.valueAsNumber, 0);
}

function aggiornaTotali() {
  const chiuseCorrette = Number(consegna.querySelector('[data-chiuse]').dataset.chiuse);
  const aperte = sommaCampi(consegna.querySelectorAll('[data-punti="aperte"]'));
  const esercizi = sommaCampi(consegna.querySelectorAll('[data-punti="esercizi"]'));
  consegna.querySelector('#totale-chiuse').textContent = chiuseCorrette;
  consegna.querySelector('#totale-aperte').textContent = aperte === null ? '—' : formato.format(aperte);
  consegna.querySelector('#totale-esercizi').textContent = esercizi === null ? '—' : formato.format(esercizi);
  consegna.querySelector('#totale-verifica').textContent = aperte === null || esercizi === null ?
    '—' : formato.format(chiuseCorrette + aperte + esercizi);
  for (const cella of consegna.querySelectorAll('[data-subtotale]')) {
    const punti = sommaCampi(consegna.querySelectorAll('input[name^="' + cella.dataset.subtotale + '-"]'));
    cella.textContent = punti === null ? '—' : formato.format(punti);
  }
}

function aggiornaStampa(campo) {
  const valore = campo.type === 'number' ? formato.format(campo.valueAsNumber) : campo.value.trim();
  campo.nextElementSibling.textContent = campo.validity.valid && campo.value !== '' ? valore : '_____';
}

function mostraConsegna() {
  const codice = selettore.value;
  const assegnata = consegneVisibili.get(codice);
  stampa.disabled = !assegnata;
  if (!assegnata) {
    consegna.replaceChildren();
    return;
  }
  if (!valutazioni.has(codice)) valutazioni.set(codice, {});
  const voti = valutazioni.get(codice);
  consegna.innerHTML = '<section aria-label="Dati della prova"><p><strong>' +
    testo(codice) + '</strong> · Punteggio massimo 50</p></section>' +
    sezioneChiuse(assegnata.chiuse) + sezioneAperte(assegnata.aperte) + sezioneEsercizi(assegnata) + riepilogo();
  for (const campo of consegna.querySelectorAll('input')) {
    campo.value = voti[campo.name] ?? '';
    aggiornaStampa(campo);
  }
  aggiornaTotali();
}

function elencaConsegne(elenco) {
  const precedente = selettore.value;
  consegneVisibili = new Map(elenco.map(voce => [voce.codice, voce]));
  selettore.replaceChildren(...elenco.map(({ codice }) => new Option(codice, codice)));
  if (consegneVisibili.has(precedente)) selettore.value = precedente;
  document.querySelector('#scelta-consegna').hidden = elenco.length === 0;
  mostraConsegna();
}

accessoDocente.addEventListener('submit', async evento => {
  evento.preventDefault();
  const codice = document.querySelector('#codice-docente').value.trim().toUpperCase();
  const pulsante = accessoDocente.querySelector('button');
  pulsante.disabled = true;
  try {
    const risposta = await fetch('/api/docente', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ codice }),
      signal: AbortSignal.timeout(5000)
    });
    const dati = await risposta.json();
    if (!risposta.ok) throw new Error(dati.errore);
    elencaConsegne(dati.map(prova => ({
      codice: prova.codice,
      chiuse: prova.chiuse.map(domanda => ({ ...domanda, scelta: prova.risposte.chiuse[domanda.id] ?? -1 })),
      aperte: prova.aperte.map(domanda => ({ ...domanda, risposta: prova.risposte.aperte[domanda.id] })),
      ...prova.esercizi,
      risultati: ['velocita', 'tempo', 'potenza', 'margine'].map(campo => prova.risposte.esercizi[campo] ?? '')
    })));
    statoDocente.textContent = dati.length ? '' : 'Nessuna verifica consegnata.';
  } catch (errore) {
    elencaConsegne([]);
    statoDocente.textContent = errore.message;
  } finally {
    pulsante.disabled = false;
  }
});

consegna.addEventListener('input', evento => {
  const campo = evento.target;
  if (!campo.matches('input')) return;
  valutazioni.get(selettore.value)[campo.name] = campo.value;
  aggiornaStampa(campo);
  aggiornaTotali();
});
selettore.addEventListener('change', mostraConsegna);
stampa.addEventListener('click', () => window.print());
if (typeof domandeAllenamento !== 'undefined') {
  elencaConsegne(consegneDiEsempio());
} else {
  accessoDocente.hidden = false;
  elencaConsegne([]);
}
