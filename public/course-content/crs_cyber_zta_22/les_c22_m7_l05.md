A traceability matrix links each requirement to its control, the test that validates it and the evidence produced, with a status. The execution-tested control_matrix.py (LAB_ASSETS/C22) reads requirements.json and checks each evidence file for the expected result, hashing it with SHA-256:

```text
------------------------------------------------------------- BEGIN OUTPUT
ID   STATUS       SHA256       REQUIREMENT -> CONTROL
R1   VALIDATED    52728586ec80 Unknown resources are denied by default
R2   VALIDATED    52728586ec80 Restricted admin access needs
                               phishing-resistant MFA
R3   VALIDATED    52728586ec80 Policy logic is regression-tested
R4   VALIDATED    78bb4366cfa2 Web tier cannot reach data tier directly
R5   VALIDATED    78bb4366cfa2 Data tier has no internet egress
R6   FAILED       e597337b622f Service designs meet data-protection
                               standard
R7   VALIDATED    244b601945ce Monitoring and recovery architecture meets
                               standard
R8   VALIDATED    e367636b1a2a Posture loss during a session is detected
R9   NO-EVIDENCE  -            Threat model reviewed in the last 12 months
summary: 7/9 validated, 1 failed, 1 without evidence
--------------------------------------------------------------- END OUTPUT
(control lines omitted and long lines wrapped; execution-tested
2026-11-08, CPython 3.14.4; exit code 1)
```

**Reading it:** R6 failed because the saved design review still shows nine findings (Module 5) - the control exists, but the requirement is not met. R9 has no evidence at all: a review may have happened, but nothing proves it. Both are reported honestly rather than marked "in place". The hashes let an assessor confirm later that the evidence has not changed; your hashes will differ if your saved outputs differ.
