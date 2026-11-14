Hashes prove that two files are identical. Signatures prove who produced a file and that it has not changed since. Sigstore's cosign signs and verifies artefacts and container images. It supports key pairs, including keys held in a cloud KMS, and "keyless" signing with short-lived certificates tied to an OIDC identity and recorded in a transparency log [R2]. Execution-tested (LAB_ASSETS/C12/signing_lab.sh, cosign v3.1.4, local key pair; no transparency log upload, for an offline lab):

```text
------------------------------------------------------------- BEGIN OUTPUT
== generate key pair (lab only; production keys belong in a KMS/HSM)
cosign.key
cosign.pub
== sign
Wrote bundle to file shipments.bundle
== verify original
Verified OK
== tamper: append one byte to a copy and verify
Error: failed to verify signature: could not verify message: invalid
signature when validating ASN.1 encoded signature
== hashes
d6ec461b7ce35ebd8974426984c91f553a6ab03c2869b2dec37a63703a3ff32a
  shipments-1.0.0.tgz
8e64c85b3a66d2cb3d1e809d22ca1444ee1ffd300ee925395a72f1c6a0940347
  tampered.tgz
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Observations:**

- The original artefact verified. A copy with one extra byte failed signature verification. The deployment step must treat a failure as a hard stop.
- cosign v3 changed flags. Disabling transparency-log upload required --use-signing-config=false with --tlog-upload=false, and verification printed a warning that skipping the log is insecure. In production, prefer the transparency log (or keyless signing) for auditability. Record tool versions, because security tooling changes behaviour between releases.
- The lab deletes cosign.key after use. Real signing keys belong in a KMS or HSM, used only by the release job's identity.

**Deployment rule:** deploy only artefacts whose signature verifies against the expected key or identity. Kubernetes admission controllers and registry policies can enforce this for container images (Course 21).
