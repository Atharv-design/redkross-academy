import fs from 'fs';
import path from 'path';

console.log('=== RUNNING CHALLENGER EMPIRICAL VERIFICATION & STRESS TEST FOR M2 ===\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  } else {
    console.log(`[PASS] ${message}`);
    passedTests++;
  }
}

const BASE_DIR = 'C:\\Users\\athar\\RedKross Academy Website';
const GUIDANCE_PATH = path.join(BASE_DIR, 'src', 'components', 'common', 'StudentGuidanceSection.jsx');
const HOMEPAGE_PATH = path.join(BASE_DIR, 'src', 'pages', 'public', 'HomePage.jsx');
const NAVBAR_PATH = path.join(BASE_DIR, 'src', 'components', 'common', 'Navbar.jsx');

// TEST 1: File Existence
assert(fs.existsSync(GUIDANCE_PATH), 'StudentGuidanceSection.jsx exists in src/components/common/');
assert(fs.existsSync(HOMEPAGE_PATH), 'HomePage.jsx exists in src/pages/public/');
assert(fs.existsSync(NAVBAR_PATH), 'Navbar.jsx exists in src/components/common/');

const guidanceSrc = fs.readFileSync(GUIDANCE_PATH, 'utf-8');
const homepageSrc = fs.readFileSync(HOMEPAGE_PATH, 'utf-8');
const navbarSrc = fs.readFileSync(NAVBAR_PATH, 'utf-8');

// TEST 2: Step Structure & Copy Verification
const expectedSteps = ['01', '02', '03', '04'];
expectedSteps.forEach(st => {
  assert(guidanceSrc.includes(`step: '${st}'`), `Step ${st} definition exists in STEPS array`);
  assert(guidanceSrc.includes(`{item.step}`), `Step pill dynamically renders item.step in template`);
});

// TEST 3: R2 Exact Required Titles
assert(guidanceSrc.includes("Choose Your Academy Track"), "Step 1 title matches: 'Choose Your Academy Track'");
assert(guidanceSrc.includes("Explore Syllabus & Requirements"), "Step 2 title matches: 'Explore Syllabus & Requirements'");
assert(guidanceSrc.includes("Enroll with Unified RK ID"), "Step 3 title matches: 'Enroll with Unified RK ID'");
assert(guidanceSrc.includes("Enter Domain Classroom & Certify"), "Step 4 title matches: 'Enter Domain Classroom & Certify'");

// TEST 4: R2 Exact Required Focus / Discipline Descriptions
assert(guidanceSrc.includes("Defensive Cyber or Clinical Psychology"), "Step 1 focus matches: 'Defensive Cyber or Clinical Psychology'");
assert(guidanceSrc.includes("Curriculum preview, prerequisites, lab toolchains"), "Step 2 focus matches: 'Curriculum preview, prerequisites, lab toolchains'");
assert(guidanceSrc.includes("Instant enrolment, deterministic credential allocation"), "Step 3 focus matches: 'Instant enrolment, deterministic credential allocation'");
assert(guidanceSrc.includes("Sequential lessons, practical labs, 50-MCQ proctored certification"), "Step 4 focus matches: 'Sequential lessons, practical labs, 50-MCQ proctored certification'");

// TEST 5: Amber Theme & Styling Tokens
assert(guidanceSrc.includes("ultra-glass-card"), "Liquid glass card class 'ultra-glass-card' applied to step cards");
assert(guidanceSrc.includes("font-royal"), "Lora typography token 'font-royal' applied to headings");
assert(guidanceSrc.includes("#FF7A00"), "Authoritative Amber Orange (#FF7A00) present in component styles");
assert(guidanceSrc.includes("#FFA439"), "Authoritative Amber Gold (#FFA439) present in component styles");
assert(guidanceSrc.includes("shadow-[0_0_12px_rgba(255,122,0,0.35)]"), "Glowing amber pill drop shadow is present");

// TEST 6: Desktop Timeline Connecting Bar
assert(guidanceSrc.includes("hidden lg:block absolute top-12 left-8 right-8 h-[2px] bg-gradient-to-r"), "Horizontal connecting guide line present for desktop");

// TEST 7: Responsive Grid Layout Boundaries
assert(guidanceSrc.includes("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"), "Responsive grid defines 1 col (mobile), 2 cols (tablet), 4 cols (desktop)");

// TEST 8: Accessibility & Semantics
assert(guidanceSrc.includes('id="guidance"'), "Section has semantic ID #guidance");
assert(guidanceSrc.includes('aria-label="Student Guidance: The Educational Journey"'), "Section has accessible aria-label");
assert(guidanceSrc.includes('<h2'), "Section uses semantic <h2> for main title");
assert(guidanceSrc.includes('<h3'), "Steps use semantic <h3> for step card titles");

// TEST 9: Null-safe Smooth Scroll Handler
assert(guidanceSrc.includes("handleScrollToAcademies"), "Explore button has smooth scroll handler");
assert(guidanceSrc.includes("document.getElementById('academies')"), "Smooth scroll targets #academies");
assert(guidanceSrc.includes("if (el) {"), "Smooth scroll handler safely guards against null element before scrolling");

// TEST 10: HomePage.jsx Integration & Relative Ordering
assert(homepageSrc.includes("import StudentGuidanceSection from '../../components/common/StudentGuidanceSection'"), "HomePage imports StudentGuidanceSection");

const heroIndex = homepageSrc.indexOf("One Institutional Foundation");
const guidanceTagIndex = homepageSrc.indexOf("<StudentGuidanceSection />");
const academiesSectionIndex = homepageSrc.indexOf('id="academies"');

assert(heroIndex !== -1, "Hero section found in HomePage.jsx");
assert(guidanceTagIndex !== -1, "<StudentGuidanceSection /> found in HomePage.jsx");
assert(academiesSectionIndex !== -1, '<section id="academies"> found in HomePage.jsx');
assert(heroIndex < guidanceTagIndex, "Hero is rendered BEFORE StudentGuidanceSection");
assert(guidanceTagIndex < academiesSectionIndex, "StudentGuidanceSection is rendered BEFORE #academies section");

// TEST 11: Preservation of #academies and scroll-mt-28
assert(homepageSrc.includes('id="academies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative scroll-mt-28"'), "section #academies preserves exact styling and scroll-mt-28 anchor");

// TEST 12: Navbar.jsx smooth scroll targets #academies
assert(navbarSrc.includes("document.getElementById('academies')"), "Navbar smooth-scroll correctly targets #academies");

console.log(`\n=== STRESS TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED ===`);
if (failedTests > 0) {
  process.exit(1);
}
