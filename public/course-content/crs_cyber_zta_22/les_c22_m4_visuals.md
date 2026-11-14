## Lab segmentation

![Two networks, with the app container attached to both; web reaches app, app reaches db, web cannot reach db by name or IP, and db cannot reach the internet.](/assets/courses/cyber-22/C22-M04-F1.svg)
*Figure C22-M04-F1. The application container bridges two networks; the web tier cannot reach the data tier and the data tier has no egress (execution-tested).*

## Gateway patterns

![Five access paths for users, admins, legacy systems and partners, each through an appropriate gateway type.](/assets/courses/cyber-22/C22-M04-F2.svg)
*Figure C22-M04-F2. Access patterns chosen by user type and resource.*

## Assume-breach view of an edge appliance

![An edge appliance connected only to a segmented landing zone, with internal applications still requiring identity verification.](/assets/courses/cyber-22/C22-M04-F3.svg)
*Figure C22-M04-F3. Even if the edge device is compromised, what it can reach is limited and internal access still requires identity verification.*
