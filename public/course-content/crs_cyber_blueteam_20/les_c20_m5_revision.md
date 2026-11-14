## Revision

### Summary

Hunting is proactive, human-led and method-driven. PEAK (Bianco and Fetterman, April 2023) defines Prepare, Execute and Act with Knowledge, and three hunt types: hypothesis-driven, baseline and model-assisted. Hypotheses must be specific, testable and scoped. Data requirements are checked first. On Tamarind only 4/16 hosts send Security events, so H1's conclusions are bounded and a process fallback partly covers the rest. Stacking, baselining, time-window correlation and pivoting surface candidates. H2 reduced 61 process events to six rare pairs: five intrusion pairs on WS-07 and one administrator pair on ADM-01. Validation proves visibility with known positives and grades findings. Every hunt leaves a product: incident, detection, telemetry fix, baseline or report. The joint LOTL guidance makes baselines central to detecting abuse of built-in tools.

### Important concepts

denominators; rarity is not malice; null results with gaps.

### Key technical takeaways

check coverage before querying; seed tests; stack by role.

### Glossary

| Term | Meaning |
|---|---|
| Baseline | A documented picture of normal activity. |
| LOLBin | A legitimate binary abused by attackers. |
| M-ATH | Model-assisted threat hunting. |
| PEAK | Prepare, Execute, and Act with Knowledge. |
| Stacking | Frequency analysis across a population. |
| UEBA | User and entity behaviour analytics. |

### Common mistakes

hypotheses that cannot fail; "clean" without coverage; treating rare as malicious.

### Revision questions

​1. Name the three PEAK hunt types. 2. Write a hunt hypothesis for T1110.003. 3. Explain how to validate a null result.

### Further reading

[R1]; [R2].

## References

- [R1] CISA, NSA, FBI, DOE, EPA, TSA, ASD's ACSC, CCCS, NCSC-UK, NCSC-NZ. "Identifying and Mitigating Living Off the Land Techniques", February 2024 (PDF revision dated March 2025). URL: [https://www.cisa.gov/resources-tools/resources/identifying-and-mitigating-living-land-techniques](https://www.cisa.gov/resources-tools/resources/identifying-and-mitigating-living-land-techniques) Accessed: 2026-11-07. Supports: baseline gap, five detection best practices, LOLBin baselining.
- [R2] Bianco, D. (with Fetterman, R.). "Introducing the PEAK Threat Hunting Framework", Splunk blog, 18 April 2023. URL: [https://www.splunk.com/en_us/blog/security/peak-threat-hunting-framework.html](https://www.splunk.com/en_us/blog/security/peak-threat-hunting-framework.html) Accessed: 2026-11-07. Supports: phases and hunt types.
- [R3] MITRE. Enterprise ATT&CK 20.1, T1053.005 Scheduled Task. URL: [https://attack.mitre.org/techniques/T1053/005/](https://attack.mitre.org/techniques/T1053/005/) Accessed: 2026-11-07 (validated via STIX data). Supports: technique ID.
- [R4] Lab evidence. hunt.py, hunt_output.txt (CPython 3.14.4), 2026-11-07.
