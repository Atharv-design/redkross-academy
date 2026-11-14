## About this module

A cryptographic hash function turns any input into a short fingerprint that changes unpredictably if the input changes. Hashes underpin file integrity, digital signatures, certificates, git, blockchains and password storage. Used incorrectly, they fail in specific ways: unkeyed hashes do not authenticate, fast hashes do not protect passwords, and broken hashes allow collisions. This module covers hash properties and algorithm choice, the avalanche effect, HMAC for message authentication, and password hashing with salts and tuned work factors.

## Why it matters

SHA-1 was used for decades in certificates and signatures. In February 2017 researchers produced two different PDF files with the same SHA-1 hash (case study). Meanwhile, password databases hashed with fast, unsalted algorithms continue to be cracked after breaches.

## Where it is used

Evidence integrity (Course 09), software distribution checksums, API request signing and webhooks (HMAC), password storage, key derivation, deduplication.

## Learning objectives

1. State the security properties of cryptographic hash functions.
2. Choose current hash algorithms and retire weak ones.
3. Explain when a hash alone is insufficient and use HMAC.
4. Verify MACs safely in constant time.
5. Store passwords with Argon2id, scrypt or PBKDF2 using correct parameters and salts.
6. Use KDFs correctly (HKDF versus password KDFs).

## Before you start

**Prerequisites:** C15-M01 to C15-M03; Course 09 Module 2 (hash verification).

**Estimated study time:** About 7 hours.
