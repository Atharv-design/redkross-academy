## About this module

Detection logic is software. It has inputs (telemetry), outputs (alerts), bugs (missed attacks and false positives) and users (analysts who must act on it). Detection as code applies software engineering to that logic. Rules are written in a portable format, stored in version control, reviewed by a second person, tested automatically and released through gates. This module builds the Tamarind detection pack of seven Sigma rules with 18 unit tests, a Git hook that blocks broken rules, and conversion to a SIEM query language with sigma-cli.

## Why it matters

Untested detection content fails silently: a rule with a typo matches nothing, and nobody notices until an incident review. Content that is pushed without staged release can also fail loudly. CrowdStrike's July 2024 content update, examined in this module's case study, crashed about 8.5 million Windows devices.

## Where it is used

Detection engineering teams with Git repositories of Sigma, vendor-native or query-language rules; CI pipelines that lint, test and deploy content to SIEM and EDR; community rule sets such as SigmaHQ.

## Learning objectives

1. Write Sigma rules with correct structure, modifiers, conditions and escaping.
2. Explain log-source mapping and the role of processing pipelines in conversion.
3. Design positive, negative and edge-case unit tests for rules.
4. Operate a review workflow with version control, hooks and peer review.
5. Lint and convert rules with sigma-cli.
6. Manage the rule lifecycle: status, false positives, deprecation and staged deployment.

## Before you start

**Prerequisites:** C20-M01 to M03; Course 08 Module 6 (Sigma introduction); basic Git.

**Estimated study time:** About 10 hours.
