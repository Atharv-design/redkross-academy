DR plans document how to restore each critical system: recovery order (identity and network first), procedures, contacts, credentials stored offline, and verification steps. Patterns range from backup and restore, through pilot light and warm standby, to active-active.

**Cyber-specific requirements:**

- Immutable or offline backups that attackers cannot encrypt or delete (Course 09 Module 7, Course 11 Module 4). Test that the backups are not reachable from the production domain.
- Clean-room recovery: restore into an isolated environment, scan, then reconnect. Backups may contain persistence.
- Recovery of identity systems (directory, SSO, PKI) first, with break-glass accounts.
- Coordination with forensics and legal, so evidence is preserved before rebuild.
- Realistic timelines. Large ransomware recoveries take weeks to months. The British Library reported its catalogue's searchable return on 15 January 2024, after the October 2023 attack, with rebuild still under way [R3].
