Execution-tested localhost lab (LAB_ASSETS/C15/m06_tls.py; Python ssl linked to OpenSSL 3.0.19; server presents the Module 5 leaf and intermediate):

```text
------------------------------------------------------------- BEGIN OUTPUT
1. OK TLSv1.3 TLS_AES_256_GCM_SHA384 | hello from track.tamarind.example
2. CERT ERROR: Hostname mismatch, certificate is not valid for
   'portal.tamarind.example'.
3. CERT ERROR: unable to get local issuer certificate
4. HANDSHAKE ERROR: SSLError: [SSL: NO_CIPHERS_AVAILABLE] no ciphers
   available (_ssl.c:1081)
5. HANDSHAKE ERROR: SSLError: [SSL: TLSV1_ALERT_PROTOCOL_VERSION] tlsv1
   alert protocol version
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Reading the results:**

1. A client trusting the lab root and asking for the right name negotiated TLS 1.3 with AES-256-GCM and received data.
2. The same server reached under another name was rejected by hostname verification.
3. A client using the default system trust store, without the lab root, rejected the private-CA certificate.
4. A client capped at TLS 1.1 failed locally before any server decision: the OpenSSL build offered no cipher suites usable at that version under its security level. Python also emitted a DeprecationWarning for TLSv1_1. Modern stacks refuse legacy versions by default, which is helpful.
5. A server allowing only TLS 1.3 refused a client capped at TLS 1.2 with a "protocol version" alert.

Tools for real endpoints you are authorised to test: openssl s_client -connect host:443 -servername host -showcerts (chain and negotiated parameters), testssl.sh, and SSL Labs for public sites. Testing third-party systems requires their owner's permission.
