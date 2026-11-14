| Term | Meaning |
|---|---|
| Theme 1 | Defensive engineering (M01): prevent-observe-detect-respond with feedback; six telemetry questions; coverage 0-3. Re-run coverage.py and explain why 26/33 (79%) overstates coverage when the security log reaches only 4/16 hosts. |
| Theme 2 | Endpoint detection (M02): 4688 needs two policies; Sysmon Event IDs 1, 3, 22 and ProcessGuid; logon types 2/3/10; the WS-07 tree with five flagged edges; evidence-first containment. |
| Theme 3 | Network detection (M03): DNS features (82 random TXT queries from 10.20.1.17); flow regularity (CV 0.083 at about 297 s); Suricata action/header/options; 4 alerts on the lab capture; mixed-direction rules need flowbits or "=>" in Suricata 8. |
| Theme 4 | Detection as code (M04): Sigma 2.1.0; four backslashes for two; 18 unit tests; sigma check/convert; a Git hook blocked " -Encoded ". |
| Theme 5 | Threat hunting (M05): PEAK; hypotheses with scope; data requirements (12/16 hosts blind to 4698); stacking (six rare pairs); seeded validation. |
| Theme 6 | Incident automation (M06): the automation ladder; two distinct approvers for tier 0; dry-run, idempotency, rate limits, input validation; entity resolution (88 alerts, one case). |
| Theme 7 | Purple-team validation (M07): replay versus emulation; ATT&CK 20.1 drift (T1070.001 -> T1685.005); 5/8 -> 8/8 with no regression; the documented " -e " false-positive risk. |
| Theme 8 | Capstone (M08): gates G1-G4; FP budget exceptions; manifests; hunt report versus executive summary; monitoring the monitoring. |

**Key verified facts:** Enterprise ATT&CK 20.1 (STIX collection modified 5 November 2026) has 15 tactics including Stealth (TA0005) and Defense Impairment (TA0112), plus 227 techniques, 479 sub-techniques and 706 detection strategies. The Sigma rules specification 2.1.0 is dated 2 August 2025. Sysmon's documentation page was published on 10 September 2026. The PowerShell 7 docs list -EncodedCommand | -e | -ec. Advisories: AA23-193A (12 July 2023), AA24-038A (7 February 2024) and AA24-326A (21 November 2024). CrowdStrike's RCA (6 August 2024) describes 21 versus 20 inputs, and Microsoft estimated 8.5 million devices. The S3 disruption was on 28 February 2017. GAO-18-559 describes an inspection certificate that had expired about 10 months before the breach, and an attack of about 76 days.
