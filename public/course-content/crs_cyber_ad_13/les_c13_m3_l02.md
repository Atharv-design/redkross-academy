**Core object classes:** users (people and service identities), computers (one per domain-joined machine, with its own account and password) and groups. Groups have a TYPE and a SCOPE:

| Term | Meaning |
|---|---|
| type | security (used in access checks) or distribution (email lists only) |
| scope | domain local (grant resource access), global (gather users by role) and universal (forest-wide; stored in the global catalogue) |

The classic pattern is "AGDLP": put Accounts into Global groups by role, put those into Domain Local groups that are granted Permissions on resources. This keeps role membership and resource permissions separate and reviewable. Built-in privileged groups - Domain Admins, Enterprise Admins, Administrators, Account Operators - deserve special attention: their membership is the most security-sensitive data in the directory, and should be small, named and reviewed (L06).
