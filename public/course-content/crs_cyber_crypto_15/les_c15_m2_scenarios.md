Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer proposes AES-CBC without a MAC "because it is standard".

**Task:** Respond.

> [!TIP] Model answer
> CBC without a MAC allows undetected tampering and padding-oracle attacks. Use an AEAD (AES-GCM or ChaCha20-Poly1305) through a high-level API. If CBC is required for compatibility, use encrypt-then-MAC with separate keys and constant-time verification.
>
> **Lesson:** integrity is not optional.

## Scenario 2

An auditor finds the same AES key used for all tenants and environments.

**Task:** Remediate.

> [!TIP] Model answer
> Introduce per-tenant and per-environment keys (or DEKs) under KMS KEKs, with key IDs in the format. Re-encrypt or re-wrap existing data progressively, restrict and log access, and rotate the old key out after migration.
>
> **Lesson:** key separation limits blast radius.

## Scenario 3

A customer invokes a deletion request for data that sits in encrypted backups for seven years.

**Task:** Explain options.

> [!TIP] Model answer
> **Options:** per-customer data keys, so destroying that key renders the customer's data in all backups unreadable (crypto-shredding); documented retention exceptions where the law requires retention; and restoring and purging backups if feasible. Design per-customer keys up front. Legal should confirm DPDP and other obligations.
>
> **Lesson:** key design enables privacy operations.
