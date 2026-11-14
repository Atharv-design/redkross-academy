Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A manager says "we hid our SSID, so we are secure".

**Task:** Explain why hiding the SSID is not security and what actually protects the network.

> [!TIP] Model answer
> Hiding the SSID (not broadcasting the name) is not security: the name still appears in client probe requests and association frames and is trivially recovered, and it does nothing to protect traffic or authenticity. What protects the network is strong encryption (WPA2-AES/WPA3) so captured traffic is useless, Protected Management Frames so frames cannot be forged, strong authentication, AP hardening (no WPS, no default creds, patched firmware), segmentation, and rogue/evil-twin detection.
>
> **Lesson:** hiding the name is not a control; protect the protocol and detect impostors.

## Scenario 2

Staff report being disconnected repeatedly and then connecting to a weaker "same-name" network.

**Task:** Explain what is likely happening and the defensive controls.

> [!TIP] Model answer
> This is consistent with a deauthentication attack pushing clients off the real AP combined with an evil twin advertising the same SSID with a stronger nearby signal to capture them. Defences: Protected Management Frames (802.11w, required by WPA3) to stop forged deauths; strong authentication and PMF so an evil twin cannot easily man-in-the-middle; rogue/evil-twin detection against a BSSID inventory; and user awareness. Investigate the impostor BSSID physically.
>
> **Lesson:** deauth + evil twin is a classic pair; PMF, strong auth and detection counter it.

## Scenario 3

You are asked to "test" the office Wi-Fi and the coffee shop's next door.

**Task:** Explain the authorisation boundary and what you may and may not do.

> [!TIP] Model answer
> You may assess only the office Wi-Fi if you own it or have written authorisation; you may NOT assess the coffee shop's network - it is not yours and you have no authorisation, so scanning, capturing, deauthenticating or connecting to it would be unlawful. Even for the office network, keep to authorised, non-disruptive activity; in this course, all assessment is offline (config review, provided-scan analysis), with no transmission or attack against any network.
>
> **Lesson:** assess only what you own or are authorised to; never touch a third party's network; keep it offline here.
