## The cost of a flat network Context: a recurring lesson from major breaches is that FLAT networks - where most hosts can reach most others - turn a single compromised endpoint into a full compromise. Investigations of large retail and enterprise breaches have repeatedly found that attackers entered through a low-value system (a vendor portal, a workstation, an HVAC or point-of-sale device) and then moved laterally across an un-segmented network to reach payment or customer data, because nothing stopped internal east-west traffic. The defensive response across the industry was network segmentation and the move toward zero trust: assume breach, and ensure one compromised host cannot reach the crown jewels [C07-M01-R1][C07-M01-R2]. Why it matters for this module: it shows that architecture - specifically segmentation and least-privilege flows - is what limits blast radius. A perimeter alone is insufficient; the internal structure decides how far a compromise spreads. Lessons: do not run a flat network; segment by trust zone; make the crown jewels reachable only from where they must be; assume breach and design to contain it.



## (FICTIONAL TEACHING SCENARIO): The exposed management plane

**Context:** Himalaya Retail (fictional) originally placed its network device management interfaces on the same VLAN as user workstations, so any user (or any malware on a user's machine) could reach the switches', routers' and firewalls' admin interfaces.

**What happened:** a phishing email compromised one workstation; because the management plane was reachable from the user zone, the attacker could attempt to log in to network devices directly - a path that should never have existed. No device was breached in the drill, but the exposure was severe: the management plane is the keys to the kingdom.

**Response:** the team moved management to a dedicated, tightly-restricted zone reachable only over SSH from a controlled jump path; denied all user-to-management traffic by default; and added monitoring for any attempt to reach management from other zones. The lab's architecture reflects this: mgmt is a separate zone, and user->mgmt is a segmentation violation.

**Lessons:** isolate the management plane in its own zone; never let the user zone reach management; default-deny and monitor the boundary.
