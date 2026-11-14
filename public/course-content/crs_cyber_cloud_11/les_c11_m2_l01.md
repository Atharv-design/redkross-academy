```text
AWS root user        the account owner; use only for the few tasks that
                     require it; hardware MFA; no access keys.
IAM user             long-term identity with password and/or access keys;
                     avoid for people (use SSO) and for workloads (use
                     roles).
IAM role             identity assumed for temporary credentials by users
                     (via IAM Identity Center/SSO), services (EC2, Lambda)
                     or other accounts; trust policy says who may assume it.
Microsoft Entra user human identity, usually synchronised or federated.
Service principal    the identity of an application in a tenant.
Managed identity     an Azure-managed service principal for a workload; no
                     secret for the customer to handle.
```

**Principles:** people sign in through a central IdP with phishing-resistant MFA; workloads use roles or managed identities with short-lived credentials; long-term access keys and client secrets are exceptions with owners, expiry and monitoring (Module 7).
