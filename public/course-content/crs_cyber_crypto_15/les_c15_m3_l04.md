Diffie-Hellman key agreement lets two parties, each with an ephemeral key pair, compute the same shared secret, while an eavesdropper who sees only the public keys cannot. Then:

1. Never use the raw shared secret directly as a key. Pass it through a key derivation function, HKDF (RFC 5869), with an "info" label that binds the purpose and context (protocol name, version, roles).
2. Authenticate the exchange. Unauthenticated DH is open to man-in-the-middle substitution, so in TLS the server signs the handshake with its certificate key (Module 6).
3. Use ephemeral keys for forward secrecy. The private keys are discarded after the session.

**Execution-tested:**

```text
------------------------------------------------------------- BEGIN OUTPUT
== 3. X25519 + HKDF
  shared secrets equal: True  derived keys equal: True
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

Both sides computed the same 32-byte shared secret and derived the same session key with info=b"tamarind session v1". A different info label gives a different key, which separates keys for different purposes from one exchange.
