AEAD algorithms encrypt and authenticate in one operation and also authenticate associated data (AAD) that stays unencrypted: headers, record IDs, versions. Decryption either returns the exact plaintext or fails. It never returns modified data. The two you will use:

| Term | Meaning |
|---|---|
| AES-GCM | 96-bit nonce recommended, 128-bit tag. Very fast with hardware AES. Specified in NIST SP 800-38D [R1]. |
| ChaCha20-Poly1305 | 96-bit nonce, 128-bit tag. Fast everywhere (RFC 8439). |

Execution-tested (cryptography 48.0.0):

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. AES-256-GCM
  plaintext 52 bytes -> ciphertext+tag 68 bytes (16-byte tag)
  decrypt ok: True
  1 flipped bit -> InvalidTag (tampering detected)
== 2. associated data must match
  wrong AAD -> InvalidTag
== 3. ChaCha20-Poly1305
  roundtrip ok: True
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

**Reading it:**

- Ciphertext is the plaintext length plus a 16-byte tag. GCM needs no padding.
- Flipping one bit anywhere caused InvalidTag. Applications must treat this as an error and never fall back to "best effort" decryption.
- The AAD "tenant=tamarind;record=TL-00000001" binds the ciphertext to its context. Moving the ciphertext to another tenant's record makes decryption fail, which prevents cut-and-paste attacks between records. Put identifiers, versions and purpose in the AAD.
- Nonces: use 12 random bytes per message (os.urandom(12)) or a strict counter, and never repeat one under the same key. Module 7 covers message limits per key.

Newer options such as AES-GCM-SIV (resistant to nonce misuse) and XChaCha20 with a 192-bit nonce, safe with random nonces at very high volumes, exist for special cases.
