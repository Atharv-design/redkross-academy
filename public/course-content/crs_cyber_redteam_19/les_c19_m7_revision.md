## Revision

### Summary

Purple teaming combines red (emulation) and blue (detection) into one COLLABORATIVE exercise whose goal is measurable detection improvement, not a win/loss. The cycle: emulate a technique, measure whether the blue team detected it, diagnose any miss, fix it, and re-emulate to confirm. COLLABORATION is the "purple" - red and blue share the ATT&CK plan, the telemetry and the results, using ATT&CK as a common language and treating a gap as a finding to fix, not a failure to hide. DETECTION COVERAGE is the fraction of relevant techniques the organisation can detect; a GAP is a technique with no or inadequate detection, classified as no telemetry, no rule, or mis-tuned. DETECTION-GAP ANALYSIS compares emulated versus detected and outputs a coverage figure and a prioritised gap list with the detection to build for each. RETESTING closes the loop: engineer the detection, re-emulate the SAME technique, and confirm it fires - a gap is not closed until re-emulation detects it. CONTINUOUS VALIDATION repeats this on a cadence because detections drift and silently break. The lab's purple.py reports 4/7 coverage with three gaps (T1087, T1550, T1005), each with the telemetry/detection needed and a retest step - turning emulation into a specific, verifiable improvement backlog, which is the course's core payoff. All of it stays within authorisation and isolation.

### Important concepts

purple teaming; red/blue collaboration; detection coverage; gap analysis; retesting; continuous validation.

### Key technical takeaways

collaborate on a shared ATT&CK plan; measure coverage; diagnose and prioritise gaps; engineer detections; re-emulate to confirm; validate continuously.

### Glossary

| Term | Meaning |
|---|---|
| purple teaming | red and blue collaborating to improve detection. |
| detection coverage | the fraction of relevant techniques detectable. |
| detection gap | a technique with no or inadequate detection. |
| retesting | re-emulating a technique to confirm a new detection fires. |
| continuous validation | regularly re-emulating key techniques to catch regressions. |

### Common mistakes

adversarial scoring instead of collaboration; emulating more instead of closing gaps; not diagnosing gap cause; not retesting; one-off instead of continuous.

### Revision questions

​1. What is the purple-team cycle? 2. What does gap analysis output? 3. When is a gap closed?

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] MITRE Engenuity. "Center for Threat-Informed Defense" (purple teaming, threat-informed defense, detection coverage). URL: [https://ctid.mitre.org/](https://ctid.mitre.org/) Accessed: 2026-11-08. Supports: collaborative, coverage-based validation.
- [R2] MITRE. "ATT&CK" (as the shared language for coverage and gaps). URL: [https://attack.mitre.org/](https://attack.mitre.org/) Accessed: 2026-11-08. Supports: ATT&CK-mapped coverage and gap analysis.
- [R3] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (testing and remediation/retest cycle). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: the test-fix-retest discipline.
- [R4] Lab evidence. purple.py gap analysis (4/7 coverage; gaps T1087/T1550/ T1005; retest list) (CPython 3.14.4), LAB_ASSETS/C19/data/purple_output.txt, 2026-11-08. Supports: the detection-gap and retest deep dive.
