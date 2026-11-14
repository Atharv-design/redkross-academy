## The lab's isolated capture setup

![A server container with a capture container sharing its network, a client container on the same private bridge, and the pcap copied out for analysis in a separate container.](/assets/courses/cyber-09/C09-M06-F1.svg)
*Figure C09-M06-F1. A contained capture: the sensor shares the server's network namespace on a private bridge.*

## Proving a file crossed the network

![Two hash computations, one on the server file and one on the file carved from the capture, produce the same value; a third hash protects the capture file itself.](/assets/courses/cyber-09/C09-M06-F2.svg)
*Figure C09-M06-F2. Matching hashes link the carved file to the original (execution-tested values).*

## Super-timeline of the lab incident

![A five-row timeline from SSH login through staging with sudo, HTTP download and probe, to disconnection.](/assets/courses/cyber-09/C09-M06-F3.svg)
*Figure C09-M06-F3. Host and network evidence merged in UTC (execution-tested; auth and access logs synthetic).*
