hunt.py H1 (execution-tested):

- Groups proxy events by (host, url) in timestamp order; computes gaps in seconds with datetime.fromisoformat (after replacing "Z" with "+00:00" for compatibility).
- Uses statistics.mean and pstdev; CV normalises variation by the mean so a 5-minute beacon and a 1-hour beacon can be compared.
- Thresholds (n >= 8, CV < 0.2) are teaching values; tune them on your data. Too low a minimum count produces regular-looking noise from short series.

**Enhancements real tools use:** grouping by destination host rather than full URL; median absolute deviation (robust to outliers); periodicity detection (for example Fourier analysis); byte-size consistency (R6 used it); excluding known update services by allowlist with review. Open-source projects and commercial NDR products implement such beacon scoring; always understand their logic before trusting a score. H2 uses chr(92) - the backslash - to split Windows paths without needing an escaped backslash literal in source; a small robustness choice for code moved between editors and shells.
