Running mobilecheck.py over the demo app (execution-tested, CPython 3.14.4, 2026-11-08; abridged - 16 findings, 9 HIGH):

```output
Mobile app static review (DEMO teaching artifact): demo_app
  [HIGH] MASVS-CODE    manifest       debuggable=true (must be false in release)
  [HIGH] MASVS-NETWORK manifest       usesCleartextTraffic=true permits HTTP
  [HIGH] MASVS-NETWORK netsec-config  config permits cleartext traffic
  [HIGH] MASVS-CRYPTO  MainActivity   hardcoded API key/secret in source
  [HIGH] MASVS-NETWORK MainActivity   cleartext http:// endpoint in source
  [HIGH] MASVS-STORAGE MainActivity   writes to shared/external storage
  [HIGH] MASVS-STORAGE MainActivity   logs a secret/token
  [HIGH] MASVS-CRYPTO  MainActivity   weak cryptography (DES/ECB)
  [HIGH] MASVS-PLATFORM MainActivity  WebView allows file access from file URLs
  [MED ] MASVS-STORAGE  manifest      allowBackup=true may expose app data
  [MED ] MASVS-PLATFORM manifest      activities/content provider exported
  [MED ] MASVS-NETWORK  netsec-config trusts user-added CAs
  [MED ] MASVS-PLATFORM MainActivity  WebView JavaScript enabled
  [LOW ] MASVS-PLATFORM manifest      sensitive permissions requested
  ... 16 finding(s), 9 HIGH -> FAIL
```

**Reading the review:**

- INSECURE DATA HANDLING dominates: a hardcoded API key, a token written to external storage AND logged, and DES/ECB crypto - sensitive data taken out of the sandbox and weakly protected (MASVS-STORAGE/CRYPTO).
- NETWORK: cleartext permitted in the manifest and the network config, a cleartext endpoint in code, and user-CA trust - traffic exposed to interception (MASVS-NETWORK).
- PLATFORM: exported components, an over-permissive WebView (file access + JS), and over-requested permissions - sandbox boundary and platform features weakened (MASVS-PLATFORM).
- CODE: debuggable in release (MASVS-CODE); allowBackup (MASVS-STORAGE).

Each finding is located (manifest/config/source), severity-rated and MASVS-mapped - a reproducible static assessment. Remediation (Module 5's model) and a re-run to confirm closure complete the cycle. Nothing was built or executed: static inspection read the app's files, safely and offline.
