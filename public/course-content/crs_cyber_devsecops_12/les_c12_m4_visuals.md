## Taint analysis

![A flow from a request parameter through a variable and a function to a database sink, with a sanitiser check determining whether a finding is raised.](/assets/courses/cyber-12/C12-M04-F1.svg)
*Figure C12-M04-F1. Taint analysis reports a path from an untrusted source to a dangerous sink without a sanitiser.*

## SAST in the pipeline

![A flow from the IDE to a pull-request scan whose non-zero exit blocks the merge until fixed or justifiably suppressed, followed by nightly full scans and backlog triage.](/assets/courses/cyber-12/C12-M04-F2.svg)
*Figure C12-M04-F2. Where SAST runs and how its exit code controls the merge.*

## Triage outcomes

![A decision tree from a finding to false positive, true positive with fix and test, or accepted risk with a waiver.](/assets/courses/cyber-12/C12-M04-F3.svg)
*Figure C12-M04-F3. Classifying a SAST finding.*
