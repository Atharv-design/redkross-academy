## Revision

### Summary

Threat actors, intrusion sets, campaigns and activity clusters are different things; vendor names do not align perfectly, so keep your own cluster identifiers and map them with confidence. The Diamond Model (Caltagirone, Pendergast, Betz 2013) describes events by adversary, capability, infrastructure and victim plus meta-features, and threads events together. Behaviour profiles support detection and clustering but are weak identity evidence. Campaign analysis builds events, clusters, timelines and competing hypotheses. Attribution has levels from technical clustering to sponsor responsibility; most organisations work at the first. In the lab six ATT&CK 20.1 groups shared all eight parent techniques of the campaign, showing that overlap is not attribution. Olympic Destroyer's copied Rich header showed deliberate false flags. Communicate the level claimed, likelihood and confidence separately, and alternatives.

### Important concepts

intrusion set versus actor; Diamond Model; attribution levels; false flags.

### Key technical takeaways

keep the adversary vertex unknown until evidence fills it; prefer distinctive behaviours; check internal consistency.

### Glossary

| Term | Meaning |
|---|---|
| Activity cluster | Working grouping of related activity. |
| Campaign | Grouped adversarial behaviour over time against targets. |
| False flag | Evidence planted to mislead attribution. |
| Rich header | Build metadata in Windows executables. |

### Common mistakes

naming actors from weak sources; overlap as attribution; adopting vendor names as fact.

### Revision questions

​1. Name the four core features. 2. Describe the four attribution levels. 3. Explain the Olympic Destroyer finding.

### Further reading

[R1]; [R3].

## References

- [R1] Caltagirone, S., Pendergast, A., Betz, C. "The Diamond Model of Intrusion Analysis", 2013. URL: [https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf) Accessed: 2026-11-07 (text extracted from the PDF). Supports: core and meta-features.
- [R2] Kaspersky GReAT. "The devil's in the Rich header", Securelist, 8 March 2018. URL: [https://securelist.com/the-devils-in-the-rich-header/84348/](https://securelist.com/the-devils-in-the-rich-header/84348/) Accessed: 2026-11-07. Supports: CS1.
- [R3] MITRE. ATT&CK Groups. URL: [https://attack.mitre.org/groups/](https://attack.mitre.org/groups/) Accessed: 2026-11-07. Supports: group profiles (lab used the STIX data, Enterprise 20.1).
- [R4] OASIS. "STIX Version 2.1" (Errata 01 OASIS Standard, 2 April 2025). URL: [https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html) Accessed: 2026-11-07. Supports: Threat Actor versus Intrusion Set.
- [R5] Lab evidence. actor_overlap.py, m04_overlap_output.txt, data/enterprise-attack.json (ATT&CK 20.1), 2026-11-07.
