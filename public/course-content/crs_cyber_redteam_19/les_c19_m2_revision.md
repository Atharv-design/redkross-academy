## Revision

### Summary

ADVERSARY EMULATION reproduces the observable behaviour of a relevant threat to test detection and response - threat-informed (behaviours chosen because a relevant adversary uses them), behaviour-led, and detection-first. THREAT-INFORMED PLANNING selects what to emulate from the organisation's threat profile and intelligence. The MITRE ATT&CK framework (Enterprise v20.1, verified 2026-11-08) is the shared language: TACTICS are the adversary's goals (Reconnaissance TA0043, Credential Access TA0006, Discovery TA0007, Lateral Movement TA0008, Command and Control TA0011, Collection TA0009) and TECHNIQUES are how (T1595 Active Scanning, T1078 Valid Accounts, T1021 Remote Services, T1550 Use Alternate Authentication Material, T1071 Application Layer Protocol). TECHNIQUE SELECTION picks relevant techniques spanning the tactics, prioritising detection gaps, that can be emulated safely; each is recorded with its ID, an in-scope target, a data source, the expected detection and the containment. SIMULATION BOUNDARIES limit HOW a technique is emulated - isolation, lab accounts and synthetic data, non-destructive signal (a benign beacon to a lab sink rather than real egress), and limited intensity - so dangerous-looking behaviour is produced safely. The plan is VALIDATED before running: every step must name a tactic, technique, in-scope target, safety control, data source and detection. The lab's emulation_plan.py validates the 7-step plan (all in scope, safety-bounded, detection-mapped) to PASS. The plan is both an emulation script and a detection checklist - the bridge to purple teaming.

### Important concepts

adversary emulation; threat-informed planning; ATT&CK tactics/techniques; technique selection; simulation boundaries; plan validation.

### Key technical takeaways

emulate the relevant adversary; plan with ATT&CK; map each technique to a detection; bound every step; validate the plan before running.

### Glossary

| Term | Meaning |
|---|---|
| adversary emulation | reproducing a relevant threat's behaviour to test defences. |
| threat-informed | chosen from the organisation's actual threats. |
| ATT&CK tactic/technique | an adversary goal / a specific behaviour to achieve it. |
| simulation boundary | a safety limit on how a technique is emulated. |
| detection checklist | the detections each emulated technique should trigger. |

### Common mistakes

arbitrary attacks instead of relevant emulation; no ATT&CK mapping; no detection per technique; no simulation boundaries; running an unvalidated plan.

### Revision questions

​1. How does emulation differ from arbitrary testing? 2. What are ATT&CK tactics and techniques? 3. Name three simulation boundaries.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] MITRE. "ATT&CK" (Enterprise matrix, tactics and techniques; v20.1). URL: [https://attack.mitre.org/](https://attack.mitre.org/) Accessed: 2026-11-08. Supports: the framework, tactic/technique IDs and detection mapping.
- [R2] MITRE. "Adversary Emulation Plans". URL: [https://attack.mitre.org/resources/adversary-emulation-plans/](https://attack.mitre.org/resources/adversary-emulation-plans/) Accessed: 2026-11-08. Supports: emulation as a threat-informed, ATT&CK-based practice.
- [R3] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (planning and technique selection). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: disciplined test planning.
- [R4] Lab evidence. emulation_plan.py validation of the 7-step plan (all in scope, safety-bounded, detection-mapped, PASS) (CPython 3.14.4), LAB_ASSETS/C19/data/emulation_plan_output.txt, 2026-11-08. Supports: the plan- validation deep dive.
