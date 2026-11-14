## Revision

### Summary

Wireless assessment checks that a WLAN is actually secure, via two pillars: CONFIGURATION REVIEW (each AP against the Module-2 baseline - encryption/cipher, PMF, auth mode, WPS, admin/firmware, segmentation - producing a prioritised PASS/FAIL) and ROGUE/EVIL-TWIN DETECTION (comparing observed access points against an inventory of authorised BSSIDs). A ROGUE AP is an unauthorised AP on your wired network; an EVIL TWIN impersonates your SSID on an unknown BSSID to lure clients (often open/weak and strong-signal). Both share one signal: an AP advertising a managed SSID (or on your network) that is NOT in the authorised inventory - so detection depends on maintaining that inventory. The correct response to an impostor is to investigate and remove it physically, never to attack, connect to, or deauthenticate - active disruption is inappropriate and often unlawful, and radio use is regulated. This course assesses from DATA (configuration exports and provided scans) so the assessor transmits nothing, keeping it lawful and safe; a real scan is collected only on your own/authorised networks. Both pillars produce reproducible evidence (re-runnable checks), feeding a prioritised report and a re-test. The lab's roguescan.py flags the two evil twins in the provided scan (an OPEN credential trap and a WPA2 impersonator) while confirming the three authorised BSSIDs, and combined with wifireview.py gives the full assessment picture.

### Important concepts

assessment process; configuration review; rogue vs evil twin; inventory-based detection; controlled/authorised/non-disruptive scope; evidence.

### Key technical takeaways

review configs against the baseline; maintain a BSSID inventory and compare scans to it; investigate/remove impostors physically; keep assessment authorised and non-disruptive; produce reproducible evidence.

### Glossary

| Term | Meaning |
|---|---|
| configuration review | checking AP settings against the secure baseline. |
| rogue AP | an unauthorised AP on your wired network. |
| evil twin | an AP impersonating your SSID on an unknown BSSID. |
| authorised-BSSID inventory | the known-good list detection compares against. |
| non-disruptive | assessment that does not deauth, jam or disrupt. |

### Common mistakes

no BSSID inventory; relying on config review alone (misses impostors); attacking/deauthing impostors; assessing unauthorised networks; transmitting without authorisation; not re-testing after remediation.

### Revision questions

​1. What are the two pillars of wireless assessment? 2. How is an evil twin detected? 3. Why keep assessment offline/non-disruptive here?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-153: Guidelines for Securing Wireless Local Area Networks (WLANs)" (configuration, monitoring for unauthorised devices). URL: [https://csrc.nist.gov/pubs/sp/800/153/final](https://csrc.nist.gov/pubs/sp/800/153/final) Accessed: 2026-11-08. Supports: assessment process, configuration review and rogue detection.
- [R2] Wi-Fi Alliance. "Security" (PMF/WPA3 that limit evil-twin impact). URL: [https://www.wi-fi.org/discover-wi-fi/security](https://www.wi-fi.org/discover-wi-fi/security) Accessed: 2026-11-08. Supports: why PMF/strong auth complement detection.
- [R3] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (authorised, controlled assessment and evidence). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: controlled/authorised assessment and reporting.
- [R4] Lab evidence. roguescan.py analysis of the provided scan against the authorised inventory (CPython 3.14.4), LAB_ASSETS/C16/data/roguescan_output.txt, 2026-11-08. Supports: the deep-dive impostor detection.
