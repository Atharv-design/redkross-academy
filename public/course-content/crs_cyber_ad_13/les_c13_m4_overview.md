## About this module

This module turns the administrative structures of Module 3 into a deliberate security architecture. The central idea is CONTAINMENT: arrange identities, systems and administrative paths so that compromising one thing does not let an attacker reach everything. You will learn the Active Directory tier model and the Enterprise Access Model that succeeds it; least privilege and privileged-access workstations; the Protected Users group and other built-in protections; and secure configuration baselines. The lab's tiered OUs (Tier0, Tier1, Tier2) from Module 3 become the frame on which these controls hang.

## Why it matters

The reason a single phishing email can end in domain-wide ransomware is almost always a missing containment boundary: a domain admin logged on to an ordinary workstation, so their credentials were exposed there; or a server admin account could also administer the domain. The tier model exists precisely to stop credential exposure from cascading upward. Microsoft developed it after repeated real compromises and now frames it as the Enterprise Access Model [R1].

## Where it is used

Any organisation serious about identity security: the tier or access model shapes how admin accounts, admin workstations and management tools are designed; the Protected Users group and LAPS are standard hardening; and security baselines (CIS, Microsoft, STIGs) drive configuration at scale.

## Learning objectives

1. Explain credential exposure and why administration must be contained.
2. Describe the Active Directory tier model (Tier 0/1/2) and its rules.
3. Describe the Enterprise Access Model and how it evolves the tier model.
4. Explain privileged-access workstations and the "clean source" principle.
5. Apply built-in protections: Protected Users, LAPS, and account hardening.
6. Apply secure configuration baselines and measure against them.

## Before you start

**Prerequisites:** Modules 1-3.

**Estimated study time:** About 8 hours.
