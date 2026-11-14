The path from hardware to a Python token:

1. Entropy sources. Interrupt timing, device noise and CPU random-number instructions (such as RDRAND/RDSEED), mixed by the kernel. No single source is trusted alone.
2. Kernel CSPRNG. Linux mixes entropy into a ChaCha20-based generator exposed by getrandom(2) and /dev/urandom. getrandom blocks only until the generator is first initialised at boot, then never. Windows provides BCryptGenRandom.
3. Language interface. Python's os.urandom calls the OS generator, and the secrets module wraps it with convenient functions (token_bytes, token_hex, token_urlsafe, choice, randbelow).
4. Libraries. pyca/cryptography uses OpenSSL's CSPRNG, which is seeded from the OS, for key generation (AESGCM.generate_key, ec.generate_ private_key).

**Code-review checklist:**

- no import random in security-relevant code (a SAST rule, Course 12 Module 4);
- no hard-coded or time-based seeds;
- no custom "random" from hashes of timestamps;
- key generation through the library's generate functions;
- virtual machine templates and containers do not ship pre-generated keys (SSH host keys, TLS keys), which must be generated at first boot.
