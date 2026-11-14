STIX 2.1 is an OASIS standard; the current text is "STIX Version 2.1 Errata 01", an OASIS Standard dated 2 April 2025 [R1]. Its building blocks:

- STIX Domain Objects (SDOs), the higher-level concepts. The specification's overview lists 18: Attack Pattern, Campaign, Course of Action, Grouping, Identity, Indicator, Infrastructure, Intrusion Set, Location, Malware, Malware Analysis, Note, Observed Data, Opinion, Report, Threat Actor, Tool and Vulnerability.
- STIX Relationship Objects (SROs): the generic Relationship ("indicates", "uses", "targets" and so on) and the Sighting.
- STIX Cyber-observable Objects (SCOs) for facts such as domain names, addresses, files and URLs.
- Marking definitions for handling (L05), and Bundles to carry collections of objects.

Every object has a type-prefixed identifier (campaign--<UUID>), created and modified timestamps, and optionally created_by_ref, confidence, labels and external_references. Versioning works by issuing the same identifier with a later modified time.
