An allowed-flow (segmentation) policy enumerates the permitted zone-to-zone (or workload-to-workload) flows and denies the rest by default. For the lab:

```text
internet -> dmz :443 ; user -> dmz :443 ; dmz -> app :8080 ;
app -> db :5432 ; mgmt -> app :22 ; mgmt -> db :22
```

Everything not listed - user->db, internet->db, dmz->db, user->mgmt - is denied. This policy is the enforceable form of the architecture from Module 1. It is implemented by firewalls/ACLs at the boundaries (Module 2) and, crucially, VALIDATED against reality (this module). The policy is short, explicit and reviewable, which is the point: a reader can see exactly what is allowed and confirm it matches least privilege.
