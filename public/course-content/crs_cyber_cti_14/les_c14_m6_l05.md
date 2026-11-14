FIRST's Traffic Light Protocol version 2.0 is authoritative from August 2022 and has four labels [R3]:

| Term | Meaning |
|---|---|
| TLP:RED | for the eyes and ears of individual recipients only, no further disclosure |
| TLP:AMBER | limited disclosure: recipients may share on a need-to-know basis within their organisation and its clients; TLP:AMBER+STRICT restricts sharing to the organisation only |
| TLP:GREEN | limited disclosure: may be shared within the community, but not via publicly accessible channels |
| TLP:CLEAR | disclosure is not limited |

TLP 1.0 was deprecated in August 2022 (its TLP:WHITE label was succeeded by TLP:CLEAR). In STIX, markings are marking-definition objects referenced through object_marking_refs (whole object) or granular markings (individual properties). The stix2 library's predefined TLP objects (used in the lab, marking-definition--f88d31f6... for AMBER and marking-definition--5e57c739... for RED) are the TLP 1.0 definitions in the STIX 2.1 specification: stix2 3.0.2 offers TLP_WHITE, TLP_GREEN, TLP_AMBER and TLP_RED, all created 2017-01-20, and no CLEAR or AMBER+STRICT object (checked in the lab environment); agree with your sharing community which marking definitions represent TLP 2.0 labels, including AMBER+STRICT, and use those. Whatever the encoding, markings only work if recipients honour them: TLP is an agreement, not an access control.
