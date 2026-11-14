Every report has limits. State them plainly:

- Evidence not available: logs rotated or cleared, systems not collected, encrypted data without keys.
- Tool limits: versions used, known issues, validation performed. The Casey Anthony case (Module 3) shows a tool count that was wrong.
- Time: clock offsets and zone assumptions.
- Scope: questions not asked, or systems excluded at the client's request.
- Attribution: accounts and devices versus people.
- Test conditions: for example, the ext4 recovery result in Module 3 used a userspace deletion that does not represent kernel behaviour.

Consider alternative explanations and say why the evidence does or does not support them. Examples: an automated backup job, rather than a person, fetched the file (the user agent "rk-backup-agent/1.0" invites this question; the 404 probe for a non-existent file and the curl agent argue against a configured job, but the job configuration should be checked); another user shared the key; malware acting with the account's rights. Disclosing limitations strengthens a report. An opposing expert will find them anyway, and an examiner who disclosed them first is more credible.
