## About this module

Transport Layer Security (TLS) combines everything in this course:

- ephemeral key exchange (Module 3);
- certificates and signatures (Module 5);
- key derivation (Module 4);
- authenticated encryption (Module 2).

Together they give confidential, authenticated channels over untrusted networks. This module explains the TLS 1.3 handshake, how to configure servers and clients securely, how to test them, and how to manage certificates through renewal, monitoring and the shrinking lifetimes now mandated for public certificates. A localhost lab runs a TLS server with the Module 5 PKI and shows one success and four failure modes.

## Why it matters

Misconfigured TLS is one of the most common audit findings: old protocol versions, weak ciphers, missing chains and expired certificates. The rules are also changing. The IETF's updated TLS 1.3 specification (RFC 9846) forbids TLS 1.0 and 1.1, and the CA/Browser Forum has voted to reduce public certificate lifetimes in steps to 47 days by 2029 (case study).

## Where it is used

Web and API servers, load balancers and CDNs, service-to-service mTLS, VPNs, email transport, database connections, IoT devices.

## Learning objectives

1. Describe the TLS 1.3 handshake and the properties it provides.
2. Explain what changed from TLS 1.2 and why older versions are retired.
3. Configure servers and clients securely (versions, cipher suites, certificates, verification).
4. Test TLS endpoints and interpret handshake failures.
5. Use mutual TLS for service identity.
6. Manage the certificate lifecycle with automation under shrinking lifetimes.

## Before you start

**Prerequisites:** C15-M01 to C15-M05; Course 02 (TCP, DNS).

**Estimated study time:** About 8 hours.
