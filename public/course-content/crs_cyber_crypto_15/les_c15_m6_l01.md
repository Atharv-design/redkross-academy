**TLS provides:**

- server authentication, and optionally client authentication;
- confidentiality and integrity of application data;
- forward secrecy through ephemeral key exchange.

**Versions:**

```text
SSL 2.0/3.0, TLS 1.0/1.1  obsolete and insecure. TLS 1.0 and 1.1 were
           formally deprecated by RFC 8996 (2021), and RFC 9846 forbids
           them.
TLS 1.2    still widely used and acceptable with modern AEAD cipher
           suites and ECDHE key exchange.
TLS 1.3    the current version. Originally RFC 8446 (August 2018), now
           specified by RFC 9846, which obsoletes RFC 8446 while keeping
           the version number and backward compatibility. RFC 9846
           tightens requirements, clarifies text and forbids TLS 1.0/1.1
           and KeyShare reuse [R1].
```

NIST SP 800-52 Rev. 2 (August 2019) requires US government TLS servers and clients to support TLS 1.2 with FIPS-based cipher suites and to support TLS 1.3 by 1 January 2024. NIST noted in May 2026 that the publication is under review [R2].
