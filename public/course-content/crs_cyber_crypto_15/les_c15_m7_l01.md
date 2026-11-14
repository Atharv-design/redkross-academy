A nonce ("number used once") or IV (initialisation vector) makes each encryption under the same key different. Requirements differ by mode:

| Term | Meaning |
|---|---|
| CTR, GCM, ChaCha20-Poly1305 | unique per (key, nonce) pair. It need not be secret or random, but must never repeat. |
| CBC | unpredictable (random) IV per message. |
| ECDSA / DSA signing nonce k | secret, unique and unbiased for every signature, or derived deterministically (RFC 6979; Ed25519 does this by design). |

**Strategies for AEADs:**

```text
Random 96-bit nonces  simple, with collision risk growing with message
                 count. NIST SP 800-38D limits the total invocations of
                 GCM with randomly generated IVs to 2^32 per key (stated
                 from the publication's requirements; NIST has announced
                 a revision of SP 800-38D) [R1]. Rotate keys well
                 before that.
Counter nonces   a strictly increasing counter per key. No collision
                 risk, but the state must never reset or be duplicated
                 (backups, VM clones, multiple writers).
Extended nonces  XChaCha20-Poly1305 (192-bit nonce) makes random nonces
                 safe at very high volume.
Misuse-resistant AES-GCM-SIV limits the damage if a nonce repeats: it
                 leaks only whether identical messages were encrypted.
```
