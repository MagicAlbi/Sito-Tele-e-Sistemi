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

## Bozza verificata

I file studenti.mjs e docente.mjs contengono la correzione. La prova prova-recupero.test.mjs avvia entrambi i servizi in Miniflare con chiavi differenti e un archivio D1 temporaneo condiviso. Verificati il codice generato dal docente, il codice preesistente del servizio studenti, il rifiuto del codice errato, il limite dei tentativi, la rotazione con revoca della sessione e la conservazione dei progressi. Le sei prove di base del servizio studenti sono riuscite.

Dopo la conferma del docente, pubblicare prima il servizio docente. Attivare sul servizio studenti il collegamento VERIFICA_DOCENTE verso tele5a-docente, punto di ingresso VerificaCodice, e pubblicare la versione studenti. Conservare le versioni attive precedenti per poterle ripristinare. Verificare dalla home pubblica con una prova privata del docente e riportare il solo esito. Gli aggiornamenti online sono da eseguire.

## Pubblicazione del 25 novembre 2026

Cloudflare mostra le versioni docente f39026eb e studenti 5763595d attive al 100%. Il collegamento VERIFICA_DOCENTE punta al punto di ingresso VerificaCodice del servizio docente. Versioni precedenti per il ripristino docente b616986e e studenti 97b77ab4. Resta la prova dalla home pubblica con un codice già consegnato, inserito in privato dal docente.

Il docente riferisce che un codice già consegnato ha funzionato dalla home pubblica. Ha chiesto di aumentare lo spazio tra il campo password e il pulsante Accedi dell’Area docente e di pubblicare la modifica. La bozza aggiunge 1 rem tra campo e pulsante.

Spaziatura pubblicata su Cloudflare. Nella pagina pubblica dell’Area docente, con una finestra larga 1280 px, la distanza misurata fra il campo Password personale e il pulsante Accedi è 16 px. La verifica della spaziatura è stata eseguita senza inserire una password.
