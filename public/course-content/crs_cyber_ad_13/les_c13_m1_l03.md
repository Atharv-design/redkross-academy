The schema defines every class of object (user, computer, group) and every attribute they may hold. It is forest-wide, shared by every domain, and changes to it are difficult to reverse - which is why schema extensions (for example by an email or identity product) are treated as major changes. The directory is split into partitions (naming contexts):

| Term | Meaning |
|---|---|
| domain NC | the objects of one domain (users, computers, groups) |
| configuration NC | forest-wide topology (sites, services); replicated to every DC in the forest |
| schema NC | the schema itself; forest-wide |
| application NCs | for example DNS zones (DomainDnsZones) |

A global catalogue (GC) server holds a full copy of its own domain plus a partial, read-only copy of every other domain in the forest - enough attributes to find objects forest-wide and to resolve universal group membership at logon. GC runs on TCP 3268.
