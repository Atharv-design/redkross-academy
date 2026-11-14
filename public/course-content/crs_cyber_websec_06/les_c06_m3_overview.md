## About this module

Authentication answers "who are you?" and session management keeps answering it across a stateless protocol. Get either wrong and every other control fails, because the application acts on the wrong identity. This module covers authentication design flaws (weak credentials, bad storage, flawed login), session-management weaknesses (predictable or unprotected tokens, poor lifecycle), and the frequently-overlooked weak points of multi-factor authentication (MFA) and account recovery. You will confirm the lab's weak session token on a target you own, and see the hardened design that fixes it. These map to OWASP A07:2025 Authentication Failures [R1].

## Why it matters

Authentication Failures remain in the OWASP Top 10 because they are common and high-impact: a predictable session token lets an attacker become any user; a weak recovery flow bypasses the password entirely; MFA that can be skipped or phished is no barrier. Unlike some flaws, identity weaknesses often grant full account takeover with no further exploitation. They are also almost entirely preventable with well-understood patterns - strong credential handling, random protected session tokens, and carefully designed recovery and MFA.

## Where it is used

Every login, every session, every "forgot password", every MFA enrolment and every API token. Identity design is reviewed in threat modelling, secure design, code review, and after any account-takeover incident.

## Learning objectives

1. Identify common authentication design flaws and their fixes.
2. Explain secure credential storage (hashing with a strong algorithm).
3. Identify session-management weaknesses and design secure sessions.
4. Explain MFA types and common MFA weaknesses.
5. Identify account-recovery flaws and design safe recovery.
6. Confirm the lab's weak session token and specify the fix.

## Before you start

**Prerequisites:** Modules 1-2 (HTTP, cookies, sessions, mapping).

**Estimated study time:** About 8 hours.
