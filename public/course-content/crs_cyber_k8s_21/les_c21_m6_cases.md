## Capital One and cloud governance, OCC 2020 Context: on 6 August 2020 the US Office of the Comptroller of the Currency announced an USD 80 million civil money penalty against Capital One, N.A. and Capital One Bank (USA), N.A. [C21-M06-R1]. What the regulator cited: the bank's failure to establish effective risk assessment processes before migrating significant information technology operations to the public cloud environment, and its failure to correct the deficiencies in a timely manner. The action followed the bank's 2019 cyber incident. Why it belongs in this module: the regulator's findings were about processes - assessing risk before migration, and correcting identified deficiencies - not about one setting. Infrastructure as code with scanning, tested policy, review gates and drift detection is how those processes become routine and evidenced. Each deficiency found by a scanner becomes a tracked item; each exception has an owner and expiry; each change is reviewed and reproducible. Lessons: configuration control is a governance obligation as well as an engineering practice. Being able to show that policies are enforced and deficiencies corrected on time is part of the control.



## (FICTIONAL TEACHING SCENARIO): The hotfix that stayed

**Context:** during an outage, a Kestrel Pay (fictional) engineer set readOnlyRootFilesystem to false on a payment service so that a library could write a cache file, and deleted a NetworkPolicy suspected of blocking traffic. The outage was resolved; the changes were never written back to Git.

**What happened:** four months later the service was exploited through a deserialisation flaw, and the attacker wrote a web shell into the now writable filesystem and reached an internal admin service that the deleted policy had protected.

**Response:** a GitOps controller now reports and reverts drift in production; emergency changes go through a "break-glass" branch with automatic follow-up tickets; the cache path received an emptyDir volume so the root filesystem could be read-only again; drift alerts go to the SOC.

**Lessons:** emergency changes are normal; unrecorded emergency changes are vulnerabilities. Detect drift and close the loop.
