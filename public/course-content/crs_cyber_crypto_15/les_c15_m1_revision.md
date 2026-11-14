## Revision

### Summary

Cryptography provides confidentiality (encryption), integrity and authenticity (MACs, AEAD tags, signatures), non-repudiation (signatures with key custody) and forward secrecy (ephemeral exchange), but not availability or authorisation. Kerckhoffs's principle puts all secrecy in keys, so use public, standard algorithms through vetted libraries. Keys and tokens need CSPRNG output (os.urandom, secrets). In the lab, seeded random produced identical tokens. Entropy is log2 of the possibilities: 13.3 bits for a PIN, 128 bits for token_hex(16). Threat models state assets, adversaries, key custody, lifetime and failure modes. Standards evolve: FIPS 186-5 (2023), RFC 9846 for TLS 1.3, and post-quantum FIPS 203-205 (August 2024). Design for agility. The Debian 2008 RNG flaw forced key regeneration across many systems.

### Important concepts

goals versus primitives; CSPRNG only; agility.

### Key technical takeaways

`secrets.token_*;` entropy arithmetic; first-boot key generation.

### Glossary

| Term | Meaning |
|---|---|
| CSPRNG | Cryptographically secure pseudo-random number generator. |
| Entropy | Unpredictability measured in bits. |
| Forward secrecy | Past sessions safe after long-term key compromise. |
| Kerckhoffs's principle | Security rests on the key, not secrecy of design. |
| ML-KEM | Post-quantum key encapsulation (FIPS 203). |
| Non-repudiation | Signer cannot plausibly deny a signature. |

### Common mistakes

random for tokens; secret algorithms; shared template keys.

### Revision questions

​1. Map five goals to primitives. 2. Why is Python's random unsafe for tokens? 3. Compute entropy for 6 diceware words.

### Further reading

Debian DSA-1571 [R1]; NIST PQC announcement [R3].

## References

- [R1] Debian. "DSA-1571-1 openssl - predictable random number generator", 13 May 2008. URL: [https://lists.debian.org/debian-security-announce/2008/msg00152.html](https://lists.debian.org/debian-security-announce/2008/msg00152.html) Accessed: 2026-11-07. Supports: CVE, cause, affected versions, key regeneration advice.
- [R2] Python Software Foundation. "secrets - Generate secure random numbers for managing secrets". URL: [https://docs.python.org/3/library/secrets.html](https://docs.python.org/3/library/secrets.html) Accessed: 2026-11-07. Supports: secrets module API and purpose.
- [R3] NIST. "NIST Releases First 3 Finalized Post-Quantum Encryption Standards" (FIPS 203, 204, 205 approved 13 August 2024). URL: [https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved](https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved) Accessed: 2026-11-07. Supports: dates and purposes.
- [R4] NIST. FIPS 186-5, "Digital Signature Standard", 3 February 2023. URL: [https://csrc.nist.gov/pubs/fips/186-5/final](https://csrc.nist.gov/pubs/fips/186-5/final) Accessed: 2026-11-07. Supports: date.
- [R5] Lab evidence. m01_randomness.py and m01_output.txt (CPython 3.14.4), 2026-11-07.
