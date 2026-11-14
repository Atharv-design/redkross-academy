Wi-Fi traffic is carried in FRAMES of three types:

| Term | Meaning |
|---|---|
| data frames | carry the actual network traffic (encrypted under WPA2/WPA3). |
| control frames | manage medium access (acknowledgements, request/clear to send). |
| management frames | establish and maintain the connection: beacons (the AP advertising its SSID), probe requests/responses, and the authentication, association and DEAUTHENTICATION frames. |

A client joins a network by discovering an AP (hearing its beacon or probing), authenticating, and associating. Historically, MANAGEMENT frames were unprotected - which let attackers forge DEAUTHENTICATION frames to knock clients off (a denial of service) or push them onto a rogue AP. The 802.11w amendment adds Protected Management Frames (PMF) to authenticate management frames and stop this, and WPA3 requires PMF (Module 2). Understanding frames explains both the classic attacks (deauth, evil-twin) and their defence (PMF). The defender's job is to review that protection is in place, not to send such frames.
