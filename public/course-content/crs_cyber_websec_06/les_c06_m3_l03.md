Once a user logs in, the session token IS their identity for the rest of the visit, so its weaknesses are severe:

| Term | Meaning |
|---|---|
| Predictable token | if the token is guessable or derivable (the lab uses base64(username) = reversible and forgeable), an attacker mints any user's session. |
| Unprotected cookie | without HttpOnly it can be stolen by XSS; without Secure it leaks over HTTP; without SameSite it enables CSRF. |
| No rotation | not issuing a fresh token at login enables session fixation (an attacker sets a known token, the victim logs in with it). |
| No expiry/logout | tokens that never expire or survive logout extend the window for theft. |

The lab confirms a predictable, unprotected token: findings.py shows

**Set-Cookie:** session=YXNoYQ== with no attributes, and the value decodes to the username. CVSS for the weak-session finding is 5.3 (Medium) in the lab's context [R1].
