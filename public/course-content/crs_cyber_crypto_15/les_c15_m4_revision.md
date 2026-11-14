## Revision

### Summary

Cryptographic hashes provide pre-image, second pre-image and collision resistance (about n/2 bits). In the lab, one changed character flipped 127 of 256 bits. Use SHA-2, SHA-3 or BLAKE2, and retire MD5 and SHA-1 for security; SHAttered (February 2017) produced a real SHA-1 collision. A hash protects integrity against attackers only via a trusted channel, a MAC, an AEAD or a signature. Avoid H(secret || message) because of length extension, and use HMAC with separate random keys and compare_digest. In the lab, a modified webhook body failed verification. Store passwords with salts and slow, memory-hard functions in OWASP's order: Argon2id (m=19456, t=2, p=1), scrypt (N=2^17, r=8, p=1), bcrypt (cost of at least 10), PBKDF2-SHA256 (600,000 iterations). The lab measured about 2 million SHA-256 guesses per second against 5 for PBKDF2 per core. Use password KDFs for passwords and HKDF for high-entropy secrets.

### Important concepts

hash vs MAC vs signature; slow salted password hashes; KDF choice.

### Key technical takeaways

hmac.new + compare_digest; hashlib.scrypt parameters; replay-resistant MAC design.

### Glossary

| Term | Meaning |
|---|---|
| Avalanche effect | Small input change causes large output change. |
| Birthday bound | Collisions expected after about 2^(n/2) attempts. |
| HMAC | Keyed-hash message authentication code. |
| Length extension | Forging H(secret&#124;&#124;m&#124;&#124;pad&#124;&#124;x) from H(secret&#124;&#124;m). |
| Pepper | Secret added to password hashing, stored outside the DB. |
| Salt | Random per-password value stored with the hash. |

### Common mistakes

fast unsalted password hashes; == for MAC comparison; checksums on the same untrusted channel.

### Revision questions

​1. Why is SHA-256 unsuitable for passwords? 2. List OWASP parameters. 3. Design a replay-resistant webhook signature.

### Further reading

OWASP Password Storage Cheat Sheet [R1]; SHAttered [R2].

## References

- [R1] OWASP. "Password Storage Cheat Sheet". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) Accessed: 2026-11-07. Supports: algorithm order and parameters.
- [R2] Stevens, M., Bursztein, E., Karpman, P., Albertini, A., Markov, Y. "SHAttered", 23 February 2017. URL: [https://shattered.io/](https://shattered.io/) Accessed: 2026-11-07. Supports: collision, hash value, computation scale.
- [R3] Krawczyk, H., Bellare, M., Canetti, R. RFC 2104, "HMAC: Keyed-Hashing for Message Authentication", February 1997. URL: [https://www.rfc-editor.org/rfc/rfc2104](https://www.rfc-editor.org/rfc/rfc2104) Accessed: 2026-11-07. Supports: HMAC construction.
- [R4] NIST. "NIST Retires SHA-1 Cryptographic Algorithm", 15 December 2022. URL: [https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm](https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm) Accessed: 2026-11-07. Supports: phase-out by 2030.
- [R5] Lab evidence. m04_hashing.py and m04_output.txt (CPython 3.14.4), 2026-11-07.
