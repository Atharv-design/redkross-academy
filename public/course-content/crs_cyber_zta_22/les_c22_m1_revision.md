## Revision

### Summary

Security architecture turns goals, obligations and risks into testable requirements and structural controls, documented in views (context, logical, data-flow, deployment, identity, control) and decisions (ADRs). Assets sit in trust zones; boundaries are where authentication, authorisation, validation and logging belong; the management plane and CI/CD need the strongest protection. Principles include least privilege, defence in depth, secure defaults, fail safe, economy of mechanism, complete mediation, separation of duties, reduced attack surface and assume breach. Legacy constraints need transition architectures with compensating controls and retirement dates. The British Library review attributes part of the 2023 attack's severity to legacy infrastructure and an older network design that allowed wider access.

### Important concepts

requirements first; explicit trust; documented decisions.

### Key technical takeaways

zone model; boundary control lists; traceability.

### Glossary

| Term | Meaning |
|---|---|
| ADR | Architecture decision record. |
| Management plane | Administrative interfaces controlling infrastructure. |
| Reference architecture | Reusable approved design pattern. |
| Transition architecture | Intermediate state on the way to target. |
| Trust zone | Group of components with similar trust needs. |

### Common mistakes

product-first design; stale diagrams; undocumented legacy exceptions.

### Revision questions

​1. Write five architecture requirements. 2. Name six views. 3. Explain fail safe with an example.

### Further reading

British Library review [R1]; NIST SP 800-207 [R2].

## References

- [R1] British Library. "Learning lessons from the cyber-attack: British Library cyber incident review", 8 March 2024. URL: [https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf](https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf) Accessed: 2026-11-07. Supports: legacy estate, network design, data copies, impact.
- [R2] Rose, S., Borchert, O., Mitchell, S., Connelly, S. NIST SP 800-207, "Zero Trust Architecture", August 2020. URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-07. Supports: zero trust framing referenced in this module.
- [R3] CERT-In. "Directions under section 70B(6)", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 180-day log retention requirement.
- [R4] Course 17 (this library). Supports: risk register, exceptions and framework mapping referenced.
