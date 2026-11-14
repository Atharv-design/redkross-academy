## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

Lab assets ---------- LAB_ASSETS/C12/ contains:

| Term | Meaning |
|---|---|
| app/ | shipments.py, a small reference service, and test_shipments.py, its security unit tests |
| sast/ | legacy_reports.py (code with deliberate weaknesses) and rules.yml (custom Semgrep rules) |
| deps/ | requirements.txt with deliberately outdated pins |
| secrets_lab.sh | builds a throwaway git repository and scans it with gitleaks |
| signing_lab.sh | hashes, signs and verifies a build artefact with cosign |

Each lab has a saved `*_output.txt.` Labs were execution-tested on 2026-11-07 with CPython 3.14.4 and in disposable containers, using Docker 29.4.2 with these tool versions:

- python:3.12-slim with semgrep 1.184.0, pip-audit 2.10.1 and cyclonedx-bom;
- zricethezav/gitleaks v8.30.1;
- gcr.io/projectsigstore/cosign v3.1.4.

The fictional organisation is again "Tamarind Logistics". Credentials used in the labs are fictional strings in a valid format, never issued by any provider. The vulnerable code samples exist only to be detected and fixed.

**Access classification note:** per the blueprint, Course 12 is PAID.
