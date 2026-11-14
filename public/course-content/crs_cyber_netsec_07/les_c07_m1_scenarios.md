Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A startup runs all servers and laptops on one flat subnet.

**Task:** Explain the risk and the architectural change you recommend.

> [!TIP] Model answer
> **Risk:** a flat network has a large blast radius - compromise of any one host (a phished laptop, a vulnerable server) lets the attacker reach most others, including sensitive data, because nothing controls east-west traffic.
>
> **Recommendation:** segment into trust zones (at least user, server/app, database, management, and a DMZ for any internet-facing service); permit only required zone-to-zone flows (least privilege, default-deny); and monitor the boundaries. Make the sensitive data reachable only from the tier that needs it.
>
> **Lesson:** segment by trust zone to contain compromise; do not run flat.

## Scenario 2

A design allows the DMZ web server to connect to the database on any port.

**Task:** Explain why this is wrong and the correct flow.

> [!TIP] Model answer
> Allowing the DMZ to reach the database on any port breaks least privilege: a compromised web server (the most exposed system) could then reach and attack the database directly, defeating the tiered design. The correct flow is DMZ -> APP on the single app port (e.g. 8080), and only APP -> DATABASE on the single database port (e.g. 5432); the DMZ has no path to the database. This keeps the crown jewel one controlled hop away from the exposed tier.
>
> **Lesson:** permit only the specific, minimal flows each tier needs; the DMZ must not reach the database.

## Scenario 3

Management interfaces are reachable from the user zone.

**Task:** Explain the risk and the fix.

> [!TIP] Model answer
> **Risk:** if the user zone can reach management interfaces, any compromised workstation (or malware on it) can attempt to log in to switches, routers and firewalls - the keys to the kingdom. Fix: place management in a dedicated zone reachable only over a controlled path (a hardened jump host / bastion over SSH), deny all user-to-management traffic by default, require strong authentication and MFA, and monitor every attempt to reach management.
>
> **Lesson:** isolate and tightly restrict the management plane; the user zone must never reach it.
