LAB_ASSETS/C06/findings.py confirms the three injection/XSS flaws with minimal, benign proofs against the owned loopback target. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
[PRESENT] SQL injection (login)   CWE-89  login with admin'-- returned a session
[PRESENT] Reflected XSS (search)  CWE-79  search reflected the marker unencoded
[PRESENT] Stored XSS (reviews)    CWE-79  stored review rendered unencoded
```

How each proof works and the root cause:

```text
SQLi: the vulnerable /login builds
  "SELECT ... WHERE username='%s' AND password='%s'" % (user, pw)
so input user=admin'-- makes the query
  SELECT ... WHERE username='admin'--' AND password='x'
where -- comments out the password test; the admin row returns and the app
issues a session. The benign proof sends admin'-- and checks only that a
session came back. Root cause: input concatenated into SQL.
Reflected XSS: /search echoes the raw q into the HTML
  "<p>Results for: %s</p>" % term
so <script>rk1</script> is returned verbatim and would execute in a browser.
Stored XSS: a review body is stored and later rendered with no encoding, so
<script>rk2</script> is served unencoded to every viewer of that book.
```

The hardened app fixes all three: parameterised queries (SQLi), and html.escape on every user-influenced output plus a CSP (both XSS). Execution-tested against 8201:

```output
[absent ] SQL injection (login)   CWE-89  login with admin'-- returned no session
[absent ] Reflected XSS (search)  CWE-79  search reflected the marker encoded
[absent ] Stored XSS (reviews)    CWE-79  stored review rendered encoded
```

**CVSS:** SQLi 9.8 (Critical), reflected XSS 6.1 (Medium), stored XSS 5.4 (Medium) in the lab context; all absent after the fix, confirmed by retest.py. One root cause (data as code), two cures (parameterise queries; encode output).
