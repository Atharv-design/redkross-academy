A pack is a directory of rules with tests and metadata. Gates, in order, stop a release when any fails. LAB_ASSETS/C20/build_pack.py implements four gates:

| Term | Meaning |
|---|---|
| G1 unit tests | every rule has a test file and every case passes; |
| G2 ATT&CK tags | every rule carries at least one technique tag; |
| G3 purple replay | no case that the previous pack detected is now missed; |
| G4 FP budget | no rule exceeds MAX_DAILY_HITS (25) on the reference day, unless an exception is recorded. |

Further gates used in industry include linting and conversion for each backend (sigma check and convert), query performance limits, peer-review approval recorded in the pull request, and a staged deployment step. Gates must be cheap and deterministic, so that people trust them and run them on every change.
