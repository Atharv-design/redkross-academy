## About this module

Static application security testing (SAST) examines source code without running it, looking for patterns and data flows that indicate vulnerabilities. It scales code review across every commit. It also produces false positives and misses design flaws, so it must be tuned and its results triaged. This module explains how SAST works, teaches you to write custom Semgrep rules that encode your own secure-coding standards, runs them as a pipeline gate, and covers triage, suppression and measurement.

## Why it matters

The unsafe patterns from Module 3 recur across thousands of lines and many developers. A rule written once checks every future change. Writing your own rules for your organisation's libraries and mistakes is often more valuable than any default rule pack.

## Where it is used

Pull-request checks, IDE plugins, nightly full scans, security champion toolkits, and code review automation.

## Learning objectives

1. Explain pattern matching, data-flow and taint analysis in SAST.
2. Write Semgrep rules with patterns, metavariables and metadata.
3. Run Semgrep locally and as a failing pipeline gate.
4. Triage findings as true positive, false positive or accepted risk.
5. Suppress findings responsibly with justification.
6. Measure and improve SAST effectiveness.

## Before you start

**Prerequisites:** C12-M01 to C12-M03.

**Estimated study time:** About 8 hours.
