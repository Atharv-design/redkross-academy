```text
Stacking (frequency analysis)  count values across the population and
          examine the rare ones: parent->child pairs, task commands,
          services, autoruns. Attackers are usually rare in a
          well-managed estate.
Baselining  learn normal values per user, host or role (which accounts
          log on to FS-01, which admins run PowerShell, at what hours)
          and look for departures. The joint LOTL guidance recommends
          baselining the normal command lines and users of LOLBins,
          and alerting on use outside the baseline [R1].
Time-window correlation  join events from different sources within a
          short window on the same entity (DNS query then connection;
          failures then success).
Pivoting  from one finding, search for the same indicator or behaviour
          elsewhere (other hosts with the same task name; other clients
          querying cdn-sync.example).
```

**Rarity is not malice:** the single ADM-01 explorer -> PowerShell pair is an administrator. Every rare item needs context before it becomes a finding.
