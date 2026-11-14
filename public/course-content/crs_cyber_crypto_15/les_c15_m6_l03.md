**Server checklist:**

- Protocols: TLS 1.3, plus TLS 1.2 where clients need it. Disable 1.0 and 1.1 and all SSL versions.
- TLS 1.2 suites: ECDHE with AES-GCM or ChaCha20-Poly1305 only. No RSA key transport, CBC suites, RC4, 3DES, export or NULL suites.
- Certificates: full chain (leaf plus intermediates), correct SANs, ECDSA P-256 or RSA 2048+/3072, automated renewal.
- HSTS for websites, after confirming everything works over HTTPS.
- OCSP stapling where supported.
- Session ticket keys rotated regularly. Disable 0-RTT unless it is reviewed.
- Use maintained libraries and mainstream configuration generators (for example Mozilla's server-side TLS guidance), and review them yearly.

**Client checklist:**

- Verify certificates and hostnames. Libraries do this by default (for example Python's ssl.create_default_context), so never disable it.
- Set minimum versions. Use the OS or a maintained trust store, or a private CA bundle for internal services.
- Consider pinning only where you control both ends, with a rotation plan.
