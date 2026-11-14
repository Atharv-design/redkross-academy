Scanning IaC (Terraform, Bicep/ARM, CloudFormation, Kubernetes manifests) catches problems before they exist. Execution-tested (checkov 3.4.3 on LAB_ASSETS/C11/iac/main.tf, 2026-11-07):

```text
------------------------------------------------------------- BEGIN OUTPUT
Passed checks: 21, Failed checks: 32, Skipped checks: 0
Check: CKV_AWS_24: "Ensure no security groups allow ingress from
       0.0.0.0:0 to port 22"            FAILED aws_security_group.web
Check: CKV_AWS_16: "Ensure all data stored in the RDS is securely
       encrypted at rest"               FAILED aws_db_instance.orders
Check: CKV_AWS_17: "Ensure all data stored in RDS is not publicly
       accessible"                      FAILED aws_db_instance.orders
Check: CKV_AZURE_44: "Ensure Storage Account is using the latest version
       of TLS encryption"               FAILED azurerm_storage_account.logs
Check: CKV_AZURE_59: "Ensure that Storage accounts disallow public
       access"                          FAILED azurerm_storage_account.logs
Check: CKV_AZURE_9: "Ensure that RDP access is restricted from the
       internet"                        FAILED azurerm_network_security_rule.rdp
Check: CKV2_AWS_6: "Ensure that S3 bucket has a Public Access block"
                                        FAILED aws_s3_bucket.exports
Check: CKV_AWS_21: "Ensure all data stored in the S3 bucket have
       versioning enabled"              FAILED aws_s3_bucket.exports
... (32 failures in total)
--------------------------------------------------------------- END OUTPUT
(selected lines; layout condensed)
```

The weak file defines five resources: an S3 bucket, a security group with SSH from anywhere, a public unencrypted PostgreSQL instance with a literal password, an Azure storage account with TLS 1.0 and public blob access, and an NSG rule allowing RDP from any source. Checkov mapped them to checks across exposure, encryption, logging and resilience patterns.
