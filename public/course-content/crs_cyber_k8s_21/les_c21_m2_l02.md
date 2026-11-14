Practices, each mapped to the lab's dockerfile_lint.py rule where one exists:

- Pin the base by digest (RK-D01): FROM image:tag@sha256:... makes builds repeatable and reviewable; update the pin deliberately (L04).
- Never put secrets in ENV or ARG (RK-D02): both are recorded in the image configuration and history. The lab recovered "ENV DB_PASSWORD=rk-lab-fake-password" with docker history.
- Do not COPY whole build contexts without a .dockerignore (RK-D05): the weak image copied app/.env into /srv/.env, readable with "docker run --rm kestrel-api:bad cat /srv/.env". Files deleted in a later layer remain in the earlier layer.
- Run as a non-root user (RK-D06): set USER to a numeric UID so that Kubernetes runAsNonRoot can verify it.
- Avoid "curl | sh" (RK-D04) and ADD from URLs (RK-D03): no integrity check; download, verify a checksum or signature, then use.
- Use multi-stage builds: compile in a builder stage, copy only the artefact into a minimal runtime stage.
- Use BuildKit secret mounts for credentials needed during the build (RUN --mount=type=secret,...), which are not written to layers. Not execution-tested in this course; see the Docker build documentation.
- Keep one process per container, a clear ENTRYPOINT and, where the platform uses it, a health check.

Linters such as the one in the lab, Hadolint or the Dockerfile checks in Trivy catch most of these before the build. Trivy's image-configuration scan of the weak image reported DS-0002 (no non-root USER, HIGH), DS-0031 ("Possible exposure of secret env DB_PASSWORD", CRITICAL) and DS-0026 (no HEALTHCHECK, LOW) (trivy_bad_config.txt). It did not report the .env file, and its secret scanner found no secrets: the fictional key matched none of its patterns. Pattern-based secret detection misses custom formats, so prevention (.dockerignore, secret mounts) matters more than detection.
