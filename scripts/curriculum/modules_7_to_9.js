// Module 7 to 9 Curriculum Definition
// 19 Lessons, 60 Assessment Questions

export const modules_7_to_9 = [
  // =========================================================================
  // MODULE 7: Node.js Fundamentals (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_7',
    title: 'Module 7: Node.js Fundamentals',
    description: 'Master backend JavaScript with the Node.js runtime: V8 execution engine, libuv event loop threads, stream pipelines, filesystem I/O, package management, and system automation.',
    order: 7,
    assignment: {
      id: 'asg_m7',
      title: 'Practical Assignment: High-Throughput Log Streaming & Analysis CLI Tool',
      objective: 'Build an asynchronous Node.js command-line utility that streams, parses, filters, and reports server access logs without loading entire multi-gigabyte log files into RAM.',
      requirements: [
        'Utilize fs.createReadStream and readline or stream.Transform to process log files line-by-line in constant memory.',
        'Extract IP addresses, HTTP status codes, and request URIs using regular expressions.',
        'Calculate aggregate metrics (total requests, 4xx/5xx error rates, top 5 attacking IPs) using Node.js event emitters.',
        'Output a clean formatted JSON summary report to disk using fs/promises.',
        'Accept command-line arguments (--file, --threshold, --output) using process.argv or util.parseArgs.'
      ],
      instructions: '1. Create cli.js. 2. Implement readable and transform stream pipelines. 3. Benchmark memory consumption against a 100MB log file. 4. Submit code and CLI output.',
      expected_outcome: 'A production-grade Node.js stream utility that processes massive files while consuming less than 30MB of RAM.'
    },
    lessons: [
      {
        id: 'les_m7_l1',
        title: 'Node.js Runtime Architecture, V8 Engine & Non-Blocking Event-Driven I/O',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore Node.js internals: the Google V8 engine, libuv C++ thread pool, non-blocking asynchronous system calls, and how single-threaded JavaScript handles 100,000+ concurrent network connections.',
        content: `# Node.js Runtime Architecture, V8 Engine & Non-Blocking Event-Driven I/O

## 1. Overview & Learning Objectives
Node.js is not a programming language or framework; it is an open-source, cross-platform JavaScript runtime environment that executes JavaScript outside web browsers. In this lesson, you will master:
- The dual-engine architecture: Google V8 (ECMAScript execution) and \`libuv\` (asynchronous I/O abstraction).
- The non-blocking, event-driven I/O paradigm.
- The \`libuv\` thread pool (\`UV_THREADPOOL_SIZE\`) for file system, DNS lookup, and cryptographic operations.
- The global execution context in Node.js (\`global\`, \`process\`, \`Buffer\`).

---

## 2. Node.js System Architecture
\`\`\`
+-------------------------------------------------------+
|                 YOUR APPLICATION CODE                 |
+-------------------------------------------------------+
|               Node.js Core API Modules                |
|           (fs, http, crypto, path, stream)            |
+---------------------------+---------------------------+
|      Google V8 Engine     |       Node.js Bindings    |
| (JS Parsing & JIT Machine |          (C++ Layer)      |
|       Code Execution)     |                           |
+---------------------------+---------------------------+
|                         libuv                         |
|   (Event Loop, Non-Blocking Sockets (epoll/kqueue),   |
|         Default 4-Thread Worker Pool for FS)          |
+-------------------------------------------------------+
|                    OPERATING SYSTEM                   |
|                (Kernel Sockets & Disks)               |
+-------------------------------------------------------+
\`\`\`

---

## 3. Non-Blocking I/O Demonstration
In blocking systems (traditional PHP or Apache), a thread waits idle while a disk read occurs. In Node.js, operations are delegated to the OS kernel or libuv thread pool:

\`\`\`javascript
import fs from 'node:fs/promises';

console.log('1. Initiating disk read...');

// Non-blocking asynchronous I/O
fs.readFile('./server-config.json', 'utf8')
  .then(data => console.log('3. File loaded from disk!'))
  .catch(err => console.error(err));

console.log('2. Continuing main thread operations without waiting!');

// Output order: 1 -> 2 -> 3
\`\`\`

---

## 4. Key Takeaways
- The Node.js main thread never sleeps; heavy I/O operations are offloaded asynchronously so the server can handle other requests.
- CPU-intensive tasks (e.g. video transcoding or password hashing) should be offloaded to Worker Threads to prevent blocking the event loop.

## 5. Documentation & References
- [Node.js Official Architecture Guides](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [libuv Design Overview](http://docs.libuv.org/en/v1.x/design.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Node.js Runtime Internals, V8 & libuv Architecture',
        video_duration: '22:50',
        videos: [
          { id: 'vid_m7_l1_1', title: 'Node.js Internals, libuv & Non-Blocking I/O', url: '/assets/sample-lesson.mp4', duration: '22:50', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l1_1', title: 'Node.js Internal Architecture Stack', url: '/assets/course-art/art-01.jpg', caption: 'V8 Engine, C++ Bindings, libuv Event Loop and OS Kernel layers.', alt: 'Node.js Architecture Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m7_l2',
        title: 'Working with Built-in Modules: fs, path, os, events, and util',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Harness Node.js native standard library: async filesystem operations (fs/promises), cross-platform file paths (path.join, path.resolve), hardware metrics (os), and custom event buses (EventEmitter).',
        content: `# Working with Built-in Modules: fs, path, os, events, and util

## 1. Overview & Learning Objectives
Node.js ships with a robust standard library eliminating external dependencies for core tasks. In this lesson, you will master:
- Modern promise-based filesystem operations: \`node:fs/promises\`.
- Cross-platform path resolution: \`node:path\` (\`path.join\`, \`path.resolve\`, \`path.extname\`).
- Machine telemetry: \`node:os\` (CPU cores, memory, uptime).
- Decoupled application event buses with \`node:events\` (\`EventEmitter\`).

---

## 2. Cross-Platform File Paths & Asynchronous Filesystem
Windows uses backslashes (\`\\\`), while POSIX systems use forward slashes (\`/\`). Never concatenate file paths with strings; always use \`path.join()\`:

\`\`\`javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

// 1. Resolve absolute path cross-platform
const targetDir = path.resolve(process.cwd(), 'audit-logs');
const logFile = path.join(targetDir, 'incident-report.log');

async function recordTelemetry() {
  // Ensure directory exists
  await fs.mkdir(targetDir, { recursive: true });

  const telemetryEntry = {
    timestamp: new Date().toISOString(),
    host: os.hostname(),
    platform: os.platform(),
    freeMemMB: Math.round(os.freemem() / 1024 / 1024),
    cpuCores: os.cpus().length
  };

  await fs.appendFile(logFile, JSON.stringify(telemetryEntry) + '\\n', 'utf8');
  console.log('Telemetry successfully recorded to:', logFile);
}

recordTelemetry();
\`\`\`

---

## 3. Decoupled Architecture with EventEmitter
\`\`\`javascript
import { EventEmitter } from 'node:events';

class SecurityScanner extends EventEmitter {
  scanIp(ip) {
    this.emit('scan:started', { ip });
    if (ip.startsWith('10.240')) {
      this.emit('threat:detected', { ip, threat: 'Unauthorized Private Subnet Access' });
    }
    this.emit('scan:completed', { ip });
  }
}

const scanner = new SecurityScanner();
scanner.on('threat:detected', (payload) => {
  console.warn('[SECURITY ALERT]', payload);
});

scanner.scanIp('10.240.12.99');
\`\`\`

---

## 4. Key Takeaways
- Always use the \`node:\` prefix when importing built-in modules (e.g. \`import path from 'node:path'\`).
- Use \`fs/promises\` instead of synchronous \`fs.*Sync\` methods to keep the event loop unblocked.

## 5. Documentation & References
- [Node.js Built-in Modules Documentation](https://nodejs.org/api/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Node.js Standard Library & EventEmitter Architecture',
        video_duration: '21:30',
        videos: [
          { id: 'vid_m7_l2_1', title: 'Built-in Modules & EventEmitter', url: '/assets/sample-lesson.mp4', duration: '21:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l2_1', title: 'EventEmitter Observer Pattern', url: '/assets/course-art/art-02.jpg', caption: 'Decoupled publisher-subscriber architecture using EventEmitter.', alt: 'EventEmitter Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m7_l3',
        title: 'Node.js Streams and Buffer Architecture for High-Performance Data Handling',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Process massive datasets with constant memory footprint using Node.js Streams: Readable, Writable, Transform, Duplex, pipeline(), and raw binary Buffer allocation.',
        content: `# Node.js Streams and Buffer Architecture for High-Performance Data Handling

## 1. Overview & Learning Objectives
Reading an entire 10GB database export into memory will crash Node.js with a \`JavaScript heap out of memory\` error. Streams allow processing data piece by piece (chunks). In this lesson, you will master:
- The 4 types of streams: \`Readable\`, \`Writable\`, \`Transform\`, and \`Duplex\`.
- Managing binary data with \`Buffer\` (\`Buffer.alloc\`, \`Buffer.from\`).
- Composing stream pipelines with \`stream.pipeline\` to prevent memory leaks and handle backpressure.

---

## 2. Stream Pipeline with Gzip Compression
\`\`\`javascript
import fs from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

async function compressLogArchive(sourcePath, destPath) {
  console.log('Compressing log archive using stream pipeline...');

  // Reads chunk by chunk, compresses on the fly, writes compressed bytes
  await pipeline(
    fs.createReadStream(sourcePath),
    zlib.createGzip(),
    fs.createWriteStream(destPath)
  );

  console.log('Stream compression complete! Memory consumption remained constant (<30MB).');
}
\`\`\`

---

## 3. Backpressure Explained
Backpressure occurs when a \`Readable\` stream produces data faster than a \`Writable\` stream can consume it (e.g. reading from a fast SSD and writing across a slow 3G cellular network).
The \`pipeline()\` utility automatically handles backpressure: it pauses the readable stream until the writable buffer drains, preventing memory exhaustion.

---

## 4. Key Takeaways
- Always use \`pipeline\` from \`node:stream/promises\` instead of legacy \`.pipe()\` for robust error propagation and automatic stream cleanup.
- Never read large files using \`fs.readFile\`; always stream them.

## 5. Documentation & References
- [Node.js Streams Documentation](https://nodejs.org/api/stream.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Node.js Streams, Backpressure & Buffer Mastery',
        video_duration: '24:10',
        videos: [
          { id: 'vid_m7_l3_1', title: 'Streams, Buffers & Pipeline Architecture', url: '/assets/sample-lesson.mp4', duration: '24:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l3_1', title: 'Stream Pipeline & Backpressure Flow', url: '/assets/course-art/art-03.jpg', caption: 'Managing backpressure between fast producers and slow consumers.', alt: 'Stream Pipeline Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m7_l4',
        title: 'Package Management with npm / pnpm, package.json, and Semantic Versioning',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Understand enterprise package management: package.json manifests, lockfiles (package-lock.json), semantic versioning (SemVer: Major.Minor.Patch), devDependencies vs dependencies, and security audits.',
        content: `# Package Management with npm / pnpm, package.json, and Semantic Versioning

## 1. Overview & Learning Objectives
Modern Node.js development depends on the npm package ecosystem. In this lesson, you will master:
- The anatomy of \`package.json\`: \`scripts\`, \`dependencies\`, \`devDependencies\`, and \`peerDependencies\`.
- Semantic Versioning (SemVer) rules: \`MAJOR.MINOR.PATCH\`.
- Version constraint prefixes: Caret (\`^\`), Tilde (\`~\`), Exact (\`=\`).
- The critical role of lockfiles (\`package-lock.json\` / \`pnpm-lock.yaml\`) for deterministic production builds.
- Dependency auditing with \`npm audit\`.

---

## 2. Semantic Versioning (SemVer) Decoded
Given a version \`2.4.1\`:
1. **MAJOR (2):** Incompatible API changes, breaking modifications.
2. **MINOR (4):** Backwards-compatible new features.
3. **PATCH (1):** Backwards-compatible bug fixes and security patches.

Version Prefixes in package.json:
- \`^2.4.1\` (Caret): Allows updates to newer Minor and Patch versions (up to \`< 3.0.0\`).
- \`~2.4.1\` (Tilde): Allows updates to newer Patch versions only (up to \`< 2.5.0\`).
- \`2.4.1\` (Exact): Locks strictly to version 2.4.1.

---

## 3. The Lockfile Guarantee
Never delete or ignore your lockfile:
\`package-lock.json\` records the exact cryptographic sha512 integrity hashes and resolved versions of every nested dependency in the dependency tree. Running \`npm ci\` (Clean Install) in CI/CD pipelines guarantees exact reproducible builds across developer machines and cloud servers.

---

## 4. Key Takeaways
- Use \`npm ci\` instead of \`npm install\` in production deployments and CI/CD pipelines.
- Routinely execute \`npm audit\` to detect known CVE vulnerabilities in third-party packages.

## 5. Documentation & References
- [Semantic Versioning Specification (SemVer 2.0.0)](https://semver.org/)
- [npm Documentation](https://docs.npmjs.com/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Package Management, SemVer & Deterministic Lockfiles',
        video_duration: '19:40',
        videos: [
          { id: 'vid_m7_l4_1', title: 'Package.json, SemVer & npm ci Workflows', url: '/assets/sample-lesson.mp4', duration: '19:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l4_1', title: 'SemVer Versioning Specification', url: '/assets/course-art/art-04.jpg', caption: 'Major breaking changes vs Minor features vs Patch bugfixes.', alt: 'SemVer Matrix' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m7_l5',
        title: 'Building Command-Line Utilities and Script Automation with Node.js',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Author executable CLI tools with Node.js: the shebang (#!) line, parsing flags with node:util parseArgs, colored terminal output, handling exit codes (process.exit), and interactive prompts.',
        content: `# Building Command-Line Utilities and Script Automation with Node.js

## 1. Overview & Learning Objectives
Node.js is an exceptional platform for creating custom developer automation scripts and command-line tools. In this lesson, you will master:
- The executable shebang line: \`#!/usr/bin/env node\`.
- Parsing command-line arguments using native \`node:util parseArgs\`.
- Managing exit codes: \`process.exit(0)\` (success) vs \`process.exit(1)\` (failure).
- Handling signals: \`SIGINT\` (Ctrl+C) and \`SIGTERM\` for graceful shutdowns.

---

## 2. Production CLI Tool Implementation
\`\`\`javascript
#!/usr/bin/env node
import { parseArgs } from 'node:util';

// Configure CLI flags and options
const options = {
  port: { type: 'string', short: 'p', default: '8080' },
  verbose: { type: 'boolean', short: 'v', default: false },
  help: { type: 'boolean', short: 'h', default: false }
};

try {
  const { values, positionals } = parseArgs({ options, allowPositionals: true });

  if (values.help) {
    console.log(\`
Usage: redkross-cli [command] [options]
Options:
  -p, --port <number>    Target port (default: 8080)
  -v, --verbose          Enable debug logging
  -h, --help             Show this help screen
    \`);
    process.exit(0);
  }

  console.log(\`[START] RedKross Security Gateway starting on Port \${values.port}...\`);
  if (values.verbose) console.log('Positional arguments received:', positionals);
  process.exit(0);
} catch (err) {
  console.error('[ERROR]', err.message);
  process.exit(1);
}
\`\`\`

---

## 3. Key Takeaways
- Always return exit code 0 on successful script completion, and non-zero (e.g. 1) on error so CI/CD pipelines can catch failures.
- Register \`process.on('SIGTERM', ...)\` to close active database connections gracefully before process termination.

## 4. Documentation & References
- [Node.js util.parseArgs Documentation](https://nodejs.org/api/util.html#utilparseargsoptions)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'CLI Tooling & Developer Automation with Node.js',
        video_duration: '20:10',
        videos: [
          { id: 'vid_m7_l5_1', title: 'Building CLI Tools with Node.js', url: '/assets/sample-lesson.mp4', duration: '20:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l5_1', title: 'CLI Process Lifecycle & Exit Codes', url: '/assets/course-art/art-05.jpg', caption: 'Argument parsing, execution pipeline, and signal handling.', alt: 'CLI Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m7_l6',
        title: 'Debugging Node.js Applications, Error Handling Best Practices & Profiling',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Debug Node.js services like a senior engineer: attaching Chrome DevTools via node --inspect, operational vs programmer errors, custom error classes, and memory profiling.',
        content: `# Debugging Node.js Applications, Error Handling Best Practices & Profiling

## 1. Overview & Learning Objectives
Server crashes in production damage business operations. In this lesson, you will master:
- Attaching Chrome DevTools to a live Node.js process using \`node --inspect\`.
- The distinction between **Operational Errors** (network timeout, invalid input) vs **Programmer Errors** (syntax bug, null reference).
- Subclassing \`Error\` to create structured, operational custom errors.
- Handling unhandled rejections and uncaught exceptions gracefully.

---

## 2. Structured Operational Error Hierarchy
\`\`\`javascript
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational; // Marks error as expected operational failure
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}
\`\`\`

---

## 3. Remote Debugging with --inspect
Start your Node server with the inspector flag:
\`\`\`bash
node --inspect-brk server.js
\`\`\`
Then open Chrome and navigate to \`chrome://inspect\`. You can set breakpoints, inspect active call stacks, monitor memory allocations, and profile CPU usage directly inside Chrome DevTools!

---

## 4. Key Takeaways
- Operational errors should be caught and transformed into appropriate HTTP status codes (400, 401, 404).
- Programmer errors (bugs) should trigger an alert, close active connections, and let the process manager (PM2 / Docker) restart the service clean.

## 5. Documentation & References
- [Node.js Error Handling Best Practices Guide](https://nodejs.org/en/learn/diagnostics/error-handling)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Node.js Debugging, Chrome Inspector & Error Architecture',
        video_duration: '21:40',
        videos: [
          { id: 'vid_m7_l6_1', title: 'Node.js Debugging, Profiling & Error Classes', url: '/assets/sample-lesson.mp4', duration: '21:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m7_l6_1', title: 'Error Handling Decision Tree', url: '/assets/course-art/art-06.jpg', caption: 'Operational errors handled gracefully vs programmer errors triggering process restart.', alt: 'Error Tree Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m7',
      title: 'Module 7: Node.js Fundamentals - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m7_1',
          text: 'Which underlying C++ library provides the event loop, cross-platform asynchronous I/O, and the default worker thread pool in Node.js?',
          options: [
            { id: 'opt_1', text: 'libuv', is_correct: true },
            { id: 'opt_2', text: 'OpenSSL', is_correct: false },
            { id: 'opt_3', text: 'Google V8', is_correct: false },
            { id: 'opt_4', text: 'cURL', is_correct: false }
          ],
          explanation: 'libuv is the multi-platform C library that powers the Node.js event loop, asynchronous socket abstraction, and thread pool.'
        },
        {
          id: 'q_m7_2',
          text: 'By default, how many worker threads are allocated in the libuv thread pool for handling filesystem and DNS operations?',
          options: [
            { id: 'opt_1', text: '1 thread', is_correct: false },
            { id: 'opt_2', text: '4 threads (configurable via UV_THREADPOOL_SIZE)', is_correct: true },
            { id: 'opt_3', text: '16 threads', is_correct: false },
            { id: 'opt_4', text: 'Unlimited threads', is_correct: false }
          ],
          explanation: 'libuv defaults to a pool of 4 worker threads, which can be tuned using the UV_THREADPOOL_SIZE environment variable.'
        },
        {
          id: 'q_m7_3',
          text: 'Why should you avoid using synchronous filesystem methods (such as fs.readFileSync) in a production web server?',
          options: [
            { id: 'opt_1', text: 'They block the single Node.js main thread entirely, preventing all other concurrent requests from being processed until the disk read finishes.', is_correct: true },
            { id: 'opt_2', text: 'They corrupt the hard drive.', is_correct: false },
            { id: 'opt_3', text: 'They cannot read JSON files.', is_correct: false },
            { id: 'opt_4', text: 'They only work on Linux operating systems.', is_correct: false }
          ],
          explanation: 'Because Node.js runs on a single main thread for JavaScript execution, synchronous calls block that thread and freeze all concurrent user requests.'
        },
        {
          id: 'q_m7_4',
          text: 'What Node.js core module is specifically designed to safely handle and normalize file and directory paths across different operating systems?',
          options: [
            { id: 'opt_1', text: 'node:path', is_correct: true },
            { id: 'opt_2', text: 'node:url', is_correct: false },
            { id: 'opt_3', text: 'node:os', is_correct: false },
            { id: 'opt_4', text: 'node:filesystem', is_correct: false }
          ],
          explanation: 'node:path provides utilities for working with file and directory paths, resolving Windows backslash and POSIX slash discrepancies.'
        },
        {
          id: 'q_m7_5',
          text: 'What is the primary architectural advantage of using Node.js Streams to process large 10GB files instead of fs.readFile?',
          options: [
            { id: 'opt_1', text: 'Streams read the file in discrete chunks, maintaining a low, constant memory footprint (<30MB) instead of buffering the entire 10GB into RAM.', is_correct: true },
            { id: 'opt_2', text: 'Streams automatically compress all data with AES-256 encryption.', is_correct: false },
            { id: 'opt_3', text: 'Streams do not require an operating system.', is_correct: false },
            { id: 'opt_4', text: 'Streams write directly to the GPU.', is_correct: false }
          ],
          explanation: 'Streams process data piece by piece (chunks) as it arrives, avoiding JavaScript heap out of memory crashes when handling massive files.'
        },
        {
          id: 'q_m7_6',
          text: 'What stream phenomenon occurs when a data producer (Readable stream) generates data faster than the destination consumer (Writable stream) can process it?',
          options: [
            { id: 'opt_1', text: 'Backpressure', is_correct: true },
            { id: 'opt_2', text: 'Heap thrashing', is_correct: false },
            { id: 'opt_3', text: 'Socket starvation', is_correct: false },
            { id: 'opt_4', text: 'Buffer overflow exception', is_correct: false }
          ],
          explanation: 'Backpressure occurs when data builds up because the reader is faster than the writer; stream.pipeline handles this by pausing the reader until the buffer drains.'
        },
        {
          id: 'q_m7_7',
          text: 'Which SemVer version constraint in package.json permits automatic updates to newer Minor and Patch versions, but rejects breaking Major changes (e.g. allows 2.5.0 but blocks 3.0.0)?',
          options: [
            { id: 'opt_1', text: '^2.4.1 (Caret)', is_correct: true },
            { id: 'opt_2', text: '~2.4.1 (Tilde)', is_correct: false },
            { id: 'opt_3', text: '=2.4.1 (Exact)', is_correct: false },
            { id: 'opt_4', text: '* (Wildcard)', is_correct: false }
          ],
          explanation: 'The caret (^) allows updates that do not modify the left-most non-zero digit (e.g. ^2.4.1 permits anything < 3.0.0).'
        },
        {
          id: 'q_m7_8',
          text: 'Why should npm ci (Clean Install) be used in production CI/CD pipelines instead of npm install?',
          options: [
            { id: 'opt_1', text: 'npm ci strictly installs the exact versions locked in package-lock.json and fails if the lockfile and package.json are out of sync.', is_correct: true },
            { id: 'opt_2', text: 'npm ci downloads packages without an internet connection.', is_correct: false },
            { id: 'opt_3', text: 'npm ci automatically upgrades all packages to latest.', is_correct: false },
            { id: 'opt_4', text: 'npm ci compiles JavaScript into C++.', is_correct: false }
          ],
          explanation: 'npm ci provides deterministic, reproducible builds by bypassing package.json resolution and installing exactly what is recorded in package-lock.json.'
        },
        {
          id: 'q_m7_9',
          text: 'What line must be placed at the very top of a Node.js script file to make it directly executable from a Unix terminal without typing node script.js?',
          options: [
            { id: 'opt_1', text: '#!/usr/bin/env node (The Shebang line)', is_correct: true },
            { id: 'opt_2', text: '// @node-executable', is_correct: false },
            { id: 'opt_3', text: 'use node;', is_correct: false },
            { id: 'opt_4', text: '<script type="node">', is_correct: false }
          ],
          explanation: 'The shebang (#!/usr/bin/env node) directs the operating system program loader to execute the file using the node binary found in the environment PATH.'
        },
        {
          id: 'q_m7_10',
          text: 'What exit code should a Node.js script return to the operating system upon detecting an unrecoverable error so that automated build pipelines fail?',
          options: [
            { id: 'opt_1', text: 'process.exit(0)', is_correct: false },
            { id: 'opt_2', text: 'process.exit(1) (or any non-zero integer)', is_correct: true },
            { id: 'opt_3', text: 'process.kill()', is_correct: false },
            { id: 'opt_4', text: 'process.pause()', is_correct: false }
          ],
          explanation: 'In Unix/POSIX and Windows systems, exit code 0 indicates success, whereas non-zero exit codes (like 1) indicate an error condition.'
        },
        {
          id: 'q_m7_11',
          text: 'What flag starts a Node.js application with the V8 inspector enabled, allowing Chrome DevTools to connect for live breakpoint debugging?',
          options: [
            { id: 'opt_1', text: 'node --inspect server.js', is_correct: true },
            { id: 'opt_2', text: 'node --debug-mode server.js', is_correct: false },
            { id: 'opt_3', text: 'node --devtools server.js', is_correct: false },
            { id: 'opt_4', text: 'node --trace server.js', is_correct: false }
          ],
          explanation: 'node --inspect activates the debugging agent listening on a local port (default 9229), allowing Chrome DevTools to attach.'
        },
        {
          id: 'q_m7_12',
          text: 'What class in the node:events module provides the publish-subscribe pattern used across Node.js servers?',
          options: [
            { id: 'opt_1', text: 'EventEmitter', is_correct: true },
            { id: 'opt_2', text: 'EventTarget', is_correct: false },
            { id: 'opt_3', text: 'EventBus', is_correct: false },
            { id: 'opt_4', text: 'BroadcastHub', is_correct: false }
          ],
          explanation: 'The EventEmitter class is Node.js\'s core publisher-subscriber implementation, exposing .on(event, listener) and .emit(event, data).'
        },
        {
          id: 'q_m7_13',
          text: 'What is the modern recommended utility to compose readable, transform, and writable streams with automatic error and backpressure handling?',
          options: [
            { id: 'opt_1', text: 'pipeline from node:stream/promises', is_correct: true },
            { id: 'opt_2', text: 'stream.pipe()', is_correct: false },
            { id: 'opt_3', text: 'stream.concat()', is_correct: false },
            { id: 'opt_4', text: 'stream.link()', is_correct: false }
          ],
          explanation: 'stream.pipeline properly forwards errors, cleans up stream handles on failures, and prevents memory leaks associated with raw .pipe().'
        },
        {
          id: 'q_m7_14',
          text: 'What is the primary difference between Operational Errors and Programmer Errors in Node.js server architectures?',
          options: [
            { id: 'opt_1', text: 'Operational errors are expected runtime conditions (like invalid input or network failure) that must be handled gracefully; programmer errors are software bugs (like calling undefined as a function) that require fixing.', is_correct: true },
            { id: 'opt_2', text: 'Operational errors only happen on Windows.', is_correct: false },
            { id: 'opt_3', text: 'Programmer errors are automatically fixed by Node.js.', is_correct: false },
            { id: 'opt_4', text: 'There is no difference.', is_correct: false }
          ],
          explanation: 'Operational errors represent known failure states in a functioning system; programmer errors are genuine bugs in the codebase.'
        },
        {
          id: 'q_m7_15',
          text: 'What object in Node.js represents a fixed-length sequence of raw binary memory allocated outside the V8 JavaScript heap?',
          options: [
            { id: 'opt_1', text: 'Buffer', is_correct: true },
            { id: 'opt_2', text: 'BinaryArray', is_correct: false },
            { id: 'opt_3', text: 'MemoryChunk', is_correct: false },
            { id: 'opt_4', text: 'ByteStream', is_correct: false }
          ],
          explanation: 'The Buffer class provides instances designed to handle raw binary data directly, allocated in unmanaged memory outside the V8 heap.'
        },
        {
          id: 'q_m7_16',
          text: 'What is the purpose of path.resolve() compared to path.join() in node:path?',
          options: [
            { id: 'opt_1', text: 'path.resolve() processes sequence of paths from right to left until an absolute path is constructed; path.join() simply concatenates path segments.', is_correct: true },
            { id: 'opt_2', text: 'path.resolve() deletes the file.', is_correct: false },
            { id: 'opt_3', text: 'path.join() only works on URLs.', is_correct: false },
            { id: 'opt_4', text: 'They are completely identical functions.', is_correct: false }
          ],
          explanation: 'path.resolve creates an absolute path using the current working directory, whereas path.join joins segments using the platform separator.'
        },
        {
          id: 'q_m7_17',
          text: 'Which process event should be monitored to detect unhandled asynchronous Promise rejections across a Node application?',
          options: [
            { id: 'opt_1', text: 'process.on("unhandledRejection", (reason, promise) => { ... })', is_correct: true },
            { id: 'opt_2', text: 'process.on("promiseCrash")', is_correct: false },
            { id: 'opt_3', text: 'process.on("errorCatch")', is_correct: false },
            { id: 'opt_4', text: 'process.on("failedAsync")', is_correct: false }
          ],
          explanation: 'The unhandledRejection event is emitted whenever a Promise is rejected and no error handler is attached to the promise within a turn of the event loop.'
        },
        {
          id: 'q_m7_18',
          text: 'What happens when process.on("SIGINT", callback) is registered in a Node.js server application?',
          options: [
            { id: 'opt_1', text: 'It intercepts the user pressing Ctrl+C in the terminal, allowing the server to close active database connections gracefully before shutting down.', is_correct: true },
            { id: 'opt_2', text: 'It reboots the server host computer.', is_correct: false },
            { id: 'opt_3', text: 'It prevents the server from ever stopping.', is_correct: false },
            { id: 'opt_4', text: 'It increases the CPU clock rate.', is_correct: false }
          ],
          explanation: 'SIGINT is the terminal interrupt signal. Listening to it lets you run graceful shutdown procedures (closing DB pools, draining sockets) before exiting.'
        },
        {
          id: 'q_m7_19',
          text: 'What native Node.js module provides access to operating system information such as free memory, host CPUs, and network interfaces?',
          options: [
            { id: 'opt_1', text: 'node:os', is_correct: true },
            { id: 'opt_2', text: 'node:system', is_correct: false },
            { id: 'opt_3', text: 'node:hardware', is_correct: false },
            { id: 'opt_4', text: 'node:kernel', is_correct: false }
          ],
          explanation: 'The node:os module provides operating system-related utility methods and properties (os.cpus(), os.freemem(), os.uptime()).'
        },
        {
          id: 'q_m7_20',
          text: 'What is the purpose of npm audit command in Node.js project maintenance?',
          options: [
            { id: 'opt_1', text: 'It scans the project dependency tree against the public security advisory database to report known CVE vulnerabilities.', is_correct: true },
            { id: 'opt_2', text: 'It calculates developer working hours.', is_correct: false },
            { id: 'opt_3', text: 'It formats source code according to style rules.', is_correct: false },
            { id: 'opt_4', text: 'It minifies JavaScript files for distribution.', is_correct: false }
          ],
          explanation: 'npm audit submits the dependency graph to the npm security registry to detect vulnerable package versions and suggest remediations.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 8: Express.js & REST API Development (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_8',
    title: 'Module 8: Express.js & REST API Development',
    description: 'Build enterprise RESTful microservices with Express.js: routing, custom middleware chains, request validation with Zod, multipart file uploads with Multer, error handling pipelines, and OpenAPI documentation.',
    order: 8,
    assignment: {
      id: 'asg_m8',
      title: 'Practical Assignment: Production RESTful Course & Cadet Management API',
      objective: 'Develop a secure, modular REST API server using Express.js implementing full CRUD operations, Zod schema validation middleware, and global error handling.',
      requirements: [
        'Implement standardized REST endpoints for courses (/api/courses) and cadets (/api/cadets) with proper HTTP verbs (GET, POST, PUT, DELETE).',
        'Create a reusable Zod schema validation middleware function that validates req.body, req.query, and req.params, returning structured 400 Bad Request responses.',
        'Implement a global 4-parameter error-handling middleware function (err, req, res, next) that masks internal stack traces in production.',
        'Support multipart form file upload using Multer with file type filtering (images/PDFs only) and size constraints (5MB max).',
        'Write an integration test suite verifying status codes (200, 201, 400, 404, 500).'
      ],
      instructions: '1. Create server.js with Express. 2. Implement routes, middleware, and Zod schemas. 3. Test with Postman or Supertest. 4. Submit API code and test output.',
      expected_outcome: 'A production-grade REST API server exhibiting clean separation of concerns and robust error management.'
    },
    lessons: [
      {
        id: 'les_m8_l1',
        title: 'Introduction to Express.js: Server Setup, Routing & Request Lifecycle',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Build your first Express server: initializing express(), routing requests by HTTP method and path, parsing JSON payloads with express.json(), and organizing route modules.',
        content: `# Introduction to Express.js: Server Setup, Routing & Request Lifecycle

## 1. Overview & Learning Objectives
Express is a fast, unopinionated, minimalist web framework for Node.js. In this lesson, you will master:
- Initializing an Express HTTP application server.
- The anatomy of the Express Request (\`req\`) and Response (\`res\`) objects.
- Routing fundamentals: matching HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`) and URL endpoints.
- Modular route organization using \`express.Router()\`.

---

## 2. Express Server Scaffold
\`\`\`javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

// Built-in middleware to parse incoming JSON payloads
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'HEALTHY', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`[EXPRESS] Security gateway listening on port \${PORT}\`);
});
\`\`\`

---

## 3. Modular Routing with express.Router()
Never dump 50 route definitions in a single file. Modularize with routers:

\`\`\`javascript
// routes/courseRoutes.js
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ courses: [] });
});

router.post('/', (req, res) => {
  const { title } = req.body;
  res.status(201).json({ message: 'Course created', title });
});

export default router;
\`\`\`

Mounting in main server:
\`\`\`javascript
// server.js
import courseRoutes from './routes/courseRoutes.js';
app.use('/api/courses', courseRoutes);
\`\`\`

---

## 4. Key Takeaways
- Always register \`express.json()\` middleware before your route definitions to enable \`req.body\` parsing.
- Modularize routes using \`express.Router()\` for clean separation of concerns.

## 5. Documentation & References
- [Express.js Official Documentation](https://expressjs.com/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Express.js Fundamentals, Server Setup & Routing',
        video_duration: '21:10',
        videos: [
          { id: 'vid_m8_l1_1', title: 'Express.js Architecture & Routing Walkthrough', url: '/assets/sample-lesson.mp4', duration: '21:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l1_1', title: 'Express Request-Response Lifecycle', url: '/assets/course-art/art-07.jpg', caption: 'Client request -> Middleware pipeline -> Route Handler -> JSON response.', alt: 'Express Request Flow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l2',
        title: 'Express Middleware Architecture: Custom, Third-Party, and Error-Handling Middleware',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Master the middleware pattern: request-response cycle pipeline, calling next(), writing logging/auth middleware, third-party packages (cors, morgan), and 4-parameter error handlers.',
        content: `# Express Middleware Architecture: Custom, Third-Party, and Error-Handling Middleware

## 1. Overview & Learning Objectives
Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the \`next\` function in the application’s request-response cycle. In this lesson, you will master:
- The middleware execution chain and calling \`next()\`.
- Custom request timing and logging middleware.
- Third-party middleware: \`cors\`, \`helmet\`, \`morgan\`.
- The special 4-parameter **Global Error Handling Middleware** (\`err, req, res, next\`).

---

## 2. Custom Middleware Chain Example
\`\`\`javascript
// Custom Request Timing & Logging Middleware
export function requestLogger(req, res, next) {
  const startTime = Date.now();

  // Intercept the finish event to compute latency
  res.on('finish', () => {
    const elapsed = Date.now() - startTime;
    console.log(\`[\${req.method}] \${req.originalUrl} -> \${res.statusCode} (\${elapsed}ms)\`);
  });

  // Pass control to the next middleware in the stack
  next();
}
\`\`\`

---

## 3. Global Error Handling Middleware
Express recognizes error-handling middleware specifically by having **four arguments**:

\`\`\`javascript
// Global Error Handler (must be registered AFTER all routes!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== 'production';

  console.error('[UNHANDLED ERROR]', err);

  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
      // Never leak internal stack traces to public visitors in production!
      stack: isDev ? err.stack : undefined
    }
  });
});
\`\`\`

---

## 4. Key Takeaways
- If a middleware does not end the request-response cycle (e.g. via \`res.json()\`), it **must** call \`next()\` to prevent requests from hanging indefinitely.
- Global error-handling middleware must declare all 4 parameters: \`(err, req, res, next)\`.

## 5. Documentation & References
- [Express.js Using Middleware](https://expressjs.com/en/guide/using-middleware.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Express Middleware Architecture & Global Error Pipelines',
        video_duration: '23:30',
        videos: [
          { id: 'vid_m8_l2_1', title: 'Middleware Chains, next() & Error Handlers', url: '/assets/sample-lesson.mp4', duration: '23:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l2_1', title: 'Middleware Pipeline Execution Stack', url: '/assets/course-art/art-08.jpg', caption: 'Sequential traversal of middleware functions via next() triggers.', alt: 'Middleware Stack Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l3',
        title: 'Designing RESTful APIs: HTTP Verbs, Status Codes & Resource URI Conventions',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Design industry-standard RESTful APIs: resource-oriented URI naming, correct HTTP method mappings (GET, POST, PUT, PATCH, DELETE), idempotent vs non-idempotent calls, and status code precision.',
        content: `# Designing RESTful APIs: HTTP Verbs, Status Codes & Resource URI Conventions

## 1. Overview & Learning Objectives
REST (Representational State Transfer) is an architectural style for networked hypermedia systems. In this lesson, you will master:
- Resource-oriented URI naming: Plural nouns (\`/api/courses\`), avoiding verbs in paths.
- HTTP Verb semantics: \`GET\` (Read), \`POST\` (Create), \`PUT\` (Replace), \`PATCH\` (Update), \`DELETE\` (Remove).
- **Idempotence**: Why \`GET\`, \`PUT\`, \`DELETE\` are idempotent, while \`POST\` is not.
- Accurate HTTP Status Code selection (200, 201, 204, 400, 401, 403, 404, 409, 500).

---

## 2. Standard RESTful Resource Design Matrix
| Endpoint | Method | Idempotent | Description | Success Status |
|---|---|---|---|---|
| \`/api/courses\` | \`GET\` | Yes | List courses with filtering/pagination | \`200 OK\` |
| \`/api/courses\` | \`POST\` | No | Create a new course entity | \`201 Created\` |
| \`/api/courses/:id\` | \`GET\` | Yes | Retrieve single course by ID | \`200 OK\` |
| \`/api/courses/:id\` | \`PUT\` | Yes | Completely replace course entity | \`200 OK\` |
| \`/api/courses/:id\` | \`PATCH\` | No* | Partially update specific course fields | \`200 OK\` |
| \`/api/courses/:id\` | \`DELETE\` | Yes | Delete course and cascade children | \`204 No Content\` |

---

## 3. Key Takeaways
- Use nouns, not verbs, in URI paths (e.g. \`POST /api/courses\` instead of \`POST /api/createCourse\`).
- Return \`201 Created\` with the created resource upon entity creation, and \`204 No Content\` on successful deletion.

## 4. Documentation & References
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'RESTful API Architecture & HTTP Status Code Mastery',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m8_l3_1', title: 'RESTful Resource Design & Status Codes', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l3_1', title: 'REST Resource URI Architecture', url: '/assets/course-art/art-09.jpg', caption: 'Plural nouns, nesting sub-resources, and HTTP method mappings.', alt: 'REST Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l4',
        title: 'Request Body Parsing, Query Parameters, URL Route Parameters & Header Validation',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Extract and sanitize incoming client data: route params (req.params), URL search query parameters (req.query), parsed JSON bodies (req.body), and HTTP headers (req.headers).',
        content: `# Request Body Parsing, Query Parameters, URL Route Parameters & Header Validation

## 1. Overview & Learning Objectives
Express provides distinct namespaces for incoming request components. In this lesson, you will master:
- \`req.params\`: Route parameters (e.g. \`/api/courses/:courseId/modules/:moduleId\`).
- \`req.query\`: URL search query strings (e.g. \`/api/courses?category=defense&limit=10\`).
- \`req.body\`: Parsed JSON payload submitted with POST/PUT/PATCH requests.
- \`req.headers\`: Reading authorization headers, API keys, and content types.

---

## 2. Parameter Extraction Code Example
\`\`\`javascript
router.get('/courses/:slug', (req, res) => {
  // 1. Route Parameter
  const { slug } = req.params;

  // 2. Query Parameters (Pagination & Filtering)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  // 3. Request Headers
  const authHeader = req.headers.authorization;
  if (authHeader && !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Malformed Authorization header format' });
  }

  res.json({ slug, page, limit, authorized: Boolean(authHeader) });
});
\`\`\`

---

## 3. Key Takeaways
- All values in \`req.params\` and \`req.query\` are strings; always parse numbers with \`parseInt()\` or schema validation before mathematical operations.
- Always sanitize inputs before querying databases to prevent injection attacks.

## 4. Documentation & References
- [Express.js Request Object Reference](https://expressjs.com/en/api.html#req)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Request Parsing: Params, Query Strings & Headers',
        video_duration: '19:30',
        videos: [
          { id: 'vid_m8_l4_1', title: 'Request Object Deep Dive: Params, Query & Body', url: '/assets/sample-lesson.mp4', duration: '19:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l4_1', title: 'Express Request Object Decomposition', url: '/assets/course-art/art-10.jpg', caption: 'Decomposing URL path, query params, headers, and body.', alt: 'Request Decomposition' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l5',
        title: 'Input Sanitization and Schema Validation using Zod / Joi',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Enforce type-safe request validation with Zod: defining schemas, validating req.body/params/query in middleware, transforming data, and returning structured validation error responses.',
        content: `# Input Sanitization and Schema Validation using Zod / Joi

## 1. Overview & Learning Objectives
Never trust client input. Unvalidated input is the root cause of SQL injection, NoSQL injection, and application crashes. In this lesson, you will master:
- Schema declaration with **Zod** (TypeScript-first schema validation).
- Building reusable Express validation middleware.
- Sanitizing strings, coercing numbers, and validating complex regex patterns.
- Returning uniform \`400 Bad Request\` error responses with granular field diagnostics.

---

## 2. Reusable Zod Validation Middleware
\`\`\`javascript
import { z } from 'zod';

// Define Validation Schema for Course Creation
export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(120),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    category: z.enum(['Frontend', 'Backend', 'Full Stack', 'DevOps']),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    price: z.number().nonnegative(),
    modulesCount: z.number().int().min(1)
  })
});

// Generic Validation Middleware Wrapper
export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'VALIDATION_FAILED',
        details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }
    next(error);
  }
};
\`\`\`

---

## 3. Usage in Routes
\`\`\`javascript
router.post('/courses', validate(createCourseSchema), (req, res) => {
  // Guaranteed valid and type-safe!
  res.status(201).json({ success: true, course: req.body });
});
\`\`\`

---

## 4. Key Takeaways
- Schema validation acts as a defensive perimeter; invalid requests never reach database queries or business logic.
- Zod parses and sanitizes inputs, stripping unexpected injected properties automatically.

## 5. Documentation & References
- [Zod Official Documentation](https://zod.dev/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Type-Safe Input Validation with Zod & Express',
        video_duration: '21:50',
        videos: [
          { id: 'vid_m8_l5_1', title: 'Zod Validation Middleware & Input Sanitization', url: '/assets/sample-lesson.mp4', duration: '21:50', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l5_1', title: 'Defensive Schema Validation Gate', url: '/assets/course-art/art-01.jpg', caption: 'Incoming request parsed against Zod schema before controller execution.', alt: 'Validation Pipeline Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l6',
        title: 'File Uploads and Multipart Form Handling using Multer',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Accept file uploads safely in Node.js: multipart/form-data encoding, Multer storage engines (DiskStorage, MemoryStorage), file size limits, and MIME type validation.',
        content: `# File Uploads and Multipart Form Handling using Multer

## 1. Overview & Learning Objectives
JSON bodies cannot handle raw binary files efficiently. File uploads require \`multipart/form-data\` encoding. In this lesson, you will master:
- Multipart form encoding mechanics.
- Configuring **Multer** storage engines (\`diskStorage\` vs \`memoryStorage\`).
- Validating file extensions and MIME types defensively.
- Preventing Denial of Service (DoS) attacks with strict file size limits.

---

## 2. Secure Multer Configuration
\`\`\`javascript
import multer from 'multer';
import path from 'node:path';

// 1. Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/assignments');
  },
  filename: (req, file, cb) => {
    // Generate collision-proof unique filename
    const uniqueSuffix = \`\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, \`cadet-submission-\${uniqueSuffix}\${ext}\`);
  }
});

// 2. MIME Type Filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type: Only PDF, PNG, and JPEG documents are permitted'), false);
  }
};

// 3. Initialize Multer with 5MB limit
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 Megabytes Max
});
\`\`\`

---

## 3. Handling File Uploads in Routes
\`\`\`javascript
router.post('/assignments/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(201).json({
    message: 'Assignment submitted successfully',
    fileName: req.file.filename,
    fileSize: req.file.size
  });
});
\`\`\`

---

## 4. Key Takeaways
- Always enforce strict \`limits.fileSize\` to protect against disk exhaustion attacks.
- Never trust client-provided file extensions alone; verify MIME types and inspect file header magic bytes when possible.

## 5. Documentation & References
- [Multer GitHub Documentation](https://github.com/expressjs/multer)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Multipart File Uploads & Security with Multer',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m8_l6_1', title: 'File Uploads, Multer & Storage Engines', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l6_1', title: 'Multipart Form Data Stream Flow', url: '/assets/course-art/art-02.jpg', caption: 'Multipart boundary stream parsing and file storage on disk.', alt: 'Multipart Upload Flow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m8_l7',
        title: 'API Documentation with Swagger / OpenAPI & Postman Testing Suites',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Document and test REST APIs professionally: OpenAPI 3.0 specifications, Swagger UI middleware integration, automated Postman test scripts, and contract-driven development.',
        content: `# API Documentation with Swagger / OpenAPI & Postman Testing Suites

## 1. Overview & Learning Objectives
Undocumented APIs are unusable APIs. In this lesson, you will master:
- The OpenAPI 3.0 specification format (YAML / JSON).
- Serving interactive Swagger documentation via \`swagger-ui-express\`.
- Contract-driven development: Aligning frontend expectations with backend schemas.
- Automated API test assertions in Postman.

---

## 2. Swagger UI Integration in Express
\`\`\`javascript
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'RedKross Academy Full Stack API',
    version: '1.0.0',
    description: 'Enterprise REST API specification for course curriculum and cadet certification.'
  },
  paths: {
    '/api/courses': {
      get: {
        summary: 'Retrieve all active courses',
        responses: {
          200: {
            description: 'List of courses returned successfully'
          }
        }
      }
    }
  }
};

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
\`\`\`

---

## 3. Postman Automated Test Script Example
\`\`\`javascript
// Postman Tests tab for GET /api/courses
pm.test("Status code is 200 OK", function () {
  pm.response.to.have.status(200);
});

pm.test("Response contains courses array", function () {
  const jsonData = pm.response.json();
  pm.expect(jsonData.courses).to.be.an("array");
});
\`\`\`

---

## 4. Key Takeaways
- Interactive Swagger docs allow frontend engineers to test endpoints in their browser without inspecting backend code.
- Automated API test suites ensure no endpoint regressions occur when new features are added.

## 5. Documentation & References
- [OpenAPI Specification 3.0](https://swagger.io/specification/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'OpenAPI 3.0, Swagger UI & Automated Postman Testing',
        video_duration: '19:45',
        videos: [
          { id: 'vid_m8_l7_1', title: 'API Documentation with Swagger & OpenAPI', url: '/assets/sample-lesson.mp4', duration: '19:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m8_l7_1', title: 'OpenAPI Specification Contract', url: '/assets/course-art/art-03.jpg', caption: 'Swagger UI interactive documentation and schema contract definition.', alt: 'OpenAPI Blueprint' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m8',
      title: 'Module 8: Express.js & REST API Development - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m8_1',
          text: 'What middleware function must be mounted in Express to parse incoming JSON request payloads into req.body?',
          options: [
            { id: 'opt_1', text: 'app.use(express.json())', is_correct: true },
            { id: 'opt_2', text: 'app.use(express.static())', is_correct: false },
            { id: 'opt_3', text: 'app.use(express.urlencoded())', is_correct: false },
            { id: 'opt_4', text: 'app.use(bodyParser.raw())', is_correct: false }
          ],
          explanation: 'express.json() is the built-in middleware based on body-parser that parses incoming requests with JSON payloads.'
        },
        {
          id: 'q_m8_2',
          text: 'How does Express identify a global error-handling middleware function compared to regular middleware?',
          options: [
            { id: 'opt_1', text: 'It has exactly 4 parameters: (err, req, res, next)', is_correct: true },
            { id: 'opt_2', text: 'It is registered with app.error()', is_correct: false },
            { id: 'opt_3', text: 'It must be written in TypeScript', is_correct: false },
            { id: 'opt_4', text: 'It returns an Error instance', is_correct: false }
          ],
          explanation: 'Express inspects function.length; error-handling middleware is defined with four arguments (err, req, res, next).'
        },
        {
          id: 'q_m8_3',
          text: 'What HTTP status code should be returned when a new resource is successfully created via a POST request?',
          options: [
            { id: 'opt_1', text: '200 OK', is_correct: false },
            { id: 'opt_2', text: '201 Created', is_correct: true },
            { id: 'opt_3', text: '204 No Content', is_correct: false },
            { id: 'opt_4', text: '304 Not Modified', is_correct: false }
          ],
          explanation: 'HTTP status code 201 Created indicates that the request has succeeded and led to the creation of a new resource.'
        },
        {
          id: 'q_m8_4',
          text: 'What is an Idempotent HTTP method in REST architecture?',
          options: [
            { id: 'opt_1', text: 'A method where multiple identical requests have the exact same side effect on server state as a single request (e.g. GET, PUT, DELETE).', is_correct: true },
            { id: 'opt_2', text: 'A method that executes in under 1 millisecond.', is_correct: false },
            { id: 'opt_3', text: 'A method that requires no authorization.', is_correct: false },
            { id: 'opt_4', text: 'A method that only transmits XML payloads.', is_correct: false }
          ],
          explanation: 'An HTTP method is idempotent if the intended effect on the server of making multiple identical requests is the same as making a single request.'
        },
        {
          id: 'q_m8_5',
          text: 'What occurs if an Express middleware function neither sends a response nor calls next()?',
          options: [
            { id: 'opt_1', text: 'The client HTTP request hangs indefinitely until it eventually hits a network timeout.', is_correct: true },
            { id: 'opt_2', text: 'Express automatically returns a 404 Not Found error.', is_correct: false },
            { id: 'opt_3', text: 'The operating system restarts Node.js.', is_correct: false },
            { id: 'opt_4', text: 'The request is routed to Google DNS.', is_correct: false }
          ],
          explanation: 'Because Express executes middleware in sequence, failing to call next() or send a response halts the cycle, leaving the socket hanging.'
        },
        {
          id: 'q_m8_6',
          text: 'Where are dynamic URL segments (e.g. /api/courses/:courseId) stored on the Express request object?',
          options: [
            { id: 'opt_1', text: 'req.params', is_correct: true },
            { id: 'opt_2', text: 'req.query', is_correct: false },
            { id: 'opt_3', text: 'req.body', is_correct: false },
            { id: 'opt_4', text: 'req.urlParts', is_correct: false }
          ],
          explanation: 'Route parameters are populated on req.params, mapped to the parameter names declared in the route path string.'
        },
        {
          id: 'q_m8_7',
          text: 'What HTTP status code signifies that client input failed schema validation (e.g. invalid email format)?',
          options: [
            { id: 'opt_1', text: '400 Bad Request', is_correct: true },
            { id: 'opt_2', text: '401 Unauthorized', is_correct: false },
            { id: 'opt_3', text: '403 Forbidden', is_correct: false },
            { id: 'opt_4', text: '500 Internal Server Error', is_correct: false }
          ],
          explanation: 'Status 400 Bad Request indicates that the server cannot process the request due to client error (such as malformed syntax or schema failure).'
        },
        {
          id: 'q_m8_8',
          text: 'What is the encoding type required for HTML forms and HTTP requests that upload binary files via Multer?',
          options: [
            { id: 'opt_1', text: 'multipart/form-data', is_correct: true },
            { id: 'opt_2', text: 'application/x-www-form-urlencoded', is_correct: false },
            { id: 'opt_3', text: 'application/json', is_correct: false },
            { id: 'opt_4', text: 'text/plain', is_correct: false }
          ],
          explanation: 'Multer is specifically designed to parse multipart/form-data requests, the standard format for file uploads.'
        },
        {
          id: 'q_m8_9',
          text: 'Why should stack traces be masked or removed from JSON error responses in production environments?',
          options: [
            { id: 'opt_1', text: 'Stack traces expose sensitive internal server directory paths, library versions, and database schemas to malicious adversaries.', is_correct: true },
            { id: 'opt_2', text: 'Stack traces slow down internet cables.', is_correct: false },
            { id: 'opt_3', text: 'Stack traces are illegal under W3C rules.', is_correct: false },
            { id: 'opt_4', text: 'Browsers cannot display JSON that contains newlines.', is_correct: false }
          ],
          explanation: 'Leaking stack traces in production aids attackers in footprinting internal systems, revealing file paths, code logic, and dependency vulnerabilities.'
        },
        {
          id: 'q_m8_10',
          text: 'Which HTTP method should be chosen to perform partial updates to an existing user profile rather than replacing the entire object?',
          options: [
            { id: 'opt_1', text: 'PATCH', is_correct: true },
            { id: 'opt_2', text: 'PUT', is_correct: false },
            { id: 'opt_3', text: 'POST', is_correct: false },
            { id: 'opt_4', text: 'GET', is_correct: false }
          ],
          explanation: 'PATCH applies partial modifications to a resource, while PUT replaces the entire resource document.'
        },
        {
          id: 'q_m8_11',
          text: 'How do you create an isolated, modular sub-router in Express that can be exported and mounted onto a base path?',
          options: [
            { id: 'opt_1', text: 'const router = express.Router()', is_correct: true },
            { id: 'opt_2', text: 'const router = express.createSubApp()', is_correct: false },
            { id: 'opt_3', text: 'const router = new express.Route()', is_correct: false },
            { id: 'opt_4', text: 'const router = express.Module()', is_correct: false }
          ],
          explanation: 'express.Router() creates a new router object that acts as a mini-application capable of handling middleware and routing.'
        },
        {
          id: 'q_m8_12',
          text: 'What HTTP status code is returned on successful DELETE operations where no payload body needs to be returned to the client?',
          options: [
            { id: 'opt_1', text: '204 No Content', is_correct: true },
            { id: 'opt_2', text: '200 OK', is_correct: false },
            { id: 'opt_3', text: '301 Moved Permanently', is_correct: false },
            { id: 'opt_4', text: '404 Not Found', is_correct: false }
          ],
          explanation: '204 No Content confirms that the request succeeded and there is no additional content to send in the response payload.'
        },
        {
          id: 'q_m8_13',
          text: 'What schema validation library provides first-class TypeScript inference and schema definitions like z.object({ title: z.string() })?',
          options: [
            { id: 'opt_1', text: 'Zod', is_correct: true },
            { id: 'opt_2', text: 'Lodash', is_correct: false },
            { id: 'opt_3', text: 'Axios', is_correct: false },
            { id: 'opt_4', text: 'Chalk', is_correct: false }
          ],
          explanation: 'Zod is a TypeScript-first schema declaration and validation library with static type inference.'
        },
        {
          id: 'q_m8_14',
          text: 'In URL query parameters like /api/courses?category=defense&limit=10, how does Express parse these values?',
          options: [
            { id: 'opt_1', text: 'As strings in the req.query object: { category: "defense", limit: "10" }', is_correct: true },
            { id: 'opt_2', text: 'As numbers and booleans automatically.', is_correct: false },
            { id: 'opt_3', text: 'Inside req.body.', is_correct: false },
            { id: 'opt_4', text: 'Inside req.params.', is_correct: false }
          ],
          explanation: 'Express parses URL query string parameters into the req.query object as string values.'
        },
        {
          id: 'q_m8_15',
          text: 'What third-party middleware sets security-related HTTP response headers (such as Content-Security-Policy, X-Frame-Options) automatically in Express?',
          options: [
            { id: 'opt_1', text: 'helmet', is_correct: true },
            { id: 'opt_2', text: 'cors', is_correct: false },
            { id: 'opt_3', text: 'morgan', is_correct: false },
            { id: 'opt_4', text: 'compression', is_correct: false }
          ],
          explanation: 'Helmet helps secure Express apps by setting various HTTP headers to defend against common web attacks.'
        },
        {
          id: 'q_m8_16',
          text: 'What Multer method should be passed as route middleware when expecting a single file upload in a field named avatar?',
          options: [
            { id: 'opt_1', text: 'upload.single("avatar")', is_correct: true },
            { id: 'opt_2', text: 'upload.array("avatar")', is_correct: false },
            { id: 'opt_3', text: 'upload.fields("avatar")', is_correct: false },
            { id: 'opt_4', text: 'upload.any()', is_correct: false }
          ],
          explanation: 'upload.single("fieldName") accepts a single file with the specified field name, saving it to req.file.'
        },
        {
          id: 'q_m8_17',
          text: 'Which HTTP status code signifies that a client must provide valid authentication credentials to access a protected endpoint?',
          options: [
            { id: 'opt_1', text: '401 Unauthorized', is_correct: true },
            { id: 'opt_2', text: '403 Forbidden', is_correct: false },
            { id: 'opt_3', text: '404 Not Found', is_correct: false },
            { id: 'opt_4', text: '405 Method Not Allowed', is_correct: false }
          ],
          explanation: '401 Unauthorized indicates that the request lacks valid authentication credentials.'
        },
        {
          id: 'q_m8_18',
          text: 'What is the role of Swagger UI in a modern REST API architecture?',
          options: [
            { id: 'opt_1', text: 'It renders an interactive visual web page from an OpenAPI specification where developers can inspect schemas and test endpoints live.', is_correct: true },
            { id: 'opt_2', text: 'It encrypts database tables.', is_correct: false },
            { id: 'opt_3', text: 'It balances incoming server traffic.', is_correct: false },
            { id: 'opt_4', text: 'It generates CSS stylesheets for web apps.', is_correct: false }
          ],
          explanation: 'Swagger UI generates visual, interactive documentation from an OpenAPI definition, enabling live API calls and schema review.'
        },
        {
          id: 'q_m8_19',
          text: 'What is the consequence of registering a global error handling middleware BEFORE route definitions in Express?',
          options: [
            { id: 'opt_1', text: 'The error handler will never intercept errors thrown in route handlers, because middleware executes in the exact order it is registered.', is_correct: true },
            { id: 'opt_2', text: 'Express throws a fatal compile error.', is_correct: false },
            { id: 'opt_3', text: 'All routes become uncallable.', is_correct: false },
            { id: 'opt_4', text: 'It makes the server run twice as fast.', is_correct: false }
          ],
          explanation: 'Express evaluates middleware in the sequence it is registered with app.use(). Error handlers must be mounted last to catch downstream errors.'
        },
        {
          id: 'q_m8_20',
          text: 'What HTTP status code is used when a client attempts to create an entity that already exists (e.g. duplicate email address)?',
          options: [
            { id: 'opt_1', text: '409 Conflict', is_correct: true },
            { id: 'opt_2', text: '400 Bad Request', is_correct: false },
            { id: 'opt_3', text: '404 Not Found', is_correct: false },
            { id: 'opt_4', text: '402 Payment Required', is_correct: false }
          ],
          explanation: '409 Conflict indicates that the request could not be processed because of conflict in the current state of the resource (such as unique constraint violation).'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 9: MongoDB & Database Management (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_9',
    title: 'Module 9: MongoDB & Database Management',
    description: 'Master modern NoSQL document databases with MongoDB and Mongoose: BSON document modeling, CRUD pipelines, indexing strategies, embedding vs referencing, Mongoose middleware, and complex Aggregation Pipelines.',
    order: 9,
    assignment: {
      id: 'asg_m9',
      title: 'Practical Assignment: High-Scale Course Management Data Architecture & Aggregation',
      objective: 'Design and implement a scalable MongoDB data model using Mongoose for a multi-tenant course platform, featuring indexing, referential population, and aggregation pipeline reporting.',
      requirements: [
        'Design normalized Mongoose schemas for Users, Courses, Modules, Lessons, and Enrolments with schema validation.',
        'Implement compound indexes on frequently queried fields (e.g. { course_id: 1, user_id: 1 }).',
        'Create a pre-save Mongoose middleware hook that automatically hashes passwords or generates URL-friendly slugs.',
        'Author an Aggregation Pipeline that computes: total enrolled students per course, average assessment completion scores, and active completion percentages.',
        'Benchmark query execution plans using explain("executionStats") verifying index utilization.'
      ],
      instructions: '1. Create models/Course.js, models/Enrolment.js. 2. Implement Mongoose aggregation pipeline. 3. Benchmark with explain(). 4. Submit schema code and aggregation queries.',
      expected_outcome: 'A production-grade MongoDB schema and aggregation engine achieving sub-10ms query execution times.'
    },
    lessons: [
      {
        id: 'les_m9_l1',
        title: 'Introduction to NoSQL Databases & MongoDB Document Data Model',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore NoSQL architecture: SQL relational tables vs MongoDB JSON/BSON documents, collections, dynamic schema flexibility, and when to choose NoSQL over SQL.',
        content: `# Introduction to NoSQL Databases & MongoDB Document Data Model

## 1. Overview & Learning Objectives
Relational databases store structured rows in fixed tables. MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like **BSON** (Binary JSON) documents. In this lesson, you will master:
- Relational (SQL) vs Document (NoSQL) paradigm comparison.
- The structure of BSON documents: Rich types (\`ObjectId\`, \`Date\`, \`Binary\`, \`Decimal128\`).
- Collections and Databases in MongoDB.
- Dynamic schema evolution and horizontal scalability (sharding).

---

## 2. BSON Document Anatomy
A MongoDB document is stored in BSON format, which extends JSON with type metadata:

\`\`\`json
{
  "_id": { "$oid": "6541f8a9e14a82b3d9c12345" },
  "title": "Full Stack Web Development",
  "slug": "full-stack-web-development",
  "difficulty": "Beginner to Advanced",
  "price": 0,
  "tags": ["React", "Node.js", "Express", "MongoDB"],
  "stats": {
    "enrolled_count": 1420,
    "rating": 4.95
  },
  "created_at": { "$date": "2026-10-31T18:00:00.000Z" }
}
\`\`\`

---

## 3. SQL vs MongoDB Terminology Mapping
| Relational (SQL) | MongoDB (NoSQL) |
|---|---|
| Database | Database |
| Table | Collection |
| Row / Record | Document (BSON) |
| Column | Field |
| Primary Key (\`id\`) | \`_id\` (ObjectId) |
| Foreign Key / Join | Reference / \`$lookup\` |

---

## 4. Key Takeaways
- The unique identifier \`_id\` is automatically assigned as a 12-byte BSON \`ObjectId\` containing timestamp, machine ID, process ID, and counter.
- MongoDB collections do not enforce rigid schema structures at the database layer; validation is managed at the application layer via Mongoose.

## 5. Documentation & References
- [MongoDB Official Documentation](https://www.mongodb.com/docs/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'NoSQL Paradigm & MongoDB BSON Document Model',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m9_l1_1', title: 'MongoDB Architecture & Document Modeling', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l1_1', title: 'Relational Tables vs MongoDB Documents', url: '/assets/course-art/art-04.jpg', caption: 'Visual comparison between relational rows and hierarchical BSON documents.', alt: 'SQL vs NoSQL Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m9_l2',
        title: 'MongoDB CRUD Operations using MongoDB Shell & Compass',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Execute database operations with mongosh and GUI Compass: insertOne/insertMany, find with query operators ($gt, $in, $regex), updateOne/updateMany ($set, $inc, $push), and deleteOne.',
        content: `# MongoDB CRUD Operations using MongoDB Shell & Compass

## 1. Overview & Learning Objectives
CRUD (Create, Read, Update, Delete) forms the foundation of all database operations. In this lesson, you will master:
- Using \`mongosh\` (MongoDB Shell).
- Query filtering with comparison operators (\`$eq\`, \`$ne\`, \`$gt\`, \`$gte\`, \`$lt\`, \`$in\`).
- Logical operators (\`$and\`, \`$or\`, \`$not\`).
- Update atomic operators (\`$set\`, \`$unset\`, \`$inc\`, \`$push\`, \`$pull\`).

---

## 2. Practical mongosh CRUD Commands
\`\`\`javascript
// 1. CREATE: Insert a new document
db.courses.insertOne({
  title: "React.js Mastery",
  difficulty: "Intermediate",
  enrolled: 0,
  tags: ["frontend", "javascript"]
});

// 2. READ: Query courses where enrolled >= 500 OR difficulty is Beginner
db.courses.find({
  $or: [
    { enrolled: { $gte: 500 } },
    { difficulty: "Beginner" }
  ]
}).sort({ enrolled: -1 }).limit(10);

// 3. UPDATE: Increment enrolled count and append a new tag
db.courses.updateOne(
  { title: "React.js Mastery" },
  {
    $inc: { enrolled: 1 },
    $push: { tags: "web-dev" }
  }
);

// 4. DELETE: Remove all inactive records
db.courses.deleteMany({ status: "DEPRECATED" });
\`\`\`

---

## 3. Key Takeaways
- Always use atomic operators like \`$set\` or \`$inc\` when updating; calling \`replaceOne()\` or omitting \`$set\` will overwrite the entire document.
- Never execute \`deleteMany({})\` or \`updateMany({})\` without verifying the query filter first.

## 4. Documentation & References
- [MongoDB CRUD Operations Manual](https://www.mongodb.com/docs/manual/crud/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'MongoDB CRUD Operations & Atomic Update Operators',
        video_duration: '22:30',
        videos: [
          { id: 'vid_m9_l2_1', title: 'MongoDB CRUD Mastery in mongosh & Compass', url: '/assets/sample-lesson.mp4', duration: '22:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l2_1', title: 'MongoDB Atomic Operator Flowchart', url: '/assets/course-art/art-05.jpg', caption: 'Document modification using $set, $inc, and $push.', alt: 'CRUD Operators Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m9_l3',
        title: 'Object Data Modeling with Mongoose: Schemas, Models & Data Types',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Enforce application-level schemas with Mongoose: mongoose.connect, Schema definitions, type casting, validation rules, timestamps, and model instantiation.',
        content: `# Object Data Modeling with Mongoose: Schemas, Models & Data Types

## 1. Overview & Learning Objectives
Mongoose provides a straight-forward, schema-based solution to model application data with built-in type casting, validation, and query building. In this lesson, you will master:
- Connecting to MongoDB clusters with \`mongoose.connect()\`.
- Defining Mongoose Schemas with strict data types.
- Applying schema validation rules (\`required\`, \`unique\`, \`min\`, \`max\`, \`enum\`).
- Instantiating Models to interact with underlying collections.

---

## 2. Production Mongoose Course Schema
\`\`\`javascript
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is mandatory'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced'],
        message: '{VALUE} is not a recognized difficulty'
      }
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);

export const Course = mongoose.model('Course', courseSchema);
\`\`\`

---

## 3. Key Takeaways
- Setting \`timestamps: true\` automatically creates and updates \`createdAt\` and \`updatedAt\` fields.
- Mongoose performs automatic type casting (e.g. converting numeric strings \`"42"\` into numbers \`42\`).

## 4. Documentation & References
- [Mongoose Official Documentation](https://mongoosejs.com/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Mongoose Schemas, Validation & Model Architecture',
        video_duration: '23:15',
        videos: [
          { id: 'vid_m9_l3_1', title: 'Mongoose Schemas, Models & Validation Rules', url: '/assets/sample-lesson.mp4', duration: '23:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l3_1', title: 'Mongoose Schema to MongoDB Document', url: '/assets/course-art/art-06.jpg', caption: 'Schema validation rules enforced prior to BSON persistence.', alt: 'Mongoose Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m9_l4',
        title: 'Advanced Mongoose: Middleware Hooks (Pre/Post), Custom Validations & Virtuals',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Elevate your Mongoose models: document middleware (pre/post save), query middleware, virtual properties, custom asynchronous validators, and instance methods.',
        content: `# Advanced Mongoose: Middleware Hooks (Pre/Post), Custom Validations & Virtuals

## 1. Overview & Learning Objectives
Mongoose middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. In this lesson, you will master:
- Document middleware: \`pre('save')\` for automatic password hashing and slugification.
- Query middleware: \`pre(/^find/)\` for automatic soft-delete filtering.
- **Virtual Properties**: Computed properties that do not persist to MongoDB.
- Custom async validators.

---

## 2. Pre-Save Password Hashing & Slug Generation Hook
\`\`\`javascript
import bcrypt from 'bcrypt';
import slugify from 'slugify';

// 1. Pre-Save Hook: Automatically hash password if modified
userSchema.pre('save', async function (next) {
  // 'this' refers to the document being saved
  if (!this.isModified('password')) return next();

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// 2. Pre-Save Hook: Generate slug from title
courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// 3. Virtual Property: Computed full name
userSchema.virtual('fullName').get(function () {
  return \`\${this.firstName} \${this.lastName}\`;
});
\`\`\`

---

## 3. Key Takeaways
- Always check \`this.isModified('field')\` inside pre-save hooks to prevent re-hashing already hashed values on unrelated document updates.
- Virtual properties are not persisted in the database; they compute dynamically on access.

## 4. Documentation & References
- [Mongoose Middleware Guide](https://mongoosejs.com/docs/middleware.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Mongoose Middleware Hooks & Virtual Properties',
        video_duration: '20:45',
        videos: [
          { id: 'vid_m9_l4_1', title: 'Pre/Post Hooks, Password Hashing & Virtuals', url: '/assets/sample-lesson.mp4', duration: '20:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l4_1', title: 'Mongoose Middleware Hook Pipeline', url: '/assets/course-art/art-07.jpg', caption: 'Document save cycle: Pre-validate -> Validate -> Pre-save -> Save -> Post-save.', alt: 'Middleware Lifecycle' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m9_l5',
        title: 'Relational Data Patterns in NoSQL: Embedded Documents vs Document References (populate)',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Architect NoSQL relationships: the golden rule of embedding (denormalization) vs referencing (normalization), 1:1, 1:N, N:N relationships, and Mongoose populate().',
        content: `# Relational Data Patterns in NoSQL: Embedded Documents vs Document References (populate)

## 1. Overview & Learning Objectives
One of the most critical decisions in NoSQL data modeling is deciding between **Embedding** subdocuments versus **Referencing** external document ObjectIds. In this lesson, you will master:
- **Embedding (Denormalization):** Embedding sub-documents directly inside parent documents.
- **Referencing (Normalization):** Storing \`ObjectId\` references to separate collections.
- Modeling 1:Few vs 1:Many vs 1:Squillions relationships.
- Resolving references dynamically with Mongoose \`.populate()\`.

---

## 2. Embedding vs Referencing Decision Guide
- **Embed when:**
  - Data is viewed together with the parent (e.g. course modules and lessons).
  - The subdocument count is bounded and small (<100 items).
  - Subdocuments do not need to be queried independently.
- **Reference when:**
  - Subdocuments are frequently accessed independently (e.g. student user profiles).
  - The relationship is unbound (1 to Many thousands, e.g. continuous log telemetry).
  - Document size risks approaching the strict **16MB MongoDB document limit**.

---

## 3. Mongoose populate() Implementation
\`\`\`javascript
const enrolmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  progress: { type: Number, default: 0 }
});

// Query and dynamically join user and course details
const enrolment = await Enrolment.findById(enrolmentId)
  .populate('user', 'email full_name cadet_id') // Project only specific fields
  .populate('course', 'title slug difficulty');
\`\`\`

---

## 4. Key Takeaways
- Prefer embedding for 1:Few relationships that are read together; prefer referencing for large, frequently changing, or independent collections.
- \`.populate()\` executes a separate query behind the scenes; avoid deeply nested populate chains to prevent latency bottlenecks.

## 5. Documentation & References
- [MongoDB Data Model Design Guide](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'NoSQL Data Modeling: Embedding vs Referencing (populate)',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m9_l5_1', title: 'Data Modeling: Embedded vs Referenced Documents', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l5_1', title: 'Embedding vs Referencing Model', url: '/assets/course-art/art-08.jpg', caption: 'Denormalized embedded subdocuments vs normalized referenced collections.', alt: 'Data Modeling Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m9_l6',
        title: 'MongoDB Aggregation Pipeline: Filtering, Grouping, Projecting & Index Optimization',
        duration: '60 mins',
        is_mandatory: true,
        summary: 'Build powerful analytics with the MongoDB Aggregation Pipeline: $match, $group, $project, $lookup, $unwind, $sort, and indexing strategies with explain("executionStats").',
        content: `# MongoDB Aggregation Pipeline: Filtering, Grouping, Projecting & Index Optimization

## 1. Overview & Learning Objectives
The Aggregation Pipeline is MongoDB's advanced framework for data processing and analytical queries. In this lesson, you will master:
- Pipeline stages: \`$match\`, \`$project\`, \`$group\`, \`$sort\`, \`$lookup\`, \`$unwind\`.
- Indexing strategies: Single field, compound indexes, unique indexes, and TTL indexes.
- Query optimization with \`.explain("executionStats")\`: \`COLLSCAN\` (table scan) vs \`IXSCAN\` (index scan).

---

## 2. Multi-Stage Aggregation Pipeline
Compute the total number of students and average grade per course:

\`\`\`javascript
const stats = await Enrolment.aggregate([
  // Stage 1: Filter only completed enrolments
  { $match: { is_completed: true } },

  // Stage 2: Group by course and calculate aggregates
  {
    $group: {
      _id: "$course_id",
      totalGraduates: { $sum: 1 },
      averageGrade: { $avg: "$final_score" },
      highestGrade: { $max: "$final_score" }
    }
  },

  // Stage 3: Join course details from courses collection
  {
    $lookup: {
      from: "courses",
      localField: "_id",
      foreignField: "_id",
      as: "courseDetails"
    }
  },

  // Stage 4: Flatten the joined array
  { $unwind: "$courseDetails" },

  // Stage 5: Reshape the output
  {
    $project: {
      _id: 0,
      courseTitle: "$courseDetails.title",
      totalGraduates: 1,
      averageGrade: { $round: ["$averageGrade", 1] }
    }
  },

  // Stage 6: Sort by most graduates
  { $sort: { totalGraduates: -1 } }
]);
\`\`\`

---

## 3. Index Optimization with explain()
Without an index, MongoDB performs a **COLLSCAN** (Collection Scan), reading every document in the database:
\`\`\`javascript
// Create compound index for fast filtering on course and user
enrolmentSchema.index({ course_id: 1, user_id: 1 }, { unique: true });

// Verify query execution plan
const plan = await Enrolment.find({ course_id: cId }).explain("executionStats");
console.log(plan.executionStats.executionStages.stage); // "IXSCAN" (Optimal!)
\`\`\`

---

## 4. Key Takeaways
- Always place \`$match\` and \`$sort\` stages at the beginning of an aggregation pipeline to leverage database indexes.
- Verify queries in production with \`explain("executionStats")\` to guarantee \`IXSCAN\` execution.

## 5. Documentation & References
- [MongoDB Aggregation Pipeline Manual](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'MongoDB Aggregation Pipeline & Index Performance Optimization',
        video_duration: '25:00',
        videos: [
          { id: 'vid_m9_l6_1', title: 'Aggregation Pipelines, $match, $group & Indexing', url: '/assets/sample-lesson.mp4', duration: '25:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m9_l6_1', title: 'Aggregation Pipeline Data Flow', url: '/assets/course-art/art-09.jpg', caption: 'Document stream flowing through $match, $group, $lookup, and $project stages.', alt: 'Aggregation Pipeline Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m9',
      title: 'Module 9: MongoDB & Database Management - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m9_1',
          text: 'What binary format does MongoDB use internally to store documents with support for rich data types like Date and ObjectId?',
          options: [
            { id: 'opt_1', text: 'BSON (Binary JSON)', is_correct: true },
            { id: 'opt_2', text: 'Protocol Buffers', is_correct: false },
            { id: 'opt_3', text: 'MessagePack', is_correct: false },
            { id: 'opt_4', text: 'XML Schema Binary', is_correct: false }
          ],
          explanation: 'MongoDB stores data in BSON (Binary JSON) format, extending JSON with types like ObjectId, Date, Binary data, and Decimal128.'
        },
        {
          id: 'q_m9_2',
          text: 'What is the maximum document size limit enforced by MongoDB for a single BSON document?',
          options: [
            { id: 'opt_1', text: '16 Megabytes', is_correct: true },
            { id: 'opt_2', text: '4 Kilobytes', is_correct: false },
            { id: 'opt_3', text: '1 Gigabyte', is_correct: false },
            { id: 'opt_4', text: 'Unlimited', is_correct: false }
          ],
          explanation: 'The maximum BSON document size is 16MB to prevent unbounded document growth from degrading RAM and network performance.'
        },
        {
          id: 'q_m9_3',
          text: 'What update operator must be used in MongoDB to update specific fields in a document without replacing the entire document?',
          options: [
            { id: 'opt_1', text: '$set', is_correct: true },
            { id: 'opt_2', text: '$update', is_correct: false },
            { id: 'opt_3', text: '$replace', is_correct: false },
            { id: 'opt_4', text: '$mutate', is_correct: false }
          ],
          explanation: 'The $set operator replaces the value of a field with the specified value without replacing the surrounding document.'
        },
        {
          id: 'q_m9_4',
          text: 'Which atomic operator increments the numerical value of a field in a MongoDB document by a specified amount?',
          options: [
            { id: 'opt_1', text: '$inc', is_correct: true },
            { id: 'opt_2', text: '$add', is_correct: false },
            { id: 'opt_3', text: '$plus', is_correct: false },
            { id: 'opt_4', text: '$count', is_correct: false }
          ],
          explanation: 'The $inc operator increments a field by a specified value, e.g. { $inc: { enrolled: 1 } }.'
        },
        {
          id: 'q_m9_5',
          text: 'In Mongoose, what pre-hook should be used to hash a user\'s password before saving to the database?',
          options: [
            { id: 'opt_1', text: 'userSchema.pre("save", async function(next) { ... })', is_correct: true },
            { id: 'opt_2', text: 'userSchema.post("find", function() { ... })', is_correct: false },
            { id: 'opt_3', text: 'userSchema.pre("delete", function() { ... })', is_correct: false },
            { id: 'opt_4', text: 'userSchema.on("save", function() { ... })', is_correct: false }
          ],
          explanation: 'A pre("save") document hook runs before saving the document, allowing passwords to be hashed with bcrypt.'
        },
        {
          id: 'q_m9_6',
          text: 'Why is this.isModified("password") checked inside a Mongoose pre("save") password hashing hook?',
          options: [
            { id: 'opt_1', text: 'To avoid re-hashing an already hashed password when a user updates unrelated fields like their name or avatar.', is_correct: true },
            { id: 'opt_2', text: 'To delete the user password if unchanged.', is_correct: false },
            { id: 'opt_3', text: 'To check if the password contains numbers.', is_correct: false },
            { id: 'opt_4', text: 'It is required by the MongoDB shell.', is_correct: false }
          ],
          explanation: 'If a document is updated without changing the password, omitting isModified() would re-hash the bcrypt hash, locking the user out.'
        },
        {
          id: 'q_m9_7',
          text: 'What are Virtual properties in Mongoose?',
          options: [
            { id: 'opt_1', text: 'Document properties that can be gotten and set but are not persisted to the MongoDB database.', is_correct: true },
            { id: 'opt_2', text: 'Encrypted fields stored on external cloud drives.', is_correct: false },
            { id: 'opt_3', text: 'Temporary variables deleted after 5 seconds.', is_correct: false },
            { id: 'opt_4', text: 'Fields only visible to admin users.', is_correct: false }
          ],
          explanation: 'Virtuals are logical document properties that compute dynamically (such as fullName) without taking storage space in the database.'
        },
        {
          id: 'q_m9_8',
          text: 'What Mongoose query method is used to replace an ObjectId reference in a document with the actual referenced document from another collection?',
          options: [
            { id: 'opt_1', text: '.populate()', is_correct: true },
            { id: 'opt_2', text: '.join()', is_correct: false },
            { id: 'opt_3', text: '.include()', is_correct: false },
            { id: 'opt_4', text: '.attach()', is_correct: false }
          ],
          explanation: 'populate() automatically replaces specified paths in a document with documents from other collections.'
        },
        {
          id: 'q_m9_9',
          text: 'When is Embedding subdocuments preferred over Referencing separate collections in NoSQL data modeling?',
          options: [
            { id: 'opt_1', text: 'When the related data is small, bounded, and always read together with the parent document (1:Few relationship).', is_correct: true },
            { id: 'opt_2', text: 'When the related records exceed millions of items.', is_correct: false },
            { id: 'opt_3', text: 'When the data needs to be accessed independently from multiple services.', is_correct: false },
            { id: 'opt_4', text: 'When using relational SQL databases.', is_correct: false }
          ],
          explanation: 'Embedding optimizes read performance by eliminating joins when child data is bounded and always fetched with the parent.'
        },
        {
          id: 'q_m9_10',
          text: 'In a MongoDB Aggregation Pipeline, which stage performs filtering equivalent to a SQL WHERE clause?',
          options: [
            { id: 'opt_1', text: '$match', is_correct: true },
            { id: 'opt_2', text: '$filter', is_correct: false },
            { id: 'opt_3', text: '$where', is_correct: false },
            { id: 'opt_4', text: '$find', is_correct: false }
          ],
          explanation: 'The $match stage filters documents to allow only matching documents to pass through to the next pipeline stage.'
        },
        {
          id: 'q_m9_11',
          text: 'Which aggregation stage performs a left outer join to an unsharded collection in the same database to filter in documents from the "joined" collection?',
          options: [
            { id: 'opt_1', text: '$lookup', is_correct: true },
            { id: 'opt_2', text: '$join', is_correct: false },
            { id: 'opt_3', text: '$merge', is_correct: false },
            { id: 'opt_4', text: '$link', is_correct: false }
          ],
          explanation: '$lookup performs a left outer join to another collection in the same database, bringing in related documents.'
        },
        {
          id: 'q_m9_12',
          text: 'What aggregation stage deconstructs an array field from input documents to output a document for each element in the array?',
          options: [
            { id: 'opt_1', text: '$unwind', is_correct: true },
            { id: 'opt_2', text: '$flatten', is_correct: false },
            { id: 'opt_3', text: '$split', is_correct: false },
            { id: 'opt_4', text: '$explode', is_correct: false }
          ],
          explanation: '$unwind flattens an array field, outputting a separate copy of the document for each element in the specified array.'
        },
        {
          id: 'q_m9_13',
          text: 'What execution stage reported by query.explain("executionStats") indicates that an index was successfully used rather than scanning every document in the collection?',
          options: [
            { id: 'opt_1', text: 'IXSCAN', is_correct: true },
            { id: 'opt_2', text: 'COLLSCAN', is_correct: false },
            { id: 'opt_3', text: 'TABLESCAN', is_correct: false },
            { id: 'opt_4', text: 'DISKSCAN', is_correct: false }
          ],
          explanation: 'IXSCAN indicates that the query engine scanned an index. COLLSCAN indicates a slow collection scan checking every document.'
        },
        {
          id: 'q_m9_14',
          text: 'What type of MongoDB index automatically deletes documents after a specified duration of time has elapsed?',
          options: [
            { id: 'opt_1', text: 'TTL (Time-To-Live) Index', is_correct: true },
            { id: 'opt_2', text: 'Geospatial Index', is_correct: false },
            { id: 'opt_3', text: 'Compound Index', is_correct: false },
            { id: 'opt_4', text: 'Hashed Index', is_correct: false }
          ],
          explanation: 'TTL indexes are special single-field indexes that MongoDB uses to automatically remove documents after a certain amount of time.'
        },
        {
          id: 'q_m9_15',
          text: 'What operator is used to push a new element into an array field of a MongoDB document?',
          options: [
            { id: 'opt_1', text: '$push', is_correct: true },
            { id: 'opt_2', text: '$append', is_correct: false },
            { id: 'opt_3', text: '$add', is_correct: false },
            { id: 'opt_4', text: '$insert', is_correct: false }
          ],
          explanation: 'The $push operator appends a specified value to an array field in a MongoDB document.'
        },
        {
          id: 'q_m9_16',
          text: 'What option in Mongoose schema declarations automatically manages createdAt and updatedAt date fields?',
          options: [
            { id: 'opt_1', text: '{ timestamps: true }', is_correct: true },
            { id: 'opt_2', text: '{ timeTracking: true }', is_correct: false },
            { id: 'opt_3', text: '{ audit: true }', is_correct: false },
            { id: 'opt_4', text: '{ dateLog: true }', is_correct: false }
          ],
          explanation: 'Setting { timestamps: true } tells Mongoose to assign createdAt and updatedAt fields to the schema.'
        },
        {
          id: 'q_m9_17',
          text: 'Which aggregation stage groups input documents by a specified identifier expression and applies accumulator expressions (like $sum, $avg)?',
          options: [
            { id: 'opt_1', text: '$group', is_correct: true },
            { id: 'opt_2', text: '$aggregate', is_correct: false },
            { id: 'opt_3', text: '$collect', is_correct: false },
            { id: 'opt_4', text: '$reduce', is_correct: false }
          ],
          explanation: 'The $group stage groups input documents by the specified _id expression and calculates accumulator metrics.'
        },
        {
          id: 'q_m9_18',
          text: 'What method is used to enforce that a field in a Mongoose schema is unique across the entire collection (such as user email)?',
          options: [
            { id: 'opt_1', text: '{ unique: true } in the schema field definition', is_correct: true },
            { id: 'opt_2', text: '{ distinct: true }', is_correct: false },
            { id: 'opt_3', text: '{ primaryKey: true }', is_correct: false },
            { id: 'opt_4', text: '{ noDuplicates: true }', is_correct: false }
          ],
          explanation: 'Setting unique: true creates a unique index on that path in MongoDB, rejecting duplicate insertions.'
        },
        {
          id: 'q_m9_19',
          text: 'How can you exclude the _id field from being returned in the output of a $project aggregation stage?',
          options: [
            { id: 'opt_1', text: '{ $project: { _id: 0 } }', is_correct: true },
            { id: 'opt_2', text: '{ $project: { _id: false } }', is_correct: false },
            { id: 'opt_3', text: '{ $project: { hideId: true } }', is_correct: false },
            { id: 'opt_4', text: '{ $project: { _id: "omit" } }', is_correct: false }
          ],
          explanation: 'In projection, _id is included by default; setting _id: 0 explicitly suppresses the _id field from the result document.'
        },
        {
          id: 'q_m9_20',
          text: 'What is a Compound Index in MongoDB?',
          options: [
            { id: 'opt_1', text: 'An index that holds references to multiple fields within a collection (e.g. { course_id: 1, user_id: 1 }) to optimize multi-key queries.', is_correct: true },
            { id: 'opt_2', text: 'An index that spans multiple separate databases.', is_correct: false },
            { id: 'opt_3', text: 'An encrypted index.', is_correct: false },
            { id: 'opt_4', text: 'An index created automatically on every field.', is_correct: false }
          ],
          explanation: 'MongoDB supports compound indexes, where a single index structure holds references to multiple fields in a defined order.'
        }
      ]
    }
  }
];
