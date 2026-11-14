This course teaches network security as defence-in-depth: many layers that each do their part, built and verified using one offline lab you own - a design, a firewall policy, a segmentation matrix, a TLS configuration and synthetic flow telemetry for a fictional organisation. Every lab tool runs offline, with no network calls and no scanning; you review each control, harden it, and verify the hardening with a repeatable check.

Module 1 (Network defence architecture): defence-in-depth layers independent controls so no single failure is fatal. Define trust zones and a DMZ; place a public service in the DMZ, never on the internal network. The perimeter is necessary but not sufficient - assume breach and defend inside too (the basis for zero trust, Module 4).

**Module 2 (Firewall engineering):** a firewall enforces a policy on traffic crossing a boundary. Design for default-deny and least privilege; filter egress, not just ingress; avoid any-any and shadowed rules; keep rules ordered and documented. The lab's firewall.py lints a policy for exactly these flaws (4 findings, 1 HIGH, on the pre-hardening policy; 0 when hardened). Reference: NIST SP 800-41 Rev.1.

Module 3 (IDS and IPS): intrusion detection (IDS) alerts; intrusion prevention (IPS) blocks inline. Signature detection catches known patterns; anomaly detection catches deviations. Tune to reduce false positives so real alerts are actionable, and place sensors where they see the traffic that matters.

**Reference:** NIST SP 800-94.

**Module 4 (Segmentation):** divide the network into segments and allow only the flows a zero-trust matrix explicitly permits; deny by default and verify identity rather than trusting the internal network. Segmentation limits lateral movement and contains incidents. The lab's segmentation.py tests connections against the matrix (3 violations: user->db, internet->db, user->mgmt).

**Reference:** NIST SP 800-207.

**Module 5 (Secure connectivity):** protect data in transit with strong TLS and VPNs. TLS 1.0/1.1 are deprecated (RFC 8996); use TLS 1.2+ with strong ciphers, RSA keys >= 2048 bits, and valid certificates. The lab's tlscheck.py reviews a TLS config for these (6 findings -> 0 when hardened). References: RFC 8446 (defined TLS 1.3), NIST SP 800-52 Rev.2.

**Module 6 (Wireless defence):** secure Wi-Fi with WPA2/WPA3; prefer WPA3-SAE and 802.1X Enterprise over a shared PSK; detect and remove rogue and evil-twin APs; segment the WLAN. WEP and WPA(TKIP) are broken. Reference: NIST SP 800-153.

Module 7 (Monitoring and response): flow telemetry (NetFlow/IPFIX, RFC 7011) gives scalable, privacy-preserving visibility; packet capture gives deep detail. Flow data reveals scans, beaconing (C2) and policy violations behaviourally. Contain at the network layer: isolate the host, block the flow, cut the segment, preserve evidence. The lab's flowcheck.py finds 1 scan, 1 beacon and 3 segmentation violations in 186 records.

Module 8 (Verification and capstone): a network security assessment reviews every layer and reports status + evidence per layer. Verify each enforcing control with a repeatable check; harden and re-verify to zero. review.py shows 3/3 enforcing controls moving FAIL->PASS (firewall 4->0, segmentation 3->0, TLS 6->0) plus the telemetry signals. Evidence over attestation.

**Key control-to-standard map (lab):** firewall policy -> NIST SP 800-41 Rev.1; segmentation/zero trust -> NIST SP 800-207; IDS/IPS -> NIST SP 800-94; TLS -> RFC 8996 + NIST SP 800-52 Rev.2; wireless -> NIST SP 800-153; flow telemetry -> RFC 7011.
