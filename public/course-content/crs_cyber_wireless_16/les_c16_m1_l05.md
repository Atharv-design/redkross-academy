The concrete Wi-Fi threats a defender must address:

| Term | Meaning |
|---|---|
| eavesdropping | capturing traffic over the air; defeated by strong encryption (WPA2-AES/WPA3). |
| weak/legacy crypto | WEP and WPA-TKIP are broken; traffic under them is recoverable. Defeated by requiring AES-CCMP/GCMP. |
| rogue AP | an unauthorised AP plugged into your network (an insider or attacker bridge). Defeated by inventory and detection. |
| evil twin | a fake AP impersonating your SSID to capture credentials or man-in-the-middle clients. Defeated by PMF, strong auth, and detection/user awareness. |
| deauthentication | forged management frames that disconnect clients (DoS or to force a move to an evil twin). Defeated by PMF (802.11w). |
| WPS brute force | the Wi-Fi Protected Setup PIN is brute-forceable. Defeated by disabling WPS. |
| weak management | default AP admin credentials, old firmware. Defeated by hardening the AP itself. |

Each threat maps to a specific defensive control, which the course's lab reviews. The threat surface is the "why" behind every hardening step in Module 2.
