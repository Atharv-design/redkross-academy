/**
 * tests/unit_test_cyber_lab_v3.mjs
 * Rigorous automated test suite for Cyber Lab V3 Kali Desktop Integration.
 * Verifies godofweak/cyber-lab architecture compliance, target containers, command engine, and UI components.
 */

import assert from 'node:assert/strict';
import {
  CYBER_LAB_CONTAINERS,
  JUICE_SHOP_PRODUCTS,
  executeCyberLabCommand
} from '../src/data/cyberLabEngine.js';

console.log('🧪 Starting Cyber Lab V3 Kali Desktop Integration Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

// ================= TEST GROUP 1: CONTAINER ARCHITECTURE =================
test('Target containers array contains exactly 7 isolated Docker containers', () => {
  assert.equal(CYBER_LAB_CONTAINERS.length, 7);
  const names = CYBER_LAB_CONTAINERS.map(c => c.name);
  assert.ok(names.includes('kali-sandbox'), 'Must include kali-sandbox attacker node');
  assert.ok(names.includes('debian-target'), 'Must include debian-target node');
  assert.ok(names.includes('juice-shop'), 'Must include juice-shop node');
  assert.ok(names.includes('dvwa'), 'Must include dvwa node');
  assert.ok(names.includes('dvwa-db'), 'Must include dvwa-db node');
  assert.ok(names.includes('webgoat'), 'Must include webgoat node');
  assert.ok(names.includes('vampi'), 'Must include vampi node');
});

test('All containers are correctly mapped to isolated subnet 10.10.11.0/24', () => {
  CYBER_LAB_CONTAINERS.forEach(c => {
    assert.equal(c.network, 'lab-isolated');
    assert.match(c.ip, /^10\.10\.11\.\d+$/);
    assert.ok(c.role.length > 0);
    assert.ok(c.description.length > 0);
  });
});

// ================= TEST GROUP 2: OWASP JUICE SHOP DATA =================
test('Juice shop products include authentic items from reference screenshot', () => {
  assert.ok(JUICE_SHOP_PRODUCTS.length >= 2);
  const appleJuice = JUICE_SHOP_PRODUCTS.find(p => p.name.includes('Apple Juice'));
  assert.ok(appleJuice, 'Must include Apple Juice (1000ml)');
  assert.equal(appleJuice.price, 1.99);

  const applePomace = JUICE_SHOP_PRODUCTS.find(p => p.name.includes('Apple Pomace'));
  assert.ok(applePomace, 'Must include Apple Pomace');
  assert.equal(applePomace.price, 0.89);
});

// ================= TEST GROUP 3: COMMAND ENGINE EXECUTION =================
test('Command "lab status" returns all 7 running containers', () => {
  const res = executeCyberLabCommand('lab status');
  assert.equal(res.exitCode, 0);
  assert.equal(res.isError, false);
  assert.match(res.output, /kali-sandbox/);
  assert.match(res.output, /juice-shop/);
  assert.match(res.output, /dvwa/);
  assert.match(res.output, /All 7 containers are HEALTHY/);
});

test('Command "lab targets" returns full targets matrix with IPs and ports', () => {
  const res = executeCyberLabCommand('lab targets');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /CYBER LAB V3 TARGET MATRIX/);
  assert.match(res.output, /10\.10\.11\.120/); // Juice shop IP
  assert.match(res.output, /10\.10\.11\.110/); // DVWA IP
});

test('Command "lab open juice" triggers target opened callback', () => {
  let openedTarget = null;
  const res = executeCyberLabCommand('lab open juice', {
    onOpenTarget: (target) => {
      openedTarget = target;
    }
  });
  assert.equal(res.exitCode, 0);
  assert.equal(openedTarget, 'juice');
  assert.match(res.output, /Connected to http:\/\/juice\.lab\//);
});

test('Command "lab open dvwa" triggers target opened callback for DVWA', () => {
  let openedTarget = null;
  const res = executeCyberLabCommand('lab open dvwa', {
    onOpenTarget: (target) => {
      openedTarget = target;
    }
  });
  assert.equal(res.exitCode, 0);
  assert.equal(openedTarget, 'dvwa');
  assert.match(res.output, /Connected to http:\/\/dvwa\.lab\//);
});

test('Command "lab start", "lab stop", and "lab reset" manage lifecycle properly', () => {
  const startRes = executeCyberLabCommand('lab start');
  assert.match(startRes.output, /Starting Cyber Lab V3/);

  const stopRes = executeCyberLabCommand('lab stop');
  assert.match(stopRes.output, /safely suspended/);

  const resetRes = executeCyberLabCommand('lab reset');
  assert.match(resetRes.output, /Performing Cyber Lab Sandbox Reset/);
});

test('Network reconnaissance tool "nmap dvwa" reports port 80 and Apache server', () => {
  const res = executeCyberLabCommand('nmap dvwa');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /Nmap scan report for dvwa \(10\.10\.11\.110\)/);
  assert.match(res.output, /80\/tcp\s+open\s+http/);
});

test('Network reconnaissance tool "nmap juice-shop" reports port 3000 and Node.js', () => {
  const res = executeCyberLabCommand('nmap juice-shop');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /3000\/tcp\s+open\s+http/);
  assert.match(res.output, /OWASP Juice Shop/);
});

test('HTTP client tool "curl http://juice-shop" returns HTML response', () => {
  const res = executeCyberLabCommand('curl http://juice-shop');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /HTTP\/1\.1 200 OK/);
  assert.match(res.output, /OWASP Juice Shop/);
});

test('Exploitation tool "sqlmap dvwa" discovers SQL injection vulnerability and databases', () => {
  const res = executeCyberLabCommand('sqlmap -u http://dvwa');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /confirming parameter 'id' is vulnerable to SQL injection/);
  assert.match(res.output, /Database: dvwa/);
});

test('Network ICMP tool "ping -c 3 dvwa" succeeds with 0% packet loss', () => {
  const res = executeCyberLabCommand('ping -c 3 dvwa');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /3 packets transmitted, 3 received, 0% packet loss/);
});

test('Packet sniffer "tcpdump" captures isolated network traffic', () => {
  const res = executeCyberLabCommand('tcpdump -nn -i any');
  assert.equal(res.exitCode, 0);
  assert.match(res.output, /listening on any, link-type/);
  assert.match(res.output, /10\.10\.11\.100/);
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('🎉 ALL CYBER LAB V3 TESTS PASSED SUCCESSFULLY!\n');
} else {
  process.exit(1);
}
