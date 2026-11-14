TLS fails quietly when misconfigured. The common weaknesses:

```text
Deprecated protocols  SSLv2, SSLv3, TLS 1.0 and TLS 1.1 have known
                      weaknesses and are deprecated (RFC 8996); they must be
                      disabled.
Weak ciphers          RC4, 3DES/DES, EXPORT-grade, NULL and anonymous suites,
                      and MD5-based ones, are broken or weak; prefer modern
                      AEAD suites (AES-GCM, ChaCha20-Poly1305).
Weak certificate keys RSA keys under 2048 bits are too weak; use >= 2048 or
                      ECDSA.
Expired/expiring certs break trust or force users past warnings.
```

Each of these can leave traffic interceptable or tamperable while the connection still "works", which is why they must be found by configuration review. NIST SP 800-52r2 gives the authoritative guidance on selecting and configuring TLS [R3].
