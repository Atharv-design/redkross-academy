1. Dockerfile: remove ENV DB_PASSWORD; add a non-root USER; add HEALTHCHECK; pin the base by digest; rebuild weekly.
2. Configuration: delete keys and passwords from app_config.py and settings.py; treat the format-valid key as exposed in a real case (rotate, investigate).
3. Identity: the container runs as an ECS task role (or AKS workload identity) with read access to one secret and one bucket.
4. Database: IAM database authentication or a Secrets Manager secret with rotation, fetched at start-up.
5. Pipeline: OIDC federation with a trust condition for the repository's main branch; no stored cloud keys.
6. Gates: trivy config and secret scans fail on CRITICAL; image scan fails on fixable CRITICAL.
7. Runtime: runtime monitoring enabled; alerts on the task role's credentials used outside the VPC.
