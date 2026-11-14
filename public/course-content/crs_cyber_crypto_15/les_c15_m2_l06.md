Encrypting large data directly with a KMS key is slow and limited, so systems use envelope encryption:

1. Generate a random data encryption key (DEK) locally, or ask the KMS for one.
2. Encrypt the data with the DEK using AES-GCM.
3. Wrap (encrypt) the DEK with a key encryption key (KEK) held in the KMS or HSM.
4. Store the wrapped DEK beside the ciphertext, and discard the plaintext DEK.
5. To decrypt, ask the KMS to unwrap the DEK. That request is authorised and logged, which gives central access control and audit.

Execution-tested key wrapping (RFC 3394 AES key wrap, standing in for a

**KMS call):**

```text
data key 32 bytes wrapped -> 40 bytes (RFC 3394)
unwrap matches: True
```

(execution-tested; in production the KEK never leaves the KMS, and cloud SDKs perform the wrap and unwrap remotely, as in AWS KMS GenerateDataKey or Azure Key Vault wrapKey; Course 11)

**Benefits:** rotating the KEK requires re-wrapping only small DEKs, not re-encrypting the data. Each object can have its own DEK. Access to data is controlled by access to the KEK.
