## About this module

The image is the unit of deployment, so its contents become your attack surface on every node that runs it: the operating system packages, the language libraries, the configuration and anything accidentally copied in. This module teaches you to build images that contain only what the service needs, to scan them and read scanner output critically, to turn findings into a release decision with documented exceptions, and to describe image contents with a software bill of materials (SBOM). You will build three versions of the fictional kestrel-api service and measure the difference.

## Why it matters

Image defects are copied at scale. In May 2019 CVE-2019-5021 recorded that the official Alpine Linux Docker images, since v3.3, shipped with a NULL password for the root account (CVSS 9.8) [R3]; every derived image inherited it. Secrets baked into layers are readable by anyone who can pull the image. And scanners report hundreds of findings for an ordinary image, so teams that cannot triage either block everything or ignore everything.

## Where it is used

Platform teams curate approved base images; CI pipelines lint, build, scan and gate images; security teams define the gate policy and exceptions; incident responders query SBOMs when a new vulnerability is announced.

## Learning objectives

1. Compare base image types and justify a choice for a service.
2. Write a Dockerfile that is pinned, minimal, non-root and free of secrets, and lint it.
3. Explain how image scanners find vulnerabilities and their main false positive and false negative sources.
4. Triage scanner output into fixable, unfixable and waived findings, and apply a release gate with expiring exceptions.
5. Generate an SBOM and use it to answer exposure questions.
6. Explain what provenance adds to an SBOM.

## Before you start

**Prerequisites:** C21-M01; Course 12 Module 4 (dependency scanning) is helpful.

**Estimated study time:** About 9 hours.
