## Revision

### Summary

A reference architecture states purpose, principles (NIST SP 800-207 tenets), logical components, patterns, standards, views and governance, checked against example implementations such as NIST SP 1800-35. Current maturity is assessed with evidence against the CISA ZTMM v2.0 pillars and cross-cutting capabilities, with realistic targets. Roadmaps are sequenced by dependency, risk reduction, capacity and reversibility - typically foundations, enforcement, then coverage and automation - and each initiative has an owner, dependencies and a validating requirement in the assurance matrix. The lab checker found six consistency findings in the draft roadmap and none in the fixed one. Presentations differ by audience: detailed for engineers, one page with a decision request for executives. Google's 2014 BeyondCorp paper shows a published enterprise migration with a clear target statement.

### Important concepts

target state; evidence-based maturity; dependency sequencing.

### Key technical takeaways

roadmap as data; initiatives linked to requirements; monitor-then-enforce.

### Glossary

| Term | Meaning |
|---|---|
| Initiative | A unit of roadmap work with owner and exit criteria. |
| Reference architecture | Agreed target and standards for designs. |
| ZTMM | CISA Zero Trust Maturity Model. |
| Exit criteria | Evidence that an initiative is complete. |

### Common mistakes

product-led roadmaps; Optimal targets everywhere; initiatives without owners or evidence.

### Revision questions

​1. List the sections of a reference architecture. 2. Why must device inventory precede posture-based policy? 3. What should an executive summary ask for?

### Further reading

BeyondCorp [R1]; CISA ZTMM [R2]; SP 1800-35 [R4].

## References

- [R1] R. Ward and B. Beyer. "BeyondCorp: A New Approach to Enterprise Security", ;login:, Vol. 39, No. 6, 2014, pp. 6-11. URL: [https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/](https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/) Accessed: 2026-11-08. Supports: authors, venue, year, abstract quote.
- [R2] CISA. Zero Trust Maturity Model Version 2.0, April 2023. URL: [https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf](https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf) Accessed: 2026-11-07. Supports: pillars, cross-cutting capabilities, stages.
- [R3] NIST. SP 800-207, "Zero Trust Architecture", August 2020. URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-07.
- [R4] NIST NCCoE. SP 1800-35, "Implementing a Zero Trust Architecture", final June 2025. URL: [https://csrc.nist.gov/pubs/sp/1800/35/final](https://csrc.nist.gov/pubs/sp/1800/35/final) Accessed: 2026-11-07.
- [R5] Lab evidence. roadmap_check.py, roadmap.json, roadmap_fixed.json and roadmap_check_output.txt (CPython 3.14.4), 2026-11-08.
