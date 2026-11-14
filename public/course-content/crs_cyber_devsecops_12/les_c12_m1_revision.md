## Revision

### Summary

A secure SDLC places security in every stage. DevSecOps automates it and gives developers fast feedback and secure paved roads. NIST SSDF v1.1 (SP 800-218, February 2022) organises practices into PO, PS, PW and RV. Security requirements must be specific, testable, traceable and risk-prioritised. OWASP ASVS 5.0.0 (May 2025) supplies verifiable requirements by level. Activities run from requirements and threat modelling through coding, build scanning, testing, signed releases and operations. Gates have clear thresholds, block new findings first, use expiring waivers and must be proven to fail; the lab showed Semgrep exiting 0 without --error. Programmes are measured by remediation times, coverage and escape rates. The CrowdStrike Channel File 291 incident shows that content updates need validation, negative tests and staged rollout.

### Important concepts

shift left; testable requirements; gates that fail.

### Key technical takeaways

gate policy as code; exit codes; waiver data.

### Glossary

| Term | Meaning |
|---|---|
| ASVS | Application Security Verification Standard (OWASP). |
| DevSecOps | Integrating security into DevOps practices. |
| Gate | Checkpoint blocking progress on defined criteria. |
| Paved road | Secure default path provided to developers. |
| SSDF | Secure Software Development Framework (NIST SP 800-218). |
| Waiver | Time-limited, approved exception to a gate. |

### Common mistakes

vague requirements; gates that never fail; blocking on legacy backlog.

### Revision questions

​1. Name the four SSDF groups. 2. Write two testable requirements. 3. How do you prove a gate works?

### Further reading

NIST SSDF [R1]; OWASP ASVS [R2].

## References

- [R1] NIST. SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1", February 2022. URL: [https://csrc.nist.gov/pubs/sp/800/218/final](https://csrc.nist.gov/pubs/sp/800/218/final) Accessed: 2026-11-07. Supports: title, date; practice groups (from the document).
- [R2] OWASP. "Application Security Verification Standard". URL: [https://asvs.owasp.org/](https://asvs.owasp.org/) Accessed: 2026-11-07. Supports: ASVS 5.0.0 published 30 May 2025.
- [R3] CrowdStrike. "Executive Summary - Root Cause Analysis: Channel File 291", August 2024. URL: [https://crowdstrike.com/wp-content/uploads/2024/08/Executive-Summary_Root-Cause-Analysis_Channel-File-291.pdf](https://crowdstrike.com/wp-content/uploads/2024/08/Executive-Summary_Root-Cause-Analysis_Channel-File-291.pdf) Accessed: 2026-11-07 (verified for Course 03). Supports: 21 vs 20 fields; out-of-bounds read; remediation incl. staged deployment.
- [R4] Microsoft. "Helping our customers through the CrowdStrike outage", 20 July 2024. URL: [https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/](https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/) Accessed: 2026-11-07. Supports: 8.5 million devices, under 1%.
- [R5] Lab evidence. LAB_ASSETS/C12 test and scan outputs, 2026-11-07.
