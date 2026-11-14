## Revision

### Summary

TLS provides authenticated, confidential channels with forward secrecy. TLS 1.0 and 1.1 are retired, and TLS 1.3 is now specified by RFC 9846 (obsoleting RFC 8446), which forbids TLS 1.0/1.1 and KeyShare reuse. The 1-RTT TLS 1.3 handshake exchanges key shares, derives keys with HKDF, encrypts the server's certificate flight, proves key possession with CertificateVerify and confirms with Finished. Only AEAD suites remain, and 0-RTT can be replayed. Configure TLS 1.3 plus 1.2 with ECDHE-AEAD, full chains and HSTS. Clients must verify, as create_default_context does. In the lab, the trusted client negotiated TLS 1.3 with AES-256-GCM; wrong names and unknown CAs were rejected, a TLS 1.1 client found no ciphers, and a 1.2 client was refused by a 1.3-only server. mTLS gives service identity. SC-081v3 reduces public certificate lifetimes to 47 days by 2029, so automate the lifecycle.

### Important concepts

forward secrecy; verification on by default; lifecycle automation.

### Key technical takeaways

ssl contexts; s_client -servername -CAfile; error classes.

### Glossary

| Term | Meaning |
|---|---|
| 0-RTT | Early data sent on resumption; replayable. |
| ACME | Automated certificate issuance protocol. |
| HSTS | HTTP Strict Transport Security. |
| mTLS | Mutual TLS with client certificates. |
| SNI | Server Name Indication. |
| Cipher suite | In TLS 1.3, the AEAD and hash pair. |

### Common mistakes

legacy versions enabled; manual renewals; disabled client verification.

### Revision questions

​1. Walk through the TLS 1.3 handshake. 2. What does RFC 9846 change? 3. Interpret four TLS errors.

### Further reading

RFC 9846 [R1]; NIST SP 800-52 Rev. 2 [R2].

## References

- [R1] Rescorla, E. RFC 9846, "The Transport Layer Security (TLS) Protocol Version 1.3" (obsoletes RFC 8446). URL: [https://www.rfc-editor.org/rfc/rfc9846](https://www.rfc-editor.org/rfc/rfc9846) Accessed: 2026-11-07. Supports: current TLS 1.3 specification; forbids TLS 1.0/1.1; RFC 8446 status.
- [R2] NIST. SP 800-52 Rev. 2, "Guidelines for the Selection, Configuration, and Use of TLS Implementations", August 2019. URL: [https://csrc.nist.gov/pubs/sp/800/52/r2/final](https://csrc.nist.gov/pubs/sp/800/52/r2/final) Accessed: 2026-11-07. Supports: TLS 1.2 requirement; TLS 1.3 by 1 January 2024; under review.
- [R3] CA/Browser Forum. "Ballot SC081v3: Introduce Schedule of Reducing Validity and Data Reuse Periods", 11 April 2025. URL: [https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/) Accessed: 2026-11-07. Supports: result, 398 to 47 days, March 2026-2029.
- [R4] Rescorla, E. RFC 8446, "The Transport Layer Security (TLS) Protocol Version 1.3", August 2018. URL: [https://www.rfc-editor.org/rfc/rfc8446](https://www.rfc-editor.org/rfc/rfc8446) Accessed: 2026-11-07. Supports: removal of static RSA/DH; historical reference (now obsolete).
- [R5] Lab evidence. m06_tls.py and m06_output.txt (CPython 3.14.4, OpenSSL 3.0.19), 2026-11-07.
