## About this module

This module brings the course together into one engineering task: take a cluster from default settings to a hardened configuration, scan everything that runs on it, and prove the result with evidence another person can reproduce. The method matters as much as the result: measure a baseline, prioritise, change one thing at a time, verify each control by testing its effect, and record observations separately from conclusions. You will use the lab's evidence collector, which tests ten controls and writes a hash-stamped report, and you will see it find gaps in the course's own lab configuration.

## Why it matters

Security that cannot be shown is hard to fund, audit or maintain. Hardening also decays: add-ons are installed, defaults change between versions, and emergency changes accumulate. In March 2025 the Kubernetes project disclosed CVE-2025-1974, a critical flaw in the ingress-nginx admission controller that, under certain conditions, gave an unauthenticated attacker with access to the pod network code execution and access to Secrets the controller could read (case study CS1) [R1]. Organisations that knew which add-ons they ran, could test exposure and had evidence routines responded in hours.

## Where it is used

Platform readiness reviews, pre-production security sign-off, internal and external audits, customer security questionnaires, and recurring posture reporting to management.

## Learning objectives

1. Plan a hardening project from a measured baseline with prioritised controls.
2. Map each control to an observable test.
3. Scan images, manifests, live workloads and RBAC as one programme.
4. Produce reproducible, timestamped, hashed evidence with stated limitations.
5. Report results to technical and management audiences with residual risk.
6. Design routines that keep a cluster hardened over time.

## Before you start

**Prerequisites:** C21-M01 to C21-M07 and their practicals.

**Estimated study time:** About 8 hours (plus 16 hours for the capstone project in Part C).
