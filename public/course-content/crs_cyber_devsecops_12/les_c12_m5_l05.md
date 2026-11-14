- Pin exact versions in lock files for reproducible builds (requirements.txt generated with pip-compile, poetry.lock, package-lock.json).
- Verify hashes. pip's hash-checking mode refuses packages whose hash is missing or different.
- Use one approved index or proxy (an internal mirror) and reserve internal package names, to prevent dependency confusion (Module 2 case study).
- Vet new dependencies before adoption: maintenance activity, maintainers, OpenSSF Scorecard, licence and transitive weight.
- Prefer fewer dependencies. Every one is code you trust.

Execution-tested hash checking (pip in python:3.12-slim):

```text
------------------------------------------------------------- BEGIN OUTPUT
== require-hashes without hashes
ERROR: Hashes are required in --require-hashes mode, but they are missing
from some requirements. ...
    requests==2.25.0 --hash=sha256:e786fa28d8c9154e6a4de5d46a1d921b...
== hash-pinned file for one package
requests==2.32.4 --hash=sha256:27babd3cda2a6d50b30443204ee89830707d3966...
install with matching hash: OK
ERROR: THESE PACKAGES DO NOT MATCH THE HASHES FROM THE REQUIREMENTS FILE.
        Expected sha256 07babd3cda2a6d50b30443204ee89830707d396671944c99...
             Got        27babd3cda2a6d50b30443204ee89830707d396671944c99...
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; hashes truncated)
```

pip refused to install in hash mode without hashes, installed when the hash matched, and refused when one hex digit of the expected hash was changed. The same check would reject a tampered or substituted file.
