Detection compares an OBSERVED set of access points (from an authorised site survey or a wireless IDS) against the authorised-BSSID inventory and classifies each:

```text
authorised  BSSID is in the inventory for the SSID it advertises - expected.
evil twin   a managed SSID advertised by a BSSID NOT in the inventory -
            impersonation (especially suspicious if open/weak or strong-signal).
ssid        an authorised BSSID advertising an unexpected SSID - a
 mismatch     misconfiguration or compromise.
foreign     a BSSID advertising a non-managed SSID - a neighbouring network
            (informational).
```

The output is a list of impostors to investigate physically (locate and remove the device) - never to attack or connect to. This analysis is pure data processing: it needs the inventory and the scan, not any transmission by the assessor. The lab's roguescan.py implements exactly this classification, and the deep dive shows it flagging the evil twins in the provided scan.
