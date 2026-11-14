| Term | Meaning |
|---|---|
| Silo | separate stack per tenant: strongest isolation, highest cost. |
| Pool | shared stack with tenant ID enforced in every query and policy: efficient, needs rigorous authorisation and testing. |
| Bridge | shared application, separate data stores per tenant. |

**Controls for pooled designs:** tenant ID derived from the authenticated token (never from request parameters), row-level security in the database, per-tenant encryption keys (enables crypto-shredding on exit; Course 15 M02), tests that cross-tenant access fails. Isolate functions too: admin APIs on separate endpoints behind stronger policy (Module 2); batch jobs with their own identities and least privilege.
