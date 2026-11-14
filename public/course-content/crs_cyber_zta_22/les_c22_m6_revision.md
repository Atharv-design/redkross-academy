## Revision

### Summary

Central logging is a pipeline - generate, collect, transport, store, use - designed with an approved policy, redundant collectors, encryption, immutable storage, adequate retention (at least 180 days under CERT-In), time synchronisation and pipeline-health alerts. Zero trust adds a telemetry set (IdP, PDP, PEP, EDR, DNS, cloud control plane, KMS) and continuous verification: sessions re-evaluated when inputs change, with monitoring signals for silent sources, fail-safe decisions, untracked policy changes, deny bursts and posture loss without revocation. Every component needs a chosen failure mode; restricted resources fail closed with break-glass. Single points of failure in logging, identity, PDPs, backups and update channels are removed by redundancy, independence and staged rollout. Incident-ready designs keep responders, backups and communications independent of production identity. The lab reviews found 16 design findings and five monitoring signals. CrowdStrike's July 2024 incident showed how a trusted component's failure mode and update path can decide the impact.

### Important concepts

pipeline integrity; continuous verification; failure modes; independence of recovery.

### Key technical takeaways

PDP decision logs are evidence; test every monitoring signal; staged rollout for security tooling.

### Glossary

| Term | Meaning |
|---|---|
| Break-glass | Controlled emergency access path. |
| Canary | First small ring in a staged rollout. |
| Fail closed | Deny when a decision cannot be made. |
| Fail open | Allow when a decision cannot be made. |
| RTO | Recovery time objective. |
| Heartbeat | Periodic signal proving a source is alive. |

### Common mistakes

logs kept only on the source; fail-open defaults nobody chose; backups administered from the production directory.

### Revision questions

​1. Design the failure mode for a restricted resource. 2. Name five zero trust telemetry sources. 3. Why monitor the logging pipeline itself?

### Further reading

CrowdStrike PIR [R1]; SP 800-160 Vol. 2 [R5]; event logging guidance [R4].

## References

- [R1] CrowdStrike. "Preliminary Post Incident Review (PIR): Content Configuration Update Impacting the Falcon Sensor and the Windows Operating System (BSOD)", 24 July 2024. URL: [https://www.crowdstrike.com/en-us/blog/falcon-content-update-preliminary-post-incident-report/](https://www.crowdstrike.com/en-us/blog/falcon-content-update-preliminary-post-incident-report/) Accessed: 2026-11-08. Supports: 04:09 and 05:27 UTC, sensor 7.11+, Mac and Linux unaffected, Channel File 291, Content Validator bug, staggered canary deployment and customer control commitments.
- [R2] Microsoft (D. Weston). "Helping our customers through the CrowdStrike outage", 20 July 2024. URL: [https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/](https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/) Accessed: 2026-11-08. Supports: 8.5 million devices, under one percent.
- [R3] NIST. SP 800-92 Rev. 1 (Initial Public Draft), "Cybersecurity Log Management Planning Guide", 11 October 2023. URL: [https://csrc.nist.gov/pubs/sp/800/92/r1/ipd](https://csrc.nist.gov/pubs/sp/800/92/r1/ipd) Accessed: 2026-11-08.
- [R4] ASD's ACSC with CISA and partners. "Best Practices for Event Logging and Threat Detection", 21 August 2024. URL: [https://www.cisa.gov/resources-tools/resources/best-practices-event-logging-and-threat-detection](https://www.cisa.gov/resources-tools/resources/best-practices-event-logging-and-threat-detection) Accessed: 2026-11-08. Supports: title, date, lead agency.
- [R5] NIST. SP 800-160 Vol. 2 Rev. 1, "Developing Cyber-Resilient Systems", December 2021. URL: [https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final](https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final) Accessed: 2026-11-08.
- [R6] NIST. SP 800-61 Rev. 3, April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-08. Supports: CSF 2.0 community profile for incident response.
- [R7] CERT-In. "Directions under section 70B(6)", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 180-day log retention.
- [R8] Lab evidence. resilience_review.py, make_decision_log.py, decision_monitor.py and saved outputs (CPython 3.14.4), 2026-11-08.
