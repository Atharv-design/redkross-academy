## Revision

### Summary

Authorisation decides what an authenticated user may do; broken access control is the OWASP Top 10:2025 number one category (A01). Access-control models include RBAC (permissions via roles) and ABAC (permissions via attributes), governed by least privilege. Two checks matter: object-level ("may this user access THIS record?") and function-level ("may this user call THIS function at all?"). IDOR / broken object-level authorisation (CWE-639) exposes an object by client-supplied id with no ownership check - change /account?id=1001 to 1002 and read another user's order. Missing function-level control lets a user reach a privileged page/function without the role - the lab's /admin trusts a forgeable role cookie. Both break for the same reason: deciding from client-supplied data instead of the server-side session. Remediation: derive identity and role from the session, enforce object ownership and function-level role on every access, deny by default, and centralise and test authorisation. In the lab, IDOR (6.5) and broken /admin (8.2) are PRESENT on the vulnerable app and absent after hardening, confirmed by retest. Scanners miss these logic flaws, so human review is essential.

### Important concepts

RBAC/ABAC; least privilege; object- vs function-level authorisation; IDOR; client-trust root cause; deny by default.

### Key technical takeaways

decide authorisation from the session; enforce ownership and role server-side everywhere; deny by default; audit all object-by-id and privileged endpoints.

### Glossary

```text
authorisation  deciding what an authenticated user may do.
IDOR  insecure direct object reference; acting on a client id without an
        ownership check (CWE-639).
function-level access control  whether a user may invoke a privileged
        function at all.
RBAC  role-based access control.
least privilege  granting only the permissions needed.
```

### Common mistakes

looking up objects by id without ownership checks; trusting client cookies/fields/claims for role; protecting pages by obscurity; forgetting checks on new endpoints; relying on scanners to find logic flaws.

### Revision questions

​1. Differentiate object- and function-level authorisation. 2. What single check fixes the lab's IDOR? 3. Why is "not linking the admin page" not access control?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "A01:2025 - Broken Access Control" (OWASP Top 10:2025). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: A01 category, IDOR, function-level control, CWE mappings including CWE-918.
- [R2] MITRE. "CWE-639: Authorization Bypass Through User-Controlled Key". URL: [https://cwe.mitre.org/data/definitions/639.html](https://cwe.mitre.org/data/definitions/639.html) Accessed: 2026-11-08. Supports: IDOR classification and causes.
- [R3] OWASP. "Authorization Cheat Sheet" (server-side enforcement, deny by default, object/function checks). URL: [https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: remediation patterns.
- [R4] MITRE. "CWE-284: Improper Access Control". URL: [https://cwe.mitre.org/data/definitions/284.html](https://cwe.mitre.org/data/definitions/284.html) Accessed: 2026-11-08. Supports: function-level access control flaw.
- [R5] Lab evidence. findings.py and report.py results for IDOR and /admin on ports 8200/8201 (CPython 3.14.4), LAB_ASSETS/C06/data/, 2026-11-08. Supports: the deep-dive proofs, scores and fixes.
