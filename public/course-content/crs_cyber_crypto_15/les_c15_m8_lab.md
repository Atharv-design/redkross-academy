> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Run, read and break rkcrypt

-------------------------------------------------

**Objective:** Reproduce the CLI run and the test suite, and explain each result.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; cryptography; LAB_ASSETS/C15/rkcrypt.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** cd LAB_ASSETS/C15/rkcrypt

**Explicit authorised scope:** lab files only.

**Step-by-step instructions:**

1. Run python -m unittest test_rkcrypt -v and record "Ran 11 tests ... OK".
2. Set RKCRYPT_PASS and encrypt and decrypt payroll_demo.csv. Confirm the hashes match.
3. Flip one byte in the header (offset 6, the r value) of the encrypted file and try to decrypt. Then flip one at offset 40, in the ciphertext. Record both errors.
4. Remove the header-as-AAD (pass None) in a copy of the code, and show that test_modified_header_salt_detected still passes, because a changed salt gives a wrong key. Then modify the log2n byte within range and explain why AAD gives earlier, clearer guarantees.

**Expected observations:** authentication failure with exit 1 for tampering; discussion of why authenticating the header matters for all fields.

**Troubleshooting:** if decryption is slow, that is scrypt at N=2^17 (about 0.1-0.5 s), which is expected.

**Cleanup:** delete generated files.

**Learning outcome:** you can verify and reason about a cryptographic tool.

## Practical 2: Write the security document

-------------------------------------------------

**Objective:** Produce the L05 document for rkcrypt.

**Difficulty:** Intermediate.

**Required tools:** text editor.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** documentation.

**Step-by-step instructions:**

1. Write all eight sections, in at most four pages.
2. Cite at least four references from this course, for example the OWASP Password Storage Cheat Sheet, NIST SP 800-38D, NIST SP 800-57 and the pyca/cryptography AEAD documentation.
3. List at least five limitations.
4. Include the test evidence table with versions.

**Expected observations:** a reviewer can decide whether rkcrypt fits a given risk from the document alone.

**Troubleshooting:** avoid claims you cannot support, such as "military-grade" or "unbreakable".

**Cleanup:** none.

**Learning outcome:** you can document cryptographic designs professionally.
