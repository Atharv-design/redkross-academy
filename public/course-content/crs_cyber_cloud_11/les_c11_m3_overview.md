## About this module

**Cloud networks are software:** a VPC or VNet, its subnets, route tables and firewall rules are API objects created in seconds and changed by anyone with permission. This module explains how cloud networks are built, what makes a subnet "public", how security groups and NSGs filter traffic, how to keep traffic to cloud services off the internet with private connectivity, and how to protect the instance metadata service. It ends with an execution-tested audit and remediation of a VPC in the local mock.

## Why it matters

The US Department of Justice described the 2019 Capital One intrusion as enabled by a misconfigured web application firewall; the OCC later fined the bank USD 80 million (case study). Network-layer configuration and the credentials available to workloads behind it combine to decide how far a single misconfiguration reaches.

## Where it is used

Landing-zone network design, hub-and-spoke and transit architectures, security group reviews, private access to PaaS services, cloud firewall deployment, and network evidence for investigations (flow logs).

## Learning objectives

1. Design VPCs/VNets with public and private subnets and controlled routing.
2. Configure security groups and NSGs with least privilege.
3. Use private connectivity (VPC endpoints, PrivateLink, Azure Private Endpoints) to reach services without internet exposure.
4. Control egress and inspect traffic with cloud firewalls.
5. Protect the instance metadata service with IMDSv2.
6. Audit and remediate network exposure programmatically.

## Before you start

**Prerequisites:** C11-M01, C11-M02; Course 02 Modules 3, 6 and 7; Course 07.

**Estimated study time:** About 9 hours.
