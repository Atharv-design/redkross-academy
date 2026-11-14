## Revision

### Summary

Wi-Fi (IEEE 802.11) networks over radio in shared, broadcast bands (2.4/5/6 GHz) divided into channels. The SSID is a network NAME (not a security boundary) that any AP - including an impostor - can advertise; the BSSID is the MAC address of a specific AP radio, so an inventory of authorised BSSIDs lets you detect impostors. Access points bridge the air to the wired network (a compromised or rogue AP is a bridge), typically with many APs per SSID and a controller for larger estates; guest and corporate SSIDs should map to separate, segmented networks. Wi-Fi carries data, control and MANAGEMENT frames; unprotected management frames allowed forged DEAUTHENTICATION (DoS / forcing clients onto an evil twin), which Protected Management Frames (802.11w, required by WPA3) defeat. The shared medium changes the threat model: no physical barrier (proximity suffices), passive eavesdropping (captured traffic is readable if weakly encrypted), and impersonation (evil twins, forged frames). The Wi-Fi threat surface - eavesdropping, weak/legacy crypto (WEP/TKIP), rogue APs, evil twins, deauth, WPS brute force, weak management - each maps to a specific control (strong encryption, PMF, inventory/detection, disabling WPS, AP hardening). The defender's goals are confidentiality, integrity/authenticity and availability, enforced in the protocol because the air cannot be fenced. Wireless assessment is bounded by authorisation and law; this course keeps all practice offline on your own/authorised data, modelled by the lab's AP inventory and provided scan (roguescan.py flags 2 evil-twins).

### Important concepts

SSID vs BSSID; AP/client architecture; frame types and deauth; shared-medium threat model; threat surface and controls; lawful scope.

### Key technical takeaways

the SSID is a name, not a boundary; inventory BSSIDs to detect impostors; protect the protocol (encryption + PMF + auth); segment guests; assess only authorised networks, offline here.

### Glossary

| Term | Meaning |
|---|---|
| SSID | the advertised network name (not a security boundary). |
| BSSID | the MAC address of a specific AP radio. |
| PMF | Protected Management Frames (802.11w), required by WPA3. |
| evil twin | a fake AP impersonating a legitimate SSID. |
| deauthentication | a management frame that disconnects a client (forged = attack). |
| shared medium | radio is broadcast - anyone in range can hear/transmit. |

### Common mistakes

treating the SSID as a boundary; hiding the SSID as "security"; no BSSID inventory; unprotected management frames; sharing guest and corporate networks; assessing networks you do not own.

### Revision questions

​1. Why is the SSID not a security boundary? 2. How does the shared medium change the threat model? 3. Name three Wi-Fi threats and their controls.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-153: Guidelines for Securing Wireless Local Area Networks (WLANs)". URL: [https://csrc.nist.gov/pubs/sp/800/153/final](https://csrc.nist.gov/pubs/sp/800/153/final) Accessed: 2026-11-08. Supports: WLAN concepts, architecture and threat model.
- [R2] Wi-Fi Alliance. "Security" (WPA3, Protected Management Frames). URL: [https://www.wi-fi.org/discover-wi-fi/security](https://www.wi-fi.org/discover-wi-fi/security) Accessed: 2026-11-08. Supports: management-frame protection and the move to WPA3.
- [R3] NIST. "SP 800-153: Guidelines for Securing WLANs" (threat-to-control mapping). URL: [https://csrc.nist.gov/pubs/sp/800/153/final](https://csrc.nist.gov/pubs/sp/800/153/final) Accessed: 2026-11-08. Supports: the threat-surface-to-control mapping.
- [R4] Lab evidence. roguescan.py analysis of the provided scan against the authorised-AP inventory (CPython 3.14.4), LAB_ASSETS/C16/data/ roguescan_output.txt, 2026-11-08. Supports: the deep-dive wireless model.
