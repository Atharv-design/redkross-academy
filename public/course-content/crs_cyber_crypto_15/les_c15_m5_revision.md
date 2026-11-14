## Revision

### Summary

Signatures prove integrity and origin (and non-repudiation with sound custody), not identity, time or safety; FIPS 186-5 is the current standard. X.509 certificates bind keys to names using SAN, basicConstraints, key usage and EKU, under a signed validity period. PKIs run from offline roots through issuing intermediates to leaves, and servers send leaf plus intermediates. Validation builds the path and checks signatures, validity, constraints, the name and revocation. The lab produced errors 20 (missing intermediate), 62 (hostname), 10 (expired) and 20 at depth 1 (untrusted root). Revocation (CRL, OCSP, stapling) is imperfect, so lifetimes are shrinking. CT logs and CAA records expose and restrict issuance. Private PKIs need HSM-protected keys, automation, profiles, inventory and compromise plans. DigiNotar (2011) showed the impact of a compromised CA.

### Important concepts

trust anchors; full chains; never disable verification.

### Key technical takeaways

openssl req/x509/verify; -untrusted vs -CAfile; -verify_hostname, -attime.

### Glossary

| Term | Meaning |
|---|---|
| CAA | DNS record restricting which CAs may issue. |
| CRL/OCSP | Revocation list / online status protocol. |
| CSR | Certificate signing request. |
| CT | Certificate Transparency. |
| EKU | Extended key usage. |
| SAN | Subject alternative name. |
| Trust store | Set of trusted root certificates. |

### Common mistakes

missing intermediates; verify=False; shared wildcard keys.

### Revision questions

​1. List seven validation checks. 2. Explain depth in OpenSSL errors. 3. Why keep roots offline?

### Further reading

FIPS 186-5 [R1]; RFC 5280 [R3].

## References

- [R1] NIST. FIPS 186-5, "Digital Signature Standard (DSS)", 3 February 2023. URL: [https://csrc.nist.gov/pubs/fips/186-5/final](https://csrc.nist.gov/pubs/fips/186-5/final) Accessed: 2026-11-07. Supports: current signature standard.
- [R2] The Register. "DigiNotar audit: damning fail", 6 September 2011 (with Fox-IT interim findings as reported). URL: [https://www.theregister.com/2011/09/06/diginotar_audit_damning_fail/](https://www.theregister.com/2011/09/06/diginotar_audit_damning_fail/) Accessed: 2026-11-07 (web-search cross-check). Supports: rogue certificates, Iran traffic, audit findings.
- [R3] Cooper, D. et al. RFC 5280, "Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile", May 2008. URL: [https://www.rfc-editor.org/rfc/rfc5280](https://www.rfc-editor.org/rfc/rfc5280) Accessed: 2026-11-07. Supports: certificate fields, extensions, path validation.
- [R4] Laurie, B. et al. RFC 9162, "Certificate Transparency Version 2.0", December 2021. URL: [https://www.rfc-editor.org/rfc/rfc9162](https://www.rfc-editor.org/rfc/rfc9162) Accessed: 2026-11-07. Supports: CT concepts.
- [R5] Lab evidence. m05_pki_lab.sh and m05_output.txt (OpenSSL 3.5.7), 2026-11-07.
