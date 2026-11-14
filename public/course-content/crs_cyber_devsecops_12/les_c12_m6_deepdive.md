A layered set-up for the Tamarind repositories (configuration shown is illustrative; the gitleaks commands themselves were execution-tested in

**L04):**

```text
Developer machine: the pre-commit framework with a gitleaks hook.
```

```text
---------------------------------------------------------------- BEGIN CODE
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.30.1
    hooks:
      - id: gitleaks
------------------------------------------------------------------ END CODE
```

```text
Pull request: run gitleaks detect --redact over the commits in the pull
request, and fail on any finding.
Nightly: scan full history of every repository, and send findings to the
security queue with the repository owner.
Allowlists: a .gitleaks.toml allowlist for confirmed test fixtures, by
path and pin-pointed regex. It is reviewed like a code change, and never
a blanket path such as "tests/" that could hide real secrets.
```

**Two practical points:**

- Pin the hook version (rev) and update it deliberately, as with any dependency (Module 5).
- Hooks are advisory, because developers can skip them. The CI gate is the enforcement point.
