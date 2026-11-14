| Term | Meaning |
|---|---|
| Root CA | self-signed and trusted because it is in a trust store (operating system, browser, Java, container image). It is kept offline, with long validity. |
| Intermediate CA | signed by the root. It issues day-to-day certificates and can be revoked or replaced without replacing the root. pathlen:0 stops it creating further CAs. |
| Leaf | the end-entity certificate for a server, client, device or signer. |

Servers must send the leaf plus intermediates (the chain) and not the root. Clients build a path from the leaf up to a root in their trust store. Public web PKI trust stores are managed by browser and OS root programmes under CA/Browser Forum Baseline Requirements. Private PKIs distribute their root to managed devices only. Never ask users to "install this root" from untrusted sources.
