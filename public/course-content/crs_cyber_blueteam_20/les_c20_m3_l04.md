A Suricata rule has three parts: the action, the header (protocol, addresses, ports and direction) and the options in parentheses [R2]. Actions include alert, pass, drop and reject (drop and reject need inline IPS mode). The lab rule:

```text
BEGIN CODE
alert http any any -> any any (msg:"RK-LAB backup directory download
  over HTTP"; flow:established,to_server; http.method; content:"GET";
  http.uri; content:"/backup/"; startswith; classtype:policy-violation;
  sid:9200001; rev:1;)
END CODE
```

(Shown wrapped; a rule is one line in the file.)

**Good practice:**

- Use sticky buffers (http.uri, http.user_agent, dns.query, tls.sni) so content matches the right field, not any bytes in the packet.
- Use flow:established and a direction to cut false matches.
- Give each rule a unique sid from your private range, increment rev on every change, and write a msg that says exactly what the rule checks. (The lab's third rule was renamed during testing because its message claimed "archive file" while the logic checked only the 404 status.)
- Test every rule against a capture that should match and one that should not, and with suricata -T to check that the rules load.
