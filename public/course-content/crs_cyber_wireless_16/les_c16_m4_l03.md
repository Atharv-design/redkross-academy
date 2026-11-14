For BLE, the KEY AGREEMENT method is as important as the association model:

| Term | Meaning |
|---|---|
| LE LEGACY PAIRING | older BLE pairing with a weak key-agreement scheme; the temporary key can be brute-forced, undermining the link. |
| LE SECURE CONNECTIONS | introduced in Bluetooth 4.2; uses ECDH (elliptic-curve Diffie-Hellman) for strong key agreement, resistant to passive eavesdropping and, with an authenticated association model, to MITM. |

The defender requires LE Secure Connections wherever supported; legacy pairing is a high-severity weakness because its keys can be recovered. Similarly, BR/EDR has Secure Simple Pairing and, in later versions, Secure Connections. The principle is the same across both: use the strongest key agreement the hardware supports and treat legacy modes as findings. The lab flags LE legacy pairing as HIGH and expects LE Secure Connections.
