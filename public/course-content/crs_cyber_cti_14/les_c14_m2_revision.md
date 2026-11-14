## Revision

### Summary

OSINT uses publicly available information; passive collection uses published or third-party records without interacting with the subject's systems, and is the only kind in this course. The Berkeley Protocol structures inquiries into preparation, an investigation process (online inquiry, preliminary assessment, collection, preservation, verification, investigative analysis) and reporting, with principles of minimising harm, privacy, data minimisation and security by design. Preserve artefacts with SHA-256, UTC time, URL, collector and requirement in a tamper-evident log. Grade source reliability (A-F) and information credibility (1-6) separately and seek independent corroboration; in the lab only the A1 reports corroborate. Minimise personal data and test the minimiser (v1 missed a spaced phone number). In India, the IT Act (sections 43 and 66), the DPDP Act 2023 (with a narrow exclusion for data made public by the Data Principal) and the CERT-In Directions (6-hour reporting, 180-day logs) frame the work; seek legal advice.

### Important concepts

passive collection; preservation; two-part grading; independence; minimisation.

### Key technical takeaways

hash and log at collection; minimise before sharing; test patterns with real formats.

### Glossary

| Term | Meaning |
|---|---|
| Admiralty system | Two-part source and information grading. |
| Circular reporting | Apparent corroboration from sources that copy each other. |
| Data minimisation | Collecting and keeping only what a purpose needs. |
| RDAP | Registration Data Access Protocol (successor to WHOIS queries). |

### Common mistakes

equating public with permitted; counting copies as corroboration; keeping raw personal data; collecting without a requirement.

### Revision questions

​1. List the Berkeley investigation steps. 2. Explain why grades have two parts. 3. State the CERT-In reporting time.

### Further reading

[R1]; [R2].

## References

- [R1] UN OHCHR and Human Rights Center, UC Berkeley School of Law. "Berkeley Protocol on Digital Open Source Investigations" (launched December 2020; published edition 2022). URL: [https://humanrights.berkeley.edu/publications/berkeley-protocol-on-digital-open-source-investigations/](https://humanrights.berkeley.edu/publications/berkeley-protocol-on-digital-open-source-investigations/) Accessed: 2026-11-07. Supports: phases and principles (L02, L05, CS1).
- [R2] Government of India. The Digital Personal Data Protection Act, 2023 (No. 22 of 2023), 11 August 2023. URL: [https://prsindia.org/files/bills_acts/bills_parliament/2023/Digital_Personal_Data_Protection_Act,_2023.pdf](https://prsindia.org/files/bills_acts/bills_parliament/2023/Digital_Personal_Data_Protection_Act,_2023.pdf) Accessed: 2026-11-07. Supports: section 3(c)(ii).
- [R3] CERT-In. Directions under section 70B(6) of the IT Act, 2000, 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 6-hour reporting, 180-day logs.
- [R4] Information Technology Act, 2000, section 66 text (CIS India copy). URL: [https://cis-india.org/internet-governance/resources/section-66-it-act.txt](https://cis-india.org/internet-governance/resources/section-66-it-act.txt) Accessed: 2026-11-07 (verified in Course 01). Supports: section 43 acts, penalty in section 66.
- [R5] Lab evidence. source_eval.py, minimise.py, collect_log.py, collection/, m02_output.txt, m02_output_v1_phone_miss.txt, 2026-11-07.
