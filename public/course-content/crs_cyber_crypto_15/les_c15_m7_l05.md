Prefer, in order:

1. Protocols and services: TLS for transport, cloud KMS or HSM for key operations, platform credential stores. Do not reimplement them.
2. High-level, misuse-resistant libraries: libsodium and its bindings (for example PyNaCl), Google Tink, and in Python, pyca/cryptography's high-level recipes (Fernet) and AEAD classes. These choose safe defaults and make dangerous options hard to reach.
3. Lower-level primitives ("hazmat" layers) only when necessary, with expert review. pyca/cryptography names this layer "hazmat" for a reason [R3].

**Selection criteria:**

- maintained, with security releases and an advisory process;
- widely used and reviewed, ideally with independent audits;
- safe defaults and AEAD support;
- FIPS 140-validated modules where regulation requires it;
- clear documentation, and compatibility with your platforms;
- support for agility and post-quantum algorithms on its roadmap.

Avoid unmaintained or obscure packages, copying code from forums, and writing your own primitives or protocols. Track library versions in your SBOM (Course 12 Module 5): cryptographic libraries have their own vulnerability advisories, as Heartbleed in OpenSSL showed (Course 01).
