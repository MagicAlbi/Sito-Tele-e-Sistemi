---
name: piani-a-fasi
description: Organizza lavori didattici di più sessioni con un piano breve, dipendenze esplicite e una cartella per fase. Usala per preparare, riorganizzare o eseguire le fasi di un lavoro lungo.
---

# Piani a fasi

Un lavoro lungo si divide in fasi, una per sessione. Il piano principale mostra a che
punto siamo. Il file di ciascuna fase raccoglie il lavoro, i riferimenti e l’esito che
serviranno alle sessioni successive.

Per un lavoro che si chiude in una sessione il piano non serve: dillo e fallo direttamente.

## 1. L’intervista, prima del piano

Prima di scrivere il piano fammi qualche domanda, una alla volta, al massimo sei. Guarda
prima l’archivio (programmazioni, lezioni, verifiche già fatte) e non chiedermi ciò che
trovi lì. Mi servono:

- che cosa avrò in mano alla fine, e per quale classe;
- la scadenza e quanto tempo posso dedicarci;
- i materiali da cui partire;
- i vincoli: argomenti già svolti, strumenti che la classe ha o non ha, studenti con
  bisogni particolari (descritti in generale, mai per nome);
- che cosa voglio decidere io e che cosa lascio decidere a te.

Per ogni domanda proponimi la risposta che ti sembra migliore.

## 2. Il piano

In `piani/[nome-breve]/PIANO.md` tieni solo il riepilogo:

1. **Obiettivo** in tre righe al massimo.
2. **Decisioni prese** che valgono per tutto il lavoro.
3. **Fasi** con le colonne N., Fase, Dipende da, Stato, Fatta il. Collega il titolo
   al file della fase. Usa gli stati «da fare», «in corso», «fatta», «ferma»
   (quando serve una mia decisione).
4. **Criteri comuni** se valgono per più fasi.
5. **Da decidere** con le questioni aperte, le proposte e il collegamento alla prossima fase.

Crea una cartella per ogni fase dentro `fasi/`, numerata come in tabella (`01`, `02`, …).
In `piani/[nome-breve]/fasi/[NN]/FASE.md` metti un collegamento al piano, il **Prompt di
apertura** e il dettaglio del lavoro: che cosa produce, che cosa leggere prima, i criteri
di accettazione e l’**Esito**, inizialmente vuoto. Collega i materiali prodotti dalla
fase dal suo file e lasciali nella posizione richiesta dal progetto.

Ogni fase produce un risultato verificabile e sta in una sessione. Nella colonna
«Dipende da» scrivi i numeri di tutte le fasi che devono essere concluse prima, anche quelle
di altri moduli se servono materiali che producono. Verifica che i prerequisiti esistano
e che nessuna fase dipenda direttamente o indirettamente da sé. Usa «—» quando si può partire subito.

Aggiungi il collegamento al piano nella sezione «Piani» di `indice.md`. Crea il file o
la sezione se manca. Usa questa struttura per i nuovi piani e quando riorganizzi un piano
su richiesta. Per eseguire una fase di un piano già esistente, segui la struttura che trovi.

**I criteri di accettazione si scrivono prima di cominciare**, e devono dire sì o no:
«ogni attività della scaletta ha i minuti e la somma fa 120», «ogni domanda della verifica
ha la soluzione e rimanda alla lezione da cui viene». Non vanno bene «materiale chiaro» o
«verifica equilibrata».

Il prompt di apertura di ogni fase ha questa forma:

```text
Usa $piani-a-fasi per la fase [N] del piano [nome-breve].
Leggi AGENTS.md e piani/[nome-breve]/PIANO.md.
Apri piani/[nome-breve]/fasi/[NN]/FASE.md e verifica le dipendenze nella tabella del piano.
Se i prerequisiti sono completati, svolgi solo questa fase e verifica tutti i criteri applicabili.
Aggiorna l’esito nel file di fase e lo stato nella tabella del piano. Per il salvataggio e la pubblicazione segui AGENTS.md.
```

Prima di cominciare la prima fase fammi rileggere il piano e aspetta il mio via.

## 3. Quando esegui una fase

- Apri una nuova sessione nella radice del progetto. Leggi le istruzioni del progetto, il
  piano e il file della fase. Apri gli altri file di fase solo quando servono riferimenti,
  materiali o esiti. Se una fase da cui dipendi non risulta «fatta», fermati e dimmelo.
- Lavora solo sulla fase richiesta. Se scopri che una fase successiva va cambiata,
  scrivilo in «Da decidere» invece di cambiarla.
- Alla fine verifica i criteri comuni applicabili e quelli della fase. Scrivi nel file di
  fase quali hai soddisfatto e quali restano da verificare. Aggiorna stato, data se la fase è
  fatta e prossimo passo nel piano principale.
- Se la fase non è finita, segnala «in corso» o «ferma», scrivi dove ti sei fermato e qual
  è il prossimo passo concreto.

## Prima di dire che hai finito

- Ogni riga della tabella apre il file della fase giusta. Numero, titolo, stato e data
  corrispondono al lavoro registrato, e le dipendenze riflettono i materiali necessari.
- Ogni fase ha il suo prompt di apertura e almeno un criterio che dice sì o no.
- Il piano e le cartelle di fase sono privi di nomi di studenti e altri dati personali.
- Nel messaggio finale dimmi che cosa hai fatto, quali criteri hai controllato e com’è
  andata, e qual è la prossima fase.
