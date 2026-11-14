## Revision

### Summary

Resilience combines continuity (keep processes running), DR (restore technology), crisis management and cyber-specific recovery. References include ISO 22301, NIST SP 800-34 Rev. 1 (with its BIA template) and the CSF PR.IR and Recover categories. The BIA identifies processes, impacts over time, MTD, RTO (at most MTD), RPO and dependencies. The tested toolkit found a dispatch RTO undermined by a 12-hour courier API and a portal RPO "gap" that needs interpretation for a stateless tier. Strategies span people, process, sites, technology, suppliers and communications. Cyber recovery needs immutable backups, clean-room restoration, identity first, and forensic coordination, and can take months. Testing ranges from walkthroughs to full recovery, with results feeding the BIA. The July 2024 CrowdStrike outage (about 8.5 million devices) showed the need for supplier-outage plans and manual workarounds.

### Important concepts

BIA-driven objectives; capability vs objective; tested recovery.

### Key technical takeaways

MTD/RTO/RPO rules; dependency checks; runbook structure.

### Glossary

| Term | Meaning |
|---|---|
| BIA | Business impact analysis. |
| BCP | Business continuity plan. |
| DR | Disaster recovery. |
| MTD | Maximum tolerable downtime. |
| RPO | Recovery point objective. |
| RTO | Recovery time objective. |
| Tabletop | Discussion-based exercise. |

### Common mistakes

IT-only BIAs; untested backups; ignoring supplier outages.

### Revision questions

​1. Define MTD, RTO and RPO. 2. Why check dependencies? 3. List four cyber-recovery requirements.

### Further reading

NIST SP 800-34 Rev. 1 [R1].

## References

- [R1] NIST. SP 800-34 Rev. 1, "Contingency Planning Guide for Federal Information Systems", May 2010 (updated November 2010). URL: [https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) Accessed: 2026-11-07. Supports: contingency planning guidance and BIA template.
- [R2] Microsoft. "Helping our customers through the CrowdStrike outage", 20 July 2024. URL: [https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/](https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/) Accessed: 2026-11-07 (verified for Course 03). Supports: 8.5 million devices, under 1%.
- [R3] British Library. "Learning lessons from the cyber-attack", 8 March 2024. URL: [https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf](https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf) Accessed: 2026-11-07. Supports: catalogue return 15 January 2024; ongoing rebuild.
- [R4] Lab evidence. grc_toolkit.py bia output, 2026-11-07.
