LAB_ASSETS/C06/map.py enumerates a known set of endpoints on the loopback target and records method, status and content type. It is scoped by code: require_loopback() in labutil.py raises and exits if the host is not 127.0.0.1/localhost. Execution-tested (CPython 3.14.4, 2026-11-08):

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

From the map, the attack-surface table (entry point -> parameter -> sink -> hypothesised weakness):

```output
endpoint     param  sink                 hypothesis          module
/login       user   SQL query            SQL injection       M05
/login       pw     SQL query            SQL injection       M05
/search      q      SQL query + HTML     SQLi + reflected XSS M05
/reviews     body   HTML (stored)        stored XSS          M05
/account     id     order lookup         IDOR                M04
/admin       -      privileged page      broken access ctrl  M04
/account/... (POST) state change         CSRF                M06
/download    file   file system          path traversal      M06
/fetch       url    outbound request     SSRF                M06
(cookie)     session identity            weak session        M03
(response)   -      missing headers      misconfiguration    (M01/M08)
```

**Reading it:** the map plus classification is the whole test plan. Each hypothesis is verified safely in its module; none is asserted here. The robots.txt content (Disallow: /admin, /download, /fetch) is itself a finding - it discloses the sensitive endpoints rather than protecting them. This is the pivot from "what exists" to "what to test", done entirely within an authorised, loopback-only scope.
