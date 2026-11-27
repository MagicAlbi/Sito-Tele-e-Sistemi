# Testi dell’Area docente

**Stato e base.** Approvato, pubblicato e verificato il 27 novembre 2026. La versione attiva su Cloudflare è `97402af2`. La versione precedente è `c5664d3b`, registrata nella [scheda sul tema](../tema-docente-e-testata/LAVORO.md).

**Proposta.** Nella schermata dopo l’accesso, «Area docente» è il titolo della pagina e della scheda del browser. Sparisce la riga «Telecomunicazioni 5A» sopra il titolo. Il collegamento alla home pubblica diventa «← Home». Nelle sezioni interne, «← Area docente» indica il ritorno al menu docente.

**File.** [prepara.mjs](prepara.mjs) produce il pacchetto locale `worker-testi-docente.mjs` nella cartella `.local/tema-docente-e-testata/`.

**Controlli.** Sintassi JavaScript verificata. In Chrome, con accesso fittizio, controllati la testata, il titolo della scheda e il ritorno alla home pubblica con un clic. Riprovati tema, icone, ricarica e uscita.

**Verifica online.** Con una sessione reale, la testata e il titolo della scheda mostrano «Area docente». Il clic su «← Home» ha aperto la home del sito «Telecomunicazioni».
