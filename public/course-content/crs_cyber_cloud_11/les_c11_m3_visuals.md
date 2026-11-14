## Workload VPC

![Internet traffic enters a WAF and load balancer in public subnets, reaches app instances in private subnets and a database in data subnets; services are reached via private endpoints; outbound traffic passes a NAT and firewall.](/assets/courses/cyber-11/C11-M03-F1.svg)
*Figure C11-M03-F1. Public entry through WAF and load balancer; private tiers; private endpoints; filtered egress.*

## IMDSv2 session flow

![A process obtains a token with PUT and uses it for metadata requests; requests without a token, PUTs with forwarding headers, and extra hops are rejected.](/assets/courses/cyber-11/C11-M03-F2.svg)
*Figure C11-M03-F2. IMDSv2 requires a session token obtained with PUT.*

## Security group findings (lab)

![Three rules with their assessment; SSH from the internet was revoked.](/assets/courses/cyber-11/C11-M03-F3.svg)
*Figure C11-M03-F3. The execution-tested review and remediation.*
