Delegation lets a service act on behalf of a user to reach a further service (the "double hop"). Three kinds, in order of risk:

```text
unconstrained  the service can impersonate the user to ANY service; if the
               service host is compromised, every user who authenticated to
               it (including admins) can be impersonated. High risk; avoid.
               (Domain controllers hold this by design - which is normal;
               the risk is non-DC hosts configured this way.)
constrained    limited to named services; much safer.
resource-based constrained (RBCD): the TARGET service controls who may
               delegate to it; the modern, preferred model, but
               misconfiguration can be abused, so review write access to
               computer objects' delegation attributes.
```

**Controls:** avoid unconstrained delegation on anything but DCs; mark sensitive accounts "cannot be delegated" (or add them to Protected Users, which blocks delegation); review delegation configuration regularly. The hygiene tool flags non-DC accounts configured for unconstrained delegation.
