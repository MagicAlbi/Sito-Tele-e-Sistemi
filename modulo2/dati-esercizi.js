(() => {
  const number = (value, decimals = 4) => value.toLocaleString('it-IT', {
    useGrouping: false, maximumFractionDigits: decimals
  });
  const round = value => number(value, 2);
  const answer = (label, unit, value, decimals, errors = []) => ({ label, unit, value, decimals, errors });
  const approximate = (label, unit, value, errors) => ({ ...answer(label, unit, value, 2, errors), tolerance: 0.03 });
  const error = (value, hint) => ({ value, hint });
  const step = (title, text, ...equations) => ({ title, text, equations });

  function serial(title, bytes, rate) {
    const bits = bytes * 10;
    const duration = bits / rate;
    return {
      title,
      context: 'Una console asincrona invia un blocco di byte in formato 8N1, senza pause.',
      task: 'Calcola bit sulla linea e durata dell’invio.',
      facts: [['Lunghezza del blocco', bytes + ' byte'], ['Velocità di linea', rate + ' bit/s']],
      answers: [
        answer('Bit sulla linea', 'bit', bits, 0, [error(bytes * 8, 'Aggiungi start e stop a ogni carattere.')]),
        approximate('Durata', 's', duration, [error(bytes * 8 / rate, 'Nel tempo rientrano anche i bit di start e stop.')])
      ],
      steps: [
        step('Calcola i bit per carattere', 'In 8N1 si usano un bit di start e uno di stop per ogni byte.', '1 + 8 + 1 = 10 bit'),
        step('Trova i bit totali', 'Moltiplica i caratteri per i bit di ciascun carattere.', bytes + ' × 10 = ' + bits + ' bit'),
        step('Dividi per la velocità', 'Usa bit e bit/s per ottenere secondi.', bits + ' ÷ ' + rate + ' ≈ ' + round(duration) + ' s')
      ]
    };
  }

  function e1(title, slots) {
    const gross = 32 * 8 * 8000 / 1000;
    const useful = slots * 8 * 8000 / 1000;
    return {
      title,
      context: 'Una linea E1 usa 32 intervalli da 8 bit per trama e 8.000 trame al secondo. Ti assegnano solo alcuni intervalli per i dati.',
      task: 'Trova velocità lorda e velocità utile in kbit/s. Usa 1 kbit = 1.000 bit.',
      facts: [['Intervalli totali', '32'], ['Intervalli utili', String(slots)]],
      answers: [
        answer('Velocità lorda', 'kbit/s', gross, 0, [error(gross * 1000, 'Il risultato è in bit/s. Dividi per 1.000.')]),
        answer('Velocità utile', 'kbit/s', useful, 0, [error(gross, 'Usa solo gli intervalli assegnati ai dati.')])
      ],
      steps: [
        step('Velocità lorda', 'Usa tutti gli intervalli e converti in kbit/s.', '32 × 8 × 8.000 = 2.048.000 bit/s', '2.048.000 ÷ 1.000 = 2.048 kbit/s'),
        step('Velocità utile', 'Ripeti con i soli intervalli dei dati.', slots + ' × 8 × 8.000 = ' + (useful * 1000) + ' bit/s', useful + ' kbit/s')
      ]
    };
  }

  function transfer(title, nominal, percent, bytes) {
    const useful = nominal * percent / 100;
    const megabits = bytes * 8;
    const duration = megabits / useful;
    return {
      title,
      context: 'Un file attraversa il collegamento WAN a velocità utile costante. Usa le unità decimali.',
      task: 'Calcola capacità utile e tempo ideale di trasferimento.',
      facts: [['Velocità nominale', nominal + ' Mbit/s'], ['Quota utile', percent + '%'], ['Dimensione del file', bytes + ' MB']],
      answers: [
        answer('Velocità utile', 'Mbit/s', useful, 2, [error(nominal, 'Applica la quota utile alla capacità nominale.')]),
        approximate('Durata', 's', duration, [error(bytes / useful, 'Converti il file in Mbit prima di dividere.'), error(megabits / nominal, 'Dividi per la velocità utile, non per quella nominale.')])
      ],
      steps: [
        step('Calcola la capacità utile', 'Trasforma la percentuale in frazione decimale e moltiplica.', nominal + ' × ' + number(percent / 100) + ' = ' + number(useful) + ' Mbit/s'),
        step('Converti il file', 'Ogni megabyte contiene otto megabit.', bytes + ' × 8 = ' + megabits + ' Mbit'),
        step('Calcola la durata', 'Dividi la dimensione in Mbit per il flusso utile in Mbit/s.', megabits + ' ÷ ' + number(useful) + ' ≈ ' + round(duration) + ' s')
      ]
    };
  }

  function pon(title, capacity, users, extra) {
    const initial = capacity / users;
    const final = capacity / (users + extra);
    return {
      title,
      context: 'Su un ramo PON tutti gli utenti attivi scaricano e la quota utile viene divisa equamente nel modello.',
      task: 'Calcola la capacità teorica per utente prima e dopo i nuovi arrivi.',
      facts: [['Capacità utile totale', capacity + ' Mbit/s'], ['Utenti iniziali', String(users)], ['Utenti aggiunti', String(extra)]],
      answers: [
        approximate('Prima degli arrivi', 'Mbit/s', initial, [error(capacity, 'Questa è la capacità totale del ramo.')]),
        approximate('Dopo gli arrivi', 'Mbit/s', final, [error(capacity / extra, 'Somma nuovi e vecchi utenti nel divisore.')])
      ],
      steps: [
        step('Quota iniziale', 'Dividi la capacità utile per gli utenti attivi all’inizio.', capacity + ' ÷ ' + users + ' ≈ ' + round(initial) + ' Mbit/s'),
        step('Quota finale', 'Somma utenti iniziali e nuovi arrivi. Dividi la stessa capacità.', users + ' + ' + extra + ' = ' + (users + extra) + ' utenti', capacity + ' ÷ ' + (users + extra) + ' ≈ ' + round(final) + ' Mbit/s')
      ],
      conclusion: 'La quota dipende dalle ipotesi di traffico simultaneo e divisione equa.'
    };
  }

  function overhead(title, payload, header) {
    const total = payload + header;
    const share = payload / total * 100;
    return {
      title,
      context: 'Su un collegamento punto-punto la trama scolastica ha campi di servizio a lunghezza fissa. Trascura escape e bit stuffing.',
      task: 'Calcola dimensione della trama e percentuale di byte utili.',
      facts: [['Informazione', payload + ' byte'], ['Altri campi', header + ' byte']],
      answers: [
        answer('Dimensione della trama', 'byte', total, 0, [error(payload, 'Il totale comprende i campi di servizio.')]),
        approximate('Quota utile', '%', share, [error(header / total * 100, 'Questa è la percentuale dei campi di servizio.'), error(payload / total, 'Hai trovato la frazione. Moltiplicala per 100.')])
      ],
      steps: [
        step('Conta tutti i byte', 'Somma dati utili e campi di servizio.', payload + ' + ' + header + ' = ' + total + ' byte'),
        step('Calcola la percentuale', 'Dividi i byte utili per la dimensione complessiva e moltiplica per 100.', payload + ' ÷ ' + total + ' × 100 ≈ ' + round(share) + '%')
      ]
    };
  }

  function subnet(title, octet, prefix) {
    const block = 2 ** (32 - prefix);
    const start = Math.floor(octet / block) * block;
    const end = start + block - 1;
    return {
      title,
      context: 'Un apparato IPv4 appartiene a una sottorete di 192.168.10.0/24. I primi tre ottetti sono uguali in tutti gli indirizzi del caso.',
      task: 'Indica ultimo ottetto dell’indirizzo di rete e ultimo ottetto del broadcast, che chiude l’intervallo.',
      facts: [['Indirizzo con prefisso', '192.168.10.' + octet + '/' + prefix]],
      answers: [
        answer('Ultimo ottetto di rete', '0–255', start, 0, [error(octet, 'Hai scritto l’ottetto del PC. Cerca l’inizio del blocco.')]),
        answer('Ultimo ottetto di broadcast', '0–255', end, 0, [error(end + 1, 'Questo è l’inizio del blocco successivo.')])
      ],
      steps: [
        step('Trova la dimensione del blocco', 'Gli ultimi 32 − p bit variano, dove p è il prefisso.', '2^(' + 32 + ' − ' + prefix + ') = ' + block + ' indirizzi'),
        step('Trova i confini', 'Usa il multiplo del blocco più grande che non supera l’ultimo ottetto. Aggiungi la dimensione del blocco meno uno.', 'Rete: ' + start, 'Broadcast: ' + start + ' + ' + block + ' − 1 = ' + end)
      ]
    };
  }

  function reference(title, tone, lesson, equations, symbols, use) {
    return { title, tone, lesson, equations, symbols, use, lessonLabel: 'Lezione 2.' + lesson.charAt(lesson.indexOf('.html') - 1) };
  }


  function opticalLink(title, length, joins, budget) {
    const lossHundredths = length * 35 + joins * 15 + 2 * 50;
    const loss = lossHundredths / 100;
    const margin = (budget * 100 - lossHundredths) / 100;
    return {
      title,
      context: 'Una fibra monomodale collega due sedi. Il fornitore dei moduli dichiara il budget ottico a questa velocità.',
      task: 'Calcola le perdite totali e il margine disponibile.',
      facts: [['Lunghezza', length + ' km'], ['Fibra', '0,35 dB/km'],
        ['Giunti', joins + ' da 0,15 dB'], ['Connessioni', '2 da 0,5 dB'], ['Budget ottico', budget + ' dB']],
      answers: [
        answer('Perdite totali', 'dB', loss, 2, [error(length * 0.35, 'Aggiungi giunti e connessioni.')]),
        answer('Margine residuo', 'dB', margin, 2)
      ],
      steps: [
        step('Conta tutte le perdite', 'Somma fibra, giunti e connessioni.',
          length + ' × 0,35 + ' + joins + ' × 0,15 + 2 × 0,5 = ' + round(loss) + ' dB'),
        step('Confronta con il budget', 'Il margine va confrontato con la riserva di progetto. Per scegliere i moduli controlla anche portata e capacità.',
          budget + ' − ' + round(loss) + ' = ' + round(margin) + ' dB')
      ]
    };
  }

  function sensorMessage(title, measures, extra) {
    const messageBytes = 1 + 4 + measures * 2;
    const totalBits = (messageBytes + extra) * 8;
    return {
      title,
      context: 'Una centralina invia identificativo, istante della misura e un gruppo di valori in un messaggio a lunghezza fissa.',
      task: 'Calcola i bit del messaggio e quelli complessivi della trama nel modello assegnato.',
      facts: [['Identificativo', '1 byte'], ['Istante', '4 byte'],
        ['Misure', measures + ' da 2 byte'], ['Campi aggiunti dalla trama', extra + ' byte']],
      answers: [
        answer('Bit del messaggio', 'bit', messageBytes * 8, 0, [error(messageBytes, 'Converti i byte in bit.')]),
        answer('Bit complessivi di trama', 'bit', totalBits, 0, [error(messageBytes * 8, 'Conta anche i campi aggiunti dalla trama.')])
      ],
      steps: [
        step('Conta i campi utili', 'Somma prima i byte dei campi, poi moltiplica per 8.',
          '(1 + 4 + ' + measures + ' × 2) × 8 = ' + messageBytes * 8 + ' bit'),
        step('Aggiungi i campi della trama', 'Applica il formato semplificato assegnato.',
          '(' + messageBytes + ' + ' + extra + ') × 8 = ' + totalBits + ' bit')
      ]
    };
  }

  function fieldSubnet(title, gateways, growth) {
    const required = gateways + 2 + growth;
    const hostBits = Math.ceil(Math.log2(required + 2));
    const prefix = 32 - hostBits;
    const available = 2 ** hostBits - 2;
    return {
      title,
      context: 'Una LAN IPv4 deve ospitare concentratori, l’interfaccia del router, un apparato di gestione e una riserva.',
      task: 'Indica il prefisso del blocco più piccolo adeguato e quanti indirizzi utilizzabili rimangono non assegnati ora.',
      facts: [['Concentratori', String(gateways)], ['Router e gestione', '1 indirizzo ciascuno'], ['Riserva minima', growth + ' indirizzi']],
      answers: [
        answer('Prefisso, senza barra', '', prefix, 0),
        answer('Indirizzi disponibili dopo le assegnazioni attuali', '', available - gateways - 2, 0)
      ],
      steps: [
        step('Conta gli apparati e la riserva', 'Conta router e gestione oltre ai concentratori.',
          gateways + ' + 2 + ' + growth + ' = ' + required + ' indirizzi utilizzabili'),
        step('Scegli il blocco', 'Riserva indirizzo di rete e broadcast.',
          '2^' + hostBits + ' − 2 = ' + available + ' indirizzi, prefisso /' + prefix),
        step('Conta gli indirizzi ancora liberi', 'Gli indirizzi tenuti come riserva sono ancora liberi.',
          available + ' − ' + (gateways + 2) + ' = ' + (available - gateways - 2) + ' indirizzi')
      ]
    };
  }

  window.numericalExercises = {
    reference: [
      reference('Bilancio ottico', 'link', 'lezione-2-3.html#bilancio-fibra', ['Margine = budget ottico − perdite'], 'Conta fibra, giunti e connessioni.', 'Verifica anche portata e velocità utile.'),
      reference('Messaggio di misure', 'space', 'lezione-2-4.html#messaggio-sensori', ['Bit = byte × 8'], 'Distingui byte del messaggio e byte totali in trama.', 'Somma i campi separatamente.'),
      reference('Indirizzi IPv4 utilizzabili', 'time', 'lezione-2-5.html#routing-dinamico', ['Indirizzi utilizzabili = 2^(32 − p) − 2'], 'p è il prefisso di una LAN IPv4 tradizionale.', 'Conta ogni apparato IP e la riserva richiesta.'),
      reference('Seriale 8N1', 'speed', 'lezione-2-1.html#calcolo', ['B = N × 10', 't = B ÷ R'], 'N è il numero di byte, B i bit sulla linea e R la velocità in bit/s.', 'Conta start, 8 dati e stop per ogni carattere.'),
      reference('Capacità E1', 'space', 'lezione-2-2.html#capacita', ['R = n × 8 × 8.000 bit/s', '1 kbit/s = 1.000 bit/s'], 'n è il numero di intervalli per trama usati nel calcolo.', 'Usa 32 intervalli per il lordo e gli intervalli assegnati per la quota utile.'),
      reference('Velocità utile e tempo', 'time', 'lezione-2-2.html#capacita', ['Rᵤ = Rₙ × η', 'D = MB × 8', 't = D ÷ Rᵤ'], 'η è la quota utile fra 0 e 1. D si misura in Mbit, Rᵤ e Rₙ in Mbit/s.', 'Stima il tempo quando la velocità utile è costante.'),
      reference('Condivisione PON', 'link', 'lezione-2-3.html#condivisione', ['Quota = Rᵤ ÷ n'], 'Rᵤ è la capacità utile del ramo e n il numero di utenti attivi.', 'Usa il rapporto nel modello in parti uguali.'),
      reference('Efficienza di trama', 'space', 'lezione-2-4.html#overhead', ['Totale = U + H', 'Quota utile = U ÷ (U + H) × 100'], 'U indica i byte di informazione e H i byte degli altri campi.', 'Calcola la percentuale quando il formato di trama è dato.'),
      reference('Blocchi IPv4', 'time', 'lezione-2-5.html#prefissi', ['Dimensione = 2^(32 − p)', 'Fine del blocco = inizio + dimensione − 1'], 'p è il prefisso. Per /25–/30 i blocchi ricadono tutti nell’ultimo ottetto.', 'Trova inizio e fine del blocco della sottorete.')
    ],
    types: [
      { title: 'Fibra fra due sedi · perdite e margine', tone: 'link', exercises: [
        opticalLink('Sede del Parco', 6, 2, 12), opticalLink('Sede del Mulino', 8, 3, 10)
      ] },
      { title: 'Sensori · bit utili e bit in trama', tone: 'space', exercises: [
        sensorMessage('Misure del frutteto', 2, 7), sensorMessage('Misure della serra', 4, 8)
      ] },
      { title: 'LAN dei concentratori · prefisso e riserva', tone: 'time', exercises: [
        fieldSubnet('Concentratori del campo Nord', 13, 5), fieldSubnet('Concentratori di tre serre', 26, 6)
      ] },
      { title: 'Seriale 8N1 · bit e durata', tone: 'speed', exercises: [
        serial('Console di Aurora',480,9600), serial('Rapporto di Brina',288,4800), serial('Avvio apparato',1152,19200),
        serial('Profilo di collaudo',576,9600), serial('Stato delle porte',1440,28800), serial('Esportazione eventi',768,19200),
        serial('Controllo sensori',192,2400), serial('Registro di manutenzione',960,38400), serial('Configurazione breve',672,9600), serial('Log di avviamento',2304,57600)
      ] },
      { title: 'E1 · lordo e quota utile', tone: 'space', exercises: [
        e1('Archivio di sede',30),e1('Sede stagionale',24),e1('Ponte sul fiume',16),e1('Linea di riserva',12),
        e1('Invio anagrafiche di prova',8),e1('Banco del tecnico',4),e1('Raccolta misure',10),e1('Sistema di controllo',20),
        e1('Centro di smistamento',28),e1('Diagnostica in orario ridotto',6)
      ] },
      { title: 'Trasferimento su WAN · velocità e tempo', tone: 'time', exercises: [
        transfer('Catalogo ricambi',20,80,40),transfer('Fotografie del magazzino',80,75,150),transfer('Copia del progetto',60,65,96),
        transfer('Aggiornamento del gestionale',32,55,28),transfer('Backup della filiale',100,70,525),transfer('Modelli di lavorazione',45,80,72),
        transfer('Filmati di collaudo',150,84,360),transfer('Archivio degli schemi',25,60,48),transfer('Rapporto di produzione',10,90,18),transfer('Dati del punto vendita',64,75,93)
      ] },
      { title: 'Ramo PON · quota per utente', tone: 'link', exercises: [
        pon('Ramo di via del Lago',2400,8,8),pon('Viale dei Tigli',1600,5,3),pon('Centro civico',9000,9,6),
        pon('Isolato Est',2200,11,5),pon('Palazzina Verde',800,4,3),pon('Residence Alba',1800,6,4),
        pon('Zona universitaria',7200,12,6),pon('Corte dei Gelsi',960,3,2),pon('Area industriale',4800,8,4),pon('Piazza della Torre',2250,9,3)
      ] },
      { title: 'Trama · dimensione e percentuale utile', tone: 'space', exercises: [
        overhead('Messaggio di stato',100,8),overhead('Campione periodico',72,8),overhead('Pacchetto di log',256,8),
        overhead('Lettura del sensore',48,6),overhead('Rapporto esteso',400,10),overhead('Dati dal registratore',960,12),
        overhead('Conferma dell’operatore',60,4),overhead('Stato dell’officina',125,7),overhead('Tavola di collaudo',512,8),overhead('Test di linea',84,12)
      ] },
      { title: 'IPv4 · rete e broadcast', tone: 'time', exercises: [
        subnet('Ufficio Alba',77,26),subnet('Magazzino Brina',130,26),subnet('Laboratorio Cedro',225,27),
        subnet('Aula Delta',113,28),subnet('Officina Elio',150,29),subnet('Sede Faro',99,25),
        subnet('Deposito Ginestra',213,30),subnet('Centro Iride',54,27),subnet('Banco Mirto',174,28),subnet('Sala Nube',202,25)
      ] }
    ]
  };
})();
