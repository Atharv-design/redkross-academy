Architecture threat modelling asks what can go wrong at each trust boundary in the data-flow view (Module 1) and which control answers it. A widely used prompt list is STRIDE, as described by Microsoft [R2]:

| Term | Meaning |
|---|---|
| Spoofing | using another user's authentication information |
| Tampering | malicious modification of data |
| Repudiation | denying an action with no way to prove otherwise |
| Information disclosure | exposure of information to people not entitled |
| Denial of service | denying service to valid users |
| Elevation of privilege | an unprivileged user gaining privileged access |

**Process for an architecture:**

1. Draw the data-flow view with trust boundaries and classifications.
2. For each element and boundary crossing, list applicable STRIDE categories and the design's control for each.
3. Record threats without a control as risks, with owner and decision (Course 17: treat, transfer, tolerate, terminate).
4. Map relevant threats to MITRE ATT&CK techniques (Enterprise v20.1) so that detection coverage can be planned (Course 20).
5. Revisit the model when the design changes (L06).

The output is a defender's artefact: a list of threats, the controls that answer them, and the tests that will prove those controls.
