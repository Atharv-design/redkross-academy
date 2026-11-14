## Authorisation confusion and the Coalfire courthouse arrest Context: in 2019, two penetration testers from the firm Coalfire were arrested during a physical-security engagement for an Iowa judicial body in the United States. They carried a signed contract, but a dispute over who had authority to authorise entry to a specific county courthouse - the state court administration versus the county - led to their arrest and a protracted legal process (charges were later dropped). The engagement was contracted, yet the SCOPE of authorisation for that building was contested [C19-M01-R3]. Why it matters for this module: authorisation must come from a party entitled to grant it for the specific targets, and scope must be unambiguous. A contract is not enough if the authorising party's authority over a target is unclear. Lessons: confirm the authorising party's authority for every in-scope target; define physical and logical scope precisely; keep authorisation documentation to hand; agree deconfliction with all parties who might respond.



## (FICTIONAL TEACHING SCENARIO): The RoE that stopped a disaster

**Context:** a fictional firm, Sahyadri Retail, commissions a red team exercise. The testers draft an RoE but leave the window open-ended, omit stop conditions, and do not require operator tagging.

**What happened:** an RoE review (roe.py) failed the draft on 6 HIGH findings - no authorising party on file, no defined window, no contacts, no stop conditions, no isolation requirement, and real user data not excluded. Had the engagement proceeded, an out-of-hours action would have triggered a full real-incident response (no deconfliction), and testing might have touched live customer data.

**Response:** the team completed the RoE - signed authorisation, a defined window, emergency contacts, stop conditions, operator tagging, isolation for high-risk emulation, and a no-real-data rule - and the review passed. The engagement then ran safely.

**Lessons:** the RoE gate catches exactly the omissions that turn a test into an incident; complete it before starting; make deconfliction and stop conditions explicit.
