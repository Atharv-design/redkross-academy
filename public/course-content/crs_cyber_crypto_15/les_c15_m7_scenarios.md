Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer wants to use the record ID as the GCM nonce "because it is unique".

**Task:** Evaluate.

> [!TIP] Model answer
> It is unique only if each record is encrypted once under that key. Updates re-encrypt the same record with the same nonce, which is reuse. Use random nonces stored with the ciphertext, or per-record keys, and include the record ID in the AAD instead.
>
> **Lesson:** uniqueness must hold for every encryption, not every record.

## Scenario 2

A vendor library implements its own "fast secure cipher".

**Task:** Advise procurement.

> [!TIP] Model answer
> Reject it, or require replacement with standard AEAD (AES-GCM or ChaCha20-Poly1305) in a maintained library. Ask for independent audits, FIPS validation if needed, and a vulnerability-response process. Write standard algorithms into the contract.
>
> **Lesson:** no home-made cryptography.

## Scenario 3

Your API returns "bad padding" and "bad MAC" as different errors.

**Task:** Fix.

> [!TIP] Model answer
> Return one generic error for any decryption failure. Use an AEAD so padding does not exist, verify before processing, and rate-limit and log failures. Review for timing differences.
>
> **Lesson:** uniform failures prevent oracles.
