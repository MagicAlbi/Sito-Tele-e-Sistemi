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
- Usare elementi di gioco leggeri in tutto il sito per mantenere l’attenzione. Integrare brevi sfide o attività con riscontro immediato nei materiali nuovi. Concordare eventuali interventi sui materiali esistenti.
- Ogni sottomodulo conserva il proprio quiz breve di autovalutazione. In fondo a ogni modulo l’ordine è **Laboratorio**, **Test di allenamento**, **Esercizi numerici** se previsti dalle lezioni, **Verifica**.
- Il test di allenamento pesca 10 domande distinte da una banca di 70–100 domande a scelta multipla di difficoltà media e mescola le opzioni. Dopo **Consegna**, ogni errore mostra perché la scelta è sbagliata e perché la risposta giusta funziona. Il punteggio compare dopo l’ultima domanda, con il risultato già in vista prima dell’animazione. Il browser conserva il tentativo e le correzioni, anche al ritorno dalla lezione, finché lo studente sceglie **Nuovo tentativo** in alto o in fondo. Ogni domanda si basa su contenuti già svolti e collega la sezione della lezione da ripassare. Se preparando la banca emerge una lacuna importante per gli obiettivi del modulo, documenta e chiarisci quel passaggio nella lezione prima di inserirlo nel quiz.
- Negli esercizi numerici lo studente consulta il formulario, sceglie la tipologia da un menu e riceve due esercizi di quel tipo. Ogni tipologia ha almeno 10 esercizi in contesti realistici e diversi. Si calcola su carta, si inseriscono i risultati nei campi e, in caso di errore, si apre la guida completa con passaggi distinti graficamente.
- La verifica resta in ultima posizione e la pagina esistente del Modulo 1 conserva contenuto e funzionamento. Per gli altri moduli si prevede il posto nell’indice senza un link a una pagina mancante. La progettazione delle nuove verifiche resta rinviata alla fase 13.
- Per riprendere lo studio tra PC, mantenere il sito su GitHub Pages e usare solo il piano gratuito di Cloudflare Workers e D1. Workers verifica il codice e D1 conserva i dati. Dalla home si entra con un codice casuale di otto lettere e cifre, senza chiedere nome o email. L’accesso dura 30 giorni in ciascun profilo del browser. Il sito recupera gli aggiornamenti all’apertura e quando si torna a una scheda aperta. Il servizio limita i tentativi e consente a ciascun profilo di accedere solo ai propri dati. La prova locale usa due profili inventati del Modulo 1.

## Priorità attuale

La riorganizzazione delle sezioni finali è in corso nel Modulo 1 (fasi 20–24). Prima della fase 22 vanno completati i quiz delle lezioni come previsto nella fase 35. La prova di sincronizzazione (fasi 17–19) e la revisione delle annotazioni (fasi 15–16) proseguono come percorsi indipendenti. La costruzione dei Moduli 2–5 resta sospesa e la fase 2 rimane in attesa di approvazione. Al momento della ripresa i nuovi moduli adotteranno il modello del Modulo 1.

## Fasi

| N. | Fase | Dipende da | Stato | Fatta il | Sforzo | Modello |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Mappa delle lezioni e delle attività](fasi/01/FASE.md) | — | fatta | 20 novembre 2026 | 2–3 h (stima a posteriori) | GPT‑6.2 Astra |
| 2 | [Modulo 2 · interfacce, WAN e accessi](fasi/02/FASE.md) | 1 | in corso | — | 6–9 h (fase già svolta, da approvare) | GPT‑6.2 Astra |
| 3 | [Modulo 2 · protocolli e routing](fasi/03/FASE.md) | 2 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 4 | [Modulo 2 · laboratorio e sezione finale](fasi/04/FASE.md) | 3 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 5 | [Modulo 3 · modello digitale e teoria dell’informazione](fasi/05/FASE.md) | 1 | da fare | — | 6–9 h | GPT‑6.2 Astra |
| 6 | [Modulo 3 · tecniche e applicazioni](fasi/06/FASE.md) | 2, 5 | da fare | — | 6–9 h | GPT‑6.2 Astra |
| 7 | [Modulo 3 · laboratorio e sezione finale](fasi/07/FASE.md) | 6 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 8 | [Modulo 4 · lezioni sulle reti mobili](fasi/08/FASE.md) | 1 | da fare | — | 7–10 h | GPT‑6.2 Astra |
| 9 | [Modulo 4 · laboratorio e sezione finale](fasi/09/FASE.md) | 8 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 10 | [Modulo 5 · lezioni sulle reti convergenti](fasi/10/FASE.md) | 1 | da fare | — | 8–12 h | GPT‑6.2 Astra |
| 11 | [Modulo 5 · laboratorio e sezione finale](fasi/11/FASE.md) | 10 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 12 | [Controllo finale del sito](fasi/12/FASE.md) | 4, 7, 9, 11, 16, 24, 26, 28, 30, 32 | da fare | — | 3–5 h | GPT‑6.2 Sol |
| 13 | [Progettazione delle verifiche di fine modulo](fasi/13/FASE.md) | 1 | da fare | — | 2–4 h | GPT‑6.2 Astra |
| 14 | [Bozza di evidenziatori e note nel Modulo 1](fasi/14/FASE.md) | — | fatta | 22 novembre 2026 | 4–6 h | GPT‑6.2 Astra |
| 15 | [Revisione della bozza con il docente](fasi/15/FASE.md) | 14 | in corso | — | 3–5 h | GPT‑6.2 Sol |
| 16 | [Estensione alle pagine di spiegazione](fasi/16/FASE.md) | 15 | da fare | — | 2–3 h | GPT‑6.2 Sol |
| 17 | [Database di prova e accesso con codice](fasi/17/FASE.md) | — | in corso | — | 3–5 h | GPT‑6.2 Astra |
| 18 | [Sincronizzazione del Modulo 1](fasi/18/FASE.md) | 17 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 19 | [Prova online e approvazione della pubblicazione](fasi/19/FASE.md) | 15, 18 | da fare | — | 2–3 h | GPT‑6.2 Sol |

| 20 | [Modulo 1 · struttura e funzionamento del quiz di allenamento](fasi/20/FASE.md) | — | fatta | 23 novembre 2026 | 3–5 h | GPT‑6.2 Astra |
| 21 | [Modulo 1 · banca di domande Wi-Fi](fasi/21/FASE.md) | 20 | fatta | 23 novembre 2026 | 5–8 h | GPT‑6.2 Astra |
| 22 | [Modulo 1 · funzionamento degli esercizi numerici](fasi/22/FASE.md) | 20, 35 | da fare | — | 4–6 h | GPT‑6.2 Astra |
| 23 | [Modulo 1 · banca di esercizi Wi-Fi](fasi/23/FASE.md) | 22 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 24 | [Modulo 1 · integrazione e controllo delle sezioni finali](fasi/24/FASE.md) | 21, 23 | da fare | — | 2–4 h | GPT‑6.2 Sol |
| 25 | [Modulo 2 · test di allenamento](fasi/25/FASE.md) | 4, 24 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 26 | [Modulo 2 · valutazione e preparazione degli esercizi numerici](fasi/26/FASE.md) | 25, 24 | da fare | — | 1–8 h | GPT‑6.2 Astra |
| 27 | [Modulo 3 · test di allenamento](fasi/27/FASE.md) | 7, 24 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 28 | [Modulo 3 · valutazione e preparazione degli esercizi numerici](fasi/28/FASE.md) | 27, 24 | da fare | — | 1–8 h | GPT‑6.2 Astra |
| 29 | [Modulo 4 · test di allenamento](fasi/29/FASE.md) | 9, 24 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 30 | [Modulo 4 · valutazione e preparazione degli esercizi numerici](fasi/30/FASE.md) | 29, 24 | da fare | — | 1–8 h | GPT‑6.2 Astra |
| 31 | [Modulo 5 · test di allenamento](fasi/31/FASE.md) | 11, 24 | da fare | — | 5–8 h | GPT‑6.2 Astra |
| 32 | [Modulo 5 · valutazione e preparazione degli esercizi numerici](fasi/32/FASE.md) | 31, 24 | da fare | — | 1–8 h | GPT‑6.2 Astra |
| 33 | [Area docente · anteprima locale](fasi/33/FASE.md) | — | fatta | 23 novembre 2026 | 3–5 h | GPT‑6.2 Astra |
| 34 | [Area docente · collegamento e accesso riservato](fasi/34/FASE.md) | 19, 33 | da fare | — | 4–7 h | GPT‑6.2 Astra |
| 35 | [Modulo 1 · suggerimenti e completamento dei quiz delle lezioni](fasi/35/FASE.md) | 21 | da fare | — | 3–5 h | GPT‑6.2 Sol |

Lo sforzo stima lavoro e controlli per ciascuna fase, esclusa l’attesa per la revisione. Astra è assegnato a progettazione, contenuti tecnici e integrazione iniziale. Sol a revisioni mirate, estensione e controlli.

Per avviare una fase, apri il suo collegamento e copia il prompt in una nuova chat nella radice del progetto. La tabella indica quali fasi devono essere già concluse.

## PDF di progettazione

Nella cartella principale del progetto, accanto a `Materiali` e `sito`, conserva questi due PDF in `Materiali progettazione/`:

- `Piano Telecomunicazioni 5A.pdf` segue il calendario e la scaletta della fase 1. Aggiornalo se cambiano date, ore, riserve o attività in aula.
- `Piano di sviluppo del sito - Telecomunicazioni 5A.pdf` segue questo piano e le schede di fase. Aggiornalo se cambiano priorità, fasi, dipendenze, consegne o stato di avanzamento.

A fine sessione, verifica se uno dei PDF va aggiornato. Usa i nomi esistenti e riporta la data della revisione. Il piano e le schede sono il riferimento per gli aggiornamenti.

## Criteri comuni

Dopo ogni modifica ai contenuti di una sezione, ricontrolla sempre i quiz delle lezioni, i quiz di fine modulo, il test di allenamento, la verifica e gli esercizi collegati usando il materiale a disposizione degli studenti. Verifica che le consegne siano risolvibili, che opzioni, spiegazioni, rimandi, formule e soluzioni siano coerenti e che i calcoli diano i risultati attesi. Aggiorna le attività interessate e registra il controllo nella stessa fase.

Per le fasi che producono lezioni, ogni pagina deve avere una sintesi iniziale, un esempio o esercizio, un quiz funzionante e una modalità presentazione che si può avviare, usare e chiudere da tastiera. Verifica con il browser e verifica i calcoli eseguendoli. Per le fasi di laboratorio, prova almeno un caso con esito atteso e controlla la navigazione. Prova la stampa delle domande aperte nella verifica esistente del Modulo 1. Usa dati di fantasia.

Per i test di allenamento, prova più avvii e verifica che ogni tentativo abbia 10 domande distinte, che le opzioni cambino posizione e che il punteggio e le spiegazioni seguano la scelta effettiva. Riusa il layout e scegli illustrazioni vettoriali a tratto legate all’argomento del modulo, nei margini sugli schermi larghi. Prova il ritorno dalla lezione dopo la consegna e verifica che il risultato sia in vista prima dell’animazione. Controlla che ogni domanda abbia una sola risposta corretta, alternative di dettaglio comparabile ed errori plausibili, con spiegazioni specifiche e contenuti già svolti.

Per gli esercizi numerici, controlla che ogni tipologia corrisponda a una lezione e che il formulario indichi formule, simboli, condizioni d’uso e unità. Esegui i calcoli per tutte le soluzioni. Nella guida usa riquadri, etichette e formule leggibili su telefono, senza affidare al solo colore il significato dei passaggi. Tieni il riscontro numerico distinto dall’eventuale ipotesi sull’errore di procedimento.

Dopo la fase 16, attiva le annotazioni nelle nuove pagine di spiegazione e prova che una nota resta associata alla relativa lezione dopo la ricarica.

## Da decidere

- **Eventuali sospensioni della 5A** Da verificare con il docente. Se riducono le ore concordate, usare prima il margine di 6 ore e aggiornare le tappe interessate.
- **Scaletta e attività** Il calendario compatto è la proposta per l’aula. Concordare eventuali attività del giovedì con l’ITP prima di contarle.
- **Verifiche di fine modulo** Concordare formato, modalità di svolgimento ed eventuale salvataggio dei risultati nella [fase 13](fasi/13/FASE.md), prima di costruire le nuove verifiche.
- **Altre idee per il sito** Da raccogliere quando il docente vorrà discuterne.
- **Prossimo passo per le sezioni finali** Le fasi 20 e 21 sono approvate e l’indice del Modulo 1 collega il test di allenamento. Alla ripresa, svolgere la [fase 35](fasi/35/FASE.md) per aggiungere suggerimenti e richiedere il completamento dei quiz prima di segnare le lezioni come svolte. Poi passare agli esercizi numerici nella [fase 22](fasi/22/FASE.md).
- **Prossimo passo per la sincronizzazione** Far approvare al docente l’esito della [fase 17](fasi/17/FASE.md). Poi aprire una nuova chat dalla radice del progetto e avviare la [fase 18](fasi/18/FASE.md) per collegare la home e il Modulo 1 al database di prova. Il piano gratuito e la dimensione prevista, fino a 80 studenti, restano i riferimenti della prova.
- **Area docente** Il link nel piè di pagina apre un’appendice con la grafica del sito. Il docente ha approvato l’[anteprima locale](fasi/33/FASE.md). Per l’uso online, dopo la prova del servizio di sincronizzazione, il docente accederà dal browser via Cloudflare Access. Le credenziali di amministrazione restano a disposizione del docente fuori dalla chat e da Git.
- **Annotazioni** Il docente ha autorizzato la pubblicazione delle annotazioni nelle sei lezioni del Modulo 1. La [fase 15](fasi/15/FASE.md) resta in corso per i ritocchi successivi, prima dell’estensione alle altre lezioni nella fase 16. La fase 13 può essere ripresa indipendentemente dalle annotazioni.
