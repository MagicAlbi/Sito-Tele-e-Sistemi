'use strict';

const accesso = document.querySelector('#accesso');
const inputCodice = document.querySelector('#codice');
const form = document.querySelector('#verifica');
const compilazione = document.querySelector('#compilazione');
const stato = document.querySelector('#stato');
const salvataggio = document.querySelector('#salvataggio');
const riprendi = document.querySelector('#riprendi');
const consegna = document.querySelector('#consegna');
const timer = document.querySelector('#tempo');
const identita = document.querySelector('#identita');
const inizia = document.querySelector('#inizia');
const verificaDisponibile = document.querySelector('#verifica-disponibile');
const cambia = document.querySelector('#cambia');
const copiaProva = document.querySelector('#copia-prova');
const avviso = document.querySelector('#avviso-consegna');
const formatoData = new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome' });
let idAlunno = '';
let idEdizione = '';
let prova;
let scadenza;
let sospesa = false;
let salvataggioInCorso = false;
let aperturaInCorso = false;
let sincronizzaAncora = false;
let consegnaRichiesta = false;
let attesaSalvataggio;
let notificaCopiaInCorso = false;

function testo(valore) {
  return String(valore).replace(/[&<>"]/g, carattere =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[carattere]);
}

function copiaLocale(dati) {
  const chiave = 'verifica-wifi-demo:' + idAlunno + ':' + idEdizione;
  try {
    const precedente = 'verifica-wifi-demo:' + idAlunno;
    const vecchiaEdizione = idEdizione.includes(':');
    if (dati === undefined) return JSON.parse(localStorage.getItem(chiave) ??
      (vecchiaEdizione ? localStorage.getItem(precedente) : null));
    if (dati === null) {
      localStorage.removeItem(chiave);
      if (vecchiaEdizione) localStorage.removeItem(precedente);
    }
    else localStorage.setItem(chiave, JSON.stringify(dati));
    return true;
  } catch {
    return false;
  }
}

function tempoResiduo() {
  return sospesa ? prova.residuo : Math.max(0, Math.ceil(scadenza - performance.now()));
}

function bozzaLocale() {
  return copiaLocale({
    revisione: prova.revisione, risposte: prova.risposte, residuo: tempoResiduo(), consegnaRichiesta
  });
}

function mostraTempo() {
  const secondi = Math.ceil(tempoResiduo() / 1000);
  const mm = String(Math.floor(secondi / 60)).padStart(2, '0');
  const ss = String(secondi % 60).padStart(2, '0');
  const testoTempo = mm + ':' + ss;
  if (timer.textContent !== testoTempo) timer.textContent = testoTempo;
}

async function api(percorso, dati) {
  const opzioni = { signal: AbortSignal.timeout(5000), cache: 'no-store' };
  if (dati) Object.assign(opzioni, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dati)
  });
  const risposta = await fetch('/api/' + percorso, opzioni);
  const risultato = await risposta.json().catch(() => ({}));
  if (!risposta.ok) {
    throw Object.assign(new Error(risultato.errore || 'Il servizio ha restituito un errore (' + risposta.status + ').'),
      { status: risposta.status });
  }
  return risultato;
}

function chiaveNotificaCopia(edizione = '') {
  return 'verifica-wifi-copia:' + idAlunno + ':' + edizione;
}

async function notificaCopia() {
  if (!idAlunno || notificaCopiaInCorso) return;
  notificaCopiaInCorso = true;
  try {
    const prefisso = chiaveNotificaCopia();
    const notifiche = Object.keys(localStorage).filter(chiave => chiave.startsWith(prefisso));
    for (const chiave of notifiche) {
      await api('copia', { id: chiave.slice(prefisso.length), recupero: localStorage.getItem(chiave) });
      localStorage.removeItem(chiave);
    }
  } catch {
    // Lascia l'avviso in attesa finché il servizio torna raggiungibile.
  } finally {
    notificaCopiaInCorso = false;
  }
}

function motivo(errore) {
  if (errore.status) return errore.message;
  if (errore.name === 'TimeoutError') return 'Il servizio non ha risposto in tempo.';
  return navigator.onLine ? 'Il servizio non è raggiungibile.' : 'Connessione di rete assente.';
}

function mostraAvvisoConsegna(messaggio) {
  avviso.textContent = messaggio;
  avviso.hidden = !messaggio;
}

function avvisoConsegna(messaggio) {
  mostraAvvisoConsegna('Consegna non confermata. ' + messaggio +
    ' Puoi riprovare da qui o salvare la copia cifrata da consegnare al docente.');
}

function sospendi(messaggio) {
  if (!prova || prova.consegnata || sospesa) return;
  prova.residuo = tempoResiduo();
  sospesa = true;
  compilazione.disabled = true;
  consegna.disabled = consegnaRichiesta;
  riprendi.hidden = false;
  riprendi.textContent = consegnaRichiesta ? 'Riprova a consegnare' : 'Riprendi prova';
  salvataggio.textContent = bozzaLocale() ? 'Da sincronizzare' : 'Salvataggio locale non disponibile';
  stato.textContent = messaggio;
  mostraTempo();
}

function mostraRecupero(messaggio) {
  copiaProva.hidden = false;
  riprendi.hidden = false;
  riprendi.textContent = 'Riprova a consegnare';
  consegna.disabled = true;
  avvisoConsegna(messaggio);
}

function mostraConsegnata() {
  sospesa = true;
  compilazione.disabled = true;
  compilazione.replaceChildren();
  consegna.disabled = true;
  consegna.hidden = true;
  timer.hidden = true;
  riprendi.hidden = true;
  copiaLocale(null);
  mostraAvvisoConsegna('');
  copiaProva.hidden = true;
  salvataggio.textContent = 'Consegnata';
  stato.textContent = 'Verifica consegnata. Le risposte sono state salvate.';
}

function disegnaProva() {
  const chiuse = prova.chiuse.map(({ id, prompt, opzioni }, indice) => {
    const risposte = opzioni.map((opzione, posizione) =>
      '<label class="prova-opzione"><input type="radio" name="' + id +
      '" value="' + posizione + '" data-gruppo="chiuse"' +
      (prova.risposte.chiuse[id] === posizione ? ' checked' : '') + '><span>' +
      'ABCD'[posizione] + '.</span><span>' + testo(opzione) + '</span></label>').join('');
    return '<fieldset class="prova-card" aria-labelledby="domanda-' + id + '">' +
      '<p class="prova-prompt" id="domanda-' + id + '">' + (indice + 1) + '. ' + testo(prompt) +
      '</p><div class="prova-opzioni">' + risposte + '</div></fieldset>';
  }).join('');
  const aperte = prova.aperte.map(({ id, title, prompt }, indice) =>
    '<article class="prova-card"><h3>' + (indice + 1) + '. ' + testo(title) +
    '</h3><p class="prova-prompt" id="aperta-' + id + '">' + testo(prompt) +
    '</p><textarea name="' + id + '" data-gruppo="aperte" rows="4" maxlength="4000" aria-labelledby="aperta-' + id + '">' +
    testo(prova.risposte.aperte[id] ?? '') + '</textarea></article>').join('');
  const campo = (id, nome, unita) =>
    '<label>' + nome + ' (' + unita + ')<input type="text" inputmode="decimal" maxlength="30" name="' + id +
    '" data-gruppo="esercizi" value="' + testo(prova.risposte.esercizi[id] ?? '') + '"></label>';
  const [mb, nominale, percento] = prova.esercizi.file;
  const [tx, guadagnoTx, guadagnoRx, percorso, parete, soglia] = prova.esercizi.radio;
  compilazione.innerHTML = '<section aria-labelledby="titolo-chiuse"><h2 id="titolo-chiuse">Domande chiuse</h2>' +
    chiuse + '</section><section aria-labelledby="titolo-aperte"><h2 id="titolo-aperte">Domande aperte</h2>' + aperte +
    '</section><section aria-labelledby="titolo-esercizi"><h2 id="titolo-esercizi">Esercizi</h2>' +
    '<p>Scrivi lo svolgimento sul foglio. Qui inserisci solo i risultati.</p>' +
    '<article class="prova-card"><h3>1. Trasferimento di un file</h3>' +
    '<p>Una postazione del laboratorio trasferisce un video da ' + mb +
    ' MB. La velocità nominale Wi-Fi è ' + nominale + ' Mbit/s e quella utile è il ' + percento +
    '% della nominale. Assumi che la velocità utile resti costante e usa 1 MB = 8 Mbit. Calcola velocità utile e tempo.</p>' +
    '<div class="prova-risultati">' + campo('velocita', 'Velocità utile', 'Mbit/s') +
    campo('tempo', 'Tempo di trasferimento', 's') + '</div></article>' +
    '<article class="prova-card"><h3>2. Copertura oltre una parete</h3>' +
    '<p>Un access point trasmette a ' + tx + ' dBm. Le antenne hanno guadagni di ' + guadagnoTx + ' dBi in trasmissione e ' +
    guadagnoRx + ' dBi in ricezione. Il percorso perde ' + percorso + ' dB e la parete aggiunge ' + parete +
    ' dB di perdita. La soglia è ' + String(soglia).replace('-', '−') +
    ' dBm. Calcola potenza ricevuta e margine rispetto alla soglia.</p><div class="prova-risultati">' +
    campo('potenza', 'Potenza ricevuta', 'dBm') + campo('margine', 'Margine', 'dB') + '</div></article></section>';
}

async function apri() {
  if (aperturaInCorso || salvataggioInCorso) return;
  aperturaInCorso = true;
  riprendi.disabled = true;
  stato.textContent = 'Apertura della prova…';
  try {
    const ricevuta = await api('avvia', { id: idEdizione });
    const copia = copiaLocale();
    if (prova && !ricevuta.consegnata && copia?.consegnaRichiesta && copia.revisione !== ricevuta.revisione) {
      mostraAvvisoConsegna('Consegna non confermata. Nell’archivio c’è una versione più recente. Scarica questa copia cifrata e avvisa il docente.');
      return;
    }
    let daSalvare = false;
    if (!ricevuta.consegnata && copia && copia.revisione === ricevuta.revisione) {
      ricevuta.risposte = copia.risposte;
      ricevuta.residuo = Math.min(ricevuta.residuo, copia.residuo);
      consegnaRichiesta ||= Boolean(copia.consegnaRichiesta);
      daSalvare = true;
    }
    prova = ricevuta;
    identita.hidden = true;
    accesso.hidden = true;
    const { nome, cognome, classe, data } = prova.anagrafica;
    document.querySelector('#dati-prova').textContent = [nome + ' ' + cognome, classe, formatoData.format(new Date(data))].join(' · ');
    form.hidden = false;
    document.querySelector('#barra').hidden = false;
    if (prova.consegnata) {
      mostraConsegnata();
      return;
    }
    disegnaProva();
    sospesa = false;
    scadenza = performance.now() + prova.residuo;
    compilazione.disabled = false;
    consegna.disabled = false;
    consegna.hidden = false;
    timer.hidden = false;
    riprendi.hidden = true;
    stato.textContent = '';
    salvataggio.textContent = daSalvare ? 'Da sincronizzare' : 'Salvato';
    mostraTempo();
    if (daSalvare || consegnaRichiesta) void salva();
  } catch (errore) {
    if (consegnaRichiesta) avvisoConsegna(motivo(errore));
    else stato.textContent = motivo(errore) + ' Avvisa il docente.';
  } finally {
    aperturaInCorso = false;
    riprendi.disabled = false;
  }
}

async function salva() {
  clearTimeout(attesaSalvataggio);
  if (!prova || prova.consegnata || sospesa) return;
  if (salvataggioInCorso) {
    sincronizzaAncora = true;
    return;
  }
  salvataggioInCorso = true;
  sincronizzaAncora = false;
  const residuo = tempoResiduo();
  const finalizza = consegnaRichiesta || residuo === 0;
  if (finalizza) {
    compilazione.disabled = true;
    consegna.disabled = true;
    bozzaLocale();
  }
  try {
    const ricevuta = await api(finalizza ? 'consegna' : 'salva', {
      id: idEdizione, residuo, revisione: prova.revisione, risposte: prova.risposte
    });
    prova.revisione = ricevuta.revisione;
    prova.consegnata = ricevuta.consegnata;
    if (prova.consegnata) {
      prova.residuo = ricevuta.residuo;
      consegnaRichiesta = false;
      mostraConsegnata();
    } else if (sospesa || sincronizzaAncora) {
      bozzaLocale();
    } else {
      copiaLocale(null);
      salvataggio.textContent = 'Salvato';
    }
  } catch (errore) {
    if (finalizza) {
      consegnaRichiesta = true;
      sospendi('');
      mostraRecupero(motivo(errore));
    } else {
      sospendi(motivo(errore) + ' Avvisa il docente.');
    }
  } finally {
    salvataggioInCorso = false;
    if (sincronizzaAncora) void salva();
  }
}

function mostraAccesso(alunno) {
  idAlunno = alunno.id ?? '';
  const edizioni = alunno.edizioni ?? [];
  let precedente;
  try { precedente = sessionStorage.getItem('edizione-verifica:' + idAlunno); } catch {}
  verificaDisponibile.replaceChildren(...edizioni.map(voce => new Option(
    'Wi-Fi · ' + (voce.creata.includes('T') ? new Date(voce.creata).toLocaleString('it-IT', { timeZone: 'Europe/Rome' }) :
      formatoData.format(new Date(voce.creata))) + (voce.consegnata ? ' · Ricevuta' : ''), voce.id
  )));
  if (edizioni.some(voce => voce.id === precedente)) verificaDisponibile.value = precedente;
  idEdizione = verificaDisponibile.value;
  inizia.textContent = idEdizione ? 'Avvia o riprendi verifica' : 'Aggiorna verifiche disponibili';
  accesso.hidden = Boolean(idAlunno);
  identita.hidden = !idAlunno;
  document.querySelector('#alunno').textContent = idAlunno ? 'Accesso effettuato come ' + alunno.nome + '.' : '';
  void notificaCopia();
}

accesso.addEventListener('submit', async evento => {
  evento.preventDefault();
  const pulsante = accesso.querySelector('button');
  pulsante.disabled = true;
  try {
    mostraAccesso(await api('accesso', { codice: inputCodice.value.trim().toUpperCase() }));
    stato.textContent = '';
  } catch (errore) {
    stato.textContent = errore.message;
  } finally {
    pulsante.disabled = false;
  }
});
cambia.addEventListener('click', () => {
  mostraAccesso({});
  inputCodice.value = '';
  stato.textContent = '';
  inputCodice.focus();
});
inizia.addEventListener('click', async () => {
  idEdizione = verificaDisponibile.value;
  if (idEdizione) {
    try { sessionStorage.setItem('edizione-verifica:' + idAlunno, idEdizione); } catch {}
    void apri();
  } else {
    try {
      mostraAccesso(await api('sessione'));
      if (!idEdizione) stato.textContent = 'Al momento non hai verifiche disponibili.';
    } catch (errore) {
      stato.textContent = motivo(errore);
    }
  }
});
const base64 = dati => btoa(String.fromCharCode(...new Uint8Array(dati)));

async function preparaCopia(prova) {
  const pubblica = Uint8Array.from(atob(prova.chiaveCopia), carattere => carattere.charCodeAt(0));
  const chiaveArchivio = await crypto.subtle.importKey(
    'spki', pubblica, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['wrapKey']
  );
  const chiave = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const contenuto = new TextEncoder().encode(JSON.stringify({ recupero: prova.recupero, risposte: prova.risposte }));
  const [dati, chiaveProtetta] = await Promise.all([
    crypto.subtle.encrypt({ name: 'AES-GCM', iv }, chiave, contenuto),
    crypto.subtle.wrapKey('raw', chiave, chiaveArchivio, 'RSA-OAEP')
  ]);
  return JSON.stringify({ versione: 1, iv: base64(iv), chiave: base64(chiaveProtetta), dati: base64(dati) });
}

copiaProva.addEventListener('click', async () => {
  if (!prova || prova.consegnata || !consegnaRichiesta || copiaProva.hidden) return;
  copiaProva.disabled = true;
  try {
    const copia = await preparaCopia(prova);
    if (prova.consegnata || copiaProva.hidden) return;
    const url = URL.createObjectURL(new Blob([copia], { type: 'application/octet-stream' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Verifica-copia-di-emergenza.verifica';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    try {
      localStorage.setItem(chiaveNotificaCopia(idEdizione), prova.recupero);
      void notificaCopia();
    } catch {
      void api('copia', { id: idEdizione, recupero: prova.recupero }).catch(() => {});
    }
  } catch {
    mostraAvvisoConsegna('Impossibile preparare la copia cifrata. Lascia aperta la pagina e avvisa il docente.');
  } finally {
    copiaProva.disabled = false;
  }
});
riprendi.addEventListener('click', () => void apri());
form.addEventListener('input', evento => {
  const campo = evento.target;
  if (!campo.dataset.gruppo || sospesa || prova.consegnata || consegnaRichiesta) return;
  prova.risposte[campo.dataset.gruppo][campo.name] = campo.type === 'radio' ? Number(campo.value) : campo.value;
  sincronizzaAncora = salvataggioInCorso;
  salvataggio.textContent = bozzaLocale() ? 'Da sincronizzare' : 'Salvataggio in corso';
  clearTimeout(attesaSalvataggio);
  attesaSalvataggio = setTimeout(salva, 450);
});
form.addEventListener('submit', evento => {
  evento.preventDefault();
  if (!prova || consegnaRichiesta || prova.consegnata || !confirm('Vuoi consegnare la verifica?')) return;
  consegnaRichiesta = true;
  compilazione.disabled = true;
  consegna.disabled = true;
  if (sospesa) {
    bozzaLocale();
    mostraRecupero(navigator.onLine ? 'Il servizio non è raggiungibile.' : 'Connessione di rete assente.');
  } else {
    void salva();
  }
});
window.addEventListener('offline', () => sospendi('Connessione di rete assente. Avvisa il docente.'));
window.addEventListener('online', () => void notificaCopia());
setInterval(() => {
  if (!prova || sospesa || prova.consegnata) return;
  mostraTempo();
  if (tempoResiduo() === 0 && !consegnaRichiesta) {
    consegnaRichiesta = true;
    void salva();
  }
}, 250);
setInterval(salva, 30000);
setInterval(notificaCopia, 5000);
setInterval(async () => {
  if (!prova || sospesa || prova.consegnata || salvataggioInCorso) return;
  try { await api('salute'); } catch { sospendi('Connessione di rete assente. Avvisa il docente.'); }
}, 5000);
api('sessione').then(async alunno => {
  mostraAccesso(alunno);
  if (idEdizione && copiaLocale()) await apri();
}).catch(() => { stato.textContent = 'Connessione di rete assente. Avvisa il docente.'; });
