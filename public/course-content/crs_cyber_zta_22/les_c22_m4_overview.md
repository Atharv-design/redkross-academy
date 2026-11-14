## About this module

In a zero trust architecture the network is no longer the source of trust, but it remains a powerful containment and enforcement layer. Good network architecture limits what any foothold can reach (segmentation), concentrates inbound access through hardened, identity-aware gateways, encrypts traffic everywhere, and controls egress so stolen data and command channels have fewer paths out. This module designs segmentation from macro to micro, gateway patterns including ZTNA, encrypted connectivity, and egress control - and tests a three-tier segmentation in a Docker lab.

## Why it matters

Internet-facing network appliances - VPNs, remote-access gateways - have been repeatedly targeted. In 2024 CISA and partners reported that actors exploiting Ivanti Connect Secure gateways could deceive the vendor's integrity checker and might persist through factory resets (case study). Meanwhile flat internal networks turn one foothold into estate-wide reach (the British Library case, Module 1).

## Where it is used

Data-centre and cloud network design (VPCs/VNets, Course 11), branch and depot networks, OT/IoT isolation, remote access modernisation, service meshes in Kubernetes (Course 21).

## Learning objectives

1. Design macro- and micro-segmentation based on trust zones and flows.
2. Specify allow-list flow policies and verify them with tests.
3. Choose gateway patterns: reverse proxy, API gateway, ZTNA, bastion.
4. Design encrypted connectivity (TLS/mTLS, private links, VPN where still needed).
5. Control egress and DNS.
6. Reduce exposure of edge appliances and plan for their compromise.

## Before you start

**Prerequisites:** C22-M01 to C22-M03; Course 02; Course 11 Module 3.

**Estimated study time:** About 8 hours.
