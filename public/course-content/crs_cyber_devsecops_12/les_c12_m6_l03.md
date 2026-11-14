The best secret is one that does not exist. Workload identity gives services short-lived credentials automatically, with no long-term key to leak:

- cloud instance or service roles, where credentials come from the platform metadata service and rotate automatically;
- Kubernetes service account tokens federated to cloud IAM (Course 21);
- CI/CD OIDC federation, where the pipeline exchanges a signed token for short-lived cloud credentials instead of storing access keys as CI secrets (Module 7). CircleCI's post-incident advice to customers included adopting OIDC tokens to reduce long-lived stored credentials [R5].
- managed identities for databases (IAM database authentication) instead of static passwords.

Where a static secret remains, minimise its scope and lifetime and automate its rotation.
