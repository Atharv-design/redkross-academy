Every hunt ends with one of:

| Term | Meaning |
|---|---|
| Finding | malicious or policy-violating activity -> escalate (Module 7). |
| New detection | the logic can be automated -> detection engineering (Module 6), with tests. H1 could become a scheduled analytic with tuned thresholds. |
| Gap | the data required was not available -> telemetry request. |
| Negative | hypothesis tested with adequate data, nothing found -> record scope, queries, data and time range. A negative is valuable: it bounds risk and can be repeated. |

**A hunt record contains:** hypothesis; threat/intel basis; ATT&CK mapping; data sources and time range; queries (exact text); results; analysis; outcome; follow-up actions; analyst and date.
