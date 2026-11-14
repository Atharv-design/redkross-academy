import { io } from 'socket.io-client';
/**
 * RedKross Academy — Real-Time Bidirectional Socket.io & Event Telemetry Engine
 * 
 * Provides unified real-time event distribution between Student Portals and Admin Dashboard:
 * - Proctoring Violations (Webcam disconnect, tab switch, strict 24-hr lockout)
 * - PDF Assignment Submissions & Rubric Evaluation
 * - Course Completion & Certificate Requests
 * - Official Certificate Dispatch & Public Revocation
 * 
 * Includes high-resilience BroadcastChannel & Local EventBus fallback so real-time communication
 * operates reliably across multiple windows and tabs even in serverless / offline deployments.
 */

class SocketClient {
  constructor() {
    this.listeners = new Map();
    this.channel = null;
    this.socket = null;
    this.isConnected = false;

    this.initBroadcastBus();
    this.tryConnectSocket();
  }

  initBroadcastBus() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('redkross_socket_bus');
        this.channel.onmessage = (event) => {
          if (event.data && event.data.event) {
            this.notify(event.data.event, event.data.payload);
          }
        };
      } catch (err) {
        console.warn('[SocketClient] BroadcastChannel fallback unavailable:', err);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('redkross:socket_event', (customEvent) => {
        const { event, payload } = customEvent.detail || {};
        if (event) {
          this.notify(event, payload);
        }
      });
    }
  }

  async tryConnectSocket() {
    if (typeof window === 'undefined') return;
    const socketUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOCKET_URL) || null;
    if (!socketUrl) {
      // In serverless / static deployment, use high-speed BroadcastChannel and CustomEvent bus
      return;
    }
    try {
      const socketFactory = io || window.io;
      if (typeof socketFactory === 'function') {
        this.socket = socketFactory(socketUrl, {
          autoConnect: true,
          // Keep retrying through tunnel reconnects; jitter spreads a whole batch's
          // reconnects over time instead of all clients hitting the server at once.
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1500,
          reconnectionDelayMax: 30000,
          randomizationFactor: 0.5,
          transports: ['websocket']
        });

        this.socket.on('connect', () => {
          this.isConnected = true;
        });

        this.socket.on('disconnect', () => {
          this.isConnected = false;
        });

        this.socket.onAny((event, ...args) => {
          this.notify(event, args[0]);
        });
      }
    } catch (e) {
      console.warn('[SocketClient] Running on resilient BroadcastChannel bus.');
    }
  }

  on(event, callback) {
    if (typeof callback !== 'function') return () => {};
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }

    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  notify(event, payload) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`[SocketClient] Error in listener for ${event}:`, err);
        }
      });
    }

    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach((cb) => {
        try {
          cb({ event, payload });
        } catch (err) {
          console.error('[SocketClient] Error in wildcard listener:', err);
        }
      });
    }
  }

  emit(event, payload = {}) {
    this.notify(event, payload);

    if (this.channel) {
      try {
        this.channel.postMessage({ event, payload, timestamp: Date.now() });
      } catch (err) {
        console.warn('[SocketClient] Broadcast postMessage error:', err);
      }
    }

    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('redkross:socket_event', {
            detail: { event, payload, timestamp: Date.now() }
          })
        );
      } catch (e) {
      }
    }

    if (this.socket && this.socket.connected) {
      try {
        this.socket.emit(event, payload);
      } catch (err) {
        console.warn('[SocketClient] Socket.io emit error:', err);
      }
    }
  }

  emitProctorViolation(payload) {
    this.emit('exam:violation', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }

  emitAssignmentSubmitted(payload) {
    this.emit('assignment:submit', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }

  emitAssignmentGraded(payload) {
    this.emit('assignment:evaluated', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }

  emitCertificateRequested(payload) {
    this.emit('certificate:request', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }

  emitCertificateDispatched(payload) {
    this.emit('certificate:dispatch', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }

  emitCertificateRevoked(payload) {
    this.emit('certificate:revoke', {
      ...payload,
      timestamp: new Date().toISOString()
    });
  }
}

export const socketClient = new SocketClient();
export default socketClient;
