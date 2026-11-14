## About this module

Most cloud security failures are configuration failures: a setting that allows public access, a rule that opens an admin port, a database without encryption, a log that was never enabled. Because cloud configuration is data - API responses and infrastructure-as-code (IaC) files - it can be checked automatically, before deployment and continuously afterwards. This module covers common misconfiguration patterns, cloud security posture management (CSPM), IaC scanning, guardrails that prevent bad configuration, and how to verify that a remediation actually worked. The lab scans deliberately weak Terraform for AWS and Azure resources with checkov, fixes it, and verifies the result.

## Why it matters

In August 2021 UpGuard reported that 38 million records were exposed across Microsoft Power Apps portals because lists had table permissions disabled by default; Microsoft then made table permissions enabled by default for newly created portals and pointed customers to its Portal Checker tool (case study). Defaults are configuration too, and they need checking.

## Where it is used

CSPM operations, CI/CD security gates, cloud governance teams, compliance reporting (CIS Benchmarks), change management, and audit evidence.

## Learning objectives

1. Recognise recurring cloud misconfiguration patterns.
2. Run posture assessments of live configuration and IaC.
3. Interpret scanner results, including false positives and blind spots.
4. Implement preventive guardrails (SCPs, Azure Policy deny, CI gates).
5. Remediate through code and verify the result by re-scanning and by effect.
6. Manage exceptions with owners and expiry.

## Before you start

**Prerequisites:** C11-M01 to C11-M05; Course 12 Module 6 (secure configuration) and Course 21 Module 6 (IaC) helpful.

**Estimated study time:** About 9 hours.
