# Collaudo locale della verifica Wi-Fi

**Base** `649de51`. La consegna avviene in locale, come confermato dal docente il 27 novembre 2026. Tutte le prove e i profili sono di fantasia.

**File e anteprime.** [Prepara lo storico](prepara-archivio.mjs) aggiunge tre verifiche chiuse del Modulo 1 in un archivio separato. [Collaudo in Chrome](collauda.mjs) apre una quarta verifica, la consegna dal lato alunno, controlla la ricevuta e le presenze, prova il cambio tema e i filtri per anno e stampa la prova di esempio dell’11 novembre. Per la gestione e il PDF usa la pagina e i fogli di stile del pacchetto Cloudflare locale. Le immagini, l’archivio e il PDF sono in `output/`, accanto alla cartella del sito.

**Controlli.** Il test di integrazione Cloudflare in locale passa anche con Chrome. Le icone pubblicate del sito e della pagina alunni sono identiche nel disegno. L’Area docente online usa i caratteri ☀ e ☾. Tutte e tre le pagine mostrano il sole in tema scuro e la luna in tema chiaro. Il foglio di stile di stampa online richiede l’accesso docente. È stata usata la copia del pacchetto locale.

**Per riaprire.** Dalla radice Git, in PowerShell, avviare il servizio e aprire `http://127.0.0.1:18765/docente` con la password dimostrativa `DOCENTE-DEMO`.

```powershell
$cartellaCollaudo = New-Item -ItemType Directory -Force '../output/collaudo-verifica-modulo-1'
$env:VERIFICA_DB = Join-Path $cartellaCollaudo.FullName archivio.sqlite
$env:VERIFICA_PORT = '18765'
node --preserve-symlinks-main in-corso/verifiche-fine-modulo/avvia-verifica.mjs
```

Per ripetere il collaudo, con il servizio avviato, eseguire questi comandi in una seconda finestra. La consegna già registrata viene riaperta come ricevuta.

```powershell
node --test in-corso/verifiche-fine-modulo/cloudflare/prova-integrazione.test.mjs
node in-corso/collaudo-verifica-modulo-1/prepara-archivio.mjs
node in-corso/collaudo-verifica-modulo-1/collauda.mjs
```

**Prossimo passo.** Il docente può aprire le anteprime e indicare se desidera uniformare le icone dell’Area docente. L’attività di collaudo resta in `in-corso/`, esclusa dal sito.
