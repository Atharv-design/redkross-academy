## The Kestrel namespace after segmentation

![Inside a namespace box, frontend connects to api on port 8080, batch is blocked from api, all pods may reach DNS, and the API server is blocked.](/assets/courses/cyber-21/C21-M05-F1.svg)
*Figure C21-M05-F1. Default deny plus two allow policies leave exactly the flows the application needs.*

## Pod Security levels

![A four-row table listing the Privileged, Baseline and Restricted levels and additional organisation rules with their main controls.](/assets/courses/cyber-21/C21-M05-F2.svg)
*Figure C21-M05-F2. Each level adds controls to the one above it; your own policies add more.*

## Two detection layers

![Two columns of example signals, one for the API audit log and one for node sensors, both feeding a SIEM.](/assets/courses/cyber-21/C21-M05-F3.svg)
*Figure C21-M05-F3. The audit log sees API actions; node sensors see what happens inside containers.*
