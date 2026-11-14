## About this module

This module covers three weaknesses that turn the request itself, or the server's handling of it, against the application: Cross-Site Request Forgery (CSRF), where a user's browser is tricked into making a state-changing request the user did not intend; Server-Side Request Forgery (SSRF), where the server is tricked into making a request to a location the attacker chooses; and path traversal and unsafe file handling, where input reaches the file system. You will confirm all three on the lab target you own and apply the standard mitigations. These map to OWASP A01:2025 Broken Access Control (CSRF, path traversal, and SSRF via CWE-918) and to A02 Security Misconfiguration for related file-handling hardening [R1].

## Why it matters

These flaws are high-impact and sometimes subtle. CSRF can change a victim's email or password, or move money, using the victim's own authenticated session. SSRF can reach internal services, cloud metadata endpoints and other systems the server can see but the attacker cannot - a frequent path to serious breaches. Path traversal can read arbitrary files (configuration, credentials, source) from the server. All three are preventable with well-understood controls - anti-CSRF tokens and SameSite cookies, outbound allowlisting, and path canonicalisation - applied consistently.

## Where it is used

Every state-changing endpoint (CSRF); every feature that fetches a URL, webhook, or remote resource (SSRF); every file download, upload, include or template path (traversal/file handling). Reviewed in design, code review and cloud-security assessment.

## Learning objectives

1. Explain CSRF and prevent it with tokens and SameSite cookies.
2. Explain SSRF, its targets (internal services, metadata), and prevent it.
3. Explain path traversal and safe file handling.
4. Confirm all three safely on an owned target.
5. Apply the standard mitigations in code.
6. Relate each flaw to its OWASP category and CWE.

## Before you start

**Prerequisites:** Modules 1-5 (HTTP, sessions, access control, injection).

**Estimated study time:** About 9 hours.
