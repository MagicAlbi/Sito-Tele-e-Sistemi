export function oggi() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Rome' }).format(new Date());
}

function randomInt(limite) {
  const soglia = 0x100000000 - 0x100000000 % limite;
  const valore = new Uint32Array(1);
  do { crypto.getRandomValues(valore); } while (valore[0] >= soglia);
  return valore[0] % limite;
}

export function contenutiVerifica(banca, correzioniAperte) {
  const aperte = correzioniAperte.map(({ id, title, prompt }) => ({ id, title, prompt }));
  const esercizi = {
    file: [[450, 240, 65], [480, 250, 68]],
    radio: [[17, 3, 2, 75, 12, -67], [18, 4, 2, 77, 13, -69]]
  };
  const quote = [3, 3, 3, 3, 4, 4];
  if (banca.length !== 100 || aperte.length !== 4 || new Set(banca.map(domanda => domanda.id)).size !== 100 ||
      banca.some(({ options }) => options.length !== 4 || new Set(options.map(opzione => opzione.text)).size !== 4 ||
        options.filter(opzione => opzione.correct).length !== 1)) {
    throw new Error('Controllare la banca delle domande della bozza.');
  }

  function mescola(valori) {
    const copia = [...valori];
    for (let indice = copia.length - 1; indice > 0; indice--) {
      const altro = randomInt(indice + 1);
      [copia[indice], copia[altro]] = [copia[altro], copia[indice]];
    }
    return copia;
  }

  function creaProva(durata, { nome, cognome, classe, anno }) {
    const estratte = mescola(quote.flatMap((quota, indice) =>
      mescola(banca.filter(domanda => domanda.lezione === indice + 1)).slice(0, quota)
    ));
    const posizioni = mescola(estratte.map((_, indice) => indice % 4));
    const chiuse = estratte.map(({ id, lezione, prompt, options }, indice) => {
      const opzioni = mescola(options.filter(opzione => !opzione.correct)).map(opzione => opzione.text);
      opzioni.splice(posizioni[indice], 0, options.find(opzione => opzione.correct).text);
      return { id, lezione, prompt, opzioni, soluzione: posizioni[indice] };
    });
    return {
      anagrafica: { nome, cognome, classe, annoScolastico: anno, data: oggi() },
      chiuse, aperte: mescola(aperte).slice(0, 2),
      esercizi: { file: esercizi.file[randomInt(2)], radio: esercizi.radio[randomInt(2)] },
      risposte: { chiuse: {}, aperte: {}, esercizi: {} },
      residuo: durata, revisione: 0, consegnata: null, recupero: crypto.randomUUID()
    };
  }

  function pubblica(prova) {
    return {
      anagrafica: prova.anagrafica,
      chiuse: prova.chiuse.map(({ id, lezione, prompt, opzioni }) => ({ id, lezione, prompt, opzioni })),
      aperte: prova.aperte, esercizi: prova.esercizi, risposte: prova.risposte, residuo: prova.residuo,
      revisione: prova.revisione, consegnata: prova.consegnata
    };
  }

  function risposteValide(risposte, prova) {
    if (!risposte || typeof risposte !== 'object') return false;
    const gruppi = [
      ['chiuse', prova.chiuse.map(domanda => domanda.id), valore => Number.isInteger(valore) && valore >= 0 && valore <= 3],
      ['aperte', prova.aperte.map(domanda => String(domanda.id)), valore => typeof valore === 'string' && valore.length <= 4000],
      ['esercizi', ['velocita', 'tempo', 'potenza', 'margine'], valore => typeof valore === 'string' && valore.length <= 30]
    ];
    return gruppi.every(([nome, chiavi, valido]) => {
      const gruppo = risposte[nome];
      return gruppo && typeof gruppo === 'object' && !Array.isArray(gruppo) &&
        Object.entries(gruppo).every(([chiave, valore]) => chiavi.includes(chiave) && valido(valore));
    });
  }

  return { creaProva, pubblica, risposteValide };
}
