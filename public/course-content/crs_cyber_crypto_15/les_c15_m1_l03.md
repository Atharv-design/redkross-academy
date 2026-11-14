Keys, nonces, salts, session tokens and password-reset links all need values an attacker cannot predict. Two kinds of generator:

```text
General-purpose PRNG  for example Python's random (Mersenne Twister).
                It is fast and statistically good for simulations, but
                deterministic from its seed and recoverable from enough
                outputs. Never use it for security.
CSPRNG          cryptographically secure. It is seeded from operating
                system entropy (hardware events, CPU instructions) and
                designed so outputs cannot be predicted even when many
                are observed. Use the OS interfaces: getrandom() and
                /dev/urandom on Linux, BCryptGenRandom on Windows. In
                Python these are reached through os.urandom and the
                secrets module.
```

Execution-tested (LAB_ASSETS/C15/m01_randomness.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
== random with the same seed is fully predictable
  token A: ce1497629246c295
  token B: ce1497629246c295
== secrets: OS CSPRNG
  two tokens differ: True  length (hex chars): 32
  token_urlsafe(32) length: 43
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4)
```

Two generators given the same seed (here a date) produced identical "tokens". Anyone who guesses the seed, such as a start time or a process ID, can regenerate every token. secrets.token_hex(16) gives 16 random bytes, which is 32 hex characters, and token_urlsafe(32) gives 32 random bytes encoded as 43 URL-safe characters.

**Pitfalls:** seeding a CSPRNG yourself; generating keys at first boot of cloned virtual machines or embedded devices before the OS has gathered entropy; and patching or "optimising" randomness code (the Debian case).
