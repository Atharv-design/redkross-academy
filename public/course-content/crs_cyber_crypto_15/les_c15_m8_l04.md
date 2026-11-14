Test categories and the rkcrypt tests that cover them (execution-tested):

```text
------------------------------------------------------------- BEGIN OUTPUT
test_cli_encrypt_decrypt_and_exit_codes ... ok
test_kdf_parameters_bounded ... ok
test_modified_header_salt_detected ... ok
test_not_rkcrypt ... ok
test_truncated ... ok
test_wrong_passphrase ... ok
test_empty_file ... ok
test_roundtrip_default_params ... ok
test_roundtrip_fast_params ... ok
test_same_input_different_output ... ok
(and test_flipped_ciphertext_bit)
Ran 11 tests in 2.583s
OK
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4, cryptography 48.0.0)
```

| Term | Meaning |
|---|---|
| Correctness | round trips with default and fast parameters, and an empty file. |
| Freshness | same input encrypted twice gives different output and different salts (the nonce-uniqueness design, Module 7). |
| Integrity | a flipped ciphertext bit and a flipped salt byte in the header both fail authentication. |
| Authentication | a wrong passphrase fails with the same message. |
| Robustness | truncated input, wrong magic and out-of-range KDF parameters (log2n=30) are rejected before expensive work. |
| Interface | the CLI round trip and exit codes 0, 1 and 2, with the SHA-256 of output equal to input. |

**Speed:** most tests use log2n=14 to keep the suite at about 2.6 seconds. One test checks the default of 17. Do not lower production defaults to make tests faster; parametrise instead.

**Additional tests worth adding:** known-answer tests against a stored test vector file, so the format stays decryptable across versions, and fuzzing of the header parser.
