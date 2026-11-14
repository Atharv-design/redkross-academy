## From WEP to WPA3 - a lesson in crypto lifecycles Context: early wireless security relied on WEP, which was shown to be badly broken in the early 2000s; its keys could be recovered quickly, and WEP-protected networks were a notorious soft target, implicated in real intrusions where attackers reached internal systems through weak store Wi-Fi. The industry moved to WPA and then WPA2 (AES), and - after further research including the 2017 KRACK handshake weakness in WPA2 - to WPA3 (2018), whose SAE handshake resists the offline guessing that undermined WPA2-Personal [C07-M06-R1][C07-M06-R2]. Why it matters for this module: wireless crypto, like TLS, has a lifecycle; yesterday's secure mode is today's liability. Defenders must track the current baseline and upgrade - WEP and WPA are unacceptable, WPA2-AES is the minimum, WPA3 is preferred. Lessons: never run WEP/WPA; use WPA2-AES at minimum and WPA3 where supported; keep AP firmware patched; and treat wireless security modes as something to review and upgrade over time.



## (FICTIONAL TEACHING SCENARIO): The helpful rogue access point

**Context:** at Himalaya Retail (fictional), an employee in a back office found the Wi-Fi signal weak and plugged a cheap consumer wireless router into a wired network port to get better coverage - creating a rogue access point with an open or weakly-secured SSID connected straight into the internal network.

**What happened:** the rogue AP bypassed the corporate WPA3-Enterprise controls and segmentation, offering an unmonitored, weakly-secured door into the network from the car park. It was not malicious in intent, but it was exactly the kind of uncontrolled entry point an attacker seeks. It was discovered by rogue-AP detection, which flagged an SSID/BSSID not in the approved AP inventory and correlated it to a switch port.

**Response:** the team removed the device, used port security (802.1X on the wired side) to prevent unauthorised devices connecting to network ports, strengthened rogue-AP detection and alerting, and educated staff on why personal APs are prohibited. They treated the rogue AP as a serious exposure, not a minor infraction.

**Lessons:** rogue APs - even well-intentioned ones - bypass wireless controls and segmentation; detect them against an AP inventory; control what can connect to wired ports (802.1X/port security); and educate users.
