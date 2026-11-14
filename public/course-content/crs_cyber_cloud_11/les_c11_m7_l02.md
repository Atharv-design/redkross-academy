The provider runs the servers; the customer owns the code, its dependencies, its configuration, its triggers and its permissions.

- One execution role (Lambda) or managed identity (Azure Functions) per function, with only the actions and resources it needs.
- Validate input from every trigger (API gateway, queue, storage event): events are untrusted data.
- Function URLs and HTTP triggers require authentication unless public by design; put APIs behind an API gateway with authorisation and throttling.
- Environment variables are visible to anyone who can read the function configuration; do not put secrets there - fetch them at runtime from a secrets service, or better, avoid them with identity.
- Set timeouts, concurrency limits and dead-letter queues (availability and cost control).
- Log invocations and errors centrally; scan dependencies.
