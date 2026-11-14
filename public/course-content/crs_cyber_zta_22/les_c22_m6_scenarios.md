Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

The SIEM team proposes reducing PDP decision-log retention to 14 days to save cost.

**Task:** Respond.

> [!TIP] Model answer
> **Decline:** decision logs are the primary evidence of who was allowed what and why; keep at least 180 days (CERT-In) and preferably a year, using tiered storage to control cost; summarise high-volume ALLOW events if needed but keep DENY, STEP_UP, policy-version and session data in full.
>
> **Lesson:** retention is set by evidence needs, not by storage price alone.

## Scenario 2

The business asks for the payroll application to fail open during PDP outages because "payroll must run".

**Task:** Propose a design.

> [!TIP] Model answer
> Keep fail closed for confidential payroll data; add multi-zone PDPs to make outages rare, a short bounded decision cache for already-authenticated payroll sessions, and a dual-control break-glass process with immediate alerting and post-use review; rehearse it before the payroll run.
>
> **Lesson:** solve availability with redundancy and break-glass, not fail-open.

## Scenario 3

After a ransomware tabletop, you learn that backup administration uses accounts in the production directory.

**Task:** Recommend changes.

> [!TIP] Model answer
> Move backup administration to a separate identity domain with phishing-resistant MFA and dual control; make backups immutable or offline; include directory and IdP configuration in backups; test restore against the RTO; monitor and alert on backup deletion and policy changes.
>
> **Lesson:** recovery must not depend on what the incident may compromise.
