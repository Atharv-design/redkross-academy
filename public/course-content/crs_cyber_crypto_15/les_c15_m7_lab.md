> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: See and prevent nonce reuse

-------------------------------------------------

**Objective:** Reproduce the nonce-reuse demonstration and implement a prevention.

**Difficulty:** Intermediate.

**Required tools:** Python; cryptography; LAB_ASSETS/C15/m07_misuse.py.

**Prerequisites:** Lessons L01-L02.

**Environment setup:** none.

**Explicit authorised scope:** your own lab code and fictional messages.

**Step-by-step instructions:**

1. Run python m07_misuse.py and record section 1.
2. Explain in two sentences why the key was not needed to recover P2.
3. Write an AESGCM wrapper class that generates a random 12-byte nonce internally, counts encryptions, and raises an error after a configurable limit.
4. Write tests: two encryptions of the same plaintext differ; the limit triggers; decryption works.

**Expected observations:** the XOR relation holds only with a reused nonce; the wrapper makes nonce reuse impossible for callers.

**Troubleshooting:** never accept a caller-supplied nonce in the wrapper.

**Cleanup:** none.

**Learning outcome:** you can design APIs that prevent misuse.

## Practical 2: Crypto code review

----------------------------------------

**Objective:** Review a code sample with the L06 checklist and fix it.

**Difficulty:** Intermediate.

**Required tools:** text editor; optional Semgrep (Course 12).

**Prerequisites:** Lessons L03, L06.

**Environment setup:** none.

**Explicit authorised scope:** the sample below.

**Step-by-step instructions:**

```text
1. Review this fictional function:
     def protect(data, password):
         key = hashlib.sha256(password.encode()).digest()
         iv = b"\x00" * 16
         c = Cipher(algorithms.AES(key), modes.CBC(iv)).encryptor()
         return c.update(pad(data)) + c.finalize()
2. List every finding with a checklist reference.
3. Rewrite it using scrypt with a salt, AES-GCM with a random nonce, a
   version byte and a header as AAD (you may adapt rkcrypt from Module
   8).
4. Write two Semgrep rules that would flag the original (fixed IV,
   sha256 used as a KDF).
```

**Expected observations:** at least five findings: weak KDF, no salt, fixed IV, no integrity, no versioning (and possibly padding issues).

**Troubleshooting:** compare your rewrite with the capstone tests.

**Cleanup:** none.

**Learning outcome:** you can review and correct cryptographic code.
