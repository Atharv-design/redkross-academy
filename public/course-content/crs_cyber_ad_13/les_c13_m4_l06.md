A baseline is a defined, testable target configuration. Rather than inventing settings, defenders adopt published baselines and tailor them:

- CIS Benchmarks for Windows Server and Active Directory.
- Microsoft security baselines in the Security Compliance Toolkit, delivered as GPOs you import and link (Module 3) [R4].
- DISA STIGs in regulated environments.

A baseline is only useful if you MEASURE against it continuously and manage exceptions deliberately (Course 17's governance tools and Module 7's review here). Baselines cover password and lockout policy, audit policy (Module 6), service and protocol hardening (disabling RC4, SMBv1, LLMNR/NBT-NS), and administrative restrictions. In the lab, the "RK Workstation Baseline" GPO stands in for an imported, tailored baseline; the point is the workflow - adopt, tailor, link, measure, manage exceptions.
