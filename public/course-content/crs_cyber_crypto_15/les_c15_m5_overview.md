## About this module

A public key is only useful if you know whose it is. Digital signatures prove that data came from the holder of a private key and has not changed. Certificates bind public keys to names, and they are themselves signed by certificate authorities (CAs) that relying parties choose to trust. This module covers how signatures work and what they prove, the structure of X.509 certificates, how PKIs are organised (roots, intermediates and leaves), how validation works step by step, and how revocation and Certificate Transparency keep the system honest. The lab builds a three-tier PKI with OpenSSL and makes validation fail in four different ways.

## Why it matters

When a CA is compromised, attackers can impersonate any website. In 2011, an intrusion at the Dutch CA DigiNotar led to hundreds of rogue certificates, including one for google.com used against users in Iran. Browsers then removed trust in DigiNotar (case study). Inside organisations, private PKIs secure VPNs, device identity, internal TLS and code signing.

## Where it is used

HTTPS, internal TLS and mTLS, code and document signing, email (S/MIME), device and Wi-Fi certificates (802.1X), India's digital signature certificates issued by licensed CAs under the IT Act's Controller of Certifying Authorities framework.

## Learning objectives

1. Explain what a digital signature proves and the sign/verify process.
2. Read X.509 certificates: subject, issuer, validity, SAN, key usage, basic constraints.
3. Describe PKI hierarchies and trust stores.
4. Perform and interpret chain validation, including common failures.
5. Explain revocation (CRL, OCSP) and Certificate Transparency.
6. Operate a small private PKI safely.

## Before you start

**Prerequisites:** C15-M01 to C15-M04.

**Estimated study time:** About 8 hours.
