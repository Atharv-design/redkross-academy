> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by taking a lab cluster and the kestrel-api service from defaults to a hardened, evidenced state, and by reporting the result to technical and management audiences.

​### Scenario

Kestrel Pay (fictional) will run its payment status API on Kubernetes. The CTO asks for a platform that can pass an external review in one month: images that are minimal, scanned and signed; a cluster with controlled access, segmentation, Pod Security and audit logging; infrastructure code that is scanned and tested; and evidence that can be regenerated on demand. You start from the default lab cluster and the weak Dockerfile.bad.

​### Requirements

```text
R1 Images: produce a hardened image from Dockerfile.bad's service; lint,
   scan, generate an SBOM and pass image_gate.py (documented exceptions
   only with owner and expiry).
R2 Runtime: run the image with measured hardening (M01 evidence) and
   deploy it with a Restricted-compliant pod spec.
R3 Cluster: start a cluster with encryption at rest, audit logging, a
   Pod Security default, anonymous authentication off and token-expiry
   extension off; prove each with a test.
R4 Access: least-privilege service accounts and RBAC with a clean
   rbac_review.py run; at least one admission policy of your own with
   tests (Warn then Deny).
R5 Network and detection: default-deny segmentation with a matrix;
   detections over the audit log for at least five behaviours, tested
   with generated lab activity.
R6 IaC: scan the provided Terraform, close one scanner gap with a tested
   custom check, add one policy-as-code rule with tests, and show drift
   detected and reconciled.
R7 Supply chain: sign the release digest, attach an SBOM attestation,
   deploy by digest under a digest-only admission policy, and assess the
   provenance's SLSA level honestly.
R8 Evidence and reporting: before/after runs of evidence.py plus your
   own C11; technical report and one-page management summary with
   residual risks.
```

​### Deliverables

Git repository (Dockerfiles, manifests, policies, tests, scripts), image reports and SBOMs, signed attestation output, evidence JSON and reports with hashes, detection outputs, drift outputs, the technical report, the management summary and a one-page reflection on the largest remaining risk.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Images & runtime (15%)    | Scan only       | Minimal image,  | Rebuild loop;   |
|                           |                 | gate, measured  | SBOM queries    |
|                           |                 | runtime         | answered        |
| Cluster & access (20%)    | Flags shown     | Each control    | Regression      |
|                           |                 | tested; clean   | tests for       |
|                           |                 | RBAC review     | controls        |
| Network & detection (15%) | Policies only   | Matrix and five | Detections with |
|                           |                 | tested          | false-positive  |
|                           |                 | detections      | analysis        |
| IaC & policy (15%)        | Scanner output  | Custom check,   | Plan-JSON policy|
|                           |                 | tested rule,    | or GitOps drift |
|                           |                 | drift fixed     | control         |
| Supply chain (15%)        | Signed tag      | Signed digest,  | Signature check |
|                           |                 | attestation,    | at admission    |
|                           |                 | digest policy   | designed        |
| Evidence & reporting (20%)| Screenshots     | Reproducible,   | Decision-ready  |
|                           |                 | hashed evidence;| summary; honest |
|                           |                 | both reports    | coverage        |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Engineering discipline (tests, Git, small changes), verification by effect, honest measurement, risk communication to technical and management audiences, safety in lab operations.
