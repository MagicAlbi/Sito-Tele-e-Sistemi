import { readFile } from 'node:fs/promises';

const app = await readFile(new URL('../../assets/js/app.js', import.meta.url), 'utf8');

function copiaIcona(nome) {
  const definizione = new RegExp('function ' + nome + '\\(\\) \\{\\s*return `(<svg[^\n]+</svg>)`');
  const svg = app.match(definizione)?.[1];
  if (!svg) throw new Error('Icona del sito non trovata: ' + nome);
  return svg.replace('<svg ', '<svg aria-hidden="true" ');
}

const sole = copiaIcona('iconSun');
const luna = copiaIcona('iconMoon');

export function aggiornaScriptTema(sorgente) {
  const prima = "button.textContent = theme === 'dark' ? '☀' : '☾';";
  if (!sorgente.includes(prima)) throw new Error('Comando del tema docente non trovato.');
  return sorgente.replace(prima, "button.innerHTML = theme === 'dark' ? '" + sole + "' : '" + luna + "';");
}

export function aggiornaPaginaTema(sorgente) {
  const prima = 'data-theme-toggle aria-label="Passa al tema chiaro">☀</button>';
  if (!sorgente.includes(prima)) throw new Error('Pulsante del tema docente non trovato.');
  return sorgente.replace(prima, 'data-theme-toggle aria-label="Passa al tema chiaro">' + sole + '</button>');
}
