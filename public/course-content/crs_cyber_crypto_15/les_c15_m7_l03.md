| Term | Meaning |
|---|---|
| Primitive choice | ECB mode (Module 2); unauthenticated CBC or CTR; MD5/SHA-1 for security; RSA without OAEP/PSS; DES, 3DES, RC4. |
| Keys | keys in source code or images; one key for many purposes; keys derived as SHA-256(password) (L03 lab below); predictable key generation (Module 1); no rotation or versioning. |
| Nonces/IVs | fixed, zero, timestamp-only or counter-reset nonces; random nonces beyond their safe volume. |
| Integrity | not checking tags, or catching InvalidTag and continuing; MAC-then-encrypt constructions; MAC comparison with ==. |
| Passwords | fast or unsalted hashes (Module 4). |
| Protocol/TLS | verify=False; accepting any hostname; custom handshakes; old versions enabled (Module 6). |
| Randomness | random instead of secrets (Module 1). |
| Home-made schemes | "encryption" by XOR with a key; Base64 described as encryption; private algorithms. |

**Execution-tested key-derivation example:**

```text
------------------------------------------------------------- BEGIN OUTPUT
== 3. password -> key
  sha256(pw) identical across users/systems: True
  scrypt with a different salt differs: True
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

SHA-256(password) produces the same "key" for anyone with that password and can be guessed at millions of attempts per second (Module 4). scrypt with a random salt produces distinct, slow-to-guess keys.
