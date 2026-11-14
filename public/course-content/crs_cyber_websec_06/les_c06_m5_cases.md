## Why injection stays near the top, and why the fix is settled

**Context:** SQL injection has been publicly understood since the late 1990s, and the fix - parameterised queries - has been available and recommended for just as long. Yet injection remains a Top 10 category (A05:2025) because it is reintroduced whenever a developer builds a query from strings, often in a new language, a quick script, or a corner of a large codebase. The persistence is not a mystery of the attack but a discipline problem in the defence: the cure must be applied EVERYWHERE input meets a query or markup [R1]. Why it matters for this module: the lesson is that prevention is a consistent coding practice, enforced by frameworks, linters and review - not a one-time fix. Auto-escaping templates and query parameterisation by default make the safe path the easy path.

**Lessons:** make parameterised queries and auto-escaping the default; use static analysis to catch concatenated SQL and unencoded output; review for the pattern, because a single missed spot can be the breach.

## (FICTIONAL TEACHING SCENARIO): The review that ran in everyone's browser

**Context:** Sahyadri Reads (fictional) let customers post book reviews and rendered them to all visitors without encoding - the stored-XSS pattern in the lab's /reviews.

**What happened:** someone posted a "review" containing a script that read the session cookie (which was not HttpOnly) and sent it to an external server. Every logged-in visitor who viewed that book's page had their session exposed, because the stored input was rendered as script in their browsers - one injection, many victims.

**Response:** the team encoded all output with the templating engine's auto-escaping, added a Content-Security-Policy disallowing inline script, set the session cookie HttpOnly so script could not read it, and validated input on the way in. They audited every place stored data was rendered.

**Lessons:** stored XSS scales to every viewer; encode output at render time; set a CSP and HttpOnly cookies as defence in depth; and remember that the defence belongs at output, because the same stored data may appear in many places.
