Insecure data handling is the most common mobile weakness class and the blueprint theme of this module. Its forms:

| Term | Meaning |
|---|---|
| secrets in the wrong place | tokens/credentials/personal data in external/shared storage, unprotected databases or preferences, or in logs - outside the protected sandbox (MASVS-STORAGE). |
| hardcoded secrets | API keys, credentials or keys embedded in the app, recoverable by anyone who inspects it (MASVS-CRYPTO). |
| weak cryptography | DES, ECB mode, RC4, MD5, or a hardcoded key - broken or misused crypto (MASVS-CRYPTO). |
| cleartext transmission | sending sensitive data over HTTP, or not validating TLS (MASVS-NETWORK). |
| leaky platform features | a WebView exposing local files or native bridges; sensitive data in screenshots/backups (MASVS-PLATFORM). |

All of these take sensitive data out of protection, and all are detectable - most statically. The defensive rule from Module 5 applies: keep sensitive data in private encrypted storage, keys in the keystore, strong crypto, TLS everywhere, and tight platform settings. The lab's demo app exhibits every form, and mobilecheck.py detects them.
