> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

​## Task C21-CT1 Write a Python script that reads Trivy JSON reports and, for each report, prints the number of unique (vulnerability, package) pairs with severity CRITICAL or HIGH and a fixed version available, the number of packages involved, and the three packages with most such findings. Run it on trivy_bad.json and trivy_good13.json and explain what the result means for remediation effort in each image.

​## Task C21-CT2 Write a Python script that reads the hardened cluster's audit log and, for a time window, counts unique requests (by auditID) and lists every request denied with HTTP 403 by actor (impersonated user if present), verb, resource and namespace. Run it for 2026-11-07T21:57:40 to 2026-11-07T21:58:00 on the reference log and relate each denial to the control that produced it.
