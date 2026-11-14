```text
Passwords  store only a slow, salted, memory-hard hash: scrypt, Argon2id
           or bcrypt. Never store a fast hash (MD5, SHA-256) or
           reversible encryption. The reference service uses
           hashlib.scrypt with n=2**14, r=8, p=1, a 16-byte random salt
           per password, and hmac.compare_digest for constant-time
           comparison. Tune cost parameters to your hardware and review
           them periodically. Follow NIST SP 800-63B-4 password rules
           (Course 01: minimum length, no composition rules, no
           periodic forced changes, breached-password screening).
MFA        offer or require it, preferring phishing-resistant methods
           (FIDO2/passkeys) for privileged users.
Sessions   generate session identifiers with a cryptographic random
           source (secrets.token_urlsafe). Set cookies Secure, HttpOnly
           and SameSite. Rotate the session on login. Expire idle and
           absolute sessions. Invalidate on logout and password change.
Throttling rate-limit login attempts per account and per source. Give
           generic error messages ("invalid credentials").
Delegated  prefer a vetted identity provider (OIDC/SAML) over custom
           authentication code where possible.
```

**Execution-tested:** verify_password accepted the correct passphrase and rejected one differing only in the first letter's case. Two hashes of the same password differed because of their random salts.
