Workloads in private subnets still need cloud services (object storage, key management, queues). Options that keep this traffic off the internet:

| Term | Meaning |
|---|---|
| AWS gateway endpoints | for S3 and DynamoDB, via route table entries. |
| AWS interface endpoints | (PrivateLink) private IPs in your subnets for many AWS services and partner services. |
| Azure Private Endpoint | a private IP in your VNet for a PaaS resource (storage account, SQL, Key Vault). |
| Azure service endpoints | route VNet traffic to a service over the backbone and let the service restrict by subnet. |

Combine private connectivity with resource policies: for example an S3 bucket policy that allows access only through a specific VPC endpoint (aws:SourceVpce), or a storage account that denies public network access. That way leaked credentials alone are not enough to read data from outside. Connections to on-premises use site-to-site VPN or dedicated links (Direct Connect, ExpressRoute) with routing and filtering at the boundary.
