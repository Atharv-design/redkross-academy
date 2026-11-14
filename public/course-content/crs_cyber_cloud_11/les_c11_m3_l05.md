Virtual machines can query a link-local metadata service for configuration and - critically - temporary credentials for the attached role. If an application on the instance can be tricked into making requests on an outsider's behalf (server-side request forgery, Course 06), those credentials may be exposed. AWS's IMDSv2 adds session-oriented protection [R2]:

- a client must first obtain a session token with a PUT request (token lifetime up to six hours) and send it with each metadata request;
- when IMDSv2 is required, requests without a valid token receive HTTP 401;
- PUT requests that contain an X-Forwarded-For header are rejected, which blocks many proxy paths;
- the response hop limit (default 1) stops tokens leaving the instance through extra network hops (containers may need a higher value).

**Defences:** require IMDSv2 on all instances (account default and launch templates), use least-privilege instance roles, fix SSRF at the application, and alert on use of instance-role credentials from outside the instance's network (Module 5). Azure provides an Instance Metadata Service and managed identity tokens; protect them by fixing request forgery in applications and granting managed identities least privilege.
