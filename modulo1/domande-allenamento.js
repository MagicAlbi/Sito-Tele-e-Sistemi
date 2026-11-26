const domandeAllenamento = [
  // Lezione 1.1 — Fondamenti e topologie WLAN
  {
    prompt: "In un edificio due Access Point trasmettono lo stesso nome di rete. Quale dato distingue le loro due celle Wi-Fi?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa BSS, BSSID ed ESS" },
    options: [
      {
        text: "Il BSSID di ciascuna cella",
        correct: true,
        explanation: "Il BSSID identifica la singola cella, anche quando più celle condividono lo stesso SSID."
      },
      {
        text: "L’SSID visualizzato dal telefono",
        explanation: "Il nome visualizzato è uguale per entrambe le celle e quindi non le distingue."
      },
      {
        text: "L’indirizzo IP del telefono",
        explanation: "L’indirizzo IP identifica il telefono sulla rete, mentre la domanda riguarda le celle radio."
      },
      {
        text: "L’ESS a cui appartengono entrambe le celle",
        explanation: "L’ESS raggruppa più celle e quindi non distingue le singole celle al suo interno."
      }
    ]
  },
  {
    prompt: "Due schermate mostrano le reti visibili. Nel primo caso il telefono resta in ascolto e riceve annunci dell’Access Point. Nel secondo li cerca inviando una richiesta e aspetta la risposta. Come si classificano le due prove?",
    source: { href: "lezione-1-1.html#slide-3", label: "Ripassa la scansione delle reti" },
    options: [
      {
        text: "La prima è scansione attiva, la seconda è scansione passiva.",
        explanation: "Chi avvia la ricerca distingue i due casi. Inviare la richiesta rende attiva la seconda prova."
      },
      {
        text: "Sono entrambe scansioni passive, perché in entrambi i casi risponde il punto di accesso.",
        explanation: "Nella seconda è il terminale a chiedere esplicitamente informazioni. La sua trasmissione rende la ricerca attiva."
      },
      {
        text: "Sono entrambe scansioni attive, perché in entrambi i casi circolano messaggi radio.",
        explanation: "Nella prima circolano annunci periodici dell’Access Point, ma il terminale si limita ad ascoltare."
      },
      {
        text: "La prima è scansione passiva, la seconda è scansione attiva.",
        correct: true,
        explanation: "Nella prima prova il terminale ascolta i beacon. Nella seconda trasmette una Probe Request prima di ricevere una risposta."
      }
    ]
  },
  {
    prompt: "Un portatile passa da Ethernet al Wi-Fi sullo stesso banco. Quale coppia di elementi cambia proprio per effetto del passaggio al mezzo radio?",
    source: { href: "lezione-1-1.html#slide-1", label: "Ripassa · Lo strato fisico e il MAC" },
    options: [
      {
        text: "Il formato degli indirizzi IP e la funzione del livello trasporto.",
        explanation: "Indirizzi IP e trasporto appartengono a livelli superiori. Il cambio del mezzo non richiede un nuovo formato IP."
      },
      {
        text: "Il mezzo fisico e il contenuto dei messaggi dell’applicazione.",
        explanation: "Il mezzo fisico cambia, ma il contenuto che l’applicazione invia resta indipendente da come viaggia il segnale."
      },
      {
        text: "Il segnale fisico e le regole con cui si accede al mezzo.",
        correct: true,
        explanation: "A livello fisico si passa dal doppino alla radio. A livello MAC cambiano le regole per condividere il mezzo."
      },
      {
        text: "Il livello trasporto e il modo in cui l’applicazione genera i dati.",
        explanation: "Questi livelli restano sopra il collegamento. Le differenze specifiche si trovano nel fisico e nel MAC."
      }
    ]
  },
  {
    prompt: "Un portatile deve comunicare con una stampante che già appartiene alla stessa WLAN in modalità infrastruttura. Nel modello della lezione, quale percorso segue il frame?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · Le topologie nel simulatore" },
    options: [
      {
        text: "Portatile → stampante, con l’Access Point che conferma soltanto.",
        explanation: "Lo scambio diretto tra terminali è il modello ad hoc. Qui i terminali passano dal punto di accesso."
      },
      {
        text: "Portatile → Access Point → stampante.",
        correct: true,
        explanation: "In modalità infrastruttura il punto di accesso fa da nodo centrale anche tra due stazioni della sua cella."
      },
      {
        text: "Portatile → router cablato → stampante, saltando l’Access Point.",
        explanation: "Il portatile entra dal lato radio. L’Access Point è il punto attraverso cui quel frame accede al resto della rete."
      },
      {
        text: "Stampante → Access Point → portatile, prima dell’invio del frame.",
        explanation: "Il portatile è il mittente. La presenza del punto di accesso non inverte la direzione dei dati."
      }
    ]
  },
  {
    prompt: "Durante un’uscita due terminali scambiano dati direttamente via radio, senza un punto di accesso. Quale modifica farebbe passare lo schema a una rete in modalità infrastruttura?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · La modalità ad hoc" },
    options: [
      {
        text: "Far associare entrambi i terminali a un punto di accesso.",
        correct: true,
        explanation: "In infrastruttura le stazioni fanno riferimento a un Access Point, che gestisce il collegamento radio."
      },
      {
        text: "Aggiungere un terzo terminale che si colleghi direttamente ai primi due.",
        explanation: "Aumenta il numero di stazioni. Lo schema senza punto di accesso rimane ad hoc."
      },
      {
        text: "Assegnare lo stesso nome al collegamento diretto dei terminali.",
        explanation: "Il nome non cambia la topologia. Occorre un punto di accesso a cui si associno le stazioni."
      },
      {
        text: "Far trasmettere un solo terminale per volta sul canale radio.",
        explanation: "Alternare le trasmissioni regola l’uso del mezzo, ma non introduce un punto di accesso."
      }
    ]
  },
  {
    prompt: "Uno smartphone invia una richiesta a un server sulla rete Ethernet tramite il punto di accesso. Quando la richiesta passa dal lato radio al cavo, che cosa cambia e che cosa resta uguale?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · Il ruolo del punto di accesso" },
    options: [
      {
        text: "Resta lo stesso tipo di frame radio. Il server resta la destinazione della richiesta.",
        explanation: "La destinazione resta il server, ma la tratta cablata usa frame Ethernet invece di frame 802.11."
      },
      {
        text: "Cambia il tipo di frame del collegamento. L’Access Point diventa la destinazione finale.",
        explanation: "Il cambio di frame riguarda il mezzo. Il punto di accesso inoltra la richiesta al server senza sostituirlo."
      },
      {
        text: "Resta lo stesso tipo di frame radio. L’Access Point diventa la destinazione finale.",
        explanation: "Il punto di accesso collega tipi di frame diversi e il server rimane il destinatario finale."
      },
      {
        text: "Cambia il tipo di frame del collegamento. Il server resta la destinazione della richiesta.",
        correct: true,
        explanation: "L’Access Point fa da ponte tra i due mezzi. I frame seguono il collegamento locale e il destinatario del traffico resta il server."
      }
    ]
  },
  {
    prompt: "Uno studente passa da un laboratorio al corridoio. Il telefono rimane sulla stessa rete visibile, ma il BSSID cambia. Quale lettura è compatibile con lo schema ESS?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · BSS, ESS e roaming" },
    options: [
      {
        text: "Il telefono ha cambiato il nome della rete, mentre è rimasto nella stessa cella.",
        explanation: "In questo caso il nome è rimasto uguale. È il BSSID a indicare una cella diversa."
      },
      {
        text: "Il telefono è passato a un collegamento diretto fra terminali, mantenendo la stessa cella.",
        explanation: "Il passaggio tra BSS di un ESS riguarda celle con Access Point. Non descrive una rete ad hoc."
      },
      {
        text: "Il telefono è passato a un’altra cella dello stesso insieme di punti di accesso.",
        correct: true,
        explanation: "In un ESS le celle sono collegate e condividono l’SSID. Il BSSID cambia quando cambia la cella a cui il terminale è associato."
      },
      {
        text: "Il telefono è rimasto associato alla stessa cella e ha solo completato la scansione.",
        explanation: "La scansione scopre quali celle sono disponibili. Qui è cambiato il BSSID della cella a cui il telefono è associato."
      }
    ]
  },
  {
    prompt: "Per disegnare la WLAN di una scuola hai due punti di accesso collegati fra loro e con lo stesso SSID. Ognuno serve un proprio gruppo di terminali. Dove metti i confini dei BSS e dell’ESS?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · BSS ed ESS" },
    options: [
      {
        text: "Disegno un solo BSS perché il nome di rete è comune. I due gruppi di terminali formano due ESS.",
        explanation: "L’SSID in comune può appartenere a più celle. Il confine del BSS dipende dal punto di accesso."
      },
      {
        text: "Disegno un BSS per ciascun punto di accesso con i suoi terminali. I due BSS formano l’ESS.",
        correct: true,
        explanation: "Il BSS è la singola cella. L’ESS riunisce le celle interconnesse che condividono il nome di rete."
      },
      {
        text: "Disegno i due punti di accesso in un BSS e tutti i terminali nell’altro. L’ESS riunisce i due gruppi.",
        explanation: "Ogni cella comprende insieme un punto di accesso e le stazioni associate a quel punto."
      },
      {
        text: "Disegno due ESS separati, perché i due punti di accesso hanno BSSID diversi.",
        explanation: "BSSID diversi distinguono le singole celle. Le due celle collegate e con lo stesso SSID possono formare un unico ESS."
      }
    ]
  },
  {
    prompt: "In una traccia della scoperta delle reti compaiono prima un messaggio del portatile e poi una risposta dell’Access Point. Quale coppia descrive la scansione attiva?",
    source: { href: "lezione-1-1.html#slide-3", label: "Ripassa · Scansione attiva e passiva" },
    options: [
      {
        text: "Probe Request del portatile e Probe Response dell’Access Point.",
        correct: true,
        explanation: "Nella scansione attiva il portatile cerca le reti con una richiesta. Gli Access Point rilevati possono rispondere."
      },
      {
        text: "Beacon del portatile e Probe Request dell’Access Point.",
        explanation: "Il beacon annuncia una rete dal lato Access Point. La richiesta di scansione nella scena partirebbe dal portatile."
      },
      {
        text: "Richiesta di associazione del portatile e beacon dell’Access Point.",
        explanation: "L’associazione richiede di aver già scelto il punto di accesso. Il beacon è un annuncio, non la risposta alla scansione attiva."
      },
      {
        text: "Probe Response del portatile e Probe Request dell’Access Point.",
        explanation: "I ruoli sono invertiti. Prima il portatile interroga il canale, poi l’Access Point risponde."
      }
    ]
  },
  {
    prompt: "Un portatile vede il nome della rete e invia la richiesta di associazione. L’Access Point rifiuta la richiesta. Quale parte del collegamento conviene controllare per prima?",
    source: { href: "lezione-1-1.html#slide-3", label: "Ripassa · Le fasi di collegamento" },
    options: [
      {
        text: "La scansione passiva, perché il portatile non ha ancora scoperto il punto di accesso.",
        explanation: "Il portatile ha già trovato la rete e ha chiesto di associarsi. La fase che ha restituito il rifiuto viene dopo."
      },
      {
        text: "La scansione attiva, perché sostituisce l’associazione quando trova la rete.",
        explanation: "La scansione può trovare lo stesso punto di accesso in modo diverso, ma non sostituisce l’associazione."
      },
      {
        text: "Il trasferimento dei dati applicativi, perché il rifiuto conferma comunque l’ingresso nel BSS.",
        explanation: "La richiesta è stata rifiutata. Dal caso descritto non si può presumere che la stazione sia già entrata nella cella."
      },
      {
        text: "L’ingresso del portatile nel BSS, perché la scoperta della rete è già avvenuta.",
        correct: true,
        explanation: "La rete visibile dimostra che la scoperta ha trovato l’Access Point. Il rifiuto osservato riguarda la fase di associazione."
      }
    ]
  },
  {
    prompt: "Nel modello della lezione, un terminale ha scoperto la rete e superato la fase di autenticazione. Quale informazione permette di riconoscere che è arrivato anche alla fase di associazione?",
    source: { href: "lezione-1-1.html#slide-3", label: "Ripassa · L’associazione e l’AID" },
    options: [
      {
        text: "Il terminale ha ricevuto il primo beacon della rete.",
        explanation: "Il beacon consente di scoprire la rete. Da solo non dice che il terminale si sia associato."
      },
      {
        text: "Il terminale ha inviato una Probe Request dalla scheda Wi-Fi.",
        explanation: "La Probe Request appartiene alla scansione attiva, prima dell’associazione."
      },
      {
        text: "L’Access Point gli ha assegnato un Association ID.",
        correct: true,
        explanation: "L’AID è l’identificativo assegnato alla stazione quando entra nel BSS nella fase di associazione."
      },
      {
        text: "L’Access Point ha annunciato il proprio SSID.",
        explanation: "L’annuncio è disponibile a tutte le stazioni in ascolto. Non è la conferma dell’associazione di una stazione specifica."
      }
    ]
  },
  {
    prompt: "Il Wi-Fi di casa registra un indirizzo MAC. Il Wi-Fi della scuola ne registra uno diverso. Che cosa puoi concludere guardando solo questi due codici?",
    source: { href: "lezione-1-1.html#mac-privato", label: "Ripassa · L’indirizzo MAC privato" },
    options: [
      {
        text: "Si sono collegati sicuramente due telefoni diversi.",
        explanation: "Con il MAC privato, uno stesso telefono può usare un indirizzo a casa e un altro a scuola."
      },
      {
        text: "I due indirizzi potrebbero essere stati usati dallo stesso telefono.",
        correct: true,
        explanation: "Il telefono può generare un MAC privato per ciascuna rete. Il MAC di fabbrica resta memorizzato."
      },
      {
        text: "I due indirizzi indicano i nomi delle reti Wi-Fi.",
        explanation: "Il nome della rete è l’SSID. Qui ogni MAC è il codice usato da un dispositivo per farsi riconoscere dalla rete."
      },
      {
        text: "Il router della scuola ha cambiato il MAC di fabbrica del telefono.",
        explanation: "Il codice privato lo sceglie il telefono e lo scrive nei messaggi Wi-Fi. L’indirizzo di fabbrica resta memorizzato."
      }
    ]
  },

  // Lezione 1.2 — Standard, velocità e OFDMA
  {
    prompt: "Tre dispositivi hanno brevi messaggi in attesa. In una prova l’Access Point usa il canale intero per ciascuno a turno. In un’altra li serve nello stesso intervallo. Che cosa bisogna osservare per attribuire la differenza all’OFDMA?",
    source: { href: "lezione-1-2.html#slide-3", label: "Ripassa l’OFDMA" },
    options: [
      {
        text: "I tre dispositivi ricevono in tre intervalli più brevi, usando di volta in volta il canale intero.",
        explanation: "L’accorciamento dei turni lascerebbe comunque un solo destinatario alla volta. Il criterio cercato è la condivisione nello stesso intervallo."
      },
      {
        text: "I tre dispositivi ricevono nello stesso intervallo su gruppi diversi di sottoportanti.",
        correct: true,
        explanation: "L’OFDMA ripartisce un canale in porzioni di frequenza e le può assegnare contemporaneamente a più destinatari."
      },
      {
        text: "I tre dispositivi ricevono sul canale intero in tre intervalli, ma l’ordine è cambiato.",
        explanation: "Cambiare la precedenza dei destinatari non divide il canale. Il caso osservato resta monoutente."
      },
      {
        text: "I tre dispositivi ricevono nello stesso intervallo e usano tutti lo stesso gruppo di sottoportanti.",
        explanation: "Nel modello i gruppi sono distinti. Assegnare lo stesso gruppo a tutti non mostra la ripartizione OFDMA."
      }
    ]
  },
  {
    prompt: "Un computer mostra una velocità Wi-Fi nominale elevata, ma un trasferimento verso un server locale è più lento. Quale fattore lo spiega anche senza accesso a Internet?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa la velocità effettiva" },
    options: [
      {
        text: "Parte del tempo radio è usata da controlli e attese",
        correct: true,
        explanation: "Il valore nominale riguarda il collegamento radio. Intestazioni, conferme e attese riducono la quota di tempo che trasporta i dati del file."
      },
      {
        text: "Il server deve passare dal collegamento Internet",
        explanation: "Nel caso descritto il server è sulla rete locale e il trasferimento può avvenire senza collegamento Internet."
      },
      {
        text: "L’indirizzo del server fissa la velocità dei frame",
        explanation: "Un indirizzo permette di raggiungere il server. La velocità del trasferimento dipende dalle risorse del collegamento e dai protocolli."
      },
      {
        text: "Il nome della rete limita la dimensione dei file",
        explanation: "Il nome della rete serve a individuarla. La differenza osservata riguarda la velocità effettiva, anche con lo stesso nome di rete."
      }
    ]
  },
  {
    prompt: "Un sensore può usare solo la banda dei 2,4 GHz. In un edificio trova una radio impostata esclusivamente su Wi-Fi 5 (802.11ac) a 5 GHz. Quale intervento soddisfa la necessità del sensore?",
    source: { href: "lezione-1-2.html#slide-1", label: "Ripassa · Le bande e le generazioni Wi-Fi" },
    options: [
      {
        text: "Mantenere la radio a 5 GHz e ridurre la larghezza del suo canale.",
        explanation: "Un canale più stretto resta nella stessa banda. Il sensore non può sintonizzarsi sui 5 GHz."
      },
      {
        text: "Mantenere la radio a 5 GHz e scegliere il nome usato dal sensore.",
        explanation: "Il nome può aiutare a identificare la rete. Il sensore deve prima ricevere il segnale nella sua banda."
      },
      {
        text: "Mantenere la radio a 5 GHz e aggiungere altri flussi spaziali.",
        explanation: "I flussi spaziali operano sul collegamento già disponibile. Non forniscono una banda diversa al sensore."
      },
      {
        text: "Fornire una radio compatibile che trasmetta anche a 2,4 GHz.",
        correct: true,
        explanation: "Per comunicare, il sensore e il punto di accesso devono condividere una banda supportata. La radio descritta trasmette solo a 5 GHz."
      }
    ]
  },
  {
    prompt: "Due access point della generazione 802.11ax sono pubblicizzati come Wi-Fi 6 e Wi-Fi 6E. In un’aula si vuole provare la banda a 6 GHz. Quale confronto aiuta a scegliere?",
    source: { href: "lezione-1-2.html#slide-1", label: "Ripassa · Wi-Fi 6 e Wi-Fi 6E" },
    options: [
      {
        text: "Basta scegliere il Wi-Fi 6, perché il numero della generazione coincide con la frequenza.",
        explanation: "Il numero indica la generazione. Il supporto alla banda a 6 GHz va verificato separatamente."
      },
      {
        text: "I due modelli offrono lo stesso accesso a 6 GHz, ma usano nomi di rete diversi.",
        explanation: "La distinzione riguarda anche le bande supportate, indipendentemente dal nome assegnato alla rete."
      },
      {
        text: "Bisogna verificare il supporto a 6 GHz sulla versione Wi-Fi 6E e sui terminali.",
        correct: true,
        explanation: "La lezione distingue Wi-Fi 6E per l’uso della banda a 6 GHz. Anche il terminale deve poterla usare."
      },
      {
        text: "Serve Wi-Fi 5, perché la sua banda è più vicina a 6 GHz.",
        explanation: "Wi-Fi 5 opera a 5 GHz. La vicinanza tra le bande non rende compatibile un apparato."
      }
    ]
  },
  {
    prompt: "Un Access Point Wi-Fi 7 può lavorare con un unico canale più largo oppure usare più collegamenti. Quale coppia della tabella descrive queste due scelte nell’ordine indicato?",
    source: { href: "lezione-1-2.html#slide-1", label: "Ripassa · Le caratteristiche del Wi-Fi 7" },
    options: [
      {
        text: "Multi-Link Operation, poi canale di 320 MHz.",
        explanation: "L’ordine è invertito. MLO riguarda più collegamenti, mentre 320 MHz indica la larghezza di un canale."
      },
      {
        text: "Canale di 320 MHz, poi Multi-Link Operation.",
        correct: true,
        explanation: "I MHz misurano la larghezza del singolo canale. MLO indica il funzionamento con più collegamenti."
      },
      {
        text: "4096-QAM, poi Multi-Link Operation.",
        explanation: "MLO corrisponde alla seconda scelta. 4096-QAM descrive invece la costellazione, non la larghezza del canale."
      },
      {
        text: "Canale di 320 MHz, poi 4096-QAM.",
        explanation: "I 320 MHz descrivono la prima scelta. La costellazione indica gli stati di modulazione, non il numero di collegamenti."
      }
    ]
  },
  {
    prompt: "Due schede tecniche descrivono l’una Target Wake Time e l’altra Multi-Link Operation. Quale abbinamento è coerente con la tabella della lezione?",
    source: { href: "lezione-1-2.html#slide-1", label: "Ripassa · Le tecnologie nella tabella evolutiva" },
    options: [
      {
        text: "Target Wake Time è associato al risparmio per l’IoT, Multi-Link Operation all’uso di più collegamenti.",
        correct: true,
        explanation: "La tabella collega Target Wake Time alla durata della batteria e presenta MLO come una caratteristica distinta del Wi-Fi 7."
      },
      {
        text: "Target Wake Time aumenta la larghezza del canale, Multi-Link Operation riduce i risvegli dei sensori.",
        explanation: "La larghezza è una caratteristica separata. La funzione legata alla batteria dei sensori è Target Wake Time."
      },
      {
        text: "Target Wake Time distribuisce le sottoportanti, Multi-Link Operation sceglie la modulazione QAM.",
        explanation: "La distribuzione delle sottoportanti è illustrata con OFDMA. La modulazione e la gestione di più collegamenti sono meccanismi distinti."
      },
      {
        text: "Target Wake Time e Multi-Link Operation descrivono due modi per aumentare i bit per simbolo.",
        explanation: "I bit per simbolo dipendono dalla modulazione. Qui una funzione riguarda i risvegli e l’altra i collegamenti radio."
      }
    ]
  },
  {
    prompt: "Nel simulatore raddoppi la dimensione del file lasciando invariati standard e terminale. Che cosa succede alla velocità effettiva stimata e al tempo di download?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · Velocità e tempo nel simulatore" },
    options: [
      {
        text: "La velocità raddoppia e il tempo resta invariato.",
        explanation: "La dimensione del file non aumenta la velocità del collegamento nel simulatore."
      },
      {
        text: "La velocità si dimezza e il tempo resta invariato.",
        explanation: "Nello stesso collegamento la velocità resta uguale. Con più dati da inviare occorre invece più tempo."
      },
      {
        text: "La velocità resta invariata e il tempo si dimezza.",
        explanation: "Il tempo è proporzionale ai dati inviati a velocità fissa. Raddoppiare i dati non può ridurlo."
      },
      {
        text: "La velocità resta invariata e il tempo diventa circa doppio.",
        correct: true,
        explanation: "Con la stessa velocità, un file doppio trasferisce il doppio dei dati. L’arrotondamento può cambiare qualche secondo."
      }
    ]
  },
  {
    prompt: "Nella prova B devi trasferire un file grande il doppio di quello della prova A. La velocità effettiva passa da 100 a 150 Mbit/s. Come cambia il tempo stimato di trasferimento rispetto alla prova A?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · Il calcolo del tempo di trasferimento" },
    options: [
      {
        text: "Diminuisce di circa un terzo.",
        explanation: "Il confronto vale al contrario. L’aumento della velocità è minore dell’aumento del file, quindi il trasferimento richiede più tempo."
      },
      {
        text: "Raddoppia.",
        explanation: "Raddoppierebbe a velocità costante. Qui la velocità aumenta e compensa parte dell’aumento di dimensione."
      },
      {
        text: "Aumenta di circa un terzo.",
        correct: true,
        explanation: "I dati moltiplicano il tempo per 2, mentre la velocità lo divide per 1,5. Il rapporto 2 ÷ 1,5 vale circa 1,33."
      },
      {
        text: "Rimane circa uguale.",
        explanation: "Resterebbe uguale se raddoppiassero sia i dati sia la velocità. Qui la velocità cresce soltanto della metà."
      }
    ]
  },
  {
    prompt: "Per il file di un progetto vuoi prevedere il tempo di trasferimento. Sulla stessa tratta, il Wi-Fi indica 800 Mbit/s nominali ma una prova misura 400 Mbit/s di dati utili stabili. Quale scelta è coerente con il simulatore?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · Velocità nominale ed effettiva" },
    options: [
      {
        text: "Usare 800 Mbit/s, perché il dato nominale include tutte le attese.",
        explanation: "Il valore nominale descrive il collegamento radio. Attese e controlli riducono la velocità osservata del file."
      },
      {
        text: "Usare 400 Mbit/s, perché è la velocità osservata per i dati utili.",
        correct: true,
        explanation: "Per stimare il tempo dell’intero file serve la velocità con cui passano i suoi dati. Il valore nominale non considera tutto il tempo di servizio."
      },
      {
        text: "Usare 600 Mbit/s, facendo la media dei due risultati.",
        explanation: "I due valori misurano aspetti diversi. La media non rappresenta una velocità misurata di trasferimento dati."
      },
      {
        text: "Usare 1.200 Mbit/s, sommando dati utili e velocità nominale.",
        explanation: "La velocità nominale e quella utile si riferiscono allo stesso collegamento. Non sono due canali da sommare."
      }
    ]
  },
  {
    prompt: "Nel simulatore confronti Wi-Fi 6 con terminale 1×1 e 2×2, lasciando identici file e standard. Quale risultato ti aspetti nel modello?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · I flussi nel simulatore" },
    options: [
      {
        text: "Il 2×2 ha velocità nominale ed effettiva stimate più alte, quindi il trasferimento è più breve.",
        correct: true,
        explanation: "Il simulatore attribuisce al 2×2 più flussi e un rate più alto. A parità di file il tempo diminuisce."
      },
      {
        text: "Il 2×2 abbrevia il trasferimento, ma lascia invariata la velocità effettiva del modello.",
        explanation: "Per lo stesso file il tempo minore deriva proprio dalla velocità effettiva più alta."
      },
      {
        text: "Il 2×2 aumenta il rate nominale e riduce quello effettivo, lasciando intatta l’efficienza.",
        explanation: "Con la stessa efficienza del modello, aumentare la velocità nominale fa aumentare anche quella effettiva."
      },
      {
        text: "I due terminali hanno lo stesso tempo, perché appartengono allo stesso standard.",
        explanation: "Il simulatore distingue il numero di flussi anche dentro la stessa generazione."
      }
    ]
  },
  {
    prompt: "Nella simulazione OFDMA sono visibili tre gruppi di sottoportanti assegnati ad A, B e C. Nel passo successivo i tre dispositivi ricevono insieme. Quale lettura distingue correttamente i due passi?",
    source: { href: "lezione-1-2.html#slide-3", label: "Ripassa · Le Resource Unit nell’animazione" },
    options: [
      {
        text: "Nel primo si vede la ricezione completa. Nel successivo vengono assegnate le porzioni di frequenza.",
        explanation: "I messaggi compaiono come ricevuti dopo che le porzioni sono state assegnate. L’ordine è invertito."
      },
      {
        text: "Nel primo si assegnano tre turni. Nel successivo ciascun dispositivo usa a turno tutte le frequenze.",
        explanation: "I riquadri rappresentano porzioni della stessa banda. Il passo successivo mostra più destinatari attivi insieme."
      },
      {
        text: "Nel primo si assegnano porzioni di frequenza. Nel successivo soltanto A trasmette usando tutto il canale.",
        explanation: "L’animazione mostra un Access Point che trasmette verso i client. A, B e C sono tutti destinatari nella trasmissione OFDMA."
      },
      {
        text: "Nel primo si assegnano porzioni di frequenza. Nel successivo si osserva la ricezione dei dati sulle porzioni assegnate.",
        correct: true,
        explanation: "L’animazione separa la preparazione delle Resource Unit dalla trasmissione ai tre destinatari nello stesso intervallo."
      }
    ]
  },
  {
    prompt: "Una classe usa la simulazione per distinguere il caso monoutente da OFDMA. Quale osservazione sul grafico permette di riconoscere il caso monoutente?",
    source: { href: "lezione-1-2.html#slide-3", label: "Ripassa · Il confronto monoutente e OFDMA" },
    options: [
      {
        text: "In un intervallo compaiono più dispositivi con gruppi diversi di sottoportanti.",
        explanation: "Questa è proprio la ripartizione del canale mostrata nel caso OFDMA."
      },
      {
        text: "Le risorse di un intervallo sono ripartite tra i dispositivi che aspettano.",
        explanation: "La ripartizione nello stesso intervallo identifica OFDMA. Nel caso monoutente gli altri attendono il proprio turno."
      },
      {
        text: "In ciascun intervallo tutte le risorse mostrate sono assegnate a un solo dispositivo.",
        correct: true,
        explanation: "Nel modo monoutente, un dispositivo usa il canale nel proprio intervallo. Gli altri usano intervalli successivi."
      },
      {
        text: "Due utenti ricevono nello stesso intervallo, purché abbiano quantità simili di dati.",
        explanation: "La modalità monoutente assegna il canale a un singolo dispositivo per intervallo, anche quando più dispositivi sono in attesa."
      }
    ]
  },

  // Lezione 1.3 — Spettro, canali e propagazione
  {
    prompt: "Due Access Point vicini usano in 2,4 GHz i canali 1 e 3, entrambi larghi 20 MHz. Quale effetto è plausibile?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa la sovrapposizione dei canali" },
    options: [
      {
        text: "Le reti si separano perché i numeri dei canali sono diversi",
        explanation: "Avere numeri diversi separa solo le frequenze centrali. Conta anche la larghezza del canale."
      },
      {
        text: "Le reti si alternano sempre come se avessero lo stesso canale",
        explanation: "Con canali parzialmente sovrapposti i dispositivi possono disturbarsi senza coordinarsi come sullo stesso canale."
      },
      {
        text: "Le trasmissioni si disturbano nella porzione di spettro condivisa",
        correct: true,
        explanation: "I centri dei canali sono separati, ma i 20 MHz occupati si sovrappongono in parte. In quella porzione i segnali possono interferire."
      },
      {
        text: "Le trasmissioni passano automaticamente alla banda dei 5 GHz",
        explanation: "Un conflitto in 2,4 GHz non implica un passaggio automatico a un’altra banda. La sovrapposizione descritta è già presente."
      }
    ]
  },
  {
    prompt: "Il Wi-Fi a 5 GHz sparisce per un breve periodo e poi torna con lo stesso nome su un altro canale. Nel registro dell’Access Point compare il rilevamento di un radar durante la pausa. Quale sequenza spiega tutti gli indizi?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa i canali DFS" },
    options: [
      {
        text: "L’Access Point rileva il radar, riduce il ritmo dei dati e riprende sullo stesso canale.",
        explanation: "Ridurre la velocità sul vecchio canale non lo libera. Inoltre il registro mostra che il canale è cambiato."
      },
      {
        text: "L’Access Point rileva il radar, libera il canale interessato e riprende su un canale consentito.",
        correct: true,
        explanation: "Il DFS riguarda la scelta del canale quando viene rilevato il radar. L’Access Point può cambiare canale mantenendo il nome di rete."
      },
      {
        text: "L’Access Point riceve un segnale più debole attraverso una parete e il terminale perde la rete.",
        explanation: "La minore potenza ricevuta può spiegare una perdita di copertura. Non spiega da sola il rilevamento del radar e il cambio di canale dell’Access Point."
      },
      {
        text: "L’Access Point cambia nome alla rete per allontanarsi dal radar e mantiene la frequenza.",
        explanation: "Cambiare nome non libera la frequenza occupata. Nel caso osservato il nome resta uguale e cambia il canale."
      }
    ]
  },
  {
    prompt: "Nel modello a 2,4 GHz i canali 2 e 5 hanno centri distanziati di 5 MHz per ogni passo. Quale distanza separa i loro centri?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · Frequenze centrali e distanza tra canali" },
    options: [
      {
        text: "15 MHz, perché tra 2 e 5 ci sono tre passi.",
        correct: true,
        explanation: "Si conta la differenza tra i numeri dei canali. Tre intervalli da 5 MHz fanno 15 MHz."
      },
      {
        text: "10 MHz, perché i canali interni sono due.",
        explanation: "Si contano gli intervalli tra centri e non solo i numeri intermedi. Gli intervalli sono 2–3, 3–4 e 4–5."
      },
      {
        text: "20 MHz, perché i canali in esame sono larghi 20 MHz.",
        explanation: "La larghezza occupata è diversa dalla distanza tra le frequenze centrali. Qui la distanza è 15 MHz."
      },
      {
        text: "5 MHz, perché la distanza tra canali in 2,4 GHz è sempre la stessa.",
        explanation: "Cinque MHz è la separazione fra due centri consecutivi. Qui si contano tre passi consecutivi."
      }
    ]
  },
  {
    prompt: "Nel simulatore due canali hanno centri separati di 15 MHz e sono larghi 20 MHz ciascuno. Quanta sovrapposizione nominale mostrano?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · Larghezza dei canali nel simulatore" },
    options: [
      {
        text: "0 MHz.",
        explanation: "La distanza tra i centri è minore della larghezza dei canali. Rimane un tratto di spettro comune."
      },
      {
        text: "10 MHz.",
        explanation: "Dieci MHz è metà della larghezza di un canale. L’intersezione si trova sottraendo la distanza tra centri alla larghezza comune."
      },
      {
        text: "15 MHz.",
        explanation: "Quindici MHz misura la separazione tra i centri. Lo spettro comune è la differenza fra 20 e 15 MHz."
      },
      {
        text: "5 MHz.",
        correct: true,
        explanation: "Ciascun canale si estende di 10 MHz da entrambi i lati del proprio centro. L’intersezione è 20 − 15 = 5 MHz."
      }
    ]
  },
  {
    prompt: "Il simulatore confronta due Access Point vicini che si sentono. Prima usano entrambi il canale 6, poi uno passa al canale 7. Perché il secondo caso non è semplicemente una versione più leggera del primo?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · Stesso canale e canali sovrapposti" },
    options: [
      {
        text: "Sul canale 7 i due segnali non si sovrappongono, perché cambia il numero del canale.",
        explanation: "La distanza tra canali consecutivi è minore della loro larghezza. Cambiare numero può lasciare parte dello spettro in comune."
      },
      {
        text: "Sul canale 6 i due apparati non possono alternarsi perché ricevono sulla stessa frequenza.",
        explanation: "Se riconoscono il canale occupato possono aspettare. Usare lo stesso canale non implica una collisione continua."
      },
      {
        text: "I due segnali si sovrappongono in parte e possono disturbarsi senza coordinarsi come sullo stesso canale.",
        correct: true,
        explanation: "Sullo stesso canale gli apparati che si sentono possono condividere il tempo. La sovrapposizione parziale può ostacolare quel coordinamento."
      },
      {
        text: "Spostarsi al canale 7 obbliga ciascun apparato a usare lo stesso identico centro del canale 6.",
        explanation: "I centri cambiano di 5 MHz. Un cambio così piccolo lascia sovrapposizione, ma i centri non coincidono."
      }
    ]
  },
  {
    prompt: "Un punto di accesso usa il canale 2 a 20 MHz. Nel modello nominale quale coppia, fra quelle proposte, evita la sovrapposizione?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · Confrontare la sovrapposizione tra canali" },
    options: [
      {
        text: "Canali 2 e 3.",
        explanation: "I centri distano solo 5 MHz. Resta gran parte dello spettro in comune."
      },
      {
        text: "Canali 2 e 7.",
        correct: true,
        explanation: "I centri sono separati di 25 MHz, più dei 20 MHz occupati da ciascun canale."
      },
      {
        text: "Canali 2 e 4.",
        explanation: "La distanza centrale è 10 MHz, insufficiente a separare due canali da 20 MHz."
      },
      {
        text: "Canali 2 e 5.",
        explanation: "La distanza centrale è 15 MHz. Il modello lascia ancora 5 MHz sovrapposti."
      }
    ]
  },
  {
    prompt: "Nel simulatore passi dai blocchi da 20 MHz ai blocchi da 40 MHz in banda 5 GHz. Cambiano sia la larghezza sia le frequenze centrali mostrate. Come verifichi se i due blocchi della nuova coppia si sovrappongono?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · Leggere il grafico dello spettro" },
    options: [
      {
        text: "Confronto la distanza tra i nuovi centri con i 40 MHz occupati da ciascun blocco.",
        correct: true,
        explanation: "Nel modello la sovrapposizione compare se la distanza tra centri è minore della larghezza comune. Le due grandezze vanno lette nella configurazione nuova."
      },
      {
        text: "Confronto la distanza della vecchia coppia con i 40 MHz della nuova configurazione.",
        explanation: "La distanza fra centri può cambiare con i blocchi proposti. Bisogna usare i centri della coppia che si sta valutando."
      },
      {
        text: "Confronto la distanza fra i nuovi centri con metà della larghezza di un singolo blocco.",
        explanation: "Ogni blocco si estende ai due lati del suo centro. I due bordi interni vanno considerati insieme, perciò la soglia è la larghezza intera."
      },
      {
        text: "Confronto solo le larghezze vecchia e nuova, perché due blocchi da 40 MHz si sovrappongono sempre.",
        explanation: "La larghezza maggiore non basta a stabilire l’intersezione. Se i centri sono abbastanza distanti i blocchi restano separati."
      }
    ]
  },
  {
    prompt: "In un magazzino vuoi privilegiare la copertura oltre alcune pareti. La velocità massima è secondaria. Quale prima prova è più coerente con il confronto della lezione?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa · Confrontare copertura e capacità delle bande" },
    options: [
      {
        text: "Provare 6 GHz, perché i canali larghi fanno attraversare meglio le pareti.",
        explanation: "La larghezza può aiutare la capacità, mentre la propagazione dipende da frequenza e ostacoli."
      },
      {
        text: "Provare 5 GHz, perché offre in ogni edificio una copertura superiore ai 2,4 GHz.",
        explanation: "Il confronto della lezione assegna ai 2,4 GHz un vantaggio tipico di copertura. La planimetria può influenzare il risultato reale."
      },
      {
        text: "Provare 6 GHz, perché la frequenza più alta garantisce meno attenuazione.",
        explanation: "Nel confronto della lezione le bande più alte risentono maggiormente degli ostacoli, a parità delle altre condizioni."
      },
      {
        text: "Provare 2,4 GHz e misurare il segnale dalla postazione oltre le pareti.",
        correct: true,
        explanation: "Nel confronto i 2,4 GHz tendono a offrire più copertura attraverso gli ostacoli. Una misura sul posto verifica il risultato."
      }
    ]
  },
  {
    prompt: "Due postazioni sono nello stesso locale e vicine al punto di accesso. L’obiettivo è trasferire un file grande su un canale poco affollato. Perché ha senso confrontare anche i 5 e i 6 GHz?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa · Confrontare le bande nello stesso locale" },
    options: [
      {
        text: "In quelle bande i segnali attraversano gli ostacoli meglio dei 2,4 GHz.",
        explanation: "Il vantaggio qui è la capacità, mentre attraverso le pareti la lezione mostra spesso il vantaggio dei 2,4 GHz."
      },
      {
        text: "In quelle bande tutti gli apparati usano lo stesso numero di flussi.",
        explanation: "La banda non rende uguali i terminali. Il numero di flussi dipende dalle capacità degli apparati."
      },
      {
        text: "Possono offrire canali più larghi. A breve distanza la copertura può essere sufficiente.",
        correct: true,
        explanation: "Le bande più alte possono offrire più spazio per il canale. Essere vicini e senza ostacoli riduce il problema della copertura."
      },
      {
        text: "Canali a frequenza più alta garantiscono più velocità anche se il segnale ricevuto è peggiore.",
        explanation: "La larghezza potenziale è un vantaggio, ma velocità ed errori dipendono anche dalla qualità del segnale."
      }
    ]
  },
  {
    prompt: "In una mensa il Wi-Fi a 2,4 GHz peggiora soltanto quando è in funzione il forno a microonde vicino. Quale confronto aiuta a verificare l’ipotesi di disturbo radio?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa · Le interferenze nella banda dei 2,4 GHz" },
    options: [
      {
        text: "Spostare il terminale in un’altra stanza e cambiare contemporaneamente la banda.",
        explanation: "Due modifiche insieme complicano la diagnosi. Cambiando stanza cambiano anche ostacoli e intensità del segnale."
      },
      {
        text: "Ripetere la prova nello stesso punto a forno spento e acceso, confrontando anche una banda diversa.",
        correct: true,
        explanation: "Si controlla se il peggioramento segue l’accensione e se coinvolge soprattutto i 2,4 GHz, vicino alla frequenza discussa in lezione."
      },
      {
        text: "Confrontare il nome delle reti visibili con il forno spento e acceso.",
        explanation: "Il nome può restare uguale mentre la qualità peggiora. Occorre confrontare il comportamento del collegamento."
      },
      {
        text: "Misurare una sola volta a 2,4 GHz con il forno acceso.",
        explanation: "Una misura senza confronto non separa l’effetto del forno da ostacoli o affollamento già presenti."
      }
    ]
  },
  {
    prompt: "Una rete è instabile solo in una stanza dietro due pareti, a prescindere da quali apparecchi sono accesi. Quale spiegazione è più coerente con il confronto delle bande?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa · Distinguere attenuazione e interferenza" },
    options: [
      {
        text: "Gli ostacoli possono attenuare il segnale e lasciare meno margine di copertura.",
        correct: true,
        explanation: "Le pareti assorbono parte dell’energia radio. Se il problema segue la posizione fissa, il percorso è il primo elemento da controllare."
      },
      {
        text: "L’affollamento del canale è provato dal fatto che il problema si ripete nella stanza.",
        explanation: "Il fatto che il problema dipenda dalla stanza suggerisce la perdita lungo quel percorso. Per dimostrare l’affollamento servirebbe osservare il mezzo radio."
      },
      {
        text: "Le pareti rendono più larga la banda occupata dal punto di accesso.",
        explanation: "Le pareti possono ridurre la potenza ricevuta. La larghezza di canale è invece una caratteristica della trasmissione configurata."
      },
      {
        text: "È sicuramente il forno a microonde, anche senza una variazione quando si accende.",
        explanation: "Il caso del forno mostra un disturbo legato al funzionamento dell’apparecchio. Qui il dato disponibile indica un problema stabile di posizione."
      }
    ]
  },
  {
    prompt: "Durante due prove a 5 GHz la rete scompare brevemente. Nella prova A cambia il canale del punto di accesso. Nella prova B il canale resta uguale e il problema si presenta solo dietro una parete. Che cosa manca per attribuire con sicurezza il caso A al DFS?",
    source: { href: "lezione-1-3.html#slide-2", label: "Ripassa · La selezione dinamica della frequenza" },
    options: [
      {
        text: "La conferma che il segnale ricevuto dietro la parete è più basso nella prova B.",
        explanation: "Quel dato aiuterebbe a valutare la copertura nella prova B. Non identifica la causa del cambio di canale nella prova A."
      },
      {
        text: "La conferma che il telefono vede lo stesso nome di rete prima e dopo la pausa.",
        explanation: "Il nome può restare uguale anche quando cambia canale. Non è una prova dell’intervento del DFS."
      },
      {
        text: "La conferma che il punto di accesso usa blocchi di canale più larghi della banda a 2,4 GHz.",
        explanation: "La larghezza del canale non dice se il punto di accesso abbia rilevato il radar. Quel rilevamento è la prova che manca."
      },
      {
        text: "La conferma che il punto di accesso ha rilevato un radar prima del cambio.",
        correct: true,
        explanation: "Il cambio di canale da solo non spiega perché è avvenuto. Il DFS descritto in lezione reagisce al rilevamento del radar."
      }
    ]
  },

  // Lezione 1.4 — Accesso al mezzo radio
  {
    prompt: "Due terminali si sentono entrambi con l’Access Point, ma sono schermati l’uno rispetto all’altro. Dove possono sovrapporsi i loro frame quando trasmettono insieme?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa il nodo nascosto" },
    options: [
      {
        text: "Al ricevitore del primo terminale",
        explanation: "Il primo terminale è schermato rispetto al secondo. Il punto che riceve entrambi è l’Access Point."
      },
      {
        text: "Al ricevitore del secondo terminale",
        explanation: "Il secondo terminale è schermato rispetto al primo. L’Access Point è il nodo comune che riceve entrambi."
      },
      {
        text: "Al router collegato via Ethernet",
        explanation: "Il router sul cavo può ricevere solo i dati che l’Access Point riesce prima a decodificare via radio."
      },
      {
        text: "Al ricevitore dell’Access Point",
        correct: true,
        explanation: "Entrambi i segnali arrivano all’Access Point. Poiché i terminali non si sentono, possono iniziare a trasmettere insieme e rendere irriconoscibili i frame al ricevitore comune."
      }
    ]
  },
  {
    prompt: "Un terminale sente il CTS dell’Access Point, ma non l’RTS del mittente. Come usa la durata indicata nel CTS?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa RTS, CTS e NAV" },
    options: [
      {
        text: "Invia i propri dati prima del mittente dell’RTS",
        explanation: "Il CTS concede al mittente dell’RTS l’opportunità di trasmettere. Gli altri aspettano."
      },
      {
        text: "Conferma con un ACK il CTS dell’Access Point",
        explanation: "La conferma del ricevitore segue il frame dati. Gli altri terminali usano il CTS per sapere quanto aspettare."
      },
      {
        text: "Aggiorna il NAV e rinvia la propria trasmissione",
        correct: true,
        explanation: "Il CTS segnala agli altri terminali per quanto tempo il mezzo è riservato. Il NAV conserva questa durata come attesa."
      },
      {
        text: "Ripete l’RTS per conto del mittente schermato",
        explanation: "Grazie al CTS il terminale riceve già l’informazione necessaria. Ripetere l’RTS occuperebbe il mezzo che deve lasciare libero."
      }
    ]
  },
  {
    prompt: "Due stazioni si sentono e trovano il canale libero nello stesso momento. Perché il protocollo sorteggia un’attesa anziché farle partire entrambe alla fine della stessa pausa fissa?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · Il mezzo condiviso e il backoff" },
    options: [
      {
        text: "Per mettere d’accordo le due stazioni sullo stesso istante di trasmissione.",
        explanation: "Due partenze simultanee sullo stesso mezzo aumentano il rischio di collisione. L’attesa casuale cerca di separarle."
      },
      {
        text: "Per ridurre la probabilità che inizino a trasmettere nello stesso istante.",
        correct: true,
        explanation: "Se entrambe aspettassero lo stesso intervallo fisso, potrebbero ripartire insieme. Sorteggiare attese diverse riduce quella probabilità."
      },
      {
        text: "Per sostituire il controllo del canale con il solo ordine di arrivo dei frame.",
        explanation: "L’attesa casuale si aggiunge all’ascolto del canale. Il protocollo continua a usare le informazioni sul mezzo."
      },
      {
        text: "Per misurare con precisione una collisione mentre la stazione trasmette.",
        explanation: "L’attesa è preventiva. Il trasmettitore Wi-Fi discusso in lezione non si basa sulla rilevazione della collisione durante l’invio."
      }
    ]
  },
  {
    prompt: "Dopo il DIFS, A sorteggia due intervalli di backoff e B ne sorteggia cinque. Entrambe ascoltano il canale. Quando scade il timer di A, quale descrizione rispecchia i contatori e l’ordine di accesso?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · DIFS e attesa casuale" },
    options: [
      {
        text: "A può cominciare e a B restano tre intervalli del suo conteggio iniziale.",
        correct: true,
        explanation: "Mentre il mezzo rimane libero entrambe contano due intervalli. A arriva a zero e a B ne mancano cinque meno due, cioè tre."
      },
      {
        text: "A può cominciare e a B restano cinque intervalli del suo conteggio iniziale.",
        explanation: "I contatori procedono insieme mentre il mezzo è libero. B ha già contato due intervalli quando A arriva a zero."
      },
      {
        text: "B può cominciare e ad A restano tre intervalli del suo conteggio iniziale.",
        explanation: "B ha sorteggiato l’attesa più lunga e non può arrivare a zero per prima in queste condizioni."
      },
      {
        text: "Possono cominciare entrambe perché hanno osservato lo stesso DIFS.",
        explanation: "Il DIFS è la pausa comune. Dopo quella pausa sono i due valori casuali diversi a determinare quando ciascun contatore arriva a zero."
      }
    ]
  },
  {
    prompt: "Due stazioni estraggono lo stesso backoff, trasmettono insieme e non ricevono un ACK. Nel caso descritto dalla lezione che cosa succede al tentativo successivo?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · La finestra di contesa" },
    options: [
      {
        text: "Si riduce la finestra per far partire entrambe prima.",
        explanation: "Una finestra più piccola avvicina i valori possibili. Il meccanismo illustrato aumenta lo spazio di scelta."
      },
      {
        text: "Si riusa lo stesso valore, ma si scambiano i frame dei due mittenti.",
        explanation: "I mittenti conservano i propri dati. Per evitare una nuova partenza simultanea si estrae un nuovo backoff."
      },
      {
        text: "Si sospende l’uso del backoff per ritrasmettere in parallelo.",
        explanation: "La partenza simultanea ha già creato il problema. Il backoff resta parte del nuovo tentativo."
      },
      {
        text: "Aumenta la finestra da cui sorteggiano una nuova attesa.",
        correct: true,
        explanation: "Dopo il mancato ACK il modello fa usare una finestra più ampia. Si riduce la probabilità di sorteggiare di nuovo lo stesso valore."
      }
    ]
  },
  {
    prompt: "Una stazione termina l’invio di un frame dati e non vede arrivare l’ACK. Che cosa può concludere?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · Che cosa conferma l’ACK" },
    options: [
      {
        text: "Il frame è stato ricevuto con certezza, perché il mittente ha finito l’invio.",
        explanation: "Aver completato l’invio non prova la ricezione. La conferma appartiene al ricevitore."
      },
      {
        text: "Il frame è arrivato e il ricevitore ha rinviato deliberatamente la conferma.",
        explanation: "Senza ACK non c’è prova che il frame sia arrivato, né che la conferma sia stata rinviata."
      },
      {
        text: "La ricezione non è confermata. Può servire un nuovo tentativo.",
        correct: true,
        explanation: "L’ACK è il segnale di conferma. Se manca, il mittente non dà per riuscita la consegna."
      },
      {
        text: "Il ricevitore ha già ritrasmesso lo stesso frame al mittente.",
        explanation: "L’ACK era la conferma attesa. In sua assenza non si può concludere che il ricevitore abbia intrapreso un’altra azione."
      }
    ]
  },
  {
    prompt: "A e C parlano con un Access Point, ma una parete impedisce loro di ascoltarsi. Mentre A trasmette, C giudica libero il mezzo. Quale osservazione spiega l’errore di C?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa · Capire quando una stazione è nascosta" },
    options: [
      {
        text: "C misura lo stesso segnale ricevuto dall’Access Point, ma lo interpreta come un ACK.",
        explanation: "C e l’Access Point si trovano in punti diversi. Il modello descrive proprio un segnale di A che C non riceve in modo utile."
      },
      {
        text: "C misura ciò che arriva alla propria antenna. Il segnale di A può essere presente all’Access Point senza essere rilevabile da C.",
        correct: true,
        explanation: "Il nodo nascosto nasce da una visibilità diversa ai vari ricevitori. L’ascolto locale di C non rappresenta quello che arriva all’Access Point."
      },
      {
        text: "C riceve la trasmissione di A e conclude che il canale è libero perché condividono l’Access Point.",
        explanation: "Il problema nasce perché C non rileva la trasmissione di A. Condividerne il punto di accesso non rende uguale la ricezione."
      },
      {
        text: "C giudica il mezzo libero perché sta ricevendo un segnale più forte di quello dell’Access Point.",
        explanation: "Nel caso descritto non si misura un segnale utile di A a C. La differenza dipende dalla posizione e dalla parete."
      }
    ]
  },
  {
    prompt: "Nella prova con nodo nascosto l’Access Point conosce la durata richiesta da A e C sa quanto deve aspettare, pur non sentendo A. Quale coppia di messaggi spiega come arrivano le due informazioni?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa · L’avvio di uno scambio RTS/CTS" },
    options: [
      {
        text: "RTS da A all’Access Point, poi CTS dell’Access Point ricevuto anche da C.",
        correct: true,
        explanation: "A dichiara la durata nell’RTS. L’Access Point comunica la riserva con il CTS, che C può ricevere."
      },
      {
        text: "CTS da A all’Access Point, poi RTS dell’Access Point ricevuto anche da C.",
        explanation: "La richiesta iniziale è l’RTS. Il CTS è la risposta del punto di accesso che annuncia la riserva."
      },
      {
        text: "RTS da A a C, poi CTS da C all’Access Point.",
        explanation: "C è il nodo nascosto e non sente A. Per far arrivare la riserva a C interviene il punto di accesso."
      },
      {
        text: "RTS da A all’Access Point, poi ACK dell’Access Point ricevuto da C prima dei dati.",
        explanation: "L’RTS segnala la richiesta, ma C apprende la riserva dal CTS. L’ACK conferma la ricezione a scambio dati avvenuto."
      }
    ]
  },
  {
    prompt: "Si attiva RTS/CTS. L’Access Point riceve l’RTS di A, ma C non sente né A né il CTS. Quale previsione è coerente con il modello del nodo nascosto?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa · Gli effetti della riserva RTS/CTS" },
    options: [
      {
        text: "L’Access Point conosce la richiesta. C aspetta comunque, perché l’RTS aggiorna il NAV di tutte le stazioni.",
        explanation: "L’RTS non raggiunge C nel caso descritto. Una stazione non può usare una durata che non ha ricevuto."
      },
      {
        text: "L’Access Point ignora la richiesta. C trattiene i dati perché ha ricevuto la durata dall’RTS di A.",
        explanation: "L’Access Point ha ricevuto l’RTS. È C che non sente A e quindi non può usare l’RTS per attendere."
      },
      {
        text: "L’Access Point conosce la richiesta. Il successivo ACK può riservare il mezzo a C prima che A inizi a inviare i dati.",
        explanation: "L’ACK chiude lo scambio dopo i dati. La riserva preventiva per gli altri terminali è comunicata dal CTS."
      },
      {
        text: "L’Access Point conosce la richiesta. C può ancora partire perché non ha ricevuto la durata da rispettare.",
        correct: true,
        explanation: "L’RTS informa l’Access Point. Per rinviare i propri invii, C deve ricevere l’informazione di riserva dal CTS."
      }
    ]
  },
  {
    prompt: "Un terminale ha impostato il NAV dopo un CTS. Durante la riserva il suo ricevitore sente un intervallo di silenzio. Come si comporta nel modello della lezione?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa · NAV e ascolto del mezzo" },
    options: [
      {
        text: "Parte subito, perché un breve silenzio annulla il NAV.",
        explanation: "Il mezzo può risultare silenzioso per quel ricevitore, ma essere ancora riservato. Il NAV conserva l’informazione della durata."
      },
      {
        text: "Trasmette un ACK per dichiarare che ha osservato il silenzio.",
        explanation: "L’ACK conferma la ricezione dei dati da parte del destinatario. Non serve a dichiarare libero il canale."
      },
      {
        text: "Aspetta che scada la riserva indicata dal NAV.",
        correct: true,
        explanation: "Il terminale usa la durata comunicata nel CTS. Un breve silenzio locale non annulla la riserva in corso."
      },
      {
        text: "Trasforma la riserva in un cambio di frequenza e riprende a trasmettere.",
        explanation: "Il NAV tiene traccia di un tempo di attesa. Non imposta una frequenza alternativa."
      }
    ]
  },
  {
    prompt: "Due telefoni hanno ciascuno lo stesso volume di dati da inviare. Uno deve usare una modulazione più lenta a causa del segnale debole. A parità d’altro, chi occupa più tempo d’aria?",
    source: { href: "lezione-1-4.html#slide-3", label: "Ripassa · Tempo d’aria e stazioni lente" },
    options: [
      {
        text: "Il telefono a velocità maggiore, perché trasmette più bit ogni secondo.",
        explanation: "Trasmettere più bit al secondo riduce il tempo necessario a parità di dati."
      },
      {
        text: "Il telefono a velocità minore, perché impiega più tempo a inviare gli stessi dati.",
        correct: true,
        explanation: "Se i bit per secondo diminuiscono, la stessa quantità richiede più secondi sul mezzo condiviso."
      },
      {
        text: "Entrambi lo stesso tempo, perché la quantità di dati è uguale.",
        explanation: "La quantità è una parte del calcolo. Con velocità diverse cambia per quanto a lungo il mezzo resta occupato."
      },
      {
        text: "Dipende solo dall’ordine di accesso, anche se le velocità sono diverse.",
        explanation: "L’ordine dice chi inizia prima. Il tempo d’aria del singolo invio dipende anche dalla velocità."
      }
    ]
  },
  {
    prompt: "Un punto di accesso assegna a un dispositivo lento e a uno veloce lo stesso tempo d’aria. Che cosa prevede il principio dell’Airtime Fairness discusso nella lezione?",
    source: { href: "lezione-1-4.html#slide-3", label: "Ripassa · Airtime Fairness" },
    options: [
      {
        text: "Ricevono la stessa quota di tempo, ma il dispositivo veloce può inviare più dati.",
        correct: true,
        explanation: "L’uguaglianza è nel tempo di occupazione. Nello stesso intervallo il dispositivo veloce può trasmettere un numero maggiore di bit."
      },
      {
        text: "Ricevono lo stesso numero di bit, quindi il dispositivo lento usa più tempo.",
        explanation: "Il caso parla di quote di tempo uguali. Pareggiare i bit richiederebbe più tempo al dispositivo lento."
      },
      {
        text: "Ricevono la stessa velocità, perché hanno la stessa quota di accesso al mezzo.",
        explanation: "Una quota di tempo non modifica la qualità del segnale né la modulazione usata dai dispositivi."
      },
      {
        text: "Il dispositivo lento riceve più tempo per assicurare lo stesso risultato del veloce.",
        explanation: "Airtime Fairness limita proprio la differenza di tempo assegnato. Non promette lo stesso volume di dati."
      }
    ]
  },

  // Lezione 1.5 — OFDM, MIMO e modulazioni
  {
    prompt: "Nel simulatore un Access Point può inviare due flussi spaziali, ma il terminale passa da due flussi ricevibili a uno. Che cosa prevede il modello in modalità MIMO?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · Il limite dei flussi spaziali nel simulatore" },
    options: [
      {
        text: "Resta utilizzabile un flusso, perché il terminale non riesce più a separarne due.",
        correct: true,
        explanation: "Il numero utilizzabile è il minore tra quelli supportati ai due estremi. Con min(2, 1) resta un flusso."
      },
      {
        text: "Restano due flussi, perché per stabilirne il numero conta soltanto l’Access Point.",
        explanation: "Il trasmettitore può produrre due flussi, ma il ricevitore deve saperli distinguere. La capacità del terminale è il limite in questo caso."
      },
      {
        text: "Restano due flussi se l’Access Point assegna loro due gruppi di sottoportanti.",
        explanation: "I flussi confrontati nel simulatore sono spaziali e condividono il canale. Suddividere le sottoportanti descrive un meccanismo diverso."
      },
      {
        text: "Il numero di flussi dipende dalla direzione del fascio, quindi il limite del terminale non conta.",
        explanation: "Il diagramma del fascio descrive la distribuzione del segnale. La capacità di separare due flussi rimane un limite del terminale."
      }
    ]
  },
  {
    prompt: "A velocità di simbolo e codifica invariate, quale effetto produce il passaggio da 64-QAM a 256-QAM?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa le modulazioni QAM" },
    options: [
      {
        text: "Aumentano i bit per simbolo e il rumore pesa di meno",
        explanation: "I bit per simbolo aumentano, ma la maggiore vicinanza dei punti rende più facile confonderli in presenza di rumore."
      },
      {
        text: "Restano invariati i bit per simbolo e aumenta la portata",
        explanation: "Passare da 64 a 256 stati aumenta i bit per simbolo. La maggiore densità richiede condizioni radio migliori, specialmente a distanza."
      },
      {
        text: "Diminuiscono i bit per simbolo e aumenta la robustezza",
        explanation: "La costellazione più ampia rappresenta più bit per simbolo e rende più delicata la distinzione tra punti vicini."
      },
      {
        text: "Aumentano i bit per simbolo e serve un segnale più pulito",
        correct: true,
        explanation: "Più punti nella costellazione rappresentano più bit per simbolo. Con punti più vicini, il ricevitore ha bisogno di un rapporto tra segnale e rumore migliore."
      }
    ]
  },
  {
    prompt: "Il simulatore mostra più antenne e due flussi indipendenti inviati sullo stesso canale a un terminale. Qual è il vantaggio cercato in questa configurazione?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · Confrontare flussi spaziali e beamforming" },
    options: [
      {
        text: "Migliorare il segnale di un solo flusso coordinando le fasi.",
        explanation: "Questa descrizione corrisponde al beamforming della lezione. Qui il dato chiave è la presenza di due flussi indipendenti."
      },
      {
        text: "Dividere il tempo in due turni assegnati a terminali diversi.",
        explanation: "I flussi sono trasmessi nello stesso momento. La separazione riguarda il percorso spaziale, non due turni."
      },
      {
        text: "Trasportare più dati in parallelo con il multiplexing spaziale.",
        correct: true,
        explanation: "Con più flussi separabili il ricevitore ricostruisce dati distinti inviati nello stesso momento."
      },
      {
        text: "Ampliare la larghezza del canale in proporzione al numero di flussi.",
        explanation: "Il modello confronta flussi diversi sullo stesso canale. Non richiede di allargare lo spettro occupato."
      }
    ]
  },
  {
    prompt: "Confrontando il beamforming spento e acceso nel simulatore, si vede una direzione privilegiata verso il client. Quale conclusione è giustificata?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · Il diagramma di radiazione" },
    options: [
      {
        text: "Il dispositivo ha attivato necessariamente due flussi di dati diversi.",
        explanation: "La forma del diagramma descrive la direzione favorita. Da sola non indica quanti flussi siano in uso."
      },
      {
        text: "La combinazione dei segnali delle antenne favorisce la ricezione in una direzione.",
        correct: true,
        explanation: "Il diagramma mostra come cambia la distribuzione dell’energia quando si coordinano i segnali delle antenne."
      },
      {
        text: "La frequenza radio si sposta automaticamente verso il client.",
        explanation: "La direzione del segnale e la sua frequenza sono proprietà diverse. Qui cambia la distribuzione nello spazio."
      },
      {
        text: "Il sistema trasmette la stessa energia aggiuntiva in ogni direzione.",
        explanation: "Una direzione privilegiata mostra che l’effetto non è uniforme. Altre direzioni possono ricevere contributi diversi."
      }
    ]
  },
  {
    prompt: "Nel simulatore lasci attivo il beamforming e sposti il client dall’altro lato. Quale coppia di osservazioni è coerente con ciò che mostra lo schema?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · Beamforming e movimento del terminale" },
    options: [
      {
        text: "Cambia la direzione favorita dalle antenne, ma si continua a inviare lo stesso flusso.",
        correct: true,
        explanation: "Lo schema aggiorna il lobo in base alla posizione del terminale. L’obiettivo è migliorare la ricezione di un flusso già presente."
      },
      {
        text: "Cambia la direzione favorita e il movimento produce automaticamente un secondo flusso.",
        explanation: "Lo spostamento modifica la direzione favorita. Un secondo flusso richiede invece una configurazione di multiplexing spaziale."
      },
      {
        text: "Resta fissa la direzione favorita, ma il cambio di posizione produce due flussi separati.",
        explanation: "In modalità beamforming il lobo segue il client nello schema. Il movimento non aggiunge nuovi flussi."
      },
      {
        text: "Resta fissa la direzione favorita e il simulatore assegna un altro gruppo di frequenze al client.",
        explanation: "L’osservazione riguarda l’energia distribuita verso il terminale. Il simulatore non sta mostrando un’assegnazione OFDMA."
      }
    ]
  },
  {
    prompt: "In un grafico OFDM il picco di una sottoportante cade dove le sottoportanti vicine valgono zero. Perché questa osservazione è utile?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Sottoportanti e decodifica OFDM" },
    options: [
      {
        text: "Dimostra che le sottoportanti non occupano mai frequenze in comune.",
        explanation: "Le curve possono sovrapporsi. Gli zeri nei punti giusti sono proprio ciò che consente di separare i contributi."
      },
      {
        text: "Dimostra che le portanti devono essere trasmesse in tempi separati.",
        explanation: "L’ortogonalità consente di usare contemporaneamente le sottoportanti. Non è una separazione a turni."
      },
      {
        text: "Mostra che le portanti ripetono necessariamente gli stessi dati.",
        explanation: "La posizione degli zeri riguarda la separazione delle portanti. Non richiede che trasportino lo stesso simbolo."
      },
      {
        text: "Mostra come il ricevitore possa distinguere portanti con spettri sovrapposti.",
        correct: true,
        explanation: "Nel modello le sottoportanti sono ortogonali. La proprietà degli zeri permette di distinguerle pur occupando uno spettro sovrapposto."
      }
    ]
  },
  {
    prompt: "Nel modello passi da un’unica portante veloce a OFDM nello stesso canale. Quale cambiamento descrive la nuova trasmissione?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Da una portante a più sottoportanti" },
    options: [
      {
        text: "La portante resta una sola, ma cambia nome per ogni intervallo.",
        explanation: "La scomposizione in più sottoportanti è la caratteristica del modello OFDM."
      },
      {
        text: "Le sottoportanti diventano flussi spaziali e richiedono tutte antenne distinte.",
        explanation: "Le sottoportanti sono una suddivisione in frequenza. I flussi spaziali riguardano un altro meccanismo, il MIMO."
      },
      {
        text: "I dati sono distribuiti su più sottoportanti, ognuna a ritmo di simbolo più basso.",
        correct: true,
        explanation: "OFDM usa portanti parallele relativamente lente al posto di una sola portante veloce."
      },
      {
        text: "Le antenne trasmettono a turno in modo da produrre una sottoportante unica.",
        explanation: "Il modello usa più sottoportanti in parallelo. L’alternanza delle antenne non realizza quella suddivisione."
      }
    ]
  },
  {
    prompt: "In un locale il ricevitore può distinguere due percorsi radio dei segnali trasmessi da più antenne. Come può sfruttare questa condizione il MIMO spaziale discusso in lezione?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Percorsi multipli e MIMO" },
    options: [
      {
        text: "Può trattare i percorsi come nuovi nomi di rete e ordinare i pacchetti per SSID.",
        explanation: "I percorsi influenzano i segnali ricevuti sulla stessa rete. I nomi di rete non separano i flussi spaziali."
      },
      {
        text: "Può usare le differenze tra i percorsi per separare più flussi di dati.",
        correct: true,
        explanation: "Quando i percorsi sono abbastanza distinguibili, aiutano il ricevitore a ricostruire flussi spaziali diversi."
      },
      {
        text: "Deve eliminare ogni segnale riflesso prima di poter riconoscere flussi diversi.",
        explanation: "La lezione mostra anche il caso in cui percorsi multipli distinguibili aiutano il MIMO."
      },
      {
        text: "Può aumentare i bit per simbolo senza considerare il rapporto segnale-rumore.",
        explanation: "Separare i flussi è un vantaggio spaziale. La scelta della modulazione dipende ancora dalle condizioni del segnale."
      }
    ]
  },
  {
    prompt: "Un collegamento funziona con 1024-QAM vicino al punto di accesso. Quando il ricevitore si allontana, il segnale più disturbato rende difficili da distinguere i simboli. Quale adattamento è coerente con la tabella?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Robustezza delle modulazioni" },
    options: [
      {
        text: "Usare una costellazione meno densa, accettando meno bit per simbolo.",
        correct: true,
        explanation: "Con meno stati i punti sono più facili da distinguere. Si rinuncia a parte della velocità per aumentare la robustezza."
      },
      {
        text: "Usare una costellazione più densa, così i simboli sono più separati.",
        explanation: "A parità di scala, una costellazione più densa avvicina i punti. Richiede condizioni migliori, non peggiori."
      },
      {
        text: "Mantenere la stessa costellazione, perché la velocità di simbolo non è cambiata.",
        explanation: "Il ritmo di simboli può rimanere uguale mentre peggiora la possibilità di distinguerli. La costellazione più robusta aiuta proprio su questo punto."
      },
      {
        text: "Usare una costellazione più densa, così ciascun simbolo trasporta meno bit.",
        explanation: "Una costellazione più densa rappresenta più stati e più bit per simbolo. Non realizza il compromesso cercato."
      }
    ]
  },
  {
    prompt: "Due trasmissioni usano lo stesso numero di simboli al secondo. Una usa 16-QAM, l’altra 64-QAM. Che cosa prevede il confronto senza considerare codifica ed errori?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Bit per simbolo e velocità di simbolo" },
    options: [
      {
        text: "La 16-QAM trasporta più dati perché i punti della costellazione sono più distanti.",
        explanation: "La maggiore distanza può aiutare la robustezza. Nel confronto senza errori conta il numero di bit per simbolo."
      },
      {
        text: "Le due trasmissioni trasportano gli stessi dati, perché hanno lo stesso ritmo di simboli.",
        explanation: "Un simbolo può rappresentare un numero diverso di bit. Il ritmo da solo non fissa la quantità di dati."
      },
      {
        text: "La 64-QAM trasporta più dati perché aumenta il numero di simboli al secondo.",
        explanation: "Il ritmo di simboli è uguale per ipotesi. Cambiano i bit rappresentati da ciascun simbolo."
      },
      {
        text: "La 64-QAM può trasportare più dati nello stesso tempo perché codifica più bit per simbolo.",
        correct: true,
        explanation: "La tabella assegna 4 bit per simbolo alla 16-QAM e 6 alla 64-QAM. A pari ritmo, la seconda porta più bit."
      }
    ]
  },
  {
    prompt: "A parità di codifica, tra 1024-QAM e 4096-QAM il numero di stati quadruplica. Di quanto cresce l’informazione contenuta in un simbolo?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Dimensioni delle costellazioni QAM" },
    options: [
      {
        text: "Di 4 bit per simbolo.",
        explanation: "Quattro è il fattore tra il numero di stati. Il numero di bit cresce di 2 perché la relazione è una potenza di due."
      },
      {
        text: "Di 1 bit per simbolo.",
        explanation: "Un bit aggiunge un raddoppio degli stati. Qui gli stati quadruplicano e quindi servono due bit in più."
      },
      {
        text: "Di 2 bit per simbolo.",
        correct: true,
        explanation: "La tabella passa da 10 a 12 bit. Quadruplicare gli stati equivale a moltiplicare per 2 due volte."
      },
      {
        text: "Di 10 bit per simbolo.",
        explanation: "Dieci è il numero di bit di partenza. La domanda chiede la differenza rispetto ai 12 bit della 4096-QAM."
      }
    ]
  },
  {
    prompt: "Nello schema mantieni la suddivisione del canale in sottoportanti OFDM ma cambi la costellazione da 256-QAM a 1024-QAM. Quale elemento hai modificato?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Distinguere OFDM e modulazione QAM" },
    options: [
      {
        text: "Il numero di sottoportanti, che deve quadruplicare con gli stati QAM.",
        explanation: "Gli stati QAM sono i simboli possibili. Non determinano il numero di sottoportanti assegnate al canale."
      },
      {
        text: "I simboli che possono essere rappresentati da ciascuna sottoportante.",
        correct: true,
        explanation: "La costellazione decide quali simboli una portante può rappresentare. La domanda mantiene invece la stessa suddivisione in frequenza."
      },
      {
        text: "La suddivisione in gruppi assegnati a utenti distinti.",
        explanation: "Ripartire risorse fra più terminali è il meccanismo OFDMA discusso nella lezione precedente. Qui si cambia soltanto la costellazione."
      },
      {
        text: "La direzione del fascio prodotto dalle antenne.",
        explanation: "La direzione dipende dal coordinamento delle antenne. Cambiare costellazione modifica la rappresentazione dei simboli."
      }
    ]
  },

  // Lezione 1.6 — Copertura e sicurezza Wi-Fi
  {
    prompt: "A parità di distanza, antenne e potenza trasmessa, si sposta un Access Point dietro un’ulteriore parete. Come cambia il bilancio di collegamento?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa il bilancio di collegamento" },
    options: [
      {
        text: "La potenza ricevuta sale per la perdita aggiuntiva",
        explanation: "Le perdite si sottraggono. Aggiungere un valore di attenuazione aumenta la perdita complessiva."
      },
      {
        text: "La potenza ricevuta scende per la perdita aggiuntiva",
        correct: true,
        explanation: "Nel bilancio si sottraggono le perdite da ostacoli. A condizioni invariate, aggiungere una parete abbassa il segnale ricevuto."
      },
      {
        text: "La potenza ricevuta resta uguale perché la distanza è fissa",
        explanation: "La distanza riguarda l’attenuazione di spazio libero. La parete entra come perdita aggiuntiva."
      },
      {
        text: "La potenza ricevuta segue soltanto la potenza trasmessa",
        explanation: "Una stessa potenza trasmessa può dare livelli ricevuti diversi quando cambiano le perdite lungo il percorso."
      }
    ]
  },
  {
    prompt: "In due postazioni si riceve la stessa potenza Wi-Fi, ma nella seconda c’è più rumore radio. Che cosa cambia nella seconda?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa il rapporto segnale-rumore nel simulatore" },
    options: [
      {
        text: "Il rapporto segnale-rumore diminuisce",
        correct: true,
        explanation: "Il segnale utile è uguale. Un fondo di rumore più alto lascia meno separazione tra rumore e segnale, quindi peggiora il rapporto."
      },
      {
        text: "Il rapporto segnale-rumore aumenta",
        explanation: "Il rumore è il termine contro cui si confronta il segnale. A segnale uguale, più rumore fa scendere il rapporto."
      },
      {
        text: "Aumenta la potenza utile ricevuta",
        explanation: "La potenza utile è uguale per ipotesi. Cambia il rumore che si somma in ricezione."
      },
      {
        text: "Diminuisce l’attenuazione degli ostacoli",
        explanation: "La differenza indicata riguarda il rumore ricevuto, da tenere distinto dalle perdite dovute agli ostacoli."
      }
    ]
  },
  {
    prompt: "In un bilancio ricevi più guadagno d’antenna ma aggiungi un ostacolo. In entrambi i casi la variazione vale 3 dB, con tutto il resto uguale. Qual è l’effetto netto sulla potenza ricevuta nel modello?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Guadagni e perdite del collegamento" },
    options: [
      {
        text: "La potenza ricevuta cresce di 6 dB.",
        explanation: "Il guadagno va sommato, ma la perdita dovuta all’ostacolo va sottratta."
      },
      {
        text: "La potenza ricevuta scende di 6 dB.",
        explanation: "Solo l’ostacolo è una perdita. Il guadagno compensa il suo effetto nel modello."
      },
      {
        text: "La potenza ricevuta cresce di 3 dB.",
        explanation: "Questo risultato considera soltanto il guadagno. Bisogna includere anche i 3 dB di perdita."
      },
      {
        text: "La potenza ricevuta resta invariata.",
        correct: true,
        explanation: "Il guadagno si aggiunge e la perdita si sottrae. Con +3 dB e −3 dB la variazione totale è zero."
      }
    ]
  },
  {
    prompt: "La soglia di progetto è −67 dBm. Nel corridoio misuri −64 dBm e nell’aula −70 dBm. Quali sono i margini di segnale nelle due postazioni, nell’ordine indicato?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Soglia e margine di copertura" },
    options: [
      {
        text: "−3 dB nel corridoio e +3 dB nell’aula.",
        explanation: "Hai sottratto il livello ricevuto dalla soglia, invertendo il segno. Il corridoio è sopra soglia e l’aula è sotto."
      },
      {
        text: "+3 dB in entrambe le postazioni.",
        explanation: "Le due distanze dalla soglia hanno lo stesso valore assoluto, ma il margine è negativo quando il segnale è sotto soglia."
      },
      {
        text: "+3 dB nel corridoio e −3 dB nell’aula.",
        correct: true,
        explanation: "Si sottrae la soglia da ciascun valore. Nel corridoio −64 − (−67) vale +3 dB e nell’aula −70 − (−67) vale −3 dB."
      },
      {
        text: "0 dB nel corridoio e −6 dB nell’aula.",
        explanation: "Questi riferimenti usano il livello del corridoio come soglia. Per i margini di progetto si confronta invece ciascuna postazione con −67 dBm."
      }
    ]
  },
  {
    prompt: "Due Access Point coprono la stessa zona, ma la scheda di configurazione del secondo indica WPA3-Personal al posto di WPA2-Personal. Quale indicazione conferma la differenza nella protezione del collegamento?",
    source: { href: "lezione-1-6.html#slide-2", label: "Ripassa · Il confronto tra WPA2-Personal e WPA3-Personal" },
    options: [
      {
        text: "Sul primo è indicato SAE come meccanismo di autenticazione del WPA2-Personal.",
        explanation: "Nella tabella SAE è associato a WPA3-Personal, cioè al secondo punto di accesso."
      },
      {
        text: "Sul secondo è indicato SAE come meccanismo di autenticazione.",
        correct: true,
        explanation: "La tabella associa SAE a WPA3-Personal. Il meccanismo riguarda l’autenticazione, mentre condizioni radio simili possono dare la stessa copertura."
      },
      {
        text: "Sul secondo è indicato uno standard radio più recente, ma le impostazioni di autenticazione sono uguali.",
        explanation: "La generazione Wi-Fi e il metodo di autenticazione descrivono aspetti distinti. Va controllata l’impostazione che riguarda la protezione."
      },
      {
        text: "Sui due punti di accesso è indicato lo stesso SSID, quindi devono usare lo stesso metodo di autenticazione.",
        explanation: "L’SSID è il nome della rete. Da solo non permette di identificare il metodo di autenticazione impostato."
      }
    ]
  },
  {
    prompt: "Nel simulatore la perdita di una parete leggera vale 3 dB e quella di una parete in cemento vale 12 dB. Nella stessa tratta sostituisci la parete leggera con quella in cemento. Quale differenza ottieni?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Pareti e perdite nel simulatore" },
    options: [
      {
        text: "La potenza ricevuta scende di 9 dB.",
        correct: true,
        explanation: "La perdita passa da 3 a 12 dB. L’aumento della perdita è 9 dB e nel bilancio si sottrae."
      },
      {
        text: "La potenza ricevuta scende di 15 dB.",
        explanation: "Quindici sarebbe la perdita delle due pareti insieme. Qui una parete sostituisce l’altra."
      },
      {
        text: "La potenza ricevuta scende di 12 dB.",
        explanation: "Dodici è la perdita finale della parete. Per confrontare le due prove bisogna sottrarre i 3 dB che c’erano già."
      },
      {
        text: "La potenza ricevuta sale di 9 dB.",
        explanation: "Il cambiamento aggiunge attenuazione. Il valore ricevuto diminuisce invece di aumentare."
      }
    ]
  },
  {
    prompt: "Nel simulatore aumenti la distanza fra Access Point e ricevitore e mantieni invariati materiali e numero delle pareti. Quale termine cambia direttamente?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Attenuazione di spazio libero e ostacoli" },
    options: [
      {
        text: "La perdita delle pareti cresce in proporzione alla distanza.",
        explanation: "Nel simulatore la perdita da pareti dipende dal loro numero e dal tipo. Entrambi sono rimasti invariati."
      },
      {
        text: "Il guadagno dell’antenna diminuisce perché c’è più spazio fra gli apparati.",
        explanation: "Il guadagno è un termine separato. È la propagazione sul tratto più lungo a cambiare."
      },
      {
        text: "Il rumore diminuisce perché il trasmettitore è più lontano.",
        explanation: "Nella simulazione il rumore è un valore separato. Cambiare distanza modifica direttamente la perdita di propagazione."
      },
      {
        text: "La perdita di spazio libero aumenta.",
        correct: true,
        explanation: "La perdita di spazio libero dipende dalla distanza nella simulazione. La perdita attribuita alle pareti resta uguale."
      }
    ]
  },
  {
    prompt: "In un sopralluogo applichi il metodo del simulatore. Misuri una potenza ricevuta di −62 dBm e un fondo di rumore di −88 dBm. Quale rapporto segnale-rumore ricavi?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Segnale e rumore nel simulatore" },
    options: [
      {
        text: "−26 dB.",
        explanation: "Questo valore si ottiene sottraendo il segnale dal rumore. L’ordine richiesto è segnale meno rumore."
      },
      {
        text: "150 dB.",
        explanation: "Hai sommato i valori assoluti. Per il rapporto, il simulatore usa la differenza tra i livelli."
      },
      {
        text: "26 dB.",
        correct: true,
        explanation: "Si sottrae il livello di rumore dal livello del segnale. −62 − (−88) vale 26 dB."
      },
      {
        text: "26 dBm.",
        explanation: "Il valore numerico è giusto, ma la differenza fra due livelli in dBm si esprime in dB."
      }
    ]
  },
  {
    prompt: "Il progetto del simulatore chiede segnale di almeno −67 dBm e rapporto segnale-rumore di almeno 25 dB. Una postazione misura −64 dBm e 18 dB di rapporto. Quale valutazione è corretta?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Controllare entrambi gli obiettivi di copertura" },
    options: [
      {
        text: "Entrambi gli obiettivi sono raggiunti perché il segnale è sopra soglia.",
        explanation: "Anche con un livello ricevuto sufficiente, il rumore può essere troppo alto. I due controlli vanno fatti separatamente."
      },
      {
        text: "Il segnale supera la soglia, ma il rapporto segnale-rumore è insufficiente.",
        correct: true,
        explanation: "−64 è maggiore di −67, mentre 18 è inferiore a 25. La postazione soddisfa soltanto uno dei due obiettivi."
      },
      {
        text: "Nessuno dei due obiettivi è raggiunto perché −64 è minore di −67.",
        explanation: "−64 è più vicino allo zero e quindi maggiore di −67. È il rapporto segnale-rumore a essere insufficiente."
      },
      {
        text: "Il rapporto è sufficiente, ma il livello di segnale è troppo basso.",
        explanation: "Il livello è sopra soglia e il rapporto è sotto il proprio obiettivo. L’alternativa scambia le due verifiche."
      }
    ]
  },
  {
    prompt: "Un punto di accesso aziendale supporta una modalità WPS con PIN e l’inserimento manuale delle credenziali. Si configura una stampante una sola volta. Quale scelta riduce il rischio discusso nella lezione senza cambiare la copertura?",
    source: { href: "lezione-1-6.html#slide-2", label: "Ripassa · WPS e configurazione sicura" },
    options: [
      {
        text: "Disattivare l’accesso WPS tramite PIN e configurare le credenziali manualmente.",
        correct: true,
        explanation: "La lezione distingue l’accesso facilitato con PIN dalla configurazione ordinaria con credenziali. Togliere quella modalità riduce il rischio associato al PIN."
      },
      {
        text: "Lasciare attivo il PIN e aumentare solo la lunghezza della password Wi-Fi.",
        explanation: "Una password più lunga può aiutare la protezione ordinaria, ma lascia ancora disponibile la modalità con PIN discussa nella lezione."
      },
      {
        text: "Mantenere il PIN e passare a un canale radio più lontano dai vicini.",
        explanation: "Scegliere il canale può ridurre interferenze. Non cambia i metodi consentiti per accedere alla rete."
      },
      {
        text: "Lasciare il PIN attivo e cambiare soltanto il nome della rete.",
        explanation: "Modificare i nomi non disabilita la modalità WPS con PIN sul punto di accesso. Il rischio segnalato resta presente."
      }
    ]
  },
  {
    prompt: "In un sopralluogo si riceve il Wi-Fi della scuola anche dal cortile. Sai che la posizione dei punti di accesso influisce sulla copertura. Quale coppia di interventi riduce prima il rischio di lettura dei dati e poi la copertura oltre le aule?",
    source: { href: "lezione-1-6.html#slide-2", label: "Ripassa · Copertura e cifratura rispondono a esigenze diverse" },
    options: [
      {
        text: "Spostare i punti di accesso verso l’interno. Attivare la cifratura per ridurre il segnale che esce dall’edificio.",
        explanation: "Il riposizionamento riguarda la copertura. La protezione dei dati riguarda la cifratura, che non assorbe la potenza radio."
      },
      {
        text: "Lasciare invariato il protocollo di protezione. Ridurre il numero di utenti che condividono il canale.",
        explanation: "Il numero di utenti influisce sull’accesso al mezzo. Non protegge da solo la lettura dei dati e non affronta come si propaga il segnale."
      },
      {
        text: "Attivare la cifratura. Cambiare il nome della rete in modo da ridurre la copertura esterna.",
        explanation: "La prima misura protegge il contenuto. Cambiare il nome della rete non modifica il percorso delle onde radio."
      },
      {
        text: "Usare una protezione moderna con cifratura. Riesaminare poi la posizione dei punti di accesso sulla planimetria.",
        correct: true,
        explanation: "La cifratura riguarda la leggibilità dei dati. Posizione, distanza e ostacoli contribuiscono invece a determinare dove il segnale arriva."
      }
    ]
  },
  {
    prompt: "Un vecchio dispositivo supporta soltanto WEP. Il resto della rete usa WPA3 e la priorità è mantenere una protezione adeguata. Quale decisione è coerente con la tabella della lezione?",
    source: { href: "lezione-1-6.html#slide-2", label: "Ripassa · Scegliere un protocollo di protezione" },
    options: [
      {
        text: "Passare tutta la rete a WEP con una password più lunga.",
        explanation: "WEP ha debolezze nel protocollo. Una password più lunga non rende equivalente la sua protezione."
      },
      {
        text: "Usare WEP con un nome di rete diverso per separare i dispositivi nuovi.",
        explanation: "La separazione del nome non corregge le debolezze di WEP. Il traffico di quella rete continuerebbe a usare una protezione obsoleta."
      },
      {
        text: "Sostituire il dispositivo con uno compatibile e mantenere WPA3 sulla rete.",
        correct: true,
        explanation: "La tabella indica WEP come obsoleto e WPA3 come protezione da preferire fra quelle discusse. Sostituire il dispositivo risolve il problema di compatibilità."
      },
      {
        text: "Passare tutta la rete a WPA con TKIP, anche se il dispositivo supporta solo WEP.",
        explanation: "La tabella sconsiglia WPA con TKIP. Inoltre il dispositivo descritto non supporta quella modalità."
      }
    ]
  },
  // Preparazione alla seconda prova
  {
    prompt: "In cortile il segnale migliora spostando il ricevitore di poco. La potenza trasmessa è costante. Quale spiegazione è coerente?",
    source: { href: "lezione-1-5.html#fading", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Il contributo delle onde diretta e riflessa cambia.", correct: true, explanation: "La nuova posizione cambia il modo in cui le onde si sommano." },
      { text: "Il trasmettitore aumenta la potenza.", explanation: "La potenza trasmessa è dichiarata costante." },
      { text: "Il cavo si accorcia.", explanation: "Lo spostamento del ricevitore riguarda il percorso radio dell’esempio." },
      { text: "La soglia del ricevitore cambia.", explanation: "La soglia è una caratteristica del ricevitore nelle condizioni date." }
    ]
  },
  {
    prompt: "Due antenne sono in punti separati. In un punto il segnale cala molto, nell’altro arriva bene. Che misura può aiutare?",
    source: { href: "lezione-1-5.html#fading", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Usare la ricezione offerta dalla seconda antenna.", correct: true, explanation: "In posizioni diverse le riflessioni possono produrre cali diversi." },
      { text: "Spostare entrambe le antenne nel punto del calo.", explanation: "Quel punto è già risultato sfavorevole." },
      { text: "Accorciare il messaggio.", explanation: "Ridurre i dati da inviare non cambia il livello ricevuto in quel punto." },
      { text: "Aggiungere un ostacolo alla linea diretta.", explanation: "Un nuovo ostacolo può aggiungere attenuazione e richiede una verifica." }
    ]
  },
  {
    prompt: "Il margine stimato è 8 dB prima di conteggiare due cavi da 2 dB e 1 dB. Quanto resta?",
    source: { href: "lezione-1-6.html#ponte-aperto", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "5 dB", correct: true, explanation: "Le perdite dei cavi si sommano e si sottraggono al margine." },
      { text: "8 dB", explanation: "I cavi aggiungono 3 dB di perdita." },
      { text: "11 dB", explanation: "La perdita dei cavi va sottratta." },
      { text: "7 dB", explanation: "Conta entrambi i cavi." }
    ]
  },
  {
    prompt: "Un collegamento all’aperto passa da 8 dB di margine a una condizione con 10 dB di perdita in più. Qual è l’esito?",
    source: { href: "lezione-1-6.html#ponte-aperto", label: "Ripassa il passaggio della lezione" },
    options: [
      { text: "Il segnale è 2 dB sotto soglia.", correct: true, explanation: "Il margine diventa 8 − 10 = −2 dB." },
      { text: "Rimangono 2 dB di riserva.", explanation: "Il segno del margine è negativo." },
      { text: "Il margine resta a 8 dB.", explanation: "Sottrai la perdita aggiuntiva." },
      { text: "Il margine sale a 18 dB.", explanation: "Una perdita riduce il margine." }
    ]
  },
  // Quattro domande aggiuntive per ciascuna lezione
  {
    id: "n01",
    prompt: "La scuola sostituisce un tratto Ethernet con un collegamento Wi-Fi. Che cosa cambia a livello fisico?",
    source: { href: "lezione-1-1.html#slide-1", label: "Ripassa · Il livello fisico" },
    options: [
      { text: "Il mezzo trasmissivo e il modo in cui si rappresenta il segnale", correct: true, explanation: "Il livello fisico riguarda il segnale e il mezzo, in questo caso le onde radio." },
      { text: "Il formato dell’indirizzo IP della postazione", explanation: "Gli indirizzi IP appartengono al livello di rete." },
      { text: "Il modo in cui il router sceglie la rete di destinazione", explanation: "La scelta della destinazione riguarda il livello di rete." },
      { text: "Il protocollo usato per richiedere una pagina web", explanation: "Le richieste web appartengono al livello applicativo." }
    ]
  },
  {
    id: "n02",
    prompt: "Due access point indipendenti di edifici diversi mostrano entrambi «Ospiti». Basta quell’indizio per concludere che fanno parte della stessa rete ESS?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · BSS ed ESS" },
    options: [
      { text: "Sì, se sono entrambi sulla stessa banda", explanation: "Reti indipendenti possono usare la stessa banda." },
      { text: "Sì, se hanno la stessa potenza", explanation: "La potenza non indica a quale rete appartiene una cella." },
      { text: "No, il nome da solo non dice se le celle appartengono alla stessa rete", correct: true, explanation: "Lo stesso SSID può essere usato da reti indipendenti." },
      { text: "No, perché in una ESS ogni cella deve avere un nome di rete diverso", explanation: "Le celle di un ESS possono condividere il nome di rete." }
    ]
  },
  {
    id: "n03",
    prompt: "Il Wi-Fi «Laboratorio» compare nell’elenco di due dispositivi. L’access point risulta associato soltanto al primo. Che cosa può dire il tecnico riguardo al secondo?",
    source: { href: "lezione-1-1.html#slide-3", label: "Ripassa · La scoperta e l’associazione" },
    options: [
      { text: "Ha già ottenuto un indirizzo IP attraverso quella cella", explanation: "Vedere la rete non dimostra che il dispositivo abbia ricevuto un indirizzo IP." },
      { text: "Ha concluso l’associazione perché vede il nome", explanation: "L’associazione richiede uno scambio ulteriore con il punto di accesso." },
      { text: "È associato a quella cella se vede lo stesso SSID del primo", explanation: "Lo stesso nome può essere rilevato anche da un dispositivo non associato." },
      { text: "Ha rilevato la rete, mentre la rilevazione da sola non dimostra l’associazione", correct: true, explanation: "Ricevere gli annunci della rete e risultare associati sono passaggi distinti." }
    ]
  },
  {
    id: "n04",
    prompt: "Un gruppo vuole fornire ai terminali Wi-Fi accesso a un server collegato via cavo alla rete del laboratorio. Quale elemento serve nello schema in modalità infrastruttura?",
    source: { href: "lezione-1-1.html#slide-2", label: "Ripassa · Le topologie WLAN" },
    options: [
      { text: "Un’altra scheda Wi-Fi sul server, al posto della scheda Ethernet", explanation: "Il server può continuare a usare Ethernet." },
      { text: "Un access point collegato alla rete cablata", correct: true, explanation: "L’access point collega la cella Wi-Fi alla rete cablata." },
      { text: "Un indirizzo IP uguale per tutti i terminali", explanation: "Assegnare lo stesso indirizzo IP ai terminali creerebbe un conflitto." },
      { text: "Un terminale che trasmetta periodicamente il nome del gruppo", explanation: "Annunciare il nome non collega la WLAN alla rete cablata." }
    ]
  },
  {
    id: "n05",
    prompt: "Quale confronto è più adatto per capire se il collo di bottiglia è il Wi-Fi di un’aula oppure la connessione Internet della scuola?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · Velocità teorica e reale" },
    options: [
      { text: "Due speed test via Wi-Fi verso siti diversi", explanation: "Entrambe le misure attraversano Internet e includono la tratta esterna." },
      { text: "Due trasferimenti da telefono in aule diverse", explanation: "Cambiando aula cambia anche il collegamento radio." },
      { text: "Un trasferimento verso un server locale e uno verso Internet, dalla stessa postazione", correct: true, explanation: "La prova locale evita la tratta Internet, così si può confrontare l’effetto della tratta esterna." },
      { text: "Una lettura della velocità nominale e del numero di dispositivi registrati", explanation: "I valori nominali non misurano il rendimento effettivo delle due tratte." }
    ]
  },
  {
    id: "n06",
    prompt: "Quale situazione rende particolarmente utile suddividere il canale tra utenti nello stesso intervallo, come fa OFDMA?",
    source: { href: "lezione-1-2.html#slide-3", label: "Ripassa · OFDMA" },
    options: [
      { text: "Un solo computer invia un archivio e tutti gli altri sono inattivi", explanation: "Con un solo terminale attivo non serve ripartire il canale fra utenti." },
      { text: "Molti terminali inviano piccoli messaggi nello stesso periodo", correct: true, explanation: "Assegnare gruppi di sottoportanti a utenti diversi è utile con più piccoli flussi contemporanei." },
      { text: "Due terminali cablati scaricano lo stesso video", explanation: "Il traffico interamente cablato non usa il canale Wi-Fi." },
      { text: "Un portatile deve scegliere quale rete memorizzare", explanation: "Memorizzare una rete non richiede di servire più utenti nello stesso intervallo." }
    ]
  },
  {
    id: "n07",
    prompt: "Un sensore invia brevi misure a orari concordati e può dormire tra un invio e l’altro. Quale funzione della tabella risponde a questa esigenza?",
    source: { href: "lezione-1-2.html#slide-1", label: "Ripassa · Le funzioni degli standard Wi-Fi" },
    options: [
      { text: "Target Wake Time", correct: true, explanation: "Target Wake Time permette di concordare i periodi di attività del dispositivo." },
      { text: "Multi-Link Operation", explanation: "Multi-Link Operation riguarda l’uso di più collegamenti radio." },
      { text: "Selezione dinamica della frequenza", explanation: "La selezione dinamica riguarda la scelta della frequenza." },
      { text: "Beamforming", explanation: "Il beamforming dirige meglio il segnale verso il ricevitore." }
    ]
  },
  {
    id: "n08",
    prompt: "La velocità utile misurata rimane costante. Perché l’indicazione «collegamento nominale più veloce» da sola non permette di prevedere un trasferimento più breve?",
    source: { href: "lezione-1-2.html#slide-2", label: "Ripassa · La velocità effettiva" },
    options: [
      { text: "Perché un trasferimento locale dipende sempre dal provider Internet", explanation: "Un trasferimento verso un server locale può restare nella rete della scuola." },
      { text: "Perché la dimensione del file va divisa per il numero di antenne", explanation: "Il numero di antenne non cambia la dimensione del file." },
      { text: "Perché il tempo dipende soltanto dalla frequenza radio", explanation: "La frequenza radio, da sola, non determina il flusso effettivo di dati." },
      { text: "Perché per lo stesso file conta la velocità effettiva con cui passano i dati", correct: true, explanation: "A parità di file, il tempo dipende dal flusso utile misurato." }
    ]
  },
  {
    id: "n09",
    prompt: "Nel modello nominale due canali da 40 MHz hanno i centri a 30 MHz di distanza. Che cosa si ricava?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · La sovrapposizione dei canali" },
    options: [
      { text: "Non si sovrappongono", explanation: "La distanza tra i centri è inferiore alla larghezza del canale." },
      { text: "Si sovrappongono di 10 MHz", correct: true, explanation: "Ogni blocco si estende di 20 MHz dal centro verso l’altro. La parte comune è 40 − 30 MHz." },
      { text: "Si sovrappongono di 20 MHz", explanation: "Venti megahertz sono la semilarghezza di un blocco, non la larghezza della zona comune." },
      { text: "Si sovrappongono di 30 MHz", explanation: "Trenta megahertz sono la distanza tra i centri." }
    ]
  },
  {
    id: "n10",
    prompt: "Nel modello due canali da 20 MHz su 2,4 GHz hanno i centri distanti quattro passi da 5 MHz. Quale affermazione descrive i due blocchi nominali?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · I canali a 2,4 GHz" },
    options: [
      { text: "Si sovrappongono per 5 MHz", explanation: "La distanza tra i centri è pari alla larghezza del canale." },
      { text: "Lasciano 5 MHz di spazio tra loro", explanation: "Ci sarebbe uno spazio libero se la distanza tra i centri superasse 20 MHz." },
      { text: "Hanno lo stesso centro", explanation: "I centri sono separati di quattro passi." },
      { text: "I bordi si toccano, senza una larghezza comune", correct: true, explanation: "Quattro passi sono 20 MHz, pari alla larghezza di un blocco." }
    ]
  },
  {
    id: "n11",
    prompt: "Un punto di accesso passa a un canale di frequenza centrale quasi uguale ma con banda più larga. Quale verifica diventa importante per le reti vicine?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · La larghezza dei canali" },
    options: [
      { text: "Misurare se hanno cambiato nome", explanation: "Il nome non indica lo spettro occupato." },
      { text: "Contare quante di loro usano indirizzi IP privati", explanation: "Gli indirizzi IP non determinano le frequenze radio utilizzate." },
      { text: "Controllare se i bordi del nuovo canale invadono altre porzioni di spettro occupate", correct: true, explanation: "Anche con centro simile, un canale più largo raggiunge frequenze più lontane dal centro." },
      { text: "Controllare se il router ha cambiato l’indirizzo di rete", explanation: "L’indirizzo del router non indica i bordi del canale radio." }
    ]
  },
  {
    id: "n12",
    prompt: "Due access point usano lo stesso canale e si sentono. Un terzo è su un canale sufficientemente separato. Quale differenza ci si aspetta nel modello della lezione?",
    source: { href: "lezione-1-3.html#slide-1", label: "Ripassa · La scelta del canale" },
    options: [
      { text: "I primi due condividono il tempo d’aria, mentre il terzo non compete sul loro canale", correct: true, explanation: "La condivisione del tempo d’aria riguarda le trasmissioni sullo stesso canale udibile." },
      { text: "I primi due formano automaticamente una sola rete", explanation: "Usare lo stesso canale non basta a formare un’unica rete." },
      { text: "Il terzo deve aspettare entrambi perché usa la stessa banda", explanation: "Due canali sufficientemente separati possono appartenere alla stessa banda." },
      { text: "Il terzo deve avere un SSID diverso per poter trasmettere", explanation: "Il nome di rete non determina quando il canale è disponibile." }
    ]
  },
  {
    id: "n13",
    prompt: "Una stazione ha ancora due intervalli di attesa quando un’altra inizia a trasmettere. Che cosa fa il suo contatore di backoff nel modello della lezione?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · L’attesa casuale" },
    options: [
      { text: "Arriva a zero mentre il canale è occupato", explanation: "Il contatore si aggiorna negli intervalli liberi." },
      { text: "Torna sempre al valore estratto all’inizio", explanation: "Il valore residuo viene conservato durante l’occupazione del canale." },
      { text: "Si azzera per permettere di inviare appena torna il silenzio", explanation: "Azzerarlo salterebbe gli intervalli di attesa che restano." },
      { text: "Si ferma e riprende dai due intervalli rimasti quando il canale torna disponibile", correct: true, explanation: "Il contatore scende soltanto negli intervalli liberi previsti dal protocollo." }
    ]
  },
  {
    id: "n14",
    prompt: "A e B si sentono e attendono di inviare. A vince il sorteggio e comincia a trasmettere. Quale osservazione indica che l’ascolto del canale sta funzionando?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · L’ascolto del canale" },
    options: [
      { text: "B rimanda l’invio mentre sente la trasmissione di A", correct: true, explanation: "Una stazione che sente il mezzo occupato rinvia l’accesso." },
      { text: "B inizia comunque a trasmettere dopo il primo intervallo occupato", explanation: "B deve rinviare l’invio mentre sente il canale occupato." },
      { text: "B manda un ACK anche se non era il destinatario", explanation: "La conferma è inviata dal destinatario del frame." },
      { text: "A cambia canale appena B termina la sua attesa", explanation: "Il meccanismo descritto regola l’accesso al canale corrente." }
    ]
  },
  {
    id: "n15",
    prompt: "In una prova con frame molto brevi e senza nodi nascosti, quale costo introdurrebbe usare sempre RTS/CTS?",
    source: { href: "lezione-1-4.html#slide-2", label: "Ripassa · RTS e CTS" },
    options: [
      { text: "Aumenterebbe la distanza fisica tra i terminali", explanation: "I messaggi di controllo non cambiano la posizione dei terminali." },
      { text: "Spenderebbe tempo d’aria anche per i messaggi di controllo", correct: true, explanation: "Lo scambio RTS/CTS richiede tempo oltre alla trasmissione dei dati." },
      { text: "Dimezzerebbe la frequenza centrale del canale", explanation: "Lo scambio ha luogo sul canale già usato dalla rete." },
      { text: "Richiederebbe un secondo access point per ogni terminale", explanation: "RTS e CTS non richiedono un access point aggiuntivo per ogni terminale." }
    ]
  },
  {
    id: "n16",
    prompt: "Una traccia mostra il frame ricevuto correttamente dall’access point e l’ACK inviato, ma il mittente non riceve l’ACK. Che comportamento può osservare il tecnico?",
    source: { href: "lezione-1-4.html#slide-1", label: "Ripassa · La conferma di ricezione" },
    options: [
      { text: "Il mittente registra sempre l’operazione come completata", explanation: "Senza conferma, il mittente non sa se il frame è arrivato." },
      { text: "Il mittente cambia obbligatoriamente rete", explanation: "Una conferma mancata può portare a un nuovo tentativo nella stessa rete." },
      { text: "Il mittente può ritentare anche se l’access point aveva ricevuto il frame", correct: true, explanation: "Il mittente usa l’ACK come conferma. Se gli manca, può ritentare." },
      { text: "L’access point deve cambiare indirizzo per mandare un nuovo ACK", explanation: "L’indirizzo del punto di accesso non deve cambiare per confermare una ricezione." }
    ]
  },
  {
    id: "n17",
    prompt: "Un’immagine mostra molte sottoportanti in un solo canale. Un compagno conclude che servano altrettante antenne. Quale risposta distingue correttamente OFDM e MIMO?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · MIMO e i flussi spaziali" },
    options: [
      { text: "Le sottoportanti dividono le risorse in frequenza. Più antenne possono invece consentire più flussi spaziali", correct: true, explanation: "Sottoportanti in frequenza e flussi spaziali sono due concetti diversi." },
      { text: "Ogni sottoportante richiede una propria antenna ricevente", explanation: "Una singola antenna può ricevere un segnale con più sottoportanti." },
      { text: "In OFDM ogni antenna deve usare un canale separato", explanation: "OFDM suddivide un canale in sottoportanti." },
      { text: "Il numero di sottoportanti indica direttamente quanti flussi spaziali riceve il terminale", explanation: "I flussi spaziali dipendono dalle antenne e dal canale radio." }
    ]
  },
  {
    id: "n18",
    prompt: "Un access point usa più antenne e continua a inviare gli stessi dati su un solo flusso. Dopo un intervento il segnale migliora nella direzione del ricevitore. Quale meccanismo si accorda con il risultato?",
    source: { href: "lezione-1-5.html#slide-1", label: "Ripassa · Il beamforming" },
    options: [
      { text: "Aumento del numero dei flussi spaziali verso il ricevitore", explanation: "La traccia specifica che il numero di flussi resta uno." },
      { text: "Divisione delle sottoportanti fra nuovi utenti", explanation: "Dividere le sottoportanti tra utenti non spiega il miglioramento in una direzione." },
      { text: "Regolazione delle fasi dei segnali delle antenne con il beamforming", correct: true, explanation: "Il beamforming può migliorare il segnale in una direzione anche con un solo flusso." },
      { text: "Uso di un nuovo SSID per ciascuna antenna", explanation: "Il nome della rete non modifica la somma dei segnali radio." }
    ]
  },
  {
    id: "n19",
    prompt: "A parità di numero di simboli al secondo e di codifica, quale coppia indica i bit per simbolo per 16-QAM e 256-QAM, rispettivamente?",
    source: { href: "lezione-1-5.html#slide-2", label: "Ripassa · Le modulazioni QAM" },
    options: [
      { text: "2 e 4", explanation: "Per rappresentare 16 stati servono già quattro bit." },
      { text: "4 e 8", correct: true, explanation: "Quattro bit identificano 16 stati, otto bit ne identificano 256." },
      { text: "8 e 16", explanation: "Con otto bit si rappresentano già 256 stati." },
      { text: "16 e 256", explanation: "Sedici e 256 sono numeri di stati della modulazione." }
    ]
  },
  {
    id: "n20",
    prompt: "A parità di potenza trasmessa, spostando il ricevitore di poco il segnale cala invece di crescere. Che cosa può succedere tra il percorso diretto e uno riflesso?",
    source: { href: "lezione-1-5.html#fading", label: "Ripassa · Il fading" },
    options: [
      { text: "I due percorsi devono aver cambiato frequenza centrale", explanation: "Anche alla stessa frequenza il cambio di posizione può modificare le fasi relative." },
      { text: "Il percorso riflesso impone un secondo indirizzo IP", explanation: "Una riflessione non cambia l’indirizzamento IP." },
      { text: "Il percorso diretto annulla qualsiasi riflessione", explanation: "I contributi diretto e riflesso si sommano al ricevitore." },
      { text: "I segnali possono arrivare con fasi che li fanno sommare in modo meno favorevole", correct: true, explanation: "Il contributo delle riflessioni può rinforzare o indebolire il segnale." }
    ]
  },
  {
    id: "n21",
    prompt: "La potenza ricevuta è −69 dBm e la soglia è −67 dBm. Un intervento migliora il segnale di 4 dB. Qual è il nuovo margine rispetto alla soglia?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Il margine di collegamento" },
    options: [
      { text: "−6 dB", explanation: "Quattro decibel di miglioramento vanno aggiunti al margine iniziale di −2 dB." },
      { text: "+2 dB", correct: true, explanation: "Il segnale sale a −65 dBm, quindi supera la soglia di 2 dB." },
      { text: "+4 dB", explanation: "Questo valore indica il miglioramento, non il margine risultante." },
      { text: "+6 dB", explanation: "Il margine iniziale era negativo, quindi 4 dB di guadagno bastano a portarlo a +2 dB." }
    ]
  },
  {
    id: "n22",
    prompt: "Le mappe mostrano una potenza ricevuta simile in due aule. Una ha però un fondo di rumore più alto e più ritrasmissioni. Quale misura aiuta a spiegare la differenza?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Segnale e rumore" },
    options: [
      { text: "Il nome di rete", explanation: "Il nome della rete non misura il rumore radio." },
      { text: "La lunghezza della password", explanation: "La password non misura le condizioni del canale radio." },
      { text: "L’indirizzo del router", explanation: "L’indirizzo del router non descrive la qualità del segnale." },
      { text: "Il rapporto segnale-rumore", correct: true, explanation: "A parità di segnale, più rumore riduce il rapporto segnale-rumore." }
    ]
  },
  {
    id: "n23",
    prompt: "La scuola sposta un access point verso l’interno. I terminali autorizzati continuano a funzionare bene e dal cortile il segnale è più debole. Che cosa resta necessario per proteggere le comunicazioni Wi-Fi?",
    source: { href: "lezione-1-6.html#slide-2", label: "Ripassa · La sicurezza Wi-Fi" },
    options: [
      { text: "Una protezione della rete con autenticazione e cifratura", correct: true, explanation: "Una copertura più contenuta limita la portata, mentre autenticazione e cifratura proteggono gli accessi e le comunicazioni." },
      { text: "Una potenza di trasmissione maggiore verso il cortile", explanation: "Aumentare il segnale verso il cortile non protegge le comunicazioni." },
      { text: "Un nome di rete uguale a quello di tutti gli edifici vicini", explanation: "Assegnare un nome uguale non autentica gli utenti e non cifra i dati." },
      { text: "Un canale largo il doppio", explanation: "La larghezza di canale riguarda lo spettro e la capacità di trasmissione." }
    ]
  },
  {
    id: "n24",
    prompt: "Per la modalità A si ricevono −70 dBm e la soglia è −75 dBm. Per la modalità B si ricevono −65 dBm e la soglia è −67 dBm. Quale modalità ha il margine maggiore?",
    source: { href: "lezione-1-6.html#slide-1", label: "Ripassa · Il margine di collegamento" },
    options: [
      { text: "B, perché il segnale è più forte", explanation: "Il segnale va confrontato con la soglia della modalità corrispondente." },
      { text: "B, perché la sua soglia è più alta", explanation: "Per B la differenza fra −65 e −67 dBm è 2 dB." },
      { text: "A, perché il suo margine è 5 dB contro 2 dB", correct: true, explanation: "Il margine si calcola confrontando ciascun segnale con la soglia della sua modalità." },
      { text: "Le due modalità hanno lo stesso margine", explanation: "Per A il confronto dà 5 dB e per B dà 2 dB." }
    ]
  }
];

QuizAllenamento.init(document.getElementById('training-quiz'), domandeAllenamento);
