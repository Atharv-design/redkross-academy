## Revision

### Summary

Three weaknesses turn the request or the server's handling of it against the application. CSRF (CWE-352) abuses browsers sending a site's cookies on cross-site-triggered requests, so an attacker page makes a state-changing request carried by the victim's session; the lab's /account/update accepts a POST with no token (CVSS 6.5). Defences: a per-session anti-CSRF token the cross-site attacker cannot read, plus SameSite cookies, and never state-changing via GET. SSRF (CWE-918, mapped under A01 in 2025) tricks the server into fetching an attacker-chosen URL, reaching internal services and cloud metadata the server can see but the attacker cannot; the lab's /fetch fetches any URL (CVSS 7.5, proven on loopback). Defences: a default-deny outbound allowlist, blocking private/loopback/link-local ranges with resolve-then-check, network segmentation, and avoiding raw user URLs. Path traversal (CWE-22) uses input like ../ to escape the intended directory and read arbitrary files; the lab's /download is escapable by ../app.py (CVSS 7.5). Fix: canonicalise with realpath and confine to a base, reject "..", or map ids to known files. All three are confirmed with minimal, loopback-safe proofs and absent after hardening, confirmed by retest.

### Important concepts

CSRF and ambient cookies; anti-CSRF tokens and SameSite; SSRF and the server's network position; allowlisting; path traversal and canonicalisation.

### Key technical takeaways

require anti-CSRF tokens and SameSite; default-deny outbound and block internal ranges; canonicalise and confine file paths; never state-change via GET; prefer ids over user-supplied URLs/paths.

### Glossary

```text
CSRF  cross-site request forgery; a forged state-changing request carried by
        the victim's cookie (CWE-352).
anti-CSRF token  a per-session secret required on state-changing requests.
SSRF  server-side request forgery; the server fetches an attacker-chosen URL
        (CWE-918).
path traversal  escaping an intended directory via ../ (CWE-22).
allowlist  a default-deny list of permitted destinations.
```

### Common mistakes

state change via GET; no CSRF token; blocking only external addresses for SSRF; joining user input into paths without canonicalisation; trusting client filenames on upload.

### Revision questions

​1. What two defences stop CSRF? 2. Why must SSRF defence block internal/loopback/link-local addresses? 3. How does canonicalisation stop path traversal?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "OWASP Top 10:2025" (A01 Broken Access Control includes CWE-352 CSRF and CWE-918 SSRF). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: category mappings for CSRF and SSRF.
- [R2] OWASP. "Cross-Site Request Forgery Prevention Cheat Sheet" (tokens, SameSite). URL: [https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: CSRF defences.
- [R3] OWASP. "Server-Side Request Forgery Prevention Cheat Sheet" (allowlists, internal ranges, metadata) and MITRE "CWE-918". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: SSRF defences, CS1 metadata.
- [R4] MITRE. "CWE-22: Improper Limitation of a Pathname to a Restricted Directory (Path Traversal)". URL: [https://cwe.mitre.org/data/definitions/22.html](https://cwe.mitre.org/data/definitions/22.html) Accessed: 2026-11-08. Supports: path traversal and canonicalisation fix.
- [R5] Lab evidence. findings.py and report.py results for CSRF, SSRF and traversal on ports 8200/8201 (CPython 3.14.4), LAB_ASSETS/C06/data/, 2026-11-08. Supports: the deep-dive proofs, scores and fixes.
