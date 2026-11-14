/**
 * RedKross Academy API - PM2 configuration for the on-premises server.
 *
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 *
 * ONE process (fork mode) on purpose:
 *  - rate-limit counters live in memory (server/rateLimit.js)
 *  - Socket.io has no Redis adapter yet
 *  - the server shares 8 GB with Mailcow and the other sites; measured headroom
 *    for the Academy is about 1.4 GB
 * To scale to 2 processes later: add the Socket.io Redis adapter and move the rate
 * limiter to Redis (or Cloudflare rate-limiting rules) first.
 *
 * Secrets come from .env in the app directory (see .env.example), never from here.
 */
module.exports = {
  apps: [
    {
      name: 'academy-api',
      script: './server/productionServer.js',
      exec_mode: 'fork',
      instances: 1,
      node_args: '--max-old-space-size=512',
      max_memory_restart: '700M',
      autorestart: true,
      exp_backoff_restart_delay: 200,
      kill_timeout: 8000,
      watch: false,
      time: true,
      env: {
        NODE_ENV: 'development',
        HOST: '127.0.0.1',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 3000,
        ACCESS_LOG: '1',
      },
    },
  ],
};
