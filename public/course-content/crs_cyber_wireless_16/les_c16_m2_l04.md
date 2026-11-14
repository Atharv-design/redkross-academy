Beyond the encryption and auth mode, a secure WLAN deployment requires:

```text
disable WPS        the Wi-Fi Protected Setup PIN is brute-forceable; turn WPS
                   off entirely.
harden the AP      replace default admin credentials with a unique user and a
                   long random password; restrict management access.
patch firmware     keep AP/controller firmware current to close known
                   vulnerabilities.
segment            place guest and corporate SSIDs on separate, segmented
                   VLANs/networks (Course 07); isolate guest clients from each
                   other.
do not rely on     MAC filtering and SSID hiding are trivially bypassed; treat
  weak "controls"  them as hygiene, not security.
monitor            watch for rogue/evil-twin APs (Module 3).
```

Each of these is a concrete configuration item a reviewer checks. Together with WPA3/PMF and a strong passphrase, they constitute a hardened deployment. The lab checks WPS, admin credentials, firmware currency and guest segmentation/isolation.
