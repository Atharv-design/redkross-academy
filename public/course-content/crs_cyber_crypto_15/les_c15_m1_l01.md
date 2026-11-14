| Term | Meaning |
|---|---|
| Confidentiality | only intended parties can read the data (encryption). |
| Integrity | unauthorised changes are detected (MACs, AEAD tags, signatures). Plain hashes only detect accidents unless the hash itself is protected. |
| Authenticity | the data or party is who it claims to be (MACs prove possession of a shared key; signatures prove possession of a private key). |
| Non-repudiation | the signer cannot plausibly deny signing. Only signatures, plus sound key custody, provide it. MACs do not, because both parties hold the key. |
| Forward secrecy | compromise of long-term keys does not expose past sessions (ephemeral key exchange, Module 6). |

Cryptography does not provide availability, and it does not fix authorisation logic, endpoint compromise or social engineering. An encrypted database is still readable by the application that holds the key.
