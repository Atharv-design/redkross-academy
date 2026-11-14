TAXII 2.1 (OASIS Standard, 10 June 2021) is a RESTful HTTPS protocol for exchanging STIX [R2]. Its resources:

| Term | Meaning |
|---|---|
| discovery | /taxii2/ - server information and API roots |
| API root | e.g. /sharing/ - a logical service with versions and limits |
| collections | sets of objects with can_read and can_write |
| objects | GET (with filters such as added_after, type and id) and POST (add a bundle or envelope) |
| manifest | metadata about the objects in a collection |
| status | the result of an add operation |

Authentication is HTTP-based; the specification states that an unauthenticated request is answered with HTTP 401 and a WWW-Authenticate header. Clients poll with added_after to fetch only what is new and page through large results.

The lab runs medallion 3.0.0, the OASIS TC open-source TAXII 2.1 server, on 127.0.0.1:5005 with an in-memory backend, two users and two collections: a writable MONSOON LANTERN collection and a read-only advisories collection. taxii_exchange.py (taxii2-client 2.3.0) runs the full exchange (deep dive).
