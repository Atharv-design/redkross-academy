LAB_ASSETS/C06/findings.py confirms both authorisation flaws with minimal, read-only proofs against the owned loopback target. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
[PRESENT] IDOR (other user's order)      CWE-639  asha could read order 1002 (ravi): True
[PRESENT] Broken access control (/admin) CWE-284  /admin reachable with forged role cookie
```

How each proof works (no exploitation beyond the minimum):

```text
IDOR: the tool logs in as asha (a normal customer), then requests
/account?id=1002 - an order belonging to ravi. The vulnerable server looks
up the order by id and returns it without checking ownership, so asha reads
ravi's book and shipping address. The proof is a single authorised GET; it
changes nothing. Root cause: SELECT ... FROM orders WHERE id=? with no
"AND username = <session user>" check.
Broken function-level control: the tool requests /admin with only
Cookie: role=admin and no admin session. The vulnerable server trusts that
cookie and returns the full user list. Root cause: the handler checks a
client-supplied cookie instead of the authenticated session's role.
```

The hardened app (app_fixed.py) fixes both: /account returns 403 unless the order's username matches the session user (admins excepted), and /admin returns 403 unless the session's role is admin. Execution-tested against 8201:

```output
[absent ] IDOR (other user's order)      CWE-639  asha could read order 1002 (ravi): False
[absent ] Broken access control (/admin) CWE-284  /admin reachable with forged role cookie: False
```

The fix is the same idea in both places: decide from the server-side session, enforce ownership and role, deny by default. CVSS: broken /admin 8.2 (High), IDOR 6.5 (Medium); both absent after hardening, confirmed by retest.py.
