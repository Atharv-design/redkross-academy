The model produces a probability distribution for the next token; sampling settings (temperature, top-p, seed) decide which token is chosen. Temperature 0 approaches deterministic output; higher values vary more. BanyanBot uses temperature 0.7 with explicit seeds 1-5 so that tests are reproducible on one machine yet expose variation. Security consequences:

- A defence that worked once may fail on the next run; measure failure rates over many runs (Module 7).
- Reproducibility requires recording model digest, prompt version, sampling settings and seed.
- Model updates change behaviour; re-run the probe suite on every change.
