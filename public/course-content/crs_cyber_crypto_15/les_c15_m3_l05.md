Approximate equivalent strengths (NIST SP 800-57 Part 1 Rev. 5, [R2]):

| Term | Meaning |
|---|---|
| security bits | symmetric   RSA        ECC |
| 112 | 3DES-class  2048       224 |
| 128 | AES-128     3072       256 (P-256, Curve25519) |
| 192 | AES-192     7680       384 |
| 256 | AES-256     15360      512+ |

Practical choices for new systems: Ed25519 or ECDSA P-256 signatures; X25519 or P-256 key agreement; RSA at least 2048 bits for compatibility and 3072+ for long-lived keys; AES-256 for data at rest.

**Private key protection:**

- Generate keys where they will live: HSM, TPM, smart card or cloud KMS. Keys generated on the device never leave it.
- Protect file-based keys with passphrase encryption and file permissions. Never commit them to repositories (Course 12 Module 6).
- Separate keys by purpose and environment. Keep offline roots for PKI (Module 5).
- Plan revocation and rotation before you need them.
- Validate the generation path itself. Certified hardware can still ship flawed key generation, as ROCA showed.
