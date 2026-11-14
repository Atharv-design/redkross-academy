## Revision

### Summary

Hunting is proactive, hypothesis-driven searching for threats that evaded detection. Hypotheses come from intelligence, ATT&CK gaps, incidents and environment changes, and require checked data. Techniques: searching, stacking, statistics, timelines and pivoting. In the tested hunts, interval CV isolated the beacon (0.004 versus next-best 0.345) without any IOC, stacking surfaced the single Word-to-PowerShell pair, and a scoping hunt found no other affected host within proxy coverage. Outcomes are findings, new detections, gaps or recorded negatives. Case records follow a fixed structure separating fact from interpretation; shift reports put the headline first and end with owned handover actions. AA24-038A shows long dwell times and living-off-the-land behaviour that demand behaviour-based hunting and long log retention.

### Important concepts

hypotheses, data checks, recorded outcomes.

### Key technical takeaways

coefficient of variation; stacking queries; UTC timelines.

### Glossary

| Term | Meaning |
|---|---|
| CV | Coefficient of variation (standard deviation / mean). |
| Dwell time | Time an adversary remains undetected. |
| Jitter | Random variation added to beacon intervals. |
| LOTL | Living off the land: abusing legitimate tools. |
| Pivoting | Moving from one entity to related entities. |
| Shift report | Structured handover at end of shift. |

### Common mistakes

hypothesis-free browsing; discarding negatives; narrative case notes without times.

### Revision questions

​1. Write two hunt hypotheses from AA24-038A. 2. Explain CV and its weakness. 3. List the shift report sections.

### Further reading

CISA AA24-038A [R1].

## References

- [R1] CISA, NSA, FBI et al. "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure", Advisory AA24-038A, 7 February 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a) Accessed: 2026-11-07. Supports: pre-positioning assessment, LOTL, five-year footholds, hunting guidance (ESENT events, VPN review, directories).
- [R2] MITRE ATT&CK. Enterprise matrix, content v20.1. URL: [https://attack.mitre.org/](https://attack.mitre.org/) Accessed: 2026-11-07. Supports: hypothesis sources from technique coverage.
- [R3] Lab evidence. hunt.py, hunt_output.txt, interval-CV comparison (CPython 3.14.4), 2026-11-07.
