import { mockEngine } from '../src/services/db/mockEngine.js';

// Simulate an initial load
const db1 = mockEngine.getDb();
console.log('1st getDb() curriculum_version:', db1._curriculum_version);

// Clear cache to simulate another read
mockEngine._cachedDb = null;
const db2 = mockEngine.getDb();
console.log('2nd getDb() after cache clear curriculum_version:', db2._curriculum_version);

console.log('Courses count in db2:', db2.courses.length);
