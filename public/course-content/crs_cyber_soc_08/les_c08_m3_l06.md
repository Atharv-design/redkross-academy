Dashboards should answer operational questions: open alerts by severity and age; top rules by volume (tuning candidates); log-source health (last event time per source); authentication failures over time; unusual outbound data.

**Execution-tested hourly volume:**

| Term | Meaning |
|---|---|
| hour_utc 03:28 | 04:65  05:34  06:47  07:38  08:33  09:26  10:25  11:32 |
| 12:11 | 13:1 |

A volume chart shows activity, not threat: the 06:00 bucket contains the intrusion but is not visibly unusual. Dashboards support awareness; detection comes from rules and hunting.

**Health checks:** per-source ingestion rates, parse error counts, indexing lag, license/storage headroom, failed correlation searches, clock skew.
