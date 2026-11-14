## Where image findings come from

![Four stacked rows - base layer, pip layer, copy layer and configuration - each annotated with the findings it caused in the weak image and, where applicable, the hardened image.](/assets/courses/cyber-21/C21-M02-F1.svg)
*Figure C21-M02-F1. Findings and defects traced to the layer or configuration field that introduced them.*

## The image pipeline with gates

![A left-to-right pipeline from Dockerfile to deploy with checks listed under lint, build, scan and gate, and a second line showing base-image updates triggering rebuild and rescan.](/assets/courses/cyber-21/C21-M02-F2.svg)
*Figure C21-M02-F2. Lint, build, SBOM, scan and gate stages, plus the rebuild loop that keeps pinned bases current.*

## SBOM, VEX and provenance

![A four-row table pairing SBOM, VEX, provenance and signature with the question each answers and an example.](/assets/courses/cyber-21/C21-M02-F3.svg)
*Figure C21-M02-F3. Four complementary statements about an image.*
