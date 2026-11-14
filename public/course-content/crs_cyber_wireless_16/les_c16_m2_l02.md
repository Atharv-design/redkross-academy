Wi-Fi offers two authentication models:

```text
PERSONAL (PSK/SAE)  everyone shares one secret - a pre-shared key (WPA2) or an
                    SAE passphrase (WPA3). Simple, but the shared secret must be
                    strong and is awkward to rotate; anyone with it can join.
                    Suitable for homes and small/guest networks.
ENTERPRISE (802.1X) each user/device authenticates individually to a RADIUS
                    server using EAP (often with certificates or per-user
                    credentials). No shared Wi-Fi secret; access can be granted
                    and revoked per identity, and compromise of one credential
                    does not expose the whole network. Suitable for corporate
                    WLANs.
```

The security difference is significant: Enterprise gives per-identity authentication, revocation and accountability; Personal shares one secret. Corporate networks should prefer WPA3-Enterprise (or WPA2-Enterprise) with 802.1X; Personal/SAE is for small or guest use with a strong passphrase. The lab focuses on Personal/SAE configuration review, while this lesson sets Enterprise as the corporate target.
