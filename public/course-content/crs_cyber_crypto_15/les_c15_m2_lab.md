> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: Authenticated encryption and tampering

------------------------------------------------------------

**Objective:** Run the lab and extend it with record binding.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; pip install cryptography; LAB_ASSETS/C15.

**Prerequisites:** Lessons L02, L04.

**Environment setup:** none.

**Explicit authorised scope:** your own machine.

**Step-by-step instructions:**

1. Run python m02_symmetric.py and record all five sections.
2. Write encrypt_field(key, record_id, field, value) and decrypt_field, using AAD = f"{record_id}|{field}".
3. Show that a ciphertext moved to another record_id fails with InvalidTag.
4. Add a version byte and key_id to the stored blob, as in the technical deep dive.

**Expected observations:** ECB shows 2 distinct of 4 blocks; tampering and AAD mismatch raise InvalidTag; moved ciphertexts fail.

**Troubleshooting:** AAD must be bytes, so encode strings with .encode().

**Cleanup:** none.

**Learning outcome:** you can use AEAD with context binding.

## Practical 2: Envelope encryption design

------------------------------------------------

**Objective:** Design and prototype envelope encryption with key rotation.

**Difficulty:** Intermediate.

**Required tools:** Python; the cryptography keywrap module.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** local prototype.

**Step-by-step instructions:**

1. Create KEK v1 and KEK v2 (local stand-ins for KMS keys).
2. Encrypt three files with per-file DEKs wrapped by KEK v1, storing key_id=1.
3. Rotate: re-wrap each DEK with KEK v2 and update key_id, without touching the file ciphertexts.
4. Decrypt all files after rotation, and record the time saved compared with re-encrypting the data.
5. Describe how a real KMS would log each unwrap.

**Expected observations:** rotation touches only 40-byte wrapped keys.

**Troubleshooting:** keep KEKs at 32 bytes for AES-256 key wrap.

**Cleanup:** delete lab keys.

**Learning outcome:** you can rotate keys without bulk re-encryption.
