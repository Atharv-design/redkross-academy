import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  CYBER_CATEGORIES,
  CYBER_COMMAND_VAULT,
  searchCyberCommands,
  getCommandsForModule
} from '../src/data/cybersecurityCommandVault.js';
import e2bHandler from '../api/e2b.js';

console.log('--- STARTING COMPREHENSIVE CYBERSECURITY COMMAND VAULT & TERMINAL TESTING ---');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`[PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${desc}: ${err.message}`);
    failCount++;
  }
}

// 1. Vault Completeness & Integrity
it('Command vault contains at least 340 verified cybersecurity commands', () => {
  assert(CYBER_COMMAND_VAULT.length >= 340, `Expected >= 340 commands, got ${CYBER_COMMAND_VAULT.length}`);
});

it('All 9 operational cybersecurity categories are registered', () => {
  const catIds = CYBER_CATEGORIES.map(c => c.id).filter(id => id !== 'all');
  assert.strictEqual(catIds.length, 9, 'Expected 9 categories');
  assert(catIds.includes('recon'), 'Missing recon');
  assert(catIds.includes('web'), 'Missing web');
  assert(catIds.includes('crypto'), 'Missing crypto');
  assert(catIds.includes('privesc'), 'Missing privesc');
  assert(catIds.includes('forensics'), 'Missing forensics');
  assert(catIds.includes('reversing'), 'Missing reversing');
  assert(catIds.includes('osint'), 'Missing osint');
  assert(catIds.includes('cloud'), 'Missing cloud');
  assert(catIds.includes('scripting'), 'Missing scripting');
});

it('Every command has complete metadata (id, name, command, description, flags, tags)', () => {
  for (const cmd of CYBER_COMMAND_VAULT) {
    assert(cmd.id && cmd.id.length > 0, `Missing id on ${JSON.stringify(cmd)}`);
    assert(cmd.name && cmd.name.length > 0, `Missing name on ${cmd.id}`);
    assert(cmd.command && cmd.command.length > 0, `Missing command on ${cmd.id}`);
    assert(cmd.category && cmd.category.length > 0, `Missing category on ${cmd.id}`);
    assert(cmd.description && cmd.description.length > 0, `Missing description on ${cmd.id}`);
    assert(cmd.difficulty && ['Novice', 'Intermediate', 'Advanced'].includes(cmd.difficulty), `Invalid difficulty on ${cmd.id}: ${cmd.difficulty}`);
    assert(Array.isArray(cmd.tags) && cmd.tags.length > 0, `Missing tags on ${cmd.id}`);
  }
});

// 2. Search & Indexing Engine
it('searchCyberCommands filters by query term across commands and flags', () => {
  const nmapResults = searchCyberCommands({ query: 'nmap' });
  assert(nmapResults.length >= 10, `Expected >= 10 nmap results, got ${nmapResults.length}`);
  for (const r of nmapResults) {
    const text = (r.name + ' ' + r.command + ' ' + r.description + ' ' + r.flagsExplanation + ' ' + r.tags.join(' ')).toLowerCase();
    assert(text.includes('nmap'), `Result ${r.id} did not contain nmap`);
  }
});

it('searchCyberCommands filters by category cleanly', () => {
  const cryptoResults = searchCyberCommands({ category: 'crypto' });
  assert.strictEqual(cryptoResults.length, 40, `Expected 40 crypto commands, got ${cryptoResults.length}`);
  for (const r of cryptoResults) {
    assert.strictEqual(r.category, 'crypto');
  }
});

it('searchCyberCommands filters by difficulty level', () => {
  const noviceResults = searchCyberCommands({ difficulty: 'novice' });
  assert(noviceResults.length > 50, `Expected > 50 novice commands, got ${noviceResults.length}`);
  for (const r of noviceResults) {
    assert.strictEqual(r.difficulty.toLowerCase(), 'novice');
  }
});

it('getCommandsForModule returns valid exercises across all curriculum modules', () => {
  for (let modIdx = 0; modIdx < 12; modIdx++) {
    const recs = getCommandsForModule(modIdx);
    assert(Array.isArray(recs) && recs.length === 6, `Module ${modIdx} should have 6 recommendations, got ${recs.length}`);
  }
});

// 3. UI Component Files
it('CommandVaultModal.jsx file exists and exports valid React component', () => {
  const modalPath = path.resolve('src/components/student/CommandVaultModal.jsx');
  assert(fs.existsSync(modalPath), 'CommandVaultModal.jsx must exist');
  const src = fs.readFileSync(modalPath, 'utf8');
  assert(src.includes('export default function CommandVaultModal'), 'Missing default export in CommandVaultModal');
  assert(src.includes('Cybersecurity Command Vault'), 'Missing modal title in CommandVaultModal');
  assert(src.includes('340 Commands'), 'Missing command badge count');
});

it('CockpitTerminalPanel.jsx integrates CommandVaultModal and Ctrl+K listener', () => {
  const panelPath = path.resolve('src/components/student/CockpitTerminalPanel.jsx');
  const src = fs.readFileSync(panelPath, 'utf8');
  assert(src.includes('CommandVaultModal'), 'CockpitTerminalPanel must import CommandVaultModal');
  assert(src.includes('isVaultOpen'), 'CockpitTerminalPanel must maintain isVaultOpen state');
  assert(src.includes('Ctrl+K') || src.includes('metaKey'), 'CockpitTerminalPanel must support Ctrl+K');
  assert(src.includes('getCommandsForModule'), 'CockpitTerminalPanel must use getCommandsForModule');
});

// 4. E2B Backend Lab Suite
it('api/e2b.js responds to labs action with full suite metadata', async () => {
  const req = { method: 'POST', body: { action: 'labs' } };
  let statusCode = 0;
  let resData = null;
  const res = {
    setHeader() {},
    status(c) { statusCode = c; return this; },
    json(d) { resData = d; return this; },
    end() {}
  };

  await e2bHandler(req, res);
  assert.strictEqual(statusCode, 200, `Expected status 200, got ${statusCode}`);
  assert(resData && resData.success, 'Expected success: true');
  assert.strictEqual(resData.labSuite.categoriesCount, 9);
  assert.strictEqual(resData.labSuite.totalCommands, 340);
  assert(resData.labSuite.artifacts.includes('/home/user/labs/forensics/auth.log'));
  assert(resData.labSuite.cliTools.includes('/usr/local/bin/rk-vault'));
});

// 5. Fallback Shell Security Commands
it('api/e2b.js fallback shell supports nmap, dig, whois, rk-vault', async () => {
  const testCommands = ['nmap 127.0.0.1', 'dig redkross.org.in', 'whois redkross.org.in', 'rk-vault list', 'rk-lab start'];
  for (const cmd of testCommands) {
    const req = { method: 'POST', body: { action: 'exec', command: cmd, sandboxId: 'local_vm_test' } };
    let resData = null;
    const res = {
      setHeader() {},
      status() { return this; },
      json(d) { resData = d; return this; },
      end() {}
    };
    await e2bHandler(req, res);
    assert(resData && resData.success, `Expected success on ${cmd}`);
    assert(resData.stdout.length > 0, `Expected stdout for ${cmd}`);
  }
});

console.log(`\n--- TEST RUN SUMMARY: ${passCount} PASSED, ${failCount} FAILED ---`);
if (failCount > 0) {
  process.exit(1);
}
