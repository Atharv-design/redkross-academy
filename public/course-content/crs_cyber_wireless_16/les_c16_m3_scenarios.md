Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A scan shows your SSID on a BSSID you do not recognise.

**Task:** Explain what this likely is and the correct response.

> [!TIP] Model answer
> Your SSID advertised by an unrecognised BSSID is a likely evil twin (or a rogue AP if it is on your wired network) - an impostor impersonating your network to lure clients, especially if it is open or strong-signal. Response: treat it as a finding, investigate it physically to locate and remove the device, confirm your real APs enforce PMF and strong authentication to limit what an impostor can achieve, and alert staff. Do NOT connect to or attack it.
>
> **Lesson:** an unknown BSSID on your SSID is an impostor to find and remove, not to engage.

## Scenario 2

A colleague suggests deauthenticating clients off a suspected evil twin to protect them.

**Task:** Explain why this is inappropriate and what to do instead.

> [!TIP] Model answer
> Deauthenticating clients is itself a disruptive, potentially unlawful active attack (it forges management frames and causes denial of service), it can affect legitimate users and neighbouring networks, and radio use is regulated - so it is inappropriate even with good intentions. Instead: detect the evil twin via the inventory, locate and remove it physically, rely on PMF and strong authentication to protect clients, and raise user awareness. Keep assessment non-disruptive and authorised.
>
> **Lesson:** do not deauth/jam; detect, remove physically, and protect via PMF/auth.

## Scenario 3

An auditor wants evidence of a wireless assessment.

**Task:** Describe the evidence configuration review and rogue detection produce.

> [!TIP] Model answer
> Configuration review produces a per-AP, prioritised findings list with severities and a PASS/FAIL, plus a re-test showing FAIL -> PASS after hardening; rogue/evil-twin detection produces a classified list of observed APs with the impostor BSSIDs flagged for investigation. Because both are repeatable checks over the configuration and scan data, their outputs are reproducible evidence an auditor can re-run - not assertions.
>
> **Lesson:** both pillars yield reproducible, before/after evidence for the audit.
