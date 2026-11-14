## Revision

### Summary

SOAR connects tools, automates routine steps and executes response actions through connectors, within an incident-response process (NIST SP 800-61 Rev. 3, April 2025). Use the automation ladder: fully automate reversible read-only work; gate containment behind risk-tiered approvals (two distinct people for tier-0 assets); keep destructive, mass and legal actions manual. Safety patterns: dry-run default, idempotency, rate limits, input validation (alert text is untrusted), scope limits, fail-safe errors, rollback and least privilege. Entity resolution merged Tamarind's alerts into one case with 88 alerts from 7 rules. The engine's seven gate checks pass, its re-run repeats nothing and its audit log records every decision. The 2017 S3 disruption shows why validation, slowness and floors matter even for authorised operators following a playbook.

### Important concepts

blast radius; two-person control; idempotency.

### Key technical takeaways

pure-function policy tests; append-only audit; per-hour caps.

### Glossary

```text
CMDB      Configuration management database.
Connector An integration that performs actions on another system.
Playbook  A defined, versioned response procedure.
SOAR      Security orchestration, automation and response.
```

### Common mistakes

auto-containment from noisy rules; shell strings built from alerts; approvals without identity.

### Revision questions

​1. Place five steps on the ladder. 2. List six safety patterns. 3. Explain time-aware entity resolution.

### Further reading

[R1]; [R2].

## References

- [R1] Amazon Web Services. "Summary of the Amazon S3 Service Disruption in the Northern Virginia (US-EAST-1) Region" (event of 28 February 2017). URL: [https://aws.amazon.com/message/41926/](https://aws.amazon.com/message/41926/) Accessed: 2026-11-07. Supports: playbook, incorrect input, slower removal, minimum-capacity safeguards.
- [R2] NIST. SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management", April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-07. Supports: incident response within CSF 2.0.
- [R3] Lab evidence. soar.py, soar_output.txt (CPython 3.14.4), 2026-11-07.
- [R4] MITRE. Enterprise ATT&CK 20.1 STIX data (for rule tags used in case grouping). URL: [https://github.com/mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) Accessed: 2026-11-07. Supports: technique IDs on alerts.
