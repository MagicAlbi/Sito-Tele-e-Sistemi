# Presentazioni alla classe del Modulo 2 · 25 novembre 2026

**Stato.** Pronto per la pubblicazione. La home e le cinque presentazioni approvate sono nei file del sito e sono state verificate in locale.

## Bozze

[Home del Modulo 2](index.html) con i pulsanti allineati alla home del Modulo 1. Il primo apre la prima lezione da completare e, a percorso completato, porta all’elenco delle lezioni per il ripasso.

Apri una lezione e seleziona **Presenta sulla LIM**. Usa le frecce per passare da una slide all’altra.

- [2.1 · Dalla rete locale al canale fisico](lezione-2-1.html)
- [2.2 · Accesso remoto e interconnessione WAN](lezione-2-2.html)
- [2.3 · Accesso in rame e in fibra](lezione-2-3.html)
- [2.4 · Protocolli di linea](lezione-2-4.html)
- [2.5 · Primo routing](lezione-2-5.html)

## Base e modifiche

Base Git `c43bf7e`. Le bozze partono dai cinque file `modulo2/lezione-2-*.html` e riprendono il livello di spiegazione delle presentazioni del Modulo 1. Ogni presentazione contiene una slide «Curiosità» con la grafica ambra e rosa del Modulo 1, uno spunto per la classe e la fonte. Aperture, video ed esercizi hanno una composizione riconoscibile. Le cinque sfide e sei esercizi hanno una soluzione guidata a comparsa. «Da ricordare» chiude ogni presentazione con tre schede di ripasso. Le variazioni del Modulo 2 sono in `presentazioni.css`.

## Controlli

- Home del Modulo 2 verificata in Chrome a 1280 e 390 px. Provati avvio, ripresa con lezioni completate anche fuori ordine e ripasso a percorso concluso. I collegamenti a laboratorio, quiz ed esercizi sono attivi.
- Le cinque «Sfide alla classe» hanno titolo e pulsante viola, consegna in evidenza e soluzione guidata in un riquadro verde a comparsa.
- Chrome, 51 slide a 1024 × 768, 1280 × 720 e 1920 × 1080. Controllati apertura, contatore, frecce, Esc, fonti, grafica delle curiosità e delle schede di ripasso, apertura e chiusura delle soluzioni. Le slide entrano nello schermo anche con le soluzioni aperte. Controllato anche il tema chiaro a 1280 × 720. A 390 × 844 alcune slide si leggono scorrendo in verticale.
- I collegamenti alle risorse locali esistono. Consultate le cinque fonti delle curiosità. Verificati con Node i calcoli in bit e byte, le velocità, la percentuale utile della trama, il routing IPv4, l’inserimento dello zero nella trama e il modello di coda dell’esempio.
- Entrambi i video si avviano in Chrome con audio disattivato e vanno in pausa quando si passa alla slide successiva. Restano da provare l’audio in aula e la LIM della classe.
- I file delle lezioni di studio, dei quiz, della banca, della verifica e degli esercizi del sito sono identici alla base. Nelle copie di anteprima compaiono i percorsi locali e il collegamento al foglio di stile delle slide.

## Prossimo passo

Sono state trasferite la barra dei pulsanti con il relativo script, le cinque sezioni `template[data-presentation]` e le regole di grafica nel foglio `assets/css/modulo2.css`. Ripetute le verifiche delle 51 slide sui file destinati al sito, anche usando le versioni di base di CSS e JavaScript comuni. La grafica del Modulo 2 funziona anche senza le altre modifiche locali già presenti nel progetto. I collegamenti relativi e la corrispondenza con le bozze approvate sono stati verificati.

Il docente può usare **Salva su GitHub** in MagicAlbi Sync per aggiornare il sito online. Restano da verificare il sito pubblico dopo il caricamento e la resa sulla LIM della classe.
