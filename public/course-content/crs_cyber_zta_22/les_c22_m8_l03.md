**Sequence initiatives by:**

| Term | Meaning |
|---|---|
| Dependency | posture-based policy needs a device inventory first; enforcement needs decision logging first (to see what it breaks); per-tenant keys need classification first. |
| Risk reduction | early phases address the largest risks found in the threat model - typically phishing-resistant MFA for administrators and remote access, central logging, and segmentation of restricted data. |
| Capacity | teams can only change so much at once; a phase should be deliverable in a quarter or two. |
| Reversibility | start enforcement in monitor/audit mode, measure, then enforce (Course 21 Warn-then-Deny pattern). |

**A typical three-phase structure:**

| Term | Meaning |
|---|---|
| Phase 1 | foundations: identity hardening, device inventory, logging. |
| Phase 2 | enforcement: posture into policy, segmentation, data protection for restricted stores. |
| Phase 3 | coverage and automation: default-deny for all applications, automated response, architecture gates in CI. |
