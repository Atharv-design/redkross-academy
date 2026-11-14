LAB_ASSETS/C08/minisiem.py (execution-tested):

| Term | Meaning |
|---|---|
| load() | creates table events with normalised columns (ts, source, event_id, host, user, src_ip, url, outcome, image, parent_image, bytes_out, target_user) plus raw JSON; inserts with parameterised executemany (no string-built SQL for data); creates an index on ts. |
| search() | runs an analyst-supplied SQL query - acceptable only because minisiem is a single-user teaching tool; a multi-user SIEM must restrict and sandbox queries. |
| rules() | runs saved correlation searches and prints hits. |

Keeping the raw event alongside normalised fields mirrors real SIEMs: parsed fields for speed, raw for evidence and re-parsing when formats change.
