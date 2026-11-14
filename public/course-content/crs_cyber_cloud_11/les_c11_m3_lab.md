> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Audit and remediate the lab VPC

-----------------------------------------------------

**Objective:** Find and fix network exposure in the mock.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C11/run_lab.sh and network_lab.py.

**Prerequisites:** Lessons L01, L02, L06.

**Environment setup:** copy the C11 lab folder; start Docker.

**Explicit authorised scope:** the local moto mock only.

**Step-by-step instructions:**

1. Run sh run_lab.sh network_lab.py; record the findings.
2. Add an RDP rule from 0.0.0.0/0 to tl-web and a MySQL rule from 10.0.0.0/8 to tl-db; extend the audit to flag both (admin ports from the internet; database from broad ranges).
3. Add a NAT-less check: flag any private subnet whose route table later gains a 0.0.0.0/0 route to an internet gateway.
4. Write the remediation calls and verify by re-describing.

**Expected observations:** new findings appear and disappear with remediation.

**Troubleshooting:** moto returns security-group IDs for group references; map them to names.

**Cleanup:** none.

**Learning outcome:** you can audit cloud network exposure with code.

## Practical 2: Design private access to data services

------------------------------------------------------------

**Objective:** Design endpoint-restricted access to storage and keys.

**Difficulty:** Advanced.

**Required tools:** text editor; provider documentation.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise; policies are Not execution-tested against real accounts.

**Step-by-step instructions:**

1. For tl-customer-exports, write a bucket policy that denies access unless aws:SourceVpce equals the workload's endpoint (allowing a documented admin path).
2. For an Azure storage account, describe Private Endpoint, disabled public network access and DNS configuration.
3. List the instance settings for IMDSv2 and the hop limit for VMs and container hosts.
4. Explain how these controls reduce the value of leaked credentials.

**Expected observations:** data reachable only via private paths.

**Troubleshooting:** remember administrative and break-glass access.

**Cleanup:** none.

**Learning outcome:** you can design private connectivity for data.
