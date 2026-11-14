## Revision

### Summary

Risk management cycles through context, identification, analysis, evaluation, treatment and monitoring, with communication throughout (NIST SP 800-30 Rev. 1, ISO/IEC 27005, ISO 31000). It starts with an owned, classified, current asset inventory (CSF ID.AM). Scenarios link asset, threat event, vulnerability and consequence. Qualitative scoring uses defined 1-5 scales. Inherent risk is before controls, and residual risk is after tested controls. Quantitative models give money ranges. Treatments are mitigate, transfer (liability, not accountability), avoid and accept. Acceptance needs the right owner, rationale and expiry. In the tested toolkit, residual scores dropped with controls (R03 16 to 6), and R04's expired acceptance was flagged. Registers, appetite statements and KRIs make risk manageable. The OCC's 2020 Capital One penalty shows that regulators expect risk assessment before major change.

### Important concepts

evidence-based residual; documented acceptance; appetite.

### Key technical takeaways

register fields; residual computation; heat-map limits.

### Glossary

```text
Inherent risk   Risk before controls.
KRI             Key risk indicator.
Residual risk   Risk after controls.
Risk acceptance Formal decision to tolerate residual risk.
Risk appetite   Board-approved tolerance for risk.
Risk transfer   Shifting consequences, e.g., insurance.
```

### Common mistakes

controls assumed effective; vague risks; permanent acceptances.

### Revision questions

​1. Write a risk statement. 2. Compute residual for L4 I4 with effect (2,1). 3. List register fields.

### Further reading

NIST SP 800-30 Rev. 1 [R1]; OCC release [R3].

## References

- [R1] NIST. SP 800-30 Rev. 1, "Guide for Conducting Risk Assessments", September 2012. URL: [https://csrc.nist.gov/pubs/sp/800/30/r1/final](https://csrc.nist.gov/pubs/sp/800/30/r1/final) Accessed: 2026-11-07. Supports: risk assessment guidance.
- [R2] NIST. CSF 2.0, CSWP 29, 26 February 2024. URL: [https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf) Accessed: 2026-11-07. Supports: ID.AM, ID.RA, GV.RM categories.
- [R3] Office of the Comptroller of the Currency. "OCC Assesses $80 Million Civil Money Penalty Against Capital One", News Release 2020-101, 6 August 2020. URL: [https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html](https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html) Accessed: 2026-11-07. Supports: penalty, cited failures.
- [R4] Lab evidence. grc_toolkit.py risk and grc_toolkit_output.txt (CPython 3.14.4), 2026-11-07.
