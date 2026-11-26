# Uscita automatica dall’Area docente

**Stato** Approvato e pubblicato su Cloudflare il 26 novembre 2026. Versione attiva ad5c0328. Versione precedente per il ripristino 0a794d12.

**Comportamento** Dopo 10 minuti senza interazioni, il pannello torna alla pagina della password. Usare i comandi, digitare, scorrere o passare a un’altra pagina dell’Area docente fa ripartire il conto. Alla pubblicazione, gli accessi aperti con la versione precedente dovranno essere rifatti.

**Base e file** [docente.mjs](docente.mjs) deriva dalla [copia locale del servizio docente](../accesso-codici-studenti/docente.mjs), che include la spaziatura del modulo di accesso pubblicata il 25 novembre 2026. Il servizio è `tele5a-docente` su Cloudflare.

**Controlli eseguiti** Sintassi JavaScript e prove locali con dati inventati e orologio accelerato. Verificati rinnovo all’uso e durante la navigazione, condivisione della scadenza simulata tra schede, rifiuto delle richieste dopo la scadenza, nuovo accesso e uscita manuale. In Edge, un tasto premuto al nono minuto ha tenuto aperta la sessione oltre il decimo minuto iniziale. Dopo altri 10 minuti senza attività, è ricomparsa la pagina della password. `_config.yml` esclude `in-corso/` dal sito.

**Verifica online** Confrontato il sorgente attivo prima della pubblicazione con la base locale. Dopo la pubblicazione, verificati il modulo della password, il messaggio di sessione scaduta, lo stile del modulo e la corrispondenza dello script online con la bozza approvata. La prova con un accesso reale resta al docente.
