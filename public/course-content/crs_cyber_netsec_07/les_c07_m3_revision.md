## Revision

### Summary

IDS/IPS watch the traffic that firewalls allow and alert (IDS) or block (IPS) on malicious activity. An in-line IPS can stop attacks automatically, but a false positive blocks legitimate traffic, so IPS rules must be high-confidence; an IDS only alerts and is safer to run broadly. Sensors go at trust boundaries with visibility. Signature-based detection matches known-bad patterns - precise and low-false-positive, but blind to novel attacks; anomaly-based detection flags deviations from a normal baseline - catching novel activity (like scans and beaconing) but producing more false positives; the two are complementary. Every detector trades false positives against false negatives, and the base-rate problem (malicious events are rare) means even accurate sensors yield many false positives in absolute terms - so alert tuning is essential: suppress known-benign sources, set environment-appropriate thresholds, enrich and prioritise, so alerts are few, trusted and actionable. An un-tuned sensor causes alert fatigue and missed real alarms. The lab's behavioural detectors show tuning in miniature: a scan threshold (>=20 distinct ports in 120s) and a beacon threshold (>=8 contacts at near-constant interval) fire on the embedded scan (60 ports in 59s) and beacon (60s interval) while leaving normal, jittered traffic quiet.

### Important concepts

IDS vs IPS; sensor placement; signatures vs anomalies; false positives/negatives and base rates; alert tuning; scan and beacon detection.

### Key technical takeaways

run IPS in alert mode first and block only high-confidence rules; combine signatures and anomalies; tune to suppress benign noise and prioritise high-value contexts; measure alert quality.

### Glossary

| Term | Meaning |
|---|---|
| IDS | intrusion detection system (alerts, does not block). |
| IPS | intrusion prevention system (can block in-line). |
| signature detection | matching known-bad patterns. |
| anomaly detection | flagging deviations from a normal baseline. |
| alert tuning | making alerts few, high-value and actionable. |

### Common mistakes

deploying IPS blocking broadly on day one; relying on signatures alone; ignoring tuning; alerting on known-benign sources; chasing alert volume instead of quality.

### Revision questions

​1. Why must IPS rules be high-confidence? 2. How do signature and anomaly detection differ and complement each other? 3. Why is tuning essential given the base-rate problem?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-94: Guide to Intrusion Detection and Prevention Systems (IDPS)" (detection methods, signatures vs anomalies, tuning, placement). URL: [https://csrc.nist.gov/pubs/sp/800/94/final](https://csrc.nist.gov/pubs/sp/800/94/final) Accessed: 2026-11-08. Supports: IDS/IPS concepts, detection approaches, tuning, CS1.
- [R2] MITRE. "ATT&CK: Network Service Discovery (T1046)" and "Application Layer Protocol / C2 beaconing" concepts. URL: [https://attack.mitre.org/techniques/T1046/](https://attack.mitre.org/techniques/T1046/) Accessed: 2026-11-08. Supports: scan and beaconing patterns to detect.
- [R3] NIST. "SP 800-94" (false positives/negatives, alert management). URL: [https://csrc.nist.gov/pubs/sp/800/94/final](https://csrc.nist.gov/pubs/sp/800/94/final) Accessed: 2026-11-08. Supports: error types, base rate, alert fatigue.
- [R4] Lab evidence. flowcheck.py scan and beacon detection output and the tuned thresholds (CPython 3.14.4), LAB_ASSETS/C07/data/flowcheck_output.txt, 2026-11-08. Supports: the deep-dive detections and threshold tuning.
