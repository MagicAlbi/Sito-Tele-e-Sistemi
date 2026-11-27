import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { risorse } from '../../.local/verifica-wifi/cloudflare/risorse.mjs';
import { default as servizioDocente } from '../../.local/verifica-wifi/cloudflare/docente-test.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(join(process.env.USERPROFILE,
  '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const origine = 'http://127.0.0.1:18765';
const output = new URL('../../../output/collaudo-verifica-modulo-1/', import.meta.url);
const cartellaPdf = new URL('../pdf/', output);
const destinazione = nome => fileURLToPath(new URL(nome, output));
const id = '652f1a1f-258d-444c-9955-3538177a0348';

try {
  await mkdir(cartellaPdf, { recursive: true });
  const docente = await browser.newPage({ viewport: { width: 1440, height: 1420 } });
  const alunno = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  docente.setDefaultTimeout(8000);
  alunno.setDefaultTimeout(8000);
  const errori = [];
  for (const pagina of [docente, alunno]) pagina.on('pageerror', errore => errori.push(errore.message));
  const accesso = await docente.request.post(origine + '/api/docente/accesso', {
    data: { password: 'DOCENTE-DEMO' }
  });
  assert.equal(accesso.status(), 200);
  await docente.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origine) return route.abort();
    if (url.pathname === '/docente/pannello.js') {
      const risposta = await servizioDocente.fetch(new Request(url), {});
      return route.fulfill({ contentType: 'text/javascript', body: await risposta.text() });
    }
    if (url.pathname.startsWith('/docente/verifiche/api/')) {
      const risposta = await route.fetch({ url: url.href.replace('/docente/verifiche/api/', '/api/docente/') });
      return route.fulfill({ response: risposta });
    }
    const risorsa = risorse[url.pathname === '/docente/' ? '/docente/verifiche' : url.pathname];
    if (risorsa) return route.fulfill({ contentType: risorsa[0] + '; charset=utf-8', body: risorsa[1] });
    return route.continue();
  });
  await docente.goto(origine + '/docente/');
  const temaDocente = docente.locator('[data-theme-toggle]');
  const temaAlunno = alunno.locator('[data-verifica-tema]');
  assert.equal(await temaDocente.textContent(), '☀');
  await temaDocente.click();
  assert.equal(await temaDocente.textContent(), '☾');
  assert.equal(await temaDocente.getAttribute('aria-label'), 'Passa al tema scuro');
  await docente.locator('.docente-verifiche').click();
  const sessione = await (await docente.request.get(origine + '/api/docente/sessione')).json();
  const preparazione = await docente.request.post(origine + '/api/docente/configura', {
    data: { anno: sessione.annoScolastico, classe: '5A', modulo: 'wifi',
      minuti: 45, azione: 'crea', presenze: { 101: 'presente', 102: 'assente' }, operazione: id }
  });
  assert.equal(preparazione.status(), 200);
  const { edizione } = await preparazione.json();
  const dataEdizione = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(new Date(edizione.creata));

  await alunno.goto(origine);
  await temaAlunno.locator('svg path').waitFor();
  await temaAlunno.click();
  await temaAlunno.locator('svg circle').waitFor();
  assert.equal(await temaAlunno.getAttribute('aria-label'), 'Passa al tema chiaro');
  await temaAlunno.click();
  await alunno.locator('#codice').fill('WIFI-101');
  await alunno.getByRole('button', { name: 'Accedi alla bozza' }).click();
  await alunno.locator('#verifica-disponibile').selectOption(id);
  await alunno.locator('#inizia').click();
  const compilazione = alunno.locator('#compilazione');
  const ricevuta = 'Verifica consegnata. Le risposte sono state salvate.';
  await alunno.getByText(ricevuta).or(compilazione.locator('textarea').first()).waitFor();
  if (await compilazione.isVisible()) {
    const scelte = await compilazione.locator('input[type=radio][value="0"]').all();
    assert.equal(scelte.length, 20);
    for (const scelta of scelte) await scelta.check();
    const risposte = await compilazione.locator('textarea').all();
    assert.equal(risposte.length, 2);
    await risposte[0].fill('Risposta dimostrativa. Misurerei il segnale in punti diversi dell’aula per confrontare la copertura.');
    await risposte[1].fill('Risposta dimostrativa. Verificherei i canali occupati prima di cambiare configurazione.');
    const numeriche = await compilazione.locator('input[data-gruppo="esercizi"]').all();
    assert.equal(numeriche.length, 4);
    for (const [indice, valore] of ['156', '23,08', '-65', '2'].entries()) await numeriche[indice].fill(valore);
    alunno.once('dialog', avviso => avviso.accept());
    const esito = alunno.waitForResponse(risposta => risposta.url() === origine + '/api/consegna');
    await alunno.getByRole('button', { name: 'Consegna verifica' }).click();
    assert.ok((await (await esito).json()).consegnata);
  }
  await alunno.getByText(ricevuta).waitFor();
  await alunno.screenshot({ path: destinazione('ricevuta.png') });

  await docente.getByRole('button', { name: 'Archivio', exact: true }).click();
  const lista = docente.locator('#elenco-archivio');
  await lista.getByRole('button', { name: /5B.*18\/11\/2026/ }).waitFor();
  assert.equal(await lista.getByRole('button').count(), 3);
  await docente.locator('#archivio-anno').selectOption('2025/2026');
  await lista.getByRole('button', { name: /5A.*19\/11\/2025/ }).waitFor();
  assert.equal(await lista.getByRole('button').count(), 1);
  await docente.locator('#archivio-anno').selectOption('2026/2027');
  await docente.screenshot({ path: destinazione('archivio.png'), clip: { x: 0, y: 0, width: 1440, height: 740 } });
  await lista.getByRole('button').filter({ hasText: '5A · Prima somministrazione ' + dataEdizione }).click();
  await docente.getByText(/Consegne ricevute: 1/).waitFor();
  await docente.locator('#esempio').selectOption({ label: 'Tessari Linda' });
  await docente.screenshot({ path: destinazione('gestione.png') });

  await lista.getByRole('button', { name: /5A.*11\/11\/2026/ }).click();
  await docente.getByText(/Consegne ricevute: 2/).waitFor();
  await docente.locator('#esempio').selectOption({ label: 'Mancini Elio' });
  const scheda = docente.locator('#consegna');
  assert.equal(await scheda.locator('[data-chiuse]').getAttribute('data-chiuse'), '15');
  await docente.evaluate(() => { window.print = () => { window.stampaAperta = true; }; });
  await docente.getByRole('button', { name: 'Stampa / Salva in PDF' }).click();
  assert.equal(await docente.evaluate(() => window.stampaAperta), true);
  await docente.pdf({
    path: fileURLToPath(new URL('Modulo-1-Wi-Fi-verifica-di-esempio.pdf', cartellaPdf)),
    preferCSSPageSize: true, printBackground: true
  });
  assert.deepEqual(errori, []);
  console.log('Consegna locale confermata. Archivio e filtri verificati. Scheda A4 salvata.');
} finally {
  await browser.close();
}
