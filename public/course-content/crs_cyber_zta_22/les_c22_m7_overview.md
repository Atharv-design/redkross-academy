## About this module

An architecture is a set of claims: this network is segmented, this resource requires phishing-resistant MFA, this traffic is inspected, these logs are kept. Assurance is the discipline of turning those claims into evidence. This module covers threat modelling at architecture level, the design review process that decides whether a design is acceptable, and control validation - proving by effect that each control does what the design says. It ends by building a traceability matrix that links Tamarind's requirements to controls, tests and hashed evidence, and shows which claims are proven, which fail and which are only asserted.

## Why it matters

The US Government Accountability Office reported that Equifax had a tool to inspect network traffic, but an expired digital certificate - expired about 10 months before the 2017 breach - meant encrypted traffic was not being inspected; a scan a week after the vulnerability notice did not detect the vulnerable server (case study). Controls that exist on paper but are not validated give false confidence.

## Where it is used

Architecture review boards, solution design sign-off, security assurance and internal audit, regulatory assessments, control testing programmes, purple-team exercises (Course 20), and zero trust programme reporting.

## Learning objectives

1. Explain assurance as evidence that requirements are met.
2. Threat-model an architecture using data flows, trust boundaries and STRIDE.
3. Run a design review with criteria, decisions and recorded rationale.
4. Validate controls by effect rather than by configuration inspection.
5. Build and maintain a requirement-to-evidence traceability matrix.
6. Plan continuous assurance with re-validation triggers.

## Before you start

**Prerequisites:** C22-M01 to C22-M06; Course 12 Module 2 (threat modelling); Course 17 (audit and assurance); Course 20 (detection testing).

**Estimated study time:** About 8 hours.
