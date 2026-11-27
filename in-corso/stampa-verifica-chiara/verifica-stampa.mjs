import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(join(process.env.USERPROFILE,
  '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const output = new URL('../../../output/', import.meta.url);
const cartellaVerifica = new URL('stampa-verifica-chiara/', output);
const pdf = fileURLToPath(new URL('pdf/Modulo-1-Wi-Fi-stampa-con-quadrato-voto-arrotondato.pdf', output));
await mkdir(cartellaVerifica, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const pagina = await browser.newPage();
  await pagina.goto('http://127.0.0.1:18766/docente/?vista=archivio');
  const tema = pagina.locator('[data-theme-toggle]');
  assert.equal(await pagina.locator('html').getAttribute('data-theme'), 'dark');
  await pagina.locator('#elenco-archivio button').filter({ hasText: '11/11/2026' }).click();
  await pagina.getByText('Consegne ricevute: 2 · Assenti: 0').waitFor();
  await pagina.locator('#esempio').selectOption({ label: 'Mancini Elio' });
  const scheda = pagina.locator('#consegna');
  const intestazione = scheda.getByRole('heading', { name: 'Modulo 1 · Wi-Fi' });
  const datiProva = scheda.locator('section[aria-label="Dati della prova"]');
  assert.equal(await intestazione.isVisible(), false);
  assert.equal(await datiProva.evaluate(nodo => getComputedStyle(nodo, '::after').content), 'none');
  assert.equal(await scheda.locator('.scheda-chiusa').count(), 20);
  assert.equal(await scheda.locator('.scheda-sezione').count(), 3);
  const totale = scheda.locator('.scheda-sezione > h2 + .scheda-totale');
  assert.equal(await totale.innerText(), 'Totale domande chiuse 15 / 20');
  assert.equal(await totale.isVisible(), true);
  const campoPunti = scheda.locator('.scheda-griglia input[type="number"]').first();
  const caselle = scheda.locator('.scheda-griglia input[type="number"] + .scheda-solo-stampa');
  const casella = caselle.first();
  const campoSchemi = scheda.locator('.scheda-giudizio').first();
  const spazioSchemi = scheda.locator('.scheda-spazio-schemi').first();
  assert.equal(await campoPunti.isVisible(), true);
  assert.equal(await casella.isVisible(), false);
  await campoPunti.fill('1');
  assert.equal(await casella.textContent(), '1');
  await campoPunti.fill('');
  assert.equal(await casella.textContent(), '');
  assert.equal(await campoSchemi.isVisible(), true);
  assert.equal(await spazioSchemi.isVisible(), false);
  await campoSchemi.fill('Nota di esempio');
  assert.equal(await spazioSchemi.textContent(), 'Nota di esempio');
  await campoSchemi.fill('');
  const punteggi = scheda.locator('.scheda-griglia input[type="number"]');
  for (const campo of await punteggi.all()) await campo.fill('0');
  assert.equal(await scheda.locator('[data-totale="verifica"]').textContent(), '15');
  assert.equal(await scheda.locator('[data-subtotale]').first().textContent(), '0');
  for (const campo of await punteggi.all()) await campo.fill('');
  await pagina.evaluate(() => { window.print = () => { window.stampaRichiesta = true; }; });
  await pagina.locator('#stampa').click();
  assert.equal(await pagina.evaluate(() => window.stampaRichiesta), true);

  await pagina.emulateMedia({ media: 'print' });
  assert.equal(await intestazione.isVisible(), true);
  const verificaQuadratiVoto = async (intestazioni, numero) => {
    const quadrati = await intestazioni.evaluateAll(nodi => nodi.map(nodo => {
      const stile = getComputedStyle(nodo, '::after');
      return {
        vuoto: stile.content === '""',
        quadrato: stile.width === stile.height && parseFloat(stile.width) > 60,
        quasiAltoQuantoIntestazione: parseFloat(stile.height) / nodo.getBoundingClientRect().height > .7,
        sfondo: stile.backgroundColor, bordo: stile.borderTopWidth,
        angoliArrotondati: Math.abs(parseFloat(stile.borderRadius) - 2 * 96 / 25.4) < .1
      };
    }));
    assert.deepEqual(quadrati, Array.from({ length: numero }, () => ({
      vuoto: true, quadrato: true, quasiAltoQuantoIntestazione: true, sfondo: 'rgb(255, 255, 255)', bordo: '1px',
      angoliArrotondati: true
    })));
  };
  await verificaQuadratiVoto(datiProva, 1);
  assert.equal(await totale.isVisible(), true);
  assert.equal(await campoPunti.isVisible(), false);
  assert.equal(await casella.isVisible(), true);
  assert.ok((await caselle.allTextContents()).every(testo => testo === ''));
  assert.equal(await campoSchemi.isVisible(), false);
  assert.equal(await spazioSchemi.isVisible(), true);
  assert.equal(await spazioSchemi.textContent(), '');
  const dimensioniPunti = await casella.boundingBox();
  const dimensioniSchemi = await spazioSchemi.boundingBox();
  assert.ok(dimensioniPunti.width >= 90 && dimensioniPunti.height >= 26);
  assert.ok(dimensioniSchemi.width > 400 && dimensioniSchemi.height >= 71);
  const scartiVerticali = await scheda
    .locator('.scheda-griglia input[type="number"] + .scheda-solo-stampa')
    .evaluateAll(spazi => spazi.map(spazio => {
      const casella = spazio.getBoundingClientRect();
      const riga = spazio.closest('tr').getBoundingClientRect();
      return casella.y + casella.height / 2 - riga.y - riga.height / 2;
    }));
  assert.ok(scartiVerticali.every(scarto => Math.abs(scarto - .3 * 96 / 25.4) < 0.1), JSON.stringify(scartiVerticali));
  const distanzeSchemi = await scheda.locator('.scheda-spazio-schemi').evaluateAll(spazi => spazi.map(spazio => {
    const riquadro = spazio.getBoundingClientRect();
    const scritta = spazio.previousElementSibling.getBoundingClientRect();
    const riga = spazio.closest('tr').getBoundingClientRect();
    return [riquadro.top - scritta.bottom, riga.bottom - riquadro.bottom];
  }));
  assert.ok(distanzeSchemi.every(([sopra, sotto]) =>
    Math.abs(sopra - 1.77 * 96 / 25.4) < .1 && Math.abs(sotto - 2.26 * 96 / 25.4) < .1));
  const celleTotali = scheda.locator('[data-subtotale], [data-totale]:not([data-totale="chiuse"])');
  assert.ok((await celleTotali.allTextContents()).every(testo => testo === ''));
  assert.equal(await celleTotali.first().evaluate(nodo => getComputedStyle(nodo, '::before').content), '""');
  assert.ok(await celleTotali.evaluateAll(celle => celle.every(cella =>
    getComputedStyle(cella).verticalAlign === 'middle' && getComputedStyle(cella, '::before').display === 'grid')));
  assert.doesNotMatch(await scheda.locator('.scheda-griglia').first().innerText(), /—|_____/);
  assert.equal(await totale.evaluate(nodo => getComputedStyle(nodo).fontSize === getComputedStyle(nodo.parentElement).fontSize), true);
  const massimoGriglia = scheda.locator('.scheda-griglia tbody tr td:nth-child(2)').first();
  const massimoRiepilogo = scheda.locator('.scheda-riepilogo tbody td:last-child').first();
  const assegnatiRiepilogo = scheda.locator('.scheda-riepilogo tr > :nth-child(2)');
  for (const cella of [massimoGriglia, massimoRiepilogo, ...await assegnatiRiepilogo.all()]) {
    assert.deepEqual(await cella.evaluate(nodo => {
      const stile = getComputedStyle(nodo);
      return [stile.textAlign, stile.verticalAlign];
    }), ['center', 'middle']);
  }
  const allineamenti = await scheda.locator('.scheda-tabella :is(th, td)').evaluateAll(celle =>
    celle.map(cella => getComputedStyle(cella).verticalAlign));
  assert.ok(allineamenti.every(valore => valore === 'middle'));
  const altezzeRiepilogo = await scheda.locator('.scheda-riepilogo tbody tr').evaluateAll(righe =>
    righe.map(riga => riga.getBoundingClientRect().height));
  assert.deepEqual(altezzeRiepilogo, [32, 32, 32]);
  const altezzeEsercizi = await scheda
    .locator('.scheda-sezione:has(+ .scheda-riepilogo) .scheda-griglia :is(tbody, tfoot) > tr')
    .evaluateAll(righe => righe.map(riga => riga.getBoundingClientRect().height));
  assert.equal(altezzeEsercizi.length, 8);
  assert.ok(altezzeEsercizi[0] >= 32 && altezzeEsercizi.every(altezza => altezza === altezzeEsercizi[0]));
  const separatori = await scheda.locator('.scheda-tabella :is(tbody, tfoot) > tr').evaluateAll(righe =>
    righe.filter(riga => getComputedStyle(riga).display !== 'none').map(riga => {
      const stile = getComputedStyle(riga);
      return [stile.backgroundImage, stile.backgroundSize, getComputedStyle(riga.firstElementChild).borderTopWidth];
    }));
  assert.match(separatori[0][0], /^linear-gradient/);
  assert.deepEqual(separatori[0].slice(1), ['100% 2px', '0px']);
  assert.ok(separatori.every(stile => JSON.stringify(stile) === JSON.stringify(separatori[0])));
  const nonData = scheda.locator('.scheda-chiusa.omessa .scheda-omissione');
  assert.equal(await nonData.innerText(), 'Risposta non data');
  assert.equal(await nonData.evaluate(nodo => getComputedStyle(nodo).backgroundColor), 'rgb(255, 245, 223)');
  assert.equal(await pagina.getByRole('heading', { name: 'Area docente' }).isVisible(), false);
  const aspetto = async () => scheda.evaluate(consegna => {
    const stili = (selettore, proprieta) => getComputedStyle(consegna.querySelector(selettore))[proprieta];
    return {
      riquadro: stili('.scheda-chiusa', 'borderRadius'),
      rispostaGiusta: stili('.scheda-opzione.giusta', 'backgroundColor'),
      sezione: stili('.scheda-sezione > h2', 'backgroundColor'),
      tabella: stili('.scheda-tabella', 'borderRadius'),
      casella: stili('.scheda-griglia input[type="number"] + .scheda-solo-stampa', 'borderRadius'),
      inizioAperte: stili('.scheda-sezione:nth-of-type(3)', 'breakBefore')
    };
  });
  const aspettoDaScuro = await aspetto();
  await pagina.emulateMedia({ media: 'screen' });
  await tema.click();
  assert.equal(await pagina.locator('html').getAttribute('data-theme'), 'light');
  await totale.screenshot({
    path: fileURLToPath(new URL('totale-area-docente.png', cartellaVerifica))
  });
  await pagina.emulateMedia({ media: 'print' });
  assert.deepEqual(await aspetto(), aspettoDaScuro);
  assert.equal(aspettoDaScuro.riquadro, '16px');
  assert.equal(aspettoDaScuro.tabella, '10px');
  assert.equal(aspettoDaScuro.casella, '5px');
  assert.equal(aspettoDaScuro.inizioAperte, 'page');
  await pagina.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });

  await pagina.emulateMedia({ media: 'screen' });
  await pagina.locator('#stampa-tutte').click();
  await pagina.emulateMedia({ media: 'print' });
  const collettiva = pagina.locator('#stampa-classe');
  assert.equal(await collettiva.getByRole('heading', { name: 'Modulo 1 · Wi-Fi' }).count(), 2);
  await verificaQuadratiVoto(collettiva.locator('section[aria-label="Dati della prova"]'), 2);
  assert.equal(await scheda.isVisible(), false);
  assert.equal(await collettiva.locator('article').first().isVisible(), true);
  await pagina.pdf({
    path: fileURLToPath(new URL('controllo-stampa-classe.pdf', cartellaVerifica)),
    preferCSSPageSize: true, printBackground: true
  });
  console.log('Stampa singola e collettiva verificate. Stesso aspetto chiaro partendo dai due temi.');
} finally {
  await browser.close();
}
