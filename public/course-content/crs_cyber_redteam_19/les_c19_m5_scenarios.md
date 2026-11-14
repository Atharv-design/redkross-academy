Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A workstation-to-workstation admin logon succeeds in the range.

**Task:** Explain the detection and the structural containment.

> [!TIP] Model answer
> **Detection:** correlate authentication and network telemetry to flag the unusual path - workstation-to-workstation administrative logon is rarely legitimate, so it should alert. Structural containment: block workstation-to-workstation admin via segmentation and host firewall policy so the hop becomes impossible, and apply credential hygiene (unique local admin passwords) so one credential cannot open many hosts. Validate the fix by re-testing the blocked path.
>
> **Lesson:** detect the unusual path and block it structurally; re-test.

## Scenario 2

A service account is valid on every host in the estate.

**Task:** Explain the lateral-movement risk and the remediation.

> [!TIP] Model answer
> A service account valid on every host is broad trust: one compromised credential enables movement across the entire estate (Remote Services, alternate auth material).
>
> **Remediation:** scope the service account to only the hosts it needs (least privilege), avoid interactive use, protect it (tiering, Protected Users), and monitor its logons behaviourally. Narrowing the trust removes the easy path; detection backs it up.
>
> **Lesson:** over-broad account trust is a lateral-movement enabler; scope and protect it.

## Scenario 3

A manager asks why you validate segmentation instead of "just moving laterally to prove it".

**Task:** Explain the defensive, conceptual approach.

> [!TIP] Model answer
> Validating segmentation confirms, defensively, that the paths which should be blocked are blocked and that the hops which remain are detected - which is the security outcome the organisation needs. "Just moving laterally to prove it" is unnecessary for that outcome, risks collateral impact, and, outside an isolated authorised range, is unlawful. The conceptual, validation-and-detection approach improves defence without the risk.
>
> **Lesson:** validate boundaries and detections; do not treat intrusion as the deliverable.
