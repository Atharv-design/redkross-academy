## Insecure data storage as a leading mobile weakness Context: across mobile security assessments, INSECURE DATA STORAGE is one of the most common and impactful weakness classes - apps placing sensitive data (tokens, credentials, personal data) in world-readable external storage, in logs, in unprotected databases, or behind hardcoded keys, instead of in the private, encrypted sandbox the platform provides. The OWASP MASVS dedicates a whole control group (MASVS-STORAGE) to it, and mobile security guidance repeatedly identifies it because the platform ALREADY provides a safe place - the app's failure is in not using it [C16-M05-R2]. Why it matters for this module: the sandbox protects app-private data for free; most storage vulnerabilities are apps voluntarily taking data out of that protection. Lessons: keep sensitive data in private, encrypted storage; keys in the keystore; never in shared storage or logs.



## (FICTIONAL TEACHING SCENARIO): The app that gave its data away

**Context:** HimalayaNotes (fictional), modelled by the lab's demo app, is reviewed against the platform model.

**What happened:** although Android sandboxed the app, the app itself undid the protection - it saved the user's auth token to shared external storage (readable by other apps and via backup), logged the token, hardcoded its API key, over-requested permissions, exported components, and permitted cleartext traffic. None of these needed a platform flaw; each was the app failing to respect the model.

**Response:** the review (mobilecheck.py, Module 6) flagged all of them by MASVS category, and the fix in each case was to work WITH the model: private encrypted storage, keystore-backed keys, least-privilege permissions, unexported components, and TLS-only traffic.

**Lessons:** the platform protects data by default; app vulnerabilities come from circumventing the model - the fix is to respect it.
