An OCI image is a set of content-addressed blobs:

- layers: tar archives of filesystem changes, applied in order;
- a configuration object: environment variables, default user, entry point, working directory, exposed ports and the build history;
- a manifest that lists the configuration and the layers by digest;
- optionally an index (a "manifest list") that points to one manifest per platform (linux/amd64, linux/arm64 and so on) and, with modern builders, to attestation manifests (Module 7).

Every blob is identified by the SHA-256 digest of its bytes. The digest of the manifest or index therefore identifies the whole image: change one byte of one layer and the digest changes.

A tag (kestrel-api:1.0.0, python:3.12-slim) is a movable name that a registry maps to a digest. Anyone with push rights can move it. Module 7 shows this in the lab: a rebuild pushed under the same tag silently changed what "1.0.0" meant, while the original digest still pointed to the reviewed build. Rules of thumb:

- pull and deploy by digest (name@sha256:...) where integrity matters;
- treat ":latest" as "whatever was pushed last", not as "newest stable";
- remember that everything in the configuration object is readable by anyone who can pull the image. Module 2 shows a password set with ENV appearing in plain text in the image history.

A registry stores blobs and manifests and serves them over HTTPS (the OCI distribution API). Security questions for a registry: who can push (and to which repositories); whether tags are immutable; whether pulls require authentication; whether images are scanned on push; and whether signatures and attestations are stored and verified (Module 7). Public registries are also a supply-chain source: the image you pull is code you will run.
