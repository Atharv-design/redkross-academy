Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An endpoint /api/orders/{id} returns any order by id to any logged-in user.

**Task:** Name the flaw and describe the fix.

> [!TIP] Model answer
> This is IDOR / broken object-level authorisation (CWE-639, A01). The endpoint returns an object by client-supplied id without checking the requester is authorised for it. Fix: on every access, confirm the current user owns the order (or holds a role permitting access) before returning it; derive the user from the server-side session; deny by default (403) otherwise. Audit all object-by-id endpoints for the same gap.
>
> **Lesson:** enforce object-level ownership on every access; never return an object by id alone.

## Scenario 2

A developer protects the admin page by not linking to it in the menu.

**Task:** Explain why this fails and what the correct control is.

> [!TIP] Model answer
> Not linking the page is obscurity, not access control; the URL can be guessed, found in history, robots.txt, source or logs, and then reached directly. The correct control is server-side function-level authorisation: the admin page requires the authenticated session to hold the admin role and returns 403 to everyone else, regardless of how the URL was found.
>
> **Lesson:** obscurity is not access control; enforce function-level role checks server-side.

## Scenario 3

A JWT contains a claim "role":"user" that the client can modify, and the server reads the role from it.

**Task:** Explain the risk and the correct approach.

> [!TIP] Model answer
> If the client can modify the JWT and the server trusts the claim, a user can set role=admin and escalate - trusting client-controlled data for authorisation. Correct approach: the JWT must be integrity-protected (signed) and the server must verify the signature before trusting any claim; better still, derive sensitive authorisation (like admin) from server-side state, not solely from a token the client holds. Never trust an unverified or client-mutable claim for access decisions.
>
> **Lesson:** authorisation must come from trustworthy, server-verified state, not client-controlled tokens or fields.
