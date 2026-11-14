The lab's vulnerable app issues a session cookie whose value is just base64(username) with no cookie attributes. findings.py confirms this with the minimum safe check: log in and read the Set-Cookie header. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
[PRESENT] Weak session cookie   CWE-1004   Set-Cookie='session=YXNoYQ==; Path=/'
```

Analysis of the proof (no exploitation needed):

- YXNoYQ== is base64 for "asha"; the token is reversible, so an attacker can read who it belongs to and - worse - FORGE any user's token by encoding their username. For example base64("admin") = YWRtaW4=, which the vulnerable app accepts as the admin's session.
- The cookie carries no HttpOnly (so script could read it - relevant to XSS in Module 5), no Secure (so it leaks over HTTP), and no SameSite (so it rides cross-site requests - CSRF in Module 6).

The hardened app's login (app_fixed.py) issues a random server-side token and sets protective attributes. Execution-tested against port 8201:

```output
[absent ] Weak session cookie  CWE-1004  session=nyJNIMv5e0V0...; HttpOnly; SameSite=Strict
```

The difference is the whole lesson: the token is now unforgeable (24 bytes of secrets.token_urlsafe entropy), unreadable by script (HttpOnly), and withheld cross-site (SameSite=Strict). The weak-session finding scores CVSS 5.3 (Medium) on the vulnerable app and is absent after hardening. Identity is only as strong as the token that carries it.
