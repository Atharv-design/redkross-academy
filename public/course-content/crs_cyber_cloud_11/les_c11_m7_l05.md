The lab ran trivy's secret scanner over two folders:

- workload_repo/app_config.py contains AWS's published documentation example key pair (AKIAIOSFODNN7EXAMPLE) and a literal password. Trivy did not flag the example key - scanners deliberately exclude known documentation examples to avoid noise - nor the generic password assignment in this file.
- workload_repo2/settings.py contains a format-valid but fictional, never-issued key pair. Execution-tested:

```text
------------------------------------------------------------- BEGIN OUTPUT
settings.py (secrets)
Total: 2 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 2)
CRITICAL: AWS (aws-access-key-id)
 settings.py:2 (offset: 94 bytes)
   2 [ AWS_ACCESS_KEY_ID = "********************"
CRITICAL: AWS (aws-secret-access-key)
 settings.py:3 (offset: 141 bytes)
--------------------------------------------------------------- END OUTPUT
(trivy masks the values; box-drawing characters removed)
```

**Lessons:** pattern-based scanners find well-structured provider credentials reliably and miss generic passwords; test your scanners with realistic samples (not documentation examples); combine secret scanning with code review and with the structural fix - identity instead of secrets.
