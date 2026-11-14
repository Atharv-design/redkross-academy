Edge devices (VPN concentrators, remote-access portals, firewalls, load balancers) run complex code exposed to the internet and often have limited logging and EDR. Architecture responses:

- minimise exposure: put management interfaces on internal networks only; prefer cloud-delivered ZTNA or identity-aware proxies where suitable;
- patch and mitigate fast (subscribe to CISA KEV and CERT-In advisories);
- capture appliance logs centrally; plan forensic access with vendors (Course 09 M04);
- assume an edge device can be compromised: segment what it can reach, require independent authentication behind it (no "trusted VPN subnet"), and monitor its outbound connections;
- have replacement and rebuild procedures.
