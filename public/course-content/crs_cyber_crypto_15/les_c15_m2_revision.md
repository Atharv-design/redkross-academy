## Revision

### Summary

AES (FIPS 197) is the standard block cipher (128-bit blocks, keys up to 256 bits). Modes matter: ECB leaks repetition (2 of 4 distinct blocks in the lab), CBC without a MAC is tamperable, and CTR and stream ciphers need unique nonces and added integrity. Use AEAD: AES-GCM (SP 800-38D) or ChaCha20-Poly1305 (RFC 8439). In the lab, one flipped bit or a wrong AAD produced InvalidTag. Bind context with AAD, use 96-bit unique nonces and versioned formats. Key management covers generation, KMS or HSM storage, separation, rotation, revocation, destruction (crypto-shredding) and backup, per SP 800-57. Envelope encryption wraps per-object DEKs with KMS KEKs (32-byte DEK wrapped to 40 bytes in the lab), giving cheap rotation and central audit. Zoom's 2020 AES-128-ECB design shows mode and key distribution failures.

### Important concepts

AEAD by default; context binding; key lifecycle.

### Key technical takeaways

AESGCM/ChaCha20Poly1305 APIs; InvalidTag handling; aes_key_wrap.

### Glossary

| Term | Meaning |
|---|---|
| AAD | Associated data authenticated but not encrypted. |
| AEAD | Authenticated encryption with associated data. |
| Crypto-shredding | Destroying keys to make data unrecoverable. |
| DEK/KEK | Data encryption key / key encryption key. |
| ECB | Electronic codebook mode (unsafe for data). |
| Nonce | Number used once per key. |

### Common mistakes

ECB; ignoring tags; one key for everything.

### Revision questions

​1. Why does ECB leak? 2. What should go in AAD? 3. Describe envelope encryption.

### Further reading

NIST SP 800-38D [R1]; NIST SP 800-57 [R3].

## References

- [R1] NIST. SP 800-38D, "Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC", November 2007. URL: [https://csrc.nist.gov/pubs/sp/800/38/d/final](https://csrc.nist.gov/pubs/sp/800/38/d/final) Accessed: 2026-11-07. Supports: GCM specification (NIST plans a revision, per 2024 note).
- [R2] Marczak, B., Scott-Railton, J. "Move Fast and Roll Your Own Crypto: A Quick Look at the Confidentiality of Zoom Meetings", Citizen Lab, 3 April 2020. URL: [https://citizenlab.ca/2020/04/move-fast-roll-your-own-crypto-a-quick-look-at-the-confidentiality-of-zoom-meetings/](https://citizenlab.ca/2020/04/move-fast-roll-your-own-crypto-a-quick-look-at-the-confidentiality-of-zoom-meetings/) Accessed: 2026-11-07. Supports: AES-128 ECB, key distribution findings.
- [R3] NIST. SP 800-57 Part 1 Rev. 5, "Recommendation for Key Management: Part 1 - General", May 2020. URL: [https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) Accessed: 2026-11-07. Supports: key-management lifecycle and cryptoperiods.
- [R4] pyca/cryptography. "Authenticated encryption" documentation. URL: [https://cryptography.io/en/latest/hazmat/primitives/aead/](https://cryptography.io/en/latest/hazmat/primitives/aead/) Accessed: 2026-11-07. Supports: AESGCM and ChaCha20Poly1305 APIs.
- [R5] Lab evidence. m02_symmetric.py and m02_output.txt (CPython 3.14.4, cryptography 48.0.0), 2026-11-07.
