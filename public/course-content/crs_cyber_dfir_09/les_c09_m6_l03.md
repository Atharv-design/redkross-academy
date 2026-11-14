A full packet capture (pcap or pcapng) is the most complete network evidence: every byte, with timestamps from the capturing host. It shows who talked to whom, when, how much, and, if unencrypted, what was said. Treat a pcap like any other evidence: hash it at collection, record the capture point (which interface and which side of NAT), the capture filter, and the sensor's clock source. Execution-tested lab (LAB_ASSETS/C09/rk_c09_net_lab.sh). An isolated Docker network contained a web server at 172.31.0.10 and a client at 172.31.0.20. tcpdump ran in the server's network namespace while the client downloaded a fictional file and then requested a missing one. Analysis used tshark 4.2.5 in a throwaway container:

```text
------------------------------------------------------------- BEGIN OUTPUT
Number of packets:   25
First packet time:   2026-11-07 05:51:40.339734
Last packet time:    2026-11-07 05:51:40.966231
-- HTTP requests and responses
Nov  7, 2026 05:51:40.339854000 UTC 172.31.0.20 172.31.0.10 GET
  /backup/customers.csv rk-backup-agent/1.0
Nov  7, 2026 05:51:40.342399000 UTC 172.31.0.10 172.31.0.20 200
Nov  7, 2026 05:51:40.965463000 UTC 172.31.0.20 172.31.0.10 GET
  /backup/missing.zip curl/8.23.0
Nov  7, 2026 05:51:40.966163000 UTC 172.31.0.10 172.31.0.20 404
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; fields from tshark -T fields; wrapped)
```

**Observations:**

- Each request and its response are visible with microsecond times, source and destination, method, URI and user agent.
- The first request's user agent "rk-backup-agent/1.0" was set by the client with curl -A. User agents are client claims and trivially forged. The second request shows curl's default agent. The same IP using two different agents within a second is worth noting.
- The server answered 200 and then 404. A probe for a file that does not exist is a common sign of guessing or scripted collection.
