A domain controller (DC) is a server that holds a writable copy of the domain partition, answers LDAP and Kerberos, and replicates with its peers. Most DC work is multi-master: any writable DC can make a change and it replicates to the others. A few jobs cannot be multi-master, so they are assigned to single holders - the Flexible Single Master Operation (FSMO) roles:

```text
Schema master         (forest) the only DC that may change the schema
Domain naming master  (forest) adds and removes domains
RID master            (domain) hands out pools of relative IDs for SIDs
PDC emulator          (domain) time source, password-change priority,
                      account-lockout processing, GPO editing anchor
Infrastructure master (domain) maintains cross-domain references
```

Losing a FSMO holder is a planned-recovery event, not a crisis, but the PDC emulator matters most day to day (time and lockouts). A read-only domain controller (RODC) holds a read-only copy and, by default, caches no passwords - designed for branch offices and less physically secure sites, so that stealing the server does not hand over domain secrets.
