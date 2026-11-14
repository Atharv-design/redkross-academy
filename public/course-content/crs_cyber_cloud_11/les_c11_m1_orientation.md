## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

How the labs work - and what they do not prove ---------------------------------------------- No real cloud account is used anywhere in this course. LAB_ASSETS/C11/contains:

```text
run_lab.sh        runs a lab inside python:3.12-slim with boto3 and moto
                  (a local AWS API mock); credentials are the dummy value
                  "testing" and no request leaves your machine
iam_lab.py        policy-evaluation logic and risky-permission review
network_lab.py    VPC routing and security-group audit and remediation
data_lab.py       S3 exposure, encryption, versioning and KMS
cloudtrail_lab.py detections over synthetic CloudTrail-format records
iac/, iac_fixed/  deliberately weak and remediated Terraform (AWS and
                  Azure resources) scanned with checkov 3.4.3
workload_repo*/   files for trivy 0.76.2 secret and misconfiguration scans
response_lab.py   first-hour response to a compromised identity
solutions/        model solutions for the course tasks (identity timeline
                  over the synthetic records; offline IAM policy linter)
```

Each has a saved `*_output.txt` (execution-tested 2026-11-07: boto3 1.43.126, moto 5.2.5, checkov 3.4.3, trivy 0.76.2, CPython 3.14.4).

**Important limits:**

- moto emulates AWS APIs; it does not reproduce every AWS default or enforcement behaviour. Labs prove that the boto3 calls and the audit logic work, not that a real account behaves identically.
- Azure commands (az CLI, PowerShell) are shown from Microsoft documentation and are Not execution-tested. Azure resources are exercised through Terraform scanning only.
- Practise on real clouds only in accounts you own, with budgets and alerts, and delete resources afterwards.

All organisations ("Tamarind Logistics"), account IDs (111122223333 and moto defaults), names and addresses are fictional.

**Access classification note:** per the blueprint, Course 11 is PAID.
