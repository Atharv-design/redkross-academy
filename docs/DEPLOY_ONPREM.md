# Deploying RedKross Academy on the existing on-premises server

Based on the server capacity report of 2026-11-13 (Ubuntu 22.04 VM, 4 vCPU, 7.75 GB RAM,
shared with the main/cyber/psychology sites and Mailcow; traffic arrives through the
Cloudflare tunnel `redkross-production`). Verdict: **fits, with the changes below**.

## Architecture

```
Student browser
   │  HTTPS
Cloudflare edge ── caches /assets/*, images, lesson .md (see headers below)
   │  tunnel (cloudflared on the server)
127.0.0.1:3000  academy-api  (one Node process, PM2)  ── serves dist/ + /api + Socket.io
   │  TLS, port 6543
Supabase Postgres (Mumbai, ap-south-1)        Firebase Auth (Google sign-in)
```

Only API calls and cache misses reach the server. Grading is cheap (0.06 ms CPU to build a
40-question exam), so the API's real cost per request is database round trips. Keep the
database region close to the server (Mumbai).

## Already handled in the app

- Rate limiting works behind the tunnel: client IP from `CF-Connecting-IP` (only trusted
  from the local tunnel), per-user limits for signed-in calls, high per-IP ceilings so a
  college batch behind one NAT IP is not blocked (100 students × 6 calls tested). The old
  limiter never ran (wrong path check); `tests/unit_test_rate_limit.mjs`.
- Cache headers: hashed bundles 1 year immutable; images/media 1 day in browsers, 7 days at
  Cloudflare; lesson markdown 1 hour; `index.html` no-cache.
- Socket.io: WebSocket only, clients retry forever with jitter (survives the daily tunnel
  reconnect without a reconnect stampede). Sockets are only used when `VITE_SOCKET_URL` is set.
- PM2: one process, `max_memory_restart 700M`, heap cap 512 MB (`ecosystem.config.cjs`).
- API access log: method, path, status, duration only (no IPs or data). `ACCESS_LOG=0` turns it off.

## One-time setup (server owner; needs sudo for some steps)

1. **Database (Supabase):** create the project in **ap-south-1 (Mumbai)**, Pro plan (the free
   plan pauses inactive projects). Use the pooler URL on port **6543** as `DATABASE_URL`, and
   set `DB_ENGINE=pg` and `PGSSL=true`. Then run `node scripts/runMigrations.js` once.
2. **App directory**, e.g. `~/sites/academy`: clone, run `npm ci`, then `npm run build`. Create
   `.env` from `.env.example` with production values. Use a new `CREDENTIAL_SIGNING_SECRET` and
   rotated keys, and set `PUBLIC_BASE_URL=https://academy.redkross.org.in`.
3. **Start it:** `pm2 start ecosystem.config.cjs --env production && pm2 save`.
   Node 22 on the server is fine.
4. **Tunnel ingress:** add `academy.redkross.org.in → http://localhost:3000` in the Cloudflare
   Zero Trust dashboard. This doesn't restart anything.
5. **Tunnel protocol:** switch cloudflared to HTTP/2 (`--protocol http2`) to avoid the QUIC
   failures behind the Sophos firewall. Restarting the tunnel causes a few seconds of downtime
   for every site, so do it at a quiet time.
6. **Cloudflare cache:** the default rules respect the origin headers above. Optional: turn on
   **Tiered Cache** to reduce cold-cache bursts after a deploy.
7. **Cloudflare rate limiting (optional, free tier):** one rule on `/api/redeem` and
   `/api/auth`, as a second layer.
8. **Monitoring:** set `ENABLED="true"` in `/etc/default/sysstat`, and watch `pm2 logs academy-api`.

## Before 1,000 students are online at once

- Add a second cloudflared replica on another machine (tunnel high availability).
- Look into the unclean reboots (Oct 17, Oct 29): UPS and the Proxmox host logs.
- Measure real request times from the access log. If the p95 is much above 10 ms of CPU, or
  exam starts queue, choose one of:
  - run 2 API processes, after adding the Socket.io Redis adapter and moving the rate limiter
    to Redis or Cloudflare rules
  - move the API to a small 2 vCPU / 4 GB cloud VM
- Optional "Plan B": serve the static site from Cloudflare Pages and the 237 MB of media from
  R2, so the uplink only carries API traffic. This needs a configurable API base URL (not done
  yet).

## Deploying an update

```bash
cd ~/sites/academy && git pull && npm ci && npm run build
node scripts/runMigrations.js        # idempotent
pm2 reload academy-api
```
