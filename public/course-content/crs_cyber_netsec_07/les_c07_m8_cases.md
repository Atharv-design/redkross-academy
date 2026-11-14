## Verification over assumption in network assurance Context: a recurring lesson across network security assessments and audits is that controls believed to be in place are often misconfigured, shadowed or never verified - the firewall rule that a later rule shadows, the segmentation boundary that a forgotten flow crosses, the TLS endpoint still offering a deprecated protocol. Frameworks such as the CIS Controls and NIST guidance therefore stress not just implementing controls but continuously verifying them, and assessment methodologies require evidence (configuration review and testing) rather than attestation [C07-M08-R1][C07-M08-R2]. Why it matters for this module: a network security assessment that only asks "do you have a firewall?" misses the misconfiguration that makes it ineffective. Verifying each control with a repeatable check - and showing the before/after - is what turns a review into assurance. The lab embodies this: every claim is backed by a re-runnable tool output. Lessons: verify, do not assume; produce evidence, not attestation; make checks repeatable; and review every layer, because defence-in-depth fails at its weakest verified link.



## (FICTIONAL TEACHING SCENARIO): Himalaya Retail's network assurance review

**Context:** Himalaya Retail (fictional) commissioned a network security assessment of its own environment, modelled by the lab assets, covering the design, firewall policy, segmentation, TLS and flow telemetry.

**What happened:** the review found the firewall policy had no default-deny and an any-any rule (four findings, one HIGH); segmentation allowed three forbidden flows (user->db, internet->db, user->mgmt); the TLS config offered TLS 1.0/1.1 and weak ciphers with a near-expiry certificate (six findings); and the flow telemetry showed a port scan and a beaconing workstation. None of this was visible from "we have a firewall and HTTPS" - it took verification to find.

**Response:** the team hardened each enforcing control (default-deny firewall with egress filtering; zero-trust segmentation enforced; TLS 1.2+ with strong ciphers and a renewed certificate), re-ran every check to confirm zero findings, and opened an incident for the beaconing host. review.py documented 3/3 enforcing controls moving FAIL->PASS with evidence, plus the monitoring signals and their containment.

**Lessons:** review every layer; verify with repeatable checks; harden and re-verify; and treat telemetry signals as live residual risk, not just policy notes.
