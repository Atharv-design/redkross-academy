Where an app stores data determines who can reach it:

| Term | Meaning |
|---|---|
| internal (app-private) storage | files in the app's private sandbox directory - readable only by the app. The correct place for sensitive data, ideally ENCRYPTED (modern platforms encrypt the device, and apps can add app-level encryption / keystore-backed keys). |
| external/shared storage | historically world-readable shared storage (SD card / shared media) - readable by other apps (with permission) and off-device via backup. Sensitive data must NOT go here. |
| key material | cryptographic keys belong in the platform keystore (hardware-backed where available), never hardcoded in the app. |
| logs | system/app logs are not a safe place for secrets. |

The recurring mobile weakness is INSECURE DATA HANDLING: writing secrets to shared storage, logging tokens, or hardcoding keys - all of which take sensitive data OUT of the protected sandbox. The lab's demo app does exactly these (external-storage token, logged token, hardcoded API key), which Module 6 detects. The rule: keep sensitive data in private, encrypted storage, and keep keys in the keystore.
