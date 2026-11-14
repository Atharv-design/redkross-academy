The lab's terraform/bad/main.tf contains four deliberately weak resources for a fictional "Kestrel Pay" AWS account (documentation account 111122223333). Each is a common real-world pattern:

1. aws_s3_bucket with no public access block, no encryption configuration with a customer-managed key, no versioning and no access logging.
2. aws_security_group allowing SSH (22) from 0.0.0.0/0 and all egress to anywhere.
3. aws_eks_cluster with a public API endpoint, no secrets encryption and no control-plane logging.
4. aws_iam_policy allowing Action `"*"` on Resource `"*".`

The remediated terraform/good/main.tf adds a KMS key with rotation, the four public access block settings, server-side encryption with the KMS key, versioning and logging; restricts SSH to a VPN range and egress to an internal mirror; makes the EKS endpoint private, enables secrets encryption and three log types; and lists three ECR actions on one repository instead of the wildcard. Remember Module 3: a private API endpoint and audit logs on the managed cluster matter as much as any setting inside it.
