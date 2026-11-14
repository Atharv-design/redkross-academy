Wi-Fi (IEEE 802.11) is a set of standards for wireless local-area networking over radio. Key concepts:

| Term | Meaning |
|---|---|
| bands/channels | Wi-Fi operates in unlicensed radio bands (2.4 GHz, 5 GHz, and newer 6 GHz), each divided into CHANNELS. Devices on the same channel share the airtime; overlapping channels interfere. |
| SSID | the network name an access point advertises (e.g. "HimalayaCorp"). It identifies the network, not a security boundary - multiple APs serve the same SSID. |
| BSSID | the MAC address of a specific access-point radio - the unique identifier of one physical AP on a network. (One SSID, many BSSIDs.) |
| standards | 802.11a/b/g/n/ac/ax (Wi-Fi 6) and beyond define speeds and features; security amendments (802.11i for WPA2, 802.11w for management-frame protection) define protection. |

The crucial property is that radio is a SHARED, BROADCAST medium: transmissions propagate through space to anyone in range. This single fact drives the entire wireless threat model (L04) [R1].
