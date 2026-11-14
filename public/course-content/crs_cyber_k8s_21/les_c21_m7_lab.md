> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Sign, tamper and verify

**Objective:** Operate a private registry, sign a release, demonstrate tag tampering and attach a signed SBOM attestation.

**Difficulty:** Advanced.

**Required tools:** Docker; registry:3 and gcr.io/projectsigstore/cosign images; LAB_ASSETS/C21/supply; the SBOM from Module 2.

**Prerequisites:** Lessons L03-L05.

**Environment setup:**

1. docker network create rk-supply
2. docker run -d --name rk-registry --network rk-supply -p 127.0.0.1:5000:5000 registry:3
3. docker tag kestrel-api:good13 localhost:5000/kestrel-api:1.0.0 and docker push it; record the digest (docker buildx imagetools inspect).
4. Generate a lab key pair with cosign (COSIGN_PASSWORD set to a lab value) and sign the digest (see section 3).

**Explicit authorised scope:** your local registry and images; the registry listens on 127.0.0.1 only; keys are lab-only.

**Step-by-step instructions:**

1. sh supply_chain.sh | tee my_supply.txt
2. For each step, write what the result proves and what it does not.
3. Explain why step 1 printed a transparency-log line despite --insecure-ignore-tlog, and why production should not skip the log.
4. Describe two controls that would have prevented step 3 from affecting a cluster.

**Expected observations (execution-tested):** steps 1, 5 and 6 succeed; step 2 fails with "no matching attestations"; step 4 fails with "no signatures found"; the attestation shows predicateType [https://cyclonedx.org/bom](https://cyclonedx.org/bom) and 39 components.

**Troubleshooting:** "http: server gave HTTP response to HTTPS client" - add --allow-http-registry; cosign cannot reach rk-registry - run it on the rk-supply network; deprecation warnings for the signing flags are expected with cosign v3.

**Cleanup:** keep the registry for P2; afterwards "docker rm -f rk-registry" and delete `keys/*.key.`

**Learning outcome:** you can show what signatures protect and what they rely on.

## Practical 2: Provenance and digest-only deployment

**Objective:** Inspect BuildKit provenance and deploy kestrel-api by digest through an admission policy.

**Difficulty:** Advanced.

**Required tools:** Docker buildx; kubectl; the hardened cluster; supply/digest-policy.yaml, hardened/registries.yaml, k8s/kestrel-app-digest.yaml.

**Prerequisites:** P1; Module 4 P2.

**Environment setup:** docker network connect rk-supply rk-k3s-hard; copy registries.yaml to /etc/rancher/k3s/registries.yaml in the node container and restart it.

**Explicit authorised scope:** local registry and lab cluster.

**Step-by-step instructions:**

1. docker buildx build --provenance=mode=max --sbom=true -t localhost:5000/kestrel-api:1.1.0 --push -f ../images/Dockerfile.good13 ../images
2. docker buildx imagetools inspect localhost:5000/kestrel-api:1.1.0 --format "{{json .Provenance}}" and extract the build type, Dockerfile, resolved dependencies, builder id and completeness.
3. Assess the SLSA build level honestly and list what is missing for L2.
4. kubectl apply -f digest-policy.yaml; then apply ../k8s/kestrel-app-digest.yaml and wait for the rollout.
5. Dry-run the tag-based manifest and tests/adm-firstparty-tag.yaml.
6. Confirm the service still answers from frontend.

**Expected observations (execution-tested):** provenance with an empty builder id and resolvedDependencies completeness false; the digest rollout succeeds; both tag references are denied; healthz returns ok.

**Troubleshooting:** ErrImageNeverPull - the manifest still has imagePullPolicy Never or the node cannot reach the registry; check the mirror file and the network connection.

**Cleanup:** keep the configuration for the capstone.

**Learning outcome:** you can evaluate provenance and enforce immutable deployment.
