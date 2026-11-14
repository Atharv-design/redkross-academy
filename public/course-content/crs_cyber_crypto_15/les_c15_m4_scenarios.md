Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A download page lists an MD5 checksum on the same HTTP page as the file.

**Task:** Improve integrity.

> [!TIP] Model answer
> Serve the file and the checksum over HTTPS. Use SHA-256. Better still, sign releases (Course 12 Module 7) and publish signature verification instructions, and host checksums or signatures separately from the file.
>
> **Lesson:** integrity needs a trusted channel or a signature.

## Scenario 2

Login takes 3 seconds after you raise the password-hashing cost.

**Task:** Balance security and usability.

> [!TIP] Model answer
> Measure on production hardware. Choose parameters within the latency budget (for example Argon2id m=19456, t=2), scale verification servers, and rate-limit logins. Do not drop below OWASP minimums. Use MFA to reduce reliance on password strength.
>
> **Lesson:** tune slow hashes, do not abandon them.

## Scenario 3

A partner signs webhooks as SHA256(secret + body).

**Task:** Advise.

> [!TIP] Model answer
> Explain the length-extension weakness and propose HMAC-SHA256 with a timestamp, nonce and constant-time verification. Run both schemes during a migration window with key IDs, then disable the old scheme.
>
> **Lesson:** use HMAC, not homemade keyed hashes.
