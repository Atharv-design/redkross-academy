Findings are prioritised by severity and impact, and each gets a concrete remediation:

| Term | Meaning |
|---|---|
| HIGH | cleartext traffic, hardcoded secrets, secrets in external storage or logs, weak crypto, unsafe WebView file access - fix first; these directly expose data. |
| MEDIUM | exported components, user-CA trust, allowBackup, WebView JS on untrusted content - reduce the attack surface. |
| LOW | over-requested permissions to justify or remove. |

Remediation follows Module 5's model: move secrets to private encrypted storage and the keystore, require TLS (no cleartext, system CAs or pinning), use strong crypto (AES-GCM), unexport or protect components, request least-privilege permissions, and disable debuggable/backup for release. After remediation, re-run the static review to confirm the findings are closed - the same before/after evidence discipline as the wireless reviews. The lab's demo app is the "before"; fixing each finding is the exercise.
