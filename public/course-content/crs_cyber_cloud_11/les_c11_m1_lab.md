> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Build a responsibility matrix

---------------------------------------------------

**Objective:** Allocate security duties for five services.

**Difficulty:** Advanced.

**Required tools:** spreadsheet; provider documentation.

**Prerequisites:** Lessons L01-L03.

**Environment setup:** none.

**Explicit authorised scope:** documentation and a fictional organisation; no cloud account is needed.

**Step-by-step instructions:**

1. Choose EC2, S3, an Azure SQL Database, Azure App Service and Microsoft 365 Exchange Online.
2. For each, fill the matrix of L03 with Provider, Customer or Shared, citing the provider page you used.
3. Name the Tamarind team responsible for each customer duty.
4. Mark which rows need evidence in an audit and what that evidence is.

**Expected observations:** identity, data and logging configuration remain customer duties in every model.

**Troubleshooting:** if a page is ambiguous, record it as "Shared" with a note.

**Cleanup:** none.

**Learning outcome:** you can scope cloud responsibilities precisely.

## Practical 2: Defender's threat model for a cloud workload

------------------------------------------------------------------

**Objective:** Produce a threat-model table linking assets to controls, logs and owners.

**Difficulty:** Advanced.

**Required tools:** spreadsheet or text; diagramming tool.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** the fictional Tamarind shipment-tracking workload (web front end, API, database, export bucket, CI/CD pipeline).

**Step-by-step instructions:**

1. Draw the workload with trust boundaries: internet, account, VPC, CI/CD, third-party integrations.
2. List assets with classification.
3. For each asset and boundary, complete the table columns of L05 for at least two STRIDE categories.
4. Map each detective control to a log source (CloudTrail, VPC flow logs, S3 server access logs, Azure Activity log).
5. Identify the three highest-risk rows and the module that addresses each.

**Expected observations:** 15-25 rows; most controls are identity, logging and configuration controls.

**Troubleshooting:** keep rows defensive - controls, logs, responses, owners.

**Cleanup:** none.

**Learning outcome:** you can drive cloud security design from a threat model.
