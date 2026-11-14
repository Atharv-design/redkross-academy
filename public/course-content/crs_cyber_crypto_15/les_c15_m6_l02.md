Simplified full handshake (one round trip):

1. ClientHello: supported versions, cipher suites, key shares (for example an X25519 public key), server name (SNI) and other extensions.
2. ServerHello: chosen version and suite, plus the server's key share. Both sides now compute the ECDHE shared secret and derive handshake keys (HKDF-based key schedule).
3. The rest of the server's flight is encrypted: EncryptedExtensions, Certificate (the chain), CertificateVerify (a signature over the handshake transcript with the certificate key, which proves possession and prevents tampering), and Finished (a MAC over the transcript).
4. The client verifies the chain and hostname (Module 5), checks CertificateVerify and Finished, and sends its own Finished.
5. Application data flows under AEAD keys derived from the handshake.

Key improvements over TLS 1.2: static RSA key transport and static Diffie-Hellman were removed, so all key exchange gives forward secrecy [R1]. More of the handshake, including the certificate, is encrypted. Only AEAD cipher suites remain. Optional 0-RTT resumption data can be replayed, so use it only for idempotent requests. TLS 1.3 cipher suites name only the AEAD and the hash, for example TLS_AES_256_GCM_SHA384, TLS_AES_128_GCM_SHA256 and TLS_CHACHA20_POLY1305_SHA256. Key exchange groups (X25519, P-256, and hybrid post-quantum groups in newer implementations) are negotiated separately.
