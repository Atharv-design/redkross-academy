LAB_ASSETS/C14/ioc_pipeline.py reads data/feed_isac.csv, feed_vendor.csv and feed_free.csv (18 rows) and matches against data/proxy_log.jsonl (1,808 events on 2026-10-28). Output (execution-tested, CPython 3.14.4, 2026-11-07; m05_ioc_output.txt, abridged):

```output
$ python ioc_pipeline.py --naive
naive: 15 unique values, no ageing, no allowlist
Proxy-log matches: 81 events on 5 indicators
   update.microsoft.com                 43 events, 33 users ...
   192.0.2.10                           30 events, 22 users ...
   198.51.100.77                         6 events,  1 users (u017)
   nilgiri-policy-renewal.example        1 events,  1 users (u017)
   https://nm-invoice-share.example/inv/2026-10.iso (host)  1 events ...

$ python ioc_pipeline.py
managed: 11 unique IOCs after merge; 4 rows dropped:
   drop 8.8.8.8 (free): allowlist: public DNS resolver
   drop update.microsoft.com (free): allowlist: vendor update service
   drop d41d8cd98f00b204e9800998ecf8427e (free): MD5 of an empty file
   drop 192.0.2.10 (vendor): allowlist: shared hosting for many unrelated
     sites (see M03 pivot)
active (score >= 40): 10
   ACTIVE  ipv4   198.51.100.77          score  90.9 age   1d feeds
                                         free,isac,vendor
   ACTIVE  domain portal-nilgiri-claims.example  score 90.0 age -1d
   ... (8 more active)
   expired ipv4   203.0.113.200          score   0.0 age 360d feeds free
Proxy-log matches: 8 events on 3 indicators
   198.51.100.77                         6 events,  1 users (u017)
   nilgiri-policy-renewal.example        1 events,  1 users (u017)
   https://nm-invoice-share.example/inv/2026-10.iso (host)  1 events ...

$ python ioc_pipeline.py --asof 2026-12-15
active (score >= 40): 2         (the two SHA-256 hashes)
Proxy-log matches: 0 events on 0 indicators
```

**Interpretation:**

- 73 of the 81 naive alerts came from a vendor update service and a shared hosting address - 33 and 22 users respectively. The managed run keeps all 8 real events and nothing else, all from one user and workstation (u017, 10.40.3.57): a clear incident lead (Module 4, E3).
- Each dropped row is logged with its reason, so the allowlist itself can be reviewed.
- The 10:12 visit to nilgiri-policy-renewal also went to 198.51.100.78, and the 10:15 download went to 203.0.113.45; the fixed matcher counts each event once, under the first matching field.
- Ageing does the clean-up automatically.

**Limitations:** the half-lives, threshold and allowlist are illustrative; the first version's double counting and URL miss are preserved in m05_ioc_output_v1_doublecount.txt as a reminder to test matchers.
