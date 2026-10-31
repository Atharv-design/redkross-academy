import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting Social & Official Network Logos Verification Suite...\n');

// 1. Read CourseDetailPage.jsx
const courseDetailPagePath = path.resolve('src/pages/public/CourseDetailPage.jsx');
assert(fs.existsSync(courseDetailPagePath), 'CourseDetailPage.jsx must exist');
const courseDetailContent = fs.readFileSync(courseDetailPagePath, 'utf8');

// Test 1: RedKross Foundation link present and configured to open in new tab
assert(
  courseDetailContent.includes('ecosystem.foundation') &&
  courseDetailContent.includes('target="_blank"') &&
  courseDetailContent.includes('rel="noopener noreferrer"'),
  'CourseDetailPage must link to RedKross Foundation with target="_blank" and rel="noopener noreferrer"'
);
console.log('✅ PASS: RedKross Foundation link verified');

// Test 2: WhatsApp Channel link present and configured
const expectedWhatsapp = 'https://whatsapp.com/channel/0029VbBbRCn7tkj2M1Sj7f3Z';
assert(
  courseDetailContent.includes(expectedWhatsapp),
  'CourseDetailPage must link to official WhatsApp channel'
);
console.log('✅ PASS: WhatsApp Channel link verified');

// Test 3: Instagram link present and configured
const expectedInstagram = 'https://www.instagram.com/redkross_research_foundation?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==';
assert(
  courseDetailContent.includes(expectedInstagram),
  'CourseDetailPage must link to official Instagram profile'
);
console.log('✅ PASS: Instagram link verified');

// Test 4: Verify NO TEXT labels are rendered (no "OFFICIAL NETWORK", no "RedKross LinkedIn", no "PARENT CHARTER")
assert(
  !courseDetailContent.includes('OFFICIAL NETWORK'),
  'CourseDetailPage must not render "OFFICIAL NETWORK" text'
);
assert(
  !courseDetailContent.includes('RedKross LinkedIn'),
  'CourseDetailPage must not render "RedKross LinkedIn" text'
);
assert(
  !courseDetailContent.includes('PARENT CHARTER'),
  'CourseDetailPage must not render "PARENT CHARTER" text'
);
console.log('✅ PASS: Text labels removed — strictly clean logo buttons rendered');

// Test 5: Verify all 3 logos exist (Crest image for Foundation, SVGs for WhatsApp and Instagram)
assert(
  courseDetailContent.includes('/assets/crest-clean-circle.png'),
  'RedKross Foundation must render crest logo'
);
assert(
  courseDetailContent.includes('text-[#25D366]'),
  'WhatsApp logo must render green SVG'
);
assert(
  courseDetailContent.includes('text-[#E1306C]'),
  'Instagram logo must render SVG'
);
console.log('✅ PASS: All 3 official logos present and styled');

// 2. Read Footer.jsx
const footerPath = path.resolve('src/components/common/Footer.jsx');
assert(fs.existsSync(footerPath), 'Footer.jsx must exist');
const footerContent = fs.readFileSync(footerPath, 'utf8');

assert(
  footerContent.includes(expectedWhatsapp) && footerContent.includes(expectedInstagram),
  'Footer must also provide verified social links'
);
console.log('✅ PASS: Footer social integration verified');

// 3. Read ecosystemLinks.js
const ecosystemPath = path.resolve('src/utils/ecosystemLinks.js');
const ecosystemContent = fs.readFileSync(ecosystemPath, 'utf8');
assert(
  ecosystemContent.includes('instagram:') && ecosystemContent.includes('whatsapp:'),
  'ecosystemLinks.js must include centralized instagram and whatsapp endpoints'
);
console.log('✅ PASS: ecosystemLinks.js centralized registry verified');

console.log('\n🌟 ALL 8 SOCIAL & NETWORK LOGO TESTS PASSED WITH 100% SUCCESS!');
