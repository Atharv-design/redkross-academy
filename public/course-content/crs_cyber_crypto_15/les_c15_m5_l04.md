A client validating a server certificate checks:

1. path building: a chain from leaf to a trusted root exists;
2. a valid signature on each certificate by its issuer;
3. the validity period at the current time;
4. basic constraints, path length and key usage at each level;
5. a name match: the requested hostname is in the SAN;
6. revocation status, according to policy (L05);
7. policy extras, such as Certificate Transparency requirements and pinning, where used.

Execution-tested outcomes with the lab PKI:

```text
------------------------------------------------------------- BEGIN OUTPUT
== 1. full chain, correct host
leaf.crt: OK
== 2. missing intermediate
error 20 at 0 depth lookup: unable to get local issuer certificate
== 3. wrong hostname
error 62 at 0 depth lookup: hostname mismatch
== 4. checked at a date after expiry (attime = now + 120 days)
error 10 at 0 depth lookup: certificate has expired
== 5. untrusted root (system store only)
error 20 at 1 depth lookup: unable to get local issuer certificate
--------------------------------------------------------------- END OUTPUT
(execution-tested; OpenSSL 3.5.7)
```

**Reading the errors:**

- Case 2: the server sent only the leaf. "depth 0" means the leaf, and its issuer could not be found. This is the most common real-world chain error.
- Case 3: the certificate is genuine, but for a different name.
- Case 4: -attime simulated the date 120 days ahead, past the 90-day validity. Expiry outages are common, so monitor expiry.
- Case 5: the lab root is not in the system trust store. "depth 1" means the intermediate's issuer (the root) is not trusted.

Never "fix" these errors by disabling verification (verify=False, CERT_NONE). That removes the protection TLS provides (Module 6).
