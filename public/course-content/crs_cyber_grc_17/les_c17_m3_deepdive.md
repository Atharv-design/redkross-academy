Fields for each control in a UCS (spreadsheet or GRC platform):

| Term | Meaning |
|---|---|
| control_id | TL-04 |
| title | MFA for all remote and admin access |
| statement | "All remote access and all administrative access to production systems require phishing-resistant MFA." |
| owner | IAM lead (first line); policy owner CISO |
| type / frequency | preventive, automated, continuous |
| evidence | IdP conditional-access policy export (monthly); exception register; coverage report |
| test procedure | obtain the policy export; reconcile admin accounts from the directory with MFA enrolment; sample remote logins for MFA claims; expect 100% coverage |
| mappings | CSF 2.0: PR.AA; ISO 27001:2022 Annex A: access control and authentication controls (cite exact control numbers from your licensed copy); CERT-In / RBI / SEBI references as applicable |
| risks mitigated | R03 (credential stuffing); R01 (ransomware entry) |
| status | implemented; last test 2026-10; result effective |

**Design points:**

- The statement is testable and measurable.
- The evidence is defined in advance, so audit requests are predictable.
- Mapping to risks connects compliance work to the register (Module 2).
- The test procedure is written for someone other than the owner (independence, Module 1).
