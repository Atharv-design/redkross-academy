## About this module

Injection flaws arise when untrusted input is mixed with code or markup so that the input changes the meaning of what runs. The two most important web forms are SQL injection (input changes a database query) and cross-site scripting (input becomes script in another user's browser). Both come from the same root cause - mixing data with code - and both have the same kind of fix: keep data as data. This module covers SQL injection concepts, XSS contexts, and the two defences that prevent them: parameterisation (for queries) and contextual output encoding (for markup). You will confirm SQL injection and both reflected and stored XSS on the lab target, and see the fixes close them. These map to OWASP A05:2025 Injection [R1].

## Why it matters

Injection has been near the top of the OWASP Top 10 for over a decade because it is common and severe: SQL injection can expose or destroy an entire database and bypass authentication; XSS can steal sessions, perform actions as the victim, and deface pages. Yet both are almost entirely preventable with well-known, cheap techniques applied consistently. Understanding the shared root cause - untrusted data interpreted as code - lets you recognise and prevent the whole family, including variants in NoSQL, LDAP, OS commands and templates.

## Where it is used

Every database query that includes input; every page or API response that renders input; secure-coding standards and linters; code review; and the input-validation and output-encoding layers of any web framework.

## Learning objectives

1. Explain the shared root cause of injection: mixing data with code.
2. Explain SQL injection and its impact, and confirm it safely.
3. Prevent SQL injection with parameterised queries.
4. Explain XSS contexts (reflected, stored, DOM) and impact.
5. Prevent XSS with contextual output encoding and CSP.
6. Confirm and remediate the lab's injection and XSS flaws.

## Before you start

**Prerequisites:** Modules 1-4; basic SQL and HTML.

**Estimated study time:** About 9 hours.
