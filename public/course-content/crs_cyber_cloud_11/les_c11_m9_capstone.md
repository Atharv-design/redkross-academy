> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by designing, reviewing and evidencing a secure AWS and Azure workload for Tamarind Logistics using the course labs and tools, and by responding to a simulated incident in the local mock.

​### Scenario

Tamarind Logistics (fictional) is moving its shipment-tracking service and customer exports to the cloud: a web front end and API on AWS, export storage on S3, an order database, and log storage on Azure. The board wants evidence that the design is secure before go-live and a tested incident response plan.

​### Requirements

```text
R1 Architecture: landing-zone design, responsibility matrix and
   defender's threat-model table (M01).
R2 Identity: SSO, roles and managed identities; least-privilege policies
   with BoolIfExists MFA denies; vendor access with ExternalId; review
   script with no HIGH findings (M02; CT2 linter).
R3 Network: VPC and VNet design with private tiers, endpoints, egress
   control and IMDSv2; audit script clean (M03).
R4 Data: classification, BPA, CMKs with custody, versioning, isolated
   immutable backups, restore test plan (M04).
R5 Visibility: logging standard and architecture; at least eight tested
   detections (M05).
R6 Configuration: IaC for the workload scanned with checkov with all
   critical findings fixed and exceptions recorded; guardrail design
   (M06).
R7 Workloads: hardened Dockerfile, clean secret scan, OIDC CI design,
   runtime monitoring plan (M07).
R8 Response: IR preparation, three runbooks, and an executed first-hour
   response in the mock with a hashed case log; final reference
   architecture diagram (M08).
```

​### Deliverables

Design documents and diagrams, policy and IaC files, script outputs with SHA-256 hashes, detection rules with test records, scan reports, runbooks, the mock response case log, a technical report and a one-page management summary with residual risks.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Architecture (10%)        | Diagram only    | Landing zone,   | Threat model    |
|                           |                 | matrix, threat  | drives every    |
|                           |                 | model           | later choice    |
| Identity (15%)            | Roles listed    | Least privilege,| Guardrails and  |
|                           |                 | lint clean      | PIM tested      |
| Network & data (20%)      | Rules listed    | Private tiers,  | Endpoint-bound  |
|                           |                 | BPA, CMK,       | policies;       |
|                           |                 | isolated backup | restore drilled |
| Visibility (15%)          | Log list        | Standard + 8    | Detections with |
|                           |                 | tested rules    | FP analysis     |
| Configuration & workloads | Scan output     | Critical fixed, | Verify by effect|
| (20%)                     |                 | exceptions, OIDC| and gates in CI |
| Response (20%)            | Runbook outline | Mock response   | Lessons learned |
|                           |                 | executed, hashed| become controls |
|                           |                 | case log        |                 |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Working only in the mock or in accounts you own, evidence-based assurance, clear separation of tested and untested claims, cost awareness, and communicating residual risk to management.
