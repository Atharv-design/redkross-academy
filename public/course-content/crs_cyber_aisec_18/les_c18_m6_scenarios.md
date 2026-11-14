Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A data scientist wants to download the top-trending model and deploy it next week.

**Task:** Define the approval steps.

> [!TIP] Model answer
> Provenance review (publisher, licence, card, formats), safe format only, sandboxed evaluation with the probe suite and utility tests, approval recorded in the AI-BOM, mirror to the internal registry, pin the digest, re-run release gates.
>
> **Lesson:** adoption is a controlled change.

## Scenario 2

The pipeline reports a model digest change after a routine pull.

**Task:** Respond.

> [!TIP] Model answer
> Stop deployment; determine why it changed (new upstream version or unexpected content); compare with the publisher's announced revision; treat as a new model requiring evaluation and approval; investigate if unexplained.
>
> **Lesson:** an unexpected digest is an incident until explained.

## Scenario 3

A partner supplies 5,000 documents for the RAG index.

**Task:** Design ingestion.

> [!TIP] Model answer
> Label as imported/untrusted; run ingestion audits (ACLs, PII, text addressed to assistants); sample human review; ingest as structured fields where possible; hash and manifest; evaluate the assistant before and after with regression probes; restrict retrieval of partner content to relevant queries.
>
> **Lesson:** data is part of the supply chain.
