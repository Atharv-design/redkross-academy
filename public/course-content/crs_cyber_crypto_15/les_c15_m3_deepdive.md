Encrypting a file for a recipient whose public key you hold (the pattern behind tools such as age and the modern parts of OpenPGP):

1. Generate an ephemeral X25519 key pair.
2. Compute shared = ephemeral_private.exchange(recipient_public).
3. key = HKDF(shared, info = "file v1" || ephemeral_public || recipient_public). Including both public keys binds the derived key to this exchange.
4. Encrypt the file with AES-256-GCM (or ChaCha20-Poly1305) under key, using a random nonce and the header as AAD.
5. Output: version || ephemeral_public || nonce || ciphertext+tag.
6. The recipient repeats steps 2-3 with their private key and the ephemeral public key, then decrypts.

**Properties:** only the recipient can decrypt. Each file uses a fresh key. Tampering is detected. The sender's identity is not proven; add a signature if origin matters. Every primitive in this pattern was execution-tested in the module lab. The assembled file format is a design exercise in Practical P2.
