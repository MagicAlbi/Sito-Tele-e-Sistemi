# Proposta di stampa in tema chiaro · Modulo 1

**Base** `649de51` e [anteprima locale dell’Area docente](../anteprima-area-docente/LAVORO.md). Il riferimento grafico è la scheda che si apre selezionando una consegna nell’Archivio in tema chiaro.

**File.** [Stile di stampa](stampa-chiara.css) e [intestazioni](scheda-stampa.mjs), caricati dalla sola anteprima locale. La stampa apre con «Modulo 1 · Wi-Fi» e i dati della prova. Riprende i riquadri arrotondati, gli azzurri e gli esiti della scheda a video. Domande chiuse, aperte ed esercizi hanno intestazioni distinte. Le tabelle mantengono le colonne e usano bordi arrotondati e righe leggere. I controlli dell’Area docente e il titolo con la battuta spariscono sulla carta.

**Revisione.** Il totale delle chiuse compare sopra la prima domanda, in stampa e a video. Sulla carta le risposte omesse hanno un riquadro color ambra tenue e la colonna «Punti assegnati» ha caselle con gli stessi angoli dei campi a video. Se il punto è già stato inserito, il valore compare nella casella stampata.

**Correzione a mano.** In stampa le caselle dei punteggi e dei totali vuoti misurano 24 × 7 mm. «Schemi» occupa tutta la larghezza della griglia con un riquadro alto almeno 19 mm. Le celle da compilare e quelle senza punti previsti sono prive di trattini. I punteggi, anche pari a zero, e le note già inseriti restano visibili quando si stampa.

**Allineamenti.** Il totale delle chiuse mantiene il riquadro azzurro con testo della stessa dimensione del testo corrente. Nelle tabelle stampate il testo è centrato in verticale e i punti massimi lo sono anche in orizzontale. Nel riepilogo sono centrati anche i punti assegnati e le loro caselle. Tutte le tabelle usano lo stesso separatore continuo da un bordo all’altro della riga. Le righe delle tre sezioni nel riepilogo hanno la stessa altezza.

**Centratura delle caselle.** I riquadri sono spostati leggermente verso il basso per allinearli ai separatori visibili nel PDF. Il confronto prima e dopo, sulle pagine del PDF rese a 288 dpi, misura uno scarto verticale massimo di 0,14 mm per il campione di undici riquadri delle griglie, degli schemi e del riepilogo.

**Schemi e griglie degli esercizi.** Lo spazio intorno al riquadro degli schemi si misura dalla scritta «Schemi» al bordo superiore del riquadro e dal suo bordo inferiore al separatore. Le righe dei criteri e del totale delle due griglie degli esercizi hanno uguale altezza in stampa.

**Voto finale.** Il 27 novembre 2026 il docente ha approvato il layout e ha chiesto come ultimo ritocco un quadrato vuoto per il voto in decimi. Il quadrato bianco, con bordo sottile e angoli arrotondati, è a destra e occupa quasi tutta l’altezza dell’intestazione, in stampa singola e collettiva. Il lato è aumentato di 1 mm rispetto alla prima anteprima del quadrato.

**Anteprima.** Nell’[Archivio locale](http://127.0.0.1:18766/docente/?vista=archivio), aprire la 5A dell’11 novembre 2026, scegliere una consegna e usare «Stampa / Salva in PDF». Il PDF di esempio aggiornato è in `output/pdf/Modulo-1-Wi-Fi-stampa-con-quadrato-voto-arrotondato.pdf`, accanto al repository.

**Controlli.** [Verifica in Chrome](verifica-stampa.mjs) della stampa singola e collettiva, del formato A4 e dello stesso aspetto partendo dai due temi. Controllate visivamente tutte le pagine della stampa singola. Per avviare il collaudo, seguire la scheda dell’anteprima locale e poi eseguire `node in-corso/stampa-verifica-chiara/verifica-stampa.mjs`.

**Prossimo passo.** Il docente verifica l’ultimo ritocco nel PDF. La bozza è in `in-corso/`, esclusa dal sito.
