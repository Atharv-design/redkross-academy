Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A store still runs WEP on its back-office Wi-Fi.

**Task:** Explain the risk and the fix.

> [!TIP] Model answer
> **Risk:** WEP is completely broken - its encryption can be defeated quickly, so the back-office Wi-Fi (and anything it reaches) is effectively open to anyone in range, a classic path to internal systems. Fix: replace WEP immediately with WPA3 (or WPA2-AES at minimum) using Enterprise 802.1X authentication for staff; segment the wireless from sensitive zones; patch the AP firmware; and change default credentials/SSIDs.
>
> **Lesson:** never run WEP; move to WPA3/WPA2-AES with Enterprise authentication and segmentation.

## Scenario 2

An employee plugs a consumer wireless router into a wired port for better coverage.

**Task:** Explain the risk and how to prevent and detect this.

> [!TIP] Model answer
> **Risk:** this is a rogue access point - it bypasses the corporate wireless security and segmentation, creating a weakly-secured, unmonitored entry point into the internal network from outside the building. Prevent it with wired-side controls (802.1X/port security so unauthorised devices cannot connect to network ports) and a policy prohibiting personal APs. Detect it with rogue-AP detection against an approved-AP inventory, correlating wireless observations with the wired side, and alert on anything not in the inventory. Educate staff.
>
> **Lesson:** rogue APs bypass controls; prevent with port security, detect against an inventory, and educate users.

## Scenario 3

Corporate Wi-Fi uses a single shared passphrase for all staff.

**Task:** Explain the weaknesses and the better model.

> [!TIP] Model answer
> Weaknesses of a single shared passphrase (PSK): it cannot be revoked per user (one departure means changing it for everyone), it is easy to leak, there is no per-user accountability, and in WPA2 it is subject to offline guessing. Better model: WPA2/WPA3-Enterprise with 802.1X, where each user authenticates with their own credentials or certificate against a RADIUS server - giving per-user authentication, easy revocation, accountability, and no shared secret.
>
> **Lesson:** use Enterprise (802.1X) per-user authentication for corporate wireless, not a shared passphrase.
