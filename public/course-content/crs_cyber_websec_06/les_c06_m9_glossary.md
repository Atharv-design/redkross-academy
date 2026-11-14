attack surface  all points where input enters or behaviour is triggered. trust boundary  the line input crosses from untrusted to trusted. parameterised query  fixed SQL with input bound strictly as data. output encoding  rendering untrusted input as text for its context. IDOR  insecure direct object reference; acting on a client id with no

```text
ownership check (CWE-639).
```

CSRF  cross-site request forgery; a forged state-changing request carried by

```text
the victim's cookie (CWE-352).
```

SSRF  server-side request forgery; the server fetches an attacker-chosen URL

```text
(CWE-918).
```

path traversal  escaping an intended directory via ../ (CWE-22). XXE  XML External Entity injection (CWE-611). insecure deserialization  reconstructing objects from untrusted, code-capable

```text
serialized data (CWE-502).
```

CSP  Content-Security-Policy; restricts script sources and inline script. SameSite  cookie attribute withholding a cookie on cross-site requests. WebAuthn/FIDO2  phishing-resistant, origin-bound authentication. OWASP Top 10:2025  the current web risk list (A01 Broken Access Control ...

```text
A10 Mishandling of Exceptional Conditions).
```

CVSS v3.1  FIRST's severity scoring, 0.0-10.0.
