The tier model (the "legacy tier model" in current Microsoft terms, still widely deployed) divides administration into three tiers by the value of what is administered:

| Term | Meaning |
|---|---|
| Tier 0 | identities and systems with control of the directory itself: domain controllers, domain/enterprise admins, and anything that can take control of them (e.g. the systems that manage them) |
| Tier 1 | servers and server administrators (the application and data layer) |
| Tier 2 | workstations and workstation/help-desk administrators |

The rule is simple and strict: a credential from a higher tier is NEVER exposed on a lower-tier system, and administration flows downward only. A Tier 0 admin logs on only to Tier 0 systems; a Tier 1 admin never uses their admin account on a Tier 2 workstation. This prevents the fatal pattern of L01. The lab's OU structure (OU=Tier0/Tier1/Tier2 from Module 3) is the skeleton of this model; the accounts t0-admin, t1-srvadm and t2-help represent the three tiers.
