The Admiralty (NATO) system grades two things separately:

| Term | Meaning |
|---|---|
| Source reliability | Information credibility |
| A completely reliable | 1 confirmed by other sources |
| B usually reliable | 2 probably true |
| C fairly reliable | 3 possibly true |
| D not usually reliable | 4 doubtful |
| E unreliable | 5 improbable |
| F cannot be judged | 6 cannot be judged |

A reliable source can pass on an improbable claim, and an unknown source can be right, so a grade such as B3 or E5 always has two parts. The lab's source register gives reliability per source (the national CERT and Nilgiri's own SOC are A; the vendor and the ISAC are B; a researcher's social media thread is C; an anonymous paste site is E); each report has a credibility value.

Corroboration means independent confirmation. Two reports are not independent if one copies the other (circular reporting - common when sharing communities repost vendor blogs). source_eval.py counts a claim as corroborated only when a report from a different source shares a technique or an indicator. In the lab only RPT-004 (national CERT) and RPT-006 (Nilgiri SOC) corroborate each other; the E5 paste-site claim is uncorroborated and flagged "do not use as the basis of a judgment".

**Remember deliberate deception:** adversaries plant false trails (Module 4).
