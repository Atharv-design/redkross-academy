**Never store secrets in:**

- source code;
- committed .env files;
- container images (layers keep earlier files);
- CI logs;
- tickets or chat;
- client-side code.

**Use instead:**

| Term | Meaning |
|---|---|
| Secrets manager | a dedicated service (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) with access control, audit logs, versioning and rotation support. Applications fetch secrets at runtime using their own identity. |
| KMS/HSM | for encryption and signing keys. The key never leaves the service; applications request operations. |
| Platform injection | orchestrators mount secrets as files or environment variables at runtime from the secrets manager. Files with restricted permissions are preferable to environment variables, which can leak through process listings, crash dumps and debug pages. |

**Patterns:**

- least privilege: each service can read only its own secrets;
- separate secrets per environment, so development cannot read production;
- reference by name in configuration (the lab uses a "secretref:" prefix, for example DB_PASSWORD=secretref:prod/shipments/db), resolved at runtime;
- cache briefly and handle rotation by re-reading on authentication failure.

The Dockerfile finding in Course 11's container scan (secret placed in an ENV instruction) shows how images leak secrets.
