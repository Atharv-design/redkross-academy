Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A review finds a service account with an SPN, a password unchanged for three years, and membership of Domain Admins.

**Task:** Rank the risks and give a remediation plan.

> [!TIP] Model answer
> **Rank:** (1) the account is in Domain Admins AND Kerberoastable - a direct path to domain compromise, so it is the top priority; (2) the stale password compounds the roasting risk. Plan: immediately remove it from Domain Admins (a service account should not be there, Module 3); move it to a gMSA or set a long random password enforced by a PSO and enable AES; remove the SPN if the service is gone; confirm with dir_review.py that the HIGH finding clears; record the change and add a recurring review.
>
> **Lesson:** privileged + Kerberoastable is a top-priority path; fix privilege and the secret together.

## Scenario 2

An application server is configured for unconstrained delegation so that it can reach a database "on behalf of" users, including administrators.

**Task:** Explain the risk and propose a safer configuration.

> [!TIP] Model answer
> Unconstrained delegation means that if the application server is compromised, every user who authenticated to it - including any administrator - can be impersonated to any service, effectively handing over their credentials. Safer: use constrained delegation limited to the specific database service, or resource-based constrained delegation controlled by the database host; mark administrative accounts "cannot be delegated" or add them to Protected Users so they are never delegated; review delegation settings.
>
> **Lesson:** never use unconstrained delegation off a DC; constrain to named services and protect admins from delegation.

## Scenario 3

After an incident, responders believe a domain controller's secrets were exposed.

**Task:** Explain why the krbtgt account matters here and what recovery step is specific to it.

> [!TIP] Model answer
> If a DC's secrets were exposed, the krbtgt key may be known to the attacker, who could then forge golden tickets (valid TGTs for any user) at will - durable, hard-to-detect domain control that outlasts password resets.
>
> **Recovery specific to krbtgt:** rotate the krbtgt password TWICE (with sufficient interval for replication) to invalidate forged tickets, alongside broader credential resets and, given the forest boundary (Module 1), a forest-wide recovery assessment.
>
> **Lesson:** DC compromise implies krbtgt compromise; double-rotate krbtgt as part of recovery.
