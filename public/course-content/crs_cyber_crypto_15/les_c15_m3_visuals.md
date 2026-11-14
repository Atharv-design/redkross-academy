## Three uses of key pairs

![Three rows showing encryption with a recipient's public key, signing with a private key and verifying with the public key, and key agreement producing the same shared secret on both sides.](/assets/courses/cyber-15/C15-M03-F1.svg)
*Figure C15-M03-F1. Encryption, signatures and key agreement use key pairs differently.*

## Key sizes for about 128-bit security

![A bar chart comparing 422 bytes for RSA-3072, 91 bytes for P-256 and 44 bytes for Ed25519 public keys.](/assets/courses/cyber-15/C15-M03-F2.svg)
*Figure C15-M03-F2. Encoded public-key sizes from the execution-tested lab.*

## Authenticated ephemeral key exchange

![A client and server exchange ephemeral public keys, the server signs its share with its certificate key, the client verifies, and both derive session keys and discard ephemeral keys.](/assets/courses/cyber-15/C15-M03-F3.svg)
*Figure C15-M03-F3. Ephemeral exchange gives forward secrecy; the server's signature prevents substitution.*
