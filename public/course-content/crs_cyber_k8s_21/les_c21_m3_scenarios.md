Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An auditor asks for proof that secrets are encrypted at rest on a self-managed cluster. The team sends a screenshot of the API server flag.

**Task:** Explain why that is insufficient and what evidence to provide.

> [!TIP] Model answer
> A flag shows intent, not effect: the configuration may list identity first, the key may be wrong, or secrets written before enablement may be unencrypted. Provide the EncryptionConfiguration (with key material redacted) showing a real provider first; evidence that all secrets were rewritten after enablement (the change record and command output); a datastore-level test showing a known test value is not present in plain text and is stored with the provider prefix; and the KMS key policy and rotation record.
>
> **Lesson:** verify controls by testing their effect.

## Scenario 2

A colleague fixes a vulnerable environment variable by editing a running pod in production. The issue reappears the next morning.

**Task:** Explain why and describe the correct change path.

> [!TIP] Model answer
> The pod was recreated from its owner's template (rollout, eviction or node change), so the manual edit was lost. Change the template in the source of truth (Git), review it, let the pipeline apply it to the Deployment, and confirm the rollout. Detect manual edits with drift detection (Module 6) and limit who can edit pods directly.
>
> **Lesson:** change the declaration, not the instance.

## Scenario 3

Your organisation is choosing between a managed service and a self-managed cluster for payment workloads.

**Task:** List the security questions you would ask of each option.

> [!TIP] Model answer
> **Both:** RBAC and identity integration, network policy support, Pod Security and admission options, audit log access and retention, secret encryption (KMS), node patching responsibility, upgrade cadence, workload isolation options. Managed: what the provider operates and certifies, API endpoint exposure options, control-plane log availability, incident notification terms. Self-managed: who patches the API server and etcd, how etcd and backups are protected, how CIS/NSA guidance will be evidenced, staffing.
>
> **Lesson:** map responsibilities explicitly before choosing.
