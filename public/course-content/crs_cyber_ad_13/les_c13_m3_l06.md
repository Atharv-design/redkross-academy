Privilege must be granted deliberately and reviewed. Principles:

- Separate accounts: an administrator uses a normal account for email and browsing and a SEPARATE admin account for privileged work; the admin account never reads email or browses the web (the route most malware takes).
- Least privilege and just-enough-admin: grant the narrowest right (reset passwords in one OU) rather than membership of Domain Admins.
- Small, named, reviewed membership of privileged groups; remove membership when a task ends; prefer time-bound elevation where available.
- Protect the most sensitive built-ins (Domain Admins, Enterprise Admins) and the krbtgt account; rotate krbtgt deliberately (Module 5).

These are governance habits, enforced by structure (OUs, groups, tiers) and checked by review (Module 7). In the lab the user "t0-admin" is the only member of Domain Admins, and ordinary staff and service accounts are kept out of privileged groups by design.
