Look for components whose failure stops security, recovery or detection:

- one log collector or one SIEM region;
- one identity provider instance with no tested recovery;
- a PDP deployed in one zone;
- one administrator account or one person who can restore backups;
- one network path for management traffic;
- an update mechanism that reaches every host simultaneously.

**Patterns:** redundancy (two collectors, multi-zone PDPs), independence (recovery tooling outside the production identity domain), diversity (different failure causes), and degradation plans (documented behaviour when a dependency is lost). NIST SP 800-160 Vol. 2 Rev. 1 frames cyber resiliency as the ability to anticipate, withstand, recover from and adapt to adverse conditions, stresses, attacks or compromises [R5].
