Revocation withdraws trust before expiry, for example when a key is compromised:

| Term | Meaning |
|---|---|
| CRL | a signed list of revoked serial numbers, downloaded periodically. |
| OCSP | an online status query. OCSP stapling lets the server attach a fresh signed response to the handshake. |

Revocation checking is imperfect in practice: clients may "soft-fail" when they cannot reach the responder, and browsers use their own mechanisms. This is one reason the industry is shortening certificate lifetimes, so compromised certificates expire sooner (Module 6 covers the CA/Browser Forum schedule). Certificate Transparency (CT) requires publicly trusted CAs to log certificates in public append-only logs, and browsers expect proof of logging. Domain owners can monitor CT logs for certificates issued for their domains that they did not request, which detects mis-issuance like DigiNotar's. CAA DNS records restrict which CAs may issue for a domain.
