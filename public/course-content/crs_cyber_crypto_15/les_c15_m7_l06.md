**Checklist for reviewers:**

```text
[ ] What security goals are claimed? Do the primitives provide them
    (Module 1, Figure F1)?
[ ] Is the algorithm, mode and key size current (AEAD; no ECB, MD5,
    SHA-1)?
[ ] Where do keys come from, where are they stored, and who can use them?
    Is there rotation and versioning?
[ ] Are nonces unique by construction? Is there a volume limit and
    rotation?
[ ] Are tags and signatures verified, with failures fatal and uniform?
[ ] Is AAD or context binding used?
[ ] Is randomness from a CSPRNG only?
[ ] Do password KDFs use salts and current parameters?
[ ] Is TLS verification on, with hostnames checked?
[ ] Is there a version field for agility?
[ ] Are there tests for tampering, wrong keys, truncation, parameter
    bounds and empty input?
[ ] Is the library maintained, and is its version tracked?
```

Automate the mechanical checks with SAST (Course 12 Module 4), for example rules for ECB mode, md5, random in security code and verify=False. Keep human review for design.
