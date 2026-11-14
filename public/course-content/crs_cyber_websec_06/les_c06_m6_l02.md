Two complementary defences prevent CSRF [R2]:

```text
Anti-CSRF token  the server issues a secret, per-session (or per-request)
                 token, embeds it in forms, and requires it on every state-
                 changing request. A cross-site attacker cannot read the
                 token (same-origin policy), so they cannot forge a valid
                 request.
SameSite cookies set SameSite=Strict or Lax so the browser does not send the
                 session cookie on cross-site requests, breaking the attack
                 at the cookie level.
```

**Supporting rules:** never perform state change with GET (only POST/PUT/DELETE); optionally check Origin/Referer. The hardened lab app issues a per-session CSRF token and rejects state-changing POSTs without it, and sets SameSite=Strict - so findings.py reports the CSRF check as absent after hardening.
