## Revision

### Summary

Network defence starts with architecture. Threat modelling identifies assets (the crown-jewel database), adversaries (external attacker, compromised internal host), entry points and the paths between them, so controls are placed where they matter. Trust zones (internet, DMZ, application, database, user, management) group systems by trust level; trust boundaries between them are where traffic is controlled and inspected. Defence in depth layers independent controls - perimeter and internal firewalls, IDS/IPS, host firewalls, strong remote/management authentication and monitoring - so no single failure is catastrophic, and monitoring sees what prevention misses. Least privilege (each zone reaches only what it needs) and default-deny (permit only listed flows) invert the dangerous "allow unless blocked" posture into "block unless allowed". The reference architecture makes the database reachable only from the application tier (and controlled management), keeps the DMZ from reaching the database directly, and isolates the management plane. Flat networks have a large blast radius; segmentation and zero trust contain compromise. The lab encodes this model as an enforced, monitored contract: validating observed connections against it reveals three forbidden crossings (user->db, internet-> db, user->mgmt).

### Important concepts

threat modelling; trust zones and boundaries; defence in depth; least privilege and default-deny; reference architecture; blast radius.

### Key technical takeaways

design zones and permitted flows first; make crown jewels reachable only where needed; default-deny; isolate management; layer independent controls and monitor boundaries.

### Glossary

| Term | Meaning |
|---|---|
| trust zone | a group of systems with similar trust level and purpose. |
| trust boundary | the controlled line between zones. |
| defence in depth | multiple independent layered controls. |
| least privilege | each zone/host reaches only what it needs. |
| default-deny | permit only explicitly allowed flows; deny the rest. |

### Common mistakes

flat networks; direct user/internet-to-database paths; exposed management plane; relying on the perimeter alone; allow-unless-blocked policies.

### Revision questions

​1. What should be the only paths to the database? 2. What does default-deny mean at the network layer? 3. Why isolate the management plane?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy" (network architecture, defence in depth, policy). URL: [https://csrc.nist.gov/pubs/sp/800/41/r1/final](https://csrc.nist.gov/pubs/sp/800/41/r1/final) Accessed: 2026-11-08. Supports: defence in depth, zones, default-deny.
- [R2] NIST. "SP 800-207: Zero Trust Architecture" (assume breach, least privilege, segmentation). URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-08. Supports: zones, least privilege, CS1 containment.
- [R3] NIST. "SP 800-41 Rev. 1" (default-deny firewall policy). URL: [https://csrc.nist.gov/pubs/sp/800/41/r1/final](https://csrc.nist.gov/pubs/sp/800/41/r1/final) Accessed: 2026-11-08. Supports: default-deny and least privilege at the network layer.
- [R4] Lab evidence. rk_segmentation.json zone model and the segmentation.py validation of observed connections (CPython 3.14.4), LAB_ASSETS/C07/data/, 2026-11-08. Supports: the deep-dive model and the three forbidden crossings.
