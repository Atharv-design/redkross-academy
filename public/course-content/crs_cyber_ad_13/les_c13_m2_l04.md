LDAP (RFC 4511) is how clients read and search the directory [R2].

**Two operations dominate:**

| Term | Meaning |
|---|---|
| bind | authenticate the connection. A SIMPLE bind sends a DN and a password (must be protected by TLS, or it is plaintext on the wire). A SASL bind negotiates a mechanism; GSSAPI/Kerberos is the strong choice, using the TGT rather than a password. |
| search | given a base DN, a scope (base, one-level, subtree) and a filter such as (objectClass=user), return matching entries and the requested attributes. |

**The security points:** prefer LDAPS (636) or StartTLS so simple binds are not in the clear; prefer SASL/GSSAPI (no password crosses the wire); and remember that any authenticated user can read a great deal of the directory by default (users, groups, SPNs, delegation flags) - which is exactly what the hygiene review in Module 5 relies on, and what attackers enumerate.
