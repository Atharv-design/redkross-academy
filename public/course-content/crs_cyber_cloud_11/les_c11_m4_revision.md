## Revision

### Summary

Cloud storage access combines identity policies, resource policies, access points or RBAC data roles, keys and SAS tokens; identity-based access is preferred and shared keys minimised. S3 Block Public Access (four settings) and Azure anonymous-access controls prevent public exposure, backed by guardrails and alerts. SSE-S3 has applied to all new uploads since 5 January 2023; customer-managed keys add an independent Decrypt check, audit and the ability to disable access; encryption at rest does not stop authorised callers. Key management covers policies with separated custody, scope, rotation, deletion protection and monitoring. Versioning, soft delete, immutability, isolated backups, lifecycle retention and restore tests keep data recoverable and minimised. The lab found a public bucket, remediated it with BPA, KMS and versioning, and restored a deleted object. Toyota's decade-long exposure shows the cost of unchecked settings.

### Important concepts

defence in depth for storage; encryption scope; recoverability.

### Key technical takeaways

get_public_access_block, get_bucket_policy, put_bucket_encryption, delete markers.

### Glossary

| Term | Meaning |
|---|---|
| BPA | S3 Block Public Access. |
| Delete marker | Marker that hides a deleted object version. |
| SAS | Azure shared access signature. |
| SSE-KMS | S3 server-side encryption with KMS keys. |
| WORM | Write once, read many (immutability). |

### Common mistakes

public buckets for websites; long-lived SAS; backups in the production account; treating encryption as access control.

### Revision questions

​1. List S3's four BPA settings. 2. When does a customer-managed key help? 3. Design an immutable backup.

### Further reading

AWS BPA [R2]; default encryption FAQ [R1].

## References

- [R1] AWS. "Default encryption FAQ" (Amazon S3 User Guide). URL: [https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html) Accessed: 2026-11-07. Supports: SSE-S3 for all new uploads from 5 January 2023; cannot be disabled.
- [R2] AWS. "Blocking public access to your Amazon S3 storage". URL: [https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) Accessed: 2026-11-07. Supports: four settings; new buckets do not allow public access by default; meaning of "public".
- [R3] BankInfoSecurity. "Toyota Exposed Auto Location of 2M Japanese Customers". URL: [https://www.bankinfosecurity.net/toyota-exposed-auto-location-2m-japanese-customers-a-22062](https://www.bankinfosecurity.net/toyota-exposed-auto-location-2m-japanese-customers-a-22062) Accessed: 2026-11-07. Supports: about 2.15 million, November 2013-April 2023, human error, no evidence of misuse.
- [R4] Lab evidence. data_lab.py and data_lab_output.txt (boto3 1.43.126, moto 5.2.5), 2026-11-07.
