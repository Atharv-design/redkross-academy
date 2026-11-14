## Revision

### Summary

SIEMs ingest, parse, normalise, enrich, store, search, correlate, alert and display. Parsing must handle formats, years and time zones (syslog example converted IST to 06:46:21Z) and its failures must be monitored. Normalised ECS-style fields let one search span sources, linking the firewall drop and VPN success from 203.0.113.66. Searches filter, aggregate, sort, bucket and join; stacking surfaces rare URLs. Correlation patterns are sequence, threshold, combination and absence; minisiem's six rules each fired once on the storyline. Dashboards inform but do not detect (the intrusion hour was not unusual in volume); SIEM health checks prevent silent failures. Cloud audit logs were decisive in the 2023 Exchange Online case.

### Important concepts

normalise first; correlate by entity; monitor health.

### Key technical takeaways

GROUP BY/COUNT(DISTINCT); self-joins for sequences; parameterised inserts.

### Glossary

| Term | Meaning |
|---|---|
| Correlation | Linking events into patterns. |
| ECS | Elastic Common Schema. |
| Enrichment | Adding context to events. |
| OCSF | Open Cybersecurity Schema Framework. |
| Parser | Code extracting fields from raw logs. |
| Stacking | Frequency analysis to find rare values. |

### Common mistakes

unmonitored parsers; case-sensitive searches; dashboards as detection.

### Revision questions

​1. Write a sequence rule in SQL. 2. Why normalise time zones at ingestion? 3. List five SIEM health metrics.

### Further reading

ECS reference [R1]; CSRB report [R2].

## References

- [R1] Elastic. "Elastic Common Schema (ECS) Reference". URL: [https://www.elastic.co/guide/en/ecs/current/index.html](https://www.elastic.co/guide/en/ecs/current/index.html) Accessed: 2026-11-07. Supports: field naming conventions.
- [R2] US Department of Homeland Security. "Cyber Safety Review Board Releases Report on Microsoft Online Exchange Incident from Summer 2023", 2 April 2024. URL: [https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer](https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer) Accessed: 2026-11-07. Supports: report existence and findings summary (customer detection detail from public reporting - SME review).
- [R3] OCSF project. "Open Cybersecurity Schema Framework". URL: [https://schema.ocsf.io/](https://schema.ocsf.io/) Accessed: 2026-11-07. Supports: alternative schema.
- [R4] Lab evidence. minisiem.py, normalise_demo.py (CPython 3.14.4), 2026-11-07.
