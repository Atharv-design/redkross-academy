/**
 * RedKross Academy — Standalone Real-Time Socket.io Server (Hardened)
 * 
 * Run with: node server/socketServer.js
 * Default Port: 3001
 */

import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3001;
const httpServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'healthy', service: 'RedKross Academy Socket.io Telemetry' }));
});

const ALLOWED_ORIGINS = [
  'https://academy.redkross.org.in',
  'https://redkross-academy.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

function isOriginAllowed(origin) {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https:\/\/redkross-academy.*\.vercel\.app$/.test(origin)) return true;
  return false;
}

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS blocked: Origin not authorized for WebSocket connection.'));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  // Room subscriptions
  socket.on('join:room', (room) => {
    if (typeof room === 'string' && /^[a-zA-Z0-9_\-:]+$/.test(room)) {
      socket.join(room);
    }
  });

  // Proctoring telemetry: scope strictly to relevant exam session and proctors
  socket.on('exam:violation', (data) => {
    if (data && data.enrolmentId) {
      io.to(`exam:${data.enrolmentId}`).to('admin:proctoring').emit('exam:violation', data);
    }
  });

  // Assignments telemetry: scope to student and admin reviewers
  socket.on('assignment:submit', (data) => {
    io.to('admin:assignments').emit('assignment:submit', data);
  });
  socket.on('assignment:evaluated', (data) => {
    if (data && data.userId) {
      io.to(`user:${data.userId}`).emit('assignment:evaluated', data);
    }
  });

  // Certificates telemetry: scope strictly to student and credentials desk
  socket.on('certificate:request', (data) => {
    io.to('admin:credentials').emit('certificate:request', data);
  });
  socket.on('certificate:dispatch', (data) => {
    if (data && data.userId) {
      io.to(`user:${data.userId}`).emit('certificate:dispatch', data);
    }
  });
  socket.on('certificate:revoke', (data) => {
    if (data && data.userId) {
      io.to(`user:${data.userId}`).emit('certificate:revoke', data);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`[Socket.io] Real-time telemetry server running on port ${PORT}`);
});
