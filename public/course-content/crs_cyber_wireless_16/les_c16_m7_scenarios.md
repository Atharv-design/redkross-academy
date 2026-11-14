Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An API returns a user's record based on a userId in the request, without checking the caller.

**Task:** Name the risk and the fix.

> [!TIP] Model answer
> This is broken object-level authorisation (BOLA), the top API risk: the API trusts the userId from the untrusted client, so an attacker changes it to read another user's record. The fix: on every request, derive the caller's identity from the verified token and check server-side that this caller is authorised for the requested object; never trust an id supplied by the client. Add tests for BOLA.
>
> **Lesson:** enforce per-object authorisation server-side from the verified identity.

## Scenario 2

A mobile backend has no rate limiting and non-expiring tokens.

**Task:** Explain the risks and the remediation.

> [!TIP] Model answer
> No rate limiting allows brute force, credential stuffing and API abuse at scale; non-expiring tokens mean a stolen or leaked token grants permanent access with no revocation. Remediation: add rate limiting (and lockout/backoff) on authentication and sensitive endpoints, and issue short-lived tokens with refresh and revocation, validated server-side. Re-run the API review to confirm.
>
> **Lesson:** rate-limit and use short-lived revocable tokens to contain abuse and token theft.

## Scenario 3

A developer says "the app checks permissions, so the API does not need to".

**Task:** Explain why this is wrong.

> [!TIP] Model answer
> The app is an untrusted public client: an attacker can call the API directly, bypassing the app entirely, and can forge any value the app would send. Client-side checks are a UX convenience, not security. Every authentication and authorisation decision must be enforced server-side on each request. Relying on the app leaves the whole backend open to direct API calls.
>
> **Lesson:** the client cannot enforce security; the API is the real boundary.
