Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A web edge still enables TLS 1.0 and offers RC4.

**Task:** Explain the risks and the fix.

> [!TIP] Model answer
> **Risks:** TLS 1.0 is deprecated (RFC 8996) and has known weaknesses, and RC4 is a broken cipher; both can allow interception or weakening of the protection, while the connection still appears to work. Fix: disable TLS 1.0 (and 1.1), leaving TLS 1.2 and 1.3; remove RC4 (and other weak ciphers like 3DES), offering only modern AEAD suites (AES-GCM, ChaCha20-Poly1305); verify with a configuration review. Follow NIST SP 800-52r2.
>
> **Lesson:** disable deprecated protocols and weak ciphers; require TLS 1.2+ and AEAD suites.

## Scenario 2

A company gives VPN users flat access to the entire internal network.

**Task:** Explain the risk and the better model.

> [!TIP] Model answer
> **Risk:** flat access after VPN connection means a compromised remote device (or a stolen credential) reaches the entire internal network - the VPN becomes a single point that grants everything, ignoring segmentation. Better model: least-privilege access after connection - tie the connected user to only the resources their role needs, enforced by segmentation and zero-trust (ZTNA) per-application access, with strong MFA, device posture checks and monitoring.
>
> **Lesson:** a VPN protects transit, not authorisation; grant least-privilege access after connecting, ideally via ZTNA.

## Scenario 3

Certificates are tracked manually and one just expired, causing an outage.

**Task:** Describe the fix and prevention.

> [!TIP] Model answer
> Fix the immediate outage by renewing the certificate. Prevention: automate certificate issuance and renewal (short-lived certs renewed automatically before expiry), monitor and alert on approaching expiry, maintain an inventory of certificates, use strong keys (>= 2048-bit RSA or ECDSA), and add a TLS configuration review to the deployment pipeline so weak keys/protocols and near-expiry certs are caught early.
>
> **Lesson:** automate certificate lifecycle and alert on expiry; never rely on manual tracking.
