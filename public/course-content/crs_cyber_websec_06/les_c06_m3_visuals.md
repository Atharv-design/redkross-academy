## Weak versus strong session token

![A comparison of the lab's weak session token (base64 of the username, no cookie attributes) against the hardened random token with protective cookie attributes.](/assets/courses/cyber-06/C06-M03-F1.svg)
*Figure C06-M03-F1. The weak token encodes identity and is forgeable; the strong token is random, server-side and protected [R1].*

## Password storage done right

![A progression from wrong storage (plain text, fast hash) to correct storage (Argon2id/bcrypt/scrypt with salt and work factor) and how verification works.](/assets/courses/cyber-06/C06-M03-F2.svg)
*Figure C06-M03-F2. Passwords are stored as slow, salted, purpose-built hashes, never plain or fast-hashed [R2].*

## MFA strength ladder

![A ladder of MFA options from password-only up to phishing-resistant hardware security keys, noting the weakness of each intermediate factor.](/assets/courses/cyber-06/C06-M03-F3.svg)
*Figure C06-M03-F3. MFA factors from weakest to phishing-resistant; prefer WebAuthn/FIDO2 for sensitive accounts [R3].*
