## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

**Shared lab and tools:** LAB_ASSETS/C16/ contains an AUTHORISED, ENTIRELY OFFLINE defensive lab. Every tool reviews a configuration document, a provided scan, or an original DEMO mobile app that you own; NONE performs any radio scanning, transmission, deauthentication or connection, and none touches a real third-party network, device or app.

| Term | Meaning |
|---|---|
| wifireview.py | review a WLAN/AP configuration (WPA3/WPA2, PMF, WPS)   Module 2 |
| roguescan.py | detect rogue/evil-twin APs in a provided scan          Module 3 |
| btreview.py | review a Bluetooth/BLE pairing configuration           Module 4 |
| mobilecheck.py | static review of the DEMO app (mapped to OWASP MASVS)  Module 6 |
| apicheck.py | review the mobile backend API configuration            Module 7 |
| review.py | consolidated control summary (capstone aid)            Module 8 |
| demo_app/ | an original, inert DEMO mobile app for static review |
| data/ | configs, the AP survey, and saved tool output |

All tools were execution-tested on 2026-11-08 with CPython 3.14.4 on Windows 11, using only the Python standard library. The pre-hardening Wi-Fi, Bluetooth and API configurations FAIL their controls; the hardened versions PASS (0 HIGH findings); the provided scan contains evil-twin access points to detect; and the demo app carries deliberate MASVS-mapped weaknesses to find and fix.

Safety, authorisation and ethics statement (read before anything else): This is a DEFENDER'S course. It teaches you to design, review and harden wireless and mobile security - Wi-Fi, Bluetooth, and mobile apps and their backend APIs - using offline review of documents, provided data and an owned demo app. It deliberately requires NO radio activity and NO attacking of any network, device or application. You must NEVER scan, deauthenticate, intercept, connect to, or attack a wireless network, Bluetooth device, mobile app or API you do not own and are not explicitly authorised, in writing, to assess. In India, unauthorised access to or interference with a computer resource is an offence under the Information Technology Act, 2000 (for example sections 43 and 66), and radio-spectrum use is regulated; this lab keeps you lawful by keeping you offline, on your own configurations and demo app.

**Access classification note:** per the blueprint, Course 16 is "PAID" - this is an advanced course and the lab and modules are the paid component.

**Standards note:** the course is grounded in NIST SP 800-153 (securing WLANs), the Wi-Fi Alliance WPA3 and Protected Management Frames guidance, NIST SP 800-121 Rev.2 (Guide to Bluetooth Security), and the OWASP Mobile Application Security Verification Standard (MASVS) and Testing Guide (MASTG). Identifiers and titles were checked at source on 2026-11-08.

**India law note:** Module 1, Module 3 and the capstone discuss authorisation, the Information Technology Act, 2000 and the regulation of radio use at an introductory level. This is not legal advice; obtain qualified counsel for your facts.
