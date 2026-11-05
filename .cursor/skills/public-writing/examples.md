# Examples

## LinkedIn — post 0, intro

Pile: Paolo, 2026-11-05. Never published on LinkedIn. A colleague said he is glad to work with him because they do cool things and do them well. Two reasons to share: help people looking for information, get feedback from people with more experience. Starts tomorrow. Processes, technologies, implementations they find interesting.

```
Un collega mi ha detto che è felice di lavorare con me. Perché facciamo un sacco di cose fighe, e le facciamo bene.

Da lì ho pensato che quelle cose, fuori dal team, possono servire.

Il primo motivo: aiutare chi sta cercando informazioni concrete.
Il secondo: ricevere feedback da chi su quelle stesse cose ha già più esperienza di me.

Da domani inizio a scrivere qui. Processi, tecnologie, implementazioni che per noi hanno contato.

Non l'ho mai fatto. Parto da questo.
```

No hashtags. No product name. No series preview. "Fighe" stays: it is the colleague's reason, paraphrased, not a fake quote.

## LinkedIn — series 1, ready draft

Pile: Notion `40f8de78-8fba-8156-b119-de52551c4e6d`. Paths and the sister-post citation were stripped because that post is not public yet.

```
Se la fonte è sporca, la chat mente in modo convincente.

La documentazione del nostro ERP non è nata già pronta per l'assistente. È cresciuta a strati. Ognuno ha riparato un problema reale del precedente.

1. Tutto su Notion.
Pagine operative, link stabili, comodo da editare. Funzionava finché eravamo pochi a toccarla a mano.

2. Poi sul repo.
La doc era duplicata: Notion da una parte, il client dall'altra. L'integrazione AI stava sull'API, la versione nuova sul frontend. Un POC di assistant non era mai andato in produzione. Serve una sola fonte, una pipeline, e basta.

3. Regole per gli agenti.
Un file di stato da leggere all'inizio e aggiornare a fine iterazione. Poi un orchestrator di ciclo, con un punto obbligatorio sulla documentazione. Non "full agentic" per moda: l'agente principale tiene il contesto, così la doc non deriva.

4. Il repo come unica source of truth.
Da lì: publish verso Notion, inject in app, feed del vector store. La doc non è più un allegato. È un artefatto di prodotto.

5. Scrittura sul database vettoriale.
Postgres + pgvector. Embedding e LLM via Bedrock. L'ingestione vive dove vive la doc, non sull'API.

6. La chat sulla documentazione.
Accesa in staging. Prima domanda vera: «come funziona la sync prodotto in cassa?» Risposta imprecisa. Non era solo retrieve: chunking, distanza, link interni, pezzi da riscrivere. La chat non perdona i buchi. Li rende evidenti.

7. Ora il changelog.
Changelog come repo: un file per beta, produzione che raggruppa dal tag. Prima, però, riordinare la root. Altrimenti aggiungi un cassetto su un mobile storto.

Cosa ho imparato: ogni passo non è una feature AI. È ridurre il drift.

Notion → repo → regole agente → source of truth → vettori → chat → changelog.

La chat è l'ultimo miglio.

#documentation #softwarearchitecture #AI
```

## What this draft refused

- `giova-docs`, `STATUS.md`, `vector-seed`, commit hashes
- "Ne ho già scritto in Prima riordina i cassetti"
- A blog URL
- Metrics, customer names, production dates
