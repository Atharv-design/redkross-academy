**HTTP is STATELESS:** each request is independent and the server does not inherently know that two requests came from the same user. Cookies, specified in RFC 6265, solve this: the server returns Set-Cookie, the browser stores it, and it sends the cookie back on every subsequent request to that site [R2]. This is how a site "remembers" you are logged in. Cookie security attributes are therefore critical:

| Term | Meaning |
|---|---|
| HttpOnly | the cookie is not readable by JavaScript - this blunts theft via cross-site scripting. |
| Secure | the cookie is only sent over HTTPS - it is not leaked over plain HTTP. |
| SameSite | the cookie is withheld on cross-site requests (Strict or Lax) - this is a primary defence against CSRF. |

The lab's vulnerable app sets a session cookie with NONE of these attributes (Set-Cookie: session=...; Path=/), which the course uses to demonstrate session theft and CSRF; the hardened app adds HttpOnly and SameSite=Strict (and Secure when served over HTTPS).
