const aperteDocente = [
  {
    "title": "Una rete con più celle",
    "prompt": "In una scuola più punti di accesso mostrano lo stesso nome. Spiega che cosa sono una cella e una rete composta da più celle, come un portatile scopre la rete e che cosa deve succedere prima che risulti associato. Spiega anche perché spostandosi può cambiare cella pur vedendo lo stesso nome.",
    "model": "Una cella (BSS) è formata da un punto di accesso e dai dispositivi associati a esso. Il BSSID identifica quella cella. Più celle collegate che offrono la stessa rete formano un ESS e possono mostrare lo stesso nome, l’SSID. Il portatile scopre la rete ascoltando gli annunci periodici (beacon) oppure inviando una richiesta di ricerca e aspettando una risposta. Scelta la cella, esegue lo scambio iniziale di autenticazione previsto e chiede l’associazione. Il punto di accesso deve accettarla. Quando si sposta, il portatile può associarsi a una cella con un altro BSSID e lo stesso SSID.",
    "rubric": [
      {
        "text": "Distingue cella (BSS), identificativo della cella (BSSID), rete di più celle (ESS) e nome (SSID).",
        "points": 3
      },
      {
        "text": "Spiega la scoperta passiva tramite beacon e quella attiva tramite richiesta e risposta.",
        "points": 2
      },
      {
        "text": "Descrive lo scambio iniziale di autenticazione e la richiesta di associazione accettata dal punto di accesso.",
        "points": 3
      },
      {
        "text": "Spiega il passaggio a un’altra cella con BSSID diverso e SSID uguale.",
        "points": 2
      }
    ]
  },
  {
    "title": "Due terminali vogliono trasmettere",
    "prompt": "Due portatili cercano di inviare dati allo stesso punto di accesso quasi nello stesso momento. Spiega come il Wi-Fi riduce il rischio di partenza contemporanea e come il mittente capisce se ritentare. Descrivi anche che cosa accade al conto di attesa di chi trova il canale occupato.",
    "model": "Prima di trasmettere, i portatili ascoltano il canale. Quando è libero da un tempo sufficiente, scalano un contatore scelto a caso. Parte il dispositivo il cui contatore arriva a zero. Se il canale si occupa, l’altro congela il contatore e riprende dal valore rimasto quando il canale torna libero da un tempo sufficiente. Questo riduce la probabilità che partano insieme. Se il mittente riceve l’ACK, che è la conferma del ricevitore, considera riuscito l’invio. Se l’ACK non arriva entro il tempo previsto, può ritentare dopo una nuova attesa.",
    "rubric": [
      {
        "text": "Spiega che ogni terminale ascolta il canale prima di trasmettere.",
        "points": 2
      },
      {
        "text": "Descrive l’attesa casuale e la trasmissione quando il contatore arriva a zero.",
        "points": 3
      },
      {
        "text": "Indica che il contatore si congela con canale occupato e riparte dal valore rimasto.",
        "points": 3
      },
      {
        "text": "Spiega che l’ACK conferma la ricezione e che la sua assenza può portare a un nuovo tentativo.",
        "points": 2
      }
    ]
  },
  {
    "title": "Il nodo nascosto",
    "prompt": "Due terminali raggiungono lo stesso punto di accesso, ma una parete impedisce loro di sentirsi. Spiega perché ascoltare il canale può non bastare, come intervengono RTS e CTS e quale costo ha usarli anche quando la situazione è semplice.",
    "model": "I due terminali non si sentono tra loro, quindi ciascuno può trovare il canale libero mentre l’altro sta trasmettendo. I due segnali possono sovrapporsi al punto di accesso. Il terminale che vuole inviare manda un RTS al punto di accesso e aspetta il suo CTS. L’altro terminale può sentire il CTS e rimandare l’invio per la durata indicata. In questo modo si riduce il rischio che i dati si sovrappongano. RTS e CTS occupano tempo sul canale e riducono la velocità utile quando le collisioni sono già poco probabili.",
    "rubric": [
      {
        "text": "Spiega perché un terminale può rilevare il canale come libero mentre l’altro trasmette e dove può avvenire la collisione.",
        "points": 3
      },
      {
        "text": "Indica che il mittente invia RTS e il punto di accesso risponde con CTS.",
        "points": 2
      },
      {
        "text": "Spiega che il terminale nascosto può sentire il CTS e rinvia l’invio per la durata indicata.",
        "points": 3
      },
      {
        "text": "Spiega che i due messaggi di controllo consumano tempo e possono ridurre la velocità utile.",
        "points": 2
      }
    ]
  },
  {
    "title": "MIMO, beamforming e OFDM",
    "prompt": "Un access point usa più antenne. Spiega la differenza tra inviare più flussi con MIMO e dirigere meglio il segnale con il beamforming. Spiega che cosa limita il numero di flussi e a che cosa servono le sottoportanti OFDM in quello stesso collegamento.",
    "model": "Il MIMO può inviare più flussi di dati indipendenti nello stesso canale usando più antenne. Il ricevitore deve riuscire a separarli. Il numero di flussi è limitato da quanti ne supportano sia il trasmettitore sia il ricevitore e da quanto il canale radio permette di distinguerli. Con il beamforming, il punto di accesso coordina i segnali delle antenne, regolando le loro fasi per farli sommare meglio verso il dispositivo. Con OFDM il canale è diviso in molte sottoportanti che trasportano parti dei dati in parallelo. Le sottoportanti dividono le risorse in frequenza, mentre i flussi MIMO sfruttano la dimensione spaziale.",
    "rubric": [
      {
        "text": "Spiega che MIMO può trasportare più flussi spaziali indipendenti nello stesso canale.",
        "points": 3
      },
      {
        "text": "Riconosce i limiti di trasmettitore e ricevitore e la necessità di separare i flussi.",
        "points": 2
      },
      {
        "text": "Spiega che il beamforming coordina le antenne per migliorare il segnale verso il dispositivo.",
        "points": 3
      },
      {
        "text": "Spiega che OFDM usa sottoportanti in frequenza e le distingue dai flussi spaziali.",
        "points": 2
      }
    ]
  }
];
