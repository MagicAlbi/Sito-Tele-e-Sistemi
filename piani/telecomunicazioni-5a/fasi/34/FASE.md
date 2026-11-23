# Fase 34 · Area docente · collegamento e accesso riservato

[Torna al piano](../../PIANO.md)

## Prompt di apertura

```text
Usa $piani-a-fasi per la fase 34 del piano telecomunicazioni-5a.
Leggi AGENTS.md e piani/telecomunicazioni-5a/PIANO.md.
Apri piani/telecomunicazioni-5a/fasi/34/FASE.md e verifica le dipendenze nella tabella del piano.
Se i prerequisiti sono completati, svolgi solo questa fase e verifica tutti i criteri applicabili.
Aggiorna l’esito nel file di fase e lo stato nella tabella del piano. Per il salvataggio e la pubblicazione segui AGENTS.md.
```

- **Risultato** Area docente raggiungibile dal piè di pagina del sito e apribile dal browser su più PC. L’autenticazione è riservata al docente tramite Cloudflare Access sul piano gratuito.
- **Configurazione** Il docente entra personalmente nel pannello Cloudflare, seleziona il piano Free e indica la propria email nella regola di accesso. Cloudflare può chiedere un metodo di pagamento durante l’attivazione di Zero Trust, senza addebiti sul piano Free. I segreti del servizio si inseriscono direttamente nel pannello Cloudflare. Nel sito pubblico compare il solo collegamento all’Area docente.
- **Criteri** Verifica con dati inventati che senza l’identità autorizzata siano bloccati sia il pannello sia le funzioni che leggono o modificano i dati. Prova da due browser autorizzati la lettura della stessa classe e la sostituzione di un codice, conservando l’avanzamento. Le credenziali Cloudflare sono gestite personalmente dal docente e non sono inserite in chat, in Git o nei file del sito. Il sito degli studenti non espone nominativi e codici. Attendi l’approvazione del docente prima della pubblicazione.

## Esito
