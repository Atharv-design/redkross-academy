A durable encrypted format must let you decrypt years later, rotate keys and detect tampering. Fields for an encrypted database field or file:

```text
version     1 byte. Allows algorithm changes (crypto agility).
key_id      which KEK version wrapped the DEK, or which data key was used.
nonce       12 bytes, unique per encryption.
wrapped_dek optional per-record DEK (envelope).
ciphertext||tag
```

AAD = version || key_id || record identifier || purpose label.

**Decryption steps:** parse; reject unknown versions; look up the key by key_id; decrypt with AAD; on InvalidTag, stop and log an integrity alert. Never return partial plaintext. The Module 8 capstone implements this pattern for files: a 36-byte header holding magic, KDF parameters, salt and nonce is used as AAD, so any change to the header causes authentication failure (execution-tested in the capstone tests). Common errors to check in review:

- fixed or derived nonces that repeat;
- AAD omitted, so ciphertexts can be swapped between records;
- the tag not checked, or catching InvalidTag and continuing;
- keys in code;
- one key for everything;
- no version field.
