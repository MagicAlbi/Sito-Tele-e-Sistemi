import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const leggi = nome => readFile(new URL(nome, import.meta.url), 'utf8');
export const banca = runInNewContext(
  await leggi('../../modulo1/domande-allenamento.js') + '\ndomandeAllenamento',
  { QuizAllenamento: { init() {} }, document: { getElementById() {} } }
).map(({ id, prompt, source, options }, indice) => ({
  id: id ?? 'a' + (indice + 1), lezione: Number(source.href.match(/lezione-1-(\d)/)[1]), prompt, options
}));
export const correzioniAperte = runInNewContext(await leggi('aperte-docente.js') + '\naperteDocente')
  .map((domanda, indice) => ({ ...domanda, id: [2, 5, 6, 7][indice] }));
