The intelligence lifecycle is usually described in six phases:

1. Direction (planning): agree requirements and priorities.
2. Collection: gather data from sources mapped to the EEIs.
3. Processing: normalise, translate, de-duplicate, store.
4. Analysis and production: evaluate sources, analyse, write.
5. Dissemination: deliver the right product to the right consumer in time, with handling markings (TLP, Module 6).
6. Feedback: consumers say what was useful; requirements change.

The phases overlap in practice; the value of the model is that every phase is someone's job and failure in any phase breaks the chain.

A collection plan maps each EEI to sources (internal telemetry, sharing communities, commercial reports, open sources) and records status. The lab's requirements_view.py does a deliberately simple version: it matches EEIs to report text by keywords and lists gaps. Its output (deep dive) shows two gaps: no report names tools used by the campaign (SIR-1.2), and PIR-3 cannot be collected against. It also shows the limits of keyword matching: RPT-002 was matched to "hosting addresses" because it contains the word "servers", although it gives no address. Collection management needs analyst judgment; tools only speed up bookkeeping.
