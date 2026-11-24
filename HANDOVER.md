# Passaggio di consegne

Per lo stato aggiornato, apri il [piano Telecomunicazioni 5A](piani/telecomunicazioni-5a/PIANO.md) e la scheda della fase interessata.

## Moduli

- **Modulo 1 · Wi-Fi.** Sei lezioni, laboratorio di copertura e verifica esistente. Il piano segue l’aggiunta di quiz di allenamento ed esercizi numerici (fasi 20–24), le annotazioni (15–16) e la prova di sincronizzazione dello studio (17–19). La verifica Wi-Fi resta quella esistente; le nuove verifiche si progettano nella fase 13.
- **Modulo 2 · WAN.** L’[indice](modulo2/index.html) e le lezioni 2.1–2.3 esistono già. La [fase 2](piani/telecomunicazioni-5a/fasi/02/FASE.md) registra i controlli e l’approvazione del video della 2.3. Alla ripresa dei nuovi contenuti si parte dalla fase 3, protocolli e routing, dopo la chiusura della fase 2. Il laboratorio e la sezione finale sono previsti nella fase 4.
- **Scelte grafiche.** Mantieni il tema blu, con il viola del Modulo 2. Nella [lezione 1.5](modulo1/lezione-1-5.html#slide-1) lo schema del beamforming è in 2D; subito sotto c’è il link alla [variante 3D facoltativa](modulo1/anteprima-beamforming-3d.html) su una pagina separata. Le pagine mostrano il numero di lezioni; il monte ore resta nel programma di dipartimento.

## Dove intervenire

- [Stili del sito](assets/css/style.css) e [funzioni comuni](assets/js/app.js). Nel Modulo 1, gli esperimenti sono in [modulo1.js](assets/js/modulo1.js) e la mappa di copertura in [copertura.js](assets/js/copertura.js).
- Le annotazioni delle lezioni abilitate usano `data-lesson-annotations` e salvano note ed evidenziazioni nel browser. I segni sono sospesi durante la presentazione ed esclusi dalla stampa. Dettagli e controlli nella [fase 15](piani/telecomunicazioni-5a/fasi/15/FASE.md).
- La prova di sincronizzazione dello studio è in [sincronizzazione/](sincronizzazione/), con due profili inventati. Da quella cartella, con Node.js 24 e pnpm, `pnpm install --ignore-scripts` e `pnpm test` eseguono la prova. `pnpm start --init` prepara il database locale e `pnpm start` avvia il servizio su `127.0.0.1:8787`. I dati di prova persistenti sono in `.local/sincronizzazione/`. Vedi la [fase 17](piani/telecomunicazioni-5a/fasi/17/FASE.md).
- **Controlli aperti.** Resa sulla LIM e stampa effettiva del Modulo 1. Per il video della 2.3 resta da provare la resa sulla LIM. Nella lezione 1.2 resta da rivedere l’uso di 1024 nel vecchio calcolatore con unità decimali.
