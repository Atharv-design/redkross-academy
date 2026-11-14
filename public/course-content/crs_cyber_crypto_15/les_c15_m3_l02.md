RSA's security rests on the difficulty of factoring a large modulus that is the product of two secret primes. Practical points:

- Padding is essential. Use OAEP for encryption and PSS for signatures. Raw ("textbook") RSA and old PKCS#1 v1.5 encryption padding have long histories of attacks.
- Size limits. RSA can encrypt only a little data. With OAEP-SHA256, the maximum plaintext is k - `2*hLen` - 2 bytes, where k is the modulus length in bytes and hLen is the hash output length in bytes.
- Performance. Key generation and private-key operations are slow compared with elliptic curves, and keys are large.

Execution-tested (LAB_ASSETS/C15/m03_public_key.py, cryptography 48.0.0):

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. RSA-3072 OAEP
  ciphertext 384 bytes; decrypt ok: True
  max OAEP-SHA256 plaintext for RSA-3072: 318 bytes
  too long -> ValueError
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

A 3072-bit modulus is 384 bytes, so the ciphertext is always 384 bytes, and 384 - 64 - 2 = 318 bytes of plaintext at most. One byte more raised ValueError. That is why RSA transports a 32-byte AES key, and the AES key encrypts the data.
