> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Explore key pairs and limits

--------------------------------------------------

**Objective:** Run the lab and test RSA and ECC behaviour.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; cryptography; LAB_ASSETS/C15/m03_public_key.py.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** none.

**Explicit authorised scope:** your machine.

**Step-by-step instructions:**

1. Run the script and record all outputs.
2. Change the RSA key size to 2048 and predict the maximum OAEP-SHA256 plaintext, then verify it.
3. Time the generation of 5 RSA-3072 keys against 5 Ed25519 keys with time.perf_counter.
4. Change the HKDF info label on one side only and show that the derived keys differ.

**Expected observations:** 256 - 64 - 2 = 190 bytes for RSA-2048; Ed25519 generation far faster; keys differ with different info labels.

**Troubleshooting:** ensure cryptography is installed in the interpreter you run.

**Cleanup:** none.

**Learning outcome:** you can reason about public-key parameters.

## Practical 2: Implement hybrid file encryption

------------------------------------------------------

**Objective:** Implement the technical deep-dive design with tests.

**Difficulty:** Advanced.

**Required tools:** Python; cryptography.

**Prerequisites:** Technical deep dive; Module 2.

**Environment setup:** none.

**Explicit authorised scope:** local files you create.

**Step-by-step instructions:**

1. Implement seal(recipient_public, data) and open_(recipient_private, blob) following steps 1-6.
2. Tests: round trip; tampered ciphertext fails; wrong recipient key fails; modified ephemeral public key fails.
3. Add a version byte and reject unknown versions.
4. Document what the design does not provide (sender authentication).

**Expected observations:** all tests pass; failures raise InvalidTag.

**Troubleshooting:** serialise X25519 public keys with Encoding.Raw and PublicFormat.Raw (32 bytes).

**Cleanup:** none.

**Learning outcome:** you can compose primitives into a sound construction.
