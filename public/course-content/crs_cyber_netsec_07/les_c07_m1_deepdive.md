The lab encodes the architecture as data the tools enforce. The zones and the permitted zone-to-zone flows (data/rk_segmentation.json) are:

```output
zones: internet, dmz, app, db, user, mgmt
allowed flows (everything else denied by default - zero trust):
  internet -> dmz   :443    (public HTTPS to the web tier)
  user     -> dmz   :443    (employees reach the web app over HTTPS)
  dmz      -> app   :8080   (web tier to application tier)
  app      -> db    :5432   (application to database - the ONLY path to data)
  mgmt     -> app   :22     (administrative SSH)
  mgmt     -> db    :22     (administrative SSH)
```

**Reading the model:**

- The database (db) is reachable ONLY from app:5432 and mgmt:22. No user or internet flow to db exists, so a compromised workstation or an internet attacker has no permitted path to the crown jewel.
- The DMZ can reach app but NOT db - a compromised web server cannot jump straight to the database.
- Management is a separate, highly-restricted zone.

This is the defence-in-depth, least-privilege, default-deny architecture in concrete form. The rest of the course validates it: segmentation.py checks observed connections against this matrix (Module 4), and the firewall policy (Module 2) implements it as ordered rules. When the lab's connection list is validated against this model, three connections violate it - user->db, internet->db and user->mgmt - exactly the boundary crossings the architecture forbids. Architecture is not a diagram on a wall; it is an enforced, monitored contract.
