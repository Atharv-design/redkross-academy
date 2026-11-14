Fix in code, deploy through the pipeline, then verify twice:

1. Re-scan: the same checks now pass. Execution-tested on iac_fixed with the 12 selected checks covering the critical and data-protection findings:

```text
------------------------------------------------------------- BEGIN OUTPUT
== iac (selected checks)
Passed checks: 0, Failed checks: 12, Skipped checks: 0
== iac_fixed (selected checks)
Passed checks: 12, Failed checks: 0, Skipped checks: 0
--------------------------------------------------------------- END OUTPUT
```

```text
   The fixes: a public access block and versioning for the bucket; SSH
   only from a bastion subnet; the database private, encrypted, with
   deletion protection, IAM authentication and the password supplied as
   a sensitive variable from a secrets manager; Azure storage with TLS
   1.2, no public blob access, public network access disabled and GRS
   replication; RDP only from a bastion subnet.
2. Verify by effect: after deployment, confirm the property from outside
   the configuration - for example an anonymous request to the bucket is
   denied, the database endpoint does not resolve to a public address,
   the NSG rejects RDP from the internet - using authorised tests in
   your own environment (Course 22 Module 7).
```

Record evidence (scan output, test results, commit) in the change record.
