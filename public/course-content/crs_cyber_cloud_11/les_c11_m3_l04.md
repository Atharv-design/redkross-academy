Unrestricted outbound access makes it easy for compromised workloads to download tools or send data out. Controls:

- private subnets without direct internet routes;
- NAT gateways only where needed, with a proxy or cloud firewall (AWS Network Firewall, Azure Firewall) applying domain allowlists;
- DNS resolution through controlled resolvers with logging (Course 02 Module 5);
- VPC flow logs / NSG or VNet flow logs to the central log platform for investigation and anomaly detection (Module 5, Course 07);
- web application firewalls in front of public applications, with their rules and logging under change control and tested.
