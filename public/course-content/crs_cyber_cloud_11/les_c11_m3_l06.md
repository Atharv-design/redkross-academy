The lab builds a VPC in the local mock and audits it with read-only boto3 calls. Execution-tested (sh run_lab.sh network_lab.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
== subnets
  10.40.1.0/24   PUBLIC (0.0.0.0/0 -> igw)
  10.40.2.0/24   private (no igw route)
== security group ingress review
  tl-web  tcp/443   from 0.0.0.0/0  -> internet-facing (expected for 443 on
                                       web tier?)
  tl-web  tcp/22    from 0.0.0.0/0  -> FINDING: SSH open to the internet
  tl-db   tcp/5432  from sg:tl-web  -> source is a security group (least
                                       privilege)
== remediate: revoke SSH from 0.0.0.0/0, verify
  tl-web ingress now: [(443, ['0.0.0.0/0'])]
--------------------------------------------------------------- END OUTPUT
(long lines wrapped)
```

**Reading it:** public/private classification comes from routes, not names; SSH from the internet is the finding; the database rule references the web tier's security group - the preferred pattern; after revocation, only 443 remains open. The same calls (describe_route_tables, describe_security_groups, revoke_security_group_ingress) work against an account you own; run them read-only first and change only under your change process. Equivalent Azure review uses az network nsg rule list (Not execution-tested).
