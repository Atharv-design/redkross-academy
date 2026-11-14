Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A team says "we don't have time for threat modelling".

**Task:** Propose a lightweight approach.

> [!TIP] Model answer
> Run 45-minute sessions only for features that cross a trust boundary or handle personal data. Use a one-page template: diagram, top threats by STRIDE, abuse cases and owners. Store it in the pull request or repository, and turn the outputs into backlog items and tests. Security champions can facilitate.
>
> **Lesson:** small and regular beats big and never.

## Scenario 2

The register has 60 open items and no one acts on them.

**Task:** Fix the process.

> [!TIP] Model answer
> Prioritise with agreed scales. Merge duplicates. Assign owners and target dates for the high risks. Formally accept the low ones with expiries. Add the register check to the pipeline (expired acceptances fail), and review it monthly with the product owner.
>
> **Lesson:** a register needs decisions and ownership.

## Scenario 3

A new partner integration sends shipment updates to your API via webhooks.

**Task:** Identify the main threats and mitigations.

> [!TIP] Model answer
> **Threats:**
>
> - spoofed webhook sender (S): mitigate with signed payloads (HMAC with a shared secret, or mTLS) and timestamp/replay checks;
> - tampered payloads (T): mitigate with signature verification and schema validation;
> - floods (D): mitigate with rate limits and a queue;
> - disclosure (I) of the secret: store it in a secrets manager (Module 6);
> - repudiation (R): log the receipt IDs.
>
> **Lesson:** every new boundary-crossing flow gets a STRIDE pass.
