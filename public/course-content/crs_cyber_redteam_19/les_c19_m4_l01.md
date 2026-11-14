A privilege boundary separates levels of access - standard user from administrator, one tier from another, one host or account scope from the next. Assessing privilege boundaries means checking whether they hold:

| Term | Meaning |
|---|---|
| escalation paths | can a standard account gain administrative rights (misconfig, weak service, excessive privilege)? |
| tiering | are high-value (Tier 0) credentials kept off lower-trust hosts, as the Enterprise Access Model requires (Course 13)? |
| least privilege | do accounts and services have only the rights they need? |

The assessment identifies where a boundary could be crossed, so it can be hardened and monitored. The point for this module is not to cross boundaries for their own sake, but to find weak ones and ensure the crossing would be DETECTED. Privilege-boundary weaknesses are a prime target for ATT&CK Privilege Escalation and for the Valid Accounts technique (T1078), which spans several tactics.
