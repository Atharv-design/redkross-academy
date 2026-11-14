> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Review and remediate RBAC

**Objective:** Find, explain and fix the over-broad grant in the lab, with before-and-after evidence.

**Difficulty:** Advanced.

**Required tools:** kubectl; Python; LAB_ASSETS/C21/k8s (rbac-lab.yaml, rbac_review.py, rbac_accepted.txt).

**Prerequisites:** Lessons L02-L03; the M03 lab cluster.

**Environment setup:** kubectl apply -f rbac-lab.yaml

**Explicit authorised scope:** the local lab cluster only.

**Step-by-step instructions:**

1. For each service account run kubectl auth can-i --list -n kestrel --as=system:serviceaccount:kestrel:NAME and summarise.
2. python rbac_review.py --accept rbac_accepted.txt ; record the exit code and every OPEN item.
3. For legacy-ops, explain how each K-code could be used to gain more access (one sentence each, defensive framing).
4. Write a replacement that meets a stated need ("read pods, logs and events in kestrel") and apply it; remove the legacy objects.
5. Re-run the review and four can-i checks; save both outputs.
6. Add one accepted-grants entry you consider justified and one you would refuse, with reasons.

**Expected observations (execution-tested):** one OPEN cluster-wide grant before, zero after; legacy-ops can list pods and get logs but cannot read kube-system secrets or exec into pods.

**Troubleshooting:** if many kube-system controllers appear, you are running an older copy of the tool without the built-in filter.

**Cleanup:** keep the fixed configuration for later modules.

**Learning outcome:** you can run a repeatable RBAC review and remediate with evidence.

## Practical 2: Tokens and an admission policy

**Objective:** Examine service account tokens and write, scope and test an admission policy.

**Difficulty:** Advanced.

**Required tools:** kubectl; Python; k8s/token-demo.yaml, jwt_claims.py, admission/image-policy.yaml, `tests/*.yaml.`

**Prerequisites:** P1; Lessons L04, L06.

**Environment setup:** the lab cluster with the Kestrel workload.

**Explicit authorised scope:** the local lab cluster; tokens are decoded locally and never stored in shared files.

**Step-by-step instructions:**

1. kubectl apply -f token-demo.yaml; read the mounted token and pipe it to jwt_claims.py. Record aud, sub, exp, warnafter and the pod binding.
2. kubectl create token reporting -n kestrel --duration=10m and decode it. Compare.
3. Show that a pod-bound token stops working after the pod is deleted (curl the API with it before and after; record only status codes).
4. Apply admission/image-policy.yaml; dry-run tests/adm-latest.yaml before and after labelling namespace kestrel with rk.lab/policy=enforced; then dry-run adm-ok, adm-deploy-busybox and adm-hostnet.
5. Add a validation of your own (for example "runAsNonRoot must be true at pod level") with reason Forbidden, roll it out first with validationActions [Warn, Audit], then Deny, and test both.

**Expected observations (execution-tested):** mounted token exp one year after issue with warnafter at 60 minutes on the default cluster; the requested token lasts 10 minutes with no pod binding; HTTP 200 then 401; the policy results shown in section 3.

**Troubleshooting:** "policy not found" right after apply - wait a few seconds for the policy to be loaded; a binding without a matching policy name has no effect.

**Cleanup:** kubectl delete -f token-demo.yaml; remove your test policy or keep it documented.

**Learning outcome:** you can reason about workload identity and enforce rules RBAC cannot express.
