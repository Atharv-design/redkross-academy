## Revision

### Summary

Severity measures potential harm and confidence measures rule reliability. Priority multiplies these by context such as asset criticality. A repeatable workflow reads, scopes, enriches, validates, groups, decides and documents within a time box. Enrichment draws on asset, identity, network, history and vulnerability data. Validation seeks corroboration across sources. In the dataset, the docm download, Word spawning PowerShell and the regular 220-byte beacon confirm one another. Beware filters that drop NULL fields: 31 versus 40 rows in the tested query. Dispositions are TP, BTP, FP or undetermined. Related alerts become one case, and unproven links stay hypotheses. False positives are fixed by narrow, reviewed tuning and expiring suppressions. In FireEye's 2020 detection, following up a common MFA-registration alert uncovered a major intrusion.

### Important concepts

context-based priority; corroboration; disposition discipline; tuning governance.

### Key technical takeaways

sqlite3.Row; NULL-safe filters; suppression records with expiry.

### Glossary

| Term | Meaning |
|---|---|
| Alert fatigue | Desensitisation from excessive alerts. |
| BTP | Benign true positive. |
| Disposition | Recorded outcome of triage. |
| Enrichment | Context added to alerts. |
| Suppression | Rule exception with scope and expiry. |
| Time box | Maximum time before escalation or handover. |

### Common mistakes

closing low alerts unread; wildcard exclusions; trusting "no results".

### Revision questions

​1. Write the priority formula and explain each term. 2. Give three validation checks for an Office-spawns-shell alert. 3. Why do suppressions need expiry dates?

### Further reading

NIST SP 800-61 Rev. 3 [R3].

## References

- [R1] US Senate Select Committee on Intelligence. Prepared statement of Kevin Mandia, CEO of FireEye, Inc., hearing on the SolarWinds compromise, 23 February 2021. URL: [https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-documents-os-kmandia-022321.pdf](https://www.intelligence.senate.gov/wp-content/uploads/2024/08/sites-default-files-documents-os-kmandia-022321.pdf) Accessed: 2026-11-07 (403 to automated retrieval; content cross-checked by web search). Supports: second-phone MFA registration alert and follow-up.
- [R2] Dark Reading. "FireEye's Mandia: 'Severity-Zero Alert' Led to Discovery of SolarWinds Attack", 2021. URL: [https://www.darkreading.com/threat-intelligence/fireeye-s-mandia-severity-zero-alert-led-to-discovery-of-solarwinds-attack](https://www.darkreading.com/threat-intelligence/fireeye-s-mandia-severity-zero-alert-led-to-discovery-of-solarwinds-attack) Accessed: 2026-11-07 (search result summary). Supports: low-severity characterisation and employee confirmation.
- [R3] NIST. SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management", April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-07. Supports: incident response context for triage and escalation.
- [R4] Lab evidence. triage.py, triage_output.txt and minisiem.py queries (CPython 3.14.4), 2026-11-07.
