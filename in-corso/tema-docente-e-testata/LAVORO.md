# Tema dell’Area docente e testata del sito

**Stato e base.** Sito aggiornato online. Cloudflare serve la versione `c5664d3b` dal 27 novembre 2026, dopo approvazione del docente. La versione precedente è `ad5c0328`. L’aggiornamento è stato applicato al pacchetto completo delle verifiche in produzione, che contiene anche la pagina mostrata subito dopo il login.

**Riscontro online.** Prima della pubblicazione Cloudflare mostrava ancora i simboli testuali e la schermata delle verifiche partiva in tema chiaro. Dopo la pubblicazione, partendo dalla home pubblica in entrambi i temi, il login ha mostrato i due disegni identici al sito e ha impostato il tema prima dei fogli di stile.

**File.** [sito.patch](sito.patch) modifica soltanto la testata delle 23 pagine, il collegamento dell’Area docente e il JavaScript che gli passa il tema. [docente.mjs](docente.mjs) contiene il servizio con il tema impostato prima del primo disegno, le due icone del sito e la stessa testata. La proposta grafica è un’antenna con onde radio nel riquadro sfumato esistente. L’intestazione diventa «Telecomunicazioni» e il sottotitolo della home conserva «Articolazione Telecomunicazioni».

**Controlli locali.** Verificati la sintassi JavaScript, la corrispondenza dei file del sito con il file di modifiche approvato e l’esclusione di `in-corso/` in `_config.yml`. In Chrome la schermata docente ha mostrato subito il tema e l’icona corrispondenti alla scelta sul sito, anche ritardando lo script del pannello e con preferenza docente opposta. Verificati ricarica, cambio con mouse e tastiera, accesso e uscita con password fittizia e testata su desktop e a larghezza telefono. Le immagini sono nella cartella locale `.local/tema-docente-e-testata/`.

**Pacchetto pubblicato.** Le stesse modifiche di tema sono state applicate al login, alla schermata delle verifiche e alle pagine dei codici. La copia del pacchetto completo è in `.local/tema-docente-e-testata/worker-pubblicazione.mjs`. Il [file della bozza iniziale](docente.mjs) contiene la versione di base del servizio. In Chrome, il pacchetto completo ha superato le prove con accesso fittizio, anche ritardando lo script del pannello.

**Verifica dopo l’accesso.** Con una sessione reale, aperto il pannello delle verifiche dalla home pubblica in entrambi i temi. Confermati sole e luna identici, inizializzazione prima degli stili, sfondo scuro alla ricarica e funzionamento del pulsante dentro il pannello. Il pannello è stato lasciato in tema scuro.
