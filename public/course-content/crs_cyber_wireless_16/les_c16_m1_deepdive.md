The lab models a fictional network ("HimalayaCorp") through documents you review offline, grounding the foundations:

- AP architecture and inventory: data/authorized_aps.json lists the authorised BSSIDs for the managed SSIDs (HimalayaCorp on 02:11:aa:00:00:01/02; HimalayaCorp-Guest on 02:11:aa:00:00:03) - the inventory a defender maintains.
- the threat surface in a scan: data/observed_aps.json is a PROVIDED site-survey capture; it contains the authorised APs plus two impostors advertising the HimalayaCorp SSID on UNKNOWN BSSIDs (66:de:ad:be:ef:01 OPEN, and 66:de:ad:be:ef:02 WPA2) - classic evil twins - and a neighbouring network.
- the defender's response: roguescan.py (Module 3) compares the scan to the inventory and flags the impostors, offline. Running it (execution-tested, CPython 3.14.4, 2026-11-08) reports 2 evil-twin/rogue findings on the SSID served by unknown BSSIDs.

This shows the foundations in action: an SSID is not a security boundary (anyone can advertise it), a BSSID identifies a specific radio (so an inventory of authorised BSSIDs detects impostors), and the defence is detection plus the protocol controls (PMF, strong auth) of Module 2 - all analysed from provided data with no radio activity.
