**Setup (execution-tested):** a registry:3 container named rk-registry on a private Docker network rk-supply, published on 127.0.0.1:5000; kestrel-api:good13 pushed as localhost:5000/kestrel-api:1.0.0 (digest sha256:07dcdcda1c15a73ae46f1096f7d8ed7b464b3c111eba36d2ee839d4e925bfa77); a lab key pair from "cosign generate-key-pair"; the digest signed with "cosign sign --key keys/rk-lab.key --use-signing-config=false --tlog-upload=false --allow-http-registry rk-registry:5000/kestrel-api@...". supply/supply_chain.sh output (supply_chain_output.txt, abridged):

```output
### 1. Verify the signed release by tag (expected: success)
WARNING: Skipping tlog verification is an insecure practice that lacks
transparency and auditability verification for the signature.
Verification for rk-registry:5000/kestrel-api:1.0.0 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - The signatures were verified against the specified public key
exit=0

### 2. Verify the same digest with a different public key (expected:
failure)
exit=1 : Error: no matching attestations: failed to verify signature:
could not verify envelope: accepted signatures do not match threshold,
Found: 0, Expected 1

### 3. An unauthorised rebuild is pushed under the same tag 1.0.0
tag 1.0.0 now resolves to sha256:a58cda37...6919ef
signed digest was           sha256:07dcdcda...bfa77

### 4. Verify by tag again (expected: failure - the new digest is unsigned)
exit=10 : Error: no signatures found

### 5. Verify the original digest (expected: success)
exit=0

### 6. Attach the SBOM as a signed attestation and verify it
attestation predicateType: https://cyclonedx.org/bom
subject digest           : {'sha256': '07dcdcda...bfa77'}
components in SBOM        : 39
exit=0
```

Deployment control (supply/digest_policy_output.txt, abridged), on the hardened cluster with rk-digest-policy bound to namespaces labelled rk.lab/policy=enforced:

```output
api-8b9dd79c9-5s7s6   rk-registry:5000/kestrel-api@sha256:07dcdcda...  true
api-8b9dd79c9-w28t8   rk-registry:5000/kestrel-api@sha256:07dcdcda...  true
$ kubectl apply --dry-run=server -f kestrel-app-digest.yaml
deployment.apps/api unchanged (server dry run)
$ kubectl apply --dry-run=server -f kestrel-app.yaml
deployments.apps "api" is forbidden: ValidatingAdmissionPolicy
'rk-digest-policy' ... denied request: first-party images must be pinned
by digest: docker.io/library/kestrel-api:good13
$ kubectl apply --dry-run=server -f tests/adm-firstparty-tag.yaml
deployments.apps "t-tagged" is forbidden: ... first-party images must be
pinned by digest: rk-registry:5000/kestrel-api:1.0.0
$ kubectl -n kestrel exec frontend -- curl -s http://api.kestrel/healthz
{"service": "kestrel-api", "status": "ok"}
```

**Interpretation:**

- Step 2 shows that a signature is meaningful only relative to a trusted key: the "wrong" key fails even on the right digest.
- Steps 3-5 are the core lesson of L04. The cosign message in step 1 still mentions the transparency log although verification was told to skip it; read the WARNING line, not only the summary.
- The digest policy refuses both a change back to a tag and a new tag-based Deployment, while the digest-pinned api serves traffic.
- The tampered digest differs between runs (the rebuild's metadata changes each time); the signed digest never changes.

**Limitations:** no signature verification at admission was performed in this lab (L06, layer 3); the registry runs plain HTTP on an isolated Docker network, which is acceptable only for a lab.
