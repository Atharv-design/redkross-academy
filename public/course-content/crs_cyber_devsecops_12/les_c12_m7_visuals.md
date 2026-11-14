## Pipeline trust chain

![A chain from a reviewed commit through an ephemeral runner and build to a signed artefact with provenance, stored in a registry and verified at a deploy gate.](/assets/courses/cyber-12/C12-M07-F1.svg)
*Figure C12-M07-F1. Each link in the chain is protected, and the deploy gate verifies before release.*

## SLSA Build levels (v1.2)

![A list of four SLSA Build levels from no provenance to a hardened platform, marking the lab example at level 1.](/assets/courses/cyber-12/C12-M07-F2.svg)
*Figure C12-M07-F2. SLSA Build track levels, with the lab's teaching provenance at the L1 style [R3].*

## Verification outcomes

![A decision chain where an artefact is rejected if the signature is invalid, the digest does not match the provenance, or the builder or source is unexpected; otherwise it is deployed.](/assets/courses/cyber-12/C12-M07-F3.svg)
*Figure C12-M07-F3. A consumer's verification sequence (execution-tested signature and digest checks).*
