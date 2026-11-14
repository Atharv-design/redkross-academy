Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The CISO asks for the MONSOON LANTERN brief "in one minute, by voice".

**Task:** Give the 60-second version.

> [!TIP] Model answer
> "A phishing campaign imitating our brand reached one finance user today; their workstation contacted the attackers' servers. The infrastructure is very likely still active; we are moderately confident. We cannot say who is behind it, and that does not change what we do. We are blocking ten indicators, investigating the workstation, and need approval to collect two missing types of logs. I will update you by tomorrow morning."
>
> **Lesson:** BLUF, judgment, action, decision, next update.

## Scenario 2

New evidence shows u017's workstation was not compromised (the payload was blocked by EDR).

**Task:** Describe how you update the brief.

> [!TIP] Model answer
> Issue a new version that states what changed: judgment 1 stands (infrastructure active), but the incident judgment changes to "contact without compromise" with the evidence (EDR record) and source grade; recommendation 2 is closed with the finding; keep the telemetry and blocking actions; update the gaps; notify the same recipients and record the change. Do not silently edit the old version.
>
> **Lesson:** version, explain changes, keep the trail.

## Scenario 3

A peer reviewer says judgment 2 ("further lures within 30 days are likely") is not supported.

**Task:** Respond.

> [!TIP] Model answer
> **Re-examine the evidence:** RPT-001 (B2, lures against insurers), RPT-004 (A1, infrastructure against financial-sector targets) and the confirmed contact. If the reviewer's objection is the 30-day window, either justify it (infrastructure valid until late October; new domains registered) or lower the likelihood or widen the window, and record the change. If the evidence is insufficient, say "roughly even chance" with low confidence.
>
> **Lesson:** peer challenge improves calibration; adjust and document.
