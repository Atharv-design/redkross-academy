Insecure configuration is a vulnerability class of its own (OWASP's "Security Misconfiguration"). Examples:

- debug mode or verbose errors in production;
- default credentials;
- permissive CORS;
- wildcard allowed hosts;
- old TLS versions;
- missing security headers;
- cookies without Secure, HttpOnly and SameSite;
- unnecessary services or ports;
- overly broad file permissions.

**Practices:**

- Secure defaults in code: if a setting is missing, choose the safe value.
- Validate configuration at startup and refuse to run insecurely in production.
- Keep configuration in version control (without secret values), with review, and separate it per environment.
- Scan infrastructure and platform configuration as code (checkov, trivy config; Course 11 Module 6) and benchmark hosts and containers (CIS Benchmarks, Lynis; Course 03).
- Detect drift: compare running configuration with the declared state.

Execution-tested startup check (LAB_ASSETS/C12/config_check.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
config: {'APP_ENV': 'production', 'DEBUG': 'true', 'MIN_TLS': '1.0',
 'ALLOWED_HOSTS': '*', 'DB_PASSWORD': '***', 'SESSION_SECRET': '***'}
  FAIL: DEBUG must be false in production
  FAIL: MIN_TLS must be 1.2 or 1.3
  FAIL: COOKIE_SECURE must be true
  FAIL: ALLOWED_HOSTS must list explicit hosts
  FAIL: DB_PASSWORD is a literal value; use a secrets-manager reference
result: INSECURE
exit=1
...
result: OK
exit=0
--------------------------------------------------------------- END OUTPUT
(execution-tested, CPython 3.14.4; wrapped)
```

The bad file failed on five rules. The missing COOKIE_SECURE was treated as insecure, because the safe default is to require it explicitly. The checker masked secret values (`"***"`) in its own output. The good file, using secretref: references, passed with exit 0. This lets the deployment pipeline or service startup block insecure configuration.
