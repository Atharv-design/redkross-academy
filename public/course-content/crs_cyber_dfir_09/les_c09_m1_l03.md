NIST SP 800-86, "Guide to Integrating Forensic Techniques into Incident Response" (August 2006), describes a four-phase process [R1]:

| Term | Meaning |
|---|---|
| ​1. Collection | identify, label, record and acquire data from relevant sources while preserving integrity. |
| ​2. Examination | process collected data (parsing, extraction, filtering, decompression) to bring out relevant data. |
| ​3. Analysis | derive useful information from the examination results, correlating sources to answer the questions. |
| ​4. Reporting | present results, including actions taken, tools used, findings, and limitations. |

SP 800-86 is old but still a useful baseline. International standards such as ISO/IEC 27037 (identification, collection, acquisition and preservation of digital evidence) and its companions 27041-27043 cover related ground. Many laboratories also follow quality systems such as ISO/IEC 17025 accreditation. Before collection, define the questions with the client or incident lead.

**Examples:** "Did data leave web01 on 7 November?" or "How did the attacker get in?" The questions determine scope, sources and proportionality.
