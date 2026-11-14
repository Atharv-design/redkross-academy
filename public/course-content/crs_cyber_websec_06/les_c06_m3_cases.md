## Credential stuffing and the case for MFA and breached- password screening

**Context:** attackers routinely take username/password pairs leaked from one breached site and "stuff" them into login forms on other sites, because people reuse passwords. These credential-stuffing campaigns succeed at scale against any site that allows reused or breached passwords and does not rate-limit or require a second factor. Industry and standards guidance (NIST SP 800-63B) responded by recommending screening new passwords against known-breached lists and supporting phishing-resistant MFA, rather than relying on frequent forced password rotation and complexity rules alone [R2][R3]. Why it matters for this module: it shows that authentication weakness is often not a single bug but a design choice - allowing reused passwords, no rate limiting, no MFA. The defences are design-level: screen passwords against breach corpora, rate-limit and lock out, and offer/require phishing-resistant MFA.

**Lessons:** assume passwords are known to attackers; screen against breached lists; rate-limit; and add phishing-resistant MFA, especially for sensitive accounts.

## (FICTIONAL TEACHING SCENARIO): The guessable reset token

**Context:** Sahyadri Reads (fictional) built "forgot password" to email a reset link containing a token that was the user id plus the date (for example ?token=1001-20261108).

**What happened:** because the token was derivable from public information (a user id and the date), it could be guessed for any account, letting someone reset another user's password without any access to their email. The flow also did not expire the token or invalidate existing sessions.

**Response:** the team replaced the token with a 32-byte cryptographically random, single-use value stored server-side with a short expiry; required proof of email control; invalidated the token on use; rotated the session on reset; and notified the account owner. They treated recovery as critically as login.

**Lessons:** reset tokens must be high-entropy, single-use and short-lived; never derive them from guessable data; invalidate sessions on reset; and notify the user. Recovery is part of authentication and deserves equal rigour.
