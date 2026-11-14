## Revision

### Summary

Mobile security starts with the platform model. Android SANDBOXES each app (historically a per-app Linux UID, kernel-enforced), so an app's private data is private from other apps by default and a malicious app is contained - the sandbox holds even for badly-written apps. Because apps are isolated, they need PERMISSIONS for shared/sensitive resources: normal (install-time), dangerous/runtime (granted and revocable by the user), and signature/system; apps should request the MINIMUM and justify each. DATA STORAGE determines exposure: sensitive data belongs in private (internal), encrypted storage, and keys in the platform KEYSTORE - never in world-readable external/shared storage, logs, or hardcoded in the app (insecure data handling is a leading mobile weakness). App COMPONENTS (activities, services, receivers, content providers) can be EXPORTED, and an exported component that performs sensitive actions or exposes data without authorization is a vulnerability - export only what must be, and protect it. Apps can WEAKEN secure defaults (usesCleartextTraffic, trusting user CAs, debuggable, allowBackup), each visible in the manifest/network config and each a finding. The model maps onto the OWASP MASVS categories (STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE, PRIVACY), which Module 6 uses. Most mobile vulnerabilities are apps failing to respect this model; the fix is to work with it. The lab's demo app breaks the model in many ways (external-storage token, logged token, hardcoded key, DES/ECB, over-permissioning, exported components, cleartext, user-CA trust) - 16 findings mapped to MASVS categories.

### Important concepts

app sandbox; permission model; data storage; components and exporting; weakened defaults; MASVS mapping.

### Key technical takeaways

keep sensitive data in private encrypted storage and keys in the keystore; request least-privilege permissions; export only protected components; do not weaken secure defaults; the model maps to MASVS.

### Glossary

| Term | Meaning |
|---|---|
| app sandbox | per-app isolation keeping private data private from other apps. |
| runtime permission | user-granted, revocable access to a sensitive resource. |
| internal storage | app-private storage (the correct place for sensitive data). |
| exported component | an app component callable by other apps. |
| keystore | the platform store for cryptographic keys. |
| MASVS | OWASP Mobile Application Security Verification Standard. |

### Common mistakes

secrets in external storage or logs; hardcoded keys; over-requesting permissions; unnecessarily exported components; enabling cleartext; trusting user CAs; debuggable/backup in release.

### Revision questions

​1. What does the app sandbox protect, and against whom? 2. Where should sensitive data and keys be stored? 3. How can an app weaken the platform defaults?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] Google. "Android Security Model / Application Sandbox" (developer and platform security documentation). URL: [https://source.android.com/docs/security/app-sandbox](https://source.android.com/docs/security/app-sandbox) Accessed: 2026-11-08. Supports: the app sandbox and process isolation.
- [R2] OWASP. "Mobile Application Security Verification Standard (MASVS)" (STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE, PRIVACY). URL: [https://mas.owasp.org/MASVS/](https://mas.owasp.org/MASVS/) Accessed: 2026-11-08. Supports: storage, crypto, platform categories and the model-to-MASVS mapping.
- [R3] OWASP. "Mobile Application Security Testing Guide (MASTG)" (platform interaction, storage and permission testing). URL: [https://mas.owasp.org/MASTG/](https://mas.owasp.org/MASTG/) Accessed: 2026-11-08. Supports: how the model's concerns are tested.
- [R4] Lab evidence. mobilecheck.py static review of the demo app mapped to MASVS categories (CPython 3.14.4), LAB_ASSETS/C16/data/mobilecheck_output.txt, 2026-11-08. Supports: the deep-dive demo-app-against-the-model walkthrough.
