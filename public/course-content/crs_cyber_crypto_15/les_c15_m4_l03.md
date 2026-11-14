A hash detects accidental changes, but an attacker who can change the data can also change an unprotected hash next to it. Integrity against attackers requires one of:

- a hash delivered through a trusted, separate channel (a checksum published on an HTTPS site and verified before use, as in the Codecov case in Course 12, or a hash recorded in a chain-of-custody form in Course 09);
- a MAC with a secret key (L04);
- a digital signature over the hash (Module 5);
- an AEAD tag for encrypted data (Module 2).

Avoid the length-extension pitfall. With SHA-256 and other Merkle-Damgard hashes, H(secret || message) is not a secure MAC: an attacker who knows the hash and message length can compute a valid hash for message || padding || extra without the secret. Use HMAC instead. SHA-3 and BLAKE2 keyed modes do not have this weakness.
