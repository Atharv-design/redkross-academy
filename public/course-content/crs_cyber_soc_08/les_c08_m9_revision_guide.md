| Term | Meaning |
|---|---|
| Theme 1 | SOC operations (M01): tiers, alert lifecycle, metrics. Re-run soc_metrics.py and explain why mean MTTR (90.0 min) differs from the median (20.0 min). |
| Theme 2 | Telemetry (M02): endpoint, network and identity sources; UTC and clock offsets; collection pipelines. Self-check: which Banyan events have no host field, and why does that matter? |
| Theme 3 | SIEM (M03): parsing (the IST syslog line became 06:46:21Z), ECS-style normalisation, correlation (R2 self-join), dashboards and health. |
| Theme 4 | Triage (M04): priority = severity x confidence x criticality; validation by corroboration; the NULL filter pitfall (31 vs 40 rows); suppressions with expiry. |
| Theme 5 | Threat intelligence (M05): Pyramid of Pain, confidence and expiry, TLP 2.0, STIX 2.1; the expired IOC that matched an innocent VPN session. |
| Theme 6 | Detection engineering (M06): Sigma rules checked and converted (EventID=1102 without a pipeline; source="WinEventLog:Security" EventCode=1102 with splunk_windows); 7 unit tests; ATT&CK v20.1 mapping including T1685.005. |
| Theme 7 | Incident handling (M07): six-part escalation; CERT-In 6 hours; containment trade-offs; SHA-256 manifest and custody log. |
| Theme 8 | Hunting and documentation (M08): beacon CV 0.004 versus 0.345; stacking; recorded negatives; case record and shift report. |

**Key verified facts:** CERT-In Directions (28 April 2022) - 6-hour reporting, 180-day logs; NIST SP 800-61 Rev. 3 published April 2025; TLP 2.0 from August 2022; STIX 2.1 OASIS Standard 10 June 2021; ATT&CK v20.1 has 15 Enterprise tactics with Stealth (TA0005) and Defense Impairment (TA0112); AA24-038A (7 February 2024) reported Volt Typhoon footholds of at least five years; DOJ seized 63.7 BTC of the Colonial Pipeline ransom (7 June 2021).
