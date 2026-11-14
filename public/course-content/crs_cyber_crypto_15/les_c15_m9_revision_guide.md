| Term | Meaning |
|---|---|
| Theme 1 | Foundations (M01): goals vs primitives; Kerckhoffs; CSPRNG only (seeded random gave identical tokens); entropy arithmetic; PQC FIPS 203-205; Debian 2008 RNG. |
| Theme 2 | Symmetric (M02): AES; ECB leaks (2 of 4 distinct blocks); AEAD (InvalidTag on 1-bit change or wrong AAD); key lifecycle; envelope encryption (32-byte DEK -> 40-byte wrapped); Zoom 2020. |
| Theme 3 | Public key (M03): RSA-OAEP limit 318 bytes at 3072 bits; Ed25519/ECDSA; X25519 + HKDF; key sizes; PQC migration; ROCA. |
| Theme 4 | Hashing (M04): avalanche 127/256; HMAC + compare_digest; OWASP password parameters; SHA-256 ~2M vs PBKDF2 ~5 guesses/s/core; SHAttered. |
| Theme 5 | Digital trust (M05): X.509 fields; three-tier PKI; validation errors 20/62/10/20(depth 1)/32; CT, CAA; DigiNotar. |
| Theme 6 | TLS (M06): RFC 9846 obsoletes RFC 8446; TLS 1.3 handshake; secure configuration; lab outcomes; mTLS; SC-081v3 47-day roadmap. |
| Theme 7 | Implementation (M07): nonce rules; CTR reuse leak; misuse catalogue; constant time; library preference; PS3 ECDSA. |
| Theme 8 | Capstone (M08): rkcrypt design, format, 11 tests, CLI exit codes, documentation; Storm-0558 key lessons. |

**Key verified facts:** DSA-1571 (13 May 2008); Citizen Lab Zoom report (3 April 2020); SHAttered (23 February 2017); FIPS 186-5 (3 February 2023); FIPS 203-205 (13 August 2024); RFC 9846 obsoletes RFC 8446; SP 800-52 Rev. 2 (TLS 1.3 support by 1 January 2024); SC-081v3 passed 11 April 2025; OWASP: Argon2id m=19456 t=2 p=1, scrypt N=2^17 r=8 p=1, PBKDF2-SHA256 600,000.
