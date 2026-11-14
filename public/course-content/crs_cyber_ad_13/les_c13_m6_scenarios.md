Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Your SIEM suddenly stops receiving Security events from a domain controller, with no maintenance scheduled.

**Task:** Explain why this is itself a signal and what you would do.

> [!TIP] Model answer
> Unexplained loss of expected telemetry is a signal, not a non-event: an attacker on the DC may have cleared or stopped logging (CS1), or forwarding has failed. Treat it as potential compromise: verify the DC and the forwarding pipeline, check for a security-log-cleared event (1102) just before the gap, check the DC's health and recent logons/account changes, and begin an investigation if clearing is confirmed. Fix the forwarding and backfill if possible.
>
> **Lesson:** absence of expected events is itself an alert.

## Scenario 2

A service account generates hundreds of failed logons every morning.

**Task:** Describe how you would decide whether this is an attack or a misconfiguration, and how you would tune the detection.

> [!TIP] Model answer
> **Scope and baseline:** is the burst always the same account from the same source at the same time (consistent with a service retrying a stale credential) or does it vary? Corroborate: are the failures pre-auth failures for one account (likely misconfiguration) or spread across many accounts (spraying)? If misconfiguration, fix the service's stored credential and tune the detection by setting the threshold above this account's known baseline and allow-listing that specific account/source pattern explicitly - not by weakening the rule for everyone.
>
> **Lesson:** baseline the account; tune narrowly, never globally.

## Scenario 3

You must build a detection for Kerberoasting activity on Windows.

**Task:** Explain which event and field you would use and what pattern would raise the alert.

> [!TIP] Model answer
> Use event 4769 (a Kerberos service-ticket was requested) and its encryption type and service-name fields. Suspicious patterns: a single account requesting service tickets for many different SPNs in a short time, and/or tickets requested with RC4 (0x17) when AES is expected (a downgrade to ease offline cracking). Correlate with which account made the requests and from where, and with the dir_review.py list of SPN-bearing accounts (Module 5).
>
> **Lesson:** 4769 plus encryption type and SPN breadth is the Kerberoasting signal.
