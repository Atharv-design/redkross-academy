The report timeline is a curated subset of the super-timeline (Module 6): the events that matter to the questions, in UTC (with local time where deadlines or witnesses use it), each with its source item and artefact, and a note when an entry is interpretation rather than direct observation. Example (Tamarind web01 lab case):

| Term | Meaning |
|---|---|
| Time (UTC) | Event                                   Source |
| 05:49:12 | SSH public-key login, account deploy,   E3 (auth.log) from 172.31.0.20 |
| 05:50:03 | sudo cp of customers.csv to /srv/backup E3 (auth.log) (web-served directory) |
| 05:51:40.339854 | HTTP GET /backup/customers.csv from     E1, E3 172.31.0.20, response 200 |
| 05:51:40.965463 | HTTP GET /backup/missing.zip, 404       E1, E3 |
| 05:52:30 | SSH session ended                       E3 (auth.log) |

**State clock assumptions:** "auth.log has no year or zone; the host was configured for UTC (timedatectl output, item E5, not shown in the lab)". Keep the timeline factual. Analysis belongs in the findings.
