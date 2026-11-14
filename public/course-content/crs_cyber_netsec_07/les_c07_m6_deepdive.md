Wireless is a boundary, and the course's principles - modern crypto, strong authentication, least-privilege segmentation, and detection against a baseline - apply directly. A secure WLAN design for Himalaya Retail (illustrative, aligned to NIST SP 800-153):

```output
Corporate Wi-Fi:
  mode         WPA3-Enterprise (WPA2-AES minimum where WPA3 unsupported)
  auth         802.1X / EAP, per-user credentials (certificates preferred)
  segmentation treated as its own zone; least-privilege flows only
               (wireless users do NOT get flat internal/database access)
  mgmt frames  protected management frames enabled; WPS disabled
Guest Wi-Fi:
  mode         WPA3/WPA2 with a strong rotating passphrase (or captive portal)
  segmentation ISOLATED - internet only, no path to internal zones
Infrastructure hygiene:
  defaults     change default admin credentials and SSIDs; patch AP firmware
  inventory    maintain an authoritative list of approved APs (SSID/BSSID)
  detection    rogue-AP / evil-twin detection (WIDS) alerts on anything not
               in the inventory, or an approved SSID from an unexpected BSSID
```

Why each choice follows the course:

- WPA3-Enterprise applies modern crypto (Module 5's theme) and per-user authentication (Course 06 Module 3's identity principles) instead of a shared secret.
- Segmenting wireless (Module 4) ensures a compromised or malicious wireless client cannot reach the crown jewels - wireless users are subject to the same allowed-flow matrix; guest Wi-Fi is isolated like an untrusted zone.
- Rogue-AP detection against an AP inventory is the same know-your-baseline, detect-deviations pattern as IDS (Module 3) and flow monitoring (Module 7).

The result is that wireless, despite reaching into the air, is just another controlled, monitored boundary - not a bypass of the architecture. This is entirely a design-and-detection exercise; nothing here involves operating against any wireless network.
