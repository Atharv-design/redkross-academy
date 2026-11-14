Conversion steps in pySigma (execution-tested with sigma-cli 4.0.0):

1. Parse YAML into a rule object; validators check structure, fields and tags ("sigma check").
2. Apply processing pipelines: map logsource to index/source type and generic field names (Image, ParentImage) to the platform's field names.
3. Backend renders the condition into the target query language (Splunk SPL in our tests).

Command examples (run inside a Python virtual environment):

```text
pip install sigma-cli pysigma-backend-splunk
sigma check rk_office_spawns_shell.yml
sigma convert -t splunk --without-pipeline rk_office_spawns_shell.yml
```

**Escaping note:** in the Splunk output the backslash appears doubled (`"*\\WINWORD.EXE"`) because SPL string escaping requires it; this is correct, not a bug. Logic translated to minisiem SQL (R1) uses lower() and LIKE because SQLite string comparison is case-sensitive by default while Windows paths are not - an example of why a rule's semantics must be checked after translation.
