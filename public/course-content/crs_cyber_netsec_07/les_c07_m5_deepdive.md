LAB_ASSETS/C07/tlscheck.py reviews a declarative TLS configuration offline (no connection to any server) against current guidance. Execution-tested (CPython 3.14.4, 2026-11-08) on the pre-hardening edge configuration (data/tls_config.json):

```output
TLS configuration review: Himalaya Retail web edge (pre-hardening)
  protocols: TLS1.0, TLS1.1, TLS1.2
  [HIGH  ] deprecated protocol enabled: TLS1.0  (disable; RFC 8996)
  [HIGH  ] deprecated protocol enabled: TLS1.1  (disable; RFC 8996)
  [HIGH  ] weak cipher offered: TLS_RSA_WITH_RC4_128_SHA   (remove RC4)
  [HIGH  ] weak cipher offered: TLS_RSA_WITH_3DES_EDE_CBC_SHA (remove 3DES)
  [HIGH  ] certificate RSA key too small: 1024 bits  (use >= 2048 / ECDSA)
  [MEDIUM] certificate expires in 12 days  (renew; automate)
6 findings (5 HIGH).
```

**Reading the findings:**

- TLS 1.0 and 1.1 are formally deprecated (RFC 8996) and have known weaknesses; they must be disabled, leaving TLS 1.2 and 1.3.
- RC4 and 3DES are broken/weak ciphers; they must be removed in favour of AEAD suites (AES-GCM, ChaCha20-Poly1305).
- A 1024-bit RSA key is too weak; a 2048-bit (or ECDSA P-256) key is required.
- The certificate expires in 12 days - a MEDIUM operational risk; renew and automate renewal.

The hardened configuration (data/tls_config_fixed.json) enables only TLS 1.2 and 1.3, offers only strong AEAD suites, uses a 2048-bit key, and has a far-off expiry. Execution-tested:

```output
TLS configuration review: Himalaya Retail web edge (hardened)
  protocols: TLS1.2, TLS1.3
0 findings (0 HIGH).
```

**The lesson:** TLS strength is a configuration property, and it can be assessed by reviewing the configuration offline - no scanning needed. The review moves the edge from five HIGH weaknesses to none, and the same approach belongs in a pre-deployment check so a weak TLS configuration never ships.
