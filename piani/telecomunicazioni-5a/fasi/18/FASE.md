# Fase 18 · Sincronizzazione del Modulo 1

[Torna al piano](../../PIANO.md)

## Prompt di apertura

```text
Usa $piani-a-fasi per la fase 18 del piano telecomunicazioni-5a.
Leggi AGENTS.md e piani/telecomunicazioni-5a/PIANO.md.
Apri piani/telecomunicazioni-5a/fasi/18/FASE.md e verifica le dipendenze nella tabella del piano.
Se i prerequisiti sono completati, svolgi solo questa fase e verifica tutti i criteri applicabili.
Aggiorna l’esito nel file di fase e lo stato nella tabella del piano. Per il salvataggio e la pubblicazione segui AGENTS.md.
```

- **Risultato** In home, «Riprendi il tuo studio» apre il profilo di prova. Il Modulo 1 ritrova lezioni svolte, avanzamento del modulo, risultati dei quiz di autovalutazione, evidenziazioni e note.
- **Riferimenti** [Motore del sito](../../../../assets/js/app.js), [annotazioni](../../../../assets/js/annotazioni.js), [homepage](../../../../index.html) e [fase 17](../17/FASE.md).
- **Criteri** Completa una lezione e un quiz e crea un’evidenziazione e una nota in un browser. Accedi con lo stesso codice in un secondo browser e ritrova tutti i dati. Ogni azione invia subito la modifica. «Salvato» compare dopo la conferma del database. Chiudi il browser dopo la conferma e verifica che il dato sia già disponibile al nuovo accesso. Il pulsante di uscita dal sito non è richiesto perché ogni alunno usa il proprio account sul PC. Verifica modifiche e cancellazioni, aggiornamenti contemporanei e navigazione tra home e lezioni con il profilo attivo. Simula una disconnessione e il raggiungimento della quota gratuita. In entrambi i casi, il sito indica che le modifiche sono in attesa e le invia quando il servizio torna disponibile. Verifica che i dati salvati in precedenza nel browser siano recuperabili con conferma esplicita. Riprova il sito senza codice e verifica che il secondo profilo di fantasia parta separato.

## Esito

- **Anteprima locale** La home e il Modulo 1 condividono lo stesso indirizzo locale. Verificati in Edge l’avanzamento, il risultato del quiz, una evidenziazione e una nota, il recupero dopo il ripristino della connessione e il nuovo accesso. Il salvataggio parte al momento dell’azione. L’anteprima resta nella cartella locale ignorata da Git. Restano da integrare il servizio destinato al sito e le altre verifiche della fase.
- **Durata e aggiornamenti** Impostati 30 giorni per i nuovi accessi. Verificati la durata comunicata al browser, il profilo ancora attivo alla riapertura di Edge e il recupero di una modifica salvata da un’altra sessione tornando alla scheda già aperta, senza perdere una nota in scrittura.
