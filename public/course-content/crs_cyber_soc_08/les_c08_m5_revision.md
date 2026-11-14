## Revision

### Summary

Threat intelligence is analysed adversary information at strategic, operational and tactical levels, produced through a requirements-driven cycle. IOCs range from hashes (trivial to change) to TTPs (hard), per Bianco's Pyramid of Pain - so behaviour-based detections last longer. Every indicator needs source reliability, confidence, context and validity. TLP 2.0 (RED, AMBER, AMBER+STRICT, GREEN, CLEAR) governs sharing; STIX 2.1 (OASIS Standard, 10 June 2021) structures it, and TAXII transports it. In the tested lab, current high-confidence domains corroborated the WS-104 case, the spraying IP strengthened R2, an expired low-confidence IP matched an innocent session, and a hash "no match" reflected missing telemetry. Intelligence is perishable, shared infrastructure causes collateral matches, and absence of matches proves little. FireEye's 2020 countermeasure release shows sharing detections with explicit confidence labels.

### Important concepts

climb the pyramid; context and expiry; TLP discipline; "no data" is not "clean".

### Key technical takeaways

parameterised, anchored matching; reproducible as-of dates; STIX indicator properties.

### Glossary

| Term | Meaning |
|---|---|
| IOC | Indicator of compromise. |
| ISAC | Information Sharing and Analysis Center. |
| PIR | Priority intelligence requirement. |
| STIX | Structured Threat Information Expression. |
| TAXII | Trusted Automated Exchange of Intelligence Information. |
| TIP | Threat intelligence platform. |
| TLP | Traffic Light Protocol. |

### Common mistakes

auto-blocking raw feeds; ignoring expiry; leaking TLP material into public tools.

### Revision questions

​1. Order the Pyramid of Pain. 2. Define the four TLP 2.0 colours. 3. List five indicator limitations.

### Further reading

FIRST TLP [R2]; STIX 2.1 [R3].

## References

- [R1] Bianco, D. J. "The Pyramid of Pain", Enterprise Detection & Response blog, 1 March 2013 (revised 17 January 2014). URL: [https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html) Accessed: 2026-11-07. Supports: pyramid levels.
- [R2] FIRST. "Traffic Light Protocol (TLP) - Version 2.0". URL: [https://www.first.org/tlp/](https://www.first.org/tlp/) Accessed: 2026-11-07. Supports: TLP labels and August 2022 effective date.
- [R3] OASIS. "STIX Version 2.1", OASIS Standard, 10 June 2021. URL: [https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html) Accessed: 2026-11-07. Supports: STIX domain objects; indicator properties.
- [R4] Mandiant (FireEye). "Red Team Tool Countermeasures" (GitHub repository, archived May 2025). URL: [https://github.com/mandiant/red_team_tool_countermeasures](https://github.com/mandiant/red_team_tool_countermeasures) Accessed: 2026-11-07. Supports: rule formats, Production/Supplemental labels.
- [R5] Lab evidence. ioc_match.py, ioc_match_output.txt (CPython 3.14.4), 2026-11-07.
