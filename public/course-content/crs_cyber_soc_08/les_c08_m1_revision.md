## Revision

### Summary

A SOC detects, analyses, responds to, reports on and helps prevent incidents (MITRE's definition), within CSF Detect and Respond. Models are in-house, outsourced (MSSP/MDR) or hybrid; tiers cover triage, investigation and specialist work, supported by detection, intelligence and platform roles. Alerts move from generation through triage and investigation to dispositions (TP, BTP, FP, inconclusive), escalation, closure and feedback. Analysts follow shift routines with documentation and handovers. Metrics (MTTD, MTTA, MTTR, FP rate, coverage) need medians and quality checks; the demo showed mean MTTA 32.4 versus median 4.0 minutes. The Target case shows alerts need effective response; CERT-In's 6-hour reporting raises the stakes.

### Important concepts

tiers; dispositions; feedback loops; metric pitfalls.

### Key technical takeaways

course dataset and mini-SIEM; statistics.median.

### Glossary

| Term | Meaning |
|---|---|
| BTP | Benign true positive. |
| MDR | Managed detection and response. |
| MSSP | Managed security service provider. |
| MTTA/MTTD/MTTR | Mean time to acknowledge/detect/respond. |
| Playbook | Documented response steps for an alert type. |
| SIEM | Security information and event management. |
| SOAR | Security orchestration, automation and response. |
| SOC | Security operations centre. |

### Common mistakes

escalating by chat; closing without evidence; mean-only metrics.

### Revision questions

​1. Describe the alert lifecycle. 2. Compare MSSP and in-house SOCs. 3. Why use medians?

### Further reading

MITRE 11 Strategies [R1].

## References

- [R1] Knerler, K., Parker, I., Zimmerman, C. "11 Strategies of a World-Class Cybersecurity Operations Center", MITRE, 2022. URL: [https://www.mitre.org/news-insights/publication/11-strategies-world-class-cybersecurity-operations-center](https://www.mitre.org/news-insights/publication/11-strategies-world-class-cybersecurity-operations-center) Accessed: 2026-11-07. Supports: SOC definition and functions.
- [R2] US Senate Committee on Commerce, Science and Transportation, Majority Staff. "A 'Kill Chain' Analysis of the 2013 Target Data Breach", 26 March 2014. URL: [https://www.commerce.senate.gov/services/files/24d3c229-4f2f-405d-b8db-a3a67f183883](https://www.commerce.senate.gov/services/files/24d3c229-4f2f-405d-b8db-a3a67f183883) Accessed: 2026-11-07. Supports: missed automated warnings.
- [R3] CERT-In. "Directions under sub-section (6) of section 70B of the IT Act, 2000", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 6-hour reporting, 180-day logs.
- [R4] NIST. "CSF 2.0" (CSWP 29), February 2024. URL: [https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf) Accessed: 2026-11-07. Supports: Detect and Respond Functions.
- [R5] Lab evidence. make_dataset.py, minisiem.py, soc_metrics.py (CPython 3.14.4), 2026-11-07.
