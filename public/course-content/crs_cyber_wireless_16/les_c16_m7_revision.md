## Revision

### Summary

A mobile system is an app plus a backend API, and the API is the real security boundary because the app is an UNTRUSTED PUBLIC CLIENT that an attacker can bypass and whose values can be forged. API AUTHENTICATION must use validated, short-lived, revocable tokens (e.g. OAuth with PKCE / JWT), verified server-side, stored in the app's protected storage, with no confidential secret in the app and no trust in client-supplied identity. TRANSPORT SECURITY means TLS everywhere (no cleartext), strong TLS and valid certificates, optionally with pinning - the same hostile-network assumption as Wi-Fi and app networking, applied to the API. BACKEND HARDENING enforces per-request, per-object AUTHORISATION (preventing broken object-level authorisation, the top API risk), rate limiting (resisting brute force and abuse), server-side input validation, generic error handling, minimal data exposure, and logging. The OWASP API Security Top 10 catalogues these risks, and in the mobile context every one must be enforced SERVER-SIDE. Testing must be authorised and scoped (APIs you own/are permitted to test, test accounts/data, do-no-harm on rate-limit testing). The lab's apicheck.py reviews a backend configuration: the insecure config fails on 7 findings (5 HIGH) - no auth, non-expiring tokens, cleartext, no authorisation, no rate limiting - and the hardened config passes with every control in place, the same enforcing before/after evidence as the Wi-Fi and Bluetooth reviews, produced offline with no live API called.

### Important concepts

untrusted client; token authentication; transport security; per-object authorisation; rate limiting; OWASP API Security Top 10; authorised testing.

### Key technical takeaways

never trust the client; validated short-lived tokens; TLS everywhere; enforce authorisation server-side per object; rate-limit; follow the OWASP API Security Top 10; test only authorised APIs.

### Glossary

| Term | Meaning |
|---|---|
| BOLA | broken object-level authorisation - accessing another user's object by id. |
| token | a credential (e.g. JWT/OAuth access token) authenticating API requests. |
| PKCE | an OAuth extension making authorisation-code flow safe for public clients. |
| rate limiting | bounding request rate to resist abuse. |
| public client | an app that cannot keep a confidential secret. |

### Common mistakes

trusting the client; no/weak authentication; non-expiring tokens; cleartext; missing per-object authorisation; no rate limiting; testing unauthorised APIs.

### Revision questions

​1. Why is the API the security boundary? 2. What is BOLA and how is it fixed? 3. Name the three pillars of mobile API security.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "Mobile Application Security Verification Standard (MASVS)" (MASVS-AUTH, MASVS-NETWORK). URL: [https://mas.owasp.org/MASVS/](https://mas.owasp.org/MASVS/) Accessed: 2026-11-08. Supports: API authentication and transport controls.
- [R2] OWASP. "API Security Top 10". URL: [https://owasp.org/API-Security/](https://owasp.org/API-Security/) Accessed: 2026-11-08. Supports: the API risks, BOLA, and the mobile-context mapping.
- [R3] NIST. "SP 800-204: Security Strategies for Microservices-based Application Systems". URL: [https://csrc.nist.gov/pubs/sp/800/204/final](https://csrc.nist.gov/pubs/sp/800/204/final) Accessed: 2026-11-08. Supports: backend/API hardening (authentication, authorisation, TLS).
- [R4] Lab evidence. apicheck.py review of api_config.json (7 findings, 5 HIGH, FAIL) and api_config_fixed.json (PASS) (CPython 3.14.4), LAB_ASSETS/C16/ data/apicheck_output.txt, 2026-11-08. Supports: the FAIL-to-PASS deep dive.
