import { readFile, writeFile } from 'node:fs/promises';

const base = new URL('../../.local/tema-docente-e-testata/worker-pubblicazione.mjs', import.meta.url);
const uscita = new URL('../../.local/tema-docente-e-testata/worker-testi-docente.mjs', import.meta.url);
const modifiche = [
  ['<title>Area docente \\xB7 Telecomunicazioni 5A</title>', '<title>Area docente</title>'],
  ['<div class="lesson-intro-meta"><p class="lesson-intro-topic">Telecomunicazioni 5A</p></div>\\n        ', ''],
  ['Home di Telecomunicazioni 5A</a>', 'Home</a>'],
];

let sorgente = await readFile(base, 'utf8');
for (const [prima, dopo] of modifiche) {
  if (sorgente.split(prima).length !== 2) {
    throw new Error('Riferimento assente o ripetuto nel servizio docente: ' + prima);
  }
  sorgente = sorgente.replace(prima, () => dopo);
}
await writeFile(uscita, sorgente);
