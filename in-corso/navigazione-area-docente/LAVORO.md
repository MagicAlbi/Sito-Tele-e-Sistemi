# Navigazione dell’Area docente

**Stato e base.** Bozza del 27 novembre 2026, approvata e applicata il 28 novembre 2026. Cloudflare serve la versione `a80c18b4`. La versione precedente è `97402af2`. La bozza riprende la grafica e le risorse locali della [scheda docente](../verifiche-fine-modulo/scheda-docente.html).

**File.** Aprire [anteprima.html](anteprima.html) nel browser, anche direttamente dal PC. [anteprima.css](anteprima.css) contiene gli adattamenti della grafica. [anteprima.js](anteprima.js) gestisce percorsi, schermate e dati fittizi. «Home» apre la home locale del sito e «Esci» mostra una schermata di uscita simulata.

**Percorsi.** Il percorso in alto mostra `Home / Area docente` all’ingresso. «Verifiche» apre `Home / Area docente / Nuova verifica`. L’archivio mostra `Home / Area docente / Verifiche / Archivio`. Per i codici, il percorso arriva a `Codici alunni` e, nel dettaglio, aggiunge il nome della classe. Ciascuna voce precedente è cliccabile. «Esci» appare solo nella pagina iniziale docente. Le schermate delle verifiche hanno il titolo «Verifiche». Elenco e dettaglio dei codici condividono il titolo «Codici alunni» e la grafica del menu docente.

**Controlli.** In Chrome, da file locale, provati tutti i percorsi con mouse e tastiera, ricarica e pulsante Indietro. Verificati il ritorno alla home, l’uscita simulata, il filtro dell’archivio, la riga della classe e il conteggio delle righe fittizie. Controllati tema chiaro e scuro, testata e tabella a 360 px. Verificata l’esclusione di `in-corso/` da `_config.yml`.

**Integrazione.** [integrazione.mjs](integrazione.mjs) applica le modifiche alla versione di partenza e prepara il pacchetto locale `worker-navigazione-docente.mjs`. Il pacchetto è stato provato in Chrome con un accesso fittizio, l’archivio, la creazione di una classe di 17 alunni, il suo dettaglio, il ritorno ai codici e l’uscita effettiva dalla sessione di prova. Cloudflare ha confermato l’attivazione e il login pubblico risponde correttamente.

**Verifica online.** Con una sessione docente reale sono stati aperti Nuova verifica, Archivio, Codici alunni e il dettaglio di una classe. Controllati i percorsi e provati i collegamenti a Verifiche, Codici alunni, Area docente e Home del sito. «Esci» era visibile solo nel menu iniziale. Il controllo del dettaglio si è limitato al percorso, al titolo e al riepilogo della classe. Al termine è stato riaperto il menu docente.
