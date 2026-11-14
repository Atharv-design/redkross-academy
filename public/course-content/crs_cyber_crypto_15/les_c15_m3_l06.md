A sufficiently large quantum computer running Shor's algorithm would break RSA and elliptic-curve cryptography. NIST's first post-quantum standards, approved on 13 August 2024, are [R1]:

| Term | Meaning |
|---|---|
| FIPS 203 | ML-KEM (from CRYSTALS-Kyber), key encapsulation. |
| FIPS 204 | ML-DSA (from CRYSTALS-Dilithium), signatures. |
| FIPS 205 | SLH-DSA (from SPHINCS+), stateless hash-based signatures. |

**Migration guidance:**

- Inventory where public-key cryptography is used (TLS, VPN, SSH, code signing, document signing, PKI, embedded devices). Record lifetimes.
- Prioritise key establishment for data with long confidentiality needs, because recorded traffic could be decrypted later. Hybrid key exchange (classical X25519 plus ML-KEM) is being deployed in TLS implementations.
- Expect larger keys and signatures, which affect certificates, packets and storage.
- Prefer libraries and protocols that support algorithm negotiation (agility), and track vendor roadmaps.

The lab did not execute post-quantum algorithms, because they are not part of the cryptography 48.0.0 API used here. The statements above are from standards documentation (Not execution-tested).
