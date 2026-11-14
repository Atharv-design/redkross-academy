**Pipeline components:**

- source control (repositories, branches, pull requests);
- pipeline definitions (YAML workflows);
- runners (hosted or self-hosted machines executing jobs);
- secrets and identities;
- third-party actions and plugins;
- artefact storage (registries, package repositories);
- deployment targets.

Model them as part of the system (Module 2, boundary B4). Integrity properties to protect:

- only reviewed code is built;
- the build runs only the intended steps;
- credentials are usable only by the intended job;
- artefacts cannot be swapped after the build;
- deployments accept only verified artefacts.

SSDF practice group PS (Protect the Software) covers much of this, including protecting code from unauthorised changes and providing a mechanism for verifying release integrity [R4].
