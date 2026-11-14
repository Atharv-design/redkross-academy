| Term | Meaning |
|---|---|
| Principles | per-request evaluation; no network-location trust; least privilege with JIT for administrators; default deny; every decision logged. |
| Identity | one IdP; FIDO2 for administrators and restricted access; workload identity for services (M02, M05). |
| Devices | inventory and compliance baseline; EDR posture feeds the PDP; session revoked on posture loss (M03, M06). |
| Policy | PDP with versioned policy as code, unit-tested; PEPs at the access gateway, the service mesh and the admin portal; fail closed for restricted with break-glass (M03, M06). |
| Network | web/app/data segments; data tier with no internet egress; management network reachable only through the admin PEP (M04). |
| Data | four-level classification; CMKs with separated custody; field-level encryption for payroll; masked non-production data (M05). |
| Telemetry | seven sources, two collectors, immutable 365-day store, heartbeat alerts, monitoring signals M1-M5 (M06). |
| Assurance | traceability matrix in CI; design review gate; evidence age under 30 days for restricted systems (M07). |
| Roadmap | roadmap_fixed.json, three phases, nine initiatives, each with owner and validating requirement (L05). |
