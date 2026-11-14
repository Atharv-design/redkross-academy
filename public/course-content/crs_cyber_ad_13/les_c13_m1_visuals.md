## Forest, trees, domains and the security boundary

![A large box labelled forest contains two trees, each with a parent domain and a child domain; a note states that true isolation requires a separate forest.](/assets/courses/cyber-13/C13-M01-F1.svg)
*Figure C13-M01-F1. Domains group into trees, trees into a forest; the forest is the trust and security boundary.*

## How a client finds and uses a domain controller

![A client first queries DNS for the LDAP SRV record, receives the DC name, then contacts the DC for Kerberos on port 88 and LDAP on port 389.](/assets/courses/cyber-13/C13-M01-F2.svg)
*Figure C13-M01-F2. DNS locates the DC; Kerberos authenticates; LDAP reads the directory. Break DNS and all of this fails.*

## Directory partitions on a domain controller

![A box for one domain controller listing four naming contexts and the SYSVOL share, with notes on which are forest-wide.](/assets/courses/cyber-13/C13-M01-F3.svg)
*Figure C13-M01-F3. A DC holds several partitions; two are forest-wide and one is specific to its domain.*
