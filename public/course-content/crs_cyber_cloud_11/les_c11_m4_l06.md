Execution-tested (sh run_lab.sh data_lab.py, boto3 1.43.126, moto 5.2.5):

```text
------------------------------------------------------------- BEGIN OUTPUT
== audit (before)
  tl-public-assets     {'block_public': 'not set', 'public_policy': False,
                        'encryption': 'none reported', 'versioning':
                        'Disabled'}
  tl-customer-exports  {'block_public': 'not set', 'public_policy': True,
                        'encryption': 'none reported', 'versioning':
                        'Disabled'}
== remediate tl-customer-exports
  KMS key rotation enabled: True
== audit (after)
  tl-customer-exports  {'block_public': True, 'public_policy': False,
                        'encryption': 'aws:kms', 'versioning': 'Enabled'}
== versioning: recover a deleted object
  get after delete: NoSuchKey
  versions=1 delete_markers=1
  after removing delete marker: b'id,name\n1,FICTIONAL\n'
--------------------------------------------------------------- END OUTPUT
(long lines wrapped)
```

**Reading it:**

- tl-customer-exports had a public-read bucket policy and no block - the critical finding. Remediation: Block Public Access on, public policy removed, default encryption with a customer-managed KMS key (rotation enabled), versioning on.
- "encryption: none reported" reflects the mock: moto does not reproduce every AWS default; a real new bucket would report SSE-S3 (L03) and have Block Public Access on (L02). The audit logic is what is tested here.
- Versioning: after deletion GetObject returned NoSuchKey, but one version and one delete marker remained; removing the marker restored the object.
