## Revision

### Summary

A red team engagement must be ENGINEERED before any technique is emulated. AUTHORISATION - written permission from a party entitled to grant it, for defined systems in a defined window - is the legal basis; without it the same acts are crimes (in India, the IT Act, 2000). OBJECTIVES (goal-, coverage- or question-based) shape scope, the threat to emulate and success criteria. The RULES OF ENGAGEMENT record how the engagement runs: in-scope and explicit out-of-scope lists, window, permitted/prohibited methods, deconfliction, contacts, stop conditions, data handling and reporting. SAFETY CONTROLS keep it harmless regardless of intent: isolation for high-risk emulation, no destructive actions, no real user data, simulation-only where the goal is detection, and reversibility. STOP CONDITIONS, DECONFLICTION (operator tags so defenders can tell a test from a real attack) and named CONTACTS keep a live engagement safe moment to moment. Engagement engineering ends with a GATE: the engagement may not begin until the RoE is complete. The lab's roe.py enforces this - an incomplete RoE fails on 6 HIGH findings (no authorisation, window, contacts, stop conditions, isolation or no-real-data rule) and a complete RoE passes - making governance a checkable precondition, not a hope. Everything in the rest of the course runs inside that PASS.

### Important concepts

authorisation; objectives; rules of engagement; safety controls; stop conditions; deconfliction; the RoE gate; legal/ethical basis.

### Key technical takeaways

get written authorisation from the right party; define in- and out-of-scope; set window, stop conditions, deconfliction and contacts; require isolation/no-destruction/no-real-data; gate on a complete RoE; proceed only on PASS.

### Glossary

| Term | Meaning |
|---|---|
| authorisation | written permission to test defined systems in a defined window. |
| rules of engagement (RoE) | the agreed contract for how the engagement runs. |
| scope | the exact systems in (and explicitly out of) bounds. |
| safety control | an engineering measure that prevents harm (isolation, etc.). |
| deconfliction | distinguishing the test from a real attack (operator tags). |
| stop condition | a predefined trigger to halt immediately. |

### Common mistakes

starting without written authorisation; vague scope; no stop conditions; no deconfliction; testing production with real data; treating the RoE as paperwork.

### Revision questions

​1. What must authorisation specify? 2. Name six required RoE contents. 3. Why are deconfliction and stop conditions mandatory?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (planning; rules of engagement). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: authorisation, planning and rules of engagement.
- [R2] PTES. "Pre-engagement Interactions" (scope, RoE, authorisation). URL: [https://web.archive.org/web/20230601000000/http://www.pentest-standard.org/index.php/Pre-engagement](https://web.archive.org/web/20230601000000/http://www.pentest-standard.org/index.php/Pre-engagement) Accessed: 2026-11-08. Supports: the rules-of-engagement contents and the pre-engagement gate.
- [R3] Krebs on Security. "Iowa Prosecutors Drop Charges Against Men Hired To Test Their Security" (Coalfire Iowa engagement). URL: [https://krebsonsecurity.com/2020/01/iowa-prosecutors-drop-charges-against-men-hired-to-test-their-security/](https://krebsonsecurity.com/2020/01/iowa-prosecutors-drop-charges-against-men-hired-to-test-their-security/) Accessed: 2026-11-08. Supports: the authorisation/scope case study.
- [R4] Lab evidence. roe.py gate over roe_incomplete.json (10 findings, 6 HIGH, FAIL) and roe_complete.json (PASS) (CPython 3.14.4), LAB_ASSETS/C19/data/roe_incomplete_output.txt and roe_complete_output.txt, 2026-11-08. Supports: the RoE-gate deep dive.
