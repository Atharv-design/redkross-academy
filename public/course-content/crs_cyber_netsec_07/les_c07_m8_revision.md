## Revision

### Summary

A network security assessment reviews every defence-in-depth layer - perimeter/zones, firewall, IDS/IPS, segmentation, secure connectivity, wireless, and monitoring/response - and reports, per layer, the control, its status and the evidence. Verification means running a repeatable check and showing the result, not assuming a control works. The lab verifies the enforcing controls offline: firewall.py lints the firewall policy (4 findings, 1 HIGH -> 0 when hardened); segmentation.py tests connections against the zero-trust matrix (3 violations -> 0); tlscheck.py reviews the TLS config against deprecated protocols, weak ciphers, key size and expiry (6 findings -> 0). The monitoring layer uses flowcheck.py to review telemetry for residual signals (a scan, a beacon, three segmentation violations) that require investigation and containment. review.py consolidates this into a control summary showing 3/3 enforcing controls moving FAIL->PASS with evidence plus the telemetry signals. A good assessment is specific, evidence-backed (every claim traces to a reproducible check), prioritised and actionable - evidence over attestation. The capstone performs this full workflow on the lab assets you own, entirely offline: review, verify, harden, re-verify, review telemetry, and report.

### Important concepts

defence-in-depth review; verification vs assumption; repeatable checks; before/after evidence; enforcing controls vs monitoring; evidence over attestation.

### Key technical takeaways

review every layer; verify each enforcing control with a re-runnable check; harden and re-verify to zero; review telemetry for residual risk; report status + evidence per layer.

### Glossary

| Term | Meaning |
|---|---|
| assessment | a review of controls with status and evidence per layer. |
| verification | running a repeatable check to prove a control works. |
| enforcing control | a control that blocks (firewall, segmentation, TLS config). |
| attestation | a claim that a control exists, without evidence. |
| residual risk | risk remaining in live traffic after static hardening. |

### Common mistakes

accepting attestation; verifying against the wrong artefact; reviewing only one layer; stopping at "policy correct" and ignoring telemetry; unreproducible claims.

### Revision questions

​1. What does a network security assessment review and report per layer? 2. What does it mean to verify a control, and why re-run the check? 3. Why report telemetry signals even when all enforcing controls PASS?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] CIS. "CIS Critical Security Controls" (network-relevant controls and the emphasis on verification and continuous assurance). URL: [https://www.cisecurity.org/controls](https://www.cisecurity.org/controls) Accessed: 2026-11-08. Supports: verify-do- not-assume, evidence over attestation, CS1.
- [R2] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment". URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: assessment methodology, verification and evidence.
- [R3] NIST. "Cybersecurity Framework (CSF) 2.0" (Identify/Protect/Detect functions across network controls). URL: [https://www.nist.gov/cyberframework](https://www.nist.gov/cyberframework) Accessed: 2026-11-08. Supports: defence-in- depth review across layers.
- [R4] Lab evidence. review.py consolidated control summary (firewall 4->0, segmentation 3->0, TLS 6->0, telemetry 1 scan/1 beacon/3 violations) (CPython 3.14.4), LAB_ASSETS/C07/data/review_output.txt, 2026-11-08. Supports: the deep- dive control summary and capstone evidence.
