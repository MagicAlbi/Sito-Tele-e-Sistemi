# Fase 17 · Database di prova e accesso con codice

[Torna al piano](../../PIANO.md)

## Prompt di apertura

```text
Usa $piani-a-fasi per la fase 17 del piano telecomunicazioni-5a.
Leggi AGENTS.md e piani/telecomunicazioni-5a/PIANO.md.
Apri piani/telecomunicazioni-5a/fasi/17/FASE.md e verifica le dipendenze nella tabella del piano.
Se i prerequisiti sono completati, svolgi solo questa fase e verifica tutti i criteri applicabili.
Aggiorna l’esito nel file di fase e lo stato nella tabella del piano. Per il salvataggio e la pubblicazione segui AGENTS.md.
```

- **Risultato** Un database D1 di prova sul PC e un Worker che verifica il codice e autorizza l’accesso ai dati, usando l’ambiente locale di Cloudflare.
- **Riferimenti** [Sviluppo locale con D1](https://developers.cloudflare.com/workers/local-development/local-data/) e [limiti del piano gratuito](https://developers.cloudflare.com/workers/platform/limits/).
- **Criteri** Genera due codici diversi di otto lettere e cifre, con caratteri facili da distinguere. Verifica che il codice giusto apra il profilo, che quelli errati vengano respinti e che il limite blocchi i tentativi ripetuti anche quando cambiano i codici provati. Tieni i codici fuori dai file pubblici e dai registri. Mostra che la sostituzione blocca il vecchio codice e revoca le sessioni precedenti. Prova che ogni profilo può leggere e scrivere i propri dati di esempio e che l'accesso senza sessione o a un altro profilo viene respinto. Esegui le prove con dati inventati, senza attivare risorse online.

## Esito

- **23 novembre 2026** Creato il database locale D1 con due profili inventati. Il [Worker](../../../../sincronizzazione/worker.mjs) verifica il codice e permette a ogni profilo di leggere e scrivere un dato di esempio. Il [programma locale](../../../../sincronizzazione/ambiente-locale.mjs) inizializza il database nella cartella ignorata da Git. I codici restano in quella cartella.
- **Controlli superati** Quattro prove con Cloudflare Miniflare e D1. Verificati accesso valido e rifiuto di codici errati, lettura e scrittura isolate, limite anche a codici alternati e anche da indirizzi diversi, sostituzione del codice con chiusura delle sessioni precedenti, conservazione del dato, uscita e 80 accessi contemporanei simulati dallo stesso indirizzo. Verificati la creazione del database persistente, il secondo avvio e l’esclusione della cartella con i codici da Git.
- **Da completare** Approvazione del docente. Il collegamento alla home e il salvataggio di lezioni, quiz, evidenziazioni e note sono nella fase 18. La prova online e la misurazione delle quote nell’uso normale sono nella fase 19.

## Avvio locale

Con Node.js 24 e pnpm, dalla cartella [sincronizzazione](../../../../sincronizzazione/):

```text
pnpm install --ignore-scripts
pnpm test
pnpm start --init
pnpm start
```

Il servizio risponde su `127.0.0.1:8787`. Database e codici di prova restano in `.local/sincronizzazione/`. L’accesso è per codice, senza nome o email. La prova è dimensionata fino a 80 studenti.
