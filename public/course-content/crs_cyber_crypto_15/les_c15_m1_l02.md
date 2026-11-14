**Kerckhoffs's principle (19th century):** a system should remain secure even if everything about it except the key is public. Modern cryptography follows it. Algorithms such as AES, SHA-256 and the elliptic-curve schemes are public, standardised and analysed for years by researchers. Security rests on key secrecy and size. A vendor claiming "proprietary encryption" is asking you to trust what has not been reviewed. Treat it as a red flag (see Module 2's case study). The toolbox (covered in later modules):

| Term | Meaning |
|---|---|
| Symmetric encryption (AEAD) | AES-GCM, ChaCha20-Poly1305       (M02) |
| Public-key encryption/KEM | RSA-OAEP, ECDH/X25519, ML-KEM    (M03) |
| Hash functions | SHA-256, SHA-3                   (M04) |
| MACs | HMAC, AEAD tags                  (M04) |
| Password hashing/KDFs | Argon2id, scrypt, PBKDF2, HKDF   (M04) |
| Signatures | Ed25519, ECDSA, RSA-PSS, ML-DSA  (M03/M05) |
| Protocols | TLS 1.3, SSH, Signal-style messaging (M06) |

Rule one of applied cryptography: use these through vetted, high-level libraries and protocols. Do not design your own (Module 7).
