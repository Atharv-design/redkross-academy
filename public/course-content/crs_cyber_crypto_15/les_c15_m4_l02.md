| Term | Meaning |
|---|---|
| Recommended | SHA-256, SHA-384 and SHA-512 (SHA-2, FIPS 180-4); SHA3-256 and SHA3-512 (FIPS 202); BLAKE2 and BLAKE3 (fast, widely used outside FIPS contexts). |
| Retired | MD5 (practical collisions since 2004); SHA-1 (practical collisions demonstrated in 2017). NIST announced in December 2022 that SHA-1 will be phased out of its remaining specified protocols by 31 December 2030 (Course 09 Module 2). |

Legacy MD5 or SHA-1 use can still be acceptable for non-security purposes, such as cache keys or matching old checksum formats. Document that use (Python: usedforsecurity=False, Course 12 Module 4), and never use them for signatures, certificates or integrity against attackers.
