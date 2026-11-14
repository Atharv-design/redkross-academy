A pivot follows a shared attribute from one indicator to others. Rules that keep clusters honest:

1. Weight edges: same certificate fingerprint or the same non-redacted registrant identifier are strong; a shared dedicated address in the same time window is medium; a shared name server, a shared CDN or shared hosting address, or the same free CA are weak.
2. Limit fan-out: do not pivot through a node that connects to many domains (the lab uses more than six) - it is shared infrastructure.
3. Use time windows: ignore records that predate the campaign (the lab uses 1 September 2026).
4. Never pivot on "redacted for privacy" or other dummy values.
5. Record every edge with its evidence, and re-check a sample manually.

infra_pivot.py implements both modes. The naive mode followed every edge; the disciplined mode skipped the name server (11 domains) and the four long-established tenants of the shared address (deep dive). Note that the disciplined cluster still lists 192.0.2.10 as related infrastructure - a lure was briefly hosted there - but nothing else on it belongs to the campaign.
