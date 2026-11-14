Asset and identity mapping builds an inventory of what is in scope:

```text
assets       hosts, services and applications within the authorised scope - their
             addresses, roles and relationships.
identities   the accounts and privilege relationships relevant to the engagement
             (users, service accounts, admin tiers) - the identity attack surface.
relationships how assets and identities connect (trust, access paths) - the map
             that later modules reason over for lateral movement (Module 5).
```

Mapping orients the engagement and is done ONLY within scope and against systems you are authorised to assess. The lab's authorised_scope.json is the inventory: the range networks, hosts (DC, web, workstation) and lab identities. Everything the engagement does is checked against this map.
