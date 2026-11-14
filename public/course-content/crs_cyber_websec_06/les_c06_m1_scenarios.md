Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer says, "We validate all input in the browser with JavaScript, so the server does not need to."

**Task:** Explain why this is unsafe and what the correct approach is.

> [!TIP] Model answer
> Client-side validation runs in the browser, which the user controls; it can be bypassed by editing the page, disabling JavaScript, or sending the request directly (curl, an intercepting proxy). It improves user experience by giving instant feedback, but it provides no security. All validation and authorisation must be enforced on the server, which the client cannot bypass. Keep client-side checks for UX and duplicate every security-relevant check server-side.
>
> **Lesson:** the client is untrusted; security is server-side.

## Scenario 2

You observe a login response with Set-Cookie: session=1001; Path=/.

**Task:** Identify what is wrong and describe the secure design.

> [!TIP] Model answer
> session=1001 is a predictable, guessable identifier (likely a user or order id); an attacker can change it to impersonate another user, and the cookie lacks HttpOnly/Secure/SameSite. The secure design uses a random, server-side session identifier (e.g. secrets.token_urlsafe) that maps to the user on the server, set in a cookie with HttpOnly, Secure and SameSite=Strict/Lax. Never encode identity or sequential ids directly in the cookie value.
>
> **Lesson:** session identifiers must be random, unforgeable and protected.

## Scenario 3

A team is moving a feature to a JSON API and asks whether web security knowledge still applies.

**Task:** Explain how the principles carry over and what new exposure APIs add.

> [!TIP] Model answer
> All the principles carry over: HTTP requests/responses, the untrusted client, server-side enforcement, sessions/tokens, input validation and output handling. APIs add exposure: every endpoint is directly callable; object ids are often in the URL (watch for IDOR/broken object-level authorisation); responses may over-expose data; and clients may send more fields than intended (mass assignment). Apply object-level authorisation on every request, return only needed fields, and validate input - see OWASP API Security guidance.
>
> **Lesson:** an API is HTTP with structured data; the same rules apply, with a wider surface.
