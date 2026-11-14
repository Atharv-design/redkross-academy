defence-in-depth  layering independent controls so one failure is not fatal. trust zone  a network area of a defined trust level (e.g. internal, DMZ). DMZ  a segment for public-facing services, isolated from the internal network. default-deny  deny all traffic except what is explicitly allowed. egress filtering  controlling outbound as well as inbound traffic. shadowed rule  a firewall rule a prior rule prevents from ever matching. IDS / IPS  intrusion detection (alerts) / prevention (blocks inline). segmentation  dividing a network and allowing only explicitly permitted flows. zero trust  verify every flow by identity; do not trust the internal network

```text
(NIST SP 800-207).
```

lateral movement  an attacker moving between hosts inside the network. TLS  Transport Layer Security; encrypts data in transit (TLS 1.2+ only). flow telemetry  NetFlow/IPFIX metadata about conversations, no payload

```text
(RFC 7011).
```

beaconing  regular-interval contacts to a destination (C2 indicator). containment  limiting an incident's spread (isolate host, block flow, cut

```text
segment).
```

rogue / evil-twin AP  an unauthorised / impersonating wireless access point.
