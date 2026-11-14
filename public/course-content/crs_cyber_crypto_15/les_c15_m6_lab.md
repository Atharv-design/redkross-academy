> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

## Practical 1: TLS on localhost

--------------------------------------

**Objective:** Reproduce the TLS outcomes and inspect a handshake.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; OpenSSL 3.x; LAB_ASSETS/C15 (run m05_pki_lab.sh first).

**Prerequisites:** Lessons L02-L04.

**Environment setup:** from LAB_ASSETS/C15: python m06_tls.py

**Explicit authorised scope:** 127.0.0.1 only.

**Step-by-step instructions:**

1. Run the script and record the five results.
2. Start an OpenSSL test server: openssl s_server -accept 127.0.0.1:8443 -cert pki/leaf.crt -key pki/leaf.key -cert_chain pki/int.crt -www
3. In another terminal: openssl s_client -connect 127.0.0.1:8443 -servername track.tamarind.example -CAfile pki/root.crt -brief, and note the protocol, cipher, peer certificate and verification result.
4. Repeat step 3 with -tls1_2 and compare.
5. Stop the server (Ctrl+C).

**Expected observations:** as in L04. In this build (OpenSSL 3.5.7, execution-tested, server bound to 127.0.0.1:8443), s_client -brief showed:

```text
Protocol version: TLSv1.3  Ciphersuite: TLS_AES_256_GCM_SHA384
Peer certificate: CN=track.tamarind.example  Signature type:
ecdsa_secp256r1_sha256  Verification: OK
```

and with -tls1_2: Protocol version: TLSv1.2  Ciphersuite: ECDHE-ECDSA-AES256-GCM-SHA384.

**Troubleshooting:** on Windows Git bash, prefix with MSYS_NO_PATHCONV=1 if paths are rewritten, and allow the local firewall prompt for 127.0.0.1 only.

**Cleanup:** stop the server; no files are created.

**Learning outcome:** you can test TLS configurations.

## Practical 2: Add mutual TLS

------------------------------------

**Objective:** Extend the lab to require client certificates.

**Difficulty:** Advanced.

**Required tools:** as P1.

**Prerequisites:** Lesson L05; Module 5 lab.

**Environment setup:** as P1.

**Explicit authorised scope:** localhost.

**Step-by-step instructions:**

1. Issue a client certificate from the lab intermediate with extendedKeyUsage=clientAuth and SAN URI:spiffe://tamarind.example/courier.
2. Set the server's verify_mode to CERT_REQUIRED and load the CA for client verification.
3. Show that a client without a certificate fails and one with it succeeds.
4. Print the client SAN on the server and authorise only .../courier.

**Expected observations:** handshake failure without a client certificate; success and an authorisation decision with it.

**Troubleshooting:** the client must load_cert_chain with the client cert and key; the server needs the issuing CA in load_verify_locations.

**Cleanup:** none.

**Learning outcome:** you can implement service identity with mTLS.
