The course's controls combine into a reference architecture for a cloud workload:

| Term | Meaning |
|---|---|
| Organisation | landing zone with separate security, log-archive, backup, shared-services, production and non-production accounts/subscriptions; SCPs and Azure Policy guardrails (Modules 1, 6). |
| Identity | SSO with phishing-resistant MFA; no IAM users for people; roles and managed identities for workloads; PIM/JIT for administrators; break-glass accounts monitored (Module 2). |
| Network | private subnets; WAF and load balancer only at the edge; private endpoints; egress allowlists; IMDSv2 (Module 3). |
| Data | classification; BPA and private-only storage; customer-managed keys with separated custody; versioning and immutable backups in a separate account (Module 4). |
| Visibility | organisation trails and diagnostic settings to a protected archive and SIEM; tested detections; native services (Module 5). |
| Configuration | IaC with scanning gates; CSPM; drift detection; exceptions with expiry (Module 6). |
| Workloads | minimal signed images; OIDC CI federation; secrets manager; runtime monitoring (Module 7). |
| Response | IR roles, forensic account, runbooks, exercises (this module). |
