A policy statement has Effect (Allow/Deny), Action, Resource and optional Condition. Policy types: identity-based, resource-based (for example bucket policies), permission boundaries, SCPs, session policies. The core of AWS's documented evaluation logic for a request within one account is:

1. An explicit Deny in any applicable policy -> denied.
2. Otherwise, an Allow in an applicable policy (and permitted by boundaries and SCPs) -> allowed.
3. Otherwise -> implicitly denied.

The lab's teaching evaluator implements this core (not the full engine). Execution-tested (sh run_lab.sh iam_lab.py, boto3 1.43.126, moto 5.2.5):

```text
------------------------------------------------------------- BEGIN OUTPUT
== Part A: evaluation
  read, MFA            s3:GetObject     -> ALLOW
  read, no MFA         s3:GetObject     -> DENY (explicit)
  read, access key     s3:GetObject     -> ALLOW
  read, key, IfExists  s3:GetObject     -> DENY (explicit)
  put, MFA             s3:PutObject     -> DENY (implicit)
  other bucket         s3:GetObject     -> DENY (implicit)
  delete from office   s3:DeleteObject  -> ALLOW
  delete from cafe     s3:DeleteObject  -> DENY (implicit)
--------------------------------------------------------------- END OUTPUT
```

**Reading it:** the read-reports policy allows only GetObject and ListBucket on tl-reports, so PutObject and other buckets are implicitly denied; the office-only delete policy allows deletion only from 198.51.100.0/24 via the aws:SourceIp condition. The MFA rows are explained in L04.

**Writing good policies:** specific actions (never `"*"` for people or workloads), specific resources (ARNs), conditions where useful (source network, MFA, organisation ID, tags), and resource policies that name principals explicitly.
