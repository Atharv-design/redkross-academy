Wi-Fi Protected Access is the family of security certifications for Wi-Fi:

| Term | Meaning |
|---|---|
| WPA2 (2004, 802.11i) | the long-standing standard. It uses AES-CCMP for strong encryption (replacing the broken WEP and the weak WPA-TKIP). WPA2-Personal uses a pre-shared key (PSK); WPA2-Enterprise uses 802.1X. WPA2 is still acceptable with AES and a strong passphrase, but it is vulnerable to offline password guessing against a captured handshake. |
| WPA3 (2018) | the current standard, mandatory for newly Wi-Fi CERTIFIED devices. WPA3-Personal replaces the PSK handshake with SAE (Simultaneous Authentication of Equals), which resists OFFLINE password guessing; WPA3-Enterprise strengthens the enterprise protocols; and WPA3 REQUIRES Protected Management Frames (PMF) [R1]. |

The direction of travel is clear: require AES (never WEP/TKIP), prefer WPA3, and require PMF. The lab's wifireview.py checks exactly these.
