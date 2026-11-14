Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A code review finds the session cookie is set with no HttpOnly, Secure or SameSite, and its value is the user id.

**Task:** List the weaknesses and the secure design that fixes them.

> [!TIP] Model answer
> **Weaknesses:** the token value is a predictable/guessable id (impersonation); no HttpOnly (theft via XSS); no Secure (leak over HTTP); no SameSite (CSRF).
>
> **Secure design:** generate a cryptographically random session id server-side (e.g. secrets.token_urlsafe); store session state server-side keyed by it; set the cookie HttpOnly, Secure and SameSite=Strict/Lax; issue a new token at login and invalidate at logout; set idle and absolute timeouts. This is what the hardened lab app does.
>
> **Lesson:** session tokens must be random, server-side and protected by cookie attributes.

## Scenario 2

A product team wants to add MFA but is considering SMS codes only.

**Task:** Explain the weaknesses of SMS MFA and what you recommend.

> [!TIP] Model answer
> SMS codes are vulnerable to SIM-swap, interception and real-time phishing, and depend on the mobile network. They are better than password-only but are the weakest MFA. Recommend phishing-resistant MFA (WebAuthn/FIDO2 hardware keys or platform authenticators) as the primary option, with TOTP as a fallback; avoid SMS for high-value accounts; rate-limit prompts; and protect enrolment and recovery. If SMS must be offered, treat it as a lower-assurance factor.
>
> **Lesson:** prefer phishing-resistant MFA; SMS is a weak second factor.

## Scenario 3

Users report that "forgot password" lets them reset without access to their email.

**Task:** Diagnose the likely flaw and describe safe recovery.

> [!TIP] Model answer
> The reset token is likely predictable or not tied to proof of email control (e.g. derived from user id/date, or not verified), so anyone can reset any account. Safe recovery: generate a high-entropy, single-use, short-lived token stored server-side; send a link over the verified email channel; require the token and proof of control; invalidate on use/expiry; rotate the session and re-verify MFA; and notify the user. Treat recovery as critically as login.
>
> **Lesson:** weak recovery bypasses authentication; make reset tokens strong, single-use and tied to verified contact.
