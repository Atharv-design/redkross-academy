| Term | Meaning |
|---|---|
| Searching | look for specific values or patterns (known IOCs, command line fragments). |
| Stacking | count occurrences of a value across the estate and examine the rare ones (least-frequent URLs in Module 3; parent-child pairs below). |
| Statistics | measure distributions: interval regularity, volume outliers, first-seen values. |
| Timeline | order everything for an entity to understand sequence. |
| Pivoting | move from one finding to related entities (host -> user -> other hosts of that user -> IPs). |

Execution-tested hunts (LAB_ASSETS/C08/hunt.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
H1 beaconing candidates (>= 8 requests, interval CV < 0.2)
  WS-104 https://cdn-telemetry-sync.example/api/v2/ping n=18
  mean_gap=300s cv=0.004
H2 parent-child pairs seen on only one host
  WINWORD.EXE -> powershell.exe hosts=1 n=1
H3 other hosts contacting known-bad domains
  none found
--------------------------------------------------------------- END OUTPUT
(execution-tested with CPython 3.14.4; one line wrapped)
```

H1 computes, for each host-URL series with at least eight proxy requests, the coefficient of variation (CV = standard deviation / mean) of the gaps between requests. The beacon's gaps average 300 seconds with CV 0.004 - almost perfectly regular. For comparison (execution-tested), the next most regular series in the dataset was WS-105 to maps.example.net with CV 0.345, and seven series met the eight-request minimum. Importantly, H1 does not use the intelligence feed: it would find a beacon to a domain nobody has reported. Real beacons often add jitter (random variation) to defeat this, so hunters also look at sizes, timing over longer periods and process attribution. H2 stacks process parent-child pairs: Word launching PowerShell appeared once on one host in the whole estate. Rarity is not proof of malice, but it narrows attention. H3 is a scoping hunt after the incident: no other host contacted the three bad domains - in this dataset. Note the limit: hosts that bypass the proxy, or used different infrastructure, would not appear.
