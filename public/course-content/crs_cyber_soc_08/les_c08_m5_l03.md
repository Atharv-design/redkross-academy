**Every indicator should carry:**

| Term | Meaning |
|---|---|
| Source and reliability | who reported it and how good their past reporting has been (some teams use the Admiralty/NATO scale, A-F source reliability, 1-6 information credibility). |
| Confidence | how sure the producer is (STIX uses 0-100). |
| Context | what it was seen doing (C2, spraying, phishing), when, against whom. |
| Validity | first seen, last seen, valid until. IP addresses are reassigned, cloud and CDN addresses are shared, domains expire and are re-registered. |

An indicator without context should not drive blocking. A shared-hosting IP "seen scanning" two years ago is close to worthless; a domain registered last week that resembles your company name, plus matches in your proxy logs, is strong.
