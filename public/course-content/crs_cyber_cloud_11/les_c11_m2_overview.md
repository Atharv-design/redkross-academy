## About this module

In the cloud every action is an API call made by an identity, so identity and access management (IAM) is the primary security control. This module covers the principals of AWS IAM and Microsoft Entra ID, how AWS evaluates policies, role-based access in Azure, MFA - including a subtle condition-key behaviour that the lab demonstrates - and the guardrails that bound what any identity can do. It ends with an automated review that finds the kinds of over-privileged identities behind many cloud incidents.

## Why it matters

Microsoft reported in January 2024 that Midnight Blizzard gained initial access by password spraying a legacy, non-production test tenant account that did not have MFA, then used a legacy test OAuth application with elevated access (case study). Forgotten identities with standing privileges and no MFA remain one of the most common root causes of cloud compromise.

## Where it is used

Landing-zone identity design, SSO integration, access reviews, privileged access management, CI/CD credentials, third-party (vendor) access, and identity threat detection.

## Learning objectives

1. Describe AWS and Azure principals and when to use each.
2. Explain AWS policy evaluation (explicit deny, allow, implicit deny) and condition keys.
3. Apply Azure RBAC built-in roles and scopes with least privilege.
4. Enforce MFA correctly, including for long-term keys.
5. Use guardrails (SCPs, permission boundaries, Azure Policy, PIM) to bound privilege.
6. Review an account for risky identities and remediate them.

## Before you start

**Prerequisites:** C11-M01; Course 03 identity basics; Course 13 Module 1 helpful.

**Estimated study time:** About 9 hours.
