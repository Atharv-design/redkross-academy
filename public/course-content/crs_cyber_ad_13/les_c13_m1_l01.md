A directory service is a database optimised for reading, organised as a tree of named objects, and replicated to many servers so that any of them can answer a query. Active Directory Domain Services (AD DS) is Microsoft's implementation. It is not one invented protocol but a composition of open standards:

| Term | Meaning |
|---|---|
| LDAP | Lightweight Directory Access Protocol (RFC 4511): how clients search and read the directory, over TCP 389 (or 636 for LDAPS) [R1] |
| Kerberos | the authentication protocol (RFC 4120, Module 2): how a user proves who they are and gets tickets for services, over 88 |
| DNS | the name service: how clients FIND domain controllers, through SRV records such as _ldap._tcp.<domain> |

Objects are named by a distinguished name (DN) that reads from leaf to root, for example CN=Asha Kulkarni,OU=Tier2,DC=ad,DC=sahyadri,DC=example. "DC" here is a domain component (part of the DNS name), not a domain controller - a common source of confusion. Every object has a globally unique objectGUID that never changes, and a security identifier (SID) used in access checks.
