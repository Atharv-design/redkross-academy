The Traffic Light Protocol (TLP), maintained by FIRST, tells recipients how far they may share information. Version 2.0 applies from August 2022 [R2]:

| Term | Meaning |
|---|---|
| TLP:RED | for named recipients only; no further disclosure. |
| TLP:AMBER | need-to-know within the recipient organisation and its clients (TLP:AMBER+STRICT restricts to the organisation only). |
| TLP:GREEN | within the recipient's community, not via public channels. |
| TLP:CLEAR | no disclosure limits (subject to copyright); replaced TLP:WHITE. |

Respect the label when you paste IOCs into a public sandbox, a vendor ticket or a chat group - violating TLP damages trust and future sharing. STIX 2.1 (Structured Threat Information Expression), an OASIS Standard since 10 June 2021, defines objects for exchanging intelligence [R3]. Domain objects include indicator, malware, threat-actor, intrusion-set, campaign, attack-pattern, infrastructure, vulnerability, report and others; relationship objects connect them ("indicator indicates malware"). An indicator carries a pattern such as

```text
[domain-name:value = 'cdn-telemetry-sync.example']
```

plus properties including valid_from, valid_until and confidence. TAXII is the companion protocol for transporting STIX over HTTPS. Platforms such as MISP and OpenCTI store and share such data.
