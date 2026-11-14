## Revision

### Summary

ATT&CK Enterprise 20.1 has 15 tactics and, in the lab copy, 706 detection strategies, 1,773 analytics and 106 data components; detection strategies "detect" techniques and their analytics reference data components. Versions change (Defense Evasion retired; T1070.001 revoked by T1685.005); record the version and resolve revoked identifiers. Map behaviour, not indicators, at the level the evidence supports, with sources, and review mappings (CISA guidance v2.0, January 2023). Gap analysis against Nilgiri's six collected data components gave 1 COVERED, 6 PARTIAL and 2 BLIND (resource development, which only external intelligence can see). Gaps become use cases: collection (Network Traffic Content, Module Load, scheduled job events), detection, hunts, mitigations and external monitoring. Navigator layers communicate results; always state what a score means. AA24-038A showed behaviour-based defence against living off the land.

### Important concepts

detection strategies; data components; mapping discipline; visibility versus detection.

### Key technical takeaways

keep evidence per mapping; compare against the real inventory; define layer scores.

### Glossary

| Term | Meaning |
|---|---|
| Data component | ATT&CK unit of observable data (for example Process Creation). |
| Detection strategy | ATT&CK object describing how to detect a technique. |
| Layer | A Navigator JSON file of scored techniques. |
| Sub-technique | A more specific form of a technique. |

### Common mistakes

mapping IOCs; over-specific mapping; heat maps from marketing; ignoring versions.

### Revision questions

​1. Describe the detection model chain. 2. Explain COVERED versus tested. 3. List three use-case types.

### Further reading

[R1]; [R2].

## References

- [R1] MITRE. ATT&CK STIX data, Enterprise ATT&CK 20.1. URL: [https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json](https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json) Accessed: 2026-11-07. Supports: version, object counts, detection model.
- [R2] CISA. "Best Practices for MITRE ATT&CK Mapping", version 2.0, January 2023 (version 1.0 June 2021). URL: [https://www.cisa.gov/sites/default/files/2023-01/Best%20Practices%20for%20MITRE%20ATTCK%20Mapping.pdf](https://www.cisa.gov/sites/default/files/2023-01/Best%20Practices%20for%20MITRE%20ATTCK%20Mapping.pdf) Accessed: 2026-11-07 (text extracted from the PDF). Supports: mapping steps and scope.
- [R3] CISA, NSA, FBI et al. AA24-038A "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure", 7 February 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a) Accessed: 2026-11-07 (verified in Courses 08 and 20). Supports: CS1.
- [R4] MITRE. ATT&CK Navigator. URL: [https://mitre-attack.github.io/attack-navigator/](https://mitre-attack.github.io/attack-navigator/) Accessed: 2026-11-07. Supports: layers (L06).
- [R5] Lab evidence. attack_map.py, data/log_inventory.json, navigator/monsoon_lantern_layer.json, m07_attack_map_output.txt, 2026-11-07.
