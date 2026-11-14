## About this module

Coverage matrices and unit tests show that detections exist and that their logic works on the cases their authors imagined. Purple-team validation asks a harder question: does the detection fire on the variants a real adversary would use? This module uses ATT&CK as a test plan and designs test cases from public documentation. You will replay synthetic telemetry against the rule pack, find three real gaps, tune the rules and prove with a regression test that tuning added no false positives. No technique is executed. The tests replay log records that describe what a technique leaves behind.

## Why it matters

CISA's red-team assessment AA24-326A (November 2024) found that the assessed organisation's activity generated security alerts that network defenders did not review, that there were no detections for anomalous LDAP traffic, and that legacy hosts without EDR let the red team persist for months [R1]. Validation finds such gaps before an adversary does.

## Where it is used

Purple-team exercises between internal red and blue teams; continuous detection validation programmes; pre-release testing of detection packs; vendor product evaluations.

## Learning objectives

1. Explain purple teaming and the difference between telemetry replay and authorised adversary emulation.
2. Use ATT&CK to plan tests, and manage ATT&CK version drift.
3. Design technique-variant test cases with expected telemetry and pass criteria.
4. Run validation tests and measure the detection rate.
5. Tune detections and prove the absence of regressions.
6. Report gaps and plan retests.

## Before you start

**Prerequisites:** C20-M01 to M06; Course 19 Module 7 (purple team operations) is helpful.

**Estimated study time:** About 9 hours.
