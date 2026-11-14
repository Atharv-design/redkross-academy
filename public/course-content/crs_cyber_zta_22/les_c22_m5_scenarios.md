Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Analytics wants a full copy of production customer data in a test account.

**Task:** Respond.

> [!TIP] Model answer
> Decline unmasked restricted data in test; provide masked/tokenised or synthetic datasets, or an analytics environment with the same controls as production (classification-driven); document purpose (DPDP); time-limit access.
>
> **Lesson:** non-production is not exempt.

## Scenario 2

A DBA team also manages the KMS keys "for convenience".

**Task:** Fix.

> [!TIP] Model answer
> Move key administration to a separate security team; restrict DBAs to database operations; use IAM conditions so only workload roles decrypt; log and alert on key policy changes; record the change in an ADR.
>
> **Lesson:** custody separation is the point of CMKs.

## Scenario 3

A SaaS customer leaves and requests deletion, but backups retain data for a year.

**Task:** Design for this.

> [!TIP] Model answer
> Per-tenant keys enable crypto-shredding of that tenant's data in backups by destroying its key, with documented retention exceptions where law requires; design deletion workflows and evidence (Course 15 M02).
>
> **Lesson:** key design enables privacy operations.
