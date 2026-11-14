Containment cuts the C2 channel:

```text
egress filtering   allow outbound only where needed; deny by default. Much C2 dies
                   if arbitrary outbound is not permitted.
proxy inspection   force outbound web through an inspecting proxy; block unknown or
                   low-reputation destinations.
block the indicator once a C2 destination/pattern is known, block it at the egress
                   and hunt for other hosts using it.
DNS controls       control and monitor DNS to catch DNS-based C2.
segmentation       limit which hosts can reach the internet at all.
```

**Containment and detection pair:** detect the beacon, then block the destination and restrict egress so it cannot recur. Cutting C2 can neutralise an intrusion even after a foothold, because the adversary loses control. The lab's map lists egress filtering, proxy inspection and blocking the indicator as containment for T1071.
