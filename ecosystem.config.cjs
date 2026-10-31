/**
 * RedKross Academy - PM2 Process Configuration (ecosystem.config.cjs)
 * 
 * Production Process Manager configuration for Linux / Hetzner / AWS EC2 / Debian / Ubuntu.
 * 
 * Usage:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 restart redkross-academy
 *   pm2 logs redkross-academy
 *   pm2 monit
 */

module.exports = {
  apps: [
    {
      name: 'redkross-academy',
      script: './server/productionServer.js',
      instances: 'max', // Scales across available CPU cores (cluster mode)
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout: 5000,
      listen_timeout: 8000,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '127.0.0.1'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '127.0.0.1'
      }
    }
  ]
};
