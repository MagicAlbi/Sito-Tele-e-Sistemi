# Accesso con codice degli studenti

## Punto di ripresa

Alla prossima sessione di lavoro sul progetto, Codex riprende autonomamente da questa scheda. Usare la diagnosi già svolta e preparare e provare la correzione in locale senza chiedere al docente di ricostruire il problema. Il docente non ha una copia di `SYNC_SECRET`. La chiave attualmente configurata nell’Area docente serve anche a leggere i dati già cifrati.

La soluzione proposta usa un [collegamento interno Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) per far verificare i codici al servizio docente con la chiave che ha già. L’obiettivo è conservare i codici consegnati e i progressi. Preparare e provare la bozza sul PC con profili inventati. Verificare l’accesso valido, il rifiuto dei codici errati, i limiti ai tentativi, le sessioni e la conservazione dei progressi. La pubblicazione su Cloudflare richiede una conferma separata.

## Diagnosi e verifiche

- **Base** Il 25 novembre 2026 la home pubblica punta a `tele5a-studio` per gli studenti e collega `tele5a-docente` per il docente. I due servizi usano lo stesso archivio `tele5a-studio-prova` e ciascuno ha una sola versione attiva.
- **Verifica online** La home e l’Area docente rispondono. Il servizio studenti accetta richieste dalla home ufficiale. Nell’archivio ci sono 17 posti collegati ai rispettivi profili. Al controllo nessuno dei 17 aveva una sessione attiva, mentre un altro profilo ne aveva una. Il docente ha copiato un codice direttamente dall’Area docente alla home ufficiale e ha ricevuto ancora «Codice non valido».
- **Verifica sul PC** Sette prove riuscite con dati inventati, compresa la generazione del codice nell’Area docente e l’accesso con lo stesso codice. Il confronto dei due programmi online conferma lo stesso calcolo usato nelle copie locali. Una prova mirata con il servizio studenti e un database simulato accetta il codice con la stessa chiave e lo respinge con una chiave diversa.
- **Da verificare** Il docente ricorda di aver inserito la stessa chiave in entrambi i servizi. Cloudflare nasconde i valori, quindi la differenza tra le chiavi attive resta un’ipotesi.
- **Riferimenti** `index.html`, `assets/js/accesso-studio.js`, `assets/js/studio.js`, `Bozze sito/sincronizzazione/worker.mjs`, `Bozze sito/.local/sincronizzazione/docente-worker-pubblicazione.mjs`, schede 19 e 34 nelle bozze.
- **Stato** Per questo intervento è stata aggiornata soltanto questa scheda. La correzione è ancora da preparare.
