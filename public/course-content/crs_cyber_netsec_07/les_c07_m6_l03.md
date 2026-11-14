Wi-Fi offers two authentication models:

| Term | Meaning |
|---|---|
| PERSONAL (PSK) | a single pre-shared key (passphrase) shared by all users. Simple, but the key is shared (hard to revoke per user, easy to leak) and, in WPA2, subject to offline guessing. Suitable for small or guest networks with a strong passphrase. |
| ENTERPRISE (802.1X) | each user authenticates individually against a RADIUS server with their own credentials or certificate (EAP). This gives per-user authentication, easy revocation, and no shared secret - the right choice for corporate wireless. |

For an organisation, WPA2/WPA3-Enterprise with 802.1X and per-user credentials (ideally certificates) is the recommended model, because it authenticates individuals and integrates with identity systems. Personal mode is for guest or small networks. The lab organisation's corporate Wi-Fi should use Enterprise authentication.
