Signatures are attached to digests. When you verify "image:tag", cosign resolves the tag to whatever digest it points to now, then looks for signatures on that digest. The lab showed the consequence:

1. Release 1.0.0 (digest sha256:07dcdcda...bfa77) was signed; verification by tag succeeded.
2. A rebuild with an extra file was pushed under the same tag 1.0.0. The tag now pointed to a new digest.
3. Verification by tag failed with "Error: no signatures found" - the new digest was never signed.
4. Verification of the original digest still succeeded.

So signing defends against tag tampering only if something verifies at deploy time. The deployment itself should reference the digest, so that what was verified is exactly what runs; otherwise the tag could move between verification and pull. Registries can also make tags immutable, which is a useful extra control but not a substitute.
