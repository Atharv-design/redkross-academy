/**
 * RedKross Academy — Standalone Real-Time Socket.io Server
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

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  // Room subscriptions
  socket.on('join:room', (room) => {
    socket.join(room);
    console.log(`[Socket] Client ${socket.id} joined room ${room}`);
  });

  // Proctoring Incident Event
  socket.on('exam:violation', (data) => {
    console.log(`[Socket] Proctoring Violation: Cadet ${data.cadetId} - ${data.violationType}`);
    io.emit('exam:violation', data);
  });

  // Assignment Submission Event
  socket.on('assignment:submit', (data) => {
    console.log(`[Socket] Assignment Submitted: ${data.assignmentTitle} by Cadet ${data.cadetId}`);
    io.emit('assignment:submit', data);
  });

  // Assignment Evaluated Event
  socket.on('assignment:evaluated', (data) => {
    console.log(`[Socket] Assignment Evaluated: Submission ${data.submissionId} - ${data.status}`);
    io.emit('assignment:evaluated', data);
  });

  // Certificate Request Event
  socket.on('certificate:request', (data) => {
    console.log(`[Socket] Certificate Requested by Cadet ${data.cadetId} for course ${data.courseTitle}`);
    io.emit('certificate:request', data);
  });

  // Certificate Dispatched Event
  socket.on('certificate:dispatch', (data) => {
    console.log(`[Socket] Certificate Dispatched: ${data.credentialId} to Cadet ${data.cadetId}`);
    io.emit('certificate:dispatch', data);
  });

  // Certificate Revoked Event
  socket.on('certificate:revoke', (data) => {
    console.log(`[Socket] Certificate Revoked: ${data.credentialId}`);
    io.emit('certificate:revoke', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`⚡ RedKross Academy Socket.io Server listening on http://localhost:${PORT}`);
});
