// Module 4 to 6 Curriculum Definition
// 20 Lessons, 60 Assessment Questions

export const modules_4_to_6 = [
  // =========================================================================
  // MODULE 4: JavaScript Programming (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_4',
    title: 'Module 4: JavaScript Programming',
    description: 'Master core JavaScript: primitive vs reference types, lexical scoping, higher-order array methods (map, filter, reduce), prototype chains, DOM manipulation, and the event propagation model.',
    order: 4,
    assignment: {
      id: 'asg_m4',
      title: 'Practical Assignment: High-Performance Interactive Task & Telemetry Manager',
      objective: 'Build an interactive CRUD task management application using pure vanilla JavaScript with DOM manipulation, custom event delegation, and persistent LocalStorage synchronization.',
      requirements: [
        'Render dynamic lists of tasks from an internal state array without page reloads.',
        'Implement event delegation on the task container to handle click, toggle, and delete actions with a single listener.',
        'Utilize higher-order array methods (map, filter, reduce) for calculating task statistics and filtering views.',
        'Persist task records to window.localStorage with JSON serialization and defensive deserialization parsing.',
        'Enforce clean separation of concerns: State, DOM Rendering functions, and Event Handlers.'
      ],
      instructions: '1. Create app.js. 2. Implement event delegation and array transformations. 3. Test edge cases (empty states, special characters). 4. Submit code and functional demonstration.',
      expected_outcome: 'A bug-free, pure JavaScript task management engine exhibiting zero memory leaks and proper event handling.'
    },
    lessons: [
      {
        id: 'les_m4_l1',
        title: 'JavaScript Syntax, Variables (let, const), Data Types & Type Coercion',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore JavaScript primitive types vs reference objects, variable declaration scopes (var vs let vs const), temporal dead zone (TDZ), and explicit vs implicit type coercion.',
        content: `# JavaScript Syntax, Variables (let, const), Data Types & Type Coercion

## 1. Overview & Learning Objectives
JavaScript is a dynamically typed, prototype-based, multi-paradigm language. In this foundational lesson, you will master:
- The 7 Primitive Types: \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`symbol\`, and \`null\`.
- Reference Types: \`Object\`, \`Array\`, \`Function\`, \`Date\`, \`Map\`, \`Set\`.
- Memory models: Stack allocation for primitives vs Heap allocation for reference objects.
- Variable declarations: Why \`var\` is obsolete; \`let\` and \`const\` with Block Scope and the Temporal Dead Zone (TDZ).
- Strict equality (\`===\`) vs loose equality (\`==\`) and implicit type coercion mechanics.

---

## 2. Memory Allocation: Primitives vs References
Primitives are immutable and passed by value. Objects are mutable and passed by reference:

\`\`\`javascript
// Primitives: Passed by Value
let a = 42;
let b = a;
b = 100;
console.log(a); // 42 (unchanged)

// Objects: Passed by Reference Pointer
const cadetA = { id: 'RK-101', role: 'Analyst' };
const cadetB = cadetA;
cadetB.role = 'Super Admin';
console.log(cadetA.role); // "Super Admin" (Mutated!)
\`\`\`

---

## 3. Scope & Temporal Dead Zone (TDZ)
\`let\` and \`const\` are block-scoped (\`{}\`) and enter the Temporal Dead Zone until their definition is evaluated:

\`\`\`javascript
{
  // TDZ for score begins
  // console.log(score); // ReferenceError: Cannot access 'score' before initialization
  let score = 95; // TDZ ends
  console.log(score); // 95
}
\`\`\`

---

## 4. Strict vs Loose Equality
Always use strict equality (\`===\`) to verify both type and value without unexpected coercion:

\`\`\`javascript
console.log(0 == false);   // true (Dangerous Coercion!)
console.log(0 === false);  // false (Accurate!)
console.log("" == 0);       // true
console.log("" === 0);      // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
\`\`\`

---

## 5. Key Takeaways
- Always default to \`const\`; only use \`let\` when variable reassignment is explicitly required. Never use legacy \`var\`.
- Never use loose equality (\`==\`); always enforce \`===\` and \`!==\`.

## 6. Documentation & References
- [MDN JavaScript Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN Equality Comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'JavaScript Types, Memory Allocation & Scoping Mastery',
        video_duration: '22:30',
        videos: [
          { id: 'vid_m4_l1_1', title: 'Data Types, Stack vs Heap & Variable Scope', url: '/assets/sample-lesson.mp4', duration: '22:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l1_1', title: 'Stack vs Heap Memory Model', url: '/assets/course-art/art-01.jpg', caption: 'Primitive values on Stack vs Reference objects on Heap.', alt: 'Memory Architecture Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l2',
        title: 'Operators, Expressions, Conditionals, and Control Flow Structures',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Master control flow: logical operators, short-circuit evaluation, nullish coalescing (??), optional chaining (?.), ternary operators, switch statements, and loop constructs.',
        content: `# Operators, Expressions, Conditionals, and Control Flow Structures

## 1. Overview & Learning Objectives
Control flow structures dictate how programs execute branching decisions. In this lesson, you will master:
- Short-circuit logical evaluation with \`&&\` and \`||\`.
- Modern defensive operators: Nullish Coalescing (\`??\`) and Optional Chaining (\`?.\`).
- Ternary expressions and \`switch(true)\` pattern matching.
- Iteration patterns: \`for\`, \`while\`, \`for...of\` (iterables), and \`for...in\` (object keys).

---

## 2. Modern Defensive Operators: ?. and ??
The Optional Chaining operator (\`?.\`) permits reading nested properties without triggering a runtime \`TypeError\` if an intermediate property is \`null\` or \`undefined\`:

\`\`\`javascript
const user = {
  id: 'usr_892',
  profile: {
    telemetry: {
      lastLoginIp: '198.51.100.12'
    }
  }
};

// Safe deep property navigation
const ip = user?.profile?.telemetry?.lastLoginIp; // "198.51.100.12"
const missingField = user?.organization?.name;    // undefined (No crash!)

// Nullish Coalescing (??) checks strictly for null or undefined (not false or 0)
const timeout = user.timeout ?? 3000; // 3000

// Compare with logical OR (||) which incorrectly replaces 0 and empty strings
const retryCount = 0;
console.log(retryCount || 3); // 3 (Bugs: 0 is overwritten!)
console.log(retryCount ?? 3); // 0 (Correct!)
\`\`\`

---

## 3. Key Takeaways
- Use \`??\` instead of \`||\` when numeric \`0\` or boolean \`false\` are legitimate values.
- Use \`for...of\` for arrays and iterable collections; reserve \`for...in\` strictly for enumerating object property keys.

## 4. Documentation & References
- [MDN Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Defensive Control Flow & Modern Operators',
        video_duration: '19:45',
        videos: [
          { id: 'vid_m4_l2_1', title: 'Control Flow, Optional Chaining & Short-Circuiting', url: '/assets/sample-lesson.mp4', duration: '19:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l2_1', title: 'Control Flow Branching Matrix', url: '/assets/course-art/art-02.jpg', caption: 'Logical branching and nullish coalescing evaluation trees.', alt: 'Control Flow Tree' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l3',
        title: 'Functions in Depth: Declarations, Expressions, Arrow Functions & Scope',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Explore first-class functions, function declarations vs expressions, arrow functions, lexical this binding, closures, and the call stack execution context.',
        content: `# Functions in Depth: Declarations, Expressions, Arrow Functions & Scope

## 1. Overview & Learning Objectives
In JavaScript, functions are first-class citizens—they can be stored in variables, passed as arguments, and returned from other functions. In this lesson, you will master:
- Function Declarations vs Function Expressions and hoisting mechanics.
- Arrow functions (\`() => {}\`) and lexical \`this\` scoping.
- Lexical Scope, Closure mechanics, and private variable encapsulation.
- Default parameters, Rest parameters, and higher-order functions.

---

## 2. Closures & Private Variable State
A closure is the combination of a function bundled together with references to its surrounding lexical state:

\`\`\`javascript
function createTokenBank(initialTokens = 100) {
  let privateBalance = initialTokens; // Enclosed private variable

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error('Invalid deposit');
      privateBalance += amount;
      return privateBalance;
    },
    deduct(amount) {
      if (amount > privateBalance) throw new Error('Insufficient balance');
      privateBalance -= amount;
      return privateBalance;
    },
    getBalance() {
      return privateBalance;
    }
  };
}

const myWallet = createTokenBank(250);
myWallet.deposit(50);
console.log(myWallet.getBalance()); // 300
// console.log(myWallet.privateBalance); // undefined (Completely encapsulated!)
\`\`\`

---

## 3. Arrow Functions vs Traditional Functions
- **Traditional Functions:** Define their own dynamic \`this\` context based on how they are called.
- **Arrow Functions:** Do not bind their own \`this\`, \`arguments\`, \`super\`, or \`new.target\`; they lexically capture \`this\` from the enclosing scope.

\`\`\`javascript
class SecurityMonitor {
  constructor() {
    this.threatLevel = 'ELEVATED';
  }

  startScanning() {
    // Arrow function preserves lexical 'this'
    setTimeout(() => {
      console.log(\`Scanner alert: Level is \${this.threatLevel}\`);
    }, 1000);
  }
}
\`\`\`

---

## 4. Key Takeaways
- Closures provide genuine data privacy and encapsulation without classes.
- Use arrow functions for callbacks and methods where you want to inherit the surrounding \`this\` binding.

## 5. Documentation & References
- [MDN Closures Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN Arrow Function Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'JavaScript Closures, Execution Context & Lexical this',
        video_duration: '23:10',
        videos: [
          { id: 'vid_m4_l3_1', title: 'Closures & Scope Execution Context', url: '/assets/sample-lesson.mp4', duration: '23:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l3_1', title: 'Lexical Scope & Closure Environment', url: '/assets/course-art/art-03.jpg', caption: 'Visual diagram of scope chains and enclosed variable heaps.', alt: 'Scope Chain Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l4',
        title: 'Arrays and Array Methods (map, filter, reduce, find, sort)',
        duration: '60 mins',
        is_mandatory: true,
        summary: 'Master declarative functional array transformations: map for mapping shapes, filter for pruning, reduce for aggregation, immutable array operations, and in-place sorting hazards.',
        content: `# Arrays and Array Methods (map, filter, reduce, find, sort)

## 1. Overview & Learning Objectives
Modern JavaScript emphasizes declarative, immutable data manipulation. In this lesson, you will master:
- Pure functional transformations: \`.map()\`, \`.filter()\`, \`.reduce()\`.
- Searching elements: \`.find()\`, \`.findIndex()\`, \`.some()\`, \`.every()\`, \`.includes()\`.
- Slicing and combining: \`.slice()\` (immutable) vs \`.splice()\` (mutating).
- Safe sorting with \`.toSorted()\` and comparator functions.

---

## 2. The Power of reduce()
The \`reduce()\` method executes a reducer function on each element, resulting in a single output value:

\`\`\`javascript
const incidentLogs = [
  { id: 'INC-1', severity: 'HIGH', impactScore: 85 },
  { id: 'INC-2', severity: 'CRITICAL', impactScore: 98 },
  { id: 'INC-3', severity: 'LOW', impactScore: 20 },
  { id: 'INC-4', severity: 'CRITICAL', impactScore: 94 }
];

// 1. Group incidents by severity
const groupedBySeverity = incidentLogs.reduce((acc, inc) => {
  acc[inc.severity] = acc[inc.severity] || [];
  acc[inc.severity].push(inc);
  return acc;
}, {});

// 2. Calculate average critical impact score
const criticalIncidents = incidentLogs.filter(inc => inc.severity === 'CRITICAL');
const avgScore = criticalIncidents.reduce((sum, inc) => sum + inc.impactScore, 0) / criticalIncidents.length;
console.log('Average Critical Severity Score:', avgScore); // 96
\`\`\`

---

## 3. Safe Immutable Sorting with toSorted()
The legacy \`.sort()\` method mutates the original array in place and converts elements to strings by default! Always provide a numeric comparator or use modern \`.toSorted()\`:

\`\`\`javascript
const numbers = [10, 5, 40, 25, 100];

// Safe immutable sort in ascending numerical order
const sorted = numbers.toSorted((a, b) => a - b);
console.log(sorted);  // [5, 10, 25, 40, 100]
console.log(numbers); // [10, 5, 40, 25, 100] (Original unchanged!)
\`\`\`

---

## 4. Key Takeaways
- Prefer non-mutating methods (\`map\`, \`filter\`, \`toSorted\`, \`slice\`) over in-place mutators (\`splice\`, \`reverse\`, \`sort\`).
- Always pass an initial accumulator value as the second argument to \`reduce()\`.

## 5. Documentation & References
- [MDN Array Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Functional Array Transformations & Data Aggregation',
        video_duration: '25:20',
        videos: [
          { id: 'vid_m4_l4_1', title: 'Deep Dive: Array map, filter & reduce', url: '/assets/sample-lesson.mp4', duration: '25:20', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l4_1', title: 'Array Transformation Pipeline', url: '/assets/course-art/art-04.jpg', caption: 'Step-by-step pipeline mapping input arrays through filter, map, and reduce.', alt: 'Array Pipeline Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l5',
        title: 'Object-Oriented JavaScript: Objects, Prototypes, and this Binding',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Understand prototypal inheritance: object literals, constructor functions, the prototype chain (__proto__ vs prototype), modern class syntax, and explicit binding (call, apply, bind).',
        content: `# Object-Oriented JavaScript: Objects, Prototypes, and this Binding

## 1. Overview & Learning Objectives
JavaScript does not implement traditional classical class inheritance; it utilizes prototypal delegation. In this lesson, you will master:
- Object property descriptors (\`enumerable\`, \`configurable\`, \`writable\`).
- Prototypal inheritance and delegation lookup up the prototype chain.
- Modern ES6 class syntax, constructors, private fields (\`#privateField\`), and getters/setters.
- Explicitly controlling \`this\` using \`.call()\`, \`.apply()\`, and \`.bind()\`.

---

## 2. Prototypal Inheritance Mechanics
When an object property is accessed, the JavaScript engine looks first on the instance itself. If not found, it traverses \`Object.getPrototypeOf(obj)\` up the chain to \`Object.prototype\`:

\`\`\`javascript
class NetworkDevice {
  #firmwareVersion = '2.4.1'; // Private class field

  constructor(hostname, ipAddress) {
    this.hostname = hostname;
    this.ipAddress = ipAddress;
  }

  get telemetry() {
    return \`\${this.hostname} (\${this.ipAddress}) - FW: \${this.#firmwareVersion}\`;
  }

  ping() {
    return \`[ECHO] \${this.ipAddress} responded in 12ms\`;
  }
}

class SecurityGateway extends NetworkDevice {
  constructor(hostname, ipAddress, firewallProfile) {
    super(hostname, ipAddress);
    this.firewallProfile = firewallProfile;
  }

  inspectPacket(packetId) {
    return \`Gateway \${this.hostname} analyzed packet \${packetId} under profile \${this.firewallProfile}\`;
  }
}

const fw = new SecurityGateway('edge-router-01', '10.0.0.1', 'STRICT_BLOCK');
console.log(fw.ping()); // Delegated up the prototype chain to NetworkDevice!
\`\`\`

---

## 3. Explicit this Binding: call, apply, bind
\`\`\`javascript
function authenticateUser(authMethod) {
  return \`User \${this.username} verified via \${authMethod}\`;
}

const userObj = { username: 'Cadet_Sarah' };

// 1. call: arguments passed comma-separated
authenticateUser.call(userObj, 'Hardware FIDO2 Token');

// 2. apply: arguments passed as array
authenticateUser.apply(userObj, ['Biometric Scan']);

// 3. bind: returns a new permanently bound function
const boundAuth = authenticateUser.bind(userObj);
boundAuth('PKI Certificate');
\`\`\`

---

## 4. Key Takeaways
- Classes are syntactical sugar over JavaScript's existing prototype-based inheritance.
- \`.bind()\` permanently locks the \`this\` context of a function.

## 5. Documentation & References
- [MDN Object Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Prototypes, Classes & Explicit this Binding',
        video_duration: '22:00',
        videos: [
          { id: 'vid_m4_l5_1', title: 'Prototypal Delegation & Class Architecture', url: '/assets/sample-lesson.mp4', duration: '22:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l5_1', title: 'Prototype Delegation Chain', url: '/assets/course-art/art-05.jpg', caption: 'Traversing instance -> Prototype -> Object.prototype.', alt: 'Prototype Chain Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l6',
        title: 'Document Object Model (DOM) Manipulation & Dynamic Rendering',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Manipulate browser DOM nodes with high performance: querySelector, createElement, DocumentFragment for batch rendering, classList manipulation, and dataset manipulation.',
        content: `# Document Object Model (DOM) Manipulation & Dynamic Rendering

## 1. Overview & Learning Objectives
The Document Object Model (DOM) is an object-oriented representation of the web page that can be modified with scripting languages. In this lesson, you will master:
- Node selection with \`document.querySelector()\` and \`document.querySelectorAll()\`.
- Creating, configuring, and appending DOM nodes.
- Batch rendering with \`DocumentFragment\` to prevent layout reflow thrashing.
- Managing classes safely with \`element.classList\` (\`add\`, \`remove\`, \`toggle\`, \`contains\`).

---

## 2. High-Performance Batch Rendering with DocumentFragment
Directly appending elements to the active DOM in a loop forces the browser to recalculate layouts on every iteration (layout thrashing). Use a \`DocumentFragment\` to batch DOM updates:

\`\`\`javascript
const cadets = [
  { id: 'RK-1', name: 'Atharv', role: 'Security Architect' },
  { id: 'RK-2', name: 'Sarah', role: 'Threat Hunter' },
  { id: 'RK-3', name: 'Devon', role: 'Forensics Specialist' }
];

const container = document.querySelector('#cadet-list-container');

// Create an in-memory DocumentFragment (No layout reflows!)
const fragment = document.createDocumentFragment();

cadets.forEach((cadet) => {
  const card = document.createElement('div');
  card.className = 'cadet-card cyber-glass-card';
  card.dataset.cadetId = cadet.id;

  const title = document.createElement('h3');
  title.textContent = cadet.name; // textContent prevents XSS injection

  const badge = document.createElement('span');
  badge.className = 'role-badge';
  badge.textContent = cadet.role;

  card.append(title, badge);
  fragment.appendChild(card);
});

// Single reflow: commit all cards to the live DOM simultaneously
container.appendChild(fragment);
\`\`\`

---

## 3. Key Takeaways
- Always use \`textContent\` rather than \`innerHTML\` when displaying untrusted user input to prevent Cross-Site Scripting (XSS).
- Use \`DocumentFragment\` when injecting multiple elements into the DOM.

## 4. Documentation & References
- [MDN Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'DOM Manipulation & High-Performance Rendering',
        video_duration: '21:15',
        videos: [
          { id: 'vid_m4_l6_1', title: 'DOM Tree Architecture & Batch Rendering', url: '/assets/sample-lesson.mp4', duration: '21:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l6_1', title: 'DocumentFragment In-Memory Batching', url: '/assets/course-art/art-06.jpg', caption: 'Batching DOM mutations in memory prior to committing to the live DOM tree.', alt: 'DOM Fragment Workflow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m4_l7',
        title: 'Event Handling, Event Delegation, Propagation (Bubbling & Capturing)',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Master the browser event lifecycle: capturing phase, target phase, bubbling phase, stopPropagation(), preventDefault(), and high-performance event delegation.',
        content: `# Event Handling, Event Delegation, Propagation (Bubbling & Capturing)

## 1. Overview & Learning Objectives
Every user interaction (clicks, keystrokes, form submits, scrolls) generates events in the browser. In this lesson, you will master:
- The 3 phases of event propagation: Capturing (Trickling), Target, and Bubbling.
- \`event.target\` (element clicked) vs \`event.currentTarget\` (element with listener).
- Intercepting behavior with \`event.preventDefault()\` and \`event.stopPropagation()\`.
- The Event Delegation pattern for handling dynamic collections efficiently.

---

## 2. Event Propagation Phases
\`\`\`
1. CAPTURING PHASE: window -> document -> body -> main -> button
2. TARGET PHASE:    button (The actual clicked element)
3. BUBBLING PHASE:  button -> main -> body -> document -> window
\`\`\`

---

## 3. The Event Delegation Architecture
Instead of attaching 500 separate event listeners to 500 individual table rows, attach a single listener to the parent container and leverage event bubbling:

\`\`\`javascript
const table = document.querySelector('#incident-table');

table.addEventListener('click', (event) => {
  // Find closest button ancestor matching delete action
  const deleteBtn = event.target.closest('button.btn-delete');
  if (!deleteBtn) return; // Click occurred elsewhere in table

  const row = deleteBtn.closest('tr');
  const incidentId = row.dataset.incidentId;

  console.log(\`Deleting incident \${incidentId} from registry...\`);
  row.remove();
});
\`\`\`

---

## 4. Key Takeaways
- Event delegation reduces memory usage by eliminating redundant event listener closures.
- Dynamic elements added to the DOM in the future are automatically handled by the parent delegation listener.

## 5. Documentation & References
- [MDN Event Bubbling and Capturing](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Event Delegation & Propagation Lifecycle',
        video_duration: '20:45',
        videos: [
          { id: 'vid_m4_l7_1', title: 'Event Bubbling, Capturing & Delegation', url: '/assets/sample-lesson.mp4', duration: '20:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m4_l7_1', title: 'Event Propagation Wave Diagram', url: '/assets/course-art/art-07.jpg', caption: 'Capturing phase downwards and bubbling phase upwards.', alt: 'Event Propagation Model' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m4',
      title: 'Module 4: JavaScript Programming - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m4_1',
          text: 'What error is thrown when code attempts to access a variable declared with let or const prior to its initialization line?',
          options: [
            { id: 'opt_1', text: 'SyntaxError: Unexpected identifier', is_correct: false },
            { id: 'opt_2', text: 'ReferenceError: Cannot access variable before initialization', is_correct: true },
            { id: 'opt_3', text: 'TypeError: Variable is null', is_correct: false },
            { id: 'opt_4', text: 'RangeError: Maximum call stack exceeded', is_correct: false }
          ],
          explanation: 'Accessing a let or const variable within its Temporal Dead Zone (TDZ) before evaluation throws a ReferenceError.'
        },
        {
          id: 'q_m4_2',
          text: 'What is the output of typeof null according to standard JavaScript specifications?',
          options: [
            { id: 'opt_1', text: '"null"', is_correct: false },
            { id: 'opt_2', text: '"undefined"', is_correct: false },
            { id: 'opt_3', text: '"object"', is_correct: true },
            { id: 'opt_4', text: '"boolean"', is_correct: false }
          ],
          explanation: 'Due to a historical legacy bug in the original 1995 JavaScript implementation, typeof null evaluates to "object".'
        },
        {
          id: 'q_m4_3',
          text: 'What is the difference between null and undefined in JavaScript?',
          options: [
            { id: 'opt_1', text: 'undefined represents uninitialized variable state, while null represents intentional assignment of no value.', is_correct: true },
            { id: 'opt_2', text: 'null is a primitive type, while undefined is an object.', is_correct: false },
            { id: 'opt_3', text: 'undefined throws an error when converted to boolean.', is_correct: false },
            { id: 'opt_4', text: 'There is no difference; they are exact aliases.', is_correct: false }
          ],
          explanation: 'undefined signifies that a variable has been declared but not assigned; null is an explicit assignment indicating the absence of any object value.'
        },
        {
          id: 'q_m4_4',
          text: 'How does the Nullish Coalescing Operator (??) differ from the Logical OR Operator (||)?',
          options: [
            { id: 'opt_1', text: '?? evaluates right-hand operands only when the left-hand operand is null or undefined, preserving 0, false, and empty strings.', is_correct: true },
            { id: 'opt_2', text: '?? only functions on string values.', is_correct: false },
            { id: 'opt_3', text: '|| never evaluates falsy values.', is_correct: false },
            { id: 'opt_4', text: '?? mutates the left-hand variable in place.', is_correct: false }
          ],
          explanation: 'The logical OR operator (||) falls back on any falsy value (including 0, false, and ""), whereas ?? only triggers for nullish values (null or undefined).'
        },
        {
          id: 'q_m4_5',
          text: 'What is a JavaScript Closure?',
          options: [
            { id: 'opt_1', text: 'A syntax construct that closes a database connection socket', is_correct: false },
            { id: 'opt_2', text: 'A function bundled together with references to its surrounding lexical environment', is_correct: true },
            { id: 'opt_3', text: 'A method that prevents an object from being garbage-collected', is_correct: false },
            { id: 'opt_4', text: 'A CSS rule that closes a modal window', is_correct: false }
          ],
          explanation: 'A closure gives a function access to its outer scope even after the outer function has finished executing.'
        },
        {
          id: 'q_m4_6',
          text: 'Why do arrow functions () => {} NOT have their own dynamic this binding?',
          options: [
            { id: 'opt_1', text: 'They capture the this value lexically from the enclosing execution context.', is_correct: true },
            { id: 'opt_2', text: 'Their this always points to the window global object.', is_correct: false },
            { id: 'opt_3', text: 'They cannot be invoked inside class methods.', is_correct: false },
            { id: 'opt_4', text: 'They are restricted to pure mathematical calculations.', is_correct: false }
          ],
          explanation: 'Arrow functions do not establish their own this; they inherit this lexically from the scope in which they were defined.'
        },
        {
          id: 'q_m4_7',
          text: 'Which array method executes a reducer callback function on every element to accumulate an array into a single resulting value?',
          options: [
            { id: 'opt_1', text: '.map()', is_correct: false },
            { id: 'opt_2', text: '.filter()', is_correct: false },
            { id: 'opt_3', text: '.reduce()', is_correct: true },
            { id: 'opt_4', text: '.forEach()', is_correct: false }
          ],
          explanation: 'The reduce() method iterates through an array and passes an accumulator along each step to compute a single aggregated result.'
        },
        {
          id: 'q_m4_8',
          text: 'What unexpected behavior occurs when executing [10, 5, 40, 25, 100].sort() without a custom comparator function?',
          options: [
            { id: 'opt_1', text: 'Elements are sorted alphabetically by their UTF-16 string conversion, resulting in [10, 100, 25, 40, 5].', is_correct: true },
            { id: 'opt_2', text: 'The array elements are reversed.', is_correct: false },
            { id: 'opt_3', text: 'The browser throws a TypeError.', is_correct: false },
            { id: 'opt_4', text: 'Elements are sorted in descending numerical order.', is_correct: false }
          ],
          explanation: 'Default Array.prototype.sort converts elements into strings and sorts by UTF-16 code units; numerical sorting requires (a, b) => a - b.'
        },
        {
          id: 'q_m4_9',
          text: 'What is the primary architectural purpose of a DocumentFragment when building dynamic lists in the DOM?',
          options: [
            { id: 'opt_1', text: 'To encrypt DOM elements before rendering', is_correct: false },
            { id: 'opt_2', text: 'To assemble nodes in an in-memory lightweight container and append them with a single reflow/repaint', is_correct: true },
            { id: 'opt_3', text: 'To store DOM nodes permanently inside LocalStorage', is_correct: false },
            { id: 'opt_4', text: 'To bypass browser security Content Security Policies', is_correct: false }
          ],
          explanation: 'DocumentFragment acts as a lightweight in-memory container. Appending it to the DOM transfers all its child nodes in one single layout reflow.'
        },
        {
          id: 'q_m4_10',
          text: 'In the Event Delegation pattern, why do we attach a single listener to a parent element instead of multiple child items?',
          options: [
            { id: 'opt_1', text: 'To capitalize on event bubbling, reducing memory consumption and automatically supporting dynamically added children.', is_correct: true },
            { id: 'opt_2', text: 'Because child elements cannot capture mouse click events.', is_correct: false },
            { id: 'opt_3', text: 'To disable event capturing entirely.', is_correct: false },
            { id: 'opt_4', text: 'To prevent users from selecting text.', is_correct: false }
          ],
          explanation: 'Event delegation leverages event bubbling to handle interactions on children with a single parent handler, conserving memory and handling new DOM nodes.'
        },
        {
          id: 'q_m4_11',
          text: 'What is the crucial difference between event.target and event.currentTarget inside an event listener callback?',
          options: [
            { id: 'opt_1', text: 'event.target is the element that originated the event; event.currentTarget is the element to which the event handler is attached.', is_correct: true },
            { id: 'opt_2', text: 'event.target is always the document body.', is_correct: false },
            { id: 'opt_3', text: 'event.currentTarget represents the mouse coordinates.', is_correct: false },
            { id: 'opt_4', text: 'They are identical references at all times.', is_correct: false }
          ],
          explanation: 'event.target is the innermost element that was clicked or triggered; event.currentTarget is the element currently executing the event listener.'
        },
        {
          id: 'q_m4_12',
          text: 'What does event.preventDefault() accomplish when triggered during an HTML form submit event?',
          options: [
            { id: 'opt_1', text: 'It clears all input fields in the form.', is_correct: false },
            { id: 'opt_2', text: 'It stops the browser from executing its default action of refreshing the page and submitting a synchronous GET/POST request.', is_correct: true },
            { id: 'opt_3', text: 'It halts event propagation up the DOM tree.', is_correct: false },
            { id: 'opt_4', text: 'It logs out the active user session.', is_correct: false }
          ],
          explanation: 'preventDefault() stops the default browser action (such as full page navigation or reloading on form submit).'
        },
        {
          id: 'q_m4_13',
          text: 'Which method creates a new function that, when called, has its this keyword permanently set to the provided value?',
          options: [
            { id: 'opt_1', text: 'Function.prototype.call()', is_correct: false },
            { id: 'opt_2', text: 'Function.prototype.apply()', is_correct: false },
            { id: 'opt_3', text: 'Function.prototype.bind()', is_correct: true },
            { id: 'opt_4', text: 'Object.assign()', is_correct: false }
          ],
          explanation: 'bind() returns a new function with this locked to the specified object, whereas call() and apply() invoke the function immediately.'
        },
        {
          id: 'q_m4_14',
          text: 'How do you declare a truly private class field in modern ECMAScript class syntax?',
          options: [
            { id: 'opt_1', text: 'By prefixing the field name with an underscore, e.g. _apiKey', is_correct: false },
            { id: 'opt_2', text: 'By prefixing the field name with a hash symbol, e.g. #apiKey', is_correct: true },
            { id: 'opt_3', text: 'By declaring it with the private keyword, e.g. private apiKey', is_correct: false },
            { id: 'opt_4', text: 'By wrapping it inside an Object.freeze() call', is_correct: false }
          ],
          explanation: 'Private class fields are declared with a hash prefix (#field) and cannot be accessed or mutated from outside the class body.'
        },
        {
          id: 'q_m4_15',
          text: 'What is the return value of [1, 2, 3, 4].filter(x => x > 2)?',
          options: [
            { id: 'opt_1', text: '[3, 4]', is_correct: true },
            { id: 'opt_2', text: '[1, 2]', is_correct: false },
            { id: 'opt_3', text: 'true', is_correct: false },
            { id: 'opt_4', text: '4', is_correct: false }
          ],
          explanation: 'filter() creates a shallow copy of a portion of a given array, filtered down to just the elements that pass the predicate test (elements > 2 are 3 and 4).'
        },
        {
          id: 'q_m4_16',
          text: 'Which DOM property should be used to insert dynamic plain text safely into an element without risking Cross-Site Scripting (XSS)?',
          options: [
            { id: 'opt_1', text: 'element.innerHTML', is_correct: false },
            { id: 'opt_2', text: 'element.textContent', is_correct: true },
            { id: 'opt_3', text: 'element.outerHTML', is_correct: false },
            { id: 'opt_4', text: 'document.write()', is_correct: false }
          ],
          explanation: 'textContent sets text directly without HTML parsing, automatically escaping HTML tags and preventing script injection.'
        },
        {
          id: 'q_m4_17',
          text: 'What will be logged by console.log(typeof NaN)?',
          options: [
            { id: 'opt_1', text: '"number"', is_correct: true },
            { id: 'opt_2', text: '"NaN"', is_correct: false },
            { id: 'opt_3', text: '"undefined"', is_correct: false },
            { id: 'opt_4', text: '"object"', is_correct: false }
          ],
          explanation: 'NaN stands for "Not-a-Number", but its data type according to IEEE 754 floating-point specifications is number.'
        },
        {
          id: 'q_m4_18',
          text: 'Which array method checks if AT LEAST ONE element in an array passes the condition implemented by the provided callback function?',
          options: [
            { id: 'opt_1', text: 'Array.prototype.every()', is_correct: false },
            { id: 'opt_2', text: 'Array.prototype.some()', is_correct: true },
            { id: 'opt_3', text: 'Array.prototype.find()', is_correct: false },
            { id: 'opt_4', text: 'Array.prototype.includes()', is_correct: false }
          ],
          explanation: 'some() returns true if it finds at least one element for which the callback returns true, whereas every() requires all elements to pass.'
        },
        {
          id: 'q_m4_19',
          text: 'What occurs during the capturing phase of event propagation?',
          options: [
            { id: 'opt_1', text: 'The event propagates upwards from the target element to the window.', is_correct: false },
            { id: 'opt_2', text: 'The event travels downwards from the window and document ancestors towards the target element.', is_correct: true },
            { id: 'opt_3', text: 'The event is canceled automatically.', is_correct: false },
            { id: 'opt_4', text: 'The browser captures a screenshot of the viewport.', is_correct: false }
          ],
          explanation: 'In the capturing (trickling) phase, the event descends from the window through the ancestor tree to the target element.'
        },
        {
          id: 'q_m4_20',
          text: 'What method on element.classList toggles the presence of a class, adding it if absent and removing it if present?',
          options: [
            { id: 'opt_1', text: 'element.classList.switch("active")', is_correct: false },
            { id: 'opt_2', text: 'element.classList.toggle("active")', is_correct: true },
            { id: 'opt_3', text: 'element.classList.flip("active")', is_correct: false },
            { id: 'opt_4', text: 'element.classList.update("active")', is_correct: false }
          ],
          explanation: 'element.classList.toggle(className) adds the class if it is not present, or removes it if it is, returning a boolean.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 5: Advanced JavaScript & ES6+ (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_5',
    title: 'Module 5: Advanced JavaScript & ES6+',
    description: 'Master asynchronous JavaScript architectures: the Event Loop, Call Stack, Microtask queue, Promises, async/await concurrency, ES Modules, and browser Web Storage APIs.',
    order: 5,
    assignment: {
      id: 'asg_m5',
      title: 'Practical Assignment: Multi-Source Asynchronous Cyber Threat Intelligence Dashboard',
      objective: 'Build an asynchronous telemetry pipeline consuming multiple REST API endpoints in parallel using async/await, Promise.allSettled, and defensive error handling.',
      requirements: [
        'Fetch remote JSON threat feeds concurrently from at least two distinct public endpoints.',
        'Use Promise.allSettled() so that failure of a single endpoint does not crash the entire telemetry view.',
        'Implement an exponential backoff retry wrapper function for intermittent network failures.',
        'Cache parsed telemetry in window.sessionStorage with timestamp-based time-to-live (TTL) invalidation.',
        'Structure code cleanly using ES Modules (import / export).'
      ],
      instructions: '1. Create api.js and dashboard.js. 2. Implement async fetch with backoff retry. 3. Cache results in sessionStorage. 4. Submit code and test report.',
      expected_outcome: 'A resilient, asynchronous intelligence aggregator providing graceful fallbacks and cache management.'
    },
    lessons: [
      {
        id: 'les_m5_l1',
        title: 'Destructuring, Rest/Spread Operators, and Modern ES6+ Syntactic Sugar',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Explore object and array destructuring, default values, nested aliasing, Rest/Spread operators (...), object property shorthand, and structuredClone() for deep copies.',
        content: `# Destructuring, Rest/Spread Operators, and Modern ES6+ Syntactic Sugar

## 1. Overview & Learning Objectives
Modern ECMAScript provides expressive syntax for manipulating objects and arrays. In this lesson, you will master:
- Object and array destructuring with default values and property renaming.
- The Rest operator (\`...\`) for gathering elements vs the Spread operator (\`...\`) for unpacking elements.
- Object property shorthand and computed property names (\`[dynamicKey]: value\`).
- Deep cloning using native \`structuredClone()\` vs shallow spread copying.

---

## 2. Advanced Destructuring & Property Renaming
\`\`\`javascript
const telemetryPayload = {
  id: 'EVT-904',
  source_ip: '198.51.100.77',
  metadata: {
    threat_actor: 'APT29',
    confidence_score: 94
  }
};

// Destructuring with renaming (aliasing) and default value
const {
  source_ip: sourceIp,
  metadata: { threat_actor: actor, confidence_score: confidence = 50 },
  severity = 'HIGH'
} = telemetryPayload;

console.log(sourceIp);   // "198.51.100.77"
console.log(actor);      // "APT29"
console.log(confidence); // 94
console.log(severity);   // "HIGH" (Fallback default applied)
\`\`\`

---

## 3. Shallow Spread vs structuredClone()
The spread operator performs a **shallow copy**; nested objects still share memory references! Use native \`structuredClone()\` for true deep copying:

\`\`\`javascript
const original = { name: 'Firewall', rules: ['DROP', 'LOG'] };

// Shallow copy hazard:
const shallow = { ...original };
shallow.rules.push('ALERT');
console.log(original.rules); // ['DROP', 'LOG', 'ALERT'] (Mutated!)

// True Deep Copy:
const deep = structuredClone(original);
deep.rules.push('ISOLATE');
console.log(original.rules); // ['DROP', 'LOG', 'ALERT'] (Protected!)
\`\`\`

---

## 4. Key Takeaways
- Use \`structuredClone()\` when deep cloning objects containing arrays, Dates, or nested sub-objects.
- Rest parameters must always be the final parameter in a function signature.

## 5. Documentation & References
- [MDN Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'ES6+ Destructuring, Spread/Rest & structuredClone()',
        video_duration: '20:15',
        videos: [
          { id: 'vid_m5_l1_1', title: 'Modern ES6+ Syntax & Deep Cloning', url: '/assets/sample-lesson.mp4', duration: '20:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l1_1', title: 'Shallow Spread vs Deep structuredClone', url: '/assets/course-art/art-08.jpg', caption: 'Memory reference sharing in shallow copies vs separate allocation in deep clones.', alt: 'Memory Copy Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m5_l2',
        title: 'Asynchronous JavaScript: Event Loop, Call Stack, Microtasks & Macrotasks',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Demystify the JavaScript concurrency model: the Call Stack, Web APIs, Microtask Queue (Promises, queueMicrotask), and Task Queue (setTimeout, setInterval, I/O).',
        content: `# Asynchronous JavaScript: Event Loop, Call Stack, Microtasks & Macrotasks

## 1. Overview & Learning Objectives
JavaScript is a single-threaded runtime with a non-blocking event-driven concurrency model. In this lesson, you will master:
- The Call Stack (LIFO: Last In, First Out).
- Web APIs (Timer threads, Network fetch, DOM events).
- The **Microtask Queue** (\`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`).
- The **Task Queue / Macrotask Queue** (\`setTimeout\`, \`setInterval\`, \`setImmediate\`).
- The Event Loop execution prioritization rules.

---

## 2. Event Loop Execution Order
The Event Loop continuously checks:
1. Is the Call Stack empty?
2. If YES, drain **ALL** jobs in the **Microtask Queue** until empty before touching any Macrotask!
3. Execute **ONE** Macrotask from the Task Queue.
4. Render UI updates if needed.
5. Repeat!

\`\`\`javascript
console.log('1. Synchronous');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Microtask (Promise)');
}).then(() => {
  console.log('3. Microtask Chained');
});

console.log('1.5. Synchronous End');

// Output order:
// 1. Synchronous
// 1.5. Synchronous End
// 2. Microtask (Promise)
// 3. Microtask Chained
// 4. Macrotask (setTimeout)
\`\`\`

---

## 3. Key Takeaways
- Microtasks always drain completely before the next Macrotask is processed.
- Heavy computational loops on the Call Stack block the main thread and freeze the UI.

## 4. Documentation & References
- [MDN In Depth: Microtasks and the JavaScript Runtime](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'The JavaScript Event Loop, Microtasks & Concurrency',
        video_duration: '24:00',
        videos: [
          { id: 'vid_m5_l2_1', title: 'Event Loop, Microtasks & Call Stack', url: '/assets/sample-lesson.mp4', duration: '24:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l2_1', title: 'JavaScript Concurrency Model', url: '/assets/course-art/art-09.jpg', caption: 'Call Stack, Web APIs, Microtask Queue, and Task Queue loop.', alt: 'Event Loop Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m5_l3',
        title: 'Promises in Depth: Chaining, Error Handling & Promise Combinators (all, race, allSettled)',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore Promise lifecycle states (pending, fulfilled, rejected), promise chaining, catch error propagation, and combinators: Promise.all, Promise.allSettled, Promise.race, and Promise.any.',
        content: `# Promises in Depth: Chaining, Error Handling & Promise Combinators (all, race, allSettled)

## 1. Overview & Learning Objectives
A Promise represents an eventual completion (or failure) of an asynchronous operation and its resulting value. In this lesson, you will master:
- The 3 Promise states: \`pending\`, \`fulfilled\`, and \`rejected\`.
- Clean chaining with \`.then()\`, \`.catch()\`, and \`.finally()\`.
- Handling multi-request concurrency with Promise combinators:
  - \`Promise.all()\`: Fail-fast (all must succeed).
  - \`Promise.allSettled()\`: Complete resilience (returns status of every promise).
  - \`Promise.race()\`: Resolves or rejects as soon as the first promise settles.
  - \`Promise.any()\`: Resolves as soon as the first promise fulfills.

---

## 2. Promise Combinator Comparison
\`\`\`javascript
const fetchServerA = fetch('/api/node-a').then(r => r.json());
const fetchServerB = fetch('/api/node-b').then(r => r.json());

// 1. Promise.all: Fails completely if ANY single request rejects!
try {
  const [dataA, dataB] = await Promise.all([fetchServerA, fetchServerB]);
} catch (err) {
  console.error('At least one server failed', err);
}

// 2. Promise.allSettled: Never rejects; reports individual status
const results = await Promise.allSettled([fetchServerA, fetchServerB]);
results.forEach((res, idx) => {
  if (res.status === 'fulfilled') {
    console.log(\`Node \${idx} succeeded with data:\`, res.value);
  } else {
    console.warn(\`Node \${idx} failed with reason:\`, res.reason);
  }
});
\`\`\`

---

## 3. Key Takeaways
- Use \`Promise.allSettled()\` when fetching independent data feeds so that one failure does not break the entire application.
- Always include a \`.catch()\` handler or wrap promises in \`try/catch\` to prevent unhandled promise rejections.

## 4. Documentation & References
- [MDN Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Promise Architecture & Concurrency Combinators',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m5_l3_1', title: 'Promises, allSettled & Error Handling', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l3_1', title: 'Promise State Lifecycle Diagram', url: '/assets/course-art/art-10.jpg', caption: 'Pending -> Fulfilled / Rejected state transitions.', alt: 'Promise Lifecycle Model' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m5_l4',
        title: 'async / await Syntax, Concurrency Patterns & Defensive Error Handling',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Write readable asynchronous code with async/await, avoid sequential waterfall anti-patterns, manage parallel execution, and implement robust retry mechanisms.',
        content: `# async / await Syntax, Concurrency Patterns & Defensive Error Handling

## 1. Overview & Learning Objectives
\`async\` / \`await\` is syntactical sugar built over Promises and Generators, enabling asynchronous code to read linearly like synchronous code. In this lesson, you will master:
- The \`async\` function return semantics (always returns a Promise).
- Awaiting Promises and pausing execution within the async scope.
- Avoiding the **Async Waterfall Anti-Pattern** (accidental serial requests).
- Implementing defensive retry loops with exponential backoff.

---

## 2. The Async Waterfall Anti-Pattern vs Parallel Execution
\`\`\`javascript
// ANTI-PATTERN: Serial Waterfall (Takes 1000ms + 1000ms = 2000ms)
async function fetchSerialTelemetry() {
  const users = await fetchUsers();     // Takes 1000ms
  const incidents = await fetchAlerts(); // Waits until users finishes! (1000ms)
  return { users, incidents };
}

// PRODUCTION PATTERN: Parallel Concurrency (Takes only 1000ms total!)
async function fetchParallelTelemetry() {
  // Fire both requests concurrently in parallel
  const usersPromise = fetchUsers();
  const alertsPromise = fetchAlerts();

  // Await both promises simultaneously
  const [users, incidents] = await Promise.all([usersPromise, alertsPromise]);
  return { users, incidents };
}
\`\`\`

---

## 3. Exponential Backoff Retry Utility
\`\`\`javascript
async function fetchWithRetry(url, maxRetries = 3, baseDelay = 500) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return await response.json();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(\`Attempt \${attempt} failed. Retrying in \${delay}ms...\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
\`\`\`

---

## 4. Key Takeaways
- An \`async\` function always returns a Promise; values returned are wrapped in \`Promise.resolve()\`.
- Avoid awaiting independent promises sequentially; fire them in parallel and await them with \`Promise.all\`.

## 5. Documentation & References
- [MDN async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'async/await Best Practices & Retry Concurrency',
        video_duration: '21:30',
        videos: [
          { id: 'vid_m5_l4_1', title: 'async / await Patterns & Error Handling', url: '/assets/sample-lesson.mp4', duration: '21:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l4_1', title: 'Serial Waterfall vs Parallel Execution', url: '/assets/course-art/art-01.jpg', caption: 'Latency comparison of sequential await versus Promise.all parallelization.', alt: 'Waterfall vs Parallel' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m5_l5',
        title: 'JavaScript Modules: ES Modules (import/export) vs CommonJS (require)',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Understand JavaScript modularity: ES Modules (ESM) static syntax, named vs default exports, dynamic imports (import()), and differences from Node.js CommonJS (require, module.exports).',
        content: `# JavaScript Modules: ES Modules (import/export) vs CommonJS (require)

## 1. Overview & Learning Objectives
Modular code isolates functionality into maintainable, reusable files. In this lesson, you will master:
- ES Modules (ESM): \`import\` and \`export\` (named, default, and aggregate exports).
- Node.js legacy CommonJS: \`require()\` and \`module.exports\`.
- Static analysis and Tree-Shaking benefits of ESM.
- Code-splitting with dynamic imports: \`import('./module.js')\`.

---

## 2. ESM Named vs Default Exports
\`\`\`javascript
// telemetryUtils.js
export const API_VERSION = 'v2.1'; // Named Export

export function formatIp(ip) {       // Named Export
  return ip.trim();
}

export default class TelemetryClient { // Default Export
  connect() { return 'Connected'; }
}
\`\`\`

Importing in another module:
\`\`\`javascript
// main.js
import TelemetryClient, { API_VERSION, formatIp } from './telemetryUtils.js';

const client = new TelemetryClient();
console.log(API_VERSION);
\`\`\`

---

## 3. Dynamic Imports for Code-Splitting
Dynamic imports load JavaScript files asynchronously on demand:

\`\`\`javascript
button.addEventListener('click', async () => {
  // Module is downloaded only when user clicks the button!
  const { generatePdfReport } = await import('./heavyReportGenerator.js');
  generatePdfReport();
});
\`\`\`

---

## 4. Key Takeaways
- ES Modules are evaluated statically at parse time, enabling modern bundlers to tree-shake unused code.
- Always prefer named exports over default exports for consistent refactoring and autocomplete.

## 5. Documentation & References
- [MDN JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'ES Modules Architecture & Dynamic Code-Splitting',
        video_duration: '18:40',
        videos: [
          { id: 'vid_m5_l5_1', title: 'ES Modules vs CommonJS & Tree-Shaking', url: '/assets/sample-lesson.mp4', duration: '18:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l5_1', title: 'ES Module Tree Dependency Graph', url: '/assets/course-art/art-02.jpg', caption: 'Static import dependency tree and unused code tree-shaking.', alt: 'Module Tree Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m5_l6',
        title: 'Web APIs: Fetch API, Storage (localStorage, sessionStorage, IndexedDB), and Timers',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore native Web APIs: HTTP requests with Fetch API and AbortController, client storage limits and security, IndexedDB for binary storage, and requestAnimationFrame.',
        content: `# Web APIs: Fetch API, Storage (localStorage, sessionStorage, IndexedDB), and Timers

## 1. Overview & Learning Objectives
Browsers provide rich Web APIs extending JavaScript's core capabilities. In this lesson, you will master:
- The \`fetch()\` API with custom headers, JSON serialization, and cancellation via \`AbortController\`.
- Client storage comparison: \`localStorage\` vs \`sessionStorage\` vs \`IndexedDB\` vs Cookies.
- Animation timing: \`requestAnimationFrame()\` vs \`setInterval()\`.

---

## 2. Cancelling Fetch Requests with AbortController
\`\`\`javascript
const controller = new AbortController();
const { signal } = controller;

// Abort request if it takes longer than 5 seconds
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('/api/live-telemetry', { signal });
  clearTimeout(timeoutId);
  const data = await response.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.warn('Network request timed out and was aborted.');
  } else {
    console.error('Fetch failed:', err);
  }
}
\`\`\`

---

## 3. Storage Hierarchy Comparison
| Storage Mechanism | Capacity | Persistence | Scope |
|---|---|---|---|
| **localStorage** | ~5MB | Indefinite (until cleared) | Origin-wide across tabs |
| **sessionStorage** | ~5MB | Single tab session | Specific browser tab |
| **IndexedDB** | Hundreds of MBs | Indefinite | Origin-wide, structured / binary |
| **Cookies** | 4KB | Configurable expiration | Sent with every HTTP request |

---

## 4. Key Takeaways
- Never store sensitive JWT tokens or passwords in \`localStorage\` due to XSS vulnerability.
- Always use \`AbortController\` to prevent memory leaks and zombie network requests when views unmount.

## 5. Documentation & References
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Fetch API, AbortController & Client Storage Architecture',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m5_l6_1', title: 'Fetch API & Storage Deep Dive', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m5_l6_1', title: 'Client Storage Comparison Architecture', url: '/assets/course-art/art-03.jpg', caption: 'Capacity and security models of localStorage, sessionStorage, and IndexedDB.', alt: 'Storage Comparison' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m5',
      title: 'Module 5: Advanced JavaScript & ES6+ - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m5_1',
          text: 'In the JavaScript Event Loop, which queue is prioritized and completely drained before the next Macrotask is executed?',
          options: [
            { id: 'opt_1', text: 'The Microtask Queue (Promises, queueMicrotask)', is_correct: true },
            { id: 'opt_2', text: 'The Task Queue (setTimeout, setInterval)', is_correct: false },
            { id: 'opt_3', text: 'The RequestAnimationFrame rendering queue', is_correct: false },
            { id: 'opt_4', text: 'The IndexedDB storage queue', is_correct: false }
          ],
          explanation: 'The event loop processes all pending jobs in the microtask queue to completion before picking the next macrotask from the task queue.'
        },
        {
          id: 'q_m5_2',
          text: 'What will be the output order of: console.log("A"); setTimeout(() => console.log("B"), 0); Promise.resolve().then(() => console.log("C")); console.log("D"); ?',
          options: [
            { id: 'opt_1', text: 'A, D, C, B', is_correct: true },
            { id: 'opt_2', text: 'A, B, C, D', is_correct: false },
            { id: 'opt_3', text: 'A, C, D, B', is_correct: false },
            { id: 'opt_4', text: 'A, D, B, C', is_correct: false }
          ],
          explanation: 'A and D execute synchronously. Promise microtask C executes immediately after synchronous code. setTimeout macrotask B runs in the next loop tick.'
        },
        {
          id: 'q_m5_3',
          text: 'How does Promise.allSettled() differ fundamentally from Promise.all()?',
          options: [
            { id: 'opt_1', text: 'Promise.allSettled() waits for all promises to settle and never rejects, returning an array of status objects.', is_correct: true },
            { id: 'opt_2', text: 'Promise.allSettled() rejects if any single promise rejects.', is_correct: false },
            { id: 'opt_3', text: 'Promise.allSettled() only executes on node.js backends.', is_correct: false },
            { id: 'opt_4', text: 'Promise.allSettled() executes promises sequentially instead of in parallel.', is_correct: false }
          ],
          explanation: 'Promise.all fails fast on the first rejection. Promise.allSettled waits for all input promises to settle, returning { status, value/reason } for each.'
        },
        {
          id: 'q_m5_4',
          text: 'What is the modern native browser API method used to perform a true deep copy of a nested JavaScript object?',
          options: [
            { id: 'opt_1', text: 'Object.assign({}, original)', is_correct: false },
            { id: 'opt_2', text: '{ ...original }', is_correct: false },
            { id: 'opt_3', text: 'structuredClone(original)', is_correct: true },
            { id: 'opt_4', text: 'Object.freeze(original)', is_correct: false }
          ],
          explanation: 'structuredClone() is the standard native deep-cloning algorithm, accurately copying nested objects, arrays, Dates, and Maps.'
        },
        {
          id: 'q_m5_5',
          text: 'What object is used in conjunction with the fetch() API to cancel an in-flight network request after a timeout period?',
          options: [
            { id: 'opt_1', text: 'AbortController', is_correct: true },
            { id: 'opt_2', text: 'CancelToken', is_correct: false },
            { id: 'opt_3', text: 'NetworkKiller', is_correct: false },
            { id: 'opt_4', text: 'TimeoutInterceptor', is_correct: false }
          ],
          explanation: 'AbortController provides an AbortSignal that can be passed to fetch(url, { signal }) to cancel requests via controller.abort().'
        },
        {
          id: 'q_m5_6',
          text: 'What is the primary vulnerability of storing sensitive authentication tokens (like JWTs) in window.localStorage?',
          options: [
            { id: 'opt_1', text: 'They are vulnerable to extraction by any Cross-Site Scripting (XSS) script running on the page.', is_correct: true },
            { id: 'opt_2', text: 'They are automatically deleted when the user closes the tab.', is_correct: false },
            { id: 'opt_3', text: 'They cause the browser GPU to overheat.', is_correct: false },
            { id: 'opt_4', text: 'They cannot be transmitted over HTTPS.', is_correct: false }
          ],
          explanation: 'LocalStorage is accessible to all client-side JavaScript in the same origin. Any XSS vulnerability allows malicious scripts to steal stored tokens.'
        },
        {
          id: 'q_m5_7',
          text: 'What keyword enables asynchronous dynamic loading of ES Modules on demand inside user event callbacks?',
          options: [
            { id: 'opt_1', text: 'require()', is_correct: false },
            { id: 'opt_2', text: 'import("./module.js")', is_correct: true },
            { id: 'opt_3', text: 'loadModule()', is_correct: false },
            { id: 'opt_4', text: 'fetchModule()', is_correct: false }
          ],
          explanation: 'The dynamic import() syntax returns a Promise resolving to the module namespace, enabling code-splitting.'
        },
        {
          id: 'q_m5_8',
          text: 'What will an async function return if its return statement specifies a primitive number value, such as return 42;?',
          options: [
            { id: 'opt_1', text: 'The raw primitive number 42', is_correct: false },
            { id: 'opt_2', text: 'A Promise resolving to 42', is_correct: true },
            { id: 'opt_3', text: 'undefined', is_correct: false },
            { id: 'opt_4', text: 'A Generator iterator', is_correct: false }
          ],
          explanation: 'Async functions always wrap their return values in a Promise (e.g. Promise.resolve(42)).'
        },
        {
          id: 'q_m5_9',
          text: 'Which Promise combinator resolves as soon as the FASTEST promise settles (whether it fulfills or rejects)?',
          options: [
            { id: 'opt_1', text: 'Promise.race()', is_correct: true },
            { id: 'opt_2', text: 'Promise.any()', is_correct: false },
            { id: 'opt_3', text: 'Promise.all()', is_correct: false },
            { id: 'opt_4', text: 'Promise.allSettled()', is_correct: false }
          ],
          explanation: 'Promise.race resolves or rejects as soon as any of the input promises settles (completes or fails).'
        },
        {
          id: 'q_m5_10',
          text: 'What is the typical storage capacity limit for window.localStorage per web origin in modern browsers?',
          options: [
            { id: 'opt_1', text: '4 Kilobytes', is_correct: false },
            { id: 'opt_2', text: 'Approximately 5 Megabytes', is_correct: true },
            { id: 'opt_3', text: '1 Gigabyte', is_correct: false },
            { id: 'opt_4', text: 'Unlimited', is_correct: false }
          ],
          explanation: 'Browsers typically allocate approximately 5MB of synchronous storage for localStorage per origin.'
        },
        {
          id: 'q_m5_11',
          text: 'In destructuring syntax, how do you provide an alias (rename) for a property while extracting it from an object?',
          options: [
            { id: 'opt_1', text: 'const { oldName as newName } = obj;', is_correct: false },
            { id: 'opt_2', text: 'const { oldName: newName } = obj;', is_correct: true },
            { id: 'opt_3', text: 'const { oldName -> newName } = obj;', is_correct: false },
            { id: 'opt_4', text: 'const { newName = oldName } = obj;', is_correct: false }
          ],
          explanation: 'In object destructuring, property aliasing is written as { originalKey: aliasName } = object.'
        },
        {
          id: 'q_m5_12',
          text: 'How can multiple asynchronous fetch calls be initiated simultaneously in parallel rather than sequentially waiting for each to complete?',
          options: [
            { id: 'opt_1', text: 'By triggering the promises before awaiting them, e.g. with Promise.all([p1, p2])', is_correct: true },
            { id: 'opt_2', text: 'By writing await fetch1(); await fetch2();', is_correct: false },
            { id: 'opt_3', text: 'By wrapping them inside a while(true) loop', is_correct: false },
            { id: 'opt_4', text: 'By declaring the function with the sync keyword', is_correct: false }
          ],
          explanation: 'Calling fetch() initiates the network request immediately. Awaiting Promise.all([p1, p2]) allows them to run concurrently in parallel.'
        },
        {
          id: 'q_m5_13',
          text: 'What is the lifetime of data stored inside window.sessionStorage?',
          options: [
            { id: 'opt_1', text: 'Data persists indefinitely until manually cleared by code or user.', is_correct: false },
            { id: 'opt_2', text: 'Data persists only for the duration of the specific browser tab session and is cleared when the tab is closed.', is_correct: true },
            { id: 'opt_3', text: 'Data expires after exactly 60 seconds.', is_correct: false },
            { id: 'opt_4', text: 'Data is deleted whenever a network request fails.', is_correct: false }
          ],
          explanation: 'sessionStorage data is scoped to the lifetime of the browser tab. Closing the tab purges the data.'
        },
        {
          id: 'q_m5_14',
          text: 'What happens if code invokes JSON.parse("invalid-json")?',
          options: [
            { id: 'opt_1', text: 'It returns null silently.', is_correct: false },
            { id: 'opt_2', text: 'It throws a SyntaxError exception that must be caught with try/catch.', is_correct: true },
            { id: 'opt_3', text: 'It returns an empty object {}.', is_correct: false },
            { id: 'opt_4', text: 'It converts the invalid string into a valid JSON schema.', is_correct: false }
          ],
          explanation: 'JSON.parse() throws a SyntaxError if the string to parse is not valid JSON; production code should wrap it in try/catch.'
        },
        {
          id: 'q_m5_15',
          text: 'What does the finally() block on a Promise chain guarantee?',
          options: [
            { id: 'opt_1', text: 'It executes only if the promise fulfilled successfully.', is_correct: false },
            { id: 'opt_2', text: 'It executes regardless of whether the promise fulfilled or rejected, ideal for cleanup logic.', is_correct: true },
            { id: 'opt_3', text: 'It automatically retries rejected promises.', is_correct: false },
            { id: 'opt_4', text: 'It terminates the JavaScript runtime engine.', is_correct: false }
          ],
          explanation: 'Promise.prototype.finally() runs when the promise is settled (either fulfilled or rejected), making it ideal for clearing loaders or resetting state.'
        },
        {
          id: 'q_m5_16',
          text: 'Which Promise combinator resolves when the FIRST promise fulfills, ignoring rejections unless ALL input promises reject?',
          options: [
            { id: 'opt_1', text: 'Promise.any()', is_correct: true },
            { id: 'opt_2', text: 'Promise.race()', is_correct: false },
            { id: 'opt_3', text: 'Promise.all()', is_correct: false },
            { id: 'opt_4', text: 'Promise.resolve()', is_correct: false }
          ],
          explanation: 'Promise.any() takes an iterable of promises and returns a promise that resolves as soon as any of the promises fulfills, ignoring rejections.'
        },
        {
          id: 'q_m5_17',
          text: 'Why does Tree-Shaking work reliably with ES Modules (import/export) but struggle with CommonJS (require)?',
          options: [
            { id: 'opt_1', text: 'ES Module imports and exports are static and can be analyzed at compile time before execution.', is_correct: true },
            { id: 'opt_2', text: 'CommonJS modules are encrypted.', is_correct: false },
            { id: 'opt_3', text: 'ES Modules cannot contain conditional statements.', is_correct: false },
            { id: 'opt_4', text: 'Tree-shaking is a CSS optimization technique only.', is_correct: false }
          ],
          explanation: 'ESM syntax is static: imports and exports are determined before code runs. CommonJS require() is dynamic at runtime, preventing static dead-code elimination.'
        },
        {
          id: 'q_m5_18',
          text: 'What parameter position is required for the Rest parameter (...rest) in a JavaScript function declaration?',
          options: [
            { id: 'opt_1', text: 'It must be the first parameter.', is_correct: false },
            { id: 'opt_2', text: 'It must be the last parameter in the parameter list.', is_correct: true },
            { id: 'opt_3', text: 'It can be placed anywhere between parameters.', is_correct: false },
            { id: 'opt_4', text: 'It can only be used in arrow functions.', is_correct: false }
          ],
          explanation: 'A function declaration can have only one rest parameter, and it must be the last parameter in the function signature.'
        },
        {
          id: 'q_m5_19',
          text: 'What API is recommended for smooth, 60fps JavaScript-driven visual animations synced to the display refresh rate?',
          options: [
            { id: 'opt_1', text: 'window.setInterval()', is_correct: false },
            { id: 'opt_2', text: 'window.requestAnimationFrame()', is_correct: true },
            { id: 'opt_3', text: 'window.setTimeout()', is_correct: false },
            { id: 'opt_4', text: 'queueMicrotask()', is_correct: false }
          ],
          explanation: 'requestAnimationFrame tells the browser that you wish to perform an animation and requests that the browser schedule a repaint before the next frame.'
        },
        {
          id: 'q_m5_20',
          text: 'What is the consequence of omitting an error catch handler on an asynchronous Promise that subsequently rejects?',
          options: [
            { id: 'opt_1', text: 'The browser ignores it without logging anything.', is_correct: false },
            { id: 'opt_2', text: 'An "UnhandledPromiseRejection" event is dispatched and logged as an uncaught error in the console.', is_correct: true },
            { id: 'opt_3', text: 'The operating system restarts the computer.', is_correct: false },
            { id: 'opt_4', text: 'The promise automatically resolves to false.', is_correct: false }
          ],
          explanation: 'Unhandled promise rejections trigger the unhandledrejection event and log an error to the browser console or crash Node.js processes.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 6: React.js Development (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_6',
    title: 'Module 6: React.js Development',
    description: 'Master modern React 18+: Component-driven UI architecture, Virtual DOM reconciliation, useState, useEffect side-effect synchronization, custom hooks, Context API, and React Router v6.',
    order: 6,
    assignment: {
      id: 'asg_m6',
      title: 'Practical Assignment: Component-Driven Threat Operations Console with Context API',
      objective: 'Build a modular React application featuring reusable UI components, global state management via Context API, client-side routing, and real-time filter controls.',
      requirements: [
        'Deconstruct UI into reusable functional components (Card, Badge, Table, Modal).',
        'Implement global authentication and theme state using React.createContext() and custom useAuth() hooks.',
        'Use useEffect with clean teardown cleanup functions to subscribe to data feeds without memory leaks.',
        'Configure client-side routing using React Router v6 with protected private routes.',
        'Optimize performance using useMemo for expensive list filtering and useCallback for handler references.'
      ],
      instructions: '1. Scaffold with Vite. 2. Implement Context provider. 3. Build component hierarchy. 4. Submit Git repository and build bundle.',
      expected_outcome: 'A production-grade React SPA demonstrating clean hook usage, zero prop drilling, and optimal render lifecycles.'
    },
    lessons: [
      {
        id: 'les_m6_l1',
        title: 'Introduction to React, Virtual DOM, JSX & Component-Driven Architecture',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore React design philosophy: declarative UI programming, Virtual DOM reconciliation (Fiber diffing), JSX syntax compilation, and atomic component architecture.',
        content: `# Introduction to React, Virtual DOM, JSX & Component-Driven Architecture

## 1. Overview & Learning Objectives
React is a declarative, component-based JavaScript library for building user interfaces. In this lesson, you will master:
- Declarative vs Imperative UI paradigms.
- The Virtual DOM (VDOM) and the React Fiber reconciliation algorithm.
- JSX (JavaScript XML) syntax rules and Babel/Vite transpilation to \`React.createElement\`.
- Unidirectional Data Flow (Top-down data flow from parent to child).

---

## 2. Virtual DOM & Reconciliation
Instead of directly mutating the browser DOM on every state change, React:
1. Creates a lightweight in-memory tree representation of the UI (Virtual DOM).
2. When state changes, renders a new Virtual DOM tree.
3. Computes the minimum differences between the previous and new trees (**Diffing Algorithm**).
4. Batches and applies only the calculated mutations to the real browser DOM in a single commit.

---

## 3. JSX Rules & Transpilation
JSX allows writing HTML-like markup inside JavaScript files:

\`\`\`jsx
// JSX Code:
export function CadetBadge({ cadetName, rank = 'Junior Analyst' }) {
  const isHighRank = rank.includes('Senior') || rank.includes('Architect');

  return (
    <div className={\`cadet-badge \${isHighRank ? 'glow-emerald' : 'standard'}\`}>
      <span className="font-bold">{cadetName}</span>
      <span className="rank-tag">{rank}</span>
    </div>
  );
}
\`\`\`

JSX Rules:
1. Return a single root element (or a Fragment: \`<>...</>\`).
2. Close all tags explicitly (e.g. \`<img />\`, \`<input />\`).
3. Use \`camelCase\` for attributes: \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`.

---

## 4. Key Takeaways
- React treats UI as a pure mathematical function of state: \`UI = f(state)\`.
- Keys in lists allow the reconciliation algorithm to identify which items have changed, added, or removed.

## 5. Documentation & References
- [React Official Documentation](https://react.dev/)
- [Thinking in React](https://react.dev/learn/thinking-in-react)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'React Architecture, Virtual DOM & Component Hierarchy',
        video_duration: '22:45',
        videos: [
          { id: 'vid_m6_l1_1', title: 'React Fundamentals & Virtual DOM Diffing', url: '/assets/sample-lesson.mp4', duration: '22:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l1_1', title: 'Virtual DOM Diffing & Reconciliation', url: '/assets/course-art/art-04.jpg', caption: 'State change -> Virtual DOM diff -> Batched real DOM commit.', alt: 'Virtual DOM Flow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l2',
        title: 'Functional Components, Props Validation & Composable UI Patterns',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Build robust functional components: passing and destructuring props, default prop fallbacks, children prop composition, and container-presenter design patterns.',
        content: `# Functional Components, Props Validation & Composable UI Patterns

## 1. Overview & Learning Objectives
Components are the independent, reusable building blocks of a React application. In this lesson, you will master:
- Functional component authoring and prop destructuring.
- Component composition using the special \`children\` prop.
- Props are **immutable / read-only**: Components must be pure functions with respect to their props.
- Compound component patterns for flexible, reusable design systems.

---

## 2. Component Composition with the children Prop
\`\`\`jsx
// Reusable Glass Card Component
export function CyberCard({ title, children, actions }) {
  return (
    <article className="cyber-glass-card p-6 rounded-2xl border border-[#65F58A]/30 bg-[#092218]/60">
      <header className="flex justify-between items-center pb-4 border-b border-[#65F58A]/20">
        <h3 className="font-lora text-lg font-bold text-white">{title}</h3>
        {actions && <div className="card-actions">{actions}</div>}
      </header>

      {/* Render whatever JSX is nested inside <CyberCard>...</CyberCard> */}
      <div className="card-body pt-4">
        {children}
      </div>
    </article>
  );
}
\`\`\`

Usage:
\`\`\`jsx
<CyberCard title="Network Telemetry" actions={<button>Refresh</button>}>
  <p>Active IP packets scanned: 1,420,980</p>
  <TelemetryChart />
</CyberCard>
\`\`\`

---

## 3. Key Takeaways
- Never mutate a prop directly inside a child component; treat props as read-only snapshots.
- Use composition (\`children\`) instead of complex prop-drilling or inheritance.

## 4. Documentation & References
- [React Docs: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Component Composition & Clean Props Architecture',
        video_duration: '19:15',
        videos: [
          { id: 'vid_m6_l2_1', title: 'Component Composition & Props Architecture', url: '/assets/sample-lesson.mp4', duration: '19:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l2_1', title: 'Component Tree Composition Model', url: '/assets/course-art/art-05.jpg', caption: 'Nesting components using the children prop composition pattern.', alt: 'Component Tree' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l3',
        title: 'State Management with useState & Managing Complex Local State',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Master local state with useState: state setter dispatch, functional updates (prev => next), immutability rules for arrays/objects, and lifting state up.',
        content: `# State Management with useState & Managing Complex Local State

## 1. Overview & Learning Objectives
State represents data that changes over time and triggers re-renders. In this lesson, you will master:
- The \`useState\` Hook syntax and return tuple: \`[state, setState]\`.
- Functional state updates: Why \`setCount(prev => prev + 1)\` avoids race conditions.
- Immutably updating objects and arrays in state using the spread operator.
- The "Lifting State Up" pattern to share state between sibling components.

---

## 2. Immutable Object and Array Updates
In React, mutating state directly (\`user.role = 'Admin'\`) does not change object identity, causing React to skip re-rendering! Always return a fresh object:

\`\`\`jsx
import { useState } from 'react';

export function IncidentManager() {
  const [incidents, setIncidents] = useState([
    { id: 1, title: 'Port Scan Detected', status: 'OPEN' }
  ]);

  // Adding an item immutably
  const handleAddIncident = (newIncident) => {
    setIncidents(prev => [...prev, newIncident]);
  };

  // Updating an item immutably
  const handleResolve = (id) => {
    setIncidents(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'RESOLVED' } : item
    ));
  };

  // Deleting an item immutably
  const handleDelete = (id) => {
    setIncidents(prev => prev.filter(item => item.id !== id));
  };
}
\`\`\`

---

## 3. Key Takeaways
- Always treat React state as read-only; never mutate objects or arrays in place.
- Use the updater function syntax \`setState(prev => ...)\` whenever the new state depends on previous state.

## 4. Documentation & References
- [React Docs: State - A Component's Memory](https://react.dev/learn/state-a-components-memory)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'useState Mastery & Immutable State Patterns',
        video_duration: '21:30',
        videos: [
          { id: 'vid_m6_l3_1', title: 'useState, Functional Updates & Immutability', url: '/assets/sample-lesson.mp4', duration: '21:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l3_1', title: 'Immutable State Flowchart', url: '/assets/course-art/art-06.jpg', caption: 'Dispatching state updates and triggering component re-renders.', alt: 'State Flow Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l4',
        title: 'Side Effects, Lifecycle & Data Fetching with useEffect',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Synchronize components with external systems using useEffect: the dependency array, effect lifecycles (mount, update, unmount), cleanup functions, and data fetching.',
        content: `# Side Effects, Lifecycle & Data Fetching with useEffect

## 1. Overview & Learning Objectives
Components should remain pure during rendering. Side effects (data fetching, subscriptions, DOM mutation, timers) belong inside \`useEffect\`. In this lesson, you will master:
- The \`useEffect\` execution lifecycle.
- The Dependency Array: Empty \`[]\`, with dependencies \`[dep1, dep2]\`, or omitted.
- Writing cleanup functions to unsubscribe from sockets and cancel timers.
- Data fetching patterns with race-condition prevention using boolean flags or AbortController.

---

## 2. Safe Data Fetching with Cleanup
\`\`\`jsx
import { useState, useEffect } from 'react';

export function CourseDetail({ courseId }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false; // Prevents race conditions
    const controller = new AbortController();

    async function fetchCourse() {
      setLoading(true);
      try {
        const res = await fetch(\`/api/courses/\${courseId}\`, { signal: controller.signal });
        const data = await res.json();
        if (!isCancelled) {
          setCourse(data.course);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled && err.name !== 'AbortError') {
          console.error('Fetch error:', err);
          setLoading(false);
        }
      }
    }

    fetchCourse();

    // Cleanup function: executes on unmount OR before re-running effect!
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [courseId]); // Only re-run when courseId changes
}
\`\`\`

---

## 3. Key Takeaways
- The cleanup function returned from \`useEffect\` is critical for closing WebSockets, clearing timers, and aborting fetch requests.
- Never omit dependencies that are referenced inside the effect from the dependency array.

## 4. Documentation & References
- [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'useEffect Lifecycle, Subscriptions & Cleanup Functions',
        video_duration: '23:40',
        videos: [
          { id: 'vid_m6_l4_1', title: 'useEffect Architecture & Data Fetching', url: '/assets/sample-lesson.mp4', duration: '23:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l4_1', title: 'useEffect Execution Timeline', url: '/assets/course-art/art-07.jpg', caption: 'Mount -> Render -> Effect -> State change -> Cleanup -> Next Effect -> Unmount.', alt: 'useEffect Lifecycle' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l5',
        title: 'Advanced Hooks: useRef, useMemo, useCallback, and Custom Hooks',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Optimize React performance and manage persistent references: useRef for DOM nodes/mutable values without re-rendering, useMemo for expensive math, useCallback for function identity, and custom hook extraction.',
        content: `# Advanced Hooks: useRef, useMemo, useCallback, and Custom Hooks

## 1. Overview & Learning Objectives
Advanced hooks allow managing mutable references and optimizing rendering performance. In this lesson, you will master:
- \`useRef\`: Referencing real DOM elements and storing mutable values across renders without causing re-renders.
- \`useMemo\`: Memoizing expensive calculation results.
- \`useCallback\`: Memoizing function instances to maintain stable references for memoized child components.
- Designing reusable **Custom Hooks** (e.g. \`useWindowSize\`, \`useDebounce\`, \`useLocalStorage\`).

---

## 2. useRef for Persistent Mutable Values
\`\`\`jsx
import { useRef } from 'react';

export function VideoPlayer() {
  const videoRef = useRef(null); // Binds to real <video> DOM node

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  return (
    <div>
      <video ref={videoRef} src="/assets/sample-lesson.mp4" />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
\`\`\`

---

## 3. Creating a Reusable Custom Hook
\`\`\`jsx
import { useState, useEffect } from 'react';

export function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}
\`\`\`

---

## 4. Key Takeaways
- Mutating \`ref.current\` does NOT trigger a component re-render.
- Custom hooks encapsulate stateful logic and can call other built-in React hooks.

## 5. Documentation & References
- [React Docs: Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Performance Hooks & Custom Hook Architecture',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m6_l5_1', title: 'useRef, useMemo, useCallback & Custom Hooks', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l5_1', title: 'Hook Memoization Dependency Check', url: '/assets/course-art/art-08.jpg', caption: 'Dependency comparison checking whether to reuse cached value or recompute.', alt: 'Memoization Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l6',
        title: 'Global State Management with React Context API & Reducer Pattern (useReducer)',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Eliminate prop-drilling with React Context: createContext, useContext, Provider patterns, combining Context with useReducer for Redux-like scalable state management.',
        content: `# Global State Management with React Context API & Reducer Pattern (useReducer)

## 1. Overview & Learning Objectives
Passing props through 10 levels of intermediate components ("prop drilling") creates maintenance nightmares. In this lesson, you will master:
- Creating and consuming Context with \`createContext\` and \`useContext\`.
- Structuring robust Context Providers with custom consumer hooks.
- Combining Context with \`useReducer\` to build a predictable, Redux-like global state architecture.

---

## 2. Production AuthContext Architecture
\`\`\`jsx
import { createContext, useContext, useReducer } from 'react';

// 1. Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'cyber-dark'
};

// 2. Reducer Function
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// 3. Create Context
const AuthContext = createContext(null);

// 4. Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom Hook for consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
\`\`\`

---

## 3. Key Takeaways
- Always throw a descriptive error inside custom context hooks if consumed outside their Provider.
- Context is ideal for low-frequency global updates (auth state, user profile, theme).

## 4. Documentation & References
- [React Docs: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'React Context API & useReducer State Architecture',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m6_l6_1', title: 'Context API & Global State Patterns', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l6_1', title: 'Context Provider Broadcast Model', url: '/assets/course-art/art-09.jpg', caption: 'Direct data delivery from top-level Provider to leaf components without prop drilling.', alt: 'Context Tree Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m6_l7',
        title: 'Client-Side Routing with React Router v6 (Nested Routes, Protected Routes, Loaders)',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Architect multi-view SPAs with React Router v6: BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate, Nested Layout routes, and Protected Route guards.',
        content: `# Client-Side Routing with React Router v6 (Nested Routes, Protected Routes, Loaders)

## 1. Overview & Learning Objectives
Client-side routing allows single-page applications to update the browser URL and view without causing full page reloads. In this lesson, you will master:
- Configuring \`BrowserRouter\`, \`Routes\`, and \`Route\`.
- Dynamic URL route parameters with \`useParams()\` (e.g. \`/courses/:slug\`).
- Programmatic navigation with \`useNavigate()\`.
- Nested layout routes with \`<Outlet />\`.
- Protecting private routes with authentication guards.

---

## 2. Protected Route Implementation
\`\`\`jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/auth/authContext';

export function ProtectedRoute({ requiredRole }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Verifying security token...</div>;
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated cadets to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect unauthorized users
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the nested child routes
  return <Outlet />;
}
\`\`\`

Configuring Routes in App.jsx:
\`\`\`jsx
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<HomePage />} />
  <Route path="/courses" element={<CourseCatalogPage />} />
  <Route path="/courses/:slug" element={<CourseDetailPage />} />

  {/* Protected Student Portal */}
  <Route element={<ProtectedRoute requiredRole="student" />}>
    <Route path="/student" element={<StudentDashboardPage />} />
    <Route path="/student/learn/:enrolmentId" element={<LessonPlayerPage />} />
  </Route>
</Routes>
\`\`\`

---

## 3. Key Takeaways
- Use \`<Outlet />\` in layout route components to render matching child routes.
- Always use \`<Link>\` or \`<NavLink>\` instead of native \`<a href="...">\` to prevent full page reloads.

## 4. Documentation & References
- [React Router Official Docs](https://reactrouter.com/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'React Router v6 Architecture & Protected Routes',
        video_duration: '22:00',
        videos: [
          { id: 'vid_m6_l7_1', title: 'Client Routing, Nested Routes & Auth Guards', url: '/assets/sample-lesson.mp4', duration: '22:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m6_l7_1', title: 'React Router Nested Outlet Architecture', url: '/assets/course-art/art-10.jpg', caption: 'Master layout and nested page routing via Outlet.', alt: 'React Router Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m6',
      title: 'Module 6: React.js Development - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m6_1',
          text: 'What is the primary role of the key prop when rendering arrays of components in React?',
          options: [
            { id: 'opt_1', text: 'To encrypt component props in memory', is_correct: false },
            { id: 'opt_2', text: 'To help React\'s reconciliation algorithm identify which items have changed, been added, or been removed', is_correct: true },
            { id: 'opt_3', text: 'To bind the component to a database primary key', is_correct: false },
            { id: 'opt_4', text: 'To apply unique CSS styling to each item', is_correct: false }
          ],
          explanation: 'Keys provide a stable identity to array elements, enabling the diffing algorithm to reuse DOM nodes efficiently across renders.'
        },
        {
          id: 'q_m6_2',
          text: 'Why does mutating React state directly (e.g. user.name = "Alex") fail to trigger a visual component re-render?',
          options: [
            { id: 'opt_1', text: 'React relies on Object.is identity comparison; mutating an object in place preserves the same memory reference, causing React to skip rendering.', is_correct: true },
            { id: 'opt_2', text: 'Direct mutation crashes the browser JavaScript engine.', is_correct: false },
            { id: 'opt_3', text: 'React components only re-render on mouse movement.', is_correct: false },
            { id: 'opt_4', text: 'The browser DOM blocks all direct variable edits.', is_correct: false }
          ],
          explanation: 'React checks if the new state reference is different from the old reference using Object.is. In-place mutations maintain identical references.'
        },
        {
          id: 'q_m6_3',
          text: 'When does the cleanup function returned from a useEffect hook execute?',
          options: [
            { id: 'opt_1', text: 'Only when the browser window closes.', is_correct: false },
            { id: 'opt_2', text: 'Immediately before the component unmounts, and before every re-execution of the effect when dependencies change.', is_correct: true },
            { id: 'opt_3', text: 'Before the component first mounts.', is_correct: false },
            { id: 'opt_4', text: 'Every time the user clicks a button.', is_correct: false }
          ],
          explanation: 'The cleanup function runs when the component unmounts and prior to running the effect again on dependency updates, cleaning up previous side effects.'
        },
        {
          id: 'q_m6_4',
          text: 'How does updating a useRef object (e.g. ref.current = 10) differ from updating a useState value?',
          options: [
            { id: 'opt_1', text: 'Mutating ref.current does NOT trigger a component re-render; updating state DOES trigger a re-render.', is_correct: true },
            { id: 'opt_2', text: 'useRef can only store strings, while useState stores objects.', is_correct: false },
            { id: 'opt_3', text: 'useRef values are wiped on every re-render.', is_correct: false },
            { id: 'opt_4', text: 'useState cannot be used inside functional components.', is_correct: false }
          ],
          explanation: 'useRef stores a mutable value across renders without triggering a re-render when mutated.'
        },
        {
          id: 'q_m6_5',
          text: 'What is the purpose of the useMemo hook in React performance optimization?',
          options: [
            { id: 'opt_1', text: 'To cache the result of an expensive calculation so it only recalculates when specific dependencies change.', is_correct: true },
            { id: 'opt_2', text: 'To store component HTML in LocalStorage automatically.', is_correct: false },
            { id: 'opt_3', text: 'To prevent parent components from rendering children.', is_correct: false },
            { id: 'opt_4', text: 'To execute background network requests on a Web Worker thread.', is_correct: false }
          ],
          explanation: 'useMemo caches the output of an expensive computation across renders, recomputing only if one of the dependencies has changed.'
        },
        {
          id: 'q_m6_6',
          text: 'What React hook should you use to cache a function definition between renders so child components do not re-render unnecessarily?',
          options: [
            { id: 'opt_1', text: 'useCallback', is_correct: true },
            { id: 'opt_2', text: 'useMemo', is_correct: false },
            { id: 'opt_3', text: 'useRef', is_correct: false },
            { id: 'opt_4', text: 'useId', is_correct: false }
          ],
          explanation: 'useCallback caches a function instance between renders, providing a stable reference identity to prevent unnecessary child re-renders.'
        },
        {
          id: 'q_m6_7',
          text: 'What React Router v6 component is placed inside a parent layout route to designate where child routes should render?',
          options: [
            { id: 'opt_1', text: '<Outlet />', is_correct: true },
            { id: 'opt_2', text: '<ChildContainer />', is_correct: false },
            { id: 'opt_3', text: '<RouteView />', is_correct: false },
            { id: 'opt_4', text: '<Slot />', is_correct: false }
          ],
          explanation: 'In React Router v6, an <Outlet /> element should be used in parent route elements to render their child route elements.'
        },
        {
          id: 'q_m6_8',
          text: 'Why should you use the functional updater syntax setCount(prev => prev + 1) when new state depends on previous state?',
          options: [
            { id: 'opt_1', text: 'It ensures the update always works with the latest state value even during batched asynchronous updates.', is_correct: true },
            { id: 'opt_2', text: 'It forces synchronous rendering immediately.', is_correct: false },
            { id: 'opt_3', text: 'It disables all child component renders.', is_correct: false },
            { id: 'opt_4', text: 'It bypasses React Fiber reconciliation.', is_correct: false }
          ],
          explanation: 'Passing a function gives you the pending state from React\'s update queue, preventing stale closures in batched or asynchronous updates.'
        },
        {
          id: 'q_m6_9',
          text: 'What will happen if you omit the dependency array completely from a useEffect declaration (e.g. useEffect(() => { ... }))?',
          options: [
            { id: 'opt_1', text: 'The effect will run only once when the component mounts.', is_correct: false },
            { id: 'opt_2', text: 'The effect will run after every single render of the component.', is_correct: true },
            { id: 'opt_3', text: 'The effect will never execute.', is_correct: false },
            { id: 'opt_4', text: 'React will throw a compilation error.', is_correct: false }
          ],
          explanation: 'Without a dependency array, useEffect executes after initial mount and after every subsequent component render.'
        },
        {
          id: 'q_m6_10',
          text: 'What special prop is used in React to pass nested JSX markup between the opening and closing tags of a component?',
          options: [
            { id: 'opt_1', text: 'props.content', is_correct: false },
            { id: 'opt_2', text: 'props.children', is_correct: true },
            { id: 'opt_3', text: 'props.body', is_correct: false },
            { id: 'opt_4', text: 'props.inner', is_correct: false }
          ],
          explanation: 'props.children contains whatever content is nested between the component opening and closing tags, enabling composition.'
        },
        {
          id: 'q_m6_11',
          text: 'What error will occur if a component calls a custom hook that uses useContext(AuthContext) outside of its <AuthProvider>?',
          options: [
            { id: 'opt_1', text: 'The context will receive the default value (often null or undefined), which can cause runtime errors unless guarded.', is_correct: true },
            { id: 'opt_2', text: 'The browser automatically redirects to Google.com.', is_correct: false },
            { id: 'opt_3', text: 'The component converts to an HTML iframe.', is_correct: false },
            { id: 'opt_4', text: 'React deletes the component from memory.', is_correct: false }
          ],
          explanation: 'useContext returns the context default value if rendered outside its Provider; good custom hooks check for this and throw a clear error.'
        },
        {
          id: 'q_m6_12',
          text: 'Which React Router v6 hook returns an object of key/value pairs of URL route parameters (e.g. for /courses/:slug)?',
          options: [
            { id: 'opt_1', text: 'useParams()', is_correct: true },
            { id: 'opt_2', text: 'useSearchParams()', is_correct: false },
            { id: 'opt_3', text: 'useLocation()', is_correct: false },
            { id: 'opt_4', text: 'useNavigate()', is_correct: false }
          ],
          explanation: 'useParams() returns an object containing the dynamic parameters from the current URL matched by the <Route path="...">.'
        },
        {
          id: 'q_m6_13',
          text: 'Why does JSX require using className instead of class for applying CSS classes to HTML elements?',
          options: [
            { id: 'opt_1', text: 'Because class is a reserved keyword in JavaScript.', is_correct: true },
            { id: 'opt_2', text: 'To distinguish React from standard HTML.', is_correct: false },
            { id: 'opt_3', text: 'Because className loads styles faster.', is_correct: false },
            { id: 'opt_4', text: 'It is a requirement of the Google V8 engine.', is_correct: false }
          ],
          explanation: 'JSX compiles into regular JavaScript objects where class is a reserved language keyword for class declarations.'
        },
        {
          id: 'q_m6_14',
          text: 'What is the purpose of React Fragments (<>...</> or <React.Fragment>)?',
          options: [
            { id: 'opt_1', text: 'To group a list of children elements without adding extra wrapper nodes to the real DOM.', is_correct: true },
            { id: 'opt_2', text: 'To split component code into multiple JavaScript chunks.', is_correct: false },
            { id: 'opt_3', text: 'To create secure sandbox frames for iframes.', is_correct: false },
            { id: 'opt_4', text: 'To animate component transitions.', is_correct: false }
          ],
          explanation: 'Fragments let you group children without adding unnecessary <div> wrapper nodes to the DOM tree.'
        },
        {
          id: 'q_m6_15',
          text: 'What hook should be chosen when managing complex local state involving multiple sub-values or next-state logic depending on previous state?',
          options: [
            { id: 'opt_1', text: 'useReducer', is_correct: true },
            { id: 'opt_2', text: 'useRef', is_correct: false },
            { id: 'opt_3', text: 'useLayoutEffect', is_correct: false },
            { id: 'opt_4', text: 'useId', is_correct: false }
          ],
          explanation: 'useReducer is preferred over useState when state logic is complex, involves multiple sub-values, or when next state depends on prior state.'
        },
        {
          id: 'q_m6_16',
          text: 'How should you navigate programmatically to a new route in React Router v6 after a successful form submission?',
          options: [
            { id: 'opt_1', text: 'window.location.href = "/dashboard"', is_correct: false },
            { id: 'opt_2', text: 'const navigate = useNavigate(); navigate("/dashboard");', is_correct: true },
            { id: 'opt_3', text: 'history.push("/dashboard")', is_correct: false },
            { id: 'opt_4', text: '<Redirect to="/dashboard" />', is_correct: false }
          ],
          explanation: 'The useNavigate() hook provides a function that allows programmatic navigation without triggering full page browser reloads.'
        },
        {
          id: 'q_m6_17',
          text: 'What is the Rule of Hooks regarding where React hooks can be called?',
          options: [
            { id: 'opt_1', text: 'Hooks can only be called at the top level of React function components or custom hooks, never inside loops, conditions, or nested functions.', is_correct: true },
            { id: 'opt_2', text: 'Hooks must only be called inside class components.', is_correct: false },
            { id: 'opt_3', text: 'Hooks must always be called inside setTimeout callbacks.', is_correct: false },
            { id: 'opt_4', text: 'Hooks can only be called in Node.js server files.', is_correct: false }
          ],
          explanation: 'React relies on call order to associate state with the right hook across renders. Calling hooks conditionally breaks this ordering.'
        },
        {
          id: 'q_m6_18',
          text: 'What React hook can be used to generate unique IDs for accessibility attributes (like aria-describedby) that remain consistent across client and server rendering?',
          options: [
            { id: 'opt_1', text: 'useId', is_correct: true },
            { id: 'opt_2', text: 'useUniqueKey', is_correct: false },
            { id: 'opt_3', text: 'useRef', is_correct: false },
            { id: 'opt_4', text: 'useA11y', is_correct: false }
          ],
          explanation: 'useId generates unique, stable IDs for accessibility attributes that avoid hydration mismatches between SSR and client.'
        },
        {
          id: 'q_m6_19',
          text: 'In React 18, how does automatic batching improve rendering performance?',
          options: [
            { id: 'opt_1', text: 'It groups multiple state updates from timeouts, promises, and native event handlers into a single re-render.', is_correct: true },
            { id: 'opt_2', text: 'It batches CSS stylesheets into a single file.', is_correct: false },
            { id: 'opt_3', text: 'It combines all API requests into a single GraphQL query.', is_correct: false },
            { id: 'opt_4', text: 'It converts all state into Redux stores.', is_correct: false }
          ],
          explanation: 'React 18 automatically batches state updates regardless of where they originate (promises, setTimeout, native events), minimizing re-renders.'
        },
        {
          id: 'q_m6_20',
          text: 'What is the difference between a controlled component and an uncontrolled component in React forms?',
          options: [
            { id: 'opt_1', text: 'Controlled components have their input value driven by React state; uncontrolled components maintain their own state in the DOM accessed via refs.', is_correct: true },
            { id: 'opt_2', text: 'Controlled components cannot be validated.', is_correct: false },
            { id: 'opt_3', text: 'Uncontrolled components are forbidden in React.', is_correct: false },
            { id: 'opt_4', text: 'Controlled components do not support onSubmit handlers.', is_correct: false }
          ],
          explanation: 'A controlled input takes its current value through props and notifies changes via callbacks (value + onChange). Uncontrolled inputs store values in the DOM.'
        }
      ]
    }
  }
];
