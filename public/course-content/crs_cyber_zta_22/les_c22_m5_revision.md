## Revision

### Summary

Secure services authenticate every request, authorise per object with consistent policy, expose minimal validated interfaces, use secure defaults and workload identity, and log security events. Tenancy models (silo, pool, bridge) trade cost for isolation; pooled designs need token-derived tenant IDs, row-level security and per-tenant keys. Classification drives handling, with restricted data requiring phishing-resistant MFA, CMKs with separated custody, masking in non-production and strict retention; minimise data first. Encryption layers address different threats; key custody separates key and data administration, scopes keys, manages their lifecycle and audits use. The tested checker found nine design findings across four services, including unseparated custody and sub-180-day log retention. The Storm-0558 case shows how a long-lived, mis-scoped signing key can undermine identity at global scale.

### Important concepts

per-request authz; classification-driven controls; custody separation.

### Key technical takeaways

tenant isolation patterns; FLE with envelope encryption; design guardrails as code.

### Glossary

| Term | Meaning |
|---|---|
| CMK | Customer-managed key. |
| Crypto-shredding | Destroying keys to make data unreadable. |
| FLE | Field-level encryption. |
| Row-level security | Database enforcement of row access per session. |
| Tenant isolation | Preventing cross-customer access. |

### Common mistakes

one key for all; client-supplied tenant IDs; production data in test.

### Revision questions

​1. Compare silo and pool tenancy. 2. Design custody for a restricted store. 3. What does storage encryption not protect?

### Further reading

CSRB announcement [R1]; NIST SP 800-57 [R2].

## References

- [R1] US Department of Homeland Security. "Cyber Safety Review Board Releases Report on Microsoft Online Exchange Incident from Summer 2023", 2 April 2024. URL: [https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer](https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer) Accessed: 2026-11-07 (verified for Course 01). Supports: preventable, 2016 MSA key, scale, theft method undetermined.
- [R2] NIST. SP 800-57 Part 1 Rev. 5, May 2020. URL: [https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) Accessed: 2026-11-07. Supports: key management lifecycle.
- [R3] CERT-In. "Directions under section 70B(6)", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 180-day logs.
- [R4] Lab evidence. arch_review.py and arch_review_output.txt (CPython 3.14.4), 2026-11-07.
