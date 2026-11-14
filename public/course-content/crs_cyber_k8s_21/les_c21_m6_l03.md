Static IaC scanners (Trivy's config scanner, Checkov, KICS and others) parse HCL, JSON, YAML or Dockerfiles and evaluate built-in checks. In the lab, Trivy 0.76.2 reported 20 failed checks on the weak configuration (3 CRITICAL, 7 HIGH, 6 MEDIUM, 4 LOW) and 2 MEDIUM on the remediated one (trivy_config_summary.txt).

**Read results critically:**

- Counting: AWS-0038 (control-plane logging) appeared five times on the weak cluster - once per missing log type - and twice on the remediated one, which enables three of five types. Counts are not risk; decide whether controller-manager and scheduler logs are required for you and either enable them or record a justified suppression.
- Blind spots: Trivy reported nothing at all for the policy allowing Action `"*"` on Resource `"*",` the most dangerous line in the file. Whether a scanner catches a pattern depends on its checks and on how the value is written (here it is built with jsonencode). The lab adds a custom check, tf_iam_wildcard.py, which found it at terraform/bad/main.tf line 43. The custom check has its own limits, documented in the script: it reads text, so policies built from variables or data sources escape it; evaluating plan JSON is the robust approach.
- Suppressions: every scanner supports inline or file-based suppressions. Treat them like gate exceptions in Module 2: owner, reason, expiry, review.

**The general lesson:** a clean scan proves only that the scanner's checks passed. Know which risks matter to you and test that each one is caught.
