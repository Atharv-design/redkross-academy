## About this module

Symmetric cryptography uses one shared secret key for both encryption and decryption. It is fast, so it protects almost all bulk data: disk and database encryption, TLS records after the handshake, backups and files. This module explains block ciphers and their modes, stream ciphers, and why modern systems should use authenticated encryption with associated data (AEAD), which provides confidentiality and integrity together. It ends with key management: generation, storage, wrapping, rotation and destruction. Key management is where most real systems succeed or fail.

## Why it matters

Encryption without integrity lets attackers modify data undetected, and the wrong mode leaks patterns. In 2020, researchers found that a popular video-conferencing service encrypted meetings with AES-128 in ECB mode (case study). Good algorithms, poorly applied, are a recurring failure.

## Where it is used

Database and file encryption, backups, cloud KMS envelope encryption, application-layer encryption of sensitive fields, VPN and TLS data channels.

## Learning objectives

1. Explain block ciphers, modes of operation and stream ciphers.
2. Explain why ECB leaks patterns and why unauthenticated modes allow tampering.
3. Use AES-GCM and ChaCha20-Poly1305 correctly, including associated data.
4. Choose key sizes and nonce strategies.
5. Apply envelope encryption with KMS-held key-encryption keys.
6. Design key lifecycle processes: rotation, separation and destruction.

## Before you start

**Prerequisites:** C15-M01.

**Estimated study time:** About 8 hours.
