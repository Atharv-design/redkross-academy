| Term | Meaning |
|---|---|
| Encryption / KEM | anyone with the public key can encrypt (or encapsulate a key). Only the private key holder can decrypt. In practice it is used to transport a symmetric key, not bulk data (hybrid encryption). |
| Signatures | the private key signs, and anyone can verify with the public key (Module 5). |
| Key agreement | two parties combine their private key with the other's public key to reach the same shared secret (L04). |

**Rules:**

- Use separate keys for separate purposes. A signing key should not also decrypt.
- Trust in a public key must come from somewhere: a certificate from a CA (Module 5), a pinned fingerprint, or an out-of-band check. Without that, an attacker can substitute their own key ("man in the middle").
