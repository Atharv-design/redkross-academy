Static scanning (iac/trivy_config_summary.txt, abridged; custom check tf_iam_wildcard_output.txt):

```output
== trivy config terraform/bad: 20 failed checks
   {'CRITICAL': 3, 'HIGH': 7, 'LOW': 4, 'MEDIUM': 6}
   CRITICAL AWS-0040  EKS Clusters should have the public access disabled
   CRITICAL AWS-0041  EKS cluster should not have open CIDR range ...
   CRITICAL AWS-0104  A security group rule should not allow unrestricted
                      egress to any IP address
   HIGH     AWS-0039  EKS should have the encryption of secrets enabled
   HIGH     AWS-0086/0087/0091/0093  S3 public access block settings
   HIGH     AWS-0107  ... unrestricted ingress to SSH or RDP ...
   HIGH     AWS-0132  S3 encryption should use Customer Managed Keys
   MEDIUM   AWS-0038  EKS ... control plane logging turned on  x5
   ... (LOW: logging, public access block resource, rule descriptions)
== trivy config terraform/good: 2 failed checks {'MEDIUM': 2}
   MEDIUM   AWS-0038  EKS ... control plane logging turned on  x2

$ python tf_iam_wildcard.py terraform/bad terraform/good
terraform/bad\main.tf:43: IAM statement allows '*' - list the actions
  the role needs
1 finding(s)
exit=1
```

Policy tests and checks (iac/rk_policy_output.txt, abridged):

```output
PASS  t01_compliant_deployment.yaml expected none
PASS  t02_latest_and_untagged.yaml expected ['P01']
PASS  t03_registry_port_not_a_tag.yaml expected ['P01']
PASS  t04_digest_pinned.yaml       expected none
PASS  t05_privileged_hostpath.yaml expected ['P02', 'P03', 'P04', 'P05',
      'P06', 'P07', 'P08', 'P09']
PASS  t06_container_overrides_pod.yaml expected ['P05']
PASS  t07_cronjob.yaml             expected ['P07', 'P09']
7 cases, 0 failed

../k8s/kestrel-app.yaml: 0 deny, 0 warn
../k8s/psa\legacy-ns.yaml: 4 deny, 1 warn
../k8s/psa\privileged-pod.yaml: 6 deny, 1 warn
../k8s/netpol/batch-pod.yaml: 1 deny, 0 warn
   DENY P07 Pod/batch: container c: no resource limits
TOTAL deny=12
```

Drift (iac/drift_output.txt) after an "emergency hotfix" on the hardened cluster - replicas scaled to 4, readOnlyRootFilesystem set to false, one NetworkPolicy deleted - and with the RoleBinding created in Module 5's activity still present:

```output
CHANGED    Deployment/api  spec.replicas: git=2 live=4
CHANGED    Deployment/api  spec.template.spec.containers[0].securityContext
           .readOnlyRootFilesystem: git=True live=False
MISSING    NetworkPolicy/api-ingress-from-frontend
UNMANAGED  RoleBinding/reporting-admin
15 declared objects, 16 live objects compared; drift items: 4
exit=1
--- reconcile from Git and remove the unmanaged binding
15 declared objects, 16 live objects compared; drift items: 0
exit=0
```

**Interpretation:**

- The scanner and the custom check together cover the weak Terraform; neither alone does.
- The policy engine passes the hardened Kestrel manifest and catches the lab's own batch pod without limits - a defect in this course's lab material that Pod Security (Module 5) did not report. It was fixed in the capstone (Module 8).
- The drift report contains a security regression (readOnlyRootFilesystem false), a removed control (the NetworkPolicy) and a privilege grant no one reviewed (reporting-admin, the "A6" action that Module 5 detected in the audit log). One tool found all three in seconds.
- The first version of drift.py reported a false CHANGED on allow-dns-egress (drift_output_first_version_bug.txt) because it split field paths on "." and the label key kubernetes.io/metadata.name contains dots. Paths are now tuples. Test detection tools against real data, including keys with dots and slashes.

**Limitations:** the Windows path separator appears in rk_policy output; drift.py handles seven namespaced kinds only and compares list elements by position, so reordered lists appear as changes.
