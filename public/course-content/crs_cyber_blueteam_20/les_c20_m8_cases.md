## Equifax and the expired inspection certificate, 2017

**Context:** the US Government Accountability Office report GAO-18-559 (August 2018) describes the Equifax breach. According to Equifax, attackers began extracting personal data on 13 May 2017 through an online dispute portal. The intrusion was detected on 29 July 2017, about 76 days later, and data of at least 145.5 million individuals was accessed [R1]. The report says that a device used to inspect network traffic for malicious activity had a misconfiguration caused by an expired digital certificate. The certificate had expired about 10 months before the breach, so encrypted traffic passed without inspection throughout that period. After the certificate was updated and inspection restarted, an administrator recognised signs of intrusion, such as system commands executed in ways that were not part of normal operations.

**Lessons:** monitoring infrastructure needs its own health checks (certificate expiry, inspection rates, "traffic seen but not inspected" counters). Detection worked as soon as its input was restored. This is the operational side of Module 1's lesson that blind is worse than undetected.

## (FICTIONAL TEACHING SCENARIO): The release that passed every gate

This scenario is fictional. A Tamarind engineer renamed the field "host" to "Computer" in the SIEM parser for consistency. The detection pack still passed all four gates, because the gates ran against lab events with the old field name. In production, the domain-admin rule's filter (host: ADM-01) silently stopped matching, and administrators' routine checks on ADM-01 started paging the on-call analyst every night.

**Lessons:** gates test what you give them. Add a gate that runs the pack against a sample of current production-format events, and treat parser changes as detection changes.
