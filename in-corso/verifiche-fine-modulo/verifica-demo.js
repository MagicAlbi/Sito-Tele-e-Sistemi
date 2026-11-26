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
let codice = '';
let prova;
let scadenza;
let sospesa = false;
let salvataggioInCorso = false;
let aperturaInCorso = false;
let sincronizzaAncora = false;
let consegnaRichiesta = false;
let attesaSalvataggio;

function testo(valore) {
  return String(valore).replace(/[&<>"]/g, carattere =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[carattere]);
}

function copiaLocale(dati) {
  const chiave = 'verifica-wifi-demo:' + codice;
  try {
    if (dati === undefined) return JSON.parse(localStorage.getItem(chiave));
    if (dati === null) localStorage.removeItem(chiave);
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
  return copiaLocale({ revisione: prova.revisione, risposte: prova.risposte, residuo: tempoResiduo() });
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
  const risultato = await risposta.json();
  if (!risposta.ok) throw Object.assign(new Error(risultato.errore), { status: risposta.status });
  return risultato;
}

function sospendi(messaggio) {
  if (!prova || prova.consegnata || sospesa) return;
  prova.residuo = tempoResiduo();
  sospesa = true;
  compilazione.disabled = true;
  consegna.disabled = true;
  riprendi.hidden = false;
  salvataggio.textContent = bozzaLocale() ? 'Da sincronizzare' : 'Salvataggio locale non disponibile';
  stato.textContent = messaggio;
  mostraTempo();
}

function mostraConsegnata() {
  sospesa = true;
  compilazione.disabled = true;
  consegna.disabled = true;
  riprendi.hidden = true;
  copiaLocale(null);
  salvataggio.textContent = 'Consegnata';
  stato.textContent = 'Verifica consegnata. Le risposte sono state salvate.';
  mostraTempo();
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
    const ricevuta = await api('avvia', { codice });
    const copia = copiaLocale();
    let daSalvare = false;
    if (!ricevuta.consegnata && copia && copia.revisione === ricevuta.revisione) {
      ricevuta.risposte = copia.risposte;
      ricevuta.residuo = Math.min(ricevuta.residuo, copia.residuo);
      daSalvare = true;
    }
    prova = ricevuta;
    try { sessionStorage.setItem('verifica-wifi-demo', codice); } catch {}
    accesso.hidden = true;
    form.hidden = false;
    document.querySelector('#barra').hidden = false;
    disegnaProva();
    if (prova.consegnata) {
      mostraConsegnata();
      return;
    }
    sospesa = false;
    scadenza = performance.now() + prova.residuo;
    compilazione.disabled = false;
    consegna.disabled = false;
    riprendi.hidden = true;
    stato.textContent = '';
    salvataggio.textContent = daSalvare ? 'Da sincronizzare' : 'Salvato';
    mostraTempo();
    if (daSalvare || consegnaRichiesta) void salva();
  } catch (errore) {
    stato.textContent = errore.status ? errore.message : 'Connessione di rete assente. Avvisa il docente.';
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
  }
  try {
    const ricevuta = await api(finalizza ? 'consegna' : 'salva', {
      codice, residuo, revisione: prova.revisione, risposte: prova.risposte
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
    sospendi(errore.status ? errore.message : 'Connessione di rete assente. Avvisa il docente.');
  } finally {
    salvataggioInCorso = false;
    if (sincronizzaAncora) void salva();
  }
}

accesso.addEventListener('submit', evento => {
  evento.preventDefault();
  if (aperturaInCorso) return;
  codice = inputCodice.value.trim().toUpperCase();
  void apri();
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
  if (!prova || sospesa || prova.consegnata || !confirm('Vuoi consegnare la verifica?')) return;
  consegnaRichiesta = true;
  compilazione.disabled = true;
  consegna.disabled = true;
  void salva();
});
window.addEventListener('offline', () => sospendi('Connessione di rete assente. Avvisa il docente.'));
setInterval(() => {
  if (!prova || sospesa || prova.consegnata) return;
  mostraTempo();
  if (tempoResiduo() === 0 && !consegnaRichiesta) {
    consegnaRichiesta = true;
    void salva();
  }
}, 250);
setInterval(salva, 30000);
setInterval(async () => {
  if (!prova || sospesa || prova.consegnata || salvataggioInCorso) return;
  try { await api('salute'); } catch { sospendi('Connessione di rete assente. Avvisa il docente.'); }
}, 5000);
try {
  codice = sessionStorage.getItem('verifica-wifi-demo') ?? '';
  if (codice) {
    inputCodice.value = codice;
    void apri();
  }
} catch {}
