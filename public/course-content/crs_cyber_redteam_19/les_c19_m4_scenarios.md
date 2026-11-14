Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A service account logs on from a new host at 03:00.

**Task:** Explain the telemetry, detection and containment.

> [!TIP] Model answer
> **Telemetry:** authentication logs capture the logon (type, source host, time, account).
>
> **Detection:** a behavioural rule flags an anomalous logon for a service account - a new source host and an odd hour are strong signals, since service accounts usually log on from known hosts in patterns. Containment: MFA where applicable, tiered admin and logon restrictions so the account cannot log on where it should not, plus review of why the account is used that way.
>
> **Lesson:** detect identity abuse behaviourally over authentication telemetry and contain with MFA/tiering/restrictions.

## Scenario 2

A tester wants to prove credential exposure by dumping all real user passwords.

**Task:** Explain why this is wrong and the authorised approach.

> [!TIP] Model answer
> Dumping all real user passwords harvests real secrets, is destructive to trust and privacy, and exceeds what controlled validation needs. The authorised approach: work on in-scope hosts with LAB accounts, demonstrate the exposure risk minimally (e.g. show a credential is recoverable from a config in the lab) without collecting real users' secrets, and handle any sensitive data per the RoE and DPDP Act. The aim is to improve defence, not amass credentials.
>
> **Lesson:** review credential exposure with lab accounts and minimal proof; never harvest real secrets.

## Scenario 3

An emulated Account Discovery step produced no alert.

**Task:** Explain what this reveals and the recommendation.

> [!TIP] Model answer
> No alert means a telemetry/detection GAP: the directory-read activity of Account Discovery was not monitored or not alerted on. This is a finding. The recommendation: collect directory/process telemetry for bulk account/group enumeration, build a detection for it, apply least privilege to limit what can be enumerated, then re-emulate to confirm the detection fires (Module 7).
>
> **Lesson:** a missing alert is a detection gap to engineer and retest.
