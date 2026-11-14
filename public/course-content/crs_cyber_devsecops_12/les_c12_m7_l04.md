Every action, orb or plugin runs with your job's permissions. Controls:

- Pin to an immutable reference. GitHub recommends pinning actions to a full-length commit SHA [R1]. Tags can be moved; a commit SHA cannot. Update pins deliberately, through a bot with review.
- Prefer verified or well-maintained actions with small scope. Review their code or source for high-privilege jobs.
- Verify downloaded tools by checksum or signature before running them. This is exactly what would have exposed the Codecov change earlier.
- Keep an inventory of pipeline dependencies, part of the SBOM mindset of Module 5.
