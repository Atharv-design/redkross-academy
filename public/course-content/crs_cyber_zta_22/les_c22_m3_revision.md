## Revision

### Summary

Zero trust removes location-based implicit trust: every access is authenticated, authorised and evaluated by dynamic policy per session, with continuous monitoring (the seven tenets of SP 800-207, restated in CISA ZTMM v2.0). Logical components: policy engine (decides), policy administrator (sets up/tears down paths), policy enforcement point (enables, monitors, terminates). Approaches combine identity governance, micro-segmentation and software-defined perimeters in agent/gateway, enclave, portal or sandbox deployments; SP 1800-35 (June 2025) documents 19 example builds. CISA ZTMM: five pillars, three cross-cutting capabilities, four stages. Policies are default-deny, entitlement-plus-conditions, risk-adaptive, logged and continuously re-evaluated. The tested model stepped up medium-risk access, denied unentitled and unknown requests, and denied high-risk sessions. Midnight Blizzard's 2023-24 intrusion exploited implicit trust in a legacy test tenant and an over-privileged OAuth app.

### Important concepts

no implicit trust; PDP/PEP; maturity journey.

### Key technical takeaways

policy-as-code; signal freshness; fail modes.

### Glossary

| Term | Meaning |
|---|---|
| PDP | Policy decision point (PE + PA). |
| PE | Policy engine. |
| PA | Policy administrator. |
| PEP | Policy enforcement point. |
| ZTMM | CISA Zero Trust Maturity Model. |
| ZTNA | Zero trust network access. |

### Common mistakes

product equals zero trust; ignoring test environments; undefined failure modes.

### Revision questions

​1. Recite the seven tenets. 2. Explain PE/PA/PEP. 3. Name ZTMM pillars and stages.

### Further reading

NIST SP 800-207 [R1]; CISA ZTMM v2.0 [R2]; NIST SP 1800-35 [R3].

## References

- [R1] Rose, S., Borchert, O., Mitchell, S., Connelly, S. NIST SP 800-207, "Zero Trust Architecture", August 2020. URL: [https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf) Accessed: 2026-11-07 (full text extracted). Supports: tenets, PE/PA/PEP definitions, approaches and deployment variants.
- [R2] CISA. "Zero Trust Maturity Model", Version 2.0, April 2023. URL: [https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf](https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf) Accessed: 2026-11-07 (full text extracted). Supports: pillars, cross-cutting capabilities, stages, tenet wording.
- [R3] NIST. SP 1800-35, "Implementing a Zero Trust Architecture", final, June 2025. URL: [https://csrc.nist.gov/pubs/sp/1800/35/final](https://csrc.nist.gov/pubs/sp/1800/35/final) Accessed: 2026-11-07. Supports: 19 example implementations, 24 collaborators.
- [R4] Microsoft Threat Intelligence. "Midnight Blizzard: Guidance for responders on nation-state attack", 25 January 2024. URL: [https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/) Accessed: 2026-11-07. Supports: initial access, OAuth app, full_access_as_app, residential proxies, recommendations.
- [R5] Lab evidence. zt_pdp.py and zt_pdp_output.txt, 2026-11-07.
