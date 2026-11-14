Two kinds of unauthorised access point threaten a WLAN:

| Term | Meaning |
|---|---|
| ROGUE AP | an unauthorised AP connected to YOUR wired network - often an insider's convenience device plugged into a wall port, or an attacker's bridge. It creates an unmanaged, often insecure entry point into the internal network. |
| EVIL TWIN | an AP impersonating your SSID (same network name) on an UNKNOWN BSSID, usually NOT on your wired network, set up to lure clients and capture credentials or man-in-the-middle them. Often open or weakly secured and with a strong local signal. |

The defining signal of both is an access point advertising a managed SSID (or sitting on your network) that is NOT in your authorised inventory. Detection therefore depends on maintaining an inventory of authorised BSSIDs and comparing observations against it. PMF and strong authentication reduce what an evil twin can achieve, but detection and physical investigation are needed to remove it. The lab models both via the observed scan.
