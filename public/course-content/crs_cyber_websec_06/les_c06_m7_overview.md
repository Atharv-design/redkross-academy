## About this module

This module covers four risks that go beyond the common input-handling flaws: XML External Entity (XXE) injection, where an XML parser is tricked into reading files or making requests; insecure deserialization, where untrusted serialized data becomes code or objects; business logic flaws, where the application works as coded but the workflow can be abused; and API security, where the same principles apply over a wider, more directly exposed surface. These are "advanced" not because they are rare but because they require understanding the technology (parsers, serializers) or the business (workflow) rather than a single tainted string. You will reason about each, relate it to OWASP and CWE, and apply the defences; the lab's business-logic example (the hidden-field price from Module 1) grounds the business-logic lesson.

## Why it matters

These risks cause some of the most damaging breaches. XXE and insecure deserialization can lead to file disclosure, SSRF and remote code execution. Business logic flaws (a coupon applied unlimited times, a negative quantity, a step skipped) bypass controls that input validation never checks, because the input is "valid" - the workflow is the weakness. APIs now carry most application traffic and expose object-level and data-exposure risks directly. Defending them requires understanding beyond pattern-matching.

## Where it is used

Any service that parses XML (SOAP, document formats, SAML); any code that deserializes untrusted data (sessions, caches, message queues); every multi-step workflow (checkout, transfers, approvals); and every API. Reviewed in design, code review, threat modelling and API governance.

## Learning objectives

1. Explain XXE and its prevention (disable external entities).
2. Explain insecure deserialization and safe alternatives.
3. Identify business logic flaws and how to test for them.
4. Explain API security risks and the OWASP API Top 10 themes.
5. Relate each risk to its OWASP category and CWE.
6. Apply the defences, including to the lab's business-logic example.

## Before you start

**Prerequisites:** Modules 1-6.

**Estimated study time:** About 8 hours.
