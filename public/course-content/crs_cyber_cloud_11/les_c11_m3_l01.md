A VPC (AWS) or VNet (Azure) is a private address space (RFC 1918, Course 02 Module 3) divided into subnets, each in one availability zone (AWS) or spanning the region (Azure). Routing decides exposure:

- In AWS a subnet is "public" when its route table sends 0.0.0.0/0 to an internet gateway; instances there can have public IPs.
- Private subnets have no route to an internet gateway; outbound internet access, if needed, goes through a NAT gateway or a proxy.
- In Azure, subnets have default system routes including to the internet; user-defined routes (UDRs) send traffic to a firewall appliance instead.

**Design:** internet-facing load balancers in public subnets; application and data tiers in private subnets; no public IPs on servers; separate subnets per tier so rules can reference them; hub-and-spoke (Transit Gateway, Azure Virtual WAN or hub VNet) to centralise inspection and shared services; non-overlapping address plans across accounts and on-premises.
