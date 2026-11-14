**Secrets include:**

- passwords and connection strings;
- API keys and tokens, including personal access tokens, OAuth client secrets and webhook signing secrets;
- private keys (TLS, SSH, code signing, JWT signing);
- cloud access keys;
- encryption keys;
- session secrets;
- recovery codes;
- sometimes sensitive configuration, such as internal hostnames combined with credentials.

**Classify each secret by:**

- impact if leaked (read-only reporting token versus production administrator key);
- lifetime (static, or short-lived and automatically issued);
- owner (a named team, recorded in an inventory);
- consumers (which services need it, and nothing more).

An inventory of secrets is as important as an inventory of dependencies (Module 5).
