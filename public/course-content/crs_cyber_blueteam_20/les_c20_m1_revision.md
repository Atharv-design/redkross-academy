## Revision

### Summary

Defensive engineering builds the prevent-observe-detect-respond system and the feedback loops that improve it. Priorities come from a threat model, not from the full ATT&CK matrix (227 techniques and 479 sub-techniques in Enterprise ATT&CK 20.1). Every telemetry source needs a specification: what, where (as a fleet share), how, how long, when and trust. ATT&CK 20.1 adds detection strategies, analytics and data components. It has also replaced Defense Evasion with Stealth and Defense Impairment, so mappings must be versioned. A coverage matrix joins telemetry, priorities and rules, scored 0-3 honestly, with partial fleet coverage marked. Tamarind's 79% hides a quarter-fleet security log, a blind registry gap and two visible gaps. AA23-193A shows a single well-chosen audit log, with a baseline, exposing a sophisticated intrusion.

### Important concepts

blind versus visible versus detected versus tested; denominators; telemetry as an attack surface.

### Key technical takeaways

tag rules with technique IDs; compute coverage from inventories; alert on silent sources.

### Glossary

| Term | Meaning |
|---|---|
| Analytic | A platform-specific description of detection logic (ATT&CK object). |
| Coverage matrix | A table scoring priority techniques against telemetry and detections. |
| Data component | The observable a detection needs (ATT&CK object). |
| Detection strategy | ATT&CK's description of how to detect a technique. |
| Telemetry | Machine-generated records of activity used for detection. |

### Common mistakes

counting rules instead of reporting hosts; heat maps without definitions; retention shorter than the time to discovery.

### Revision questions

​1. Define the four coverage scores. 2. List the six telemetry questions. 3. Explain why T1070.001 no longer appears in ATT&CK 20.1.

### Further reading

[R2]; ATT&CK detection strategies [R1].

## References

- [R1] MITRE. Enterprise ATT&CK 20.1, STIX 2.1 data (collection modified 2026-11-05) and tactics list. URL: [https://github.com/mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) and [https://attack.mitre.org/tactics/enterprise/](https://attack.mitre.org/tactics/enterprise/) Accessed: 2026-11-07. Supports: object counts, tactic names, revocation of T1070.001 by T1685.005.
- [R2] ASD's ACSC, CISA, FBI, NSA et al. "Best Practices for Event Logging and Threat Detection", 21 August 2024. URL: [https://www.cisa.gov/resources-tools/resources/best-practices-event-logging-and-threat-detection](https://www.cisa.gov/resources-tools/resources/best-practices-event-logging-and-threat-detection) Accessed: 2026-11-07. Supports: logging baseline guidance.
- [R3] CISA and FBI. AA23-193A "Enhanced Monitoring to Detect APT Activity Targeting Outlook Online", 12 July 2023. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-193a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-193a) Accessed: 2026-11-07. Supports: MailItemsAccessed detection, baseline, G5/E5 licensing note.
- [R4] Secondary: Industrial Cyber, "CSRB reports Microsoft Exchange breach by Storm-0558...", April 2024. URL: [https://industrialcyber.co/reports/csrb-reports-microsoft-exchange-breach-by-storm-0558-urges-security-reforms-following-espionage-incident/](https://industrialcyber.co/reports/csrb-reports-microsoft-exchange-breach-by-storm-0558-urges-security-reforms-following-espionage-incident/) Accessed: 2026-11-07. Supports: 16 June 2023 State Department alert; custom MailItemsAccessed rule (verify against the CSRB report itself).
- [R5] Lab evidence. coverage.py, coverage_output.txt (CPython 3.14.4), 2026-11-07.
