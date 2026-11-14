> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Measure and choose password-hashing parameters

--------------------------------------------------------------------

**Objective:** Benchmark password hashing on your machine and select parameters.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C15/m04_hashing.py; optional pip install argon2-cffi.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** your machine.

**Step-by-step instructions:**

1. Run the lab and record the three timings.
2. Add scrypt at OWASP's N=2^17, r=8, p=1 (pass `maxmem=2**30`) and record the time.
3. Optionally time Argon2id at m=19456, t=2, p=1 with argon2-cffi.
4. Choose parameters that keep verification under 0.5 s, and justify the choice in two sentences.
5. Write the stored format, for example scrypt$17$8$1$<salt-b64>$<hash-b64>.

**Expected observations:** N=2^17 takes several times longer than N=2^14; all slow hashes are orders of magnitude slower than SHA-256.

**Troubleshooting:** "memory limit exceeded" with scrypt means maxmem must be raised.

**Cleanup:** none.

**Learning outcome:** you can set defensible password-hashing parameters.

## Practical 2: Implement and test webhook signing

--------------------------------------------------------

**Objective:** Implement the technical deep-dive design.

**Difficulty:** Intermediate.

**Required tools:** Python; hmac, hashlib, secrets, time.

**Prerequisites:** Lesson L04; Technical deep dive.

**Environment setup:** none.

**Explicit authorised scope:** local code.

**Step-by-step instructions:**

1. Implement sign(key, body) returning headers, and verify(key, headers, body, seen_nonces, now).
2. Tests: valid accepted; modified body rejected; old timestamp rejected; replayed nonce rejected; wrong key rejected.
3. Add key rotation with a key ID header and two keys.

**Expected observations:** all tests pass; any change rejected.

**Troubleshooting:** compare hex strings or bytes consistently in compare_digest.

**Cleanup:** none.

**Learning outcome:** you can build replay-resistant message authentication.
