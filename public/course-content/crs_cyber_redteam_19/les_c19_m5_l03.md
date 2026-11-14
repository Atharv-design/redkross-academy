Segmentation divides the network and identity space so that compromise in one area does not grant access to others - the containment that limits lateral movement. Validating segmentation means confirming the boundaries actually hold:

```text
network     are segments separated so a workstation cannot reach services it
            should not (the allowed-flow matrix of Course 07)?
identity    are privilege tiers separated so Tier 0 credentials are not exposed on
            lower tiers (Course 13)?
default-deny is cross-segment access denied by default and allowed only where
            required?
```

Validation tests whether an attempted hop that SHOULD be blocked is in fact blocked - a defensive check, not an attack. Where a boundary does not hold, that is a finding to remediate. Segmentation validation reuses the zero-trust allowed-flow idea from Course 07, applied to lateral-movement paths.
