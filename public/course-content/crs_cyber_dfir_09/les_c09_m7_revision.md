## Revision

### Summary

IR runs from preparation through detection and analysis, containment, eradication and recovery, to lessons learned. SP 800-61 Rev. 3 aligns this with CSF 2.0 functions. Preparation means a plan, playbooks, contacts, tested tools and access, telemetry, recovery foundations and exercises.

**Scoping is iterative:** indicators from each host feed estate sweeps until nothing new appears. Containment is timed by risk: immediate for active damage, coordinated across footholds where possible, and evidence-preserving. Eradication removes persistence, prefers rebuilds, resets credentials, fixes the entry point and is validated. In the tested lab, a baseline comparison found a planted, a deleted and a changed file. Recovery restores from pre-compromise backups in stages, with monitoring. Blameless lessons-learned reviews with owned actions close the loop. Maersk's NotPetya rebuild of 4,000 servers and 45,000 PCs shows the value of preparation.

### Important concepts

preparation decides outcomes; scope before eradication; validate recovery.

### Key technical takeaways

hash baselines; coordinated containment; pre-compromise restores.

### Glossary

| Term | Meaning |
|---|---|
| Baseline | Known-good record of system state. |
| Eradication | Removing all attacker access. |
| Gold image | Trusted build image for rebuilding systems. |
| Jump bag | Prepared IR kit. |
| Playbook | Step-by-step response guide for an incident type. |
| Scoping | Determining all affected systems and accounts. |
| Tabletop | Discussion-based IR exercise. |

### Common mistakes

restoring compromised backups; containing piecemeal; skipping credential resets.

### Revision questions

​1. List six preparation items. 2. Explain iterative scoping. 3. Give three eradication validation steps.

### Further reading

NIST SP 800-61 Rev. 3 [R1].

## References

- [R1] NIST. SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile", April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-07. Supports: Rev. 3 framing; supersedes Rev. 2 (2012).
- [R2] The Register. "After NotPetya, Maersk replaced everything", 25 January 2018. URL: [https://www.theregister.com/2018/01/25/after_notpetya_maersk_replaced_everything](https://www.theregister.com/2018/01/25/after_notpetya_maersk_replaced_everything) Accessed: 2026-11-07 (web-search cross-check with other reports). Supports: 4,000 servers, 45,000 PCs, 2,500 applications, ten days.
- [R3] CERT-In. "Directions under section 70B(6)", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 6-hour reporting.
- [R4] Lab evidence. baseline_diff.py and baseline_diff_output.txt (CPython 3.14.4), 2026-11-07.
