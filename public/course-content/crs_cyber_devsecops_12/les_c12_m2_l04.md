STRIDE, developed at Microsoft, gives six threat categories, each the violation of a security property [R2]:

```text
S  Spoofing                 (authenticity)  pretending to be another
                                            user or service
T  Tampering                (integrity)     modifying data or code
R  Repudiation              (non-repudiation) denying an action
                                            without evidence
I  Information disclosure   (confidentiality) exposing data
D  Denial of service        (availability)  degrading or stopping the
                                            service
E  Elevation of privilege   (authorisation) gaining rights not granted
```

A common heuristic applies categories by element type. Processes are prone to all six. Data stores are prone to T, R (for logs), I and D. Data flows are prone to T, I and D. External entities are prone to S and R. Walk each element and each boundary-crossing flow, and ask what each relevant category would look like there. Write threats as short, specific statements, for example "a logged-in customer can read another customer's shipment by changing the tracking ID", not "authorisation issues". Other methods suit other purposes: LINDDUN for privacy threats, PASTA for risk-centric analysis, attack trees for deep analysis of one goal, and ATT&CK for operational detection (Course 08 Module 6).
