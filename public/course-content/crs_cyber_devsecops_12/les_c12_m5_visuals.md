## Direct versus transitive coverage

![Two boxes compare three manifest pins with six resolved packages, including three transitive ones, showing a manifest-only SBOM misses half of them.](/assets/courses/cyber-12/C12-M05-F1.svg)
*Figure C12-M05-F1. An SBOM built from the manifest missed the transitive packages that the scan and licence listing found (execution-tested).*

## Dependency control points

![A chain from approved index through lock file, hashed install, SBOM, vulnerability gate and licence check to a signed release and daily re-scanning.](/assets/courses/cyber-12/C12-M05-F2.svg)
*Figure C12-M05-F2. Controls from package source to post-release monitoring.*

## Prioritising an advisory

![A decision tree prioritising exploited vulnerabilities first, then reachable and exposed ones, and otherwise routine upgrades or time-limited waivers.](/assets/courses/cyber-12/C12-M05-F3.svg)
*Figure C12-M05-F3. A simple decision path for dependency advisories.*
