Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Staff paste customer records into a public AI chatbot to draft replies.

**Task:** Respond.

> [!TIP] Model answer
> Treat it as a potential personal data disclosure to a third party: assess what was shared and the vendor's terms; involve the DPO; provide an approved tool with suitable terms and controls; apply DLP and policy; train staff.
>
> **Lesson:** give people a safe alternative and govern the data flow.

## Scenario 2

A team wants to index the whole HR file share for an internal assistant.

**Task:** Advise.

> [!TIP] Model answer
> Do not index everything with one account. Classify content; exclude restricted HR records (salaries, health, investigations); index with per-document ACLs enforced at retrieval; run ingestion audits; complete a privacy impact assessment; log and monitor access.
>
> **Lesson:** an index is a new data store with the same obligations.

## Scenario 3

A customer asks Banyan to delete their data, including from "the AI".

**Task:** Explain what must happen.

> [!TIP] Model answer
> Delete or anonymise the customer's records in source systems and in the retrieval index (chunks and embeddings), conversation logs and analytics according to retention rules, and confirm vendor deletion; if their data trained a model, assess retraining or documented exceptions under law.
>
> **Lesson:** deletion must follow data lineage.
