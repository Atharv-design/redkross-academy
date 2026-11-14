The lab's DEMO app (demo_app/, an original teaching artifact - NOT a real APK) expresses the architecture's failure modes concretely. Reviewing its manifest, network security config and source against the model:

- SANDBOX vs storage (MASVS-STORAGE): MainActivity writes a token to EXTERNAL storage and LOGS it - taking a secret OUT of the private sandbox. The model says sensitive data stays in private, encrypted storage.
- KEYS/crypto (MASVS-CRYPTO): a hardcoded API key and DES/ECB encryption - keys must be in the keystore, not the app, and strong algorithms used.
- PERMISSIONS (MASVS-PLATFORM): over-requests WRITE_EXTERNAL_STORAGE, READ_CONTACTS, ACCESS_FINE_LOCATION - least privilege violated.
- COMPONENTS (MASVS-PLATFORM): exports activities and a content provider without clear need - sandbox boundary opened by invitation.
- WEAKENED DEFAULTS (MASVS-NETWORK/CODE): usesCleartextTraffic=true, a network config trusting user CAs, debuggable=true, allowBackup=true.
- WEBVIEW (MASVS-PLATFORM): JavaScript enabled and file access from file URLs on a WebView over cleartext.

Running the static reviewer (execution-tested, CPython 3.14.4, 2026-11-08) over the demo app reports 16 findings (9 HIGH) mapped to these MASVS categories (Module 6 deep-dives the output). Every finding is an app failing to respect the platform model - storing secrets outside the sandbox, hardcoding keys, over-permissioning, exposing components, or weakening secure defaults. The model tells you WHAT should be true; the review finds where the app breaks it.
