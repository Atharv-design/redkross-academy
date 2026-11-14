Pairing establishes the keys that protect a Bluetooth link, and the ASSOCIATION MODEL determines whether it resists a man-in-the-middle (MITM):

| Term | Meaning |
|---|---|
| Just Works | no user interaction and NO MITM protection - an attacker in range can interpose during pairing. Used when a device has no input/output (e.g. a headset), but it is the weakest. |
| Numeric Comparison | both devices show a number and the user confirms they match - provides MITM protection (needs a display on both). |
| Passkey Entry | the user enters a passkey shown on the other device - provides MITM protection (needs input on one, display on the other). |
| Out Of Band (OOB) | keys exchanged via another channel (e.g. NFC) - MITM protection depending on the OOB channel. |

**The security rule:** use an AUTHENTICATED association model (Numeric Comparison, Passkey Entry or OOB) wherever the devices' input/output allows; "Just Works" gives no MITM protection and should be avoided for anything sensitive. The lab flags "Just Works" as a HIGH finding.
