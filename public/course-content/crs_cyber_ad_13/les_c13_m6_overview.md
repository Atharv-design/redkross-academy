## About this module

Hardening (Modules 3-5) removes attack preconditions; monitoring catches the activity that remains. This module is about identity telemetry: where authentication and directory-change events come from, which ones matter, and how to turn them into alerts and investigations. You will learn the key Windows Security event IDs and their equivalents in the lab's Samba JSON audit stream, configure auditing, and run the lab's authentication monitor to detect failed-logon bursts, weak encryption types and the sources of privileged logons - from real events the lab domain controller emitted.

## Why it matters

Most identity attacks are visible in telemetry if you collect and read the right events: a Kerberoasting attempt shows up as unusual service-ticket requests; password-guessing shows as failed-logon bursts; a downgrade shows as RC4 where you expected AES; a privileged logon from the wrong place breaks the tier model. Without this telemetry, defenders learn of a compromise only from its consequences. The lab's monitor turns raw audit JSON into exactly these findings.

## Where it is used

SOC monitoring and detection engineering (Courses 08 and 20), identity threat detection and response (ITDR), incident investigation, and the day-to-day triage of authentication alerts in a SIEM.

## Learning objectives

1. Identify the key Windows Security event sources and IDs for identity.
2. Map those to the lab's Samba JSON authentication audit events.
3. Configure audit policy to produce the right events without noise.
4. Detect failed-logon bursts, weak encryption types and anomalous privileged logons.
5. Investigate an authentication alert methodically.
6. Tune detections to balance coverage and false positives.

## Before you start

**Prerequisites:** Modules 2-5; Course 08 (SOC operations, SIEM basics).

**Estimated study time:** About 8 hours.
