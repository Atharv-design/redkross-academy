AWS IAM user access key: deactivate it (do not delete it yet - you need it for correlation), then find any keys or identities it created.

**Active role sessions:** temporary credentials remain valid until they expire. AWS documents revoking them by attaching a policy that denies all actions for sessions issued before a time, using the aws:TokenIssueTime condition with DateLessThan (the managed AWSRevokeOlderSessions pattern); it does not affect long-term user credentials [R3].

**Other actions:** remove malicious trust-policy changes; detach added policies; reset the console password and require MFA re-registration; apply an SCP to quarantine an account if needed.

**Azure/Entra:** revoke refresh tokens/sessions for the user, disable the account or require password reset, remove malicious app credentials and consents, remove role assignments (Not execution-tested here; see Microsoft documentation). Execution-tested first steps (sh run_lab.sh response_lab.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. inventory keys
  AKIA...7WR2 status=Active
== 2. deactivate key (keep it for evidence and correlation)
  status now: Inactive
== 3. deny sessions issued before now
  inline policies: ['ir-revoke-older-sessions']
--------------------------------------------------------------- END OUTPUT
(key ID truncated by the script)
```
