Every access request carries an identity: a user, a device, a service, or a combination. If identity verification and policy are strong and consistently enforced, network location matters less; if identity is weak, no network control fully compensates. Consequences for architecture:

- one authoritative identity source with consistent policy across apps;
- every application integrated with the IdP (no local password stores);
- identity signals (risk, device posture, session age) used in decisions;
- identity infrastructure itself treated as tier-0 (Module 1 management plane): its admins, signing keys and federation trusts are the most valuable targets (the Storm-0558 signing key case, Courses 01, 15).
