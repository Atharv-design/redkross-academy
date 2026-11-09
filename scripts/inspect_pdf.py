import fitz

doc = fitz.open('public/RedKross_Cybersecurity_Tools_Manual.pdf')
print('Total pages:', len(doc))
for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    first_line = lines[0] if lines else 'EMPTY'
    last_line = lines[-1] if lines else 'EMPTY'
    print(f'Page {i+1}: {len(lines)} lines | Starts: "{first_line[:40]}" | Ends: "{last_line[:40]}"')
