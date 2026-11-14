The lab's Part B creates users, policies and a role in the local mock and reviews them with boto3 calls that work the same way against a real account you own. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
== Part B: review policies in the (mock) account
  user=asha             policy=tl-read-reports  keys=0 mfa=0 risky=-
  user=old-integration  policy=tl-legacy-full   keys=1 mfa=0 risky=['*']
  user=ci-bot           policy=tl-ci-deployer   keys=0 mfa=0 risky=
                        ['iam:PassRole']
  role=tl-vendor-access trust policy allows ANY AWS principal (no
       ExternalId/Condition) -> confused-deputy / takeover risk
--------------------------------------------------------------- END OUTPUT
(long lines wrapped)
```

**Reading it:** old-integration is a legacy user with an access key, no MFA and full permissions - exactly the profile of the Midnight Blizzard entry point; ci-bot can pass roles to EC2, which must be limited to specific role ARNs; the vendor role trusts any AWS principal. Remediation: remove old-integration (or replace with a scoped role), restrict PassRole with a resource ARN and iam:PassedToService condition, and rewrite the vendor trust policy to the vendor's account with an ExternalId condition. Regular reviews also use credential reports, last-accessed information and Azure access reviews.
