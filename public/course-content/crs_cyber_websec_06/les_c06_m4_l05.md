Fixing access control is a matter of consistent, server-side checks:

- Decide from the SESSION, not the client: derive the user and role from the server-side session, never from a cookie or field the client sets.
- Enforce OBJECT ownership on every access: when fetching an object by id, confirm the current user owns it (or holds a role permitting access) before returning or modifying it.
- Enforce FUNCTION-level role checks: privileged endpoints require the authenticated user to hold the required role, checked server-side.
- Deny by default: require an explicit allow; unknown or unauthenticated users get 403.
- Centralise and test: put authorisation in a consistent layer and test it, because it is easy to forget on a new endpoint.

The hardened lab app applies these: /account checks that the order's username matches the session user (admins may view all); /admin requires a valid admin SESSION, not a cookie. After hardening, both findings are absent.
