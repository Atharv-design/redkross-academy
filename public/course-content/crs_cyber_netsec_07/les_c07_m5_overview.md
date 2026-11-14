## About this module

Connectivity that crosses untrusted networks - a remote worker reaching the office, a branch linking to headquarters, a browser reaching the web tier - must be protected in transit. This module covers VPN architecture, TLS and certificates, and remote access controls. You will review a TLS configuration for the lab's web edge with an offline tool, finding weak protocols, weak ciphers and a weak certificate, and compare it to a hardened configuration. Secure connectivity is where cryptography meets network design: the goal is confidentiality and integrity in transit, and authentication of the endpoints.

## Why it matters

Data in transit over untrusted networks is exposed to interception and tampering unless it is protected. A VPN extends a trusted boundary across an untrusted network; TLS protects application traffic and authenticates servers (and sometimes clients). But these protections fail quietly when misconfigured - a legacy TLS version, a weak cipher, an expired or weak certificate - leaving traffic exposed while appearing secure. Remote access, hugely expanded by distributed work, is also a prime attack target. Getting connectivity right - modern protocols, strong certificates, and controlled remote access - closes a major exposure.

## Where it is used

Remote-access and site-to-site VPNs; TLS on web and API endpoints; certificate management (issuance, renewal, revocation); remote-access gateways and zero-trust network access; and the configuration reviews that keep them strong.

## Learning objectives

1. Explain VPN architecture and common VPN technologies.
2. Explain TLS: what it protects and how certificates authenticate servers.
3. Identify weak TLS protocols, ciphers and certificates.
4. Review a TLS configuration against current guidance.
5. Explain remote access controls and their risks.
6. Harden the lab's TLS configuration and confirm it passes.

## Before you start

**Prerequisites:** Modules 1-2; Course 15 (cryptography) is complementary.

**Estimated study time:** About 9 hours.
