## MTD, RTO and RPO on a timeline

![A timeline showing the RPO before the disruption, the recovery period up to the RTO, and the MTD as the outer limit, with the rules RTO at most MTD and backup interval at most RPO.](/assets/courses/cyber-17/C17-M05-F1.svg)
*Figure C17-M05-F1. RPO looks back from the disruption; RTO and MTD look forward.*

## Dependency check (lab)

![A tree under the dispatch process listing three dependencies with their recovery times; the courier API exceeds the process target.](/assets/courses/cyber-17/C17-M05-F2.svg)
*Figure C17-M05-F2. One dependency prevents the dispatch RTO from being met (execution-tested check).*

## Recovery order for cyber recovery

![A sequence from evidence preservation and a clean environment through network, identity, data and applications to integrity checks, staged reconnection and monitoring.](/assets/courses/cyber-17/C17-M05-F3.svg)
*Figure C17-M05-F3. A typical restoration sequence after a cyber incident.*
