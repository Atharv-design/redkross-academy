> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Map your lab cluster

**Objective:** Build a lab cluster, deploy the Kestrel workload and produce an architecture map with security observations.

**Difficulty:** Advanced.

**Required tools:** Docker; kubectl; LAB_ASSETS/C21/k8s; images built in Module 2.

**Prerequisites:** Lessons L01-L04.

**Environment setup:**

1. docker run -d --name rk-k3s --privileged -p 127.0.0.1:16443:6443 rancher/k3s:v1.34.1-k3s1 server --disable=traefik --disable=metrics-server --tls-san 127.0.0.1 (k3s needs a privileged container to run a node; this is a lab-only convenience on your own machine and the API is bound to 127.0.0.1.)
2. docker exec rk-k3s cat /etc/rancher/k3s/k3s.yaml, replace port 6443 with 16443, save it as your kubeconfig and set KUBECONFIG.
3. docker exec -i rk-k3s ctr images import - < ../images/good13.tar
4. kubectl apply -f kestrel-app.yaml

**Explicit authorised scope:** the local lab cluster only.

**Step-by-step instructions:**

1. sh m03_explore.sh | tee my_explore.txt
2. Draw the components you found, marking which run as pods, which run inside the k3s process and where the datastore is.
3. For each request-path stage (L02), name the mechanism this cluster uses and how you confirmed it.
4. Record three security observations with evidence lines.

**Expected observations:** as in section 3 - 401 for anonymous requests, 36 and 33 resource types (may differ by version), ownership chain, replacement pod, plaintext secret in the datastore, encryption disabled.

**Troubleshooting:** "connection refused" on 16443 - the server is still starting; wait and retry "kubectl get nodes". Pods stuck in ErrImageNeverPull - the image import in setup step 3 was skipped.

**Cleanup:** keep the cluster for Modules 4-6, or "docker rm -f rk-k3s".

**Learning outcome:** you can describe a real cluster's architecture from evidence.

## Practical 2: Enable and verify encryption at rest

**Objective:** Start a second lab cluster with secrets encryption and prove the difference with the same test.

**Difficulty:** Advanced.

**Required tools:** as P1; LAB_ASSETS/C21/hardened/start_hardened.sh.

**Prerequisites:** P1; Lesson L03.

**Environment setup:** run start_hardened.sh from the hardened/ folder (API on 127.0.0.1:16444); build a second kubeconfig as in P1.

**Explicit authorised scope:** the local lab clusters only.

**Step-by-step instructions:**

1. docker exec rk-k3s-hard k3s secrets-encrypt status
2. Create the test secret in a namespace (as in m03_explore.sh step 8) and count datastore files containing the plaintext and the "k8s:enc:aescbc" prefix.
3. Read the secret back through the API as an administrator.
4. Delete the test secret.
5. Explain in three sentences what encryption at rest protects against and what it does not.

Expected observations (execution-tested, hardened_checks_output.txt): "Encryption Status: Enabled"; plaintext in 0 files; the aescbc prefix in 2 files; the API returns the value to the administrator.

**Troubleshooting:** if the cluster does not start, check "docker logs rk-k3s-hard" for an error reading /etc/rk files (the folder must be mounted from hardened/).

**Cleanup:** delete the test secret; keep rk-k3s-hard for Module 5.

**Learning outcome:** you can verify a control by testing it, not by reading a flag.
