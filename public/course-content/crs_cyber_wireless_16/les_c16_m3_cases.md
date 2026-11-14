## Rogue and evil-twin detection as standard practice Context: wireless intrusion detection and the maintenance of an authorised-AP inventory are standard elements of WLAN security programmes, precisely because rogue access points (unauthorised APs on the wired network) and evil twins (SSID impersonators) are common, high-impact threats that configuration hardening alone cannot address. Guidance such as NIST SP 800-153 includes monitoring for unauthorised WLAN devices, and enterprise wireless systems provide rogue-AP detection by comparing observed BSSIDs against a known-good inventory - exactly the comparison the lab performs offline [C16-M03-R1]. Why it matters for this module: hardening secures the APs you know about; detection finds the ones you do not. Both are required. Lessons: maintain an authorised-BSSID inventory; continuously compare observations against it; investigate and remove impostors physically.



## (FICTIONAL TEACHING SCENARIO): The open twin at the entrance

**Context:** HimalayaCorp (fictional) runs a quarterly wireless assessment using the lab's data.

**What happened:** the configuration review (wifireview.py) confirmed the production APs met the baseline after hardening, but the rogue scan (roguescan.py) flagged an OPEN access point advertising "HimalayaCorp" from an unknown BSSID with a strong signal near the entrance - an evil twin positioned to capture credentials from arriving staff, plus a second WPA2 impersonator. Neither was in the authorised inventory.

**Response:** the team located and removed the impostor devices, reminded staff to rely on managed, PMF-protected connections and to report "same-name" open networks, and confirmed PMF/strong-auth on the real APs limits what an evil twin can achieve. The assessment evidence (the flagged BSSIDs) drove the response.

**Lessons:** configuration hardening and rogue detection are complementary; an inventory-based scan catches impostors a config review cannot.
