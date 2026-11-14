## Revision

### Summary

Injection flaws (OWASP A05:2025) share one root cause: untrusted data interpreted as code or markup. SQL injection (CWE-89) concatenates input into a query, enabling authentication bypass (admin'-- comments out the password check), data theft, modification and more; the lab's /login is bypassable this way and scores CVSS 9.8. The definitive fix is the parameterised query, where the query structure is fixed and input is bound strictly as data; supporting controls are least-privilege DB accounts and input validation. Cross-site scripting (CWE-79) includes input in a page without encoding so it is parsed as script in another user's browser; contexts are reflected (echoed in the response), stored (saved and shown to others - one injection, many victims), and DOM-based. The primary XSS defence is contextual output encoding (render input as text), with CSP and HttpOnly cookies as defence in depth. The lab's /search (reflected, 6.1) and /reviews (stored, 5.4) are confirmed with benign markers and fixed by encoding plus CSP. One root cause (data as code), two cures (parameterise queries; encode output), applied EVERYWHERE input meets a query or markup.

### Important concepts

data-as-code root cause; SQL injection and auth bypass; parameterisation; XSS contexts; output encoding; CSP.

### Key technical takeaways

parameterise every query; encode every user-influenced output for its context; add CSP and HttpOnly; validate input as a supporting control; make the safe path the default.

### Glossary

```text
SQL injection  input altering a SQL query (CWE-89).
parameterised query  fixed SQL with input bound as data (prepared
        statement).
XSS  cross-site scripting; input rendered as script in a browser (CWE-79).
output encoding  rendering untrusted input as text for its context.
CSP  Content-Security-Policy; restricts script sources and inline script.
```

### Common mistakes

concatenating input into SQL; encoding input instead of output; encoding for the wrong context; relying on a WAF instead of fixing code; non-HttpOnly session cookies.

### Revision questions

​1. What is the one root cause of injection and its two cures? 2. How does admin'-- bypass the lab's login? 3. Why encode at output rather than only validating input?

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] OWASP. "A05:2025 - Injection" (OWASP Top 10:2025). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: injection category, SQLi and XSS as injection.
- [R2] MITRE. "CWE-89: Improper Neutralization of Special Elements used in an SQL Command (SQL Injection)". URL: [https://cwe.mitre.org/data/definitions/89.html](https://cwe.mitre.org/data/definitions/89.html) Accessed: 2026-11-08. Supports: SQL injection definition and impact.
- [R3] OWASP. "SQL Injection Prevention Cheat Sheet" (parameterised queries, least privilege). URL: [https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: parameterisation and supporting controls.
- [R4] OWASP. "Cross Site Scripting Prevention Cheat Sheet" (contextual output encoding, CSP) and MITRE "CWE-79". URL: [https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: XSS contexts and output-encoding defence.
- [R5] Lab evidence. findings.py and report.py results for SQLi and XSS on ports 8200/8201 (CPython 3.14.4), LAB_ASSETS/C06/data/, 2026-11-08. Supports: the deep-dive proofs, scores and fixes.
