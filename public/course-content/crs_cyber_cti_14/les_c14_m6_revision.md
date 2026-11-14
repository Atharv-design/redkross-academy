## Revision

### Summary

STIX 2.1 (Errata 01, OASIS Standard, 2 April 2025) models intelligence as 18 domain object types, two relationship objects (Relationship, Sighting), cyber observables, markings and bundles. The lab modelled MONSOON LANTERN as an unattributed Campaign with 10 Indicators (patterns, validity, confidence), 7 Attack Patterns, 17 Relationships, a Sighting and a Report - 38 objects, all validated and strictly parsed. TAXII 2.1 (OASIS Standard, 10 June 2021) exchanges STIX through discovery, API roots, collections, objects, manifests and status resources; the lab server published 38 objects, filtered by type and added_after, paged results and refused unauthorised access (401, 403). TLP 2.0 (from August 2022) has four labels - RED, AMBER (with AMBER+STRICT), GREEN, CLEAR. Sharing needs agreements, minimisation, licence checks, quality and feedback. AA23-144A showed both the reach of structured indicators and the need to keep their caveats.

### Important concepts

SDO/SRO/SCO; patterns and validity; TAXII resources; TLP 2.0; sharing governance.

### Key technical takeaways

validate patterns and parse strictly; mark sightings carefully; check server-side access control, not only client behaviour.

### Glossary

| Term | Meaning |
|---|---|
| Bundle | A container of STIX objects. |
| SDO/SRO/SCO | Domain, relationship and cyber-observable objects. |
| TAXII | Trusted Automated Exchange of Intelligence Information. |
| TLP | Traffic Light Protocol. |

### Common mistakes

modelling unattributed activity as a Threat Actor; indicators without valid_until; trusting client-side checks; sharing sightings broadly.

### Revision questions

​1. List eight SDO types. 2. Name the TAXII resources. 3. Explain AMBER+STRICT.

### Further reading

[R1]; [R2].

## References

- [R1] OASIS. "STIX Version 2.1 Errata 01", OASIS Standard, 2 April 2025. URL: [https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html) Accessed: 2026-11-07. Supports: object families, SDO list, SROs.
- [R2] OASIS. "TAXII Version 2.1", OASIS Standard, 10 June 2021. URL: [https://docs.oasis-open.org/cti/taxii/v2.1/taxii-v2.1.html](https://docs.oasis-open.org/cti/taxii/v2.1/taxii-v2.1.html) Accessed: 2026-11-07. Supports: discovery path, resources, 401 behaviour.
- [R3] FIRST. "Traffic Light Protocol (TLP)" version 2.0. URL: [https://www.first.org/tlp/](https://www.first.org/tlp/) Accessed: 2026-11-07. Supports: four labels, AMBER+STRICT, August 2022.
- [R4] NSA, CISA, FBI et al. AA23-144A "People's Republic of China State-Sponsored Cyber Actor Living off the Land to Evade Detection", 24 May 2023. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-144a) Accessed: 2026-11-07. Supports: CS1.
- [R5] Lab evidence. stix_build.py, stix/monsoon_lantern_bundle.json, taxii/ (medallion 3.0.0, taxii2-client 2.3.0), m06_stix_output.txt, m06_taxii_output.txt, 2026-11-07.
