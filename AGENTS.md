# Sito Tele e Sistemi - IIS J.C. Maxwell

## Progetto
- Repository: https://github.com/MagicAlbi/Sito-Tele-e-Sistemi
- Sito pubblico: https://magicalbi.github.io/Sito-Tele-e-Sistemi/
- Se la cartella di lavoro contiene `sito/.git`, la radice Git e `sito`; altrimenti usa la radice Git corrente. Non inizializzare un repository nella cartella superiore.
- Piattaforma didattica per 5A Telecomunicazioni, IIS J.C. Maxwell. HTML5, CSS Custom Properties e Vanilla JavaScript, sito statico GitHub Pages, nessun backend o framework pesante.
- Mantieni il design di `assets/css/style.css` e le API di `assets/js/app.js`: QuizEngine, PresentationMode, Progress e ThemeManager.
- Modulo 1 completato. La costruzione dei moduli è in pausa su richiesta del docente. Priorità attuale alla bozza di evidenziatori e note nel Modulo 1, fasi 14–16 del piano.
- Per i contenuti usa chunking visivo, simulatori quando utili, esempi reali e curiosita tecniche. Non modificare altri moduli senza richiesta.

## Lavori a fasi
- Usa elementi di gioco leggeri in tutto il sito per tenere viva l’attenzione, per esempio brevi sfide con riscontro immediato. Quando aggiungi o rivedi materiali, adatta l’attività all’obiettivo della lezione.
- Per i lavori che occupano più sessioni, usa `$piani-a-fasi` dalla radice Git. Trova i piani in `indice.md`, sezione «Piani». Il riepilogo è in `piani/<nome>/PIANO.md` e ogni riga della tabella collega alla scheda `fasi/<NN>/FASE.md`.
- Il piano contiene decisioni, dipendenze, stato e prossimo passo. La scheda di fase contiene il prompt, i criteri specifici e l’esito. Prima di iniziare la prima fase, fai approvare il piano al docente.
- Quando il docente propone un intervento che cambia il progetto, aggiorna autonomamente priorità, fasi e dipendenze. Stima lo sforzo di ogni fase e indica nel piano il modello da usare, scelto in base al lavoro.
- Una fase è «fatta» dopo che tutti i criteri applicabili sono stati superati e il docente ha approvato il risultato. Registra l’esito delle verifiche nella scheda e usa lo stato «in corso» fino all’approvazione.
- Per ogni fase, apri una nuova sessione nella radice Git, leggi piano e scheda, verifica che i prerequisiti siano conclusi e svolgi solo la fase richiesta. A fine sessione aggiorna la tabella del piano e scrivi nella scheda i controlli eseguiti e ciò che resta da fare.
- Per un intervento che si conclude in una sessione, lavora direttamente. Se incide su un piano già attivo, aggiorna le sole informazioni interessate.

## Alternanza tra PC
- Identificativo nel catalogo privato Istruzioni-generali: `sito-tele`. Usa la skill `magicalbi-session-sync` per avvio, salvataggio approvato e cambio PC.
- Istruzioni di progetto autorevoli: questo file e `.agents/skills/` nella radice Git. Copie di riferimento sono salvate nella repository privata Istruzioni-generali dopo l'approvazione.
- Prima di lavorare: controlla lo stato Git e sincronizza solo se non ci sono modifiche locali o divergenze. Mai reset, force-push o risoluzioni automatiche dei conflitti per sincronizzare.
- Dopo un lavoro verificato e approvato, usa la procedura di salvataggio della skill `magicalbi-session-sync` per caricare le modifiche interessate, compreso il piano quando pertinente. Il push su main pubblica automaticamente il sito: l'approvazione del lavoro deve comprendere la pubblicazione.
- Non dichiarare sincronizzato senza verifica del ramo remoto. Le bozze non approvate restano locali e vanno segnalate prima del cambio PC.

## Verifiche
- Controlla sintassi JavaScript, collegamenti relativi, pagine interessate, interazioni e stampa quando pertinenti. Per modifiche puramente documentali verifica percorsi, comandi e coerenza.
- Su GitHub Pages i percorsi includono `/Sito-Tele-e-Sistemi/`: conserva URL relativi per CSS, JS e navigazione interna.
- Non inserire dati identificativi o valutazioni degli studenti. Credenziali, profili del PC e stato interno di Codex non vanno nel repository.
