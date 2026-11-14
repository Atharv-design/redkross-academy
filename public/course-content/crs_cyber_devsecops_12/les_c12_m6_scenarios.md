Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer pushes a cloud access key to a public repository and deletes it two minutes later.

**Task:** Respond.

> [!TIP] Model answer
> Assume compromise. Public repositories are scanned by automated tools quickly. Deactivate the key immediately, then review the cloud audit logs for its use from the push time onward, and escalate if misuse is found. Replace the key with workload identity or the secrets manager, and add pre-commit and CI scanning. Clean history afterwards if required, and record the incident.
>
> **Lesson:** two minutes is enough. Revoke first.

## Scenario 2

A CI pipeline stores long-lived cloud keys as pipeline secrets.

**Task:** Improve the design.

> [!TIP] Model answer
> Use OIDC federation from the CI platform to the cloud, with short-lived credentials scoped to a role per pipeline and environment, and conditions on repository and branch. Remove the stored keys. Restrict who can modify pipeline definitions. Audit role use (Module 7).
>
> **Lesson:** remove the secret rather than guarding it harder.

## Scenario 3

A secret cannot be rotated without a two-day vendor process.

**Task:** Address the risk.

> [!TIP] Model answer
> Treat it as a risk finding. Minimise its scope (least privilege, IP restrictions), store it in the secrets manager with access logging, monitor its use, and agree an emergency rotation path with the vendor. Plan migration to a rotatable or federated mechanism, and record a time-limited risk acceptance.
>
> **Lesson:** rotation speed is a security property.
