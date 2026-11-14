Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A BLE medical sensor uses Just Works pairing and LE legacy pairing, and is always discoverable.

**Task:** List the findings and the hardened configuration.

> [!TIP] Model answer
> **Findings:** Just Works association (no MITM protection - use Numeric Comparison or Passkey Entry if the devices have I/O); LE legacy pairing (keys recoverable - enable LE Secure Connections); always discoverable (make it on-demand/limited); likely also a default PIN and small key size. Hardened config: an authenticated association model, LE Secure Connections (ECDH), on-demand limited discovery, no fixed PIN, the maximum key size, current firmware, and reviewed bonds.
>
> **Lesson:** replace Just Works/legacy/always-discoverable with authenticated pairing, Secure Connections and on-demand discovery.

## Scenario 2

A headset has no display or input.

**Task:** Explain the pairing trade-off and how to reduce the risk.

> [!TIP] Model answer
> A headset with no display or input cannot do Numeric Comparison or Passkey Entry, so it may have to use Just Works, which gives no MITM protection. Reduce the risk: still require LE Secure Connections (so the link resists passive eavesdropping), pair only in a controlled environment/time window (limit the chance of an attacker being present during pairing), keep the device discoverable only on demand, use the maximum key size, and keep firmware patched. Prefer OOB pairing if the hardware supports it.
>
> **Lesson:** where Just Works is unavoidable, mitigate with Secure Connections, controlled pairing, limited discovery and large keys.

## Scenario 3

An organisation ignores Bluetooth in its security programme.

**Task:** Explain the threat surface they are missing and the review approach.

> [!TIP] Model answer
> They are missing a real attack surface: Bluetooth peripherals and BLE IoT devices that may pair insecurely (Just Works/legacy), stay discoverable, ship default PINs, or use small keys - enabling eavesdropping, MITM, impersonation and downgrade by anyone in range. The review approach is the same discipline as Wi-Fi: inventory Bluetooth devices, review each configuration against NIST SP 800-121 Rev.2 (association model, Secure Connections, discoverability, PIN, key size, bonds), harden, and re-review - all offline.
>
> **Lesson:** Bluetooth is a genuine attack surface; apply configuration-review discipline against SP 800-121.
