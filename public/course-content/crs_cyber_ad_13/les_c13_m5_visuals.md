## Precondition -> technique -> control

![A table mapping five findable preconditions to their ATT&CK techniques and the controls that fix each.](/assets/courses/cyber-13/C13-M05-F1.svg)
*Figure C13-M05-F1. Every technique has a directory precondition a defender can find and a control that removes it.*

## Why a Kerberoastable account is a target

![A flow where any user obtains a service ticket and cracks it offline, with defences of a strong key, no SPN, gMSA and AES.](/assets/courses/cyber-13/C13-M05-F2.svg)
*Figure C13-M05-F2. The ticket is encrypted with the service account's key, so a weak key can be cracked offline; length and gMSAs defeat it.*

## The legacy-svc exemplar - three findings at once

![The legacy-svc account annotated with its three findings and their severities and the combined fix.](/assets/courses/cyber-13/C13-M05-F3.svg)
*Figure C13-M05-F3. A single real account carrying three findings, as the lab review reported.*
