## About this module

"Zero trust" is often marketed as a product. It is an architectural approach: no implicit trust is granted to a user, device or workload based on its network location or ownership; every access to a resource is authenticated, authorised and evaluated against dynamic policy, per session, as close to the resource as practical, and continuously monitored. This module grounds zero trust in its primary sources - NIST SP 800-207 and the CISA Zero Trust Maturity Model - explains the logical components (policy engine, administrator, enforcement point), and models a working policy decision point.

## Why it matters

In January 2024 Microsoft disclosed that Midnight Blizzard had password-sprayed a legacy, non-production test tenant account without MFA, then used a legacy test OAuth application with elevated access to reach corporate mailboxes (case study). Implicit trust in "test" and "legacy" assets - and in an application's standing privileges - is exactly what zero trust removes.

## Where it is used

Government programmes (US federal zero trust strategies), enterprise remote-access replacement (ZTNA), cloud and SaaS access, OT segmentation, partner access.

## Learning objectives

1. State the seven zero trust tenets of NIST SP 800-207.
2. Explain policy engine, policy administrator and policy enforcement point roles.
3. Compare deployment approaches (identity governance, micro-segmentation, software-defined perimeter; agent/gateway, enclave, portal).
4. Describe the CISA ZTMM pillars, cross-cutting capabilities and stages.
5. Design dynamic, least-privilege policies with continuous verification.
6. Model and test a PDP.

## Before you start

**Prerequisites:** C22-M01, C22-M02.

**Estimated study time:** About 8 hours.
