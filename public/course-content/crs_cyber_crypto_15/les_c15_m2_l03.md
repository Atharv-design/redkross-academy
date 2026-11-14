A stream cipher generates a keystream from a key and nonce, then XORs it with the plaintext. ChaCha20 (RFC 8439, with Poly1305) is the main modern design. It is fast in software, which suits devices without AES hardware, and is used in TLS and in WireGuard. Rules for stream ciphers and CTR mode:

- never reuse a (key, nonce) pair, because XOR of two ciphertexts then equals XOR of the two plaintexts (demonstrated in Module 7);
- always add integrity, because flipping a ciphertext bit flips the same plaintext bit. Use the AEAD constructions, not raw stream ciphers.
