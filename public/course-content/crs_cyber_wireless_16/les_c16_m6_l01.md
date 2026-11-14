Static inspection examines a mobile app WITHOUT running it - the mobile analogue of the static analysis in Course 06 and Course 10. It reads:

| Term | Meaning |
|---|---|
| the manifest | permissions, exported components, and flags like debuggable, allowBackup and usesCleartextTraffic. |
| configuration | the network security configuration (cleartext, trusted CAs, pinning). |
| the code/resources | (decompiled from the app package for a real app) for hardcoded secrets, weak cryptography, insecure storage calls, unsafe WebView settings, and logging of sensitive data. |

Static inspection is safe (nothing runs), fast, and catches a large share of common weaknesses - especially insecure data handling and weakened defaults, which are visible in the manifest, config and code. Its limit is that it shows what the app CAN do and how it is configured, not always what it does at runtime (dynamic testing adds that). The lab's mobilecheck.py performs static inspection over the demo app's manifest, network config and source, mapping each finding to a MASVS category [R1].
