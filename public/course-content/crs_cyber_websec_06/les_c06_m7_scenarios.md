Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A service parses uploaded XML invoices with a default parser.

**Task:** Name the risk and the fix.

> [!TIP] Model answer
> The risk is XXE (CWE-611): a default XML parser may resolve external entities, letting a crafted invoice read local files, trigger SSRF, or cause denial of service. Fix: configure the parser to disable external entity and DTD processing (and general entity expansion limits); prefer a safer format where possible; validate the input. Keep the parser library patched.
>
> **Lesson:** never parse untrusted XML with external entities enabled.

## Scenario 2

An application stores session state as a pickled Python object in a cookie.

**Task:** Explain the risk and a safe design.

> [!TIP] Model answer
> The risk is insecure deserialization (CWE-502): a pickled object in a client-held cookie is attacker-controllable, and unpickling it can run code or build arbitrary objects - potential remote code execution. Safe design: do not store code-capable serialized objects client-side; keep session state server-side keyed by a random id; if data must be client-held, use a signed, data-only format (e.g. JSON with an HMAC) and never unpickle untrusted bytes.
>
> **Lesson:** never deserialize untrusted data with a code-capable format; keep session state server-side.

## Scenario 3

An API returns a user object including a password hash and lets clients set an "isAdmin" field on update.

**Task:** Identify the two API risks and the fixes.

> [!TIP] Model answer
> **Two risks:** (1) excessive data exposure - returning the password hash (and any sensitive field) the client does not need; fix by returning only required fields. (2) mass assignment / broken object property level authorisation - letting the client set isAdmin; fix by accepting only the fields the endpoint is meant to allow and deriving privilege server-side, never from client input. Also enforce object-level authorisation on the update.
>
> **Lesson:** return only needed fields and accept only expected ones; never let the client set privilege.
