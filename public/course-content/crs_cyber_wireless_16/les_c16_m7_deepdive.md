Running apicheck.py over the insecure then the hardened backend configuration (execution-tested, CPython 3.14.4, 2026-11-08):

```output
== api_config.json (insecure) ==
  [HIGH] AUTH      authentication not required on API endpoints
  [HIGH] AUTH      tokens do not expire (no token lifetime/revocation)
  [HIGH] TRANSPORT TLS not enforced; cleartext (http) endpoint permitted
  [HIGH] AUTHZ     per-request authorisation not enforced (object-level)
  [HIGH] HARDEN    no rate limiting configured
  [MED ] HARDEN    verbose error messages leak internal details
  [MED ] DATA      responses return excessive fields
  ... 7 finding(s), 5 HIGH -> FAIL

== api_config_fixed.json (hardened) ==
  authentication: required (token validated, expiry set)    OK
  transport     : TLS enforced, no cleartext                OK
  authorisation : enforced per request (object-level)       OK
  rate limiting : configured                                OK
  error handling: generic errors                            OK
  data exposure : minimal fields                            OK
  ... 0 finding(s) -> PASS
```

**Reading the result:**

- AUTHENTICATION: the insecure API requires no auth and issues non-expiring tokens - anyone can call it and a stolen token never dies. The hardened config requires validated, expiring tokens.
- TRANSPORT: cleartext permitted exposes tokens/data (Module 2's lesson on the API). Hardened enforces TLS.
- AUTHORISATION: no per-request/object-level authorisation is the top API risk (broken object-level authorisation) - the hardened config enforces it.
- HARDENING: no rate limiting, verbose errors and excessive data all fixed.

The two runs are the same enforcing evidence pattern as Modules 2 and 4: a FAIL configuration, each control applied, and a PASS - proof the controls work, produced offline against configuration files with no live API called.
