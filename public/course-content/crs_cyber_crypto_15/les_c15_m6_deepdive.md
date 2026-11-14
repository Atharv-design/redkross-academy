From m06_tls.py (execution-tested):

```text
Server:
  ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
  ctx.minimum_version = ssl.TLSVersion.TLSv1_2      # or TLSv1_3
  ctx.load_cert_chain("pki/chain.pem", "pki/leaf.key")
chain.pem = leaf.crt + int.crt. The server sends the intermediate, so
clients can build the path (Module 5, case 2).
Client:
  ctx = ssl.create_default_context(cafile="pki/root.crt")
  with ctx.wrap_socket(sock, server_hostname="track.tamarind.example") as s:
      s.version(), s.cipher()
create_default_context enables certificate verification and hostname
checking (CERT_REQUIRED, check_hostname=True). server_hostname sets SNI
and the name to verify.
```

**Design notes:**

- The server binds only to 127.0.0.1 on an ephemeral port, so nothing is exposed to the network.
- Exceptions are separated: ssl.SSLCertVerificationError, with its verify_message, for trust and name problems, and ssl.SSLError for protocol negotiation. Log both distinctly in production clients, as they need different fixes.
- Setting maximum_version on the client simulates a legacy client. No insecure options were needed to reproduce real-world failures.
