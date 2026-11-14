## Revision

### Summary

Segmentation divides a network so a compromise in one part cannot spread freely. Mechanisms include subnets and VLANs (layer-2 separation), with firewalls/ACLs enforcing policy at the boundaries, and software-defined segmentation in cloud/virtual networks. Zero-trust segmentation (NIST SP 800-207) trusts no flow by default and permits only explicitly listed flows; micro-segmentation pushes the boundaries down to individual workloads. The enforceable artefact is an allowed-flow (segmentation) policy - a matrix of permitted (source, destination, port) flows, everything else denied. Segmentation most directly limits lateral movement and blast radius: it does not stop the initial compromise, but it decides whether that compromise becomes a breach. A design is only as good as its enforcement, so access-policy validation compares actual flows (telemetry or configuration) against the intended matrix and flags violations. The lab's validation finds 3 of 7 connections violate the matrix - user->db, internet->db and user->mgmt - each a forbidden boundary crossing and a lateral-movement path; the hardened firewall enforces their denial. Segmentation is assured by a closed loop: design the matrix, enforce it, validate it, and fix any gap.

### Important concepts

VLANs/subnets; zero trust and micro-segmentation; allowed-flow policy; access policy validation; lateral movement and blast radius; design-enforce-validate loop.

### Key technical takeaways

isolate sensitive tiers; default-deny inter-zone flows; permit only required flows; validate continuously against reality; treat any violation as a priority lateral-movement path.

### Glossary

```text
segmentation  dividing a network into isolated parts with controlled
        boundaries.
VLAN  a virtual LAN separating traffic at layer 2.
zero trust  trust no flow by default; permit only explicit flows.
micro-segmentation  segmentation down to individual workloads.
lateral movement  an attacker moving between hosts after a compromise.
```

### Common mistakes

flat networks; trusting the internal network; designing segmentation but not validating enforcement; allowing whole-zone flows where host-level would do; ignoring the management plane.

### Revision questions

​1. What does zero-trust segmentation deny by default? 2. How does segmentation limit blast radius? 3. Why validate segmentation against reality?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-207: Zero Trust Architecture" (assume breach, deny by default, explicit per-flow authorisation, micro-segmentation). URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-08. Supports: zero trust, allowed-flow policy, validation.
- [R2] NIST. "SP 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy" (segmentation and inter-zone control). URL: [https://csrc.nist.gov/pubs/sp/800/41/r1/final](https://csrc.nist.gov/pubs/sp/800/41/r1/final) Accessed: 2026-11-08. Supports: boundary enforcement, lateral-movement containment, CS1.
- [R3] MITRE. "ATT&CK: Lateral Movement (TA0008)". URL: [https://attack.mitre.org/tactics/TA0008/](https://attack.mitre.org/tactics/TA0008/) Accessed: 2026-11-08. Supports: lateral movement that segmentation limits.
- [R4] Lab evidence. segmentation.py validation output (3 of 7 connections violate the matrix) (CPython 3.14.4), LAB_ASSETS/C07/data/segmentation_output.txt, 2026-11-08. Supports: the deep-dive validation and violations.
