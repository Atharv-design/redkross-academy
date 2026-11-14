## The browser-server trust boundary

![A two-box diagram showing an untrusted browser exchanging HTTP requests and responses with a trusted server, with the rule that security is enforced server-side.](/assets/courses/cyber-06/C06-M01-F1.svg)
*Figure C06-M01-F1. The trust boundary: the client is untrusted, so every security decision is enforced on the server [R1].*

## Anatomy of an HTTP exchange

![A side-by-side HTTP request and response showing method, headers, the Set-Cookie line and the absent cookie security attributes.](/assets/courses/cyber-06/C06-M01-F2.svg)
*Figure C06-M01-F2. A request and response, with the session cookie and the missing security attributes highlighted.*

## Stateless HTTP plus cookies equals sessions

![A flow showing login creating a session cookie that the browser returns on each request so the server can identify the user, with the safety requirements listed.](/assets/courses/cyber-06/C06-M01-F3.svg)
*Figure C06-M01-F3. Cookies carry a session identifier that turns a stateless protocol into an authenticated session [R2].*
