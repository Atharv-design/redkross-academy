# 🛡️ RedKross Academy — Production Deployment Guide
### Zero-Trust Architecture: Cloudflare Tunnel + Standalone Express + PostgreSQL + PM2

> **Target Audience:** Backend/DevOps Developers & Infrastructure Engineers  
> **Server Platform:** Ubuntu 22.04 LTS / 24.04 LTS, Debian 12, AWS EC2, Hetzner, or On-Premise Linux  
> **Security Standard:** Zero open inbound firewall ports (Port 80/443 closed). All incoming web traffic is reverse-proxied through Cloudflare Tunnel (`cloudflared`).

---

## 📐 1. Architecture Overview & Network Topology

```
                  ┌────────────────────────────────────────────────────────┐
                  │                 Internet / Users                       │
                  └──────────────────────────┬─────────────────────────────┘
                                             │ HTTPS (TLS 1.3 / Anycast)
                                             ▼
                  ┌────────────────────────────────────────────────────────┐
                  │          Cloudflare Global Edge Network                │
                  │   - DDoS Shield & Web Application Firewall (WAF)       │
                  │   - Free Automatic SSL/TLS Certificate Termination     │
                  │   - WebSocket Proxying (Telemetry & Proctoring)        │
                  └──────────────────────────┬─────────────────────────────┘
                                             │ Secure Outbound Tunnel (Port 7844)
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ LINUX PRODUCTION HOST (Ubuntu 22.04 / 24.04)                                             │
│                                                                                          │
│  [Firewall (UFW)]: ONLY SSH (Port 22) allowed. Ports 80 and 443 are STRICTLY BLOCKED.     │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Cloudflare Tunnel Daemon (`cloudflared` systemd service)                           │  │
│  │ Forwards incoming traffic from edge directly to -> http://127.0.0.1:3000          │  │
│  └─────────────────────────────────────┬──────────────────────────────────────────────┘  │
│                                        │ Local Loopback (HTTP / WS)                      │
│                                        ▼                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Node.js Production Gateway (`server/productionServer.js`)                         │  │
│  │ Managed by PM2 Cluster Daemon (`ecosystem.config.cjs`)                             │  │
│  │  ├── 1. Static SPA Engine: Serves compiled React bundle (`dist/`)                  │  │
│  │  ├── 2. Express REST API: Routes `/api/*` endpoints with connection pooling        │  │
│  │  ├── 3. Socket.io Server: Real-time anti-cheat, exams & telemetry events           │  │
│  │  └── 4. Health Check Monitor: Accessible at `/healthz`                             │  │
│  └─────────────────────────────────────┬──────────────────────────────────────────────┘  │
│                                        │ TCP / Local Socket (Port 5432)                  │
│                                        ▼                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Self-Hosted PostgreSQL Database Server (`redkross_db`)                             │  │
│  │  - 21 Production Tables (Users, Courses, Modules, Lessons, CBT Exams,              │  │
│  │    Enrolments, Proctor Violations, Audit Logs, Credentials, Support Tickets)       │  │
│  │  - Automatic Daily Compressed Backups via `scripts/backup_postgres.sh`             │  │
│  └────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 2. Server Preparation (Ubuntu / Debian)

### Step 2.1: Update System Packages & Install Core Tools
Login to your fresh Linux server via SSH as `root` or a `sudo` user:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential ufw software-properties-common
```

### Step 2.2: Install Node.js 20 LTS (NodeSource)
```bash
# Add NodeSource repository for Node 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v # Expected: v20.x.x
npm -v  # Expected: 10.x.x
```

### Step 2.3: Install PM2 Process Manager Globally
```bash
sudo npm install -g pm2
```

### Step 2.4: Configure Host Firewall (Zero Open Web Ports)
Because Cloudflare Tunnel establishes an **outbound** persistent TLS connection to Cloudflare's edge, you **do not** need to open port 80 or port 443 in your firewall!
```bash
# Allow only SSH
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment "SSH Remote Management"
sudo ufw enable
sudo ufw status
```

---

## 🗄️ 3. PostgreSQL Installation & Configuration

### Step 3.1: Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Step 3.2: Create Dedicated Database & User
Switch to the postgres user and launch the PostgreSQL shell:
```bash
sudo -i -u postgres psql
```

In the `psql` console, execute the following SQL commands:
```sql
-- 1. Create dedicated production user with strong password
CREATE USER redkross_admin WITH PASSWORD 'ChangeThisToYourStrongPassword_2026!';

-- 2. Create production database
CREATE DATABASE redkross_db OWNER redkross_admin;

-- 3. Grant schema privileges
GRANT ALL PRIVILEGES ON DATABASE redkross_db TO redkross_admin;

-- 4. Enable UUID extension inside redkross_db
\c redkross_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
GRANT ALL ON SCHEMA public TO redkross_admin;

-- Exit psql
\q
```

### Step 3.3: Verify Local Database Connection
Test that the new user can authenticate into `redkross_db`:
```bash
psql -U redkross_admin -h 127.0.0.1 -d redkross_db -W
```
*(Enter the password when prompted. Once connected, type `\q` to exit.)*

---

## 📂 4. Application Deployment & Environment Setup

### Step 4.1: Clone the Repository
Clone the codebase into your preferred deployment directory (e.g. `/var/www/redkross-academy`):
```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www

git clone <YOUR_GIT_REPO_URL> redkross-academy
cd /var/www/redkross-academy
```

### Step 4.2: Install NPM Dependencies
```bash
npm install
```

### Step 4.3: Configure Production Environment (`.env`)
Copy the production template:
```bash
cp .env.production.example .env
nano .env
```

Ensure the following variables are accurately configured:
```ini
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=127.0.0.1

# PostgreSQL Connection String
# Replace password with what you set in Step 3.2
DATABASE_URL=postgresql://redkross_admin:ChangeThisToYourStrongPassword_2026!@127.0.0.1:5432/redkross_db?sslmode=disable
DB_ENGINE=pg
PG_MAX_CLIENTS=25

# Public URL (Your domain managed under Cloudflare)
VITE_SITE_URL=https://academy.redkross.org.in

# Super Admin Provisioning
ADMIN_PROVISION_EMAIL=admin@redkross.org.in

# Firebase Authentication (Copy from Firebase Console)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=redkross-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=redkross-academy
VITE_FIREBASE_STORAGE_BUCKET=redkross-academy.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
*(Save and exit `nano` with `Ctrl+O`, `Enter`, then `Ctrl+X`)*

---

## ⚡ 5. Database Schema Migration & Seeding

We have provided automated CLI commands that will construct all 21 tables and seed the system with zero manual SQL writing needed.

### Step 5.1: Run Schema Migration
```bash
npm run db:migrate
```
*Output will verify the creation and indexing of:*
- `users`
- `learning_paths`
- `courses`
- `modules`
- `lessons`
- `lesson_progress`
- `quizzes`
- `questions`
- `options`
- `enrolments`
- `quiz_retry_windows`
- `quiz_attempts`
- `exam_violation_events`
- `credentials`
- `assignment_submissions`
- `certificate_requests`
- `course_video_assets`
- `reward_ledger`
- `audit_logs`
- `support_tickets`
- `system_settings`

### Step 5.2: Seed Initial Admin & Foundation Catalog
```bash
npm run db:seed
```
*This seeds:*
1. Default system settings (`public_catalog_enabled = true`).
2. Super Admin user (`admin@redkross.org.in`).
3. Core foundational courses with What-You-Will-Learn and Learning Objectives.

---

## 🏗️ 6. Build Frontend & Launch PM2 Daemon

### Step 6.1: Build React Production Bundle
```bash
npm run build
```
*(This compiles the frontend assets into `/var/www/redkross-academy/dist` in ~25-30 seconds.)*

### Step 6.2: Launch Application via PM2
We use the provided `ecosystem.config.cjs` to run our production server in cluster mode:
```bash
pm2 start ecosystem.config.cjs --env production
```

### Step 6.3: Configure PM2 System Startup
Make sure the application boots up automatically whenever the server restarts:
```bash
pm2 startup systemd
# Copy-paste the exact sudo env command printed by PM2
pm2 save
```

### Step 6.4: Verify Server Health Locally
```bash
curl -s http://127.0.0.1:3000/healthz | jq
```
Expected response:
```json
{
  "status": "healthy",
  "service": "RedKross Academy Production Gateway",
  "environment": "production",
  "database": "connected",
  "uptime_seconds": 12,
  "timestamp": "2026-10-31T15:30:00.000Z"
}
```

---

## ☁️ 7. Cloudflare Tunnel (`cloudflared`) Setup

Cloudflare Tunnel exposes your local `http://127.0.0.1:3000` port to your public domain (`academy.redkross.org.in`) over encrypted outbound tunnels with full DDoS protection and automatic SSL.

### Step 7.1: Install `cloudflared` on Ubuntu
```bash
# Download cloudflared debian package
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
rm cloudflared-linux-amd64.deb

# Verify installation
cloudflared --version
```

### Step 7.2: Authenticate Cloudflare
```bash
cloudflared tunnel login
```
*A URL will be displayed in the terminal. Open that URL in your browser, log in to your Cloudflare account, and select your domain (e.g., `redkross.org.in`). Once selected, Cloudflare will download a certificate to `~/.cloudflared/cert.pem` on your server.*

### Step 7.3: Create Named Tunnel
```bash
cloudflared tunnel create redkross-tunnel
```
*Note the Tunnel UUID and credentials file path printed in the terminal (e.g., `/home/username/.cloudflared/12345678-abcd-1234-abcd-1234567890ab.json`).*

### Step 7.4: Configure Ingress Rules
Create the configuration file at `/etc/cloudflared/config.yml`:
```bash
sudo mkdir -p /etc/cloudflared
sudo nano /etc/cloudflared/config.yml
```

Paste the following configuration (replace `<YOUR-TUNNEL-UUID>` with your actual Tunnel UUID):
```yaml
tunnel: <YOUR-TUNNEL-UUID>
credentials-file: /root/.cloudflared/<YOUR-TUNNEL-UUID>.json

# Ingress Rules
ingress:
  # Route domain to local Express Production Server
  - hostname: academy.redkross.org.in
    service: http://127.0.0.1:3000
    originRequest:
      connectTimeout: 30s
      noTLSVerify: false

  # Default Catch-all rule (Required by Cloudflare)
  - service: http_status:404
```

### Step 7.5: Route Public DNS to the Tunnel
Route your domain or subdomain to the tunnel:
```bash
cloudflared tunnel route dns redkross-tunnel academy.redkross.org.in
```
*(This automatically adds a CNAME record in your Cloudflare DNS table pointing `academy.redkross.org.in` to `<YOUR-TUNNEL-UUID>.cfargotunnel.com`.)*

### Step 7.6: Enable WebSockets in Cloudflare Dashboard
To ensure real-time proctoring telemetry (`Socket.io`) works reliably:
1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to your domain -> **Network**.
3. Ensure **WebSockets** toggle is **ON** (Enabled).

### Step 7.7: Install & Start Cloudflare Tunnel as a System Service
```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
sudo systemctl status cloudflared
```

🎉 **Congratulations! Your site is now live at `https://academy.redkross.org.in` with full SSL, DDoS protection, Express + Socket.io, and persistent PostgreSQL storage!**

---

## 💾 8. Automated Daily Database Backups

We have provided a production backup script: `scripts/backup_postgres.sh`.

### Step 8.1: Test the Backup Script
```bash
chmod +x /var/www/redkross-academy/scripts/backup_postgres.sh
sudo /var/www/redkross-academy/scripts/backup_postgres.sh
```
*Backups are saved to `/var/backups/redkross_postgres/` with gzip compression and automatic 14-day retention.*

### Step 8.2: Schedule Cron Job
Set up a daily cron job to run every night at 2:00 AM:
```bash
sudo crontab -e
```
Add the following line at the end:
```cron
0 2 * * * /var/www/redkross-academy/scripts/backup_postgres.sh >> /var/log/redkross_backup.log 2>&1
```

### Step 8.3: How to Restore from a Backup
If you ever need to restore your database on a new server or recover from accidental corruption:
```bash
gunzip < /var/backups/redkross_postgres/redkross_db_backup_YYYYMMDD_HHMMSS.sql.gz | psql -U redkross_admin -h 127.0.0.1 -d redkross_db
```

---

## 🛠️ 9. Operational Runbook & Maintenance Commands

### Viewing Application Logs
```bash
# View real-time cluster logs
pm2 logs redkross-academy

# View only errors
pm2 logs redkross-academy --err

# View CPU/Memory metrics
pm2 monit
```

### Applying Code Updates / Git Pulls
When updating code on the production server:
```bash
cd /var/www/redkross-academy
git pull origin main
npm install
npm run db:migrate  # Safe & idempotent
npm run build
pm2 reload redkross-academy --update-env
```

### Checking Cloudflare Tunnel Health
```bash
sudo systemctl status cloudflared
# View tunnel connection status
cloudflared tunnel info redkross-tunnel
```

### Restarting Services
```bash
# Restart App
pm2 restart redkross-academy

# Restart PostgreSQL
sudo systemctl restart postgresql

# Restart Cloudflare Tunnel
sudo systemctl restart cloudflared
```

---

## ❓ 10. Frequently Asked Questions (FAQ)

#### Q: Do I need NGINX or Apache?
**No.** `server/productionServer.js` is an optimized Express production gateway with gzip/brotli-ready static caching and integrated Socket.io. Cloudflare Tunnel proxies traffic directly to `http://127.0.0.1:3000`. You do not need to configure or maintain NGINX or Apache.

#### Q: Do I need Let's Encrypt / Certbot?
**No.** Cloudflare automatically terminates SSL/TLS at its edge network and issues edge SSL certificates completely free of charge. Traffic between Cloudflare's edge and your server is encrypted over the outbound `cloudflared` tunnel.

#### Q: What if I want to switch to a Managed PostgreSQL (e.g. AWS RDS or Supabase)?
Simply change the `DATABASE_URL` in `/var/www/redkross-academy/.env` to your RDS or Supabase connection string and restart PM2 (`pm2 restart redkross-academy`). Our universal database driver in `api/_db.js` works identically across local PostgreSQL, AWS RDS, Supabase, and Neon without code modifications.

---
*Authored for RedKross Academy Infrastructure Engineering Team.*
