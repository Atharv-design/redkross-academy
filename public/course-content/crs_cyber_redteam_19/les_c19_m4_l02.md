Credential exposure is any way a secret becomes available to an attacker:

```text
at rest        credentials in files, scripts, configuration, source or shares.
in memory/cache cached credentials, tokens or tickets on an endpoint.
in transit     credentials sent without protection (Course 07/16).
reuse          the same password across accounts/systems, enabling spread.
```

Reviewing credential exposure finds these so they can be removed, rotated or protected (vaulting, least privilege, Protected Users, MFA). Exposed credentials are what make Valid Accounts (T1078) and Use Alternate Authentication Material (T1550) possible, so reducing exposure directly shrinks the identity attack surface. The review is done on in-scope, lab systems with lab accounts - never by harvesting real users' secrets.
