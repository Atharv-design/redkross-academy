This course teaches web application security from the mechanics up and the defence down, using one authorised, loopback-only lab application you build and own ("Sahyadri Reads"). The lab carries ten deliberate weaknesses spanning the OWASP Top 10:2025; you find each with the minimum safe check, score it with CVSS v3.1, fix it in a hardened build, and retest to prove closure.

**Module 1 (Web foundations):** the web is an untrusted browser talking to a trusted server over stateless HTTP (RFC 9110); all security is enforced server-side. Cookies (RFC 6265) add state and carry session identity; protect them with HttpOnly, Secure and SameSite. APIs are HTTP with structured data - the same rules, a wider surface.

**Module 2 (Application mapping):** enumerate the attack surface (every input) and mark trust boundaries; classify each entry point by the weakness its sink enables; keep everything in authorised scope. robots.txt advertises, not hides, sensitive paths. The seven-step workflow: authorise, map, classify, verify, score, report, remediate/retest.

**Module 3 (Identity vulnerabilities):** authentication and session flaws grant account takeover (A07:2025). Hash passwords with Argon2id/bcrypt/scrypt; use random server-side session tokens with protective cookie attributes; prefer phishing-resistant MFA (WebAuthn/FIDO2); make recovery tokens high-entropy, single-use and short-lived. The lab's base64(username) token is forgeable.

**Module 4 (Authorization flaws):** broken access control is A01:2025 (number one). Enforce object-level ownership and function-level role checks server-side from the authenticated session; deny by default. The lab's IDOR (/account) and broken /admin illustrate both; scanners miss these logic flaws.

Module 5 (Injection and output handling): injection (A05:2025) is untrusted data interpreted as code. Parameterise every query (SQLi, CWE-89); encode every user-influenced output for its context (XSS, CWE-79); add CSP and HttpOnly. The lab's admin'-- login bypass scores 9.8.

Module 6 (Request and server-side flaws): CSRF (CWE-352) rides the victim's cookie - defend with per-session tokens and SameSite. SSRF (CWE-918, under A01 in 2025) abuses the server's network position - default-deny allowlist and block internal/loopback/link-local. Path traversal (CWE-22) - canonicalise and confine paths.

Module 7 (Advanced application risks): XXE (disable external entities), insecure deserialization (never unpickle untrusted data; use JSON; A08:2025), business logic flaws (enforce rules server-side), and API security (object-level authorisation, field control, rate limits). All reduce to one principle: the client is untrusted; the server enforces from trustworthy state.

Module 8 (Verification and capstone): run the OWASP-aligned workflow end to end; review code for the course's patterns; write a validated, ranked, actionable report; and prove closure by retest. The lab: 10 findings ranked 9.8 to 3.1; retest shows 10/10 present on the vulnerable app, 0/10 on the hardened app, 10/10 closed.

**Key weakness-to-CWE-to-OWASP map (lab):** SQL injection CWE-89 A05 (9.8); broken access control CWE-284 A01 (8.2); path traversal CWE-22 A01 (7.5); SSRF CWE-918 A01 (7.5); IDOR CWE-639 A01 (6.5); CSRF CWE-352 A01 (6.5); reflected XSS CWE-79 A05 (6.1); stored XSS CWE-79 A05 (5.4); weak session CWE-1004 A07 (5.3); missing headers CWE-693 A02 (3.1).
