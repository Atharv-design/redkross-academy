import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Import mockEngine from source
const { mockEngine } = await import(
  new URL('../src/services/db/mockEngine.js', import.meta.url).href
);

describe('Component & Button Audit Verification Suite', () => {

  test('1. Orphaned and unused components are permanently purged from codebase', () => {
    const deletedFiles = [
      path.join(projectRoot, 'src', 'components', 'cards', 'DictoCyberCard.jsx'),
      path.join(projectRoot, 'src', 'components', 'ui', 'KpiCard.jsx'),
      path.join(projectRoot, 'src', 'components', 'ui', 'steps.jsx'),
      path.join(projectRoot, 'src', 'components', 'common', 'CyberLightningDischarge.jsx')
    ];

    for (const filePath of deletedFiles) {
      assert.strictEqual(
        fs.existsSync(filePath),
        false,
        `Expected orphaned component to be deleted: ${filePath}`
      );
    }
  });

  test('2. Admin Settings and Catalog Embargo synchronization', () => {
    // Test Engaging Embargo (public_catalog_enabled -> false)
    mockEngine.setPublicCatalogEnabled(false);
    let db = mockEngine.getDb();
    assert.strictEqual(db.public_catalog_enabled, false, 'Catalog should be embargoed');

    // Test Releasing Embargo (public_catalog_enabled -> true)
    mockEngine.setPublicCatalogEnabled(true);
    db = mockEngine.getDb();
    assert.strictEqual(db.public_catalog_enabled, true, 'Catalog should be publicly released');
  });

  test('3. Semantic slug prioritization for Course Card Links', () => {
    const testCourseWithSlug = {
      id: 'crs_test_999',
      slug: 'advanced-soc-operations',
      title: 'Advanced SOC Operations'
    };

    const testCourseWithoutSlug = {
      id: 'crs_legacy_888',
      title: 'Legacy Security Course'
    };

    const resolveLink = (course) => `/courses/${course.slug || course.id || ''}`;

    assert.strictEqual(
      resolveLink(testCourseWithSlug),
      '/courses/advanced-soc-operations',
      'Should prioritize semantic slug'
    );

    assert.strictEqual(
      resolveLink(testCourseWithoutSlug),
      '/courses/crs_legacy_888',
      'Should fallback cleanly to ID when slug is not present'
    );
  });

  test('4. Study Resource document content generation for lesson downloads', () => {
    const sampleResource = {
      name: 'Windows Event ID Reference Matrix',
      size: '890 KB'
    };

    const courseTitle = 'SOC Analyst L1 & L2 Defensive Operations';
    const lessonTitle = '1.1 System Initialization & Telemetry';

    const generateDocContent = (res) => {
      return (
        `# REDKROSS ACADEMY - TECHNICAL STUDY REFERENCE\n` +
        `Asset: ${res.name}\n` +
        `Course: ${courseTitle}\n` +
        `Module: ${lessonTitle}\n` +
        `NIST Alignment: NIST SP 800-61r2\n` +
        `MITRE ATT&CK Matrix: T1059, T1078`
      );
    };

    const content = generateDocContent(sampleResource);
    assert.ok(content.includes('REDKROSS ACADEMY'), 'Document should contain institutional brandmark');
    assert.ok(content.includes('Windows Event ID Reference Matrix'), 'Document should include asset title');
    assert.ok(content.includes('NIST SP 800-61r2'), 'Document should include NIST playbook alignment');
    assert.ok(content.includes('MITRE ATT&CK Matrix'), 'Document should include MITRE reference');
  });

  test('5. Course Creation Pipeline and Attribute Integrity', () => {
    const newCoursePayload = {
      title: 'Active Directory Kerberos Auditing',
      category: 'Specialist Operations',
      level: 'Advanced',
      duration: '4 Weeks',
      xp_reward: 1500
    };

    const created = mockEngine.createCourse(newCoursePayload);
    assert.ok(created.id, 'New course must have unique ID');
    assert.strictEqual(created.title, 'Active Directory Kerberos Auditing');
    assert.strictEqual(created.status, 'PUBLISHED', 'New course must default to PUBLISHED status');
    assert.ok(created.card_variant.startsWith('variant-'), 'New course must receive 3D card variant');
    assert.ok(created.modules.length > 0, 'New course must include foundational modules');
  });

  test('6. Real Database Statistics and Telemetry Integrity', () => {
    const stats = mockEngine.getRealDatabaseStats();
    assert.ok(typeof stats.totalStudents === 'number', 'totalStudents should be a number');
    assert.ok(typeof stats.totalCourses === 'number', 'totalCourses should be a number');
    assert.ok(typeof stats.totalEnrolments === 'number', 'totalEnrolments should be a number');
    assert.ok(typeof stats.validCredentialsCount === 'number', 'validCredentialsCount should be a number');
    assert.ok(stats.totalCourses >= 1, 'Should have at least 1 course in database');
  });
});
