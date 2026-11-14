## About this module

Cryptographic algorithms are rarely broken in practice. Implementations are. The same mistakes recur: a nonce reused, a key derived badly, a tag not checked, a comparison that leaks timing, a "temporary" disabled certificate check, a home-made protocol. This module catalogues those mistakes, shows two of them failing in a lab so that you can recognise them, and gives practical rules for choosing libraries and reviewing cryptographic code.

## Why it matters

In 2010, researchers showed that Sony's PlayStation 3 used the same supposedly random value for every ECDSA signature on firmware. That let the signing private key be computed from two signatures (case study). One implementation detail undid an otherwise sound signature scheme.

## Where it is used

Secure code review, security architecture sign-off, penetration test reports (Courses 05 and 06), library and vendor selection, incident root cause analysis.

## Learning objectives

1. Explain nonce and IV requirements per mode, and why reuse is catastrophic.
2. Choose nonce strategies and per-key usage limits.
3. Recognise common misuse patterns in code and configuration.
4. Explain side-channel risks and constant-time practices.
5. Select cryptographic libraries and APIs appropriately.
6. Review cryptographic code with a checklist.

## Before you start

**Prerequisites:** C15-M01 to C15-M06; Course 12 Module 4 (SAST).

**Estimated study time:** About 8 hours.
