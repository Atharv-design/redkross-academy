Wi-Fi security has evolved as each mode was broken:

| Term | Meaning |
|---|---|
| WEP | (Wired Equivalent Privacy) - the original, now completely broken; its encryption can be defeated quickly. It must never be used. |
| WPA | (Wi-Fi Protected Access) - an interim fix for WEP's flaws, also now considered weak. |
| WPA2 | (2004) - long the standard, using strong AES-CCMP encryption; still widely deployed and acceptable when configured well, though its personal (PSK) handshake has known weaknesses (see WPA3). |
| WPA3 | (2018, Wi-Fi Alliance) - the current generation, strengthening the handshake and offering better protection, especially for personal networks. |

The lesson of this history is that wireless security modes have a lifecycle: what was secure becomes broken, and configuration must keep pace. Today, use WPA3 where supported, WPA2 (AES) as the minimum, and never WEP or WPA [R1].
