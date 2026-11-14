```text
Golden ticket (T1558.001): an attacker who has stolen the krbtgt account's
key can FORGE a TGT for any user with any group membership, because the
TGT is encrypted with the krbtgt key (Module 2). This is full, durable
domain control. It is a POST-compromise technique (you must already own a
DC or its secrets), which is why protecting DCs and krbtgt is paramount,
and why recovery from DC compromise requires rotating krbtgt twice.
Silver ticket (T1558.002): an attacker with a single service account's key
forges service tickets for that one service, bypassing the KDC. Narrower
than a golden ticket but stealthier (no KDC interaction). Control: protect
and rotate service-account keys; AES; monitor.
```

The lesson for defenders is the ranking: krbtgt is the crown jewel (Module 2); its compromise means forest-level recovery (Module 1 CS1). These are not things to "detect and move on" from - they define the recovery plan.
