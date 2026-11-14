Encoding makes data display as text instead of being interpreted by the browser or other consumer. The right encoding depends on context:

| Term | Meaning |
|---|---|
| HTML body/attribute | html.escape(value, quote=True) converts & < > " ' |
| URL parameter | urllib.parse.quote |
| JavaScript string | JSON serialisation (json.dumps) into a data attribute, rather than writing into script blocks |
| CSV/spreadsheets | prefix cells starting with = + - @ (Course 04 Module 3 CSV injection) |

Execution-tested (test_note_is_html_escaped): the note

```text
Fragile <glass> & "quoted"
```

renders as

```text
<p class='note'>Fragile &lt;glass&gt; &amp; &quot;quoted&quot;</p>
```

Defence in depth for web output: framework auto-escaping, a Content Security Policy header restricting script sources, and HttpOnly cookies (Course 06).
