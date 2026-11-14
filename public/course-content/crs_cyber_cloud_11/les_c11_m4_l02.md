AWS S3 Block Public Access has four settings - block public ACLs, ignore public ACLs, block public bucket policies, and restrict public buckets - at account and bucket level. AWS documents that new buckets do not allow public access by default [R2]. A bucket policy is "public" when it grants access to everyone (for example Principal `"*"`) without restricting conditions. Azure storage accounts have a setting that allows or disallows anonymous blob access (allow_nested_items_to_be_public in Terraform), and public network access can be disabled in favour of private endpoints.

**Defence in depth:**

- account-level Block Public Access on, enforced by SCP or Config rule;
- Azure Policy denying anonymous blob access;
- public content served through a CDN with origin access control, not from a public bucket;
- alerts on PutBucketPolicy, PutBucketAcl, DeletePublicAccessBlock (Module 5) and scheduled posture scans (Module 6).
