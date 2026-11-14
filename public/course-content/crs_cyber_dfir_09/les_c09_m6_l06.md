A super-timeline merges host and network sources in one time zone (UTC). LAB_ASSETS/C09/timeline.py combines a synthetic auth.log (classic syslog, no year: the script supplies 2026 as a documented assumption), a synthetic web access log with an explicit +0000 offset, and the real HTTP request times from the lab pcap. Execution-tested output:

```text
------------------------------------------------------------- BEGIN OUTPUT
2026-11-07T05:49:12.000Z  auth.log    Accepted publickey for deploy from
                                      172.31.0.20 port 50122 ssh2
2026-11-07T05:50:03.000Z  auth.log    deploy : TTY=pts/0 ; PWD=/home/deploy
                                      ; USER=root ; COMMAND=/usr/bin/cp
                                      /var/l...
2026-11-07T05:51:40.000Z  access.log  GET /backup/customers.csv HTTP/1.1
                                      -> 200
2026-11-07T05:51:40.000Z  access.log  GET /backup/missing.zip HTTP/1.1
                                      -> 404
2026-11-07T05:51:40.339Z  pcap        GET /backup/customers.csv
                                      UA=rk-backup-agent/1.0
2026-11-07T05:51:40.965Z  pcap        GET /backup/missing.zip UA=curl/8.23.0
2026-11-07T05:52:30.000Z  auth.log    Disconnected from user deploy
                                      172.31.0.20 port 50122
--------------------------------------------------------------- END OUTPUT
(execution-tested, CPython 3.14.4; wrapped; the auth.log and access.log
lines are synthetic, the pcap times are from the real capture)
```

**Reading the story:**

1. 05:49:12 account deploy logs in by SSH key from 172.31.0.20.
2. 05:50:03 deploy uses sudo to copy customers.csv into /srv/backup, the directory served by the web server (staging).
3. 05:51:40 the same IP downloads the file over HTTP (access log and pcap agree; carved hash matches) and probes for missing.zip.
4. 05:52:30 the SSH session ends.

**Correlation details:**

- The access log has one-second resolution and the pcap has microseconds, so "05:51:40.000" in the access log and "05:51:40.339" in the pcap are the same event, not two. Match on IP, URI and response, not only time.
- Sort order within the same second depends on the sources' precision; do not infer sequence from ordering inside one second.
- If one source were an hour off (time-zone error), the story would break: the download would appear before the copy. Check offsets before interpreting order.
