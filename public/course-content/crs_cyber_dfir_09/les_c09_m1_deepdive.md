A collection plan turns questions into a prioritised list of sources. Plan for the course scenario (Tamarind Logistics, web01; used in Modules 6 and 8):

```text
Question: "Was the customer list copied off web01 on 2026-11-07, by whom
and how?"
Source               Volatility  Method                   Authority/notes
web01 memory         high        memory capture tool       live; record
                                  (Module 4)                footprint
web01 process/net    high        live response script      read-only
state                            (Module 4 lab)             commands; log
web01 disk           medium      image of volume or VM     verify hash
                                 snapshot (Module 2)
web01 auth.log,      medium      copy from central log     compare with
web access log                   server + local copy        local copies
network capture      depends     existing sensor pcap      export window +
(if any)                         (Module 6)                 hash
firewall/proxy logs  low         SIEM export (Course 08)   query recorded
admin interviews     -           HR/legal-led              not by examiner
                                                            alone
```

Each line names who collects and where the item is stored. The plan is revised as findings emerge. If memory shows a connection to an unknown IP, that IP's flow records are added.

**Common pitfalls:**

- collecting only the "interesting" host, when the attacker came from another;
- forgetting cloud audit logs with short default retention;
- not recording time zones and clock offsets (Course 08 Module 2);
- copying files with tools that change timestamps. RFC 3227 warns against tools that alter access times on all files [R2].
