Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A database must be reachable by an analytics team's laptops "for queries".

**Task:** Design access.

> [!TIP] Model answer
> No direct laptop-to-database path. Provide a read replica or analytics store with masked data, accessed through a bastion or ZTNA with MFA, managed devices and JIT; or a query service with role-based access and logging; classify data and minimise (Module 5).
>
> **Lesson:** provide access through enforcement points, not network holes.

## Scenario 2

A critical VPN appliance advisory is published; patch available in 3 days.

**Task:** Respond architecturally and operationally.

> [!TIP] Model answer
> Apply vendor mitigations immediately; restrict exposure (allow-list source IPs where possible); increase monitoring and central log collection; check for indicators; prepare rebuild; patch as soon as available; review what the appliance can reach and enforce identity behind it; consider ZTNA migration.
>
> **Lesson:** assume the gateway can fall.

## Scenario 3

Cloud security groups have grown to 400 rules nobody understands.

**Task:** Fix.

> [!TIP] Model answer
> Rebuild from a documented flow matrix: inventory observed flows (flow logs), map to owners and purposes, replace IP rules with security-group references or tags, remove unused rules after monitoring, enforce change review and automated connectivity tests, and use policy-as-code.
>
> **Lesson:** rules need intent, owners and tests.
