## Revision

### Summary

Detection engineering follows a lifecycle from requirement to retirement. Logic types include signature, behavioural, threshold, correlation and anomaly; prefer behaviour and anticipate attacker-controlled values. Sigma expresses detections in portable YAML; the course rules passed sigma check and converted to Splunk, but conversion without a pipeline omitted the log source (EventID=1102). Unit tests with positive, negative and boundary cases (7 passing) protect logic during tuning. ATT&CK v20.1 maps detections to 15 tactics; the 2026 split created Stealth and Defense Impairment, and log clearing is now T1685.005 - mappings must be versioned. The Banyan storyline maps from T1566.001 through T1685.005. Each detection needs documentation, an owner and review.

### Important concepts

behaviour over values; test before deploy; version your mappings.

### Key technical takeaways

Sigma selections and conditions; pipelines; unittest for detections.

### Glossary

| Term | Meaning |
|---|---|
| ATT&CK | MITRE knowledge base of adversary tactics and techniques. |
| Backend | pySigma component rendering a target query language. |
| Detection as code | Managing detections with version control and tests. |
| Pipeline | pySigma field and logsource mapping. |
| Sigma | Generic detection rule format. |
| Tactic | Adversary goal in ATT&CK. |

### Common mistakes

mapping every possible technique; untested rules; converting without pipelines.

### Revision questions

​1. Write a Sigma rule skeleton from memory. 2. Map four storyline events. 3. Why do boundary tests matter?

### Further reading

SigmaHQ [R1]; ATT&CK [R2].

## References

- [R1] SigmaHQ. "Sigma - Generic Signature Format for SIEM Systems" (GitHub). URL: [https://github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma) Accessed: 2026-11-07. Supports: Sigma purpose and format.
- [R2] MITRE. "Enterprise Tactics", ATT&CK content v20.1. URL: [https://attack.mitre.org/tactics/enterprise/](https://attack.mitre.org/tactics/enterprise/) Accessed: 2026-11-07. Supports: 15 tactics; Stealth TA0005; Defense Impairment TA0112; T1070 under Stealth.
- [R3] MITRE ATT&CK. "Clear Windows Event Logs, T1685.005". URL: [https://attack.mitre.org/techniques/T1685/005/](https://attack.mitre.org/techniques/T1685/005/) Accessed: 2026-11-07. Supports: ID, tactic, created 14 April 2026.
- [R4] MITRE ATT&CK technique pages T1566.001, T1204.002, T1059.001, T1071.001, T1110.003, T1078, T1133, T1136.001, T1098.007, T1567.002. URL: [https://attack.mitre.org/techniques/](https://attack.mitre.org/techniques/) Accessed: 2026-11-07. Supports: mapping table IDs and tactics.
- [R5] Lab evidence. rk_office_spawns_shell.yml, rk_security_log_cleared.yml (sigma-cli 4.0.0, pySigma 2.0.2, Splunk backend 3.0.0); test_rules.py (CPython 3.14.4), 2026-11-07.
