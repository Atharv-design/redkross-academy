| Term | Meaning |
|---|---|
| Control plane | the provider APIs that create, change and delete resources and permissions (for example CreateBucket, PutBucketPolicy; Azure Resource Manager operations). |
| Data plane | the operations on the data and workloads themselves (GetObject on an S3 object, a SQL query, a request to a web application). |

Every control-plane action is an authenticated API call. Whoever holds valid credentials with sufficient permissions can change the environment from anywhere on the internet. Consequences for design:

- Identity is the main perimeter: phishing-resistant MFA for people, short-lived role credentials for workloads, least privilege (Module 2).
- Control-plane audit logs are the most important cloud log (Module 5).
- Guardrails at the organisation level (SCPs, Azure Policy) limit what even an administrator in one account can do.
- Network controls (Module 3) protect the data plane of workloads but do not by themselves protect the control plane.
