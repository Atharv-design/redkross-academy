## About this module

Authentication answers "who are you?"; AUTHORISATION answers "what are you allowed to do?". Broken access control - failing to enforce what an authenticated user may do or see - is the number one category in the OWASP Top 10:2025, because it is both common and high-impact [R1]. This module covers access-control models; the two most common web authorisation flaws - insecure direct object references (IDOR) and missing function-level access control; and the remediation patterns that fix them. You will confirm both flaws on the lab target you own and see the hardened checks that close them.

## Why it matters

Broken access control means a user can act outside their permissions: read another customer's order (IDOR), reach an admin function without being an admin (function-level gap), or elevate privilege. These flaws are frequently trivial to exploit (change an id in a URL) and directly expose data and functions, which is why the category sits at A01. They are also commonly missed by automated scanners because they are logic flaws with no signature - so human review and careful design are essential. In the lab, two access-control findings - IDOR (CVSS 6.5) and a broken /admin check (CVSS 8.2) - illustrate both halves.

## Where it is used

Every endpoint that returns a user-specific object or performs a privileged action; API object-level authorisation; admin consoles; multi-tenant systems where one tenant must never see another's data. Reviewed in design, code review and every access-control audit.

## Learning objectives

1. Explain access-control models (RBAC, ABAC) and least privilege.
2. Define IDOR / broken object-level authorisation and its causes.
3. Define missing function-level access control.
4. Confirm both flaws safely on an owned target.
5. Apply remediation patterns (server-side ownership and role checks).
6. Distinguish authentication from authorisation failures.

## Before you start

**Prerequisites:** Modules 1-3 (HTTP, mapping, identity/sessions).

**Estimated study time:** About 8 hours.
