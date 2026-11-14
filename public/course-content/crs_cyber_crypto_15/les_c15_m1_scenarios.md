Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A vendor says its product uses "military-grade proprietary encryption".

**Task:** Evaluate.

> [!TIP] Model answer
> Ask which standard algorithms, modes and key lengths are used, which library, how keys are generated and stored, and whether there is independent review or a FIPS 140 validation. Proprietary algorithms and marketing terms are red flags. Require standard AEAD and published protocols in the contract.
>
> **Lesson:** public algorithms, secret keys.

## Scenario 2

A VM template is cloned to 200 servers, all with the same SSH host key.

**Task:** Explain the risk and fix.

> [!TIP] Model answer
> Any server's private key can impersonate all of them, and an attacker who obtains one key can intercept connections to any of them. Users also lose the ability to detect impersonation. Regenerate host keys on each server (first-boot generation), distribute new fingerprints, and fix the template build.
>
> **Lesson:** keys must be unique and generated on the device.

## Scenario 3

Data must remain confidential for 25 years.

**Task:** Advise on cryptographic choices.

> [!TIP] Model answer
> Use AES-256 for data at rest, and plan for post-quantum key establishment for data in transit (hybrid ML-KEM where supported). Use large keys, keep format version fields for agility, manage keys with re-encryption plans, and review the choices annually.
>
> **Lesson:** long lifetimes need margin and agility.
