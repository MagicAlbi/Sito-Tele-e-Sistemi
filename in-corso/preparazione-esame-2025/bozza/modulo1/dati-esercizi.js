(() => {
  const format = (number) => number.toLocaleString('it-IT', { useGrouping: false });
  const fixed = (number, decimals = 2) => number.toFixed(decimals).replace('.', ',').replace(/^-/, '−');
  const percentHint = 'Verifica se hai usato la velocità nominale senza applicare la percentuale.';
  const conversionHint = 'Verifica la conversione da megabyte a megabit. Ogni byte contiene 8 bit.';
  const speedLaw = 'Rᵤ = Rₙ × η';
  const timeLaw = 't = D ÷ Rᵤ';
  const lossLaw = 'Lₛ = 20 log₁₀(d) + 20 log₁₀(f) − 27,55';
  const powerLaw = 'Pᵣₓ = Pₜₓ + Gₜₓ + Gᵣₓ − Lₛ − Lₒ';
  const marginLaw = 'Δ = Pᵣₓ − S';

  function transfer(title, context, nominal, percent, size) {
    const effective = nominal * percent / 100;
    const megabits = size * 8;
    const time = megabits / effective;
    return {
      title,
      context,
      task: 'Calcola la velocità utile e il tempo di trasferimento, assumendo una velocità utile costante.',
      facts: [
        ['Velocità nominale', `${nominal} Mbps`],
        ['Quota utile', `${percent}%`],
        ['Dimensione del file', `${size} MB`]
      ],
      answers: [
        { label: 'Velocità utile', unit: 'Mbps', value: effective, decimals: 2, errors: [{ value: nominal, hint: percentHint }] },
        { label: 'Tempo di trasferimento', unit: 's', value: time, decimals: 2, errors: [
          { value: size / effective, hint: conversionHint },
          { value: megabits / nominal, hint: percentHint }
        ] }
      ],
      steps: [
        {
          title: 'Converti la percentuale e il file',
          text: 'Scrivi la percentuale come frazione di 1 e porta la dimensione del file da megabyte a megabit.',
          equations: [`η = ${percent} ÷ 100 = ${format(percent / 100)}`, `D = ${size} MB × 8 Mbit/MB = ${megabits} Mbit`]
        },
        {
          title: 'Trova la velocità utile',
          text: 'Moltiplica la velocità nominale per la quota che trasporta i dati utili.',
          equations: [`${speedLaw} = ${nominal} Mbps × ${format(percent / 100)} = ${format(effective)} Mbps`]
        },
        {
          title: 'Calcola il tempo di trasferimento',
          text: 'Dividi i megabit del file per i megabit effettivamente trasferiti ogni secondo.',
          equations: [`${timeLaw} = ${megabits} Mbit ÷ ${format(effective)} Mbps ≈ ${fixed(time)} s`]
        }
      ]
    };
  }

  function freeSpace(title, context, distance, frequency) {
    const mhz = frequency * 1000;
    const distanceTerm = 20 * Math.log10(distance);
    const frequencyTerm = 20 * Math.log10(mhz);
    const loss = distanceTerm + frequencyTerm - 27.55;
    return {
      title,
      context,
      task: 'Calcola la perdita di propagazione in spazio libero.',
      facts: [['Distanza tra le antenne', `${distance} m`], ['Frequenza', `${format(frequency)} GHz`]],
      answers: [{
        label: 'Perdita in spazio libero', unit: 'dB', value: loss, decimals: 2,
        errors: [{ value: loss - 60, hint: 'Verifica se hai convertito la frequenza da GHz a MHz prima di sostituirla.' }]
      }],
      steps: [
        {
          title: 'Porta la frequenza in megahertz',
          text: 'La formula richiede la distanza in metri e la frequenza in megahertz. La distanza è già in metri.',
          equations: [`f = ${format(frequency)} GHz × 1000 MHz/GHz = ${mhz} MHz`]
        },
        {
          title: 'Sostituisci distanza e frequenza',
          text: 'Usa il modello in spazio libero per il solo percorso diretto tra le antenne.',
          equations: [lossLaw, `Lₛ = 20 log₁₀(${distance}) + 20 log₁₀(${mhz}) − 27,55`]
        },
        {
          title: 'Combina i due termini',
          text: 'Somma i contributi della distanza e della frequenza, poi sottrai la costante. Conserva le cifre della calcolatrice fino al risultato finale.',
          equations: [`Lₛ ≈ ${fixed(distanceTerm, 4)} + ${fixed(frequencyTerm, 4)} − 27,55 ≈ ${fixed(loss)} dB`]
        }
      ]
    };
  }

  function linkBudget(title, context, tx, txGain, rxGain, spaceLoss, obstacleLoss, threshold) {
    const gains = tx + txGain + rxGain;
    const losses = spaceLoss + obstacleLoss;
    const received = gains - losses;
    const margin = received - threshold;
    return {
      title,
      context,
      task: 'Calcola la potenza ricevuta e il margine rispetto alla soglia. Usa un margine negativo se il segnale è sotto soglia.',
      facts: [
        ['Potenza trasmessa', `${tx} dBm`],
        ['Guadagni delle antenne in trasmissione (TX) e ricezione (RX)', `${txGain} e ${rxGain} dBi`],
        ['Perdita in spazio libero', `${spaceLoss} dB`],
        ['Perdita per ostacoli', `${obstacleLoss} dB`],
        ['Soglia richiesta', `${fixed(threshold, 0)} dBm`]
      ],
      answers: [
        { label: 'Potenza ricevuta', unit: 'dBm', value: received, decimals: 0, signed: true, errors: [
          { value: received + obstacleLoss, hint: 'Verifica se hai sottratto anche la perdita dovuta agli ostacoli.' }
        ] },
        { label: 'Margine rispetto alla soglia', unit: 'dB', value: margin, decimals: 0, signed: true, errors: [
          { value: -margin, hint: 'Verifica l’ordine della sottrazione. Parti dalla potenza ricevuta e sottrai la soglia.' }
        ] }
      ],
      steps: [
        {
          title: 'Raggruppa guadagni e perdite',
          text: 'Aggiungi alla potenza trasmessa i guadagni delle due antenne. A parte somma le perdite in spazio libero e per gli ostacoli.',
          equations: [`${tx} + ${txGain} + ${rxGain} = ${gains} dBm`, `${spaceLoss} + ${obstacleLoss} = ${losses} dB`]
        },
        {
          title: 'Ricava la potenza ricevuta',
          text: 'Sottrai la perdita totale dalla potenza con i guadagni già inclusi.',
          equations: [powerLaw, `Pᵣₓ = (${gains} − ${losses}) dBm = ${fixed(received, 0)} dBm`]
        },
        {
          title: 'Confronta con la soglia',
          text: 'Sottrai la soglia dalla potenza ricevuta, mantenendo il segno di entrambi i valori.',
          equations: [`${marginLaw} = [${fixed(received, 0)} − (${fixed(threshold, 0)})] dB = ${fixed(margin, 0)} dB`]
        }
      ],
      conclusion: margin === 0 ? 'Il segnale arriva esattamente alla soglia.' :
        margin > 0 ? 'Il segnale supera la soglia.' : 'Il segnale è sotto soglia.'
    };
  }

  const speedLesson = '../../../../modulo1/lezione-1-2.html#slide-2';
  const radioLesson = 'lezione-1-6.html#slide-1';

  function outdoorLink(title, space, obstacle, threshold) {
    const cable = 3;
    const received = 18 + 10 + 10 - space - cable;
    const margin = received - obstacle - threshold;
    return {
      title,
      context: 'Due edifici sono collegati via radio. Per prima cosa valuta il percorso senza ostacoli. Poi considera la perdita aggiuntiva indicata.',
      task: 'Calcola la potenza ricevuta senza ostacoli e il margine dopo la perdita aggiuntiva.',
      facts: [
        ['Potenza trasmessa', '18 dBm'], ['Guadagni delle antenne', '10 dBi per antenna'],
        ['Perdita dei cavi', '2 dB in trasmissione e 1 dB in ricezione'],
        ['Perdita in spazio libero', `${space} dB`], ['Perdita aggiuntiva', `${obstacle} dB`],
        ['Soglia', `${fixed(threshold, 0)} dBm`]
      ],
      answers: [
        { label: 'Potenza ricevuta senza ostacoli', unit: 'dBm', value: received, decimals: 0, signed: true,
          errors: [{ value: received + cable, hint: 'Sottrai anche le perdite dei due cavi.' }] },
        { label: 'Margine dopo la perdita aggiuntiva', unit: 'dB', value: margin, decimals: 0, signed: true,
          errors: [{ value: received - threshold, hint: 'Sottrai la perdita aggiuntiva prima di confrontare con la soglia.' }] }
      ],
      steps: [
        { title: 'Calcola la potenza ricevuta', text: 'Somma i guadagni e sottrai la perdita in spazio libero e nei cavi.',
          equations: [`18 + 10 + 10 − ${space} − 2 − 1 = ${fixed(received, 0)} dBm`] },
        { title: 'Verifica il margine con l’ostacolo', text: 'Sottrai la perdita aggiuntiva, poi la soglia.',
          equations: [`${fixed(received, 0)} − ${obstacle} − (${fixed(threshold, 0)}) = ${fixed(margin, 0)} dB`] }
      ],
      conclusion: margin < 0 ? 'Il segnale stimato scende sotto soglia.' : 'Il segnale stimato resta sopra soglia.'
    };
  }

  window.numericalExercises = {
    reference: [
      {
        title: 'Collegamento radio all’aperto', tone: 'link', lesson: 'lezione-1-6.html#ponte-aperto', lessonLabel: 'Lezione 1.6',
        equations: ['Pᵣₓ = Pₜₓ + Gₜₓ + Gᵣₓ − Lₛ − L꜀ − Lₒ', marginLaw],
        symbols: 'L꜀ è la somma delle perdite nei cavi. Lₒ è la perdita aggiuntiva dovuta a ostacoli.',
        use: 'Sottrai entrambe le perdite prima di confrontare la potenza ricevuta con la soglia.'
      },
      {
        title: 'Velocità utile', tone: 'speed', lesson: speedLesson, lessonLabel: 'Lezione 1.2',
        equations: [speedLaw],
        symbols: 'Rₙ è la velocità nominale, Rᵤ quella utile (entrambe in Mbps) e η la quota utile espressa come numero decimale.',
        use: 'Usala quando conosci la percentuale di velocità disponibile per i dati.'
      },
      {
        title: 'Tempo di trasferimento', tone: 'time', lesson: speedLesson, lessonLabel: 'Lezione 1.2',
        equations: [timeLaw, '1 MB = 8 Mbit'],
        symbols: 'D è la dimensione del file in Mbit, Rᵤ la velocità utile in Mbps e t il tempo in secondi.',
        use: 'Usala quando puoi considerare costante la velocità utile.'
      },
      {
        title: 'Perdita in spazio libero', tone: 'space', lesson: radioLesson, lessonLabel: 'Lezione 1.6',
        equations: [lossLaw],
        symbols: 'Lₛ è la perdita in dB, d la distanza in metri e f la frequenza in MHz. Per passare da GHz a MHz moltiplica per 1000.',
        use: 'Stima l’attenuazione del percorso diretto tra antenne a vista. Calcola a parte l’effetto degli ostacoli.'
      },
      {
        title: 'Bilancio di collegamento', tone: 'link', lesson: radioLesson, lessonLabel: 'Lezione 1.6',
        equations: [powerLaw, marginLaw],
        symbols: 'Pₜₓ e Pᵣₓ sono le potenze trasmessa e ricevuta in dBm. Gₜₓ e Gᵣₓ sono i guadagni in dBi. Lₛ e Lₒ sono le perdite in dB.',
        use: 'Confronta la potenza ricevuta con la soglia S in dBm. Il margine Δ è in dB. La soglia è raggiunta per Δ ≥ 0.'
      }
    ],
    types: [
      {
        title: 'Collegamento radio all’aperto · cavi e ostacoli', tone: 'link',
        exercises: [
          outdoorLink('Depositi oltre il piazzale', 105, 10, -78),
          outdoorLink('Due laboratori in cortile', 108, 5, -82)
        ]
      },
      {
        title: 'Velocità utile e tempo di trasferimento', tone: 'speed',
        exercises: [
          transfer('Video in biblioteca', 'Una postazione scarica un video didattico dalla rete locale.', 300, 55, 420),
          transfer('Cartografia sul portatile', 'Un portatile riceve un archivio di mappe dal server locale.', 144, 50, 270),
          transfer('Aggiornamento di una postazione', 'Una postazione scarica un aggiornamento dal server del laboratorio.', 240, 60, 520)
        ]
      },
      {
        title: 'Perdita in spazio libero', tone: 'space',
        exercises: [
          freeSpace('Piazzale di un deposito', 'Una postazione mobile ha il punto di accesso in vista.', 12, 2.4),
          freeSpace('Cortile con punto di accesso', 'Un tecnico prova il collegamento in un cortile aperto.', 21, 5),
          freeSpace('Prova in palestra', 'Due apparati di collaudo comunicano ai lati di una palestra vuota, con visibilità diretta.', 26, 6)
        ]
      },
      {
        title: 'Bilancio di collegamento e margine', tone: 'link',
        exercises: [
          linkBudget('Attraverso il corridoio', 'Un portatile si collega a un punto di accesso oltre una parete.', 18, 3, 1, 70, 8, -67),
          linkBudget('Archivio dietro due pareti', 'Un terminale in archivio deve raggiungere il punto di accesso nel vano adiacente.', 17, 2, 1, 74, 19, -67),
          linkBudget('Lettore nel magazzino', 'Un lettore portatile comunica con un punto di accesso attraverso una scaffalatura.', 15, 4, 2, 69, 12, -60)
        ]
      }
    ]
  };
})();
