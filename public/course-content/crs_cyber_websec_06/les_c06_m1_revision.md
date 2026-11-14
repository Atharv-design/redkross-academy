## Revision

### Summary

A web application is an untrusted browser talking to a trusted server over HTTP, a stateless request-response protocol (RFC 9110). Because the client is controlled by the user and any attacker, all security must be enforced on the server; client-side checks are for user experience only. Requests carry a method (GET safe/idempotent; POST for state change), headers and an optional body; responses carry a status (2xx/3xx/4xx/5xx), headers and a body. State is added with cookies (RFC 6265): the server sets a cookie, the browser returns it on every request, and this carries session identity. Cookie attributes are security-critical: HttpOnly blunts theft via XSS, Secure prevents HTTP leak, SameSite defends against CSRF. A session identifier must be random, unforgeable and protected; the lab's base64(username) token is neither. APIs are HTTP with structured data - the same principles apply over a wider attack surface. Each mechanic maps to a weakness: GET-for-state to CSRF, unencoded output to XSS, client-supplied ids to IDOR, missing headers to misconfiguration.

### Important concepts

trust boundary; statelessness; methods and status codes; cookie attributes; sessions; APIs.

### Key technical takeaways

enforce security server-side; never use GET for state change; protect session cookies with HttpOnly/Secure/SameSite; use random session ids; treat APIs as HTTP with the same rules.

### Glossary

```text
HTTP  Hypertext Transfer Protocol; a stateless request-response protocol.
cookie  a small value the server sets and the browser returns on each
        request, used to carry state/identity.
session  a server-side association of requests with one authenticated user.
trust boundary  the line between the untrusted client and the trusted
        server, where security must be enforced.
API  Application Programming Interface; HTTP endpoints, often returning
        JSON.
```

### Common mistakes

trusting client-side validation; using sequential or reversible session ids; omitting cookie attributes; changing state with GET; assuming APIs are exempt from web security rules.

### Revision questions

​1. Why is the client untrusted and what follows? 2. Name three cookie security attributes and the attack each prevents. 3. Why must session identifiers be random?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] IETF. "RFC 9110: HTTP Semantics" (methods, status codes, headers, safe/idempotent methods). URL: [https://www.rfc-editor.org/rfc/rfc9110.html](https://www.rfc-editor.org/rfc/rfc9110.html) Accessed: 2026-11-08. Supports: HTTP structure, methods, status codes, safe methods.
- [R2] IETF. "RFC 6265: HTTP State Management Mechanism" (cookies, Set-Cookie, attributes). URL: [https://www.rfc-editor.org/rfc/rfc6265.html](https://www.rfc-editor.org/rfc/rfc6265.html) Accessed: 2026-11-08. Supports: cookies, HttpOnly/Secure, session state.
- [R3] OWASP. "OWASP API Security Project / API Security Top 10". URL: [https://owasp.org/www-project-api-security/](https://owasp.org/www-project-api-security/) Accessed: 2026-11-08. Supports: API attack surface, object-level authorisation, data exposure.
- [R4] OWASP. "Cross-Site Request Forgery Prevention Cheat Sheet" (SameSite, tokens). URL: [https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) Accessed: 2026-11-08. Supports: CS1, SameSite default behaviour, CSRF defence in depth.
- [R5] Lab evidence. map.py output against the loopback target (CPython 3.14.4), LAB_ASSETS/C06/data/map_output.txt, 2026-11-08. Supports: the deep-dive request/response map and the missing security headers.
