stix_build.py (stix2 3.0.2, stix2-patterns 2.1.2; m06_stix_output.txt):

```output
bundle bundle--1efe4803-...: 38 objects
   attack-pattern   7
   campaign         1
   identity         1
   indicator        10
   relationship     17
   report           1
   sighting         1
markings: ['marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed',
           'marking-definition--f88d31f6-486f-44da-b317-01333bde0b82']
all patterns valid; strict parse OK -> stix\monsoon_lantern_bundle.json
```

taxii_exchange.py against the local medallion server (m06_taxii_output.txt):

```output
Discovery: RedKross C14 lab TAXII server (fictional) | api roots:
  ['http://127.0.0.1:5005/sharing/']
API root: Nilgiri sharing API root | versions:
  ['application/taxii+json;version=2.1']
  collection 91a7b528-...  read=True write=True   MONSOON LANTERN (TLP:AMBER)
  collection 472c94ae-...  read=True write=False  Read-only advisories
add_objects: status=complete total=38 success=38 failure=0 pending=0
poll type=indicator: 10 objects
poll added_after=2026-11-07T22:44:19.000Z: 38 objects
paged fetch, 10 per request: 4 pages, 38 objects
manifest entries: 38
write to read-only collection refused: AccessError Collection ...
wrong password refused: HTTPError 401 Client Error: UNAUTHORIZED ...
$ curl (wrong password, raw HTTP)
HTTP 401
POST to read-only collection, raw HTTP 403
```

**Interpretation:**

- 38 objects: 1 identity, 1 campaign, 10 indicators with 10 "indicates" relationships, 7 attack patterns with 7 "uses" relationships, 1 sighting and 1 report.
- The type filter returned exactly the 10 indicators; added_after returned all 38 because they had just been added; paging at 10 per request needed 4 requests.
- Access control was checked twice: the client library refused to write to a collection that advertises can_write false, and the raw HTTP request proved the server itself also refuses (403); a wrong password received 401.

**Limitations:** the bundle identifier is random on each run; the server is plain HTTP on loopback for the lab only - TAXII in production must use HTTPS; medallion's memory backend loses data when stopped.
