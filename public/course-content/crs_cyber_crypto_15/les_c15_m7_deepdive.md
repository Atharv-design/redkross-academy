Approaches for a service encrypting many records under KMS-managed keys:

1. Per-record data keys (envelope encryption, Module 2). Each record has its own DEK, so a random nonce under that DEK is used only once and reuse becomes practically impossible.
2. Key rotation by volume. Track encryptions per key and rotate before a conservative limit (for example 2^31 with random GCM nonces). Embed key IDs in records.
3. Counter nonces with a single writer per key. Persist the counter transactionally and never restore it from backup. Use a different key per writer (per instance or partition).
4. Misuse-resistant modes (AES-GCM-SIV) where the operational environment makes uniqueness hard to guarantee, accepting their costs.
5. Tests and monitoring. Unit tests that two encryptions of the same data differ in nonce and ciphertext (as in the capstone's test_same_input_different_output), and optional detection of duplicate nonces in stored data.

The capstone (Module 8) uses a fresh random salt per file, giving a fresh key per file via scrypt, and a fresh random nonce. Uniqueness is therefore assured by construction, and a unit test checks it (execution-tested).
