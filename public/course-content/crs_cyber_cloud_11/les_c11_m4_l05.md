| Term | Meaning |
|---|---|
| Versioning (S3) | keeps prior versions; a delete adds a delete marker that can be removed to restore the object. |
| Soft delete (Azure) | retains deleted blobs/containers for a set period (CKV2_AZURE_38 checks it). |
| Immutability | write-once-read-many locks (S3 Object Lock, Azure immutable storage, backup vault locks) prevent deletion or change during a retention period, even by administrators. |
| Backups | copies in a separate account/subscription with separate administrators (Module 8 case: Code Spaces). |
| Lifecycle rules | transition and expire data according to the retention schedule (CKV2_AWS_61) - keeping data longer than needed increases exposure and breaches purpose limitation under privacy law. |

Test restores against recovery objectives; restore tests are the only evidence that backups work.
