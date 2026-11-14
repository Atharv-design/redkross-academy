Apply Course 06 rules to every sink:

```text
HTML/markdown UI   encode or render as text; sanitise markdown; content
                   security policy; no raw HTML from the model.
SQL / queries      never concatenate model text into queries; use
                   parameterised queries over a narrow, read-only API.
Shell / code       never execute generated code automatically outside a
                   sandbox; review before running.
Templates, e-mail  escape; validate recipients against business rules.
URLs fetched by    allowlist hosts; block internal addresses (SSRF).
the server
Downstream models  output passed to another model is untrusted context.
```

Structured output (JSON schema) helps parsing but does not make values safe: validate types, ranges and ownership.
