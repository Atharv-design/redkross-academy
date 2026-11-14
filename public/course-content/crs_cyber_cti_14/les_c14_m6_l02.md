MONSOON LANTERN in STIX (stix_build.py):

| Term | Meaning |
|---|---|
| Identity | Nilgiri Mutual CTI (fictional), the producer |
| Campaign | MONSOON LANTERN, first_seen 2026-10-02, confidence 70, described as not attributed - deliberately NOT an Intrusion Set or Threat Actor (Module 4) |
| Indicator x10 | the active indicators from the Module 5 pipeline, each with a STIX pattern, valid_from, valid_until (from the type half-life), confidence (the pipeline score) and labels naming the reporting feeds |
| Relationship | indicator "indicates" campaign (10); campaign "uses" attack pattern (7) |
| Attack Pattern x7 | the ATT&CK techniques, with external references (source_name mitre-attack, external_id, URL) |
| Sighting | of 198.51.100.77: count 6, first and last seen on 28 October, where_sighted_refs Nilgiri; marked TLP:RED |
| Report | the flash report, referencing all other objects |

**Choices to notice:** the sighting is the most sensitive object (it reveals that Nilgiri was hit), so it carries a stricter marking than the indicators; the confidence values travel with the data instead of disappearing into prose.
