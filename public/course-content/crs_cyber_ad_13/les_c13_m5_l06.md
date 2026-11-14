Findings are not equal. A practical ranking:

1. Anything enabling forest/domain takeover or trivial escalation: unconstrained delegation on a non-DC; AS-REP roastable admin; Kerberoastable account in a privileged group.
2. Weak service accounts: SPN on a user account with a short password; RC4 enabled.
3. Hygiene debt: non-expiring passwords, dormant enabled accounts, stale objects.

For each, close the PRECONDITION (remove the SPN, enable pre-auth, switch to constrained delegation or RBCD, move to a gMSA, enable AES, disable the account) and record the change. The tool's exit code supports this: it returns non-zero when any HIGH finding is present, so it can gate a pipeline or a change window until the serious items are fixed.
