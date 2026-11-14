Execution-tested queries (python minisiem.py search "..."):

```text
---------------------------------------------------------------- BEGIN CODE
SELECT host, COUNT(*) n, COUNT(DISTINCT url) urls FROM events
 WHERE source='proxy' GROUP BY host ORDER BY n DESC LIMIT 3
------------------------------------------------------------------ END CODE
```

```text
------------------------------------------------------------- BEGIN OUTPUT
host | n | urls
WS-104 | 49 | 9
WS-108 | 40 | 6
WS-103 | 37 | 6
--------------------------------------------------------------- END OUTPUT
```

WS-104 (user divya, finance) has the most proxy events and the most distinct URLs - worth a look.

```text
---------------------------------------------------------------- BEGIN CODE
SELECT ts, source, event_id, outcome FROM events
 WHERE user='divya' AND source!='proxy' ORDER BY ts
------------------------------------------------------------------ END CODE
```

```text
------------------------------------------------------------- BEGIN OUTPUT
2026-11-03T03:18:00Z | windows | 4624 | success
2026-11-03T06:14:00Z | sysmon | 1 | None
2026-11-03T06:42:21Z | vpn | None | failure
2026-11-03T07:02:00Z | windows | 4720 | success
2026-11-03T07:03:00Z | windows | 4732 | success
2026-11-03T08:17:00Z | windows | 1102 | success
--------------------------------------------------------------- END OUTPUT
(four routine Sysmon events between 03:29 and 05:14 omitted)
```

**Reading it:** a normal morning logon at 03:18 UTC (08:48 IST); a process event at 06:14; a failed VPN login for divya at 06:42 (but she is in the office - someone else may be trying her account); then user creation (4720), addition to a local group (4732) and an audit log clear (1102). Each event alone could be explained; together they form a pattern. Modules 3-4 confirm it.
