A data-flow diagram (DFD) uses five elements:

| Term | Meaning |
|---|---|
| External entity | people or systems outside your control (customer, partner API). |
| Process | code that transforms data (web app, worker). |
| Data store | database, bucket, queue, log. |
| Data flow | an arrow labelled with the data and protocol. |
| Trust boundary | a line where the level of trust changes: internet to application, application to database, your code to a third-party service, build system to package registry. |

Threats concentrate at trust boundaries, because data crossing a boundary may not be what the receiver expects. For each flow that crosses a boundary, ask:

- Who can send it?
- How is the sender authenticated?
- Is the data validated?
- Is it protected in transit?
- What happens if it is missing, late or duplicated?

Software supply chain boundaries matter as much as runtime ones. Where do dependencies come from? Who can change the build? The PyTorch case study is a boundary that teams often forget to draw.
