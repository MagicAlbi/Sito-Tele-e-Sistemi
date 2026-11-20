# Completamento del sito di Telecomunicazioni 5A

## Obiettivo

Entro il 31 marzo 2027 la 5A Telecomunicazioni dell’IIS J.C. Maxwell di Nichelino deve aver completato la modulazione AM/FM rimasta dalla quarta e svolto i Moduli 1–5 di quinta. Usare i materiali esistenti per il Modulo 1 e preparare i Moduli 2–5 prima del loro uso in classe. Da aprile, dedicare il tempo restante alla preparazione dell’esame, con un ripasso sulle antenne verso fine anno.

## Decisioni prese

- La 5A inizia subito dal Wi-Fi. Usare l’ora di lunedì e le due di mercoledì per svolgere il Modulo 1 con i materiali del sito, inclusi una breve prova di copertura proiettata e un controllo finale. Se il giovedì è utilizzabile, estendere la prova con l’esercitazione a coppie.
- L’ordine in classe è Wi-Fi, WAN, recupero AM/FM, trasmissione digitale, reti mobili e reti convergenti. Il passaggio da Wi-Fi a WAN segue il percorso dei dati dalla rete locale verso Internet. AM/FM introduce portante, ampiezza e frequenza subito prima di ASK e FSK, le modulazioni digitali che usano variazioni di ampiezza e frequenza. Preparare i materiali dei Moduli 2–5 man mano che servono in classe. Ogni pubblicazione richiede l’approvazione del docente.
- Orario di Telecomunicazioni della 5A. Lunedì 1 ora in aula, mercoledì 2 ore in aula, giovedì 3 ore di laboratorio. Il calendario si basa sulle tre ore certe in aula. I giovedì sono disponibili per attività concordate con l’ITP, per esempio misure semplici con Arduino se già alla sua portata. Le ore di Sistemi e Reti restano fuori dal conteggio.
- La fonte didattica è `Materiali/Programmazione - Telecomunicazioni 5A Tele.docx`, nella cartella di progetto che contiene `sito`. Le foto dell’indice del libro, nella stessa cartella `Materiali`, sono un riferimento integrativo.
- `Materiali/Programmazione - Telecomunicazioni 4A Tele.docx` indica AM, varianti DSB-SC e SSB, FM, confronto AM/FM e principi di modulazione e demodulazione. Per il ripasso d’esame, prevedere diagramma di radiazione, guadagno e tipi di antenna. Proposta di 2–3 ore verso fine anno, da collocare nel calendario di preparazione all’esame.
- Stima del percorso compatto in aula. Le ore includono spiegazioni, esempi, brevi attività guidate e controlli. La programmazione di dipartimento serve a individuare gli argomenti. I materiali del sito conservano tutte le lezioni, i laboratori e le verifiche previsti.

  | Modulo | Argomento | Lezioni indicate in home | Ore stimate | Fine in classe proposta |
  | --- | --- | ---: | ---: | --- |
  | 1 | Reti locali wireless | 6 | 3 | 25 novembre 2026 |
  | 2 | Sistemi di accesso remoto e reti WAN | 5 | 8 | 16 dicembre 2026 |
  | Quarta | Recupero AM/FM | — | 5 | 20 gennaio 2027 |
  | 3 | Tecniche di trasmissione digitali | 6 | 11 | 22 febbraio 2027 |
  | 4 | Sistemi di comunicazione in mobilità | 4 | 6 | 8 marzo 2027 |
  | 5 | Reti convergenti multiservizio | 5 | 5 | 17 marzo 2027 |
  | | **Totale** | | **38** | |

- Dal 23 novembre al 31 marzo il calendario regionale lascia 44 ore in aula di lunedì e mercoledì. Il percorso ne usa 38 e ne riserva 6. Eventuali sospensioni aggiuntive del Maxwell e attività della 5A sono da verificare. [Calendario scolastico 2026/27 della Regione Piemonte](https://www.regione.piemonte.it/web/temi/istruzione-formazione-lavoro/istruzione/calendario-scolastico-2026-2027)

- Per il Modulo 2 erano previste cinque lezioni su interfacce DTE/DCE, accessi WAN, xDSL e fibra, protocolli di linea e introduzione al routing. La classe conosce IP e subnetting. Il routing parte da zero.
- Mantenere la grafica blu del sito e i colori dei singoli moduli, compreso il viola del Modulo 2. Usare le funzioni già presenti per quiz, presentazione sulla LIM, progressi e tema. Nel Modulo 1 lo schema 2D del beamforming resta quello principale e il 3D è una variante facoltativa già collegata alla lezione.
- Nelle pagine esistono già i collegamenti della home ai Moduli 2–5. Le pagine di destinazione vanno create con i rispettivi moduli. Per ogni fase restano in vigore le approvazioni definite in `AGENTS.md`.

## Fasi

| N. | Fase | Dipende da | Stato | Fatta il |
| --- | --- | --- | --- | --- |
| 1 | Mappa delle lezioni e delle attività | — | fatta | 20 novembre 2026 |
| 2 | Modulo 2 · interfacce, WAN e accessi | 1 | da fare | — |
| 3 | Modulo 2 · protocolli e routing | 2 | da fare | — |
| 4 | Modulo 2 · laboratorio e verifica | 3 | da fare | — |
| 5 | Modulo 3 · modello digitale e teoria dell’informazione | 1 | da fare | — |
| 6 | Modulo 3 · tecniche e applicazioni | 5 | da fare | — |
| 7 | Modulo 3 · laboratorio e verifica | 6 | da fare | — |
| 8 | Modulo 4 · lezioni sulle reti mobili | 1 | da fare | — |
| 9 | Modulo 4 · laboratorio e verifica | 8 | da fare | — |
| 10 | Modulo 5 · lezioni sulle reti convergenti | 1 | da fare | — |
| 11 | Modulo 5 · laboratorio e verifica | 10 | da fare | — |
| 12 | Controllo finale del sito | 4, 7, 9, 11 | da fare | — |

## Prompt di apertura

Copia il blocco della fase richiesta in una nuova chat aperta nella cartella `sito`.

```text
Fase 1 del piano in piani/telecomunicazioni-5a/PIANO.md. Mappa delle lezioni e delle attività.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 1. Esegui solo la fase 1. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 2 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 2 · interfacce, WAN e accessi.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 2. Esegui solo la fase 2. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 3 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 2 · protocolli e routing.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 3. Esegui solo la fase 3. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 4 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 2 · laboratorio e verifica.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 4. Esegui solo la fase 4. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 5 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 3 · modello digitale e teoria dell’informazione.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 5. Esegui solo la fase 5. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 6 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 3 · tecniche e applicazioni.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 6. Esegui solo la fase 6. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 7 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 3 · laboratorio e verifica.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 7. Esegui solo la fase 7. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 8 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 4 · lezioni sulle reti mobili.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 8. Esegui solo la fase 8. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 9 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 4 · laboratorio e verifica.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 9. Esegui solo la fase 9. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 10 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 5 · lezioni sulle reti convergenti.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 10. Esegui solo la fase 10. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 11 del piano in piani/telecomunicazioni-5a/PIANO.md. Modulo 5 · laboratorio e verifica.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 11. Esegui solo la fase 11. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

```text
Fase 12 del piano in piani/telecomunicazioni-5a/PIANO.md. Controllo finale del sito.
Usa $piani-a-fasi. Leggi AGENTS.md, il piano e il dettaglio della fase 12. Esegui solo la fase 12. Porta a termine i criteri, salvo che serva una mia decisione. Registra esito e stato nel piano. Per commit e pubblicazione segui AGENTS.md.
```

## Dettaglio delle fasi

Per le fasi che producono lezioni, ogni pagina deve avere una sintesi iniziale, un esempio o esercizio, un quiz funzionante e una modalità presentazione che si può avviare, usare e chiudere da tastiera. Verifica con il browser e verifica i calcoli eseguendoli. Per le fasi di laboratorio e verifica, prova almeno un caso del laboratorio con esito atteso e controlla la correzione del quiz e la stampa delle domande aperte. Usa dati di fantasia.

### 1. Mappa delle lezioni e delle attività

- **Produce** una mappa per i Moduli 2–5 con obiettivi, ordine, esercitazioni e verifiche, un calendario per AM/FM e i cinque moduli fino al 31 marzo 2027 e una proposta per il ripasso sulle antenne nel periodo d’esame.
- **Leggi** le programmazioni di quarta e quinta con `markitdown`, la home e l’indice del Modulo 1. Consulta l’indice del libro dove serve.
- **Criteri** Ogni voce della programmazione dei Moduli 2–5 rimanda a una lezione o a un’attività. Ogni lezione prevista dalla home ha titolo e obiettivo. Ogni modulo ha un’attività di laboratorio e una verifica associate a obiettivi della mappa. L’xDSL nel Modulo 3 richiama il Modulo 2 e ne sviluppa gli aspetti di trasmissione digitale.
- **Criteri per il calendario** Parti dalle stime interne e verifica giorni e ore effettive, comprese le 3 ore settimanali di laboratorio. Metti per primo il Modulo 1 in forma compatta usando i materiali esistenti. Dopo le WAN e prima della trasmissione digitale, inserisci il recupero AM/FM con un confronto pratico fra le due modulazioni e un controllo finale. Per ogni modulo associa date o settimane a lezioni, laboratorio, verifica e disponibilità dei materiali. Riserva almeno 6 ore per recuperi o imprevisti. Verifica che attività e margine rientrino nell’orario utile. Se c’è uno scarto, quantificalo e sottoponi al docente una proposta per restare entro marzo. Colloca il ripasso sulle antenne nella preparazione d’esame, dopo marzo.
- **Esito** Mappati gli argomenti delle programmazioni di quarta e quinta sulle 20 lezioni dei Moduli 2–5, i laboratori, le verifiche e il recupero AM/FM. Verificati i riferimenti del Wi-Fi e il calendario compatto. Sulle 44 ore da orario e calendario regionale, 38 sono assegnate e 6 restano libere. Da verificare ulteriori sospensioni della 5A e disponibilità dei giovedì. La proposta compatta è pronta per la revisione del docente. Prossima fase, 2.1–2.3 sulle reti WAN.

#### Wi-Fi nella prima settimana

Usare i materiali del [Modulo 1](../../modulo1/index.html) lunedì 23 e mercoledì 25 novembre. Le sei pagine restano disponibili per approfondire.

| In aula | Minuti | Pagine e attività |
| --- | ---: | --- |
| Lunedì · Collegarsi al Wi-Fi | 60 | [1.1](../../modulo1/lezione-1-1.html) e [1.2](../../modulo1/lezione-1-2.html). Seguire il percorso dal telefono al punto di accesso. Distinguere rete con punto di accesso e rete diretta tra dispositivi. Individuare le differenze più utili tra generazioni Wi-Fi. |
| Mercoledì · Condividere lo spazio radio | 60 | [1.3](../../modulo1/lezione-1-3.html) e [1.4](../../modulo1/lezione-1-4.html). Confrontare due scelte di canale e usare il simulatore per mostrare il nodo nascosto e come si cerca di evitare le collisioni. |
| Mercoledì · Copertura, sicurezza e controllo | 60 | [1.5](../../modulo1/lezione-1-5.html) e [1.6](../../modulo1/lezione-1-6.html). Fare un cenno alle antenne multiple e alla protezione dell’accesso. Proiettare la [mappa di copertura](../../modulo1/lab-copertura.html), confrontare due posizioni del punto di accesso e chiudere con tre domande brevi su canali, copertura e sicurezza. |

| In laboratorio, se concordato per giovedì 26 | Minuti | Attività |
| --- | ---: | --- |
| Dimostrazione | 30 | Aprire la [mappa di copertura](../../modulo1/lab-copertura.html). Spostare una volta il punto di accesso e mostrare come leggere la misura. |
| Prova a coppie | 90 | Confrontare due posizioni del punto di accesso, tenendo fissa la banda. Annotare almeno tre punti di misura per ciascuna posizione e motivare la scelta migliore. |
| Controllo e restituzione | 60 | Usare fino a 45 minuti per la [verifica già pronta](../../modulo1/verifica.html) e il tempo restante per discutere un errore frequente e collegare il Wi-Fi alla prossima unità sulle reti WAN. |

Le durate nelle mappe che seguono descrivono il percorso esteso di 78 ore complessive, che comprende anche 6 ore di Wi-Fi. La tabella del calendario fissa le durate compatte per l’aula.

#### Modulo 2 · Reti WAN · 16 ore

| Lezione o attività | Ore | Obiettivo |
| --- | ---: | --- |
| 2.1 · Dalla rete locale al canale fisico | 2 | In uno schema di collegamento distinguere chi genera o usa i dati (DTE) da chi li adatta alla linea (DCE) e riconoscere i ruoli della sincronizzazione e dei segnali di controllo. |
| 2.2 · Accesso remoto e interconnessione WAN | 2 | Confrontare accesso commutato e collegamento dedicato e distinguere commutazione di circuito e di pacchetto con due esempi. |
| 2.3 · Accesso in rame e in fibra | 2 | Confrontare xDSL, FTTC e FTTH e indicare dove cambia il mezzo trasmissivo in ciascuno schema. |
| 2.4 · Protocolli di linea | 2 | Riconoscere a cosa servono trama e controllo del collegamento in due esempi con HDLC e PPP. |
| 2.5 · Primo routing | 3 | Dato un indirizzo di destinazione, scegliere rete locale, gateway o rotta più specifica. Introdurre la tabella di routing a partire da IP e maschera. |
| Laboratorio · Scelta della rotta | 3 | Prevedere e controllare la riga scelta dalla tabella in tre casi, compresa la rotta predefinita. |
| Verifica e restituzione | 2 | Leggere uno schema WAN e scegliere una rotta motivandola. Correggere insieme un caso significativo. |

#### Recupero AM/FM · 8 ore

| Attività | Ore | Obiettivo |
| --- | ---: | --- |
| AM e varianti | 3 | Individuare portante e segnale modulante, spiegare cosa cambia nell’ampiezza, riconoscere le differenze essenziali fra AM, DSB-SC e SSB e descrivere a blocchi come si ricava il segnale trasmesso. |
| FM | 3 | Riconoscere come varia la frequenza, descrivere a blocchi modulazione e demodulazione FM e confrontarle con AM per occupazione di banda e risposta ai disturbi. |
| Confronto guidato e controllo | 2 | Confrontare su forme d’onda la stessa informazione trasmessa in AM e FM. Spiegare a parole che cosa cambia e usare il confronto per introdurre ASK e FSK nella lezione successiva. |

#### Modulo 3 · Trasmissione digitale · 22 ore

| Lezione o attività | Ore | Obiettivo |
| --- | ---: | --- |
| 3.1 · Dal segnale al sistema digitale | 2 | Percorrere i blocchi di un sistema digitale e spiegare, con un esempio, un vantaggio del digitale e un suo limite. |
| 3.2 · Informazione, entropia e codifica di sorgente | 3 | Confrontare quantità di informazione ed entropia in un esempio semplice e mostrare dove una codifica di sorgente riduce la ridondanza. |
| 3.3 · Capacità e codifica di canale | 3 | Interpretare la capacità di un canale e spiegare perché la codifica di canale aggiunge ridondanza per gestire gli errori. |
| 3.4 · Trasmissione seriale e ASK/OOK | 3 | Distinguere trasmissione parallela e seriale, sincrona e asincrona. Riconoscere simbolo, portante e ritmo di trasmissione in una modulazione passa banda. Collegare ASK/OOK all’AM. |
| 3.5 · FSK, M-PSK e M-QAM | 3 | Collegare FSK all’FM e riconoscere, da forme d’onda o diagrammi, se cambiano frequenza, fase o ampiezza e fase. |
| 3.6 · Applicazioni e qualità della trasmissione | 3 | Riprendere xDSL e ADSL dalla 2.3 e spiegare come si trasportano dati sul doppino. Confrontare per cenni ponti radio e collegamenti satellitari, indicando una condizione che influisce sulla qualità. |
| Laboratorio · Dai bit alla portante | 3 | Confrontare ASK/OOK e FSK su una sequenza breve e riconoscere almeno un simbolo dalla forma d’onda. |
| Verifica e restituzione | 2 | Risolvere un esercizio su informazione, capacità o codifica e interpretare una modulazione digitale applicata. |

#### Modulo 4 · Reti mobili · 14 ore

| Lezione o attività | Ore | Obiettivo |
| --- | ---: | --- |
| 4.1 · Celle e mobilità | 2 | Spiegare copertura e riuso delle frequenze in uno schema a celle e individuare dove un terminale cambia cella. |
| 4.2 · GSM | 2 | Ricostruire a blocchi il percorso di una chiamata GSM e distinguere il ruolo della cella da quello della rete. |
| 4.3 · UMTS e 4G | 2 | Confrontare 3G e 4G rispetto al traffico dati e riconoscere il ruolo delle reti a pacchetto. |
| 4.4 · 5G e prospettive 6G | 3 | Associare due applicazioni a requisiti diversi e distinguere ciò che è disponibile in 5G dalle prospettive 6G documentate al momento della stesura. |
| Laboratorio · Cambiare cella | 3 | Spostare un terminale simulato e motivare quando il collegamento passa alla cella vicina. |
| Verifica e restituzione | 2 | Interpretare un caso di mobilità e confrontare due generazioni di rete con criteri dichiarati. |

#### Modulo 5 · Reti convergenti · 12 ore

| Lezione o attività | Ore | Obiettivo |
| --- | ---: | --- |
| 5.1 · La voce diventa traffico IP | 2 | Seguire il percorso della voce dal campionamento alla ricezione in una rete IP. |
| 5.2 · Stabilire la chiamata e trasportare l’audio | 2 | Distinguere la segnalazione di chiamata dal trasporto multimediale con un esempio SIP/RTP. |
| 5.3 · Qualità del servizio | 1 | Riconoscere l’effetto di ritardo, variazione del ritardo e perdita e spiegare uno scopo della priorità assegnata al traffico. |
| 5.4 · Radio digitale DAB | 1 | Descrivere come più programmi sono trasmessi nello stesso insieme di canali e identificare un vantaggio della ricezione digitale. |
| 5.5 · Cenni di televisione digitale | 2 | Confrontare DAB e televisione digitale DVB rispetto al contenuto e riconoscere il ruolo di compressione e trasmissione. |
| Laboratorio · Qualità della voce | 3 | Confrontare due condizioni di rete e motivare quale rende più difficile seguire una conversazione. |
| Verifica | 1 | Interpretare un caso VoIP o di qualità del servizio e distinguere DAB e DVB in una domanda applicata. |

#### Antenne nella preparazione all’esame

Proposta per maggio da collocare con il docente. In 3 ore riprendere diagramma di radiazione e guadagno (1 ora), confrontare antenne omnidirezionali e direttive (1 ora) e motivare la scelta di un’antenna in un esercizio di copertura o collegamento (1 ora).

#### Calendario di lavoro fino a marzo

Ogni modulo comprende una breve attività guidata in aula basata sul laboratorio della mappa e un controllo. I giovedì possono ospitare prove estese, se concordate. Come attività con Arduino da proporre all’ITP, si può confrontare un segnale a frequenze diverse prima della FSK oppure osservare il tempo tra un evento e la sua registrazione prima del lavoro sul ritardo nelle reti. L’ITP conferma fattibilità e disponibilità prima di inserirle.

| Attività | Ore in aula | Periodo del modulo | Materiali pronti entro |
| --- | ---: | --- | --- |
| Wi-Fi, prova di copertura e controllo | 3 | 23–25 novembre | Già disponibili |
| WAN, 2.1–2.4 (1 ora ciascuna), 2.5 (2 ore), simulazione e controllo (1 ora ciascuno) | 8 | 30 novembre–16 dicembre | 27 novembre per le prime tre lezioni, 4 dicembre per le altre e le attività |
| Recupero AM (2 ore), FM (2 ore), confronto e controllo (1 ora) | 5 | 11–20 gennaio | 8 gennaio |
| Trasmissione digitale, 3.1 (1 ora), 3.2–3.3 (2 ore ciascuna), 3.4–3.5 (90 minuti ciascuna), 3.6, simulazione e controllo (1 ora ciascuno) | 11 | 20 gennaio–22 febbraio | 18 gennaio per 3.1–3.3, 29 gennaio per le altre e le attività |
| Reti mobili, quattro lezioni, simulazione e controllo (1 ora ciascuno) | 6 | 24 febbraio–8 marzo | 22 febbraio |
| Reti convergenti, 5.1, 5.2 e 5.5 (1 ora ciascuna), 5.3, 5.4, simulazione e controllo (30 minuti ciascuno) | 5 | 10–17 marzo | 8 marzo |
| Margine per recuperi, rinvii e attività che richiedono più tempo | 6 | 21 dicembre, 22, 24 e 31 marzo | — |

Il 20 gennaio, usare la prima ora per chiudere AM/FM e la seconda per aprire la trasmissione digitale. Se l’ora di riserva del 21 dicembre non serve per le WAN, usarla per un recupero breve sul Wi-Fi o sul routing. Da aprile, usare la preparazione all’esame per il ripasso sulle antenne e il collegamento con la copertura Wi-Fi.

### 2. Modulo 2 · interfacce, WAN e accessi

- **Produce** le lezioni 2.1–2.3 nella cartella `modulo2`, rispettivamente su interfacce DTE/DCE, sistemi WAN e accessi xDSL/FTTx.
- **Leggi** il piano, la mappa e una lezione del Modulo 1 come riferimento.
- **Criteri** Si aprono tre pagine con quiz e presentazione funzionanti. Un esempio distingue chi genera i dati da chi li adatta al collegamento, uno confronta accessi WAN e uno distingue FTTC e FTTH.
- **Esito**

### 3. Modulo 2 · protocolli e routing

- **Produce** le lezioni 2.4–2.5, con protocolli WAN e routing introdotto a partire da IP e subnetting.
- **Leggi** la mappa e le lezioni 2.1–2.3.
- **Criteri** Si aprono entrambe le pagine con quiz e presentazione funzionanti. La prima spiega HDLC, PPP e il ruolo dell’autenticazione. Un esercizio della seconda fa scegliere la rotta tra una rete direttamente collegata, una rotta più specifica e la rotta predefinita, con tre risultati verificati.
- **Esito**

### 4. Modulo 2 · laboratorio e verifica

- **Produce** indice, laboratorio sul routing e verifica del Modulo 2. Il laboratorio visualizza la scelta della rotta da una tabella.
- **Leggi** le cinque lezioni e, come modelli, il laboratorio e la verifica del Modulo 1.
- **Criteri** Dalla home si raggiungono indice, cinque lezioni, laboratorio e verifica. Il laboratorio mostra la rotta attesa in almeno tre casi, compresa la rotta predefinita. Ogni item della verifica rimanda a un obiettivo svolto e ha soluzione o griglia di valutazione.
- **Esito**

### 5. Modulo 3 · modello digitale e teoria dell’informazione

- **Produce** le prime tre lezioni del Modulo 3, dedicate al modello digitale e alla teoria dell’informazione.
- **Leggi** la mappa e una lezione del Modulo 1 come riferimento.
- **Criteri** Si aprono tre pagine con quiz e presentazione funzionanti. Le lezioni distinguono codifica di sorgente e di canale e includono almeno un esercizio numerico verificato su quantità di informazione, entropia o capacità di canale, secondo la mappa.
- **Esito**

### 6. Modulo 3 · tecniche e applicazioni

- **Produce** le altre tre lezioni del Modulo 3, su tecniche di trasmissione, modulazioni e applicazioni.
- **Leggi** la mappa e le prime tre lezioni del Modulo 3.
- **Criteri** Si aprono tre pagine con quiz e presentazione funzionanti. Esempi o schemi mostrano le differenze tra ASK/OOK, FSK, PSK e QAM. Le applicazioni coprono i richiami a xDSL e i cenni su ponti radio e satellite, secondo la mappa.
- **Esito**

### 7. Modulo 3 · laboratorio e verifica

- **Produce** indice, laboratorio sulle modulazioni e verifica del Modulo 3.
- **Leggi** le sei lezioni del Modulo 3 e la mappa.
- **Criteri** Dalla home si raggiungono indice, sei lezioni, laboratorio e verifica. Il laboratorio fa osservare come cambia almeno un segnale al variare dei simboli. Ogni item della verifica rimanda a un obiettivo svolto e ha soluzione o griglia di valutazione.
- **Esito**

### 8. Modulo 4 · lezioni sulle reti mobili

- **Produce** le quattro lezioni del Modulo 4, secondo la mappa.
- **Leggi** la mappa, i temi della programmazione sulle reti mobili e una lezione del Modulo 1 come riferimento.
- **Criteri** Si aprono quattro pagine con quiz e presentazione funzionanti. Un esempio spiega la funzione delle celle e il passaggio da una cella all’altra. Le lezioni coprono GSM, UMTS, 4G e 5G, con cenni al 6G basati su fonti aggiornate che rendono riconoscibili obiettivi e stato delle specifiche.
- **Esito**

### 9. Modulo 4 · laboratorio e verifica

- **Produce** indice, laboratorio sulle celle radio e verifica del Modulo 4.
- **Leggi** le quattro lezioni del Modulo 4 e la mappa.
- **Criteri** Dalla home si raggiungono indice, quattro lezioni, laboratorio e verifica. Il laboratorio fa osservare almeno un passaggio tra due celle simulando lo spostamento di un terminale. Ogni item della verifica rimanda a un obiettivo svolto e ha soluzione o griglia di valutazione.
- **Esito**

### 10. Modulo 5 · lezioni sulle reti convergenti

- **Produce** le cinque lezioni del Modulo 5, secondo la mappa.
- **Leggi** la mappa, i temi della programmazione sulle reti multiservizio e una lezione del Modulo 1 come riferimento.
- **Criteri** Si aprono cinque pagine con quiz e presentazione funzionanti. Le lezioni spiegano VoIP, protocolli multimediali e qualità del servizio con un esempio di ritardo, variazione del ritardo o perdita. Distinguono la radio digitale DAB dalla televisione digitale, trattata per cenni.
- **Esito**

### 11. Modulo 5 · laboratorio e verifica

- **Produce** indice, laboratorio sulla qualità della voce su IP e verifica del Modulo 5.
- **Leggi** le cinque lezioni del Modulo 5 e la mappa.
- **Criteri** Dalla home si raggiungono indice, cinque lezioni, laboratorio e verifica. Il laboratorio fa confrontare almeno due condizioni di rete e mostra il valore o l’effetto che cambia. Ogni item della verifica rimanda a un obiettivo svolto e ha soluzione o griglia di valutazione.
- **Esito**

### 12. Controllo finale del sito

- **Produce** l’esito dei controlli di integrazione, con eventuali punti da verificare dal docente.
- **Leggi** gli esiti delle fasi di laboratorio e verifica, `AGENTS.md` e le pagine di partenza del Modulo 1.
- **Criteri** Tutti i collegamenti relativi dei quattro nuovi moduli risolvono usando il prefisso di GitHub Pages. Nei quattro moduli sono stati provati navigazione, quiz, presentazione, progressi, layout su telefono, interazioni di laboratorio e anteprima di stampa. Il confronto con Git conferma la conservazione del Modulo 1. Riporta separatamente la prova sulla LIM fisica e la stampa effettiva, se richiedono il docente. La pubblicazione richiede la sua conferma.
- **Esito**

## Da decidere

- **Eventuali sospensioni della 5A** Da verificare con il docente. Se riducono le ore concordate, usare prima il margine di 6 ore e aggiornare le tappe interessate.
- **Scaletta e attività** Il calendario compatto è la proposta per l’aula. Concordare eventuali attività del giovedì con l’ITP prima di contarle.
- **Prossima fase** Dopo il via del docente, usare il prompt della fase 2 in una nuova chat nella cartella `sito`.
