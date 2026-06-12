# FlyKey Server Deployment Spec

## Goal

Bring the first real FlyKey server online before any store publication work.
The server must host the FlyKey public site and backend now, and leave room for
at least one more project later.

## Server

- Provider: Hetzner Cloud
- Server ID: `139619947`
- Name in Hetzner: `ubuntu1`
- Public IPv4: `178.105.146.135`
- IPv6 range: `2a01:4f8:c015:f3a::/64`
- Location: Falkenstein, Germany
- Plan: `cpx22`
- Resources: 2 vCPU, 4 GB RAM, 80 GB local disk
- Backups: enabled
- OS: Ubuntu

## Access

- SSH user for emergency access: `root`
- SSH key: existing laptop key, comment `tssee.ram@gmail.com`
- Create a non-root deploy/admin user before application deployment.
- Keep password SSH login disabled.

## Host Layout

Use `/srv` for hosted projects:

- `/srv/flykey-backend` - production FlyKeyBackend checkout
- `/srv/flykey-web/current` - production FlyKey public website/static app
- `/srv/shared` - optional shared reverse proxy/runtime files later
- `/var/backups/flykey` - FlyKey database backups

This keeps the server ready for additional projects without mixing app data.

## Runtime

- Reverse proxy: nginx
- TLS: Let's Encrypt certbot, active for `flykey.org`, `www.flykey.org`, and
  `api.flykey.org`
- PHP: PHP-FPM for Symfony backend
- Database: PostgreSQL 16 in Docker Compose, private Docker network only
- App code: deployed from the FlyKeyBackend repository
- Public website: deployed from this repository to `/srv/flykey-web/current`
- Public API domain: `api.flykey.org`
- Public website domain: `flykey.org`
- Canonical redirect: `www.flykey.org` redirects to `https://flykey.org`

## Network

Open public ports:

- `22/tcp` SSH
- `80/tcp` HTTP for Let's Encrypt and redirect
- `443/tcp` HTTPS API

Keep closed publicly:

- PostgreSQL
- adminer
- any internal app/debug ports

## Deployment Gate

Before switching clients to production:

1. DNS `api.flykey.org` points to `178.105.146.135`.
2. HTTPS certificate is issued and nginx serves the API.
3. Production `.env.local` exists on the server with unique secrets.
4. Migrations run successfully.
5. Backend deployment check passes in production mode.
6. Smoke test passes against `https://api.flykey.org`.
7. Public website smoke test passes against `https://flykey.org`.
8. FlyKey app/site config points to the production API only after smoke passes.

## First Execution Plan

1. Update the server and install base packages.
2. Create a non-root user with the laptop SSH key.
3. Enable firewall with SSH/HTTP/HTTPS only.
4. Install Docker and Compose plugin.
5. Install nginx, certbot, PHP-FPM, and required PHP extensions.
6. Prepare `/srv/flykey-backend` and `/var/backups/flykey`.
7. Copy/adapt production compose and nginx templates.
8. Stop and ask before real production secrets or DNS/TLS work if credentials
   or external DNS changes are required.

## Current Status

- SSH works for `root` and `deploy`.
- Firewall is active; public inbound ports are SSH, HTTP, and HTTPS only.
- Docker and Docker Compose are installed.
- nginx is installed and configured for `api.flykey.org` on HTTPS.
- FlyKeyBackend code is deployed to `/srv/flykey-backend`.
- FlyKey public site/static app is deployed to `/srv/flykey-web/current`.
- Backend runs in Docker on official `php:8.4-fpm-alpine`.
- PostgreSQL runs in Docker and is bound to `127.0.0.1:5432` only.
- PHP-FPM app is bound to `127.0.0.1:9000` only.
- Production migrations have run.
- `app:deployment-check --env=prod --no-debug` passes.
- DNS is configured at United Domains:
  - `flykey.org A -> 178.105.146.135`
  - `www.flykey.org CNAME -> flykey.org`
  - `api.flykey.org A -> 178.105.146.135`
- Let's Encrypt certificate for `api.flykey.org` is issued and expires on
  2026-09-09; certbot auto-renewal is installed.
- Let's Encrypt certificate for `flykey.org` and `www.flykey.org` is issued and
  expires on 2026-09-09; certbot auto-renewal is installed.
- HTTPS health check passes when resolved to the Hetzner server:
  `https://api.flykey.org/api/health`.
- Public website HTTPS checks pass:
  - `https://flykey.org/`
  - `https://flykey.org/privacy.html`
  - `https://flykey.org/support.html`
  - `https://flykey.org/api/health`
  - `https://flykey.org/api/content/version`
- `http://flykey.org` redirects to `https://flykey.org`.
- `https://www.flykey.org` redirects to `https://flykey.org`.
- HTTP redirects to HTTPS on the Hetzner server.
- Public HTTPS smoke test passes against the production backend:
  health, registration, `/api/v1/me`, and test account deletion.

## Next Step

FlyKey client/app runtime config points to `https://api.flykey.org`.
The app-level backend/profile sync smoke test passes against production.
The public website is now served from the Hetzner server instead of GitHub
Pages.

Next: run full manual app QA on `https://flykey.org` and the packaged desktop
app with the production backend enabled.

Optional later: add `AAAA` for `api.flykey.org` using one address from
`2a01:4f8:c015:f3a::/64`.
