Trace one requirement through every layer (Tamarind, fictional):

```text
Policy POL-AC  "Access must be limited to business need and strongly
               authenticated."
Standard STD-AC-02  MFA requirements (a)-(c) as in L02.
Procedure PRC-AC-07  "Enrol a new user in MFA": steps, tools, records.
Control TL-04  (Module 3 UCS) owned by the IAM lead.
Evidence  monthly conditional-access export and enrolment coverage
          report.
Test     internal audit reconciles admin accounts against MFA (Module 6).
Exceptions EX-01 (terminal server), with compensating controls, CISO
         approval and an expiry of 2026-12-31.
Risk     R03 credential stuffing (residual depends on TL-04
         effectiveness).
Framework mappings  CSF PR.AA; ISO 27001 Annex A access and
         authentication controls; sector regulator requirements as
         applicable.
```

**Benefits:** an auditor can start from any point (a regulation, a risk, a system) and follow the chain. Gaps show up as a missing link, for example a standard with no procedure or a control with no evidence. Many GRC platforms model exactly this graph.
