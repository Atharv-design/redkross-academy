Elliptic-curve cryptography (ECC) gives equivalent security with much smaller keys and faster operations. Common choices:

```text
Ed25519     EdDSA signatures over Curve25519. Deterministic nonces, so
            no randomness is needed at signing time (avoids the Module 7
            nonce-reuse failure). 32-byte public keys, 64-byte signatures.
            Approved in FIPS 186-5 (EdDSA).
ECDSA P-256 NIST curve signatures, widely supported in certificates and
            HSMs. It needs a unique secret nonce per signature unless a
            deterministic variant (RFC 6979) is used.
X25519      Diffie-Hellman key agreement over Curve25519. The default in
            TLS 1.3 implementations and in many protocols.
P-256/P-384 ECDH  NIST-curve key agreement.
```

**Execution-tested:**

```text
------------------------------------------------------------- BEGIN OUTPUT
== 2. signatures
  Ed25519 signature 64 bytes: verify ok
  Ed25519 tampered message -> InvalidSignature
  ECDSA P-256 signature 72 bytes (DER, varies): verify ok
== 4. public key sizes (DER SubjectPublicKeyInfo)
  RSA-3072: 422 bytes  P-256: 91 bytes  Ed25519: 44 bytes
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

**Observations:** changing "1.0.0" to "1.0.1" in the signed message caused InvalidSignature. ECDSA signatures are DER-encoded, so their length varies slightly (72 bytes in this run). Public keys in standard encoding were 422 bytes for RSA-3072, 91 bytes for P-256 and 44 bytes for Ed25519. That difference matters in certificates, constrained devices and QR codes.
