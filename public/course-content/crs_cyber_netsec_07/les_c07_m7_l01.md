Two complementary forms of network visibility:

```text
PACKET CAPTURE (full packets, e.g. PCAP)  records the complete content of
  traffic - deep detail for investigation, but large, storage-heavy, often
  encrypted at the payload, and raising privacy concerns. Used for targeted
  deep analysis.
FLOW TELEMETRY (NetFlow/IPFIX)  records metadata ABOUT each conversation -
  source, destination, ports, protocol, byte/packet counts, timing - not the
  content. It is compact, scalable to a whole network, privacy-preserving
  (no payload), and ideal for spotting patterns: scans, beaconing,
  exfiltration volumes, and policy violations [R1].
```

Most network security monitoring runs on flow telemetry for breadth, with packet capture reserved for deep dives. The lab works with flow telemetry, because that is where behavioural patterns show up at scale.
