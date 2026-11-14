Secure WLAN configuration (NIST SP 800-153) combines several controls [R3]:

- Use WPA3 (or WPA2-AES minimum); never WEP/WPA.
- Use Enterprise (802.1X) authentication for corporate access; strong random passphrases for any personal/guest network.
- SEGMENT wireless from sensitive zones: guest Wi-Fi must be isolated (often straight to the internet, never to internal systems); corporate wireless is a zone subject to the same least-privilege flows as any other - wireless users do not get flat internal access.
- Enable protected management frames; disable WPS (its PIN has a known brute-force weakness); change default administrator credentials and SSIDs.
- Maintain an AP inventory and run rogue-AP detection; patch AP firmware.
- Monitor wireless as part of overall network monitoring.

For the lab organisation, corporate Wi-Fi is WPA3-Enterprise, segmented so wireless users reach only what their role needs; guest Wi-Fi is isolated to the internet only; and rogue-AP detection runs against an AP inventory.
