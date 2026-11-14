A Wi-Fi network has access points (APs) and clients (stations). An AP bridges the wireless medium to the wired network and advertises one or more SSIDs; a client associates to an AP to join the network. Larger deployments add a wireless controller that manages many APs centrally (configuration, channel planning, roaming). Important architectural points for security:

- the AP is the GATEWAY from the air to your wired network - a compromised or rogue AP is a bridge an attacker can cross or impersonate;
- one SSID is typically served by many APs (BSSIDs); clients roam between them;
- guest and corporate SSIDs should map to separate, segmented networks/VLANs (Course 07), not share the internal network;
- the AP's own management interface (admin credentials, firmware) is itself an asset to secure.

Knowing the architecture tells you what to inventory (your authorised APs and their BSSIDs) and what to protect (the AP as a gateway, its management, and the segmentation behind it). The lab's roguescan.py uses exactly an authorised-BSSID inventory to spot impostors (Module 3).
