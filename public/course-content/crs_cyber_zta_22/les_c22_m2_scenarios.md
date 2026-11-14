Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An auditor finds an internet-facing remote desktop gateway excluded from MFA "temporarily" since 2022.

**Task:** Respond.

> [!TIP] Model answer
> Treat as a high risk: enforce MFA immediately (phishing-resistant for admins), or remove internet exposure behind a ZTNA gateway; review logs for past misuse; record and close the expired exception; add continuous verification that every external entry point enforces MFA.
>
> **Lesson:** no undated exceptions on access paths.

## Scenario 2

Developers store cloud access keys in CI variables.

**Task:** Redesign.

> [!TIP] Model answer
> Replace with OIDC federation from CI to scoped cloud roles conditioned on repository/branch/environment; remove stored keys and rotate them; log role use (Course 12 M07).
>
> **Lesson:** remove static secrets.

## Scenario 3

Executives refuse hardware keys as inconvenient.

**Task:** Propose a path.

> [!TIP] Model answer
> Offer platform passkeys on managed phones/laptops (phishing-resistant, low friction), number-matching push as an interim with risk acceptance, and require hardware keys only for tier-0 roles; brief executives on targeted phishing risk; measure rollout.
>
> **Lesson:** strong and usable can coexist.
