const test = 'Line 1\nLine 2\n- **Bold:** "quoted text"';
const escaped = JSON.stringify(test).slice(1, -1);
console.log('Escaped:', escaped);
const fullStr = '"Prefix ' + escaped + ' Suffix"';
const evaluated = JSON.parse(fullStr);
console.log('Evaluated matches test?', evaluated === 'Prefix ' + test + ' Suffix');
