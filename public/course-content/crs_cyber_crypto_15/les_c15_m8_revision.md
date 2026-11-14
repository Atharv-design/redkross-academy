## Revision

### Summary

rkcrypt applies the course. Requirements and a threat model with stated non-goals lead to a design of scrypt (N=2^17, r=8, p=1) with a per-file random salt, AES-256-GCM with a random nonce, and an authenticated 36-byte versioned header. Decryption checks structure and parameter bounds before key derivation, fails uniformly, and writes output atomically. In the tested CLI run, 55 bytes became 107, the round trip preserved the SHA-256, and tampering or a wrong passphrase gave exit 1 while a missing file gave exit 2. Eleven tests cover correctness, freshness, integrity, authentication, robustness and the interface (all OK in 2.6 s). Security documentation states purpose, threat model, design with references, passphrase guidance, operations, limitations, test evidence and maintenance. Extensions (streaming, recipients, Argon2id, signatures) need version changes and new tests. The Storm-0558 findings show that key lifecycle and validation discipline matter at every scale.

### Important concepts

authenticated headers; construction-level uniqueness; documented limits.

### Key technical takeaways

struct header packing; AAD; bounded KDF parsing; atomic writes.

### Glossary

| Term | Meaning |
|---|---|
| Atomic write | Write to temp file then rename, avoiding partial output. |
| Known-answer test | Test against fixed stored vectors. |
| Non-goal | Explicitly excluded security property. |
| Test vector | Fixed input/output pair for verification. |

### Common mistakes

unauthenticated headers; no versioning; lowering parameters for tests in production.

### Revision questions

​1. Draw the file format. 2. List six test categories. 3. Name five limitations of rkcrypt.

### Further reading

OWASP Password Storage [M04-R1]; CSRB report [R1].

## References

- [R1] US Department of Homeland Security. "Cyber Safety Review Board Releases Report on Microsoft Online Exchange Incident from Summer 2023", 2 April 2024. URL: [https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer](https://www.dhs.gov/news/2024/04/02/cyber-safety-review-board-releases-report-microsoft-online-exchange-incident-summer) Accessed: 2026-11-07 (verified for Course 01). Supports: preventable, cascade of failures, 2016 MSA key, theft method undetermined, scale.
- [R2] OWASP. "Password Storage Cheat Sheet". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) Accessed: 2026-11-07. Supports: scrypt parameters.
- [R3] pyca/cryptography. "AEAD (AESGCM)" documentation. URL: [https://cryptography.io/en/latest/hazmat/primitives/aead/](https://cryptography.io/en/latest/hazmat/primitives/aead/) Accessed: 2026-11-07. Supports: AESGCM API and associated data.
- [R4] Lab evidence. rkcrypt/rkcrypt.py, rkcrypt/test_rkcrypt.py, m08_tests_output.txt, m08_cli_output.txt (CPython 3.14.4, cryptography 48.0.0), 2026-11-07.
