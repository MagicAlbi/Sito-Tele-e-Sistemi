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
| 1 | [Mappa delle lezioni e delle attività](fasi/01/FASE.md) | — | fatta | 20 novembre 2026 |
| 2 | [Modulo 2 · interfacce, WAN e accessi](fasi/02/FASE.md) | 1 | da fare | — |
| 3 | [Modulo 2 · protocolli e routing](fasi/03/FASE.md) | 2 | da fare | — |
| 4 | [Modulo 2 · laboratorio e verifica](fasi/04/FASE.md) | 3 | da fare | — |
| 5 | [Modulo 3 · modello digitale e teoria dell’informazione](fasi/05/FASE.md) | 1 | da fare | — |
| 6 | [Modulo 3 · tecniche e applicazioni](fasi/06/FASE.md) | 2, 5 | da fare | — |
| 7 | [Modulo 3 · laboratorio e verifica](fasi/07/FASE.md) | 6 | da fare | — |
| 8 | [Modulo 4 · lezioni sulle reti mobili](fasi/08/FASE.md) | 1 | da fare | — |
| 9 | [Modulo 4 · laboratorio e verifica](fasi/09/FASE.md) | 8 | da fare | — |
| 10 | [Modulo 5 · lezioni sulle reti convergenti](fasi/10/FASE.md) | 1 | da fare | — |
| 11 | [Modulo 5 · laboratorio e verifica](fasi/11/FASE.md) | 10 | da fare | — |
| 12 | [Controllo finale del sito](fasi/12/FASE.md) | 4, 7, 9, 11 | da fare | — |

Per avviare una fase, apri il suo collegamento e copia il prompt in una nuova chat nella radice del progetto. La tabella indica quali fasi devono essere già concluse.

## Criteri comuni

Per le fasi che producono lezioni, ogni pagina deve avere una sintesi iniziale, un esempio o esercizio, un quiz funzionante e una modalità presentazione che si può avviare, usare e chiudere da tastiera. Verifica con il browser e verifica i calcoli eseguendoli. Per le fasi di laboratorio e verifica, prova almeno un caso del laboratorio con esito atteso e controlla la correzione del quiz e la stampa delle domande aperte. Usa dati di fantasia.

## Da decidere

- **Eventuali sospensioni della 5A** Da verificare con il docente. Se riducono le ore concordate, usare prima il margine di 6 ore e aggiornare le tappe interessate.
- **Scaletta e attività** Il calendario compatto è la proposta per l’aula. Concordare eventuali attività del giovedì con l’ITP prima di contarle.
- **Prossima fase** Dopo il via del docente, copiare il prompt della [fase 2](fasi/02/FASE.md) in una nuova chat nella radice del progetto.
