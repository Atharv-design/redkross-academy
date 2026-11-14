**Pipeline stages:** source -> collection (agent, syslog, API pull, WEF) -> transport (encrypted, buffered) -> parsing/normalisation -> storage (hot for search, cold for retention) -> analytics.

**Design requirements:** reliability (buffering so outages do not lose data), integrity (TLS transport, restricted write access, tamper evidence), completeness monitoring (alert when a source goes silent), time synchronisation, retention (180 days in India for covered entities, longer where policy requires), privacy (minimise personal data; DPDP Act duties), cost (volume-based licensing tempts teams to drop sources - decide by risk).

**Coverage assessment:** map sources to assets and ATT&CK techniques (Module 6; Course 20 Module 1).
