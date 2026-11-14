## The MASVS/MASTG as the mobile testing standard Context: the OWASP Mobile Application Security Verification Standard (MASVS) and Testing Guide (MASTG) are the de facto standard for mobile app security: the MASVS defines WHAT to verify across categories (storage, crypto, auth, network, platform, code, resilience, privacy), and the MASTG defines HOW to test each, statically and dynamically. Mobile assessments and secure-development programmes use them to systematically find the recurring weaknesses - insecure data storage, weak crypto, cleartext traffic, exposed components - rather than testing ad hoc [C16-M06-R1][C16-M06-R2]. Why it matters for this module: testing against a standard (MASVS categories) makes coverage complete and findings comparable, which is exactly what the lab's categorised output models. Lessons: test against the MASVS categories; use the MASTG procedures for static and dynamic testing; aim for coverage, not ad hoc checks.



## (FICTIONAL TEACHING SCENARIO): The static review that caught it all

**Context:** HimalayaNotes (fictional), the lab's demo app, is assessed before a release.

**What happened:** a static review (mobilecheck.py) - with no device and no execution - found 16 weaknesses across MASVS categories: a hardcoded key, a token in external storage and logs, DES/ECB crypto, cleartext everywhere, exported components and an unsafe WebView. The categorisation made the report clear and the remediation obvious, and a planned dynamic test would later confirm the cleartext traffic and storage behaviour on a controlled device.

**Response:** the team remediated against Module 5's model (private encrypted storage, keystore keys, TLS-only, strong crypto, unexported components, least-privilege permissions, release flags), and re-ran the review to confirm closure before release.

**Lessons:** static inspection alone catches most common mobile weaknesses cheaply and safely; categorised findings drive clear remediation; re-test to confirm.
