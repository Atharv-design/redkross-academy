Many architecture requirements can be checked from metadata (service catalogue, IaC, cloud inventory). Execution-tested checker (LAB_ASSETS/C22/arch_review.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
shipment-api    [confidential] OK
customer-db     [restricted  ] 2 finding(s)
    - key custody not separated: same team administers keys and data
    - log retention 90d < 180d (CERT-In)
payroll-export  [restricted  ] 4 finding(s)
    - restricted data must use a customer-managed key in KMS/HSM
    - no central logging (blind spot for detection and investigation)
    - log retention 30d < 180d (CERT-In)
    - admin MFA 'otp' not phishing-resistant
partner-sftp    [confidential] 3 finding(s)
    - TLS 1.0 below minimum 1.2
    - admin MFA 'password' not phishing-resistant
    - internet-facing without policy enforcement point (direct exposure)
summary: 9 findings across 4 services
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4)
```

**Reading it:**

- customer-db uses a CMK, but the same team (app-ops) administers keys and data - custody is not separated, so one compromised admin account defeats encryption's protective value.
- payroll-export uses the provider default key for restricted payroll data, has no central logging, short retention and weak admin MFA - four findings that together describe a high-risk design.
- partner-sftp is internet-facing with TLS 1.0 and no enforcement point - exposure and protocol findings (Modules 3-4; Course 15 M06).

Such checks belong in architecture review gates and CI (policy as code, Course 12/21), producing evidence for assurance (Module 7).
