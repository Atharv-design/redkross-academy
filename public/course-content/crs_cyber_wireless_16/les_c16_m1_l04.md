Because radio is broadcast, the wireless threat model differs from wired in three ways:

```text
no physical barrier  an attacker needs only to be in range - no cable, no port,
                     no building access. Your network extends wherever the
                     signal reaches.
passive eavesdropping anyone in range can CAPTURE the radio; if traffic is not
                     encrypted (or uses broken encryption), it is readable.
impersonation        anyone can transmit, so an attacker can stand up a fake AP
                     with your SSID (an evil twin) or forge management frames.
```

The defender therefore cannot rely on physical control of the medium and must enforce security in the protocol: strong encryption (so captured traffic is useless), protected management frames (so frames cannot be forged), and a way to detect impostor APs. This is why WPA3, PMF and rogue-AP detection exist, and it is the lens for the whole course. The attacks are named here to explain the defences; the course never asks you to perform them.
