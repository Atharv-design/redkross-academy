## Revision

### Summary

Policies state intent in short, plain, owned documents. Standards make it specific and testable (who, what, when, how much). Procedures give step-by-step operations that produce evidence. Documents move through draft, review, approval, publication, communication, implementation, monitoring, review and retirement, under document control (ISO 27001). Exceptions are documented, risk-assessed, compensated, approved at the right level, linked to risks and time-limited. The tested register flagged an expired, under-approved, uncompensated exception and one with no approver, while an MFA exception on a terminal server passed paperwork checks. That echoes the British Library's 2020 decision to scope domain access out of MFA, a risk "perhaps under-appraised" before the 2023 attack. Measure compliance automatically, and fix causes before blaming people.

### Important concepts

testable requirements; no permanent exceptions; policy-to-evidence trace.

### Key technical takeaways

document templates; exception fields; compliance metrics.

### Glossary

| Term | Meaning |
|---|---|
| Attestation | Staff acknowledgement of a policy. |
| Compensating control | Alternative control reducing risk during an exception. |
| Document control | Managing versions, approval and availability. |
| Exception (waiver) | Approved, time-limited deviation from a standard. |
| Procedure | Step-by-step operational instructions. |

### Common mistakes

vague standards; undated "pending" exceptions; contradictory documents.

### Revision questions

​1. List the elements of an exception. 2. Rewrite a vague requirement. 3. Trace a requirement to evidence.

### Further reading

British Library review [R1]; NIST CSF GV.PO [R2].

## References

- [R1] British Library. "Learning lessons from the cyber-attack: British Library cyber incident review", 8 March 2024. URL: [https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf](https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf) Accessed: 2026-11-07. Supports: terminal server, MFA scope decision and wording, 600GB exfiltration, lessons.
- [R2] NIST. CSF 2.0, CSWP 29, 26 February 2024. URL: [https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf) Accessed: 2026-11-07. Supports: GV.PO Policy category.
- [R3] NIST. SP 800-63B-4, "Digital Identity Guidelines: Authentication and Authenticator Management". URL: [https://pages.nist.gov/800-63-4/sp800-63b.html](https://pages.nist.gov/800-63-4/sp800-63b.html) Accessed: 2026-11-07 (verified for Course 01). Supports: password rule example.
- [R4] Lab evidence. grc_toolkit.py exceptions output, 2026-11-07.
