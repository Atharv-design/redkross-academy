Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An endpoint changes a user's email on a POST and relies only on the session cookie.

**Task:** Name the risk and the two complementary defences.

> [!TIP] Model answer
> The risk is CSRF (CWE-352): a cross-site page can auto-submit the POST and the browser attaches the victim's session cookie, so the server performs the email change as the victim. Two complementary defences: (1) require a per-session anti-CSRF token on the request, which a cross-site attacker cannot read; (2) set the session cookie SameSite=Strict/Lax so it is not sent on cross-site requests. Also ensure state change is not done via GET.
>
> **Lesson:** protect state-changing requests with anti-CSRF tokens and SameSite cookies.

## Scenario 2

A feature lets users supply a URL that the server fetches to import data.

**Task:** Explain the risk and how you would make it safe.

> [!TIP] Model answer
> The risk is SSRF (CWE-918): the attacker can make the server fetch internal services, loopback or cloud metadata it can reach but they cannot. Make it safe with a default-deny allowlist of permitted destinations; resolve the host and block private, loopback and link-local ranges (including the metadata IP); prefer not taking raw user URLs (use identifiers mapping to fixed targets); and segment the fetching component. Enable hardened cloud metadata.
>
> **Lesson:** never fetch arbitrary user URLs; default-deny and block internal ranges.

## Scenario 3

A download endpoint builds a path as base + user_filename.

**Task:** Explain the risk and the safe implementation.

> [!TIP] Model answer
> The risk is path traversal (CWE-22): input like ../../ escapes the base directory and reads arbitrary files. Safe implementation: resolve the final path (os.path.realpath) and serve only if it remains within the allowed base directory, returning 403 otherwise; reject inputs with separators or ".."; or best, map an identifier to a known file so user input is never used as a path. For uploads, validate type/size, store outside the web root, and ignore the client filename.
>
> **Lesson:** canonicalise and confine file paths, or avoid user-controlled paths entirely.
