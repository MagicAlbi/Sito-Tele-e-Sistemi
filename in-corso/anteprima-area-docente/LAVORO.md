# Anteprima esplorabile dell’Area docente

**Base** `649de51` e [collaudo locale del Modulo 1](../collaudo-verifica-modulo-1/LAVORO.md). Il servizio dimostrativo usa l’archivio del collaudo. La 5A ha una consegna ricevuta, un’alunna con risposte parziali in corso, un assente e un profilo non segnato. Le tre verifiche concluse comprendono consegne di esempio in 5A e 5B su due anni.

**File.** [Anteprima locale](anteprima.mjs) mostra le schermate del pacchetto Cloudflare con l’archivio dimostrativo. [Icone](icone-docente.mjs) riprende le sagome del sito. Il [file delle modifiche](icone-docente.patch) contiene le due modifiche per il servizio docente, in attesa di approvazione. Le immagini dei temi sono in `output/anteprima-area-docente/`, fuori dal repository.

**Apertura.** Con il collaudo precedente già avviato sulla porta 18765, dalla radice Git eseguire `node in-corso/anteprima-area-docente/anteprima.mjs`. Se il collaudo è spento, avviarlo come indicato nella sua scheda e verificare che il pacchetto Cloudflare locale sia stato preparato con il test di integrazione.

- [Verifica in corso](http://127.0.0.1:18766/)
- [Archivio](http://127.0.0.1:18766/docente/?vista=archivio)

**Controlli.** In Chrome sono stati provati il cambio tema con mouse e tastiera, il ricordo della scelta dopo la ricarica, la schermata di accesso docente, lo stato «In corso», i filtri per anno e per classe, l’apertura di una consegna passata e il pulsante di stampa. Il controllo locale di applicabilità del file delle modifiche è riuscito.

**Prossimo passo.** Il docente prova l’anteprima e può approvare la modifica delle icone. La bozza è in `in-corso/`, esclusa dal sito.
