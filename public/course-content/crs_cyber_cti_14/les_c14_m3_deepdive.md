LAB_ASSETS/C14/infra_pivot.py builds a graph from data/pdns.jsonl, data/certs.json and data/whois.json (registrant e-mails are stored only as truncated hashes) and walks it breadth-first from a seed. Output (execution-tested, 2026-11-07; m03_pivot_output.txt, abridged):

```output
$ python infra_pivot.py portal-nilgiri-claims.example --naive
Domains in cluster (10): bakery-kolhapur.example, claims-nilgiri-help.example,
nilgiri-policy-renewal.example, nilgirimutual-docs.example,
nm-invoice-share.example, portal-nilgiri-claims.example,
school-alumni.example, secure-nilgiri-login.example,
tiffin-service.example, yoga-classes-pune.example

$ python infra_pivot.py portal-nilgiri-claims.example
  dom:portal-nilgiri-claims.example -> cert:d2588691531e  [cert ... 2026-09-28]
  dom:portal-nilgiri-claims.example -> ip:198.51.100.77   [pDNS A 2026-10-03..
                                                          2026-10-14]
  dom:portal-nilgiri-claims.example -> reg:e944bfd07fe9045b [whois created
                                                          2026-09-20]
  cert:d2588691531e -> dom:claims-nilgiri-help.example (and three more)
  skip dom:bakery-kolhapur.example via ip:192.0.2.10 (record from 2026-06-15,
    before campaign window)
  ... (three more long-established tenants skipped)
  skip pivot on ns:ns1.cheap-dns-host.example (serves 11 domains: shared
    infrastructure)
  ip:203.0.113.45 -> dom:secure-nilgiri-login.example  [pDNS A 2026-10-09..]
Domains in cluster (6): claims-nilgiri-help.example,
nilgiri-policy-renewal.example, nilgirimutual-docs.example,
nm-invoice-share.example, portal-nilgiri-claims.example,
secure-nilgiri-login.example
```

Live context for example.com (m03_live_output.txt):

```output
DNS A/AAAA: 104.20.23.154, 172.66.147.243
TLS version: TLSv1.3
Certificate subject CN: example.com
Certificate issuer: SSL Corporation / Cloudflare TLS Issuing ECC CA 3
Valid: Sep 26 22:49:11 2026 GMT -> Dec 25 22:56:35 2026 GMT
Subject alternative names (2): example.com, *.example.com
RDAP registration: 1995-08-14T04:00:00Z
RDAP name servers: ELLIOTT.NS.CLOUDFLARE.COM, HERA.NS.CLOUDFLARE.COM
```

**Interpretation:**

- The naive cluster would have led to blocking a bakery, a yoga school, a tiffin service and an alumni site, and their customers' traffic.
- The certificate edge did most of the work; the shared dedicated address 203.0.113.45 (in the campaign window) found the sixth domain.
- The live lookup illustrates CDN context; your results will differ as the domain's hosting changes.

**Limitations:** the thresholds (fan-out 6, window start) are lab choices; real data needs tuning, and a determined actor can deliberately use shared services to frustrate pivoting. passive DNS coverage limits apply.
