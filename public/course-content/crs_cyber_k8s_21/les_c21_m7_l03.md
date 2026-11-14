A signature binds an identity to an artefact's digest. With cosign (Sigstore project) there are two models:

- key-based: you generate and protect a key pair (or keep the private key in a KMS); verifiers hold the public key. Used in this lab.
- keyless: the signer authenticates with an OIDC identity, a short-lived certificate is issued by a certificate authority (Fulcio) and the signing event is recorded in a public transparency log (Rekor). Verifiers check the identity and issuer instead of a long-lived key.

According to the cosign documentation, verification checks the signature against the supplied key, validates the claims (including that the signed digest matches the image), and, for keyless signing, the certificate and the signer's identity [R4].

The transparency log provides auditability: anyone can see that a signature was made and detect signing they did not expect. Because the lab is offline, signing used --tlog-upload=false and verification used --insecure-ignore-tlog=true. Cosign v3.1.4 marked the signing flags as deprecated in favour of a signing configuration, and printed "WARNING: Skipping tlog verification is an insecure practice that lacks transparency and auditability verification for the signature." Production signing should use a transparency log (public or private).

Protect signing keys like production credentials: store them in a KMS or HSM, restrict who and what can sign (the release pipeline, not people's laptops), log every signing operation, and plan key rotation and revocation. The lab key pair (supply/keys) protects nothing real and is excluded from the distributed library.
