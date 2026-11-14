**Components:**

- IdP (workforce) with SSO for all SaaS and internal apps; SCIM from HR for joiner/mover/leaver; conditional access policies evaluated per session (signals: user risk, sign-in risk, device compliance, location).
- Device management + EDR feeding compliance to the IdP.
- CIAM tenant for customers and partners' portal users, separate signing keys and admins.
- PAM: JIT elevation for cloud and server admin roles; PAWs for tier-0; session recording for database administration.
- Workload identity: Kubernetes service accounts -> cloud roles; CI/CD OIDC deploy roles; mTLS service identities.
- Logging: IdP sign-in and audit logs, PAM logs and device posture changes to the SIEM (Module 6) with 180-day retention.

Policy summary (represented in zt_pdp.py):

| Term | Meaning |
|---|---|
| restricted apps | -> entitled group + FIDO2 + managed compliant device |
| confidential | -> entitled group + MFA (>= push number match) + managed |
| internal | -> any staff + MFA; unmanaged allowed |
| medium risk | -> required strength +1 (step-up) |
| high risk | -> deny and alert |

**Failure handling:** if device posture is unavailable, restricted apps fail closed; internal apps may fail open with logging (explicit ADR, Module 1).
