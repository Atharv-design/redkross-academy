## Revision

### Summary

Mobile app testing finds where an app fails the platform model. STATIC INSPECTION reads the app without running it - the manifest (permissions, exported components, debuggable/allowBackup/cleartext), the network security config (cleartext, trusted CAs, pinning), and the code/resources (hardcoded secrets, weak crypto, insecure storage, unsafe WebViews, secret logging) - and is safe, fast and catches many common weaknesses. DYNAMIC TESTING runs the app on a controlled device/emulator to observe actual behaviour (traffic/TLS, runtime storage, logs, platform behaviour), confirming and extending the static findings. INSECURE DATA HANDLING is the dominant weakness class: secrets in external storage/logs (MASVS-STORAGE), hardcoded secrets and weak crypto (MASVS-CRYPTO), cleartext transmission (MASVS-NETWORK), and leaky platform features (MASVS-PLATFORM) - all detectable, mostly statically. Findings are prioritised by severity and remediated per Module 5's model (private encrypted storage, keystore keys, TLS-only, strong crypto, unexported/protected components, least-privilege permissions, release flags), then RE-TESTED to confirm closure. Testing must be authorised (only apps you own or are permitted to test), controlled (your device, test builds/accounts), and careful with data. The OWASP MASVS (what to verify) and MASTG (how to test) are the standard. The lab's mobilecheck.py statically reviews the demo app and reports 16 findings (9 HIGH) across MASVS categories - a reproducible assessment produced with nothing built or executed.

### Important concepts

static inspection; dynamic testing; insecure data handling; MASVS categorisation; prioritisation/remediation; authorised testing.

### Key technical takeaways

inspect manifest/config/code statically; confirm at runtime dynamically; treat insecure data handling as the main class; categorise by MASVS; remediate per the model and re-test; test only authorised apps.

### Glossary

| Term | Meaning |
|---|---|
| static inspection | reviewing an app's files without running it. |
| dynamic testing | observing a running app's behaviour on a controlled device. |
| insecure data handling | mishandling sensitive data (storage, crypto, transit). |
| MASVS/MASTG | the OWASP mobile verification standard and testing guide. |
| certificate pinning | trusting only specific certs to resist interception. |

### Common mistakes

skipping static inspection; testing unauthorised apps; ignoring insecure data handling; not categorising findings; not re-testing; dynamic testing against production.

### Revision questions

​1. What does static inspection read and reveal? 2. Name four forms of insecure data handling and their MASVS categories. 3. What makes mobile testing authorised and safe?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "Mobile Application Security Verification Standard (MASVS)" (STORAGE, CRYPTO, NETWORK, PLATFORM categories). URL: [https://mas.owasp.org/MASVS/](https://mas.owasp.org/MASVS/) Accessed: 2026-11-08. Supports: insecure data handling and finding categories.
- [R2] OWASP. "Mobile Application Security Testing Guide (MASTG)" (static and dynamic testing procedures). URL: [https://mas.owasp.org/MASTG/](https://mas.owasp.org/MASTG/) Accessed: 2026-11-08. Supports: static inspection and dynamic testing methodology.
- [R3] NIST. "SP 800-163 Rev.1: Vetting the Security of Mobile Applications". URL: [https://csrc.nist.gov/pubs/sp/800/163/r1/final](https://csrc.nist.gov/pubs/sp/800/163/r1/final) Accessed: 2026-11-08. Supports: mobile app vetting and authorised testing context.
- [R4] Lab evidence. mobilecheck.py static review of the demo app (16 findings, 9 HIGH) mapped to MASVS (CPython 3.14.4), LAB_ASSETS/C16/data/ mobilecheck_output.txt, 2026-11-08. Supports: the deep-dive static review.
