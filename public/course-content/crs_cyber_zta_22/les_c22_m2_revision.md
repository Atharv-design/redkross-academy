## Revision

### Summary

Identity is the control plane: a central IdP with federation, automated joiner-mover-leaver, managed entitlements and logs; identity infrastructure is tier 0. Authentication strength varies; prefer phishing-resistant FIDO2/passkeys and require MFA on every internet-facing path. Device posture conditions access by sensitivity. Workloads use short-lived, attribute-bound identities instead of static secrets. Privileged access uses separate identities, tiering, PAWs, JIT elevation, session controls and alerted break-glass accounts. The tested policy model stepped up an OTP login to a restricted portal, denied payroll from an unmanaged device and allowed intranet from one. Change Healthcare's 2024 breach began at a remote-access portal without MFA.

### Important concepts

phishing resistance; device-conditioned access; zero standing privilege.

### Key technical takeaways

conditional-access signals; JIT design; workload federation.

### Glossary

| Term | Meaning |
|---|---|
| CIAM | Customer identity and access management. |
| Conditional access | Policy using identity, device and risk signals. |
| JIT | Just-in-time elevation. |
| PAW | Privileged access workstation. |
| SCIM | System for Cross-domain Identity Management (provisioning). |
| Tier 0 | Assets controlling identity and infrastructure roots. |

### Common mistakes

MFA gaps on legacy portals; standing admin; shared service credentials.

### Revision questions

​1. Rank MFA methods. 2. Design device trust rules. 3. List break-glass controls.

### Further reading

NIST SP 800-207 [R2]; NIST SP 800-63B-4 [R3].

## References

- [R1] Healthcare Dive. "UnitedHealth's Change cyberattack: tech takeaways" (reporting Andrew Witty's 1 May 2024 testimony). URL: [https://www.healthcaredive.com/news/unitedhealth-change-attack-tech-takeaways/715274/](https://www.healthcaredive.com/news/unitedhealth-change-attack-tech-takeaways/715274/) Accessed: 2026-11-07 (web-search cross-check). Supports: Citrix portal without MFA, dates, ALPHV, ransom.
- [R2] NIST SP 800-207, "Zero Trust Architecture", August 2020. URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-07. Supports: identity-based access decisions.
- [R3] NIST. SP 800-63B-4, "Digital Identity Guidelines: Authentication and Authenticator Management". URL: [https://pages.nist.gov/800-63-4/sp800-63b.html](https://pages.nist.gov/800-63-4/sp800-63b.html) Accessed: 2026-11-07. Supports: authentication assurance and phishing resistance concepts.
- [R4] Lab evidence. zt_pdp.py and zt_pdp_output.txt (CPython 3.14.4), 2026-11-07.
