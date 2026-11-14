1. Organisation: AWS Organizations with OUs Security, Infrastructure, Workloads-Prod, Workloads-NonProd, Sandbox; Azure management groups mirroring them. Root/management accounts used only for organisation administration, with hardware-key MFA.
2. Security account/subscription: organisation-wide CloudTrail and Azure Activity log export to an immutable log archive; security tooling delegated administration (Module 5).
3. Guardrails: SCPs deny disabling CloudTrail, leaving approved regions and creating IAM users with access keys; Azure Policy denies public storage access and requires TLS 1.2 (Module 6).
4. Identity: central IdP with SSO into AWS IAM Identity Center and Azure; no IAM users for people (Module 2).
5. Responsibility map: for each service in use, a row in the matrix of L03 with the team that owns each customer responsibility.
6. Threat model: per workload, the table of L05, reviewed at design and at every major change.
