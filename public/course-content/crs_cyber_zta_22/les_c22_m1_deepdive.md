**Context view:** customers (web/mobile), partners (courier APIs, webhooks), staff (ops, finance, support), external identity provider (SSO), cloud provider.

**Trust zones:** Z0 internet; Z1 edge (WAF, API gateway, ZTNA gateway); Z2 application tier (shipment-api, notifier); Z3 data tier (customer-db, object storage); Z4 management plane (IdP admin, cloud console, CI/CD); Z5 corporate devices; Z6 partners. Key boundaries and required controls:

| Term | Meaning |
|---|---|
| Z0->Z1 | TLS 1.2+ (Course 15 M06), WAF, rate limits, bot controls. |
| Z1->Z2 | authenticated requests only (OIDC tokens), per-request authorisation, mTLS between gateway and services. |
| Z2->Z3 | network allow-lists (Module 4), workload identity to the DB, least-privilege DB roles, encryption. |
| Z5->Z4 | phishing-resistant MFA, managed and compliant devices, privileged access workstations, just-in-time elevation (Module 2). |
| Z6->Z1 | signed webhooks (HMAC, Course 15 M04), partner-specific credentials, allow-listed endpoints. |
| CI/CD->Z2/Z3 | OIDC-federated deploy roles; signed artefacts verified at deploy (Course 12 M07). |

**Requirements traceability:** AR-01..AR-05 mapped to these controls, to risks R01-R06 and to CSF 2.0 categories (Course 17 M03). The lab arch_review.py (Modules 5-7) checks parts of this pack automatically.
