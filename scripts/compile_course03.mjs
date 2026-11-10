import fs from 'fs';
import path from 'path';

console.log('--- REDKROSS ACADEMY: COURSE 03 COMPILER ---');

const course03TextPath = 'RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_03_Linux_and_Windows_System_Administration.txt';
const rawText = fs.readFileSync(course03TextPath, 'utf8');

// Verify read
console.log('Read course 03 text successfully. Size:', (rawText.length / 1024).toFixed(1), 'KB');
