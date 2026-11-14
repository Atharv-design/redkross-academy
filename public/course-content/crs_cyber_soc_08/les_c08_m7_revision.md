## Revision

### Summary

NIST SP 800-61 Rev. 3 (April 2025) frames incident response within CSF 2.0 risk management, while the older lifecycle vocabulary remains useful. SOC analysts declare incidents against criteria and escalate with a fixed structure: what, so what, evidence, confidence, done, need. Communication uses need-to-know, out-of-band channels and a single incident log. In India, CERT-In requires specified incidents to be reported within 6 hours, and DPDP Rule 7 (72-hour detailed report) applies once its tranche commences. Containment options (isolate, block, reset and revoke, remove persistence) are weighed against evidence and business impact, and powering off is rarely the first choice. Evidence is preserved in order of volatility, hashed (SHA-256), recorded in custody logs and verified. In the lab, the export was reproducible, and a one-figure change was detected as FAILED. Colonial Pipeline shows the business weight of containment decisions and the value of early notification to law enforcement.

### Important concepts

structured escalation; proportionate containment; evidence integrity.

### Key technical takeaways

SHA-256 manifests; reproducible exports; CRLF pitfalls.

### Glossary

| Term | Meaning |
|---|---|
| Chain of custody | Record of evidence handling. |
| Containment | Actions limiting incident spread or harm. |
| CSIRT | Computer security incident response team. |
| Incident lead | Person coordinating response decisions. |
| Order of volatility | Priority for collecting evidence that disappears. |
| Out-of-band | Communication outside potentially compromised systems. |

### Common mistakes

wiping first; unstructured escalations; missing the "noticed" time.

### Revision questions

​1. Write the six escalation parts. 2. Compare isolation and power-off. 3. List four fields of a custody record.

### Further reading

NIST SP 800-61 Rev. 3 [R1]; CERT-In Directions [R2].

## References

- [R1] NIST. SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile", April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-07. Supports: title, date, supersedes Rev. 2 (2012).
- [R2] CERT-In. "Directions under sub-section (6) of section 70B of the Information Technology Act, 2000", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 6-hour reporting, 180-day logs, NTP.
- [R3] CISA. "The Attack on Colonial Pipeline: What We've Learned & What We've Done Over the Past Two Years", 2023. URL: [https://www.cisa.gov/news-events/news/attack-colonial-pipeline-what-weve-learned-what-weve-done-over-past-two-years](https://www.cisa.gov/news-events/news/attack-colonial-pipeline-what-weve-learned-what-weve-done-over-past-two-years) Accessed: 2026-11-07. Supports: May 2021 attack and operational halt.
- [R4] US Department of Justice. "Department of Justice Seizes $2.3 Million in Cryptocurrency Paid to the Ransomware Extortionists Darkside", 7 June 2021. URL: [https://www.justice.gov/archives/opa/pr/department-justice-seizes-23-million-cryptocurrency-paid-ransomware-extortionists-darkside](https://www.justice.gov/archives/opa/pr/department-justice-seizes-23-million-cryptocurrency-paid-ransomware-extortionists-darkside) Accessed: 2026-11-07 (content via web-search cross-check). Supports: 63.7 BTC seized, ~75 BTC paid, thanks for quick FBI notification.
- [R5] Lab evidence. evidence_export.py, sha256sum verification and tamper test (CPython 3.14.4; Git for Windows bash), 2026-11-07.
