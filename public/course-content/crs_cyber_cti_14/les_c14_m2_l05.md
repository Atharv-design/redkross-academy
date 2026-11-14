Open-source collection often sweeps up personal data: names, e-mail addresses, phone numbers, identity numbers of victims in leaked files. Principles from the Berkeley Protocol include minimising the risk of harm to investigators, their organisations and third parties; protecting the privacy of sources; recognising that public availability does not remove privacy implications; collecting and processing information only when justified for an articulable purpose (data minimisation); and security by design [R1].

**In practice:**

- collect only what the requirement needs; infrastructure indicators usually suffice for CTI;
- minimise before analysis and sharing: the lab's minimise.py replaces e-mail addresses, Indian mobile numbers, 12-digit numbers in 4-4-4 groups (the shape of an Aadhaar number) and the PAN shape with typed placeholders while keeping domains and addresses;
- restrict access to raw collections, set retention periods, and never redistribute victims' data.

Test minimisation like any control. The first version of minimise.py missed a mobile number written as "+91 98765 43210" (with a space); the pattern now accepts the 5+5 form (deep dive). Patterns will always miss some formats, so human review remains part of the process.
