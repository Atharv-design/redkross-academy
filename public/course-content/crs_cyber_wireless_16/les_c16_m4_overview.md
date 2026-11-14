## About this module

Bluetooth and Bluetooth Low Energy (BLE) connect phones, peripherals, wearables and IoT devices over short-range radio - and each connection is a security decision. This module covers Bluetooth pairing and trust, BLE architecture, and device hardening, grounded in NIST SP 800-121 Rev.2 (Guide to Bluetooth Security). You will review a Bluetooth device configuration with btreview.py, watching a weak pairing setup fail and a hardened one pass.

## Why it matters

Bluetooth is everywhere and often overlooked. A device that pairs with "Just Works" (no authentication), uses legacy pairing, stays permanently discoverable, or ships a default PIN can be eavesdropped, impersonated or man-in-the-middled by anyone in range. As with Wi-Fi, the medium is broadcast and the defences live in the protocol - the association model, the key agreement (LE Secure Connections), discoverability and key size. Knowing these, and being able to review a device's configuration against them, lets a defender secure the Bluetooth attack surface that many organisations ignore.

## Where it is used

Securing Bluetooth peripherals and IoT; mobile and endpoint policy (which pairing modes are allowed); device hardening standards; and assessing wearables, medical devices and industrial sensors that use BLE. It is a growing part of the attack surface.

## Learning objectives

1. Explain Bluetooth and BLE architecture and versions.
2. Explain pairing association models and their MITM protection.
3. Explain LE Secure Connections versus legacy pairing.
4. List device-hardening settings (discoverability, PIN, key size, bonds).
5. Review a Bluetooth configuration and interpret findings.
6. Explain the Bluetooth threat surface and its defences.

## Before you start

**Prerequisites:** Module 1 (shared-medium threat model); basic crypto concepts.

**Estimated study time:** About 8 hours.
