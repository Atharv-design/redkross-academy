## WPA3, SAE and PMF as the modern baseline Context: the Wi-Fi industry's response to the weaknesses of earlier protections is codified in WPA3 and the mandatory use of Protected Management Frames. The Wi-Fi Alliance makes WPA3 mandatory for newly certified devices, requires PMF for new devices, and highlights WPA3-Personal's increased protection against password-guessing - the SAE handshake resists the offline dictionary attacks that threatened WPA2-PSK. NIST SP 800-153 and the Alliance's guidance together define the modern baseline: AES, WPA3 where possible, PMF required, and WPS disabled [C16-M02-R1][C16-M02-R2]. Why it matters for this module: the baseline is not a matter of taste - it is the current standard, and reviewing a configuration means measuring it against WPA3/ PMF/AES/WPS, as the lab does. Lessons: require AES, prefer WPA3 with SAE, require PMF, disable WPS - the modern Wi-Fi baseline.



## (FICTIONAL TEACHING SCENARIO): The configuration that failed every control

**Context:** HimalayaCorp (fictional) runs the lab's weak Wi-Fi configuration.

**What happened:** a review (wifireview.py) found it failing on every major control - a TKIP cipher, PMF disabled, WPS enabled, a guessable passphrase, default admin credentials, guests on the corporate VLAN, and stale firmware. Any one of these is serious; together they leave the air wide open to eavesdropping, deauth, WPS brute force and lateral access from the guest network.

**Response:** the team hardened each setting - WPA3-Personal with SAE and AES, PMF required, WPS off, a long random passphrase, a unique admin account, updated firmware, and a segmented, isolated guest network - and re-ran the review to confirm zero findings (PASS). The before/after was the evidence for the audit.

**Lessons:** Wi-Fi weaknesses cluster in configuration; a structured review finds them, and re-running it after hardening proves the fix.
