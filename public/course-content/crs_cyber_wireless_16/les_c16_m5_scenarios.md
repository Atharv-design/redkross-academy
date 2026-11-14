Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An app stores the user's session token in external storage and logs it.

**Task:** Explain why this is insecure given the platform model and the fix.

> [!TIP] Model answer
> The platform sandboxes the app and keeps its private storage private, but external storage is shared (readable by other apps with permission and exported via backup) and logs are not a safe place for secrets - so storing and logging the token takes it OUT of the protected sandbox and exposes it. Fix: store the token in private (internal) storage, encrypted (keystore-backed key), never in external storage, and never log secrets.
>
> **Lesson:** keep secrets in the private, encrypted sandbox; never in shared storage or logs.

## Scenario 2

An app requests location, contacts and storage permissions but is a simple notes app.

**Task:** Explain the problem and the correct approach.

> [!TIP] Model answer
> A notes app has no need for location or contacts, and modern storage APIs avoid broad storage permissions - so these requests violate least privilege, enlarge the attack and privacy surface, and may alarm users. The correct approach: request only the permissions actually needed, justify each, use scoped/privacy-preserving APIs where possible, and handle the user denying them. Remove the unnecessary permissions.
>
> **Lesson:** request minimal, justified permissions; do not over-request.

## Scenario 3

A developer enables cleartext traffic "to make debugging easier".

**Task:** Explain the risk and the correct handling.

> [!TIP] Model answer
> Enabling cleartext traffic weakens a secure platform default and permits unencrypted HTTP in production, exposing all traffic (including tokens and personal data) to interception on any network. Debugging convenience is not worth it. Correct handling: keep cleartext disabled; use HTTPS everywhere; if a local debug endpoint is truly needed, restrict any cleartext exception to a specific debug build and domain, never the release config.
>
> **Lesson:** do not weaken the cleartext default for convenience; use TLS, and scope any debug exception tightly.
