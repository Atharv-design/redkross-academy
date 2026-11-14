## Revision

### Summary

Cloud incident response depends on preparation: IR roles reachable through monitored break-glass access, protected logs, a forensic account, runbooks and exercises (NIST SP 800-61 Rev. 3 frames IR within CSF 2.0). Analysis correlates identity, control-plane, data and network logs into a UTC timeline and hunts for persistence. Containment deactivates keys, denies older sessions with aws:TokenIssueTime (which does not affect long-term user credentials), removes malicious policies and app credentials, and isolates instances with an empty quarantine security group; preservation snapshots volumes, exports and hashes logs and tags resources. Recovery rebuilds from IaC, restores isolated immutable backups and verifies posture; lessons learned produce controls. The lab executed these first-hour steps in the mock. Code Spaces (2014) shows the cost of backups reachable from a compromised account. The secure reference architecture brings together landing zone, identity, network, data, visibility, configuration, workload and response controls.

### Important concepts

preparation; contain-preserve-recover; isolation of backups.

### Key technical takeaways

update_access_key Inactive; TokenIssueTime deny; quarantine SG; create_snapshot and tags.

### Glossary

```text
Break-glass   Emergency access path, tightly controlled and monitored.
Forensic account  Separate account for evidence.
Quarantine SG Security group with no rules, used to isolate.
TokenIssueTime  Condition key for session issue time.
```

### Common mistakes

deleting evidence; IR access through the compromised IdP; backups in the same account; no persistence hunt.

### Revision questions

​1. Revoke sessions for a role. 2. Order isolation, snapshot and termination. 3. Outline the reference architecture.

### Further reading

SP 800-61 Rev. 3 [R1]; AWS revoke sessions [R3].

## References

- [R1] NIST. SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile", April 2025. URL: [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final) Accessed: 2026-11-08.
- [R2] The Register. Report on the Code Spaces attack, 18 June 2014. URL: [https://www.theregister.com/2014/06/18/code_spaces_destroyed/](https://www.theregister.com/2014/06/18/code_spaces_destroyed/) Accessed: 2026-11-07. Supports: control panel access, extortion, deletion of data and backups, company closure.
- [R3] AWS. "Revoking IAM role temporary security credentials". URL: [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html) Accessed: 2026-11-07. Supports: AWSRevokeOlderSessions, aws:TokenIssueTime DateLessThan, no effect on long-term user credentials.
- [R4] Lab evidence. response_lab.py and response_lab_output.txt (boto3 1.43.126, moto 5.2.5), 2026-11-07.
