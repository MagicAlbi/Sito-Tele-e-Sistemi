# Fase 20 · Modulo 1 · struttura e funzionamento del quiz di allenamento

[Torna al piano](../../PIANO.md)

## Prompt di apertura

```text
Usa $piani-a-fasi per la fase 20 del piano telecomunicazioni-5a.
Leggi AGENTS.md e piani/telecomunicazioni-5a/PIANO.md.
Apri piani/telecomunicazioni-5a/fasi/20/FASE.md e verifica le dipendenze nella tabella del piano.
Se i prerequisiti sono completati, svolgi solo questa fase e verifica tutti i criteri applicabili.
Aggiorna l’esito nel file di fase e lo stato nella tabella del piano. Per il salvataggio e la pubblicazione segui AGENTS.md.
```

## Lavoro e verifiche

- **Produce** Lo schema riutilizzabile delle sezioni finali e la pagina del quiz del Modulo 1 provata con domande di esempio. Collega il lavoro di integrazione alla fase 24.
- **Leggi** Le sei lezioni Wi-Fi, l’[indice](../../../../modulo1/index.html), il [laboratorio](../../../../modulo1/lab-copertura.html), la [verifica](../../../../modulo1/verifica.html) e il [motore dei quiz](../../../../assets/js/app.js).
- **Criteri** Ogni tentativo estrae 10 domande distinte e mescola le opzioni di ogni domanda a ogni avvio. La correzione segue l’identità dell’opzione anche quando cambia posizione. Prima di **Consegna** le soluzioni sono nascoste. Dopo la consegna, prova risposte corrette, errate e omesse. Per ogni errore compaiono la spiegazione specifica dell’opzione selezionata e il motivo per cui è corretta l’alternativa giusta. Un nuovo tentativo riparte senza risposte, punteggi o spiegazioni del precedente. I quiz delle lezioni e la verifica esistente mantengono il comportamento attuale.

## Regole per le sezioni finali

- **Percorso didattico completo** Lezioni e laboratorio. **Ripasso, esercizi e valutazione** Quiz di allenamento, esercizi numerici quando previsti, verifica per ultima. La verifica Wi-Fi conserva contenuto e funzionamento. Negli altri moduli riserva il posto alla verifica, con collegamento solo quando la pagina esiste. Le nuove verifiche si progettano nella [fase 13](../13/FASE.md).
- **Banca di allenamento** Da 70 a 100 domande a scelta multipla di difficoltà media, con una risposta corretta, opzioni di dettaglio comparabile, errori plausibili e spiegazioni specifiche. Ogni domanda rimanda alla sezione pertinente. Se manca un passaggio importante per gli obiettivi, documentalo e chiariscilo nella lezione prima di usarlo nel quiz.
- **Esercizi numerici** Riusa il formato della [fase 22](../22/FASE.md) e le regole della [banca](../23/FASE.md). Prova lettura e riscontri anche su telefono e distingui i passaggi con testo oltre al colore. Tieni separati il riscontro numerico e l’eventuale ipotesi sull’errore di procedimento.

## Esito

### Materiali e struttura riutilizzabile

- [Pagina di prova del Modulo 1](../../../../modulo1/allenamento.html) con [12 domande di esempio](../../../../modulo1/domande-allenamento.js), due per ciascuna lezione. La fase 21 completa la banca a 70–100 domande.
- [Funzionamento comune del quiz](../../../../assets/js/quiz-allenamento.js) e [stili](../../../../assets/css/quiz-allenamento.css). Per un altro modulo si riusano i due file e la struttura della pagina, adattando intestazione, link di ritorno, chiave `data-training-key`, immagini SVG dei margini e banca. La chiave separa i tentativi dei diversi moduli nello stesso browser. Ogni domanda ha un testo e opzioni, ognuna con testo e spiegazione. Una sola opzione ha la proprietà `correct` impostata a `true`.
- L’indice finale collega **Laboratorio → Test di allenamento → Esercizi numerici, se previsti → Verifica**. La fase 20 collega il quiz dalle sei lezioni, sotto il checkpoint esistente. Il collegamento dall’indice è stato aggiunto all’approvazione della fase 21. La [fase 24](../24/FASE.md) integra gli esercizi numerici e verifica il percorso completo.

### Controlli eseguiti

- Sintassi dei due file JavaScript e collegamenti relativi provati sul sito locale con il prefisso di GitHub Pages.
- In Chrome, 24 tentativi hanno estratto 10 domande distinte. Sono apparse tutte le 12 domande di prova e la risposta corretta è comparsa in tutte le quattro posizioni. Verificati cambio della risposta, assenza di soluzioni prima della consegna, correzione di una risposta esatta, una errata e otto omesse, spiegazione specifica dell’opzione scelta, blocco delle risposte consegnate e ripartenza senza punteggio né spiegazioni precedenti.
- Provati la selezione da tastiera, il tema chiaro e la resa a 360 px. Verificate la correzione del checkpoint della lezione 1.1, quella della verifica esistente e la visualizzazione del suo timer.
- **Revisione dopo la prova del docente** Domande numerate, separate da spazio e da una linea sottile. La pagina usa la palette e l’intestazione del sito. Nei margini degli schermi larghi mostra due illustrazioni SVG a tratto, una con il punto di accesso e una con lo scambio di dati fra dispositivi. Negli altri moduli si riusa la disposizione con illustrazioni adatte all’argomento. Punteggio dopo l’ultima domanda e cinque animazioni di Milo, un pacchetto dati disegnato per il quiz. La scena richiama le partite classificate online. Nei cinque percorsi di 3,2 secondi, Milo torna alla partenza, avanza a scatti, raggiunge il checkpoint, salta verso il server o arriva in volata. Durante il percorso appaiono impulsi ai nodi, un avviso nelle fasce basse e una scia nelle fasce alte. Il risultato offre un pulsante che porta direttamente alla prima risposta da rivedere. Le animazioni rispettano la preferenza di movimento ridotto. Le 12 domande di prova sono state confrontate con le lezioni e rimandavano alla sezione precisa da ripassare dopo la consegna. La fase 21 le ha integrate nella banca completa. Nelle lezioni è stato aggiunto il collegamento al quiz.
- **Controlli della revisione** Provati i punteggi ai confini delle cinque fasce, la posizione del risultato, le modalità chiara e scura, il movimento ridotto, la selezione da tastiera, i sei collegamenti dalle lezioni e i 12 riferimenti di ripasso. Ripetuta la prova della verifica esistente.
- **Memoria e consegna** Il browser conserva domande estratte, ordine delle opzioni, risposte e stato di consegna. Le risposte sbagliate e omesse rimandano al ripasso. Dal collegamento della lezione si torna allo stesso tentativo. **Nuovo tentativo** sostituisce il tentativo in memoria ed è disponibile in alto e in fondo. Dopo la consegna il risultato viene posizionato subito in vista, prima di avviare l’animazione. Riaprendo un tentativo consegnato si ritrovano risultato e correzioni.
- **Controlli dopo la modifica** In Chrome ho verificato la ricarica prima della consegna, il passaggio quiz → lezione → quiz dopo la consegna, entrambi i pulsanti di ripartenza, la posizione stabile del risultato prima e durante l’avvio dell’animazione e la resa delle illustrazioni su computer e telefono. Nella revisione con Milo ho verificato le cinque fasce ai punteggi di confine, le posizioni finali, il salto alla prima correzione, il risultato conservato dopo la ricarica e la scena ferma con movimento ridotto. Ho verificato i pulsanti azzurri di ripartenza in alto e in fondo, il pulsante scuro per rivedere la prima correzione e i pallini verdi e rossi in correzione.
- **Approvazione** Il 23 novembre 2026 il docente ha approvato il risultato e ha chiesto di procedere con la fase 21.
