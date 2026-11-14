The platform's defaults are mostly secure, but an app can WEAKEN them in its manifest and configuration - and these self-inflicted weaknesses are common findings:

```text
usesCleartextTraffic / cleartext network config  permits unencrypted HTTP,
   exposing traffic to interception; modern Android blocks cleartext by default,
   so enabling it is a deliberate weakening.
trusting user-added CAs   a network security config that trusts the user
   certificate store enables interception via a user-installed CA; sensitive
   apps should trust only the system store (or pin).
debuggable in release     leaves the app open to debugging/inspection.
allowBackup               may export app data via device backup.
```

Each of these takes a secure default and makes it insecure, and each is visible in the app's manifest and network security configuration - exactly what a static review reads. The lab's demo app sets usesCleartextTraffic=true, trusts user CAs, is debuggable and allows backup; Module 6 flags them all. The lesson: do not weaken the platform's secure defaults.
