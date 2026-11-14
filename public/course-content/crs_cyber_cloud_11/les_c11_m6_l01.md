Patterns that recur across providers and incidents:

| Term | Meaning |
|---|---|
| Exposure | public storage, public databases, admin ports from 0.0.0.0/0, anonymous access to application data (Power Apps). |
| Identity | wildcard permissions, long-lived keys, roles trusting any principal (Module 2). |
| Encryption | unencrypted databases or disks, old TLS versions, provider keys where policy requires customer keys. |
| Logging | trails or diagnostic settings missing, access logs off, short retention (Module 5). |
| Resilience | no deletion protection, no versioning or soft delete, single-zone or locally redundant storage for critical data, no final snapshot. |
| Secrets | passwords in IaC, environment variables or images (Module 7). |
| Defaults | provider or product defaults that do not match the organisation's policy. |

Each pattern maps to a check that tools can run and to a guardrail that can prevent it.
