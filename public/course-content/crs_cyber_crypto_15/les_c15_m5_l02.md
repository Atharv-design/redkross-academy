A certificate contains a subject, a public key, an issuer, a serial number, a validity period, extensions and the issuer's signature. Key extensions:

```text
subjectAltName (SAN)  DNS names or IPs the certificate is valid for.
                      Modern clients check SAN, not the CN.
basicConstraints      CA:TRUE or FALSE. pathlen limits how many CAs can
                      follow below.
keyUsage / extendedKeyUsage  what the key may do (digitalSignature,
                      keyCertSign; serverAuth, clientAuth, codeSigning).
subjectKeyIdentifier / authorityKeyIdentifier  help build chains.
CRL distribution points, Authority Information Access (OCSP, CA issuers).
```

Execution-tested (LAB_ASSETS/C15/m05_pki_lab.sh, OpenSSL 3.5.7):

```text
------------------------------------------------------------- BEGIN OUTPUT
subject=CN=track.tamarind.example
issuer=CN=Tamarind Lab Issuing CA (FICTIONAL)
X509v3 Basic Constraints: critical
    CA:FALSE
X509v3 Extended Key Usage:
    TLS Web Server Authentication
X509v3 Subject Alternative Name:
    DNS:track.tamarind.example
notBefore=Nov  7 14:02:52 2026 GMT
notAfter=Feb  5 14:02:52 2027 GMT
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

The leaf is a server certificate (serverAuth), cannot act as a CA (CA:FALSE), and is valid for one name for 90 days. Times are in GMT/UTC.
