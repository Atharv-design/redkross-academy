Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A fictional company sends only firewall logs to its SIEM to save licence costs. Task: Explain the risk and a prioritised onboarding plan.

> [!TIP] Model answer
> Firewall logs show connections but not who, which process or what was accessed; most intrusion stages would be invisible. Prioritise: identity (IdP/AD sign-ins, VPN, MFA), endpoint (EDR or Sysmon plus Security logs on servers and DCs), DNS and proxy, cloud audit logs, then others; filter noisy low-value events rather than whole sources; justify by risk.
>
> **Lesson:** decide sources by detection value.

## Scenario 2

Two investigators produce timelines that disagree by 5.5 hours.

**Task:** Explain the likely cause and the fix.

> [!TIP] Model answer
> 5.5 hours equals the IST offset: one timeline used local time without conversion. Fix: normalise all timestamps to UTC with explicit offsets at ingestion, label columns, and re-run.
>
> **Lesson:** UTC is the common clock.

## Scenario 3

The VPN shows a failed login for a user who is badged into the office at the same time. Task: Interpret and next steps.

> [!TIP] Model answer
> A remote failure for an on-site user suggests someone else is trying her credentials (spraying or guessing). Check other VPN failures from the same source address (the dataset shows eight users from 203.0.113.66) and any successes; consider forcing a password reset and confirming MFA for affected users; escalate per playbook.
>
> **Lesson:** correlate identity with physical and endpoint context.
