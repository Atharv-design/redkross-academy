Bluetooth is a short-range wireless technology with two main flavours:

| Term | Meaning |
|---|---|
| BR/EDR (Classic) | Basic Rate / Enhanced Data Rate - higher throughput, used for audio, file transfer and legacy peripherals. |
| BLE (Low Energy) | introduced in Bluetooth 4.0 - low power, used by wearables, sensors, beacons and IoT; it has its own pairing and security model. |

Devices discover each other, pair (establish keys), bond (store those keys for future connections), and then communicate over encrypted links. Bluetooth versions matter for security: older versions and legacy pairing have weaker key agreement; Bluetooth 4.2 introduced LE Secure Connections (ECDH-based key agreement). NIST SP 800-121 Rev.2 is the authoritative guide, covering Bluetooth versions 1.1 through 4.2 and their security mechanisms [R1]. The defender's job is to ensure devices use the strongest pairing and key agreement their hardware supports and are hardened against discovery and impersonation.
