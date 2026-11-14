**Design gates by risk:**

- who may approve (a role, with named people on a rota);
- how many approvers (one for tier-2 assets; two distinct people for tier-0 assets such as domain controllers and the file server);
- what the approver sees (the evidence summary, the exact action, its blast radius and its rollback);
- how long an approval is valid, and for which case and action only;
- break-glass: a documented emergency path with after-the-fact review.

Two-person control only works if the approvers are distinct people. The Tamarind engine stores approvers as a set, so "asha.ir" approving twice still counts as one. Approvals belong in the audit trail with the time, the person and the action approved.
