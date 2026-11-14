| Term | Meaning |
|---|---|
| Provider-managed keys | SSE-S3 in AWS; Microsoft-managed keys in Azure. AWS documents that from 5 January 2023 SSE-S3 is applied to all new object uploads as base-level encryption and cannot be disabled [R1]. |
| Customer-managed keys | SSE-KMS with a key in AWS KMS; Azure Storage with a key in Key Vault. The customer controls the key policy, rotation and disablement, and key use is logged. |
| Client-side | data encrypted before upload. |
| In transit | TLS 1.2+ to storage endpoints; deny non-TLS requests with aws:SecureTransport false; Azure minimum TLS version (the Module 6 lab flags TLS1_0). |

**What each protects:** provider-managed encryption protects against media theft and some provider-side access; it does NOT protect against anyone who has valid permissions through the service. Customer-managed keys add an independent permission check (kms:Decrypt) and an audit trail, and allow the organisation to make data unreadable by disabling the key.
