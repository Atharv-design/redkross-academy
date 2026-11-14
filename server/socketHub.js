/**
 * Authenticated Socket.io hub shared by productionServer.js and socketServer.js.
 *
 * - The client sends its Firebase ID token in the handshake (auth: { token }).
 * - Anonymous sockets may connect (public pages listen for catalog updates) but
 *   cannot join rooms or emit privileged events.
 * - A user can only join their own `user:<id>` room; `admin:*` rooms require an
 *   admin account.
 * - Events that change someone else's state (status, tokens, purge, certificates,
 *   grading, catalog) are relayed only when an admin emits them.
 */
import { Server as SocketIOServer } from 'socket.io';
import { isOriginAllowed } from '../api/_db.js';
import { verifyRequest, resolveUser, isAdminUser } from '../api/_auth.js';

const ADMIN_EVENTS = new Set([
  'user:status_changed',
  'user:purged',
  'user:banned',
  'token:adjusted',
  'student:progress_reset',
  'certificate:dispatched',
  'certificate:dispatch',
  'certificate:revoke',
  'assignment:graded',
  'assignment:evaluated',
  'course:mutation',
  'catalog:visibility',
]);
const STUDENT_EVENTS = new Set(['certificate:requested', 'assignment:submitted', 'exam:violation']);

export function attachSocketHub(httpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: (origin, cb) => (isOriginAllowed(origin) ? cb(null, true) : cb(new Error('Origin not allowed'))),
      methods: ['GET', 'POST'],
      credentials: true,
    },
    maxHttpBufferSize: 64 * 1024,
    // WebSocket only: no HTTP long-polling, so no sticky sessions are needed if the
    // API ever runs as several processes (with the Redis adapter).
    transports: ['websocket'],
  });

  io.use(async (socket, next) => {
    socket.data.user = null;
    socket.data.isAdmin = false;
    const token = socket.handshake?.auth?.token;
    if (!token) return next();
    try {
      const identity = await verifyRequest({ headers: { authorization: `Bearer ${token}` } });
      if (identity) {
        const user = await resolveUser(identity, { create: false });
        if (user && String(user.status || '').toUpperCase() !== 'SUSPENDED') {
          socket.data.user = { id: user.id, email: user.email, name: user.full_name };
          socket.data.isAdmin = isAdminUser(user, identity);
        }
      }
    } catch (err) {
      console.warn('[socket] auth failed:', err.message);
    }
    next();
  });

  io.on('connection', (socket) => {
    const me = socket.data.user;
    if (me) socket.join(`user:${me.id}`);
    if (socket.data.isAdmin) socket.join('admin:all');

    socket.on('join:room', (room) => {
      if (typeof room !== 'string') return;
      if (me && room === `user:${me.id}`) socket.join(room);
      else if (socket.data.isAdmin && /^admin:[a-z_-]+$/.test(room)) socket.join(room);
    });

    socket.onAny((event, payload) => {
      if (typeof event !== 'string' || event === 'join:room') return;
      const data = payload && typeof payload === 'object' ? payload : {};
      if (ADMIN_EVENTS.has(event)) {
        if (!socket.data.isAdmin) return;
        if (data.userId) io.to(`user:${data.userId}`).emit(event, data);
        else if (event === 'course:mutation' || event === 'catalog:visibility') io.emit(event, data);
        io.to('admin:all').emit(event, data);
        return;
      }
      if (STUDENT_EVENTS.has(event) && me) {
        // identity is attached server-side; client-supplied ids are not trusted
        io.to('admin:all').emit(event, { ...data, userId: me.id, studentEmail: me.email, studentName: me.name });
      }
    });
  });

  return io;
}
