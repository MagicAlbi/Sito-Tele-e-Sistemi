# 📋 Documento di Passaggio di Consegne (Handover)
## Progetto: Sito Didattico Interattivo "Telecomunicazioni 5A"
**Docente:** Prof. Alberto Pignato — IIS J.C. Maxwell  
**Materia:** Telecomunicazioni (Classe 5A - Articolazione Telecomunicazioni)  
**Ambiente di lavoro:** Windows; la radice del clone Git contiene direttamente `index.html`, `assets/` e `modulo1/`. I percorsi locali possono variare tra PC.  
**Hosting attivo:** GitHub Pages (repo: `MagicAlbi/Sito-Tele-e-Sistemi`)  

---

## 🎯 1. Obiettivo e Visione del Progetto
Creare una piattaforma didattica interattiva moderna che **sostituisca completamente il libro di testo cartaceo** per il quinto anno (seguendo la programmazione di dipartimento del Maxwell).
- **Target studenti (18 anni):** Odiano i muri di testo noiosi. Il contenuto deve essere suddiviso visivamente ("chunking"), con **TL;DR in 15 secondi** all'inizio di ogni capitolo, **simulatori interattivi**, **animazioni**, **modelli 3D** e **curiosità tecnologiche / hacker / real-life** collegate a cose che usano ogni giorno (es. gaming, console, smartphone, TikTok, sicurezza Wi-Fi).
- **Strumento per il docente in classe:** Ogni lezione ha una **"Modalità Presentazione"** (`[data-present]`) a tutto schermo per la LIM/proiettore, navigabile da tastiera (frecce / spazio), che sostituisce le slide di PowerPoint.
- **Verifiche e compiti in classe:** Quiz con autocorrezione immediata, salvataggio bozza nel browser (`localStorage`), compiti con domande aperte ed esercizi su foglio impaginati per la **stampa pulita / esportazione in PDF** per la valutazione del docente.
- **Dictat tecnico:** Tutto **100% gratuito e client-side**, zero backend, zero server a pagamento, navigabile sia da PC d'aula che da smartphone/tablet.

---

## ⚙️ 2. Architettura & Stack Tecnologico
- **HTML5 semantico** + **CSS3 Custom Properties** (Dark-first, palette neon per i moduli, responsive, print media query).
- **Vanilla JavaScript puro** (nessun framework pesante tipo React/Angular):
  - `assets/css/style.css`: Design system completo (Inter + JetBrains Mono, orbs animati, glassmorphism, card neon, 3D viewport wrapper).
  - `assets/js/app.js`: 
    - `ThemeManager` (dark/light mode con persistenza).
    - `Progress` (tracking lezioni completate salvato su `localStorage`).
    - `ReadingProgressBar` (laser neon che segue lo scroll).
    - `ScrollReveal` (IntersectionObserver per transizioni fluide).
    - `ConfettiFx` (micro-motore canvas nativo per particelle/coriandoli a fine quiz).
    - `PresentationMode` (fullscreen per lezioni LIM).
    - `QuizEngine` (motore quiz interattivo con spiegazione formativa errori).
- **Three.js via CDN** (`r128` + `OrbitControls`): utilizzato per modelli 3D interattivi a 360°.

---

## 📂 3. Struttura dei File Esistenti

```text
Telecomunicazioni Sito Gemini/sito/
│
├── index.html                  # Dashboard principale (5 moduli, progress tracker, stats)
├── .nojekyll                   # Per bypassare Jekyll su GitHub Pages
│
├── assets/
│   ├── css/style.css           # Design system v2 (dark-first, tech/neon, print stylesheet)
│   └── js/app.js               # Motore JS (Theme, Quiz, Progress, Presenter, Confetti)
│
└── modulo1/                    # MODULO 1: Wireless LAN (COMPLETATO)
    ├── index.html              # Indice del modulo con card di tutte le lezioni e lab
    ├── lezione-1-1.html        # Introduzione WLAN, OSI vs 802.11, BSS/IBSS (simulatore live), associazione, curiosità tracciamento MAC
    ├── lezione-1-2.html        # Standard 802.11b/g/n/ac/ax/be, calcolatore throughput reale vs scatola, video OFDMA, curiosità Hedy Lamarr
    ├── lezione-1-3.html        # Spettro 2.4/5/6 GHz, simulatore interferenza canali (campane spettrali SVG), curiosità forno microonde e radar DFS
    ├── lezione-1-4.html        # CSMA/CA, simulatore nodo nascosto (collisione vs RTS/CTS), timer NAV, curiosità Airtime Fairness
    ├── lezione-1-5.html        # Strato fisico, MODELLO 3D THREE.JS (antenna MIMO + fascio Beamforming a 360°), OFDM, tabella QAM
    ├── lezione-1-6.html        # Link Budget con calcolatore interattivo pareti, storia WEP crack in 60s, WPA3 Dragonfly (SAE), falla WPS
    ├── lab-copertura.html      # Laboratorio virtuale: Heatmap RF interattiva (drag & drop AP su planimetria scolastica con pareti)
    └── verifica.html           # Verifica formale (timer 45 min, 10 quiz con voto, 2 quesiti aperti, esercizio su foglio, esporta PDF)
```

---

## 🚀 4. Prossimo Obiettivo: MODULO 2 (Sistemi di Accesso Remoto & Reti WAN)
Il lavoro deve ora proseguire con la creazione della cartella `sito/modulo2/`.

### Collegamento Narrativo tra M1 e M2:
> *"Nel Modulo 1 abbiamo visto come il tuo smartphone si collega via radio all'Access Point. Ma come fa quell'Access Point a parlare con i server di Google a Dublino o con i datacenter di AWS? Qui entrano in gioco le reti geografiche WAN e i sistemi di accesso remoto."*

### Programmazione di Dipartimento per il Modulo 2 (30 Ore — 1° Quadrimestre):
1. **Lezione 2.1 — Il Canale Fisico e le Interfacce DTE / DCE:**
   - Modello di riferimento per la comunicazione su canale fisico.
   - Differenza tra DTE (Data Terminal Equipment, es. Router/PC) e DCE (Data Circuit-terminating Equipment, es. Modem/CSU/DSU).
   - Segnali di sincronismo e controllo (clock RX/TX, RTS, CTS, DTR, DSR, Carrier Detect).
   - Interfacce storiche e industriali (RS-232, V.35, collegamenti seriali).
   - *Curiosità:* Perché i cavi seriali "Null-Modem" incrociavano TX e RX e come i primi hacker usavano i modem acustici a 300 baud.

2. **Lezione 2.2 — Sistemi di Accesso Remoto & Reti WAN:**
   - Classificazione WAN: commutazione di circuito (PSTN, ISDN) vs commutazione di pacchetto.
   - Linee dedicate punto-punto (CDN - Collegamenti Diretti Numerici a 64 kbps / 2 Mbps flussi E1).
   - Reti WAN storiche e moderne: X.25, Frame Relay, ATM fino a MPLS.

3. **Lezione 2.3 — Architetture xDSL e Fibra Ottica (FTTx):**
   - Dal doppino telefonico in rame alla luce: ADSL (asimmetria download/upload, frequenze fino a 1.1 MHz) e VDSL2.
   - L'evoluzione verso la fibra: **FTTC** (Fiber to the Cabinet con armadio ripartilinea), **FTTH** (Fiber to the Home con GPON - Gigabit Passive Optical Network).
   - Splitter ottici passivi (senza alimentazione elettrica) e velocità simmetriche fino a 2.5/10 Gbps (XGS-PON).
   - *Curiosità:* Come il "diafonia" (crosstalk) e l'ossido sul rame rallentavano le ADSL quando pioveva, e il Vectoring come cancellazione attiva del rumore.

4. **Lezione 2.4 — Protocolli di Linea WAN:**
   - Protocolli di livello 2 su tratte punto-punto: HDLC (High-Level Data Link Control) e framing con bit stuffing.
   - **PPP (Point-to-Point Protocol)**: architettura, LCP (Link Control Protocol), NCP (Network Control Protocol).
   - Meccanismi di autenticazione: **PAP** (in chiaro, insicuro) vs **CHAP** (Challenge Handshake Authentication Protocol con hash MD5).
   - **PPPoE (PPP over Ethernet)**: perché il tuo modem/router di casa usa ancora il protocollo PPPoE con username e password per aprire la sessione con TIM/Vodafone/Fastweb.

5. **Lezione 2.5 — Introduzione Fondamentale al Routing (Richiesto dal Docente):**
   - *Nota didattica del prof:* Gli studenti conoscono indirizzi IPv4 e subnetting, ma **non hanno ancora affrontato il routing**.
   - Spiegazione intuitiva: come un router decide dove mandare un pacchetto che non appartiene alla sottorete locale.
   - Ruolo del **Default Gateway**.
   - Anatomia di una **Tabella di Routing** (Network Destination, Netmask, Gateway/Next-Hop, Interface, Metrica).
   - Rotte statiche vs dinamiche (concetto base di protocolli di routing IGP come RIP/OSPF).

6. **Laboratorio Virtuale M2 (`lab-wan.html`):**
   - Simulatore interattivo: calcolatore di attenuazione del doppino di rame xDSL in base alla distanza dall'armadio (FTTC) oppure simulatore visivo di una tabella di routing (immetti un IP di destinazione e osserva quale riga della tabella effettua il *longest prefix match* e inoltra il pacchetto sul Next-Hop corretto).

7. **Verifica Sommativa M2 (`verifica.html`):**
   - Stessa struttura del Modulo 1: Quiz a risposta multipla autocorretto + domande aperte + esercizio di subnetting/routing su foglio con esportazione PDF.

---

## 🎨 5. Linee Guida per il Nuovo Assistente (ChatGPT / Codex)
1. **Mantieni la stessa identica struttura di design:**
   - Usa le classi CSS già definite in `assets/css/style.css` (`.lesson-hero`, `.slide`, `.box-curiosity`, `.interactive-wrap`, `.quiz-wrap`, `.def-grid`, `.tldr`).
   - Il colore tematico del Modulo 2 è il **Viola / Violet**: `--m-color: var(--m2)` (definito come `#a78bfa` nel CSS).
2. **Zero framework esterni:** continua a usare HTML5 e JavaScript nativo (`app.js`).
3. **Chunking visivo:** non creare mai muri di testo; usa tabelle comparative, box colorati, elenchi puntati e schemi visivi.
4. **Curiosità Tech per 18enni:** inserisci sempre nei box `.box-curiosity` aneddoti reali, trucchi di networking o analogie con videogiochi, streaming e smartphone.
5. **Autonomia:** per ogni lezione includi sempre il componente quiz in fondo invocando `QuizEngine.init('quizContainer', questions)` affinché la pagina sia subito funzionante.

## 6. Pubblicazione e alternanza PC (13 novembre 2026)

- Repository attivo: https://github.com/MagicAlbi/Sito-Tele-e-Sistemi
- Sito: https://magicalbi.github.io/Sito-Tele-e-Sistemi/
- GitHub Pages pubblica `main`, cartella radice `/`. Il contenuto di questa cartella sito è la radice del repository remoto.
- AGENTS.md e HANDOVER.md viaggiano con il codice. Le skill di progetto vanno in `.agents/skills/`.
- Configurazione condivisa, skill personali e guida: repository privato MagicAlbi/Istruzioni-generali. Identificativo del progetto: `sito-tele`.
- Ogni PC abilita il progetto esplicitamente e conserva i percorsi solo nella configurazione locale. I progetti non abilitati non vengono clonati o aggiornati.
- Prima di lavorare: Sync.ps1 -Mode Start. Dopo approvazione (comprensiva della pubblicazione): Sync.ps1 -Mode Save -Project sito-tele -Approved. Prima del cambio PC: Check-End.ps1.
- Il Modulo 2 non è ancora stato realizzato.
