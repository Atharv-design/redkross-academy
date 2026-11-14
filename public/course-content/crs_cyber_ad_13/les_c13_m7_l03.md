An access review answers "who can do what, and should they?". It focuses on:

- Privileged groups (Domain Admins, Enterprise Admins, Administrators, Account/Backup Operators): membership small, named, justified, reviewed.
- Service accounts: not in privileged groups, scoped, governed (Module 3).
- Stale and orphaned accounts: disabled when people leave or apps retire.
- Delegated rights on OUs: still appropriate to current roles.

The review is done WITH the business owners, who confirm whether each access is still needed; the security team provides the data and the risk framing. The lab's group enumeration (samba-tool group listmembers) is the data source; the judgement is human.
