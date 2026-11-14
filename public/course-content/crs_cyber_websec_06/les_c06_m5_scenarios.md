Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

**A code review finds:** db.execute("SELECT `*` FROM t WHERE name='" + name + "'").

**Task:** Name the flaw and give the corrected line.

> [!TIP] Model answer
> This is SQL injection (CWE-89): input is concatenated into the query, so input can alter it. Corrected line uses a parameterised query: db.execute("SELECT `*` FROM t WHERE name=?", (name,)) - the ? marker binds name as data the database never interprets as SQL. Add least-privilege DB accounts and input validation as supporting controls.
>
> **Lesson:** never concatenate input into SQL; parameterise.

## Scenario 2

A page shows a user's display name with no encoding, and the name field accepts any characters.

**Task:** Explain the risk and the fix.

> [!TIP] Model answer
> This is a cross-site scripting risk (CWE-79): an unencoded display name can contain markup/script that runs in viewers' browsers (stored XSS if the name is shown to others). Fix: encode the name for the HTML context at output (html.escape or auto-escaping templates); add a CSP disallowing inline script and set session cookies HttpOnly; optionally validate input. Encode at output because the name may be rendered in multiple contexts.
>
> **Lesson:** encode untrusted output for its context; add CSP and HttpOnly as defence in depth.

## Scenario 3

A team says a web application firewall (WAF) makes injection fixes unnecessary.

**Task:** Respond with the correct position on WAFs versus root-cause fixes.

> [!TIP] Model answer
> A WAF can reduce exposure and buy time, but it is a supporting control, not a fix: it can be bypassed, it does not understand application logic, and relying on it leaves the vulnerability in the code. The root-cause fixes - parameterised queries and output encoding - remove the vulnerability itself and should always be applied; a WAF is defence in depth on top, not a substitute.
>
> **Lesson:** fix the root cause in code; treat a WAF as an added layer, never a replacement.
