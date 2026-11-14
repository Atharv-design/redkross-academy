Cross-site scripting (XSS, CWE-79) occurs when an application includes untrusted input in a page without proper encoding, so the input is parsed as markup/script in another user's browser [R4]. Three contexts:

| Term | Meaning |
|---|---|
| Reflected XSS | input in the request is echoed into the immediate response (for example a search term shown on the results page); the attack is delivered via a crafted link. |
| Stored XSS | input is stored (a review, comment, profile) and rendered to other users later; one injection affects every viewer. |
| DOM-based XSS | client-side JavaScript writes untrusted input into the DOM unsafely, with no server round-trip. |

**Impact:** script running in the victim's session can steal cookies (if not HttpOnly), perform actions as the victim, capture keystrokes, or rewrite the page. In the lab, /search reflects the query unencoded (reflected XSS) and /reviews renders stored review bodies unencoded (stored XSS); findings.py confirms both.
