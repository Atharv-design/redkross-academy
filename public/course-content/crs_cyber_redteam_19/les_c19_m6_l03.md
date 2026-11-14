C2 produces network indicators defenders can detect:

```text
periodicity     regular, machine-like check-ins (beaconing) to one destination -
                unlike human browsing - often the strongest signal.
destination     connections to a single, rarely-seen, or newly-registered
                destination; or to infrastructure not matching business need.
volume/timing   small, regular requests with occasional larger transfers
                (command results, staging).
protocol anomaly use of a protocol in an unusual way (e.g. DNS carrying data; HTTP
                with anomalous headers or timing).
```

These are read from network flow, proxy and DNS logs (Course 07's flow analysis). Beacon detection - finding near-constant intervals to a destination - is a classic and effective method. The engagement's task is to confirm the organisation can see these indicators. The lab's emulated C2 beacon produces exactly the periodicity indicator, to a lab sink.
