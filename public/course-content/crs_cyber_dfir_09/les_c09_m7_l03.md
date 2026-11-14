**Detection sources:** SOC alerts (Course 08), user reports, third-party notification (CERT-In, law enforcement, a customer, a researcher), threat hunting, and attacker announcements such as ransom notes. Analysis confirms the incident and answers the initial questions: what happened, since when, how the attacker got in (initial access), and what they reached. Scoping finds every affected system and account, using:

- indicators from the first host (hashes, IPs, domains, file names, accounts, persistence mechanisms), swept across the estate with EDR, SIEM and hunting (Course 08 Module 8);
- account activity: where the compromised credentials were used;
- network evidence: other internal hosts that talked to the attacker's infrastructure or to the first host in unusual ways.

Scoping is iterative. Each new host yields new indicators, which feed the next sweep, until a sweep finds nothing new. Record what was swept, when, and with which indicators, because a negative sweep only covers what it looked for.
