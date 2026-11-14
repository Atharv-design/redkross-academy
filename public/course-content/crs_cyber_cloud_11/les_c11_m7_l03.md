Secrets (database passwords, API keys, signing keys, tokens) belong in a managed store: AWS Secrets Manager or Systems Manager Parameter Store (SecureString), Azure Key Vault. Practices:

- Access to each secret by workload identity, least privilege, logged.
- Automatic rotation where supported (databases); short lifetimes for tokens.
- Inject at runtime (SDK call, CSI driver, platform integration), not at build time.
- Pre-commit and CI secret scanning; push protection in the code host.
- An inventory of where each secret is used, so that rotation after an incident takes hours, not weeks (CircleCI lesson).
- Treat any secret found in a repository, image, log or ticket as exposed: rotate it, then remove it and investigate use.
