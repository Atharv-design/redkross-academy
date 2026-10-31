/**
 * RedKross Academy - Standalone Production Server
 * 
 * Combines:
 * 1. Express REST API engine (dynamically mounting /api/* endpoints)
 * 2. Real-Time Socket.io Telemetry & Proctoring Server
 * 3. Static SPA serving (dist/ with React Router client fallback)
 * 4. Graceful shutdown & health check monitoring (/healthz)
 * 
 * Run with:
 *   node server/productionServer.js
 * Or with PM2:
 *   pm2 start ecosystem.config.cjs
 */

import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sql } from '../api/_db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
const httpServer = createServer(app);

// Configure JSON and URL-encoded request body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Setup Socket.io
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  // Join room
  socket.on('join:room', (room) => {
    socket.join(room);
  });

  // Universal real-time event relay across all connected clients
  socket.onAny((event, data) => {
    socket.broadcast.emit(event, data);
  });

  // Proctoring telemetry
  socket.on('exam:violation', (data) => {
    io.emit('exam:violation', data);
  });

  // Assignments
  socket.on('assignment:submit', (data) => {
    io.emit('assignment:submit', data);
  });
  socket.on('assignment:evaluated', (data) => {
    io.emit('assignment:evaluated', data);
  });

  // Certificates
  socket.on('certificate:request', (data) => {
    io.emit('certificate:request', data);
  });
  socket.on('certificate:dispatch', (data) => {
    io.emit('certificate:dispatch', data);
  });
  socket.on('certificate:revoke', (data) => {
    io.emit('certificate:revoke', data);
  });
});

// Health check endpoint
app.get(['/healthz', '/api/health'], async (req, res) => {
  try {
    let dbStatus = 'connected';
    try {
      await sql`SELECT 1 as ping`;
    } catch (err) {
      dbStatus = `degraded (${err.message})`;
    }

    res.status(200).json({
      status: 'healthy',
      service: 'RedKross Academy Production Gateway',
      environment: process.env.NODE_ENV || 'production',
      database: dbStatus,
      uptime_seconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Dynamically mount API endpoints from api/*.js
const apiDir = path.join(__dirname, '../api');
const apiRoutes = [
  'admin',
  'auth',
  'courses',
  'enrol',
  'learning-paths',
  'progress',
  'quiz',
  'send-email',
  'support-tickets',
  'verify',
  'violation',
  'wallet'
];

for (const route of apiRoutes) {
  const filePath = path.join(apiDir, `${route}.js`);
  if (fs.existsSync(filePath)) {
    app.all(`/api/${route}`, async (req, res, next) => {
      try {
        const module = await import(`../api/${route}.js`);
        if (typeof module.default === 'function') {
          return await module.default(req, res);
        }
        res.status(404).json({ error: `Handler for /api/${route} not found` });
      } catch (err) {
        console.error(`[API Error] /api/${route}:`, err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
      }
    });
  }
}

// Serve frontend static assets from dist/
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));

  // Fallback all SPA routes to dist/index.html (Express 5 & 4 compatible)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/socket.io/') || req.path.startsWith('/healthz')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/socket.io/') || req.path.startsWith('/healthz')) {
      return next();
    }
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>RedKross Academy Backend Active</title></head>
        <body style="background:#071018;color:#65F58A;font-family:sans-serif;padding:40px;text-align:center;">
          <h1>RedKross Academy API & Real-time Server Running</h1>
          <p style="color:#A7B1C6;">Frontend build (dist/) not detected. Run <code>npm run build</code> to compile the client interface.</p>
        </body>
      </html>
    `);
  });
}

// Start HTTP + WebSocket Server
httpServer.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  REDKROSS ACADEMY - PRODUCTION GATEWAY RUNNING     `);
  console.log(`====================================================`);
  console.log(`  Local Address:     http://localhost:${PORT}`);
  console.log(`  Health Check:      http://localhost:${PORT}/healthz`);
  console.log(`  API Base:          http://localhost:${PORT}/api/courses`);
  console.log(`  Static Frontend:   ${fs.existsSync(distDir) ? 'Loaded from dist/' : 'Not yet built'}`);
  console.log(`====================================================`);
});

// Graceful Shutdown Handling
const shutdown = (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  httpServer.close(() => {
    console.log('HTTP and Socket.io servers closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forcefully terminating after timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
