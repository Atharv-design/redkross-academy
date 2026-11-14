The OWASP API Security Top 10 catalogues the main API risks, which apply directly to mobile backends [R2]:

```text
broken object-level authorisation  accessing another user's object by id - the
                                   top risk; enforce per-object authorisation.
broken authentication              weak/missing auth, forgeable or long-lived
                                   tokens.
broken object property / excessive object-level authorisation and excessive data
                                   exposure - returning or accepting too much.
unrestricted resource consumption  no rate limiting - abuse/brute force.
broken function-level authorisation admin actions callable by normal users.
plus server-side request forgery, misconfiguration, improper inventory, unsafe
consumption of third-party APIs.
```

For mobile, the defining fact is that the CLIENT IS UNTRUSTED: every one of these must be enforced server-side, never relying on the app. Testing a mobile system's security therefore always includes testing the API against this list. The lab's checks map to the authentication, authorisation, transport and resource-consumption items.
