## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

Lab assets ---------- LAB_ASSETS/C15/ contains one script per module, each with a saved `*_output.txt:`

| Term | Meaning |
|---|---|
| m01_randomness.py | seeded random versus secrets; entropy estimates |
| m02_symmetric.py | AES-GCM, ChaCha20-Poly1305, ECB pattern leakage, key wrapping |
| m03_public_key.py | RSA-OAEP, Ed25519, ECDSA, X25519 with HKDF |
| m04_hashing.py | avalanche effect, HMAC, password-hashing cost |
| m05_pki_lab.sh | a three-tier lab PKI with OpenSSL and five validation cases |
| m06_tls.py | TLS on 127.0.0.1 with the lab PKI: success and four failures |
| m07_misuse.py | nonce reuse, weak key derivation, MAC comparison |
| rkcrypt/ | the capstone reference tool with 11 unit tests |

All labs were execution-tested on 2026-11-07 with these tool versions:

- CPython 3.14.4 with the pyca/cryptography library 48.0.0;
- OpenSSL 3.5.7 from the command line;
- Python's ssl module, linked to OpenSSL 3.0.19.

Timing figures are from the build machine and will differ on yours. Certificates use the reserved .example domain and are marked FICTIONAL. Misuse demonstrations (ECB, nonce reuse) exist so that you can recognise and prevent these mistakes in code review. Never use them in software.

**Access classification note:** per the blueprint, Course 15 is "PAID advanced".
