import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { banca, correzioniAperte } from '../verifiche-fine-modulo/leggi-banca-verifica.mjs';
import { contenutiVerifica } from '../verifiche-fine-modulo/contenuti-verifica.mjs';

const percorso = fileURLToPath(new URL('../../../output/collaudo-verifica-modulo-1/archivio.sqlite', import.meta.url));
const db = new DatabaseSync(percorso);
const { creaProva } = contenutiVerifica(banca, correzioniAperte);
const inserisciEdizione = db.prepare('INSERT OR IGNORE INTO edizioni VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const inserisciProva = db.prepare('INSERT INTO prove VALUES (?, ?)');
const edizioni = [
  ['2026-11-18', '2026/2027', '5B', [['105', 'Iris', 'Riva']]],
  ['2026-11-11', '2026/2027', '5A', [['102', 'Elio', 'Mancini'], ['103', 'Flora', 'Lenzi']]],
  ['2025-11-19', '2025/2026', '5A', [['201', 'Ada', 'Villa'], ['202', 'Gioele', 'Marchi']]]
];

db.exec('BEGIN');
try {
  for (const [data, anno, classe, alunni] of edizioni) {
    const presenze = Object.fromEntries(alunni.map(([profilo]) => [profilo, 'presente']));
    const id = 'storico-' + data;
    if (!inserisciEdizione.run(id, anno, classe, 'wifi', data + 'T08:10:00+01:00',
      45, JSON.stringify(presenze), 'chiusa').changes) continue;
    for (const [profilo, nome, cognome] of alunni) {
      const prova = creaProva(45 * 60000, { nome, cognome, classe, anno });
      prova.anagrafica.data = data;
      prova.consegnata = data + 'T08:49:00+01:00';
      prova.revisione = 1;
      prova.residuo = 6 * 60000;
      prova.recupero = randomUUID();
      prova.risposte.chiuse = Object.fromEntries(prova.chiuse.slice(0, 19).map((domanda, indice) =>
        [domanda.id, (domanda.soluzione + Number(indice % 5 === 0)) % 4]));
      prova.risposte.aperte = Object.fromEntries(prova.aperte.map(({ id }) => {
        const risposte = {
          '2': 'Una rete con access point permette ai dispositivi di comunicare attraverso un punto centrale.',
          '5': 'Misurerei il segnale in più punti prima di decidere dove spostare l’access point.',
          '6': 'Userei canali diversi per ridurre l’interferenza tra reti vicine.',
          '7': 'Una rete ospiti separa gli accessi e limita la visibilità dei dispositivi interni.'
        };
        return [id, risposte[id] ?? 'Risposta di esempio per il collaudo.'];
      }));
      const [dimensione, nominale, percentuale] = prova.esercizi.file;
      const [tx, guadagnoTx, guadagnoRx, percorso, parete, soglia] = prova.esercizi.radio;
      const velocita = nominale * percentuale / 100;
      const potenza = tx + guadagnoTx + guadagnoRx - percorso - parete;
      prova.risposte.esercizi = {
        velocita: String(velocita), tempo: (dimensione * 8 / velocita).toFixed(2).replace('.', ','),
        potenza: String(potenza), margine: String(potenza - soglia + 1)
      };
      inserisciProva.run(id + ':' + profilo, JSON.stringify(prova));
    }
  }
  db.exec('COMMIT');
} catch (errore) {
  db.exec('ROLLBACK');
  throw errore;
} finally {
  db.close();
}
