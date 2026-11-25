const domandeAllenamento = [
  // Lezione 2.1 · Dalla rete locale al canale fisico
  {
    "prompt": "Il router consegna i dati al modem. Quale apparato fa da DCE?",
    "source": {
      "href": "lezione-2-1.html#ruoli",
      "label": "Ripassa: Dal file al segnale"
    },
    "options": [
      {
        "text": "Il modem",
        "correct": true,
        "explanation": "Adatta il segnale alla linea."
      },
      {
        "text": "Il router",
        "explanation": "Consegna i dati come DTE."
      },
      {
        "text": "Il PC",
        "explanation": "Produce il file sulla LAN."
      },
      {
        "text": "Il cavo",
        "explanation": "È il mezzo passivo."
      }
    ]
  },
  {
    "prompt": "Dove si decide se un apparato è DTE o DCE?",
    "source": {
      "href": "lezione-2-1.html#ruoli",
      "label": "Ripassa: Dal file al segnale"
    },
    "options": [
      {
        "text": "Sulla specifica interfaccia",
        "correct": true,
        "explanation": "I ruoli dipendono dal tratto osservato."
      },
      {
        "text": "Nel nome dell’apparato",
        "explanation": "Un router può svolgere più ruoli."
      },
      {
        "text": "Nell’indirizzo IP",
        "explanation": "Identifica un’interfaccia di rete ma non il ruolo seriale."
      },
      {
        "text": "Nella lunghezza del cavo",
        "explanation": "La distanza non assegna le funzioni."
      }
    ]
  },
  {
    "prompt": "Che cosa fa il modem B a fine tratta?",
    "source": {
      "href": "lezione-2-1.html#ruoli",
      "label": "Ripassa: Dal file al segnale"
    },
    "options": [
      {
        "text": "Recupera i dati e li consegna al router B",
        "correct": true,
        "explanation": "Opera come DCE anche in ricezione."
      },
      {
        "text": "Crea il file della sede A",
        "explanation": "Il file parte dal PC A."
      },
      {
        "text": "Instrada il pacchetto nella LAN B",
        "explanation": "Lo fa il router B."
      },
      {
        "text": "Fornisce l’indirizzo IP finale",
        "explanation": "Questa funzione non deriva dal ruolo DCE."
      }
    ]
  },
  {
    "prompt": "Dal punto di vista del DTE, dove entrano i dati?",
    "source": {
      "href": "lezione-2-1.html#clock",
      "label": "Ripassa: Chi scandisce il tempo?"
    },
    "options": [
      {
        "text": "RXD",
        "correct": true,
        "explanation": "È il segnale di ricezione."
      },
      {
        "text": "TXD",
        "explanation": "Porta i dati in uscita."
      },
      {
        "text": "RTS",
        "explanation": "È una richiesta di trasmissione."
      },
      {
        "text": "DCD",
        "explanation": "Indica portante rilevata."
      }
    ]
  },
  {
    "prompt": "Sul tratto sincrono del caso manca il riferimento temporale. Che cosa cerchi?",
    "source": {
      "href": "lezione-2-1.html#clock",
      "label": "Ripassa: Chi scandisce il tempo?"
    },
    "options": [
      {
        "text": "Il clock dal DCE",
        "correct": true,
        "explanation": "Scandisce il tempo sul tratto considerato."
      },
      {
        "text": "Il bit di stop 8N1",
        "explanation": "Appartiene al formato asincrono dell’esempio."
      },
      {
        "text": "La maschera IP",
        "explanation": "Riguarda indirizzamento e routing."
      },
      {
        "text": "Il segnale DCD",
        "explanation": "Informa sulla portante, non sul tempo di campionamento."
      }
    ]
  },
  {
    "prompt": "Quale accordo serve per la console asincrona?",
    "source": {
      "href": "lezione-2-1.html#clock",
      "label": "Ripassa: Chi scandisce il tempo?"
    },
    "options": [
      {
        "text": "Stessa velocità e stesso formato",
        "correct": true,
        "explanation": "Il ricevitore si allinea sullo start e interpreta i bit secondo l’accordo."
      },
      {
        "text": "Solo stessa velocità",
        "explanation": "Anche numero di bit, parità e stop contano."
      },
      {
        "text": "Solo stessa parità",
        "explanation": "La velocità determina i tempi di campionamento."
      },
      {
        "text": "Solo stesso clock esterno",
        "explanation": "Il formato dell’esempio usa start e stop."
      }
    ]
  },
  {
    "prompt": "Il terminale ha attivato RTS. Che cosa attende nel collegamento descritto?",
    "source": {
      "href": "lezione-2-1.html#controllo",
      "label": "Ripassa: Il dialogo prima dell’invio"
    },
    "options": [
      {
        "text": "CTS",
        "correct": true,
        "explanation": "È il permesso di inviare restituito dal DCE."
      },
      {
        "text": "DSR",
        "explanation": "Indica che il DCE è pronto."
      },
      {
        "text": "DTR",
        "explanation": "Indica che il DTE è pronto."
      },
      {
        "text": "RXD",
        "explanation": "Trasporta dati in ricezione."
      }
    ]
  },
  {
    "prompt": "Quale segnale indica che il modem ha rilevato la portante remota?",
    "source": {
      "href": "lezione-2-1.html#controllo",
      "label": "Ripassa: Il dialogo prima dell’invio"
    },
    "options": [
      {
        "text": "DCD",
        "correct": true,
        "explanation": "È il segnale dedicato alla portante."
      },
      {
        "text": "RTS",
        "explanation": "Chiede di trasmettere."
      },
      {
        "text": "CTS",
        "explanation": "Consente al DTE di inviare."
      },
      {
        "text": "TXD",
        "explanation": "Porta i dati dal DTE."
      }
    ]
  },
  {
    "prompt": "Come si distinguono DTR e DSR?",
    "source": {
      "href": "lezione-2-1.html#controllo",
      "label": "Ripassa: Il dialogo prima dell’invio"
    },
    "options": [
      {
        "text": "DTR segnala il terminale pronto, DSR l’apparato di linea pronto",
        "correct": true,
        "explanation": "I due segnali si riferiscono ad apparati diversi."
      },
      {
        "text": "DTR segnala l’apparato di linea, DSR il terminale",
        "explanation": "Hai invertito i ruoli."
      },
      {
        "text": "DTR e DSR portano i dati",
        "explanation": "Per i dati si usano TXD e RXD."
      },
      {
        "text": "DTR e DSR sono clock",
        "explanation": "Sono segnali di stato."
      }
    ]
  },
  {
    "prompt": "Quale funzione svolge il null modem tra due terminali?",
    "source": {
      "href": "lezione-2-1.html#interfacce",
      "label": "Ripassa: RS-232, V.35 e cavo null modem"
    },
    "options": [
      {
        "text": "Incrocia i dati in trasmissione e ricezione",
        "correct": true,
        "explanation": "Il TX di ogni lato raggiunge l’RX dell’altro."
      },
      {
        "text": "Unisce TX a TX",
        "explanation": "Entrambi i segnali partirebbero da un trasmettitore."
      },
      {
        "text": "Unisce RX a RX",
        "explanation": "Nessun dato sarebbe pilotato da un TX."
      },
      {
        "text": "Converte rame in fibra",
        "explanation": "Il cavo svolge un adattamento di cablaggio."
      }
    ]
  },
  {
    "prompt": "Dove si incontra V.35 negli esempi del modulo?",
    "source": {
      "href": "lezione-2-1.html#interfacce",
      "label": "Ripassa: RS-232, V.35 e cavo null modem"
    },
    "options": [
      {
        "text": "In un tratto WAN seriale sincrono",
        "correct": true,
        "explanation": "È un esempio storico fra router e apparato di linea."
      },
      {
        "text": "Tra ONT e router Ethernet",
        "explanation": "L’interfaccia lì è Ethernet."
      },
      {
        "text": "Nella portante radio Wi-Fi",
        "explanation": "V.35 riguarda un collegamento via cavo."
      },
      {
        "text": "Nella diramazione di una PON",
        "explanation": "La PON usa un percorso ottico."
      }
    ]
  },
  {
    "prompt": "Quanti bit sulla linea occupano 240 byte in formato 8N1?",
    "source": {
      "href": "lezione-2-1.html#calcolo",
      "label": "Ripassa: Dal bit al carattere"
    },
    "options": [
      {
        "text": "2.400 bit",
        "correct": true,
        "explanation": "240 × (1 + 8 + 1) dà 2.400."
      },
      {
        "text": "1.920 bit",
        "explanation": "240 × 8 conta solo il carico utile."
      },
      {
        "text": "2.160 bit",
        "explanation": "240 × 9 omette uno fra start e stop."
      },
      {
        "text": "2.640 bit",
        "explanation": "240 × 11 aggiunge un bit che 8N1 non prevede."
      }
    ]
  },
  {
    "prompt": "Quanto dura l’invio di 960 byte a 9.600 bit/s in 8N1 senza pause?",
    "source": {
      "href": "lezione-2-1.html#calcolo",
      "label": "Ripassa: Dal bit al carattere"
    },
    "options": [
      {
        "text": "1 s",
        "correct": true,
        "explanation": "960 × 10 = 9.600 bit e la linea li invia in un secondo."
      },
      {
        "text": "0,8 s",
        "explanation": "Questo tempo conta solo gli 8 bit di dati per carattere."
      },
      {
        "text": "0,1 s",
        "explanation": "Divide i byte per una capacità espressa in bit al secondo."
      },
      {
        "text": "10 s",
        "explanation": "Conta dieci volte i bit effettivi."
      }
    ]
  },
  {
    "prompt": "Qual è la velocità utile di una console 8N1 a 19.200 bit/s?",
    "source": {
      "href": "lezione-2-1.html#calcolo",
      "label": "Ripassa: Dal bit al carattere"
    },
    "options": [
      {
        "text": "15.360 bit/s",
        "correct": true,
        "explanation": "La quota utile è 8/10 della velocità di linea."
      },
      {
        "text": "19.200 bit/s",
        "explanation": "È la velocità lorda con i bit di servizio."
      },
      {
        "text": "17.280 bit/s",
        "explanation": "Applica 9/10 e conta un bit di servizio come utile."
      },
      {
        "text": "1.920 bit/s",
        "explanation": "È il numero di caratteri al secondo, non di bit utili."
      }
    ]
  },
  // Lezione 2.2 · Accesso remoto e interconnessione WAN
  {
    "prompt": "Quale tratto collega il router della sede alla rete dell’operatore?",
    "source": {
      "href": "lezione-2-2.html#percorso",
      "label": "Ripassa: Una rete fra due sedi"
    },
    "options": [
      {
        "text": "L’accesso",
        "correct": true,
        "explanation": "È il collegamento d’ingresso alla WAN."
      },
      {
        "text": "La LAN interna",
        "explanation": "Collega le postazioni dentro la sede."
      },
      {
        "text": "La tratta d’accesso remota",
        "explanation": "È il collegamento verso l’altra sede."
      },
      {
        "text": "Il gateway della sede remota",
        "explanation": "È un apparato sul lato opposto."
      }
    ]
  },
  {
    "prompt": "Porta d’accesso veloce, uscita centrale lenta. Dove si forma la coda?",
    "source": {
      "href": "lezione-2-2.html#percorso",
      "label": "Ripassa: Una rete fra due sedi"
    },
    "options": [
      {
        "text": "Prima dell’uscita lenta",
        "correct": true,
        "explanation": "Gli arrivi possono superare la capacità di quella uscita."
      },
      {
        "text": "Sempre nel PC sorgente",
        "explanation": "La coda può nascere nei nodi intermedi."
      },
      {
        "text": "Solo alla LAN remota",
        "explanation": "Si accoda dove domanda e capacità divergono."
      },
      {
        "text": "Nel mezzo di trasmissione",
        "explanation": "I pacchetti in attesa stanno in memoria."
      }
    ]
  },
  {
    "prompt": "Due distaccamenti scambiano dati su un servizio privato dell’operatore. Come classifichi l’insieme?",
    "source": {
      "href": "lezione-2-2.html#percorso",
      "label": "Ripassa: Una rete fra due sedi"
    },
    "options": [
      {
        "text": "WAN privata",
        "correct": true,
        "explanation": "Collega reti di sedi distanti con un servizio riservato."
      },
      {
        "text": "Una sola LAN",
        "explanation": "Le LAN sono i singoli segmenti locali dell’esempio."
      },
      {
        "text": "Una console seriale",
        "explanation": "È un’interfaccia, non il servizio geografico."
      },
      {
        "text": "Internet pubblico",
        "explanation": "Il servizio descritto è privato."
      }
    ]
  },
  {
    "prompt": "Quale caso rappresenta un accesso commutato storico?",
    "source": {
      "href": "lezione-2-2.html#accessi",
      "label": "Ripassa: Commutato o dedicato?"
    },
    "options": [
      {
        "text": "La filiale chiama un modem ogni sera",
        "correct": true,
        "explanation": "Ogni chiamata instaura l’accesso su richiesta."
      },
      {
        "text": "Una linea punto-punto già predisposta",
        "explanation": "È un accesso dedicato."
      },
      {
        "text": "Una rete ATM con circuito virtuale",
        "explanation": "Descrive l’inoltro nella rete, non quando si attiva l’accesso."
      },
      {
        "text": "Una coda che cresce a sera",
        "explanation": "Descrive la condivisione delle risorse."
      }
    ]
  },
  {
    "prompt": "Che cosa caratterizza il CDN dell’esempio?",
    "source": {
      "href": "lezione-2-2.html#accessi",
      "label": "Ripassa: Commutato o dedicato?"
    },
    "options": [
      {
        "text": "Collegamento punto-punto dedicato",
        "correct": true,
        "explanation": "È predisposto in modo permanente."
      },
      {
        "text": "Chiamata modem a richiesta",
        "explanation": "È il caso dell’accesso commutato."
      },
      {
        "text": "Accesso riservato solo durante un download",
        "explanation": "Il CDN dell’esempio resta disponibile fra un invio e l’altro."
      },
      {
        "text": "Rete di celle ATM",
        "explanation": "ATM descrive un’altra tecnologia."
      }
    ]
  },
  {
    "prompt": "Una chiamata a circuito è in pausa. Che accade alla risorsa?",
    "source": {
      "href": "lezione-2-2.html#commutazione",
      "label": "Ripassa: Il viaggio dei dati dentro la WAN"
    },
    "options": [
      {
        "text": "Resta riservata",
        "correct": true,
        "explanation": "Vale per la durata della chiamata."
      },
      {
        "text": "Si libera a ogni silenzio",
        "explanation": "Il circuito mantiene la prenotazione."
      },
      {
        "text": "Si divide automaticamente tra pacchetti",
        "explanation": "La situazione descritta è un circuito."
      },
      {
        "text": "Finisce nel buffer",
        "explanation": "La risorsa è capacità riservata, non un pacchetto."
      }
    ]
  },
  {
    "prompt": "Un nodo parte vuoto. Arrivano tre pacchetti e l’uscita serve uno per turno dopo gli arrivi. Quanti restano?",
    "source": {
      "href": "lezione-2-2.html#commutazione",
      "label": "Ripassa: Il viaggio dei dati dentro la WAN"
    },
    "options": [
      {
        "text": "Due",
        "correct": true,
        "explanation": "Tre arrivi meno una partenza danno due."
      },
      {
        "text": "Uno",
        "explanation": "Hai contato la partenza e non la coda."
      },
      {
        "text": "Tre",
        "explanation": "Hai contato gli arrivi senza la partenza."
      },
      {
        "text": "Zero",
        "explanation": "Una sola partenza non smaltisce il gruppo."
      }
    ]
  },
  {
    "prompt": "Una sede ha accesso permanente a una rete IP condivisa. Quale descrizione è corretta?",
    "source": {
      "href": "lezione-2-2.html#commutazione",
      "label": "Ripassa: Il viaggio dei dati dentro la WAN"
    },
    "options": [
      {
        "text": "Accesso permanente, inoltro a pacchetti",
        "correct": true,
        "explanation": "Sono due proprietà distinte."
      },
      {
        "text": "Accesso commutato, inoltro a circuiti",
        "explanation": "La sede entra stabilmente e la rete smista pacchetti."
      },
      {
        "text": "Accesso permanente, capacità tutta riservata",
        "explanation": "Un accesso stabile può terminare su risorse condivise."
      },
      {
        "text": "Inoltro a pacchetti, accesso sempre su chiamata",
        "explanation": "Il modello a pacchetti non determina la modalità di accesso."
      }
    ]
  },
  {
    "prompt": "Quale tecnologia usa celle di lunghezza fissa?",
    "source": {
      "href": "lezione-2-2.html#tecnologie",
      "label": "Ripassa: Quattro tappe delle WAN"
    },
    "options": [
      {
        "text": "ATM",
        "correct": true,
        "explanation": "Ogni cella ha 53 byte complessivi."
      },
      {
        "text": "Frame Relay",
        "explanation": "Usa trame di lunghezza variabile."
      },
      {
        "text": "MPLS",
        "explanation": "Inoltra in base a etichette."
      },
      {
        "text": "X.25",
        "explanation": "Usa pacchetti su circuiti virtuali."
      }
    ]
  },
  {
    "prompt": "Quale tecnologia riconosci dall’inoltro a etichette?",
    "source": {
      "href": "lezione-2-2.html#tecnologie",
      "label": "Ripassa: Quattro tappe delle WAN"
    },
    "options": [
      {
        "text": "MPLS",
        "correct": true,
        "explanation": "Usa etichette per decidere l’inoltro."
      },
      {
        "text": "ATM",
        "explanation": "È descritto qui per l’uso di celle fisse."
      },
      {
        "text": "Frame Relay",
        "explanation": "È descritto qui per trame variabili su circuiti virtuali."
      },
      {
        "text": "X.25",
        "explanation": "Prevede controlli adatti a linee con errori."
      }
    ]
  },
  {
    "prompt": "Che cosa significa circuito virtuale?",
    "source": {
      "href": "lezione-2-2.html#tecnologie",
      "label": "Ripassa: Quattro tappe delle WAN"
    },
    "options": [
      {
        "text": "Percorso logico su infrastruttura che può essere condivisa",
        "correct": true,
        "explanation": "La stessa linea può trasportare più percorsi logici."
      },
      {
        "text": "Un filo fisico esclusivo",
        "explanation": "Descrive una risorsa dedicata."
      },
      {
        "text": "Una successione di indirizzi Wi-Fi",
        "explanation": "Riguarda un altro ambito."
      },
      {
        "text": "Una chiamata vocale sempre attiva",
        "explanation": "Il concetto si applica a collegamenti logici dati."
      }
    ]
  },
  {
    "prompt": "Quanto vale la capacità lorda E1 con 32 × 8 × 8.000?",
    "source": {
      "href": "lezione-2-2.html#capacita",
      "label": "Ripassa: Capacità lorda e tempo utile"
    },
    "options": [
      {
        "text": "2.048.000 bit/s",
        "correct": true,
        "explanation": "Moltiplica intervalli, bit per intervallo e trame al secondo."
      },
      {
        "text": "1.920.000 bit/s",
        "explanation": "Usa 30 intervalli invece di 32."
      },
      {
        "text": "256.000 bit/s",
        "explanation": "Trascura gli 8 bit per intervallo."
      },
      {
        "text": "2.048 bit/s",
        "explanation": "Confonde kbit/s con bit/s."
      }
    ]
  },
  {
    "prompt": "Una linea da 50 Mbit/s lascia ai file il 60%. Che velocità utile hai?",
    "source": {
      "href": "lezione-2-2.html#capacita",
      "label": "Ripassa: Capacità lorda e tempo utile"
    },
    "options": [
      {
        "text": "30 Mbit/s",
        "correct": true,
        "explanation": "50 × 0,60 restituisce 30."
      },
      {
        "text": "50 Mbit/s",
        "explanation": "È il dato nominale prima della riduzione."
      },
      {
        "text": "20 Mbit/s",
        "explanation": "È la parte restante, il 40%."
      },
      {
        "text": "83,33 Mbit/s",
        "explanation": "Hai diviso per la quota invece di moltiplicare."
      }
    ]
  },
  {
    "prompt": "Quanto tempo impiegano 60 MB a 24 Mbit/s utili costanti?",
    "source": {
      "href": "lezione-2-2.html#capacita",
      "label": "Ripassa: Capacità lorda e tempo utile"
    },
    "options": [
      {
        "text": "20 s",
        "correct": true,
        "explanation": "60 × 8 ÷ 24 dà 20."
      },
      {
        "text": "2,5 s",
        "explanation": "Divide MB per Mbit/s senza convertire."
      },
      {
        "text": "24 s",
        "explanation": "Scambia velocità e tempo."
      },
      {
        "text": "60 s",
        "explanation": "La dimensione da sola non determina il tempo."
      }
    ]
  },
  // Lezione 2.3 · Accesso in rame e in fibra
  {
    "prompt": "Dall’armadio alla presa arrivano due fili in rame. A monte dell’armadio c’è fibra. Quale accesso descrive?",
    "source": {
      "href": "lezione-2-3.html#percorsi",
      "label": "Ripassa: Tre indirizzi, tre percorsi"
    },
    "options": [
      {
        "text": "FTTC",
        "correct": true,
        "explanation": "La fibra termina all’armadio."
      },
      {
        "text": "FTTH",
        "explanation": "Richiede fibra fino al punto terminale in casa."
      },
      {
        "text": "ADSL da centrale",
        "explanation": "Il doppino partirebbe dalla centrale."
      },
      {
        "text": "PON fino a casa",
        "explanation": "Il tratto finale descritto è in rame."
      }
    ]
  },
  {
    "prompt": "Che cosa identifica l’FTTH in una casa con router Wi-Fi?",
    "source": {
      "href": "lezione-2-3.html#percorsi",
      "label": "Ripassa: Tre indirizzi, tre percorsi"
    },
    "options": [
      {
        "text": "Fibra fino alla presa ottica",
        "correct": true,
        "explanation": "È il mezzo della tratta di accesso."
      },
      {
        "text": "Presenza del Wi-Fi",
        "explanation": "Vale per diversi tipi di accesso."
      },
      {
        "text": "Cavo Ethernet fra router e PC",
        "explanation": "Riguarda la rete interna."
      },
      {
        "text": "Presenza di un armadio stradale",
        "explanation": "Da sola non svela dove finisce la fibra."
      }
    ]
  },
  {
    "prompt": "Che mezzo usa l’accesso ADSL da centrale?",
    "source": {
      "href": "lezione-2-3.html#percorsi",
      "label": "Ripassa: Tre indirizzi, tre percorsi"
    },
    "options": [
      {
        "text": "Doppino fino al modem",
        "correct": true,
        "explanation": "La tratta di accesso descritta usa rame."
      },
      {
        "text": "Fibra fino al modem",
        "explanation": "Il modem ADSL opera sul doppino."
      },
      {
        "text": "Fibra fino all’armadio e VDSL2 a casa",
        "explanation": "Descrive FTTC."
      },
      {
        "text": "Radio fino alla presa",
        "explanation": "ADSL è un accesso cablato."
      }
    ]
  },
  {
    "prompt": "Perché ADSL è chiamata asimmetrica?",
    "source": {
      "href": "lezione-2-3.html#rame",
      "label": "Ripassa: Perché sul rame la distanza conta"
    },
    "options": [
      {
        "text": "Capacità maggiore verso l’utente",
        "correct": true,
        "explanation": "Download e upload hanno capacità diverse."
      },
      {
        "text": "Lunghezza del cavo diversa per verso",
        "explanation": "I due versi usano lo stesso doppino."
      },
      {
        "text": "È monodirezionale",
        "explanation": "ADSL supporta anche l’upload."
      },
      {
        "text": "La voce si ascolta solo in download",
        "explanation": "L’asimmetria riguarda la capacità dati."
      }
    ]
  },
  {
    "prompt": "A parità di condizioni, che effetto ha un doppino più lungo?",
    "source": {
      "href": "lezione-2-3.html#rame",
      "label": "Ripassa: Perché sul rame la distanza conta"
    },
    "options": [
      {
        "text": "Il segnale si attenua di più",
        "correct": true,
        "explanation": "L’attenuazione cresce lungo il tratto."
      },
      {
        "text": "Il segnale si amplifica da solo",
        "explanation": "Il cavo introduce perdita."
      },
      {
        "text": "La tratta diventa ottica",
        "explanation": "Il mezzo resta lo stesso."
      },
      {
        "text": "La diafonia scompare",
        "explanation": "La lunghezza non elimina i disturbi fra coppie."
      }
    ]
  },
  {
    "prompt": "Su che problema interviene il vectoring?",
    "source": {
      "href": "lezione-2-3.html#rame",
      "label": "Ripassa: Perché sul rame la distanza conta"
    },
    "options": [
      {
        "text": "Diafonia tra linee VDSL2 compatibili",
        "correct": true,
        "explanation": "Coordina le linee per ridurre interferenze reciproche."
      },
      {
        "text": "Ogni attenuazione del doppino",
        "explanation": "La distanza continua a introdurre perdita."
      },
      {
        "text": "La condivisione del ramo PON",
        "explanation": "Vectoring qui riguarda il rame."
      },
      {
        "text": "La copertura del Wi-Fi domestico",
        "explanation": "Agisce sulle linee di accesso xDSL."
      }
    ]
  },
  {
    "prompt": "Quale elemento della PON è passivo?",
    "source": {
      "href": "lezione-2-3.html#pon",
      "label": "Ripassa: Una fibra a monte, più abitazioni"
    },
    "options": [
      {
        "text": "Splitter ottico",
        "correct": true,
        "explanation": "Distribuisce il segnale senza alimentazione."
      },
      {
        "text": "OLT",
        "explanation": "È un apparato attivo di centrale."
      },
      {
        "text": "ONT",
        "explanation": "È un terminale alimentato presso l’utente."
      },
      {
        "text": "Router domestico",
        "explanation": "Serve alimentazione per elaborare dati."
      }
    ]
  },
  {
    "prompt": "Dove si trova l’ONT?",
    "source": {
      "href": "lezione-2-3.html#pon",
      "label": "Ripassa: Una fibra a monte, più abitazioni"
    },
    "options": [
      {
        "text": "Presso l’abitazione",
        "correct": true,
        "explanation": "Termina l’accesso ottico lato utente."
      },
      {
        "text": "Nel tratto di rame in casa",
        "explanation": "È un terminale ottico."
      },
      {
        "text": "Sempre nello splitter",
        "explanation": "Sono elementi distinti."
      },
      {
        "text": "Nella centrale dell’operatore",
        "explanation": "L’apparato ottico di centrale è l’OLT."
      }
    ]
  },
  {
    "prompt": "Quale profilo è nominalmente simmetrico a circa 10 Gbit/s?",
    "source": {
      "href": "lezione-2-3.html#pon",
      "label": "Ripassa: Una fibra a monte, più abitazioni"
    },
    "options": [
      {
        "text": "XGS-PON",
        "correct": true,
        "explanation": "Prevede circa 10 Gbit/s in entrambe le direzioni."
      },
      {
        "text": "Profilo GPON comune",
        "explanation": "Ha circa 2,5 in discesa e 1,25 in salita."
      },
      {
        "text": "ADSL",
        "explanation": "È asimmetrica e usa il doppino."
      },
      {
        "text": "VDSL2 su FTTC",
        "explanation": "Il tratto finale usa rame."
      }
    ]
  },
  {
    "prompt": "L’ONT è collegato via Ethernet al router. Che cosa deduci sulla tratta prima della presa ottica?",
    "source": {
      "href": "lezione-2-3.html#diagnosi",
      "label": "Ripassa: Leggi un impianto dall’ingresso"
    },
    "options": [
      {
        "text": "Rimane FTTH",
        "correct": true,
        "explanation": "L’Ethernet arriva dopo il terminale ottico."
      },
      {
        "text": "Diventa FTTC",
        "explanation": "Servirebbe rame dall’armadio fino a casa."
      },
      {
        "text": "Diventa ADSL",
        "explanation": "L’Ethernet interno non è il doppino di accesso ADSL."
      },
      {
        "text": "La presa diventa passiva e senza fibra",
        "explanation": "Il cavo a valle non cambia la presa."
      }
    ]
  },
  {
    "prompt": "In FTTH un solo portatile Wi-Fi è lento. Quale confronto fai per primo?",
    "source": {
      "href": "lezione-2-3.html#diagnosi",
      "label": "Ripassa: Leggi un impianto dall’ingresso"
    },
    "options": [
      {
        "text": "Una prova via Ethernet al router",
        "correct": true,
        "explanation": "Aiuta a distinguere tratto locale e accesso."
      },
      {
        "text": "Misuri soltanto i metri fra centrale e casa",
        "explanation": "La misura non isola il Wi-Fi."
      },
      {
        "text": "Classifichi l’accesso come ADSL",
        "explanation": "La lentezza non identifica il mezzo."
      },
      {
        "text": "Sostituisci lo splitter dalla casa",
        "explanation": "Lo splitter della PON è nell’infrastruttura ottica."
      }
    ]
  },
  {
    "prompt": "Un doppino da centrale passa in un armadio passivo. A casa c’è un modem ADSL. Quale accesso è?",
    "source": {
      "href": "lezione-2-3.html#diagnosi",
      "label": "Ripassa: Leggi un impianto dall’ingresso"
    },
    "options": [
      {
        "text": "ADSL da centrale",
        "correct": true,
        "explanation": "L’armadio non riceve fibra per rilanciare il segnale in VDSL2."
      },
      {
        "text": "FTTC",
        "explanation": "La sola presenza dell’armadio non testimonia fibra e conversione."
      },
      {
        "text": "FTTH",
        "explanation": "La fibra non raggiunge casa nel caso descritto."
      },
      {
        "text": "XGS-PON",
        "explanation": "Mancano tratta e apparati ottici."
      }
    ]
  },
  {
    "prompt": "In un modello equo, sei utenti dividono 2.400 Mbit/s utili. Quanto spetta a ciascuno?",
    "source": {
      "href": "lezione-2-3.html#condivisione",
      "label": "Ripassa: Quanto spetta a ciascuno?"
    },
    "options": [
      {
        "text": "400 Mbit/s",
        "correct": true,
        "explanation": "2.400 diviso 6 dà 400."
      },
      {
        "text": "2.400 Mbit/s",
        "explanation": "È la capacità totale condivisa."
      },
      {
        "text": "384 Mbit/s",
        "explanation": "Il problema non chiede di sottrarre altri costi."
      },
      {
        "text": "14.400 Mbit/s",
        "explanation": "La capacità va divisa, non moltiplicata."
      }
    ]
  },
  {
    "prompt": "Nel modello equo gli utenti attivi passano da 8 a 16. Che succede alla quota individuale?",
    "source": {
      "href": "lezione-2-3.html#condivisione",
      "label": "Ripassa: Quanto spetta a ciascuno?"
    },
    "options": [
      {
        "text": "Si dimezza",
        "correct": true,
        "explanation": "La capacità totale è la stessa e il divisore raddoppia."
      },
      {
        "text": "Raddoppia",
        "explanation": "Il raddoppio riguarda il numero degli utenti."
      },
      {
        "text": "Resta uguale",
        "explanation": "La quota dipende dal numero di utenti simultanei nel modello."
      },
      {
        "text": "Si azzera",
        "explanation": "La capacità continua a essere distribuita."
      }
    ]
  },
  // Lezione 2.4 · Protocolli di linea
  {
    "prompt": "Quale campo marca il confine della trama HDLC?",
    "source": {
      "href": "lezione-2-4.html#trama",
      "label": "Ripassa: Dai bit alla trama"
    },
    "options": [
      {
        "text": "Flag",
        "correct": true,
        "explanation": "Delimita la sequenza trasmessa."
      },
      {
        "text": "FCS",
        "explanation": "Serve a riconoscere errori."
      },
      {
        "text": "Informazione",
        "explanation": "Contiene i dati utili quando presenti."
      },
      {
        "text": "Controllo",
        "explanation": "Interpreta il tipo di trama a seconda della modalità."
      }
    ]
  },
  {
    "prompt": "Il ricevitore ricalcola l’FCS e il confronto fallisce. Che cosa fa?",
    "source": {
      "href": "lezione-2-4.html#trama",
      "label": "Ripassa: Dai bit alla trama"
    },
    "options": [
      {
        "text": "Scarta la trama",
        "correct": true,
        "explanation": "Ha rilevato un errore e l’FCS da solo non lo ripara."
      },
      {
        "text": "Corregge sempre tutti i bit",
        "explanation": "La rilevazione non fornisce in generale una correzione."
      },
      {
        "text": "Passa comunque il contenuto a IP",
        "explanation": "La verifica fallita fa scartare la trama."
      },
      {
        "text": "Negozia un nuovo IP",
        "explanation": "L’FCS non configura IPv4."
      }
    ]
  },
  {
    "prompt": "Cosa significa incapsulare un pacchetto per la linea?",
    "source": {
      "href": "lezione-2-4.html#trama",
      "label": "Ripassa: Dai bit alla trama"
    },
    "options": [
      {
        "text": "Inserirlo come contenuto di una trama",
        "correct": true,
        "explanation": "La trama aggiunge informazioni del collegamento."
      },
      {
        "text": "Assegnargli necessariamente un nuovo IP",
        "explanation": "Gli indirizzi IP non dipendono dall’incapsulamento."
      },
      {
        "text": "Sostituirlo con l’FCS",
        "explanation": "L’FCS completa la trama, non sostituisce i dati."
      },
      {
        "text": "Dividere sempre i byte in celle ATM",
        "explanation": "HDLC e PPP non richiedono celle ATM."
      }
    ]
  },
  {
    "prompt": "Dopo quanti uno consecutivi si inserisce lo zero nel bit stuffing descritto?",
    "source": {
      "href": "lezione-2-4.html#hdlc",
      "label": "Ripassa: Che cosa succede se il flag appare nei dati?"
    },
    "options": [
      {
        "text": "Cinque",
        "correct": true,
        "explanation": "Lo zero spezza la corsa prima che imiti il flag."
      },
      {
        "text": "Quattro",
        "explanation": "È troppo presto rispetto alla regola descritta."
      },
      {
        "text": "Sei",
        "explanation": "Il flag contiene già sei uno consecutivi."
      },
      {
        "text": "Otto",
        "explanation": "Otto è la lunghezza del flag intero, non la soglia."
      }
    ]
  },
  {
    "prompt": "Quale forma assume il contenuto 01111110 dopo il bit stuffing?",
    "source": {
      "href": "lezione-2-4.html#hdlc",
      "label": "Ripassa: Che cosa succede se il flag appare nei dati?"
    },
    "options": [
      {
        "text": "011111010",
        "correct": true,
        "explanation": "Lo zero entra dopo il quinto uno."
      },
      {
        "text": "01111110",
        "explanation": "Lascia invariata la sequenza che imita il flag."
      },
      {
        "text": "011110110",
        "explanation": "Lo zero entra troppo presto, dopo quattro uno."
      },
      {
        "text": "001111110",
        "explanation": "Lo zero entra prima della sequenza di uno."
      }
    ]
  },
  {
    "prompt": "Quale ordine segue una sessione PPP con autenticazione richiesta?",
    "source": {
      "href": "lezione-2-4.html#ppp",
      "label": "Ripassa: Come parte una sessione PPP"
    },
    "options": [
      {
        "text": "LCP, autenticazione, NCP",
        "correct": true,
        "explanation": "LCP concorda le opzioni, poi si verifica il peer e si configura la rete."
      },
      {
        "text": "NCP, LCP, autenticazione",
        "explanation": "La rete si configura dopo che la linea è pronta."
      },
      {
        "text": "Autenticazione, NCP, LCP",
        "explanation": "LCP apre il collegamento e negozia le opzioni."
      },
      {
        "text": "LCP, NCP, autenticazione",
        "explanation": "L’identità richiesta si verifica prima di NCP."
      }
    ]
  },
  {
    "prompt": "A che cosa serve il campo Protocol quando PPP trasporta un pacchetto?",
    "source": {
      "href": "lezione-2-4.html#ppp",
      "label": "Ripassa: Come parte una sessione PPP"
    },
    "options": [
      {
        "text": "Identifica il tipo di contenuto",
        "correct": true,
        "explanation": "Il ricevitore sa quale protocollo interpretare."
      },
      {
        "text": "Verifica errori nella trama",
        "explanation": "È il compito dell’FCS."
      },
      {
        "text": "Misura il clock fisico",
        "explanation": "Il clock appartiene al collegamento fisico."
      },
      {
        "text": "Indica il router successivo",
        "explanation": "La decisione di inoltro IP usa la destinazione e la tabella."
      }
    ]
  },
  {
    "prompt": "Quale componente PPP configura IPv4?",
    "source": {
      "href": "lezione-2-4.html#ppp",
      "label": "Ripassa: Come parte una sessione PPP"
    },
    "options": [
      {
        "text": "IPCP",
        "correct": true,
        "explanation": "È l’NCP dedicato a IPv4."
      },
      {
        "text": "LCP",
        "explanation": "Configura e verifica il collegamento."
      },
      {
        "text": "FCS",
        "explanation": "Verifica gli errori della trama."
      },
      {
        "text": "CHAP",
        "explanation": "Verifica l’identità del peer."
      }
    ]
  },
  {
    "prompt": "Che cosa caratterizza CHAP nell’esempio?",
    "source": {
      "href": "lezione-2-4.html#autenticazione",
      "label": "Ripassa: Identità, errori e riservatezza"
    },
    "options": [
      {
        "text": "Sfida e risposta calcolata",
        "correct": true,
        "explanation": "La risposta dipende dal segreto senza inviarlo direttamente."
      },
      {
        "text": "Invio diretto della password",
        "explanation": "Questa è la caratteristica di PAP sul link."
      },
      {
        "text": "Cifratura automatica dei pacchetti",
        "explanation": "La sfida riguarda l’autenticazione."
      },
      {
        "text": "Calcolo dell’FCS",
        "explanation": "Serve a rilevare errori della trama, non a identificare il peer."
      }
    ]
  },
  {
    "prompt": "LCP è aperto. L’identità viene respinta. Quale fase controlli?",
    "source": {
      "href": "lezione-2-4.html#autenticazione",
      "label": "Ripassa: Identità, errori e riservatezza"
    },
    "options": [
      {
        "text": "Autenticazione",
        "correct": true,
        "explanation": "È la prima fase indicata come fallita."
      },
      {
        "text": "IPCP",
        "explanation": "Arriverebbe dopo il controllo dell’identità."
      },
      {
        "text": "Clock per primo",
        "explanation": "LCP è già riuscito nel caso descritto."
      },
      {
        "text": "Indirizzo del server",
        "explanation": "Il traffico IP non è ancora pronto."
      }
    ]
  },
  {
    "prompt": "La sessione PPP autentica il peer. Che cosa puoi concludere sulla riservatezza dei dati?",
    "source": {
      "href": "lezione-2-4.html#autenticazione",
      "label": "Ripassa: Identità, errori e riservatezza"
    },
    "options": [
      {
        "text": "Serve un meccanismo di cifratura distinto",
        "correct": true,
        "explanation": "L’identità e la riservatezza sono proprietà diverse."
      },
      {
        "text": "I dati sono automaticamente segreti",
        "explanation": "Autenticarsi non implica cifrare."
      },
      {
        "text": "L’FCS rende i dati segreti",
        "explanation": "L’FCS rileva errori di trasmissione."
      },
      {
        "text": "LCP cifra qualsiasi contenuto",
        "explanation": "LCP configura il link."
      }
    ]
  },
  {
    "prompt": "Una trama ha 72 byte utili e 8 byte di altri campi. Qual è la quota utile?",
    "source": {
      "href": "lezione-2-4.html#overhead",
      "label": "Ripassa: Quanti byte portano informazione?"
    },
    "options": [
      {
        "text": "90%",
        "correct": true,
        "explanation": "72 diviso 80 dà 0,90."
      },
      {
        "text": "72%",
        "explanation": "72 è il numero dei byte utili, non la percentuale."
      },
      {
        "text": "10%",
        "explanation": "È la percentuale degli altri campi."
      },
      {
        "text": "80%",
        "explanation": "80 è la dimensione totale in byte."
      }
    ]
  },
  {
    "prompt": "A parità di 8 byte di altri campi, raddoppia il carico utile. Come cambia la quota utile?",
    "source": {
      "href": "lezione-2-4.html#overhead",
      "label": "Ripassa: Quanti byte portano informazione?"
    },
    "options": [
      {
        "text": "Aumenta",
        "correct": true,
        "explanation": "Gli 8 byte incidono su un totale maggiore."
      },
      {
        "text": "Raddoppia sempre",
        "explanation": "Il rapporto non scala linearmente così."
      },
      {
        "text": "Resta uguale",
        "explanation": "Il totale cresce mentre gli altri campi restano fissi."
      },
      {
        "text": "Diminuisce",
        "explanation": "Con un carico maggiore diminuisce la quota degli altri campi."
      }
    ]
  },
  {
    "prompt": "Con 100 byte utili e 8 di altri campi, quanti byte occupano 5 trame nel modello?",
    "source": {
      "href": "lezione-2-4.html#overhead",
      "label": "Ripassa: Quanti byte portano informazione?"
    },
    "options": [
      {
        "text": "540 byte",
        "correct": true,
        "explanation": "Ogni trama occupa 108 byte e se ne inviano cinque."
      },
      {
        "text": "508 byte",
        "explanation": "Conteggia gli 8 byte di costo una sola volta."
      },
      {
        "text": "500 byte",
        "explanation": "Conteggia solo i dati utili."
      },
      {
        "text": "580 byte",
        "explanation": "Attribuisce 16 byte di costo a ogni trama."
      }
    ]
  },
  // Lezione 2.5 · Primo routing
  {
    "prompt": "PC 192.168.10.21/24, destinazione 192.168.10.40. A chi consegna la trama?",
    "source": {
      "href": "lezione-2-5.html#host",
      "label": "Ripassa: Prima decisione: il destinatario è vicino?"
    },
    "options": [
      {
        "text": "Al destinatario locale",
        "correct": true,
        "explanation": "Entrambi appartengono alla stessa rete /24."
      },
      {
        "text": "Al gateway predefinito",
        "explanation": "Serve per raggiungere un’altra rete."
      },
      {
        "text": "Al server dell’operatore",
        "explanation": "La consegna è interna alla LAN."
      },
      {
        "text": "Al modem di una sede remota",
        "explanation": "Il destinatario è nel segmento locale."
      }
    ]
  },
  {
    "prompt": "Il PC invia a 10.20.30.8 usando il gateway 192.168.10.1. Qual è la destinazione IP del pacchetto?",
    "source": {
      "href": "lezione-2-5.html#host",
      "label": "Ripassa: Prima decisione: il destinatario è vicino?"
    },
    "options": [
      {
        "text": "10.20.30.8",
        "correct": true,
        "explanation": "Il gateway è il destinatario del primo tratto, mentre l’IP identifica il destinatario finale."
      },
      {
        "text": "192.168.10.1",
        "explanation": "È il prossimo salto del PC, non il destinatario IP finale."
      },
      {
        "text": "192.168.10.21",
        "explanation": "È l’IP del PC sorgente."
      },
      {
        "text": "0.0.0.0",
        "explanation": "È l’indirizzo usato per scrivere il prefisso predefinito."
      }
    ]
  },
  {
    "prompt": "Per trasmettere un pacchetto su Ethernet a un vicino della LAN, che cosa fa ARP?",
    "source": {
      "href": "lezione-2-5.html#host",
      "label": "Ripassa: Prima decisione: il destinatario è vicino?"
    },
    "options": [
      {
        "text": "Trova il suo indirizzo fisico a partire dall’IPv4",
        "correct": true,
        "explanation": "Serve a costruire la trama del tratto locale."
      },
      {
        "text": "Seleziona il prefisso più lungo",
        "explanation": "La scelta della rotta avviene nella tabella di inoltro."
      },
      {
        "text": "Modifica il TTL",
        "explanation": "Lo fa il router durante l’inoltro."
      },
      {
        "text": "Configura il collegamento PPP",
        "explanation": "È un compito del protocollo di linea."
      }
    ]
  },
  {
    "prompt": "Quale riga della tabella 2.5 indica una rete direttamente collegata?",
    "source": {
      "href": "lezione-2-5.html#tabella",
      "label": "Ripassa: Leggi la tabella del router"
    },
    "options": [
      {
        "text": "192.168.10.0/24 via LAN",
        "correct": true,
        "explanation": "Si usa la porta LAN senza un router intermedio."
      },
      {
        "text": "10.20.0.0/16 via WAN A",
        "explanation": "Indica 172.16.0.2 come prossimo salto."
      },
      {
        "text": "10.20.30.0/24 via WAN B",
        "explanation": "Indica 172.16.1.2 come prossimo salto."
      },
      {
        "text": "0.0.0.0/0 via WAN A",
        "explanation": "È la predefinita tramite un vicino."
      }
    ]
  },
  {
    "prompt": "Che cosa indica la colonna prossimo salto di una rotta remota?",
    "source": {
      "href": "lezione-2-5.html#tabella",
      "label": "Ripassa: Leggi la tabella del router"
    },
    "options": [
      {
        "text": "L’indirizzo del router vicino",
        "correct": true,
        "explanation": "È il punto a cui consegnare nel tratto successivo."
      },
      {
        "text": "L’IP del destinatario finale",
        "explanation": "Quello è nel pacchetto."
      },
      {
        "text": "Il numero di bit di rete",
        "explanation": "È la lunghezza del prefisso."
      },
      {
        "text": "Il nome della porta fisica",
        "explanation": "È indicato nella colonna uscita."
      }
    ]
  },
  {
    "prompt": "A quali destinazioni corrisponde 0.0.0.0/0?",
    "source": {
      "href": "lezione-2-5.html#tabella",
      "label": "Ripassa: Leggi la tabella del router"
    },
    "options": [
      {
        "text": "Tutte le destinazioni IPv4",
        "correct": true,
        "explanation": "Con zero bit significativi ogni indirizzo corrisponde."
      },
      {
        "text": "Solo 0.0.0.0",
        "explanation": "Questa sarebbe una corrispondenza esatta /32."
      },
      {
        "text": "Solo le reti LAN",
        "explanation": "Il prefisso /0 non distingue indirizzi locali e remoti."
      },
      {
        "text": "Solo gli indirizzi con un ottetto a zero",
        "explanation": "/0 non impone valori a nessun ottetto."
      }
    ]
  },
  {
    "prompt": "Per 10.20.30.8 coincidono /16, /24 e /0. Quale scegli?",
    "source": {
      "href": "lezione-2-5.html#prefissi",
      "label": "Ripassa: Confronta i prefissi, poi scegli"
    },
    "options": [
      {
        "text": "10.20.30.0/24",
        "correct": true,
        "explanation": "Ha più bit significativi fra le rotte compatibili."
      },
      {
        "text": "10.20.0.0/16",
        "explanation": "È compatibile ma meno specifica."
      },
      {
        "text": "0.0.0.0/0",
        "explanation": "È la meno specifica."
      },
      {
        "text": "Nessuna",
        "explanation": "Tre corrispondenze si risolvono con il prefisso più lungo."
      }
    ]
  },
  {
    "prompt": "Quale rotta della tabella 2.5 vince per 10.20.80.8?",
    "source": {
      "href": "lezione-2-5.html#prefissi",
      "label": "Ripassa: Confronta i prefissi, poi scegli"
    },
    "options": [
      {
        "text": "10.20.0.0/16",
        "correct": true,
        "explanation": "Il /24 richiede 30 come terzo ottetto e il /16 è più lungo di /0."
      },
      {
        "text": "10.20.30.0/24",
        "explanation": "I primi 24 bit non coincidono."
      },
      {
        "text": "192.168.10.0/24",
        "explanation": "I primi bit non coincidono."
      },
      {
        "text": "0.0.0.0/0",
        "explanation": "Coincide ma il /16 è più specifico."
      }
    ]
  },
  {
    "prompt": "Qual è il prefisso di rete di 192.168.10.130/26?",
    "source": {
      "href": "lezione-2-5.html#prefissi",
      "label": "Ripassa: Confronta i prefissi, poi scegli"
    },
    "options": [
      {
        "text": "192.168.10.128/26",
        "correct": true,
        "explanation": "130 cade nel blocco 128–191."
      },
      {
        "text": "192.168.10.0/26",
        "explanation": "Copre 0–63."
      },
      {
        "text": "192.168.10.64/26",
        "explanation": "Copre 64–127."
      },
      {
        "text": "192.168.10.192/26",
        "explanation": "Copre 192–255."
      }
    ]
  },
  {
    "prompt": "Il TTL scade mentre il pacchetto è sul router. Che cosa succede?",
    "source": {
      "href": "lezione-2-5.html#inoltro",
      "label": "Ripassa: Un salto alla volta"
    },
    "options": [
      {
        "text": "Il router scarta il pacchetto",
        "correct": true,
        "explanation": "Il limite impedisce al pacchetto di continuare a circolare."
      },
      {
        "text": "Il router ripristina sempre il TTL",
        "explanation": "Annullerebbe il limite di salti."
      },
      {
        "text": "Il router usa comunque la predefinita",
        "explanation": "Una rotta non annulla la scadenza del TTL."
      },
      {
        "text": "Il router trasforma il pacchetto in frame relay",
        "explanation": "Il cambio di trama non riattiva un pacchetto scaduto."
      }
    ]
  },
  {
    "prompt": "Che cosa ricostruisce il router per il collegamento in uscita?",
    "source": {
      "href": "lezione-2-5.html#inoltro",
      "label": "Ripassa: Un salto alla volta"
    },
    "options": [
      {
        "text": "La trama del tratto successivo",
        "correct": true,
        "explanation": "Il pacchetto viene ri-incapsulato per il nuovo collegamento."
      },
      {
        "text": "La destinazione IP come indirizzo del router vicino",
        "explanation": "Senza traduzioni, l’IP finale resta quello del destinatario."
      },
      {
        "text": "Il file intero prima di inviare",
        "explanation": "Il router inoltra pacchetti."
      },
      {
        "text": "L’intera connessione applicativa",
        "explanation": "Il forwarding riguarda i singoli pacchetti."
      }
    ]
  },
  {
    "prompt": "Che cosa distingue una rotta statica da una dinamica?",
    "source": {
      "href": "lezione-2-5.html#rotte",
      "label": "Ripassa: Come arrivano le rotte nella tabella?"
    },
    "options": [
      {
        "text": "La statica è configurata, la dinamica è appresa tramite un protocollo",
        "correct": true,
        "explanation": "La differenza riguarda l’origine della rotta."
      },
      {
        "text": "La statica ha sempre prefisso più lungo",
        "explanation": "La lunghezza non dipende dall’origine."
      },
      {
        "text": "La dinamica è sempre direttamente collegata",
        "explanation": "Può indicare una rete remota."
      },
      {
        "text": "La statica è sempre la predefinita",
        "explanation": "Si può configurare per un prefisso specifico."
      }
    ]
  },
  {
    "prompt": "Disattivi la predefinita e nessun altro prefisso corrisponde. Come agisce il router?",
    "source": {
      "href": "lezione-2-5.html#rotte",
      "label": "Ripassa: Come arrivano le rotte nella tabella?"
    },
    "options": [
      {
        "text": "Scarta il pacchetto",
        "correct": true,
        "explanation": "Non ha un’uscita applicabile."
      },
      {
        "text": "Sceglie la prima rotta",
        "explanation": "La posizione non rende compatibile un prefisso."
      },
      {
        "text": "Sceglie il prefisso più lungo in assoluto",
        "explanation": "Deve prima verificare la corrispondenza."
      },
      {
        "text": "Invia il pacchetto su tutte le porte",
        "explanation": "La tabella non indica una rotta per quel pacchetto."
      }
    ]
  },
  {
    "prompt": "Quando compare la rotta direttamente collegata dell’esempio?",
    "source": {
      "href": "lezione-2-5.html#rotte",
      "label": "Ripassa: Come arrivano le rotte nella tabella?"
    },
    "options": [
      {
        "text": "Quando l’interfaccia ha indirizzo e maschera ed è operativa",
        "correct": true,
        "explanation": "Il prefisso è dedotto dalla configurazione locale."
      },
      {
        "text": "Quando un altro router la annuncia via OSPF",
        "explanation": "Questa sarebbe una rotta appresa."
      },
      {
        "text": "Quando si imposta una predefinita",
        "explanation": "La predefinita è una riga separata."
      },
      {
        "text": "Quando un PC trasmette il primo file",
        "explanation": "L’arrivo di un file non crea la rete connessa."
      }
    ]
  },
  // Preparazione alla seconda prova
  {
    prompt: "Il budget ottico è 12 dB e le perdite stimate sono 3,4 dB. Qual è il margine?",
    source: { href: "lezione-2-3.html#bilancio-fibra", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "8,6 dB", correct: true, explanation: "Sottrai le perdite dal budget." },
      { text: "15,4 dB", explanation: "Le perdite consumano budget." },
      { text: "3,4 dB", explanation: "Questo è il valore delle perdite." },
      { text: "12 dB", explanation: "Questo è il budget prima delle perdite." }
    ]
  },
  {
    prompt: "La potenza ricevuta rientra nei limiti, ma gli apparati garantiscono 0,6 Gbit/s utili e ne servono 0,8. Qual è l’esito?",
    source: { href: "lezione-2-3.html#bilancio-fibra", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "La soluzione va rivista per la velocità utile.", correct: true, explanation: "Servono sia un livello ottico valido sia capacità sufficiente." },
      { text: "La soluzione è valida perché c’è margine ottico.", explanation: "Il margine ottico da solo non assicura la velocità richiesta." },
      { text: "Basta aggiungere un connettore.", explanation: "Un connettore può aggiungere perdita e non aumenta la velocità." },
      { text: "La capacità richiesta è soddisfatta.", explanation: "0,6 è minore di 0,8." }
    ]
  },
  {
    prompt: "Un messaggio di 9 byte è trasportato in una trama che aggiunge 7 byte. Quanti bit sono utili e quanti sono trasmessi?",
    source: { href: "lezione-2-4.html#messaggio-sensori", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "72 bit utili e 128 bit trasmessi.", correct: true, explanation: "Moltiplica per 8 sia i 9 byte utili sia i 16 byte totali." },
      { text: "56 bit utili e 128 bit trasmessi.", explanation: "I 7 byte sono campi aggiuntivi." },
      { text: "9 bit utili e 16 bit trasmessi.", explanation: "Le grandezze date sono byte. Convertile in bit." },
      { text: "72 bit utili e 72 bit trasmessi.", explanation: "Nei bit totali rientrano anche i campi aggiuntivi." }
    ]
  },
  {
    prompt: "La centralina invia la temperatura come intero con segno in decimi di grado. Che cosa serve al destinatario?",
    source: { href: "lezione-2-4.html#messaggio-sensori", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Conoscere posizione, lunghezza, ordine dei byte e scala del campo.", correct: true, explanation: "Queste regole permettono di leggere e interpretare il valore." },
      { text: "Conoscere soltanto il controllo degli errori.", explanation: "Il controllo verifica l’integrità della trama, mentre le regole del campo danno significato al dato." },
      { text: "Conoscere soltanto l’ora della misura.", explanation: "L’ora non dice come leggere la temperatura." },
      { text: "Conoscere soltanto la lunghezza della trama.", explanation: "La lunghezza complessiva non identifica il campo né la sua codifica." }
    ]
  },
  {
    prompt: "Quale informazione permette a un router OSPF di calcolare da sé il percorso?",
    source: { href: "lezione-2-5.html#routing-dinamico", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Le descrizioni di stato e costo dei collegamenti.", correct: true, explanation: "Con queste informazioni ricostruisce la topologia dell’area." },
      { text: "Solo il numero di salti annunciato da un vicino.", explanation: "Il numero di salti annunciato è il modo di ragionare di RIP." },
      { text: "Solo l’indirizzo di origine del pacchetto.", explanation: "Per calcolare i percorsi servono informazioni sulla rete." },
      { text: "Il traffico utente intercettato dalle altre porte.", explanation: "I router scambiano informazioni di controllo sullo stato dei collegamenti." }
    ]
  },
  {
    prompt: "In RIP, B annuncia di raggiungere una rete in un salto. A può raggiungere B con un salto. Quale distanza valuta A passando per B?",
    source: { href: "lezione-2-5.html#routing-dinamico", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Due salti.", correct: true, explanation: "A aggiunge alla distanza annunciata il salto necessario per raggiungere B." },
      { text: "Un salto.", explanation: "Il valore annunciato è la distanza vista da B." },
      { text: "Tre salti.", explanation: "I dati dell’esempio descrivono due salti." },
      { text: "Calcola prima tutta la mappa dell’area.", explanation: "Questo è il metodo di tipo link state usato da OSPF." }
    ]
  },
  {
    prompt: "Una LAN deve avere 13 concentratori, 1 router e 1 apparato di gestione. Qual è il blocco IPv4 più piccolo fra quelli proposti che li contiene?",
    source: { href: "lezione-2-5.html#routing-dinamico", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "/27", correct: true, explanation: "Offre 30 indirizzi utilizzabili per 15 necessari." },
      { text: "/28", explanation: "Offre 14 indirizzi utilizzabili." },
      { text: "/29", explanation: "Offre 6 indirizzi utilizzabili." },
      { text: "/30", explanation: "Offre 2 indirizzi utilizzabili." }
    ]
  },
  {
    prompt: "Nel laboratorio, i sensori parlano con i concentratori su una rete locale dedicata priva di IP. Chi va contato nella sottorete IPv4 di campo?",
    source: { href: "lab-routing.html#impianto-sensori", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Concentratori, interfaccia del router e apparato di gestione.", correct: true, explanation: "Sono gli apparati IP collegati alla sottorete di campo." },
      { text: "Anche tutti i sensori.", explanation: "Nello scenario i sensori usano un collegamento privo di IP." },
      { text: "Solo i sensori e il server in sede.", explanation: "Sensori e server non sono nella sottorete IPv4 di campo." },
      { text: "Solo i concentratori.", explanation: "Riserva un indirizzo anche per il router e l’apparato di gestione." }
    ]
  }
];

QuizAllenamento.init(document.getElementById('training-quiz'), domandeAllenamento);
