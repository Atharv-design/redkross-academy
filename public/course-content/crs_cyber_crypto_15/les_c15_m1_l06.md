Rely on standards and widely reviewed specifications:

- NIST FIPS and SP 800 publications (AES in FIPS 197, signatures in FIPS 186-5, approved on 3 February 2023, and SP 800-38D for GCM);
- IETF RFCs (TLS 1.3 is now specified by RFC 9846, which obsoletes RFC 8446; Module 6);
- national guidance, including India's CERT-In advisories and sector regulators for regulated entities.

Crypto agility means designing so algorithms and key sizes can be changed without redesign: version fields in formats (the capstone's header), and negotiable but restricted protocol parameters.

**Post-quantum cryptography:** on 13 August 2024 NIST approved FIPS 203 (ML-KEM, key encapsulation), FIPS 204 (ML-DSA, signatures) and FIPS 205 (SLH-DSA, hash-based signatures), designed to resist attacks by future quantum computers [R3]. Large quantum computers would break RSA and elliptic-curve cryptography, while symmetric algorithms and hashes need only larger parameters. Organisations should inventory where public-key cryptography is used, prioritise long-lived secrets, and adopt hybrid or post-quantum options as libraries and protocols support them (Module 3).
