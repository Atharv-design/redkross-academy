## The reference zone architecture

![A zone diagram showing internet and users reaching the DMZ over HTTPS, the DMZ reaching the app, the app reaching the database, and management reaching app and database over SSH, with forbidden flows listed.](/assets/courses/cyber-07/C07-M01-F1.svg)
*Figure C07-M01-F1. Trust zones and permitted flows; the database is reachable only from app and management [R2].*

## Default-deny inverts the posture

![A comparison of the permissive allow-unless-blocked posture against the secure deny-unless-allowed posture at the network layer.](/assets/courses/cyber-07/C07-M01-F2.svg)
*Figure C07-M01-F2. Default-deny and least privilege turn "block what is bad" into "allow only what is needed" [R3].*

## Defence in depth layers

![A stack of independent network defence layers from the perimeter firewall through segmentation, IDS/IPS, host firewalls, authentication and monitoring.](/assets/courses/cyber-07/C07-M01-F3.svg)
*Figure C07-M01-F3. Independent layered controls contain compromise and feed monitoring [R1].*
