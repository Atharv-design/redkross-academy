The Diamond Model of Intrusion Analysis (Caltagirone, Pendergast and Betz, 2013) describes every event with four core features - adversary, capability, infrastructure and victim - and meta-features: timestamp (start and end), phase, result, direction, methodology and resources [R1]. Edges between the features invite pivots ("which other victims did this infrastructure touch?"), and events linked in sequence form activity threads.

MONSOON LANTERN as Diamond events (from the lab data):

```text
E1 2026-09-20..28  adversary: unknown; capability: domain registration
   and certificate issuance; infrastructure: six lookalike domains, one
   shared certificate; victim: Nilgiri brand
E2 2026-10-02..03  capability: ISO lure with shortcut file starting
   PowerShell (RPT-001); infrastructure: lure domains, 198.51.100.77;
   victim: insurer staff (sector)
E3 2026-10-28 10:12-10:55  capability: lure page, payload download,
   HTTPS POSTs; infrastructure: nilgiri-policy-renewal (198.51.100.78),
   203.0.113.45, 198.51.100.77; victim: user u017, 10.40.3.57; result:
   contact confirmed (proxy log), compromise not yet confirmed
```

The adversary vertex stays "unknown" - which is correct.
