Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer says "we validate inputs, so we don't need parameterised queries".

**Task:** Respond.

> [!TIP] Model answer
> Validation and parameterisation solve different problems. Valid data can still contain characters that are meaningful in SQL, such as apostrophes in names. Validation rules change and drift. Parameterisation removes the injection class at the data-access layer. Use both, enforced by SAST.
>
> **Lesson:** defence in depth, with the structural fix mandatory.

## Scenario 2

An endpoint /api/invoices/{id} checks only that the user is logged in.

**Task:** Fix and test it.

> [!TIP] Model answer
> Load the invoice, then check that it belongs to the user's account (or that their role permits it) in a central policy function. Return identical responses for missing and forbidden. Add tests for the owner, another user and an admin role. Search for similar endpoints.
>
> **Lesson:** authorisation is per object, per request.

## Scenario 3

Legacy code stores SHA-256 password hashes without salt.

**Task:** Plan a migration.

> [!TIP] Model answer
> **Wrap the existing hashes:** store scrypt(sha256_hash) with a new salt for all users now, and mark the scheme version. On next login, verify and re-hash the plain password with scrypt directly. Force resets for dormant accounts after a deadline. Monitor for credential stuffing, and offer MFA.
>
> **Lesson:** migrate without waiting for every user to log in.
