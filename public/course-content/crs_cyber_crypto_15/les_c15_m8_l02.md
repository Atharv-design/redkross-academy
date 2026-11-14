Decisions, each traceable to earlier modules:

```text
KDF        scrypt N=2^17, r=8, p=1. OWASP's recommended minimum (Module
           4), with a fresh 16-byte random salt per file (Module 1).
AEAD       AES-256-GCM with a fresh 12-byte random nonce per file
           (Modules 2 and 7). There is one encryption per derived key,
           because each file has a new salt and therefore a new key, so
           nonce reuse is impossible by construction.
Header as AAD  every header byte is authenticated (Module 2 deep dive).
           Changing the salt or KDF parameters causes authentication
           failure, not a silent wrong key.
Versioning a magic value "RKC1" and a KDF identifier for agility
           (Module 1).
Bounds     decrypt rejects KDF parameters outside accepted ranges, so a
           malicious header cannot force huge memory use.
Failure    one generic authentication error for a wrong passphrase or a
           modified file (Module 7, uniform errors).
```

**File format (big-endian):**

```text
---------------------------------------------------------------- BEGIN CODE
offset size field
0      4    magic   b"RKC1"
4      1    kdf     0x01 = scrypt
5      1    log2n   scrypt N exponent (accepted 14-20)
6      1    r       (accepted 1-16)
7      1    p       (accepted 1-4)
8      16   salt    random
24     12   nonce   random
36     n+16 ciphertext || GCM tag; AAD = bytes 0..35
------------------------------------------------------------------ END CODE
```

Execution-tested CLI run (LAB_ASSETS/C15/rkcrypt, passphrase from the RKCRYPT_PASS variable):

```text
------------------------------------------------------------- BEGIN OUTPUT
3fa4acd70c052f6a5b15c4ed2ddbff3e304a4bf708a460c5e6114dd1945a4e09
  payroll_demo.csv
encrypted 55 -> 107 bytes: payroll_demo.rkc
exit=0
header: b'RKC1' kdf 1 log2n 17 r 8 p 1 salt 9f93f310... total 107
decrypted 107 -> 55 bytes: payroll_out.csv
exit=0
3fa4acd70c052f6a5b15c4ed2ddbff3e304a4bf708a460c5e6114dd1945a4e09
  payroll_out.csv
error: authentication failed: wrong passphrase or modified file
exit=1            (one byte of ciphertext flipped)
error: authentication failed: wrong passphrase or modified file
exit=1            (wrong passphrase)
error: No such file or directory
exit=2            (missing input)
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; annotations in brackets added; wrapped)
```

The 107 bytes are the 36-byte header, 55 bytes of ciphertext and a 16-byte tag. The SHA-256 of the decrypted file equals the original's.
