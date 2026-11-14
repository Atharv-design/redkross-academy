## About this module

AI applications are assembled from parts the organisation did not build: pre-trained models and adapters, model file formats and loaders, inference servers, Python packages, datasets and knowledge-base content. Each can be tampered with, mislabelled or vulnerable (OWASP LLM03:2025 Supply Chain and LLM04 Data and Model Poisoning). This module applies software supply-chain discipline (Course 12, Course 21 Module 7) to AI: provenance, safe formats, pinning by digest, scanning, approval and runtime isolation. The lab compares the locally installed models and knowledge base with an approved manifest and detects an unreviewed change.

## Why it matters

On 27 February 2024 JFrog reported finding a model on Hugging Face "whose loading leads to code execution, after loading a pickle file", and about 100 instances of such models; Hugging Face provides the safetensors format for storing model data safely, along with malware and pickle scanning (case study). Loading a model can be equivalent to running someone else's code.

## Where it is used

Model selection and approval, ML platform engineering, MLOps pipelines, procurement of AI services, AI bills of materials, vulnerability management for inference stacks.

## Learning objectives

1. Describe the components of an AI supply chain and their risks.
2. Evaluate model provenance: source, licence, card, digest.
3. Prefer safe serialisation formats and isolate loading.
4. Control dependencies and datasets, including poisoning risk.
5. Approve, pin and verify models and data before deployment.
6. Detect changes in deployed models and knowledge bases.

## Before you start

**Prerequisites:** C18-M01 to C18-M05; Course 12 (SBOM, dependency management); Course 21 Module 7 (signing and provenance).

**Estimated study time:** About 8 hours.
