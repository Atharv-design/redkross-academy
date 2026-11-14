## Revision

### Summary

Endpoints and identities are where intrusions turn a foothold into real access, so this module assesses PRIVILEGE BOUNDARIES (user->admin escalation paths, tiering per the Enterprise Access Model, least privilege) and CREDENTIAL EXPOSURE (secrets at rest, cached, in transit, or reused) - and, centrally, maps each tested behaviour to DEFENSIVE TELEMETRY. The identity-relevant ATT&CK techniques (verified current 2026-11-08) - T1078 Valid Accounts, T1087 Account Discovery, T1550 Use Alternate Authentication Material - are "living off the land": they abuse legitimate mechanisms, so detection must be BEHAVIOURAL (anomalous logons, bulk enumeration, orphan non-interactive auth) over authentication and directory/process telemetry, not signature-based. Each technique is paired with CONTAINMENT (MFA, tiered admin, logon restrictions, least privilege, Protected Users/credential hygiene). The lab's attackmap.py turns the plan's identity steps into a table of data source, detection and containment, and the engagement's job is to confirm whether each detection actually exists (tested in Module 7). Testing stays authorised, in scope, non-destructive (no lockouts), isolated and simulation-only, using lab accounts and synthetic data - never harvesting real users' credentials. The goal is to improve identity and endpoint defence, not to amass access.

### Important concepts

privilege boundaries; credential exposure; identity ATT&CK techniques; defensive telemetry; behavioural detection; containment; safe testing.

### Key technical takeaways

assess escalation/tiering/least-privilege and credential exposure; detect identity abuse behaviourally over authentication telemetry; pair detection with containment; test with lab accounts, non-destructively.

### Glossary

```text
privilege boundary  a separation between access levels (user/admin, tiers).
credential exposure  any way a secret becomes available to an attacker.
Valid Accounts (T1078)  abusing legitimate credentials across tactics.
defensive telemetry  the data (authentication, directory, endpoint) that reveals
    abuse.
behavioural detection  detecting by anomalous behaviour rather than signatures.
```

### Common mistakes

chasing access instead of detection; signature-only detection; harvesting real credentials; causing lockouts; detection without containment.

### Revision questions

​1. Why is Valid Accounts hard to detect by signature? 2. Name the primary identity telemetry and three behavioural detections. 3. Pair a detection with a containment for T1078.

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] MITRE. "ATT&CK - Valid Accounts (T1078)" (and Account Discovery T1087). URL: [https://attack.mitre.org/techniques/T1078/](https://attack.mitre.org/techniques/T1078/) Accessed: 2026-11-08. Supports: identity techniques and behavioural detection/containment.
- [R2] Microsoft. "Securing privileged access / Enterprise Access Model" (privilege tiering). URL: [https://learn.microsoft.com/security/privileged-access-workstations/privileged-access-access-model](https://learn.microsoft.com/security/privileged-access-workstations/privileged-access-access-model) Accessed: 2026-11-08. Supports: privilege boundaries and tiering.
- [R3] NIST. "SP 800-63B: Digital Identity Guidelines - Authentication" (credential and authentication guidance). URL: [https://pages.nist.gov/800-63-3/sp800-63b.html](https://pages.nist.gov/800-63-3/sp800-63b.html) Accessed: 2026-11-08. Supports: credential exposure and authentication containment.
- [R4] Lab evidence. attackmap.py mapping of the identity techniques (T1078/ T1087/T1550) to telemetry, detection and containment (CPython 3.14.4), LAB_ASSETS/C19/data/attackmap_output.txt, 2026-11-08. Supports: the telemetry- mapping deep dive.
