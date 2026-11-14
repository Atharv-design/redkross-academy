Consumers and your own deployment should verify the following:

- The signature on the artefact, against the expected key or identity (Module 7).
- Provenance. The artefact digest equals the subject, and the builder, source repository and ref are the expected ones.
- Source correspondence. The released package should be what the source produces. Release tarballs that contain files not in version control, or differ from them, undermine review, as the xz case study shows. Reproducible builds (the same source and environment produce bit-identical output) let anyone check this. In the lab, rebuilding the tarball from the same file produced the same SHA-256 across runs (d6ec461b... in Module 7's two labs). But the release pipeline's tarball of the same content hashed to f0ea650f...: between the runs the source file had been restored from a backup copy, which changed its modification time, and tar records file times in the archive. Reproducible builds therefore control timestamps (for example tar --mtime and SOURCE_DATE_EPOCH), file order, ownership and tool versions.
- Dependency integrity, through hash-locked installs (Module 5).
