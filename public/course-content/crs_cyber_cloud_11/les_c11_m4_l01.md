AWS S3 access is decided by IAM identity policies, bucket policies (resource-based), access points, and (legacy) ACLs; Block Public Access overrides them to prevent public grants. Azure Blob Storage access can use Microsoft Entra ID with Azure RBAC data roles (for example Storage Blob Data Reader), account access keys (Shared Key), shared access signatures (SAS) and, if allowed, anonymous container access.

**Principles:**

- Prefer identity-based access (IAM roles, Entra ID RBAC) over shared keys; disable Shared Key authorisation on Azure storage accounts where possible (checkov flags this: CKV2_AZURE_40 in the Module 6 lab).
- Grant data-plane access per bucket/container and per prefix; separate read, write and delete.
- Bucket policies that grant access to other accounts name them explicitly; conditions such as aws:SourceVpce restrict network path (Module 3).
- SAS tokens are bearer credentials: short expiry, minimal permissions, HTTPS only, and an expiration policy on the account (CKV2_AZURE_41).
