Passwords are low-entropy (Module 1), so stored password hashes must be deliberately slow and unique per user:

```text
- Salt: a random value of at least 16 bytes per password, stored with
  the hash. Identical passwords then hash differently, and precomputed
  tables are useless.
- Work factor: a time and memory cost large enough to slow guessing,
  tuned to your servers.
- Algorithm, in OWASP's order of preference [R1]:
    Argon2id      m=19456 (19 MiB), t=2, p=1 (preferred)
    scrypt        N=2^17 (128 MiB), r=8, p=1; or equivalent trade-offs
                  such as N=2^14, r=8, p=5
    bcrypt        work factor of at least 10 (legacy; 72-byte input limit)
    PBKDF2-HMAC-SHA256  600,000 iterations (use where FIPS-140 compliance
                  is required)
- Optionally add a pepper: a secret key held outside the database, for
  example an HMAC in an HSM, to protect hashes if only the database
  leaks.
```

Execution-tested cost per guess on the build machine (one core):

```text
------------------------------------------------------------- BEGIN OUTPUT
sha256 (unsuitable)                    0.001 ms/guess  ~   1,980,414 guesses/s/core
pbkdf2-sha256, 600000 iterations     200.795 ms/guess  ~           5 guesses/s/core
scrypt n=2**14 r=8 p=1                41.447 ms/guess  ~          24 guesses/s/core
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; machine-specific)
```

**Interpretation:**

- A plain SHA-256 password hash allowed about 2 million guesses per second per CPU core in Python, and GPUs and optimised tools are far faster. PBKDF2 at 600,000 iterations reduced this to about 5 per second per core.
- The lab's scrypt setting (N=2^14, r=8, p=1) is below OWASP's recommended minimum. N=2^14 is acceptable only with p=5 in OWASP's table. The capstone tool (Module 8) uses N=2^17, r=8, p=1. Memory-hard functions (scrypt, Argon2id) also blunt GPU and ASIC attacks, which a CPU timing table does not show.
- Measure on your production hardware and choose parameters that keep login latency acceptable, for example under 0.5 seconds.
- Upgrade hashes transparently on login when parameters change. Store the algorithm and parameters with each hash, as in Course 12 Module 3.
