LAB_ASSETS/C06/findings.py confirms all three with minimal, safe proofs against the owned loopback target. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
[PRESENT] Cross-site request forgery  CWE-352  state change without CSRF token accepted
[PRESENT] Path traversal (download)   CWE-22   ../ escaped the download directory: True
[PRESENT] Server-side request forgery CWE-918  target connected to our chosen URL: True
```

How each proof works and the root cause:

```text
CSRF: the tool logs in (obtaining a session cookie) and POSTs to
/account/update with a new email and NO csrf field. The vulnerable server
accepts it because it checks only the session cookie, not an anti-CSRF
token. Root cause: state change authorised by an ambient cookie with no
per-request token; cookie also lacks SameSite.
SSRF: the tool opens a throwaway socket on 127.0.0.1 at an ephemeral port,
then requests /fetch?url=http://127.0.0.1:<that port>/ssrf-probe. The
vulnerable server connects OUT to that URL - the tool observes the inbound
connection - proving the server fetches a caller-chosen destination. All
loopback. Root cause: the server fetches any user-supplied URL.
Path traversal: /download?file=../app.py escapes the intended files
directory and returns the application source. Root cause: path built by
joining input without canonicalisation.
```

The hardened app fixes all three: a per-session CSRF token required on state-changing POSTs (plus SameSite=Strict); a default-deny (empty) outbound allowlist; and os.path.realpath confinement to the base directory. Execution-tested against 8201:

```output
[absent ] Cross-site request forgery  CWE-352  state change without CSRF token accepted: False
[absent ] Path traversal (download)   CWE-22   ../ escaped the download directory: False
[absent ] Server-side request forgery CWE-918  target connected to our chosen URL: False
```

CVSS in the lab context: path traversal 7.5 (High), SSRF 7.5 (High), CSRF 6.5 (Medium); all absent after hardening, confirmed by retest.py.
