/**
 * RedKross Academy - standalone Socket.io server (only needed when the API runs
 * on a serverless host that cannot hold WebSockets). Same authenticated hub as
 * productionServer.js.
 *
 * Run with: node server/socketServer.js   (default port 3001)
 */
import 'dotenv/config';
import { createServer } from 'http';
import { attachSocketHub } from './socketHub.js';

const PORT = process.env.PORT || 3001;
const httpServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'healthy', service: 'RedKross Academy Socket.io' }));
});

attachSocketHub(httpServer);

httpServer.listen(PORT, () => {
  console.log(`[Socket.io] authenticated hub listening on port ${PORT}`);
});
