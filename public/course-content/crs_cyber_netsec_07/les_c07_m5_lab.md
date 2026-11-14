> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Review and harden the lab's TLS configuration

**Objective:** Find the TLS weaknesses in the pre-hardening configuration and confirm the hardened one passes, offline.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (tlscheck.py, data/tls_config.json, data/tls_config_fixed.json).

**Prerequisites:** Lessons L02-L05.

**Environment setup:** none (offline; no server connection).

**Explicit authorised scope:** offline configuration documents only.

**Step-by-step instructions:**

1. Run python tlscheck.py and record the five HIGH findings and the MEDIUM.
2. For each HIGH, state the fix (disable deprecated protocol, remove weak cipher, strengthen key).
3. Run python tlscheck.py --config data/tls_config_fixed.json and confirm 0 findings.
4. Compare the protocol and cipher lists of the two configurations.
5. Explain why reviewing configuration is safe and does not require scanning a live server.

**Expected observations (execution-tested):** pre-hardening has 5 HIGH (TLS 1.0/1.1, RC4, 3DES, 1024-bit key) and a near-expiry MEDIUM; hardened has 0.

**Troubleshooting:** if a HIGH persists in the hardened file, check the protocol and cipher lists.

**Cleanup:** none.

**Learning outcome:** you can review and harden a TLS configuration offline.

## Practical 2: Design remote access controls

**Objective:** Specify secure remote access for the lab organisation.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L01, L06.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. Choose a VPN/ZTNA approach and justify it.
2. Specify authentication (phishing-resistant MFA) and least-privilege access after connection (tie to segmentation).
3. Add device posture, session timeout, logging and de-provisioning.
4. Explain why a VPN alone (flat access) is insufficient.

**Expected observations:** strong authentication, least-privilege post-connection access, monitoring, and lifecycle controls.

**Troubleshooting:** if your design grants flat network access after connecting, add least-privilege/zero-trust access.

**Cleanup:** none.

**Learning outcome:** you can design secure remote access controls.
