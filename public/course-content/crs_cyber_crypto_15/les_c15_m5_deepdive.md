Commands from m05_pki_lab.sh (execution-tested, OpenSSL 3.5.7):

```text
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out root.key
openssl req -x509 -new -key root.key -config root.cnf -extensions v3_ca
   -days 3650 -out root.crt
openssl req -new -key int.key -subj "/CN=Tamarind Lab Issuing CA
   (FICTIONAL)" -out int.csr
openssl x509 -req -in int.csr -CA root.crt -CAkey root.key -CAcreateserial
   -days 1825 -extfile root.cnf -extensions v3_int -out int.crt
openssl x509 -req -in leaf.csr -CA int.crt -CAkey int.key -CAcreateserial
   -days 90 -extfile root.cnf -extensions v3_leaf -out leaf.crt
openssl verify -CAfile root.crt -untrusted int.crt
   -verify_hostname track.tamarind.example leaf.crt
```

Profile sections in root.cnf:

| Term | Meaning |
|---|---|
| v3_ca | basicConstraints=critical,CA:TRUE; keyUsage=critical,keyCertSign, cRLSign |
| v3_int | CA:TRUE,pathlen:0; keyUsage as above; authorityKeyIdentifier |
| v3_leaf | CA:FALSE; keyUsage=critical,digitalSignature; extendedKeyUsage=serverAuth; subjectAltName=DNS:track.tamarind.example |

**Notes:**

- -untrusted supplies intermediates for path building without trusting them. Only -CAfile holds trust anchors.
- The CSR (certificate signing request) proves possession of the private key, which never leaves the requester.
- The .example domain is reserved for documentation, so these certificates can never collide with real sites.
