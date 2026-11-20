---
name: piani-a-fasi
description: Prepara il piano di un lavoro lungo, che non si chiude in una sessione sola (un’unità di apprendimento, la revisione delle verifiche dell’anno, un corso di recupero, il materiale di un progetto), e lo divide in fasi da svolgere una per sessione, con lo stato scritto nel piano. Usala quando il docente chiede di pianificare, organizzare o dividere in fasi un lavoro lungo, o quando chiede di eseguire una fase di un piano esistente.
---

# Piani a fasi

Un lavoro lungo si divide in fasi. Ogni fase si svolge in una sessione nuova e lascia tutto
quello che serve alla successiva in un file solo, il piano: la sessione dopo non ricorda
niente della precedente, il piano sì.

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

Scrivi il piano in `piani/[nome-breve]/PIANO.md`, con queste parti nell’ordine:

1. **Obiettivo**: che cosa esiste alla fine, in tre righe al massimo.
2. **Decisioni prese**: quello che è uscito dall’intervista, una riga per decisione.
3. **Fasi**: una tabella con le colonne N., Fase, Dipende da, Stato, Fatta il. Gli stati
   sono «da fare», «in corso», «fatta», «ferma» (quando serve una mia decisione).
4. **Prompt di apertura**: per ogni fase, un blocco da copiare in una sessione nuova.
5. **Dettaglio delle fasi**: per ognuna, che cosa produce, che cosa leggere prima, i
   criteri di accettazione e, vuoto finché la fase non è fatta, l’esito.
6. **Da decidere**: le domande ancora aperte, con la tua proposta.

Aggiungi il piano a `indice.md`, nella sezione «Piani». Crea il file o la sezione se manca.

Ogni fase produce qualcosa che si può controllare (un file, una tabella, una verifica) e
sta in una sessione. Se una fase dipende da un’altra, scrivilo; se non dipende, si può
fare in qualunque ordine.

**I criteri di accettazione si scrivono prima di cominciare**, e devono dire sì o no:
«ogni attività della scaletta ha i minuti e la somma fa 120», «ogni domanda della verifica
ha la soluzione e rimanda alla lezione da cui viene». Non vanno bene «materiale chiaro» o
«verifica equilibrata».

Il prompt di apertura di ogni fase ha questa forma:

```text
Fase [N] del piano in piani/[nome-breve]/PIANO.md: [titolo della fase].
Leggi AGENTS.md, il piano e il dettaglio di questa fase. Esegui solo questa fase.
Non fermarti finché i criteri di accettazione non sono soddisfatti, salvo che ti serva
una mia decisione. Alla fine scrivi l’esito nel piano e aggiorna la tabella.
Per il commit e la pubblicazione segui le regole di approvazione in AGENTS.md.
```

Prima di cominciare la prima fase fammi rileggere il piano e aspetta il mio via.

## 3. Quando esegui una fase

- All’inizio leggi la tabella: se una fase da cui dipendi non è fatta, fermati e dimmelo.
- Lavora solo sulla fase richiesta. Se scopri che una fase successiva va cambiata,
  scrivilo in «Da decidere» invece di cambiarla.
- Alla fine controlla i criteri uno per uno e scrivi nell’esito quali sono soddisfatti,
  quali no e quali non hai potuto controllare.
- Se la fase non è finita, segnala «in corso» o «ferma», scrivi dove ti sei fermato e qual
  è il prossimo passo concreto.

## Prima di dire che hai finito

- La tabella delle fasi corrisponde al dettaglio: stesse fasi, stessi numeri, stato e data
  aggiornati.
- Ogni fase ha il suo prompt di apertura e almeno un criterio che dice sì o no.
- Il piano non contiene nomi di studenti né altri dati personali.
- Nel messaggio finale dimmi che cosa hai fatto, quali criteri hai controllato e com’è
  andata, e qual è la prossima fase.
