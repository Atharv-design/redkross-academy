Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A WLAN uses WPA2-PSK with TKIP, PMF off, WPS on, and a passphrase of the company name.

**Task:** List the findings and the hardened configuration.

> [!TIP] Model answer
> **Findings:** deprecated TKIP cipher (require AES-CCMP/GCMP); PMF disabled (require PMF/802.11w); WPS enabled (disable it); weak passphrase = company name (use a long, random, unique passphrase); and prefer WPA3-Personal (SAE) over WPA2-PSK.
>
> **Hardened config:** WPA3-Personal with SAE and AES-CCMP, PMF required, WPS disabled, a long random passphrase, plus hardened AP admin credentials, current firmware, and a segmented/isolated guest network.
>
> **Lesson:** replace TKIP/WPA2-PSK/WPS/weak-passphrase with WPA3/SAE/AES/PMF and a strong passphrase.

## Scenario 2

A company wants per-user Wi-Fi access with easy revocation when staff leave.

**Task:** Recommend the mode and explain why.

> [!TIP] Model answer
> Recommend WPA3-Enterprise (802.1X with RADIUS/EAP). It authenticates each user or device individually rather than sharing one secret, so access can be granted and revoked per identity (e.g. when staff leave) without changing a network-wide password, provides accountability, and limits the blast radius of one compromised credential. Require PMF throughout.
>
> **Lesson:** Enterprise/802.1X gives per-identity authentication and easy revocation.

## Scenario 3

An auditor asks for evidence that the Wi-Fi was hardened.

**Task:** Explain how a configuration review provides reproducible evidence.

> [!TIP] Model answer
> Run a configuration review tool (like the lab's wifireview.py) against the WLAN configuration before and after hardening. The before run shows the findings (e.g. 10 findings, 6 HIGH, FAIL); the after run shows zero findings (PASS). Because the review is a repeatable check over the configuration, the before/after output is reproducible evidence the controls were implemented - not an assertion.
>
> **Lesson:** a repeatable configuration review provides before/after evidence of hardening.
