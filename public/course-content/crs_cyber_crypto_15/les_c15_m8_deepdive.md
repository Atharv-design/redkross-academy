Possible extensions and the design rules each needs:

```text
Chunked streaming (large files)
  Split into fixed-size chunks. Derive a per-file key, and give each
  chunk the nonce prefix || chunk_counter with AAD = header || counter ||
  is_final. This prevents reordering, truncation and chunk duplication.
  Libraries offer vetted streaming constructions (for example
  libsodium's secretstream), so prefer those.
Public-key recipients
  Use an X25519 ephemeral exchange and HKDF to derive the file key
  (Module 3 deep dive), or wrap the file key with each recipient's key.
  Store recipients in the header (authenticated).
Argon2id KDF
  Add kdf=0x02 with m, t and p fields. Old files remain decryptable
  through the version and KDF ID (agility).
Signatures
  Sign the header and ciphertext with Ed25519 for sender authentication.
  Verify before decrypting.
Each extension needs:
  - a format version change;
  - tests for the new failure modes;
  - documentation updates;
  - known-answer test vectors.
```
