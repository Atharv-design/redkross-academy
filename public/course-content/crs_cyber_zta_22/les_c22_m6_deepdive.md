Target design that turns the 16 findings into 0:

1. Sources: all seven telemetry types forwarded to the central platform, including the PDP decision log (decision, reasons, policy version, session ID, device ID) and KMS audit events.
2. Pipeline: two collectors in different sites, TLS from sources, disk buffering at the source for at least 24 hours of outage.
3. Store: immutable retention for 365 days (above the 180-day CERT-In minimum), administered by the security operations team, not by the platform teams whose systems are logged.
4. Health: heartbeat per source and an alert when any source is silent for more than 10 minutes (the M1 signal).
5. Time: all sources on approved NTP servers; clock drift alarms.
6. Failure modes: shipment-portal-admin and payroll-app fail closed, each with a documented break-glass path; intranet uses cached decisions for at most 15 minutes.
7. Recovery: immutable backups for wms-core, restore tested at 10 hours against a 12-hour RTO; identity configuration restore drilled to 3 hours against a 4-hour RTO.
8. Response: a responder tenant with separate identities and FIDO2 keys, an out-of-band communication channel, and pre-written runbooks for the five monitoring signals M1-M5.
9. Verification: resilience_review.py on telemetry_arch_fixed.json shows 0 findings; each monitoring signal is tested with generated telemetry before go-live (Module 7).
