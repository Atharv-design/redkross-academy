| Term | Meaning |
|---|---|
| domain | a partition of the directory with its own security policy and its own set of domain controllers; identified by a DNS name (ad.sahyadri.example) and a NetBIOS name (SAHYADRI) |
| tree | one or more domains sharing a contiguous DNS namespace (corp.example and sales.corp.example) |
| forest | one or more trees sharing a schema, configuration and global catalogue, joined by automatic two-way transitive trusts |
| trust | a relationship that lets users in one domain be authenticated by another; within a forest trusts are automatic and transitive |

The single most important security fact in this lesson: the forest, not the domain, is the security boundary. An attacker who controls any domain controller in a forest can, through shared trust and the schema, reach every domain in that forest. Organisations that need true isolation use separate forests, not separate domains [R2]. Trusts to other forests can be one-way or two-way, transitive or not, and can carry protections such as SID filtering.
