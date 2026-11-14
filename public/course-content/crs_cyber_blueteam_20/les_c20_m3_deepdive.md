Part 1 - LAB_ASSETS/C20/netdetect.py (execution-tested, CPython 3.14.4) on tamarind_telemetry.jsonl:

```output
== Part 1: DNS per client
client       queries nxdomain    txt max_label
10.20.1.17      107        1     82        28  <== review
10.20.1.16       25        1      0         7
10.20.1.22       25        1      0         7
...
Registered domains by number of distinct names queried (top 3):
  cdn-sync.example             82 distinct names
  tamarind.example             4 distinct names
  vendor-a.example             1 distinct names

== Part 2: connection regularity (pairs with >= 10 connections)
src          dst             dport  count  mean_gap     cv median_out
10.20.1.17   198.51.100.23     443     83      297s  0.083        452  <== regular

== Part 3: largest outbound transfers
  01:00:00 10.20.5.10   -> 10.20.5.20      :445  out=  900000000 in=  40000 internal
```

Only one pair has 10 or more connections, because the benign browsing in the dataset is spread across many destinations. Real networks will show many regular pairs, which is why an allowlist of known services is part of this analytic. Note that Part 3 lists only the four largest flows, all of them the internal backup. The 312 MB external flow from 10.20.1.17 is seventh, behind six 900 MB backup flows. A "top N" view without internal and external context hides the interesting transfer, so improving the report is exercise P1 step 4.

Part 2 - Suricata 8.0.8 (jasonish/suricata container) against rk_c09_lab.pcap (sha256 6e2cf6fe84d9c063...a21) with LAB_ASSETS/C20/ids/local.rules:

```text
BEGIN CODE
docker run --rm --entrypoint sh -v "<abs path>/ids:/work" jasonish/suricata:latest \
  -c "suricata -T -S /work/local.rules -l /work/out; \
      suricata -r /work/rk_c09_lab.pcap -S /work/local.rules -l /work/out -k none"
END CODE
```

```output
i: suricata: Configuration provided was successfully loaded. Exiting.
== fast.log
[1:9200001:1] RK-LAB backup directory download over HTTP ... 172.31.0.20:58362 -> 172.31.0.10:80
[1:9200001:1] RK-LAB backup directory download over HTTP ... 172.31.0.20:58350 -> 172.31.0.10:80
[1:9200002:1] RK-LAB custom agent user-agent observed ... 172.31.0.20:58350 -> 172.31.0.10:80
[1:9200003:1] RK-LAB HTTP 404 response from internal web server ... 172.31.0.10:80 -> 172.31.0.20:58362
== eve.json event types: {'alert': 4, 'fileinfo': 2, 'flow': 2, 'http': 2, 'stats': 1}
```

**Notes from testing:**

- The image's entrypoint is the suricata binary, so running a shell requires --entrypoint sh. The first attempt without it printed the usage text.
- "-k none" disables checksum validation, which is needed for captures taken where offload left checksums unset.
- The order of fast.log lines differed between two runs (the engine is multi-threaded); always sort by timestamp before building a timeline.
- The log directory must exist before Suricata starts.
