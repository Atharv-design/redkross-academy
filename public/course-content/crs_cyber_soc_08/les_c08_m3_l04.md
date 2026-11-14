Every SIEM language supports the same operations, shown here in SQL with rough equivalents:

| Term | Meaning |
|---|---|
| Filter | WHERE source='vpn' AND outcome='failure' (SPL: source=vpn outcome=failure; KQL: &#124; where ...) |
| Aggregate | GROUP BY src_ip, COUNT(DISTINCT user) (SPL: stats dc(user) by src_ip; KQL: summarize dcount(user) by src_ip) |
| Sort/limit | ORDER BY n DESC LIMIT 10 |
| Time bucket | substr(ts,12,2) for hours (SPL: bin _time span=1h) |
| Join | combine related events (correlation, L05) |

**Good practice:** start broad then narrow; always constrain time; save queries in case notes; beware of case sensitivity and missing fields. Execution-tested least-frequent URL query ("stacking", used again in Module 8):

```text
SELECT url, COUNT(*) n FROM events WHERE source='proxy' GROUP BY url
ORDER BY n ASC LIMIT 4
-> invoice.docm on banyan-payroll-update.example (1), upload on
   files-share-drop.example (1), cdn-telemetry-sync.example ping (18),
   crm.banyan.example (37)
```

Rare values deserve attention; very regular ones (the 18 pings) may be automated - benign or malicious.
