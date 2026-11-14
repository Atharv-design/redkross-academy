## robots.txt as an information leak Context: robots.txt tells search-engine crawlers which paths NOT to index. Administrators have repeatedly listed sensitive paths there - admin consoles, backup directories, staging endpoints - believing it hides them. It does the opposite: robots.txt is public and is one of the first files an attacker or scanner reads, so a Disallow entry advertises exactly the path the administrator wanted hidden [C06-M02-R2]. Why it matters for this module: discovery uses the application's own disclosures, and robots.txt is a classic one. The lesson for defenders is that obscurity is not access control - a sensitive path must be protected by authentication and authorisation, not hidden. The lab reproduces this: its robots.txt lists /admin, /download and /fetch, and the map reads them straight from it. Lessons: never rely on robots.txt or obscurity to protect anything; list only truly public, non-sensitive paths; protect sensitive endpoints with real access control and monitor access to them.



## (FICTIONAL TEACHING SCENARIO): The forgotten staging endpoint

**Context:** Sahyadri Reads (fictional) deployed a new catalogue feature and left a /catalogue-v2-test endpoint enabled in production, undocumented and unauthenticated.

**What happened:** because no one had mapped the live application, the endpoint was absent from the inventory, unmonitored, and still wired to the real database with verbose debugging on. It was discovered months later during an authorised test that enumerated endpoints systematically - exactly the mapping step this module teaches - and found it returning internal data.

**Response:** the team removed the endpoint, added a pre-release checklist to disable test/staging routes, built an authoritative endpoint inventory from the routing configuration, and added monitoring for undocumented paths.

**Lessons:** you cannot protect what you have not mapped; maintain an authoritative inventory of endpoints; disable test and staging routes before release; and map regularly, because attack surface drifts as code changes.
