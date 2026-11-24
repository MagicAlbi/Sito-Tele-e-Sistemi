import { StudySync, studioService } from './studio.js';

const panel = document.querySelector('.study-access');
const form = panel.querySelector('form');
const input = form.elements.namedItem('code');
const submit = form.querySelector('button');
const status = panel.querySelector('[role="status"]');
const recover = panel.querySelector('[data-import-study]');
const codePattern = /^[A-HJ-NP-Z2-9]{8}$/;
let signingIn = false;
panel.hidden = false;

function report(message, state = '') {
  status.textContent = message;
  status.dataset.state = state;
}

function showSession() {
  if (signingIn) return;
  const message = StudySync.status();
  const active = StudySync.active() && !message.startsWith('Accesso scaduto');
  form.hidden = active;
  recover.hidden = !active || !StudySync.canImport();
  report(message === 'Salvato' ? 'Profilo di studio attivo. Dati aggiornati.' : message,
    message === 'Salvato' ? 'active' : '');
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (signingIn) return;
  const code = input.value.trim().toUpperCase();
  if (!codePattern.test(code)) {
    report('Inserisci il codice di otto lettere e cifre.', 'error');
    return;
  }
  signingIn = true;
  submit.disabled = true;
  report('Accesso in corso…');
  try {
    const response = await fetch(new URL('/session', studioService), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
      signal: AbortSignal.timeout(10000),
    });
    if (response.status === 401 || response.status === 429) {
      report(response.status === 401
        ? 'Codice non valido. Controlla e riprova.'
        : 'Troppi tentativi. Aspetta qualche minuto e riprova.', 'error');
      input.select();
      return;
    }
    if (!response.ok) throw new Error();
    const { token, expiresAt } = await response.json();
    if (!/^[a-f0-9]{64}$/.test(token) || !Number.isInteger(expiresAt)) throw new Error();
    await StudySync.signIn(token, expiresAt, code);
    input.value = '';
    signingIn = false;
    showSession();
  } catch {
    report('Accesso momentaneamente non disponibile. Riprova tra poco.', 'error');
  } finally {
    signingIn = false;
    submit.disabled = false;
  }
});

recover.addEventListener('click', async () => {
  if (confirm('Vuoi aggiungere a questo profilo i progressi e le annotazioni salvati in precedenza su questo browser?')) {
    await StudySync.importLocal();
  }
});
window.addEventListener('studio-change', showSession);
showSession();
