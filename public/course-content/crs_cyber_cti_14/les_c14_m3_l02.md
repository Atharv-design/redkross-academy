Passive DNS databases record resolutions observed by sensors (typically at recursive resolvers), building history: which names pointed to which addresses, when first and last seen, and how often. They answer questions

**DNS itself cannot:** "what else has resolved to this address?" and "what did this name point to last month?"

**Read it with care:**

- first_seen/last_seen describe observations by the database's sensors, not the true lifetime of a record;
- counts reflect the sensors' user populations;
- absence of data is not proof of absence;
- a long-lived record on an address (the bakery site on 192.0.2.10 since 2026-06-15, the tiffin service since 2024) is context: established, probably unrelated tenants of shared hosting.

In the lab, pdns.jsonl holds 62 observations covering the campaign domains, five sites on one shared hosting address and 40 background sites.
