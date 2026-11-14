Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

IT announces a migration from Sysmon to a commercial EDR next month.

**Task:** Plan validation.

> [!TIP] Model answer
> Treat it as a change that invalidates current validation. Map Sysmon fields to the EDR's fields (normalisation) and update rule pipelines. Run the replay plan against converted rules. Run benign simulations in a lab on hosts with the new agent to confirm the telemetry arrives with the expected fields. Compare coverage and detection rates before and after, run both in parallel during the cut-over, and retire Sysmon only when the parity criteria are met.
>
> **Lesson:** sensor changes trigger revalidation.

## Scenario 2

A purple-team test of password spraying is "MISSED", but the identity log shows the failures arrived in the SIEM.

**Task:** Diagnose.

> [!TIP] Model answer
> Telemetry is present, so look at the logic and the pipeline: field names or values (LogonType as a string versus an integer; a different account name format); the rule's log-source mapping and index; the correlation threshold and time window (failures spread over a longer window); parsing delays; and whether the rule is enabled. Reproduce the case with the exact events as a unit test.
>
> **Lesson:** separate telemetry gaps from logic gaps.

## Scenario 3

A vendor report still tags log-clearing as T1070.001 under Defense Evasion.

**Task:** Explain how you will use the report.

> [!TIP] Model answer
> Use the report's behavioural content, but translate its mapping: T1070.001 is revoked in ATT&CK 20.1 and replaced by T1685.005 under Defense Impairment (TA0112). Record the translation in your notes, tag internal rules and reports with the current ID, and state the ATT&CK version in your own outputs.
>
> **Lesson:** map once, at the boundary, to a pinned version.
