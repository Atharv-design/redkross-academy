## Pairing weaknesses and the case for authenticated, secure connections

**Context:** the security of a Bluetooth link rests on its pairing - the association model (whether it resists MITM) and the key agreement (whether keys can be recovered). NIST SP 800-121 Rev.2 documents the association models (including the MITM-vulnerable "Just Works") and the improvement of LE Secure Connections (ECDH) over legacy BLE pairing, and over the years disclosed Bluetooth weaknesses have repeatedly involved legacy pairing, weak key agreement, small key sizes and downgrade conditions - precisely the settings a configuration review targets [R1]. The defensive takeaway has been consistent: use authenticated association and Secure Connections, require large keys, and keep firmware current. Why it matters for this module: Bluetooth security is a configuration discipline much like Wi-Fi - the right pairing and hardening settings close the common weaknesses.

**Lessons:** avoid Just Works and legacy pairing for anything sensitive; require Secure Connections and large keys; patch; review against SP 800-121.

## (FICTIONAL TEACHING SCENARIO): The scanner that paired with anyone

**Context:** HimalayaRetail (fictional) deploys a Bluetooth barcode scanner configured as the lab's weak device.

**What happened:** a review (btreview.py) found it used "Just Works" pairing (no MITM protection), LE legacy pairing (recoverable keys), a default "0000" PIN, was always discoverable, and accepted a small key size - so an attacker in range could pair with it, interpose, or eavesdrop, and it advertised itself to everyone.

**Response:** the team hardened it - Numeric Comparison pairing, LE Secure Connections, on-demand discovery, no fixed PIN, maximum key size - and re-ran the review to confirm PASS, then applied the same baseline across its Bluetooth fleet and set a policy prohibiting Just Works/legacy pairing for sensitive devices.

**Lessons:** unmanaged Bluetooth defaults are dangerous; a configuration review finds them, and a hardened baseline plus policy fixes the fleet.
