# Domande aperte ed esercizi · Modulo 1 Wi-Fi

Banca di dieci domande aperte ed esempi di esercizi. Le indicazioni di correzione sono per il docente.

## Dieci domande aperte tra cui scegliere

### 1. Dal cavo al Wi-Fi

Un portatile passa dal cavo al Wi-Fi e continua a comunicare con lo stesso server. Indica quali livelli del modello ISO/OSI sono coinvolti nel passaggio e spiega che cosa cambia a ciascuno di questi livelli. Spiega anche quale ruolo ha il punto di accesso nel collegamento alla rete cablata.

**Per la correzione.** Mezzo radio e segnale, frame e accesso al mezzo, collegamento con Ethernet, distinzione dai livelli superiori. [Lezione 1.1](../../modulo1/lezione-1-1.html#slide-1)

### 2. Una rete con più celle

In una scuola più punti di accesso mostrano lo stesso nome. Spiega che cosa sono una cella e una rete composta da più celle, come un portatile scopre la rete e che cosa deve succedere prima che risulti associato. Spiega anche perché spostandosi può cambiare cella pur vedendo lo stesso nome.

**Per la correzione.** BSS, BSSID, SSID ed ESS, scoperta e fasi di accesso nel modello della lezione, cambio di cella. [Lezione 1.1](../../modulo1/lezione-1-1.html#slide-2)

### 3. Wi-Fi in una classe affollata

Una classe ha molti terminali che inviano piccoli messaggi. Spiega come OFDMA può assegnare parti del canale a più terminali nello stesso intervallo. Spiega poi perché la velocità nominale da sola dice poco su quello che misura ogni studente.

**Per la correzione.** Gruppi di sottoportanti, assegnazione a più terminali, efficienza con piccoli flussi, tempo d’aria e differenza tra velocità nominale e utile. [Lezione 1.2](../../modulo1/lezione-1-2.html#slide-3)

### 4. Scelta della banda e del canale

Devi configurare il Wi-Fi per un locale vicino al punto di accesso e per un locale separato da più pareti. Spiega come valuteresti le bande a 2,4, 5 e 6 GHz e come sceglieresti il canale tenendo conto anche delle reti vicine. Indica che cosa misureresti per controllare la scelta.

**Per la correzione.** Copertura e ostacoli, disponibilità di spettro, compatibilità dei terminali, larghezza e sovrapposizione dei canali, misure sul posto. [Lezione 1.3](../../modulo1/lezione-1-3.html#slide-2)

### 5. Due terminali vogliono trasmettere

Due portatili cercano di inviare dati allo stesso punto di accesso quasi nello stesso momento. Spiega come il Wi-Fi riduce il rischio di partenza contemporanea e come il mittente capisce se ritentare. Descrivi anche che cosa accade al conto di attesa di chi trova il canale occupato.

**Per la correzione.** Ascolto del canale, attesa casuale, pausa del contatore, ACK e nuovo tentativo. [Lezione 1.4](../../modulo1/lezione-1-4.html#slide-1)

### 6. Il nodo nascosto

Due terminali raggiungono lo stesso punto di accesso, ma una parete impedisce loro di sentirsi. Spiega perché ascoltare il canale può non bastare, come intervengono RTS e CTS e quale costo ha usarli anche quando la situazione è semplice.

**Per la correzione.** Nodo nascosto, collisione al ricevitore, riserva del canale e tempo per i messaggi di controllo. [Lezione 1.4](../../modulo1/lezione-1-4.html#slide-2)

### 7. MIMO, beamforming e OFDM

Un access point usa più antenne. Spiega la differenza tra inviare più flussi con MIMO e dirigere meglio il segnale con il beamforming. Spiega che cosa limita il numero di flussi e a che cosa servono le sottoportanti OFDM in quello stesso collegamento.

**Per la correzione.** Flussi spaziali, capacità di entrambi i lati, controllo delle fasi, separazione tra risorse spaziali e in frequenza. [Lezione 1.5](../../modulo1/lezione-1-5.html#slide-1)

### 8. Modulazione e riflessioni

Vicino al punto di accesso un portatile usa una modulazione con molti stati. Allontanandosi passa a una con meno stati e il segnale varia anche con piccoli spostamenti. Spiega il rapporto fra numero di stati, bit per simbolo e sensibilità al disturbo. Descrivi come le riflessioni possono spiegare le variazioni.

**Per la correzione.** Stati più vicini, compromesso tra velocità e robustezza, somma dei percorsi e fading. [Lezione 1.5](../../modulo1/lezione-1-5.html#slide-2)

### 9. Stessa potenza, collegamenti diversi

Due aule mostrano una potenza Wi-Fi simile, ma in una la connessione è instabile. Descrivi come valuteresti il collegamento distinguendo segnale, soglia e rumore. Indica come useresti un sopralluogo per decidere dove intervenire e per verificare il risultato.

**Per la correzione.** Potenza ricevuta, margine rispetto alla soglia, rapporto segnale-rumore, misure in più punti e confronto prima e dopo. [Lezione 1.6](../../modulo1/lezione-1-6.html#slide-1)

### 10. Copertura e sicurezza

Il Wi-Fi scolastico si riceve anche dal cortile. Spiega come interverresti sulla copertura e come proteggeresti accesso e comunicazioni. Motiva la scelta confrontando WEP, WPA2 e WPA3 secondo quanto visto a lezione.

**Per la correzione.** Sopralluogo e posizione dei punti di accesso, autenticazione e cifratura, superamento di WEP, scelta e compatibilità della protezione. [Lezione 1.6](../../modulo1/lezione-1-6.html#slide-2)

**Sorteggio per la verifica Wi-Fi.** Al primo avvio ogni alunno riceve due domande distinte estratte a caso tra la 2, la 5, la 6 e la 7. Alla ripresa ritrova la stessa coppia nello stesso ordine. Tutte e dieci le domande sono valide e restano disponibili per usi futuri.

## Esercizi con caselle per i risultati

Per ogni alunno si sorteggia un esercizio di trasferimento e uno di copertura, ciascuno tra due tracce. Sul sito compaiono i dati estratti e le caselle dei risultati con le unità. L’alunno usa la virgola o il punto decimale e svolge i calcoli sul foglio. Il tempo di trasferimento accetta uno scarto del ±3% dal risultato prima dell’arrotondamento. Velocità utile, potenza ricevuta e margine richiedono il valore esatto.

### Esercizio 1 · Trasferimento di un file

Una postazione del laboratorio trasferisce un video sulla rete locale. Assumi che la velocità utile resti costante e usa **1 MB = 8 Mbit**. Calcola la velocità utile e il tempo di trasferimento.

| Traccia | Dimensione del video | Velocità nominale Wi-Fi | Percentuale utile |
| --- | --- | --- | --- |
| 1 | 450 MB | 240 Mbit/s | 65% |
| 2 | 480 MB | 250 Mbit/s | 68% |

| Passaggio della correzione | Traccia 1 | Traccia 2 |
| --- | --- | --- |
| Velocità utile | 240 × 0,65 = **156 Mbit/s** | 250 × 0,68 = **170 Mbit/s** |
| Conversione della dimensione | 450 × 8 = 3 600 Mbit | 480 × 8 = 3 840 Mbit |
| Tempo di trasferimento | 3 600 ÷ 156 ≈ **23,08 s** | 3 840 ÷ 170 ≈ **22,59 s** |

### Esercizio 2 · Copertura oltre una parete

Un access point trasmette verso un terminale. Sul percorso c’è una parete che introduce una perdita aggiuntiva. Calcola la potenza ricevuta e il margine rispetto alla soglia.

| Traccia | Potenza trasmessa | Guadagno trasmittente | Guadagno ricevente | Perdita sul percorso | Perdita della parete | Soglia |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 17 dBm | 3 dBi | 2 dBi | 75 dB | 12 dB | −67 dBm |
| 2 | 18 dBm | 4 dBi | 2 dBi | 77 dB | 13 dB | −69 dBm |

| Passaggio della correzione | Traccia 1 | Traccia 2 |
| --- | --- | --- |
| Perdita totale | 75 + 12 = 87 dB | 77 + 13 = 90 dB |
| Potenza ricevuta | 17 + 3 + 2 − 87 = **−65 dBm** | 18 + 4 + 2 − 90 = **−66 dBm** |
| Margine rispetto alla soglia | −65 − (−67) = **+2 dB** | −66 − (−69) = **+3 dB** |
