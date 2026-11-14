Authentication says who you are. Authorisation says what you may do. Broken access control is the top category in recent OWASP Top 10 editions.

**Patterns:**

- Deny by default. Every endpoint requires an explicit permission.
- Check at the object level. Confirm that this user may access this specific record on every request, not just that they are logged in. In the reference code, get_shipment returns a record only if row[1] == user.
- Same response for "missing" and "forbidden". This avoids revealing which IDs exist (test_missing_and_forbidden_look_the_same).
- Centralise. Put checks in one policy function or middleware rather than copying them across handlers. Use role- or attribute-based models (RBAC/ABAC) as complexity grows.
- Server-side only. Never trust client-side checks or hidden fields.
- Least privilege for the application itself. The database user can read shipments but not alter schema.
- Test negative cases. Every authorisation rule needs a test showing a forbidden user is refused (test_other_user_denied).
