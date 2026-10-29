# Task for Antigravity: apply the approved academic card design to all cards

Reference prototype: `academic-card-standalone.html` (SOC Analyst card). Artwork: `art-01.jpg` to `art-10.jpg`.

## What to do
1. Audit the existing academic card component, course data, styles and responsive layout. List the exact files you will change.
2. Port the `.acad-card` markup and CSS from the prototype into the existing component. Keep existing typography, routing, data and logic. Replace sample text with the real course data (badge, duration/hours, title, description, skills, credential). Do not invent any course info.
3. Copy `art-*.jpg` into the project's assets folder. Add two fields per course: `art` (image path) and `artPos` (background-position). Pass them to the card as the CSS vars `--art` and `--art-pos`.
4. Rules to keep: artwork is a full-card background layer (no image box), subject on the right 35-45%, strongest dark gradient on the left, bottom gradient behind the credential, no full-width CTA button, small arrow icon only if it navigates. Theme tokens stay exactly as in the prototype `:root`.
5. Animation: hover/focus lift of 4px, art scale 1.07 with slight shift, neon edge highlight. Staggered entry once via IntersectionObserver (`--i` = card index). Respect prefers-reduced-motion.
6. Tune `--art-pos` per card so the main subject stays visible.
7. Test desktop, tablet and mobile: no overflow, readable text, working navigation. Report modified files, artwork sources, test results and open issues.

## Artwork mapping (suggested, confirm against actual course list)
| File | Subject | Course |
|---|---|---|
| art-01 | hooded analyst, globe, monitors | SOC Analyst |
| art-02 | cloud with padlock, servers | Cloud Security |
| art-03 | shield with panels | Cybersecurity Foundations |
| art-04 | globe with red bug target | Threat Hunting |
| art-05 | laptop with padlock | Network and Endpoint Security (or Penetration Testing) |
| art-06 | fingerprint, magnifier | Digital Forensics |
| art-07 | head profile with brain network | AI Security (or GRC) |
| art-08 | world map with workstations | Governance, Risk and Compliance (or Penetration Testing) |
| art-09 | infinity loop, pipeline nodes | DevSecOps |
| art-10 | brain with shield and padlock | AI Security |
