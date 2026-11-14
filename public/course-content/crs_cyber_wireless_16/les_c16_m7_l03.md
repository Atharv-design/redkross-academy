Backend hardening makes the API robust beyond authentication and transport:

```text
authorisation     check on EVERY request that the authenticated caller may
                  access THIS object/action - preventing broken object-level
                  authorisation (accessing another user's data by changing an
                  id), the top API risk.
rate limiting     limit requests to resist brute force, credential stuffing and
                  abuse of the API.
input validation  validate and bound all input server-side (the client cannot be
                  trusted) - preventing injection and mass-assignment.
error handling     return generic errors; do not leak stack traces, internal
                  details or excessive data.
minimal data       return only the fields needed (no excessive data exposure);
                  apply least privilege to the API.
logging/monitoring log security events server-side (ties to Course 07/12).
```

Backend hardening treats the API as the real security boundary, because the client cannot enforce anything. apicheck.py checks for rate limiting, authorisation enforcement, and safe error handling in the configuration.
