With CTR or any stream cipher, the keystream depends only on (key, nonce). Reusing them means C1 XOR C2 = P1 XOR P2: the key cancels out. Execution-tested (LAB_ASSETS/C15/m07_misuse.py, demonstration only):

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. nonce reuse (AES-CTR)
  C1 xor C2 == P1 xor P2: True
  knowing P1 recovers P2: Staff bonus pool INR 9,99,000 Q4!
  with a fresh nonce, relation holds: False
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; fictional messages)
```

An observer who knows or guesses one message (here the payment instruction) recovers the other (the bonus figure) without ever learning the key. With a fresh nonce, the relationship disappears. For AES-GCM, nonce reuse is worse still. Besides the XOR leak, it lets an attacker recover the authentication key and forge messages. For ECDSA, reusing the signing nonce reveals the private key (case study). Nonce handling is therefore a design review item, not an implementation detail.
