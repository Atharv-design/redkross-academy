Signing computes a value from the message, or its hash, with the private key. Verifying checks that value with the public key. A valid signature shows:

- integrity: the signed bytes are unchanged;
- origin: someone with the private key signed;
- non-repudiation: if key custody is sound (Module 1).

It does not show that the signer is who you think, which needs a trusted binding such as a certificate. It also does not show when signing happened (trusted timestamps), or that the content is safe.

**Algorithms:** Ed25519, ECDSA and RSA-PSS. FIPS 186-5 (3 February 2023) is NIST's Digital Signature Standard [R1]. Module 3's lab showed an Ed25519 signature failing after a one-character change to the message. Post-quantum signature standards (ML-DSA, SLH-DSA) are described in Module 3.
