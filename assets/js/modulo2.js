(() => {
  const missions = {
    seriale: [
      {
        title: 'Identifica l’apparato di linea',
        situation: 'Il router inoltra i dati sulla porta seriale. A valle un modem li adatta al circuito.',
        options: ['Router · DCE', 'Modem · DCE', 'Cavo · DCE'], correct: 1,
        reason: 'Il modem svolge il ruolo di DCE sul tratto. Il router è il DTE.',
        hint: 'Cerca un apparato che trasforma i dati in un segnale adatto alla linea.'
      },
      {
        title: 'Ripristina il ritmo',
        situation: 'Su un tratto seriale sincrono il DTE riceve dati ma non riesce a campionarli al momento giusto.',
        options: ['Controlla il clock del DCE', 'Modifica la maschera IP', 'Controlla il bit di stop 8N1'], correct: 0,
        reason: 'In questo schema il clock del DCE dà al DTE il riferimento temporale.',
        hint: 'Il problema riguarda il momento in cui vengono letti i bit sulla porta sincrona.'
      },
      {
        title: 'Autorizza l’invio',
        situation: 'Il terminale ha alzato RTS. Il modem è ora pronto a ricevere.',
        options: ['Attiva DCD', 'Attiva DTR', 'Attiva CTS'], correct: 2,
        reason: 'Con CTS il modem risponde alla richiesta di invio del terminale.',
        hint: 'Nel dialogo richiesto dalla prova il segnale deve rispondere direttamente a RTS.'
      }
    ],
    coda: [
      {
        title: 'Scegli il tipo di accesso',
        situation: 'La sede Aurora deve scambiare dati tutto il giorno su un servizio punto-punto pronto all’uso.',
        options: ['Chiamata solo alle 18', 'Accesso dedicato', 'Autenticazione PPP'], correct: 1,
        reason: 'Un accesso dedicato è predisposto in permanenza per le due sedi.',
        hint: 'La richiesta riguarda quando le sedi possono usare il collegamento.'
      },
      {
        title: 'Fai partire il primo pacchetto',
        situation: 'Arrivano A, B e C, in ordine, su un nodo vuoto. L’uscita invia un pacchetto per turno. Che cosa resta dopo il primo turno?',
        options: ['B e C', 'A e C', 'C soltanto'], correct: 0,
        reason: 'A parte per primo. B e C restano nella coda in ordine di arrivo.',
        hint: 'Il pacchetto arrivato per primo lascia la coda. Gli altri aspettano.'
      },
      {
        title: 'Evita lo scarto',
        situation: 'All’inizio del turno aspettano B e C. Prima dell’invio arrivano D ed E. Il buffer può contenere tre pacchetti e si scarta quello arrivato quando è pieno.',
        options: ['Partono C e D, E resta', 'B parte e non si scarta nulla', 'E viene scartato, poi parte B'], correct: 2,
        reason: 'D occupa l’ultimo posto. E trova il buffer pieno. Poi l’uscita spedisce B.',
        hint: 'Applica prima tutti gli arrivi, poi l’unica partenza. B e C occupano già due posti.'
      }
    ],
    accesso: [
      {
        title: 'Firma il collaudo di casa Alba',
        situation: 'La fibra si ferma all’armadio e alla presa di casa arriva un doppino.',
        options: ['ADSL da centrale', 'FTTC', 'FTTH'], correct: 1,
        reason: 'In FTTC la fibra arriva all’armadio e il rame copre il tratto finale.',
        hint: 'Segna il punto preciso in cui finisce la fibra lungo il percorso.'
      },
      {
        title: 'Controlla il ramo ottico',
        situation: 'Un elemento di rete divide otticamente il segnale in più fibre senza corrente.',
        options: ['Splitter', 'ONT', 'OLT'], correct: 0,
        reason: 'Lo splitter realizza la diramazione passiva. OLT e ONT sono alimentati.',
        hint: 'Cerca l’elemento passivo fra l’apparato di centrale e il terminale di casa.'
      },
      {
        title: 'Isola la tratta lenta',
        situation: 'A casa Brina c’è FTTH. Un solo portatile è lento quando usa il Wi-Fi.',
        options: ['Misura soltanto la distanza dalla centrale', 'Cambia il profilo della PON', 'Ripeti il test via Ethernet al router'], correct: 2,
        reason: 'Il confronto via Ethernet permette di escludere il collegamento radio del portatile nella seconda misura.',
        hint: 'Scegli la prova che cambia il mezzo del tratto domestico e lascia identico l’accesso.'
      }
    ],
    ppp: [
      {
        title: 'Trova il campo decisivo',
        situation: 'La trama arriva completa, ma il ricevitore rileva che alcuni dati sono cambiati durante la trasmissione.',
        options: ['Flag di apertura', 'FCS', 'Campo Protocol'], correct: 1,
        reason: 'L’FCS permette di rilevare errori confrontando il valore calcolato con quello ricevuto.',
        hint: 'Il ricevitore deve avere un valore che può calcolare di nuovo e confrontare.'
      },
      {
        title: 'Completa la sequenza PPP',
        situation: 'LCP è riuscito. La configurazione prevede CHAP. Che cosa succede adesso?',
        options: ['Il peer risponde alla sfida di autenticazione', 'Inizia subito l’invio di IPv4', 'L’FCS cifra la trama'], correct: 0,
        reason: 'Con CHAP il peer risponde alla sfida. La configurazione di rete viene dopo.',
        hint: 'Fra apertura della linea e configurazione di rete può esserci un controllo di identità.'
      },
      {
        title: 'Riattiva IPv4',
        situation: 'Il collegamento PPP è aperto, CHAP ha avuto successo, ma il traffico IPv4 è fermo.',
        options: ['Bit di start', 'DCD', 'IPCP'], correct: 2,
        reason: 'IPCP è la configurazione del protocollo IPv4 nella sequenza PPP.',
        hint: 'Cerca la fase NCP dedicata alla rete IPv4.'
      }
    ],
    routing: [
      {
        title: 'Consegna in sede',
        situation: 'Il router ha la LAN 192.168.10.0/24 direttamente collegata. Destinazione 192.168.10.42.',
        options: ['WAN A', 'Porta LAN, consegna diretta', 'WAN B'], correct: 1,
        reason: 'Il /24 locale corrisponde e il router può consegnare direttamente sulla porta LAN.',
        hint: 'Confronta i primi tre ottetti della destinazione con quelli della rete connessa.'
      },
      {
        title: 'Scegli tra due corrispondenze',
        situation: 'Destinazione 10.20.30.8. Corrispondono 10.20.0.0/16 e 10.20.30.0/24.',
        options: ['10.20.30.0/24', '10.20.0.0/16', 'Solo 0.0.0.0/0'], correct: 0,
        reason: 'Il /24 ha più bit significativi del /16. È la rotta più specifica fra quelle compatibili.',
        hint: 'Contano i bit del prefisso. Entrambe le righe possono descrivere la destinazione.'
      },
      {
        title: 'Spedisci fuori dall’elenco',
        situation: 'Destinazione 203.0.113.8. Nessun prefisso specifico coincide. La rotta predefinita è attiva.',
        options: ['Scarto immediato', 'Porta LAN', '0.0.0.0/0'], correct: 2,
        reason: 'Il prefisso /0 corrisponde a qualsiasi indirizzo. Si usa quando manca una corrispondenza più lunga.',
        hint: 'Resta una riga di riserva che non impone alcun bit iniziale.'
      }
    ]
  };

  function startMission(panel, levels) {
    let stage = 0;
    let firstTry = 0;
    let retries = 0;
    let solved = false;

    function render(focus = true) {
      const level = levels[stage];
      const progress = levels.map((step, idx) => {
        const active = idx === stage;
        const complete = idx < stage;
        return '<li class="' + (active ? 'is-current' : complete ? 'is-complete' : '') + '"' +
          (active ? ' aria-current="step"' : '') + '>Prova ' + (idx + 1) + (complete ? ' · superata' : '') + '</li>';
      }).join('');
      panel.innerHTML = '<ol class="wan-missions" aria-label="Avanzamento della missione">' + progress + '</ol>';
      if (!level) {
        panel.insertAdjacentHTML('beforeend', '<h3 tabindex="-1">Missione completata</h3><p>Hai risolto tutte le prove. Al primo tentativo: <strong>' +
          firstTry + '/' + levels.length + '</strong>.</p><button type="button" class="btn btn-ghost">Rigioca</button>');
        panel.querySelector('button').addEventListener('click', () => {
          stage = 0;
          firstTry = 0;
          render();
        });
      } else {
        retries = 0;
        solved = false;
        const options = level.options.map((label, idx) =>
          '<label><input type="radio" name="decisione" value="' + idx + '"><span>' + label + '</span></label>').join('');
        panel.insertAdjacentHTML('beforeend', '<h3 tabindex="-1">' + level.title + '</h3><p>' + level.situation +
          '</p><form><fieldset><legend>La tua scelta</legend><div class="wan-choices">' + options +
          '</div></fieldset><div class="wan-demo-actions"><button class="btn btn-primary">Conferma</button>' +
          '<button type="button" class="btn btn-primary" data-next hidden>' +
          (stage + 1 === levels.length ? 'Vedi risultato' : 'Prossima prova') +
          '</button></div><p class="wan-feedback" role="status"></p></form>');
        const form = panel.querySelector('form');
        const feedback = form.querySelector('[role="status"]');
        const next = form.querySelector('[data-next]');
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (solved) return;
          const answer = new FormData(form).get('decisione');
          if (answer === null) {
            feedback.textContent = 'Seleziona prima una risposta.';
            form.querySelector('input').focus();
            return;
          }
          if (Number(answer) !== level.correct) {
            retries++;
            feedback.dataset.result = 'retry';
            feedback.textContent = 'Riprova. ' + level.hint;
            return;
          }
          solved = true;
          if (retries === 0) firstTry++;
          feedback.dataset.result = 'success';
          feedback.textContent = 'Prova superata. ' + level.reason;
          form.querySelector('fieldset').disabled = true;
          form.querySelector('button:not([data-next])').hidden = true;
          next.hidden = false;
          next.focus();
        });
        next.addEventListener('click', () => {
          if (!solved) return;
          stage++;
          render();
        });
      }
      if (focus) panel.querySelector('h3').focus();
    }
    render(false);
  }

  function parseIPv4(text) {
    const octets = text.trim().split('.');
    if (octets.length !== 4 || octets.some(value => !/^(0|[1-9]\d{0,2})$/.test(value) || Number(value) > 255)) return null;
    return octets.reduce((ip, value) => ip * 256 + Number(value), 0);
  }

  function initQueue(model) {
    const status = model.querySelector('[data-queue-status]');
    const waiting = model.querySelector('[data-queue-list]');
    const departed = model.querySelector('[data-queue-departed]');
    const dropped = model.querySelector('[data-queue-dropped]');
    const capacity = 3;
    let queue = [];
    let serial = 0;
    let countDropped = 0;
    let turn = 0;

    function display(container, ids) {
      if (!ids.length) {
        container.textContent = '—';
        return;
      }
      container.replaceChildren(...ids.map(id => {
        const packet = document.createElement('span');
        packet.append('P' + id);
        return packet;
      }));
    }

    function runTurn(arrivals) {
      turn++;
      const losses = [];
      for (let i = 0; i < arrivals; i++) {
        const packet = ++serial;
        if (queue.length < capacity) queue.push(packet);
        else losses.push('P' + packet);
      }
      const sent = queue.shift();
      countDropped += losses.length;
      display(waiting, queue);
      display(departed, sent === undefined ? [] : [sent]);
      dropped.textContent = countDropped;
      status.textContent = 'Turno ' + turn + '. ' + (sent === undefined ? 'Nessuna partenza.' : 'Parte P' + sent + '.') +
        (losses.length ? ' Scartati per buffer pieno: ' + losses.join(', ') + '.' : '') +
        ' In coda: ' + queue.length + '.';
    }

    for (const button of model.querySelectorAll('[data-arrivals]')) {
      button.addEventListener('click', () => runTurn(Number(button.dataset.arrivals)));
    }
    function reset() {
      queue = [];
      countDropped = serial = turn = 0;
      display(waiting, []);
      display(departed, []);
      dropped.textContent = '0';
      status.textContent = 'Coda vuota. Scegli il primo turno.';
    }
    model.querySelector('[data-queue-reset]').addEventListener('click', reset);
    reset();
  }

  function initStuffing(model) {
    const form = model.querySelector('form');
    const input = form.querySelector('input');
    const output = model.querySelector('output');
    const status = model.querySelector('[role="status"]');

    function show() {
      const bits = input.value.trim();
      output.replaceChildren();
      if (!/^[01]{1,18}$/.test(bits)) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = 'Scrivi da 1 a 18 cifre binarie. Usa solo 0 e 1.';
        return;
      }
      input.removeAttribute('aria-invalid');
      let consecutive = 0;
      const encoded = [];
      const added = [];
      for (const bit of bits) {
        encoded.push(bit);
        consecutive = bit === '1' ? consecutive + 1 : 0;
        if (consecutive === 5) {
          encoded.push('0');
          added.push(encoded.length);
          consecutive = 0;
        }
      }
      output.replaceChildren(...encoded.map((bit, i) => {
        const cell = document.createElement(added.includes(i + 1) ? 'mark' : 'span');
        cell.textContent = bit;
        return cell;
      }));
      status.textContent = added.length ? 'Sequenza ' + encoded.join('') +
        '. Posizioni degli zeri aggiunti: ' + added.join(', ') + '.' : 'Sequenza ' + bits + '. Nessuno zero aggiunto.';
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      show();
    });
    show();
  }

  function initRouting(lab) {
    const form = lab.querySelector('form');
    const destination = form.querySelector('#wan-destination');
    const defaultRoute = form.querySelector('#wan-default-route');
    const message = lab.querySelector('[role="status"]');
    const outcomes = lab.querySelectorAll('.wan-route-outcome dd');
    const routes = [...lab.querySelectorAll('tbody tr')].map(row => {
      const [network, prefix] = row.cells[0].textContent.split('/');
      const blockSize = 2 ** (32 - Number(prefix));
      return { row, prefix: Number(prefix), blockSize, network: parseIPv4(network) };
    });

    function evaluate() {
      const ip = parseIPv4(destination.value);
      destination.setAttribute('aria-invalid', String(ip === null));
      destination.setCustomValidity(ip === null ? 'Scrivi quattro numeri da 0 a 255 separati da punti.' : '');
      const matches = ip === null ? [] : routes.filter(route =>
        (route.prefix > 0 || defaultRoute.checked) && Math.floor(ip / route.blockSize) * route.blockSize === route.network);
      const winner = matches.reduce((best, route) => best === null || route.prefix > best.prefix ? route : best, null);
      for (const route of routes) {
        const active = route.prefix > 0 || defaultRoute.checked;
        const compatible = matches.includes(route);
        route.row.classList.toggle('wan-route-match', compatible);
        route.row.classList.toggle('wan-route-winner', route === winner);
        route.row.cells[3].textContent = !active ? 'Disattivata' : ip === null ? '—' :
          route === winner ? 'Scelta' : compatible ? 'Compatibile' : 'Esclusa';
      }
      const values = winner ? [...winner.row.cells].slice(0, 3).map(cell => cell.textContent) : ['—', '—', '—'];
      outcomes.forEach((cell, index) => { cell.textContent = values[index]; });
      if (ip === null) {
        message.textContent = 'Indirizzo IPv4 non valido. Usa quattro numeri da 0 a 255, per esempio 10.20.30.8.';
      } else if (!winner) {
        message.textContent = 'Nessun prefisso coincide. Il router scarta il pacchetto.';
      } else if (winner.prefix === 0) {
        message.textContent = 'Nessuna rotta più specifica. Il pacchetto usa la rotta predefinita.';
      } else {
        message.textContent = 'Prefisso /' + winner.prefix + ' scelto. Rotte compatibili: ' + matches.length +
          '. Vince la corrispondenza più lunga.';
      }
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      evaluate();
    });
    defaultRoute.addEventListener('change', evaluate);
    for (const preset of form.querySelectorAll('[data-wan-ip]')) {
      preset.addEventListener('click', () => {
        destination.value = preset.dataset.wanIp;
        evaluate();
      });
    }
    evaluate();
  }

  for (const panel of document.querySelectorAll('[data-wan-demo]')) {
    startMission(panel, missions[panel.dataset.wanDemo]);
  }
  const lab = document.querySelector('[data-wan-lab]');
  if (lab) initRouting(lab);
  const queueModel = document.querySelector('[data-wan-queue]');
  if (queueModel) initQueue(queueModel);
  const stuffing = document.querySelector('[data-wan-stuffing]');
  if (stuffing) initStuffing(stuffing);

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-wan-reveal]');
    if (!button) return;
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    answer.hidden = !answer.hidden;
    button.setAttribute('aria-expanded', String(!answer.hidden));
    button.textContent = answer.hidden ? 'Mostra soluzione' : 'Nascondi soluzione';
  });

  let presentationVideo = null;
  document.addEventListener('play', (event) => {
    if (event.target instanceof HTMLVideoElement && event.target.closest('.lim-presenter')) presentationVideo = event.target;
  }, true);
  window.addEventListener('resize', () => {
    if (presentationVideo && (!presentationVideo.isConnected || !presentationVideo.closest('.active-slide'))) {
      presentationVideo.pause();
      presentationVideo = null;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.target instanceof HTMLVideoElement && [' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.stopPropagation();
    }
  }, true);
})();
