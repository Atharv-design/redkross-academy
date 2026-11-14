The lab application (LAB_ASSETS/C06/target/app.py) is a small HTTP server you run on 127.0.0.1:8200. Starting it and mapping it shows the raw mechanics. Execution-tested (CPython 3.14.4, 2026-11-08) output of map.py against the vulnerable app:

```output
Application map for http://127.0.0.1:8200 (loopback lab)
METHOD PATH                               STATUS CONTENT-TYPE
GET    /                                  200    text/html
GET    /robots.txt                        200    text/plain
GET    /login?user=asha&pw=reader123      200    text/html
GET    /search?q=ghats                    200    text/html
GET    /account?id=1001                   200    text/html
GET    /admin                             403    text/html
GET    /download?file=readme.txt          200    application/octet-stream

Server banner reported: SahyadriReads/0.9 Python/3.14.4
```

**Reading this map:**

- Each row is a request method, a path, the response status and content type - the raw HTTP exchange.
- GET /login?...  returns 200 and (not shown here) a Set-Cookie header - the moment a stateless protocol gains state. The cookie value is base64("asha") = YXNoYQ==, which is reversible and forgeable: a foretaste of the session weakness in Module 3.
- GET /admin returns 403 (Forbidden) WITHOUT a valid admin session - but Module 4 shows the access control is broken and can be bypassed with a forged cookie.
- The Server banner "SahyadriReads/0.9" discloses software and version - a minor information leak (a hardening item; the fixed app removes it).
- The vulnerable app sets NO security headers; the hardened app sets X-Content-Type-Options, X-Frame-Options, Content-Security-Policy and Referrer-Policy on every response.

**Why it matters:** everything later in the course is a property of this exchange - the method chosen, the input in the query string, the cookie carrying identity, the headers present or absent, and the body the server renders. If you can read a request and a response, you can reason about web security.
