## Revision

### Summary

Authentication answers "who are you?" and sessions carry that answer across requests; weaknesses in either grant account takeover (OWASP A07:2025 Authentication Failures). Authentication design flaws include weak/default passwords, unlimited attempts (brute force, credential stuffing), user enumeration, plain-HTTP credentials, and login built on injectable queries. Passwords must be stored as slow, salted, purpose-built hashes (Argon2id, bcrypt or scrypt), never plain or fast-hashed, and verified by hashing the input - never decrypted. Session weaknesses: predictable tokens (the lab's base64(username) is reversible and forgeable), unprotected cookies (missing HttpOnly/Secure/SameSite), no rotation (session fixation), and no expiry. Secure sessions use cryptographically random server-side tokens with protective cookie attributes, rotation at login, and timeouts - as the hardened lab app demonstrates (findings.py: weak-session PRESENT on 8200, absent on 8201). MFA greatly reduces takeover but has weaknesses (SMS SIM-swap, TOTP real-time phishing, MFA fatigue); phishing-resistant WebAuthn/FIDO2 is strongest. Account recovery is authentication's back door: use high-entropy, single-use, short-lived reset tokens, verify contact control, rotate sessions and notify.

### Important concepts

authentication flaws; password hashing; session weaknesses and secure design; MFA types and weaknesses; safe recovery.

### Key technical takeaways

random server-side session ids with HttpOnly/Secure/SameSite; Argon2id password hashing; rate-limit and screen breached passwords; prefer phishing-resistant MFA; strong single-use reset tokens.

### Glossary

```text
session fixation  forcing a victim to use a token the attacker knows.
credential stuffing  reusing breached username/password pairs at scale.
TOTP  time-based one-time password from an authenticator app.
WebAuthn/FIDO2  phishing-resistant, origin-bound hardware/platform
        authentication.
salt  per-user random value mixed into a password hash.
```

### Common mistakes

predictable/reversible tokens; missing cookie attributes; plain or fast-hashed passwords; SMS-only MFA; guessable or long-lived reset tokens; not invalidating sessions on reset.

### Revision questions

​1. Why is base64(username) a bad session token? 2. Name the correct password-hashing algorithms and why fast hashes are wrong. 3. What makes WebAuthn phishing-resistant?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "A07:2025 - Authentication Failures" (OWASP Top 10:2025). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: authentication and session failure category and examples.
- [R2] OWASP. "Password Storage Cheat Sheet" (Argon2id/bcrypt/scrypt, salting, work factors). URL: [https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: credential storage, hashing, CS1 breached- password screening.
- [R3] NIST. "SP 800-63B: Digital Identity Guidelines - Authentication and Lifecycle Management" (MFA, phishing resistance, breached-password screening). URL: [https://pages.nist.gov/800-63-3/sp800-63b.html](https://pages.nist.gov/800-63-3/sp800-63b.html) Accessed: 2026-11-08. Supports: MFA types/weaknesses, recovery, CS1.
- [R4] OWASP. "Session Management Cheat Sheet" (token generation, cookie attributes, rotation, timeout). URL: [https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: secure session design.
- [R5] Lab evidence. findings.py weak-session results on ports 8200 and 8201 (CPython 3.14.4), LAB_ASSETS/C06/data/findings_output.txt and findings_fixed_output.txt, 2026-11-08. Supports: the deep-dive proof and fix.
