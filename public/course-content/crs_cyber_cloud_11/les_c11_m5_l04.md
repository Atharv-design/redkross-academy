Events that should always alert (with owner and runbook):

- Root user activity; console login without MFA.
- Logging changes: StopLogging, DeleteTrail, UpdateTrail, PutEventSelectors; Azure diagnostic setting deletion.
- Identity changes: CreateUser, CreateAccessKey (especially for another user), AttachUserPolicy/PutRolePolicy with admin policies, trust policy changes, Entra role assignments, new app credentials or consents.
- Exposure changes: PutBucketPolicy granting `"*",` DeletePublicAccessBlock, security group rules opening admin ports to 0.0.0.0/0, storage anonymous access enabled.
- Key changes: DisableKey, ScheduleKeyDeletion.

**Aggregate and behavioural signals:**

- bursts of AccessDenied for one identity (permission probing or a broken deployment);
- first use of an identity from a new network or country;
- unusual data access volume (data events, MailItemsAccessed);
- API calls in regions the organisation does not use.

Execution-tested (python cloudtrail_lab.py, CPython 3.14.4):

```text
------------------------------------------------------------- BEGIN OUTPUT
records: 17
== single-event detections
  2026-11-03T06:41:10Z console_login_without_mfa  user=old-integration
                                                  ip=203.0.113.77
  2026-11-03T06:46:30Z access_key_for_other_user  user=old-integration
                                                  ip=203.0.113.77
  2026-11-03T06:48:05Z public_bucket_policy       user=old-integration
                                                  ip=203.0.113.77
  2026-11-03T06:52:40Z logging_disabled           user=old-integration
                                                  ip=203.0.113.77
== aggregate: AccessDenied bursts (>=5 per user per source IP)
  old-integration from 203.0.113.77: 8 AccessDenied -> enumeration /
  permission probing
== new source IP per user (baseline: first IP seen)
   {'asha': '198.51.100.23', 'old-integration': '203.0.113.77',
    'ci-bot': '198.51.100.40'}
--------------------------------------------------------------- END OUTPUT
(format sample line shortened; long lines wrapped)
```

**Reading it:** within eleven minutes one legacy identity logged in without MFA, created an access key for another user, made a bucket public and stopped the trail, after eight denied Organizations calls. Each detection alone deserves a look; together they describe an incident that needs the Module 8 response. Note that StopLogging is itself logged - one reason to alert on it immediately and to protect trails with SCPs. The baseline section is the start of a "new source IP" detection; production versions use a rolling history and allow-lists.
