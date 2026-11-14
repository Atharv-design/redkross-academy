## How CSRF works and how tokens stop it

![A flow showing an attacker page auto-submitting a state-changing request with the victim's cookie, accepted by the vulnerable app and rejected by the hardened app's CSRF token and SameSite cookie.](/assets/courses/cyber-06/C06-M06-F1.svg)
*Figure C06-M06-F1. CSRF rides the victim's cookie; an anti-CSRF token and SameSite cookie break it [R2].*

## SSRF and the server's network position

![A diagram showing the server fetching attacker-chosen internal or metadata URLs, with the fix of a default-deny allowlist and blocked internal address ranges.](/assets/courses/cyber-06/C06-M06-F2.svg)
*Figure C06-M06-F2. SSRF abuses the server's reach into internal and metadata endpoints; default-deny allowlisting and range blocking prevent it [R3].*

## Path traversal and canonicalisation

![A comparison of the vulnerable download that joins input to a base path and the hardened version that resolves the real path and confines it to the base directory.](/assets/courses/cyber-06/C06-M06-F3.svg)
*Figure C06-M06-F3. Path traversal escapes the intended directory; canonicalising and confining the path prevents it [R4].*
