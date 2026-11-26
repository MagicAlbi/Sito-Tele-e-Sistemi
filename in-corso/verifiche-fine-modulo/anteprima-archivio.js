'use strict';

const anni = ['2026/2027', '2025/2026', '2024/2025'];
const classi = ['5A', '5B', '5C'];
const moduli = { wifi: 'Modulo 1 · Wi-Fi', wan: 'Modulo 2 · WAN' };
const verifiche = [
  {
    id: 'wifi-5a', anno: anni[0], classe: '5A', modulo: 'wifi', data: '26/11/2026', durata: 45,
    esiti: [
      ['Livia Bruni', 'Consegnata', '10:12'],
      ['Dario Costa', 'Non consegnata', 'Avviata alle 09:47'],
      ['Sofia Ferri', 'Assente', 'Segnata dal docente'],
      ['Nina Galli', 'Recuperata da file', 'Importata alle 10:38'],
      ['Milo Leoni', 'Consegnata', '10:27'],
      ['Emma Mori', 'Non consegnata', 'Avviata alle 09:51'],
      ['Teo Serra', 'Assente', 'Segnata dal docente']
    ]
  },
  {
    id: 'wan-5b', anno: anni[0], classe: '5B', modulo: 'wan', data: '20/11/2026', durata: 50,
    esiti: [['Adele Bassi', 'Consegnata', '11:20'], ['Ivo Riva', 'Consegnata', '11:24']]
  },
  {
    id: 'wifi-5a-1', anno: anni[0], classe: '5A', modulo: 'wifi', data: '12/11/2026', durata: 45,
    esiti: [['Livia Bruni', 'Consegnata', '10:04'], ['Dario Costa', 'Non avviata', '—']]
  },
  {
    id: 'wifi-5c', anno: anni[1], classe: '5C', modulo: 'wifi', data: '18/12/2025', durata: 45,
    esiti: [['Nora Poli', 'Consegnata', '09:08'], ['Elia Fontana', 'Assente', 'Segnata dal docente']]
  },
  {
    id: 'wan-5a-storica', anno: anni[1], classe: '5A', modulo: 'wan', data: '21/01/2026', durata: 50,
    esiti: [['Ada Villa', 'Consegnata', '12:15'], ['Gioele Marchi', 'Consegnata', '12:20']]
  },
  {
    id: 'wifi-5b-storica', anno: anni[2], classe: '5B', modulo: 'wifi', data: '19/11/2024', durata: 45,
    esiti: [['Mia Lodi', 'Consegnata', '10:19'], ['Enea Rosa', 'Consegnata', '10:28']]
  }
];
const nuova = document.querySelector('#nuova');
const nuovoAnno = document.querySelector('#nuovo-anno');
const nuovaClasse = document.querySelector('#nuova-classe');
const nuovoModulo = document.querySelector('#nuovo-modulo');
const statoNuova = document.querySelector('#stato-nuova');
const esitoCreazione = document.querySelector('#esito-creazione');
const comandiNuova = document.querySelector('#comandi-nuova');
const filtroAnno = document.querySelector('#filtro-anno');
const filtroClasse = document.querySelector('#filtro-classe');
const filtroModulo = document.querySelector('#filtro-modulo');
const elenco = document.querySelector('#risultati-archivio');
const sezioneNuova = document.querySelector('#nuova-verifica');
const archivio = document.querySelector('#archivio');
const dettaglio = document.querySelector('#verifica-finita');
const elaborato = document.querySelector('#elaborato-archivio');
const documento = document.querySelector('#documento-archivio');
const areaStampa = document.querySelector('#stampa-anteprima');
const stampaTutte = document.querySelector('#stampa-archivio');
let selezionata;
let esitoSelezionato;

function aggiungiOpzioni(select, opzioni) {
  select.append(...opzioni.map(([valore, etichetta]) => new Option(etichetta, valore)));
}

function elemento(tag, testo, classe) {
  const nodo = document.createElement(tag);
  nodo.textContent = testo;
  if (classe) nodo.className = classe;
  return nodo;
}

const ricevuta = ([, stato]) => stato === 'Consegnata' || stato === 'Recuperata da file';

function scheda(verifica, [nome, stato]) {
  const articolo = elemento('article', '', 'scheda-blocco');
  const domanda = verifica.modulo === 'wifi' ?
    'A cosa serve l’SSID?' : 'A cosa serve la porta console di uno switch?';
  const risposta = verifica.modulo === 'wifi' ?
    'Indica il nome con cui viene mostrata la rete Wi-Fi.' : 'Permette di configurare lo switch con un collegamento diretto.';
  articolo.append(elemento('h3', nome + ' · ' + stato),
    elemento('p', [moduli[verifica.modulo], verifica.anno, verifica.classe, verifica.data].join(' · '), 'archivio-contesto'),
    elemento('h4', 'Estratto dimostrativo'),
    elemento('p', domanda), elemento('h4', 'Risposta dell’alunno'), elemento('p', risposta));
  return articolo;
}

function mostraElaborato(verifica, esito) {
  esitoSelezionato = esito;
  documento.replaceChildren(scheda(verifica, esito));
  elaborato.hidden = false;
  elaborato.scrollIntoView({ block: 'nearest' });
}

function stampa(esiti) {
  areaStampa.replaceChildren(...esiti.map(esito => scheda(selezionata, esito)));
  document.body.classList.add('anteprima-in-stampa');
  window.print();
}

function mostraDettaglio(verifica) {
  selezionata = verifica;
  elaborato.hidden = true;
  esitoSelezionato = null;
  const ricevute = verifica.esiti.filter(ricevuta).length;
  const recuperate = verifica.esiti.filter(([, stato]) => stato === 'Recuperata da file').length;
  const mancanti = verifica.esiti.filter(([, stato]) => stato === 'Non consegnata').length;
  const assenti = verifica.esiti.filter(([, stato]) => stato === 'Assente').length;
  const nonAvviate = verifica.esiti.filter(([, stato]) => stato === 'Non avviata').length;
  document.querySelector('#titolo-verifica').textContent = moduli[verifica.modulo] + ' · Verifica conclusa';
  document.querySelector('#dati-verifica').textContent =
    [verifica.anno, verifica.classe, verifica.data, verifica.durata + ' minuti'].join(' · ');
  document.querySelector('#totali-verifica').textContent =
    ricevute + ' ricevute (' + recuperate + ' da file) · ' + mancanti + ' non consegnate · ' + assenti + ' assenti' +
    (nonAvviate ? ' · ' + nonAvviate + ' non avviate' : '');
  stampaTutte.disabled = !ricevute;
  document.querySelector('#esiti-verifica').replaceChildren(...verifica.esiti.map(voce => {
    const [nome, stato, nota] = voce;
    const riga = document.createElement('tr');
    const alunno = elemento('th', nome);
    alunno.scope = 'row';
    const esito = elemento('td', '', 'archivio-consegna');
    const consultazione = elemento('td', '—');
    if (ricevuta(voce)) {
      const spunta = elemento('span', '✓', 'scheda-spunta-consegna');
      spunta.setAttribute('aria-hidden', 'true');
      esito.append(spunta);
      const apri = elemento('button', 'Apri', 'btn btn-ghost');
      apri.type = 'button';
      apri.setAttribute('aria-label', 'Apri elaborato di ' + nome);
      apri.addEventListener('click', () => mostraElaborato(verifica, voce));
      consultazione.replaceChildren(apri);
    }
    esito.append(stato);
    riga.append(alunno, esito, elemento('td', nota), consultazione);
    return riga;
  }));
  dettaglio.hidden = false;
  mostraArchivio();
}

function mostraArchivio() {
  const trovate = verifiche.filter(verifica => verifica.anno === filtroAnno.value &&
    (!filtroClasse.value || verifica.classe === filtroClasse.value) &&
    (!filtroModulo.value || verifica.modulo === filtroModulo.value));
  elenco.replaceChildren(...trovate.map(verifica => {
    const pulsante = elemento('button', '', 'btn btn-ghost');
    pulsante.type = 'button';
    if (verifica === selezionata) pulsante.setAttribute('aria-current', 'true');
    pulsante.append(elemento('strong', verifica.classe + ' · ' + moduli[verifica.modulo]),
      elemento('small', verifica.data + ' · Conclusa'));
    pulsante.addEventListener('click', () => {
      const destinazione = '#verifica-finita/' + verifica.id;
      if (location.hash !== destinazione) location.hash = destinazione;
      else dettaglio.scrollIntoView();
    });
    return pulsante;
  }));
  if (!trovate.length) elenco.append(elemento('p', 'Nessuna verifica per questi filtri.'));
}

function aggiornaNuova() {
  statoNuova.replaceChildren();
  esitoCreazione.textContent = '';
  comandiNuova.hidden = true;
  if (!nuovaClasse.value || !nuovoModulo.value) {
    statoNuova.textContent = 'Scegli classe e modulo per vedere se esiste già una verifica.';
    return;
  }
  const esistenti = verifiche.filter(verifica => verifica.anno === nuovoAnno.value &&
    verifica.classe === nuovaClasse.value && verifica.modulo === nuovoModulo.value);
  if (esistenti.length) {
    statoNuova.append('In archivio trovi ' + esistenti.length +
      (esistenti.length === 1 ? ' verifica già svolta' : ' verifiche già svolte') +
      ' per questa classe e questo modulo. Puoi crearne un’altra. ');
    const apri = elemento('button', 'Vai alle verifiche in archivio', 'btn btn-ghost');
    apri.type = 'button';
    apri.addEventListener('click', () => {
      filtroAnno.value = nuovoAnno.value;
      filtroClasse.value = nuovaClasse.value;
      filtroModulo.value = nuovoModulo.value;
      location.hash = 'archivio';
    });
    statoNuova.append(apri);
  } else {
    statoNuova.textContent = 'Nessuna verifica per questa combinazione. Puoi crearne una.';
  }
  comandiNuova.hidden = false;
}

function mostraSezione() {
  const [sezione, id] = location.hash.slice(1).split('/');
  const inArchivio = sezione === 'archivio' || sezione === 'verifica-finita';
  sezioneNuova.hidden = inArchivio;
  archivio.hidden = !inArchivio;
  dettaglio.hidden = sezione !== 'verifica-finita';
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === (inArchivio ? '#archivio' : '#nuova-verifica')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (sezione === 'verifica-finita') {
    mostraDettaglio(verifiche.find(verifica => verifica.id === id) ?? verifiche[0]);
    dettaglio.scrollIntoView();
  } else {
    selezionata = null;
    mostraArchivio();
  }
}

for (const selettore of [nuovoAnno, filtroAnno]) aggiungiOpzioni(selettore, anni.map(anno => [anno, anno]));
for (const selettore of [nuovaClasse, filtroClasse]) aggiungiOpzioni(selettore, classi.map(classe => [classe, classe]));
for (const selettore of [nuovoModulo, filtroModulo]) aggiungiOpzioni(selettore, Object.entries(moduli));
for (const selettore of [filtroAnno, filtroClasse, filtroModulo]) {
  selettore.addEventListener('change', () => {
    if (location.hash.startsWith('#verifica-finita')) location.hash = 'archivio';
    else mostraArchivio();
  });
}
nuova.addEventListener('change', aggiornaNuova);
nuova.addEventListener('submit', evento => {
  evento.preventDefault();
  esitoCreazione.textContent = 'Creazione simulata · ' + nuovaClasse.value + ' · ' + moduli[nuovoModulo.value] +
    ' · ' + document.querySelector('#durata-esempio').value + ' minuti.';
});
stampaTutte.addEventListener('click', () => stampa(selezionata.esiti.filter(ricevuta)));
document.querySelector('#stampa-elaborato').addEventListener('click', () => stampa([esitoSelezionato]));
window.addEventListener('afterprint', () => {
  document.body.classList.remove('anteprima-in-stampa');
  areaStampa.replaceChildren();
});
window.addEventListener('hashchange', mostraSezione);
if (location.hash === '#nuova-verifica') {
  nuovaClasse.value = '5A';
  nuovoModulo.value = 'wan';
  aggiornaNuova();
}
mostraSezione();
