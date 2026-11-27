import { readFile, writeFile } from 'node:fs/promises';

const locale = new URL('../../.local/tema-docente-e-testata/', import.meta.url);
const base = new URL('worker-testi-docente.mjs', locale);
const uscita = new URL('worker-navigazione-docente.mjs', locale);

const navigazione = `const NAV_DOCENTE_CSS = \`
.percorso-docente { margin-block-end: .85rem; }
.percorso-docente ol { display: flex; flex-wrap: wrap; gap: .3rem .65rem; padding: 0; list-style: none; }
.percorso-docente li { display: flex; align-items: center; gap: .65rem; color: var(--text-muted); font-size: .875rem; }
.percorso-docente a { color: var(--primary); text-decoration: underline; text-underline-offset: .2em; }
[data-theme="light"] .percorso-docente a { color: #145482; }
.percorso-docente [aria-current="page"] { color: var(--text); font-weight: 650; }
.codici-docente { width: 100%; max-width: 960px; margin: 0 auto; padding: 2.5rem clamp(1rem, 4vw, 2.5rem); }
.codici-docente .lesson-title-h1 { margin: 0; }
.codici-docente .lesson-subtitle { margin-block-start: .5rem; }
.codici-docente .verifica-hero > div { padding-inline-end: 2.65rem; }
.codici-docente .verifica-tema { position: absolute; top: .85rem; right: .85rem; z-index: 1; background: var(--surface); border: 1px solid var(--hero-line); }
.codici-docente .descrizione-codici { margin-block: 1rem; border-inline-start: 3px solid var(--m1); }
@media print { .percorso-docente { display: none; } }
\`;
function percorsoDocente(voci) {
  const tappe = [["Home", SITE], ...voci];
  const elementi = tappe.map(([nome, href], indice) => {
    const separatore = indice ? '<span aria-hidden="true">/</span>' : '';
    const voce = href ? '<a href="' + esc(href) + '">' + esc(nome) + '</a>' : '<span aria-current="page">' + esc(nome) + '</span>';
    return '<li>' + separatore + voce + '</li>';
  });
  return '<nav class="percorso-docente" aria-label="Percorso di navigazione"><ol>' + elementi.join('') + '</ol></nav>';
}
function testataCodici(riepilogo = '') {
  const classe = riepilogo ? '<p class="lesson-subtitle">' + esc(riepilogo) + '</p>' : '';
  return '<header class="lesson-intro-hero verifica-hero"><div><h1 class="lesson-title-h1">Codici alunni</h1>' + classe + '</div>' +
    '<img src="/docente/verifiche-risorse/indice-rete-radio.svg" alt=""><button type="button" class="btn btn-icon btn-ghost verifica-tema" data-theme-toggle aria-label="Cambia tema"></button></header>';
}
function navigazioneVerifiche(html) {
  return html.replace('<header class="lesson-intro-hero verifica-hero">', percorsoDocente([["Area docente"]]) + '<header class="lesson-intro-hero verifica-hero">')
    .replace(/<p id="battuta-docente"[^>]*>[^<]*<\\/p>/, '')
    .replace(/<nav id="torna-docente"[^>]*>[\\s\\S]*?<\\/nav>/, '')
    .replace(/<p id="torna-home"[^>]*>[\\s\\S]*?<\\/p>/, '')
    .replace('<form class="scheda-comandi" method="post" action="/docente/esci">', '<form id="esci-docente" class="scheda-comandi" method="post" action="/docente/esci" hidden>');
}
`;

const aggiornaPercorso = `function aggiornaPercorsoDocente(vista) {
  const titolo = document.querySelector('.verifica-hero h1');
  titolo.textContent = vista === 'inizio' ? 'Area docente' : 'Verifiche';
  document.title = titolo.textContent;
  document.querySelector('#esci-docente').hidden = vista !== 'inizio';
  const percorso = document.querySelector('.percorso-docente ol');
  const voci = [['Area docente', vista === 'inizio' ? '' : '/docente/']];
  if (vista === 'archivio') voci.push(['Verifiche', '#verifiche'], ['Archivio', '']);
  if (vista === 'nuova') voci.push(['Nuova verifica', '']);
  percorso.replaceChildren(percorso.firstElementChild, ...voci.map(([nome, href]) => {
    const li = document.createElement('li');
    const barra = document.createElement('span');
    barra.textContent = '/';
    barra.setAttribute('aria-hidden', 'true');
    const voce = document.createElement(href ? 'a' : 'span');
    voce.textContent = nome;
    if (href) voce.href = href;
    else voce.setAttribute('aria-current', 'page');
    li.append(barra, voce);
    return li;
  }));
}
`;

const inizioCodici = String.raw`    <p class="teacher-trail"><a href="${'${SITE}'}">Home</a> <span aria-hidden="true">/</span> Area docente</p>`;
const titoloClassi = '<section class="teacher-intro"><div><h1>Area docente</h1><p>Gestisci classi, codici e avanzamento.</p></div></section>';
const inizioClasse = inizioCodici.replace(' Area docente</p>', '') + '\n' + String.raw`    <a href="/docente/?anno=${'${encodeURIComponent(group.year)}'}">Area docente</a> <span aria-hidden="true">/</span> ${'${esc(group.label)}'}</p>`;
const titoloClasse = String.raw`<section class="teacher-intro"><div><h1>Classe ${'${esc(group.label)}'}</h1>` + '\n' + String.raw`    <p>${'${esc(group.year)}'} \xB7 ${'${students.length}'} alunni</p></div></section>`;

const paginaCodici = [
  '  if (signedIn) return temaPaginaDocente(`<!doctype html><html lang="it" data-theme="dark"${sessionTime}><head>',
  '<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>${esc(title)} · Area docente</title>',
  '<link rel="stylesheet" href="${SITE}assets/css/style.css"><link rel="stylesheet" href="${SITE}assets/css/introduzione-lezioni.css"><link rel="stylesheet" href="/docente/stile.css">',
  '</head><body><main class="teacher-wrap codici-docente module-one">${body}</main><script src="/docente/pannello.js" defer></script></body></html>`);',
].join('\n');

export const modifiche = [
  ['function temaPaginaDocente(contenuto, stileCondiviso = false) {', navigazione + 'function temaPaginaDocente(contenuto, stileCondiviso = false) {'],
  ['temaPaginaDocente(originale, true)', 'temaPaginaDocente(navigazioneVerifiche(originale), true)'],
  ['return response(CSS + loginLayout + THEME_ICONS_CSS,', 'return response(CSS + loginLayout + THEME_ICONS_CSS + NAV_DOCENTE_CSS,'],
  ['  return temaPaginaDocente(`<!doctype html>', paginaCodici + '\n  return temaPaginaDocente(`<!doctype html>'],
  ['return page("Classi", `\n' + inizioCodici + '\n    ' + titoloClassi, 'return page("Codici alunni", `\n    ${percorsoDocente([["Area docente", "/docente/"], ["Codici alunni"]])}\n    ${testataCodici()}\n    <div class="teacher-card descrizione-codici">Gestisci classi, codici e avanzamento.</div>'],
  ['return page(group.label, `\n' + inizioClasse + '\n    ' + titoloClasse, 'return page("Codici alunni", `\n    ${percorsoDocente([["Area docente", "/docente/"], ["Codici alunni", "/docente/codici/?anno=" + encodeURIComponent(group.year)], [group.label]])}\n    ${testataCodici("Classe " + group.label + " · " + group.year.replace("/", "–") + " · " + students.length + (students.length === 1 ? " alunno" : " alunni"))}'],
  ["const battutaDocente = document.querySelector('#battuta-docente');", ''],
  ["const tornaDocente = document.querySelector('#torna-docente');", ''],
  ["  battutaDocente.hidden = !dati.attiva;", ''],
  ["  tornaDocente.hidden = vista === 'inizio';", '  aggiornaPercorsoDocente(vista);'],
  ['async function mostraVista(vista) {', aggiornaPercorso + 'async function mostraVista(vista) {'],
  ["'#verifiche': 'nuova', '#codici': 'codici'", "'#verifiche': 'nuova', '#archivio': 'archivio'"],
  ["pulsante.addEventListener('click', () => void mostraVista(pulsante.value));", "pulsante.addEventListener('click', () => {\n    const destinazione = pulsante.value === 'archivio' ? '#archivio' : '#verifiche';\n    if (location.hash !== destinazione) location.hash = destinazione;\n  });"],
];

let sorgente = (await readFile(base, 'utf8')).replaceAll('\r\n', '\n');
for (const [prima, dopo] of modifiche) {
  if (sorgente.split(prima).length !== 2) throw new Error('Riferimento assente o ripetuto: ' + prima);
  sorgente = sorgente.replace(prima, () => dopo);
}
await writeFile(uscita, sorgente);
await writeFile(new URL('modifiche-navigazione.json', locale), JSON.stringify(modifiche));
