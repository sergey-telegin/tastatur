# FlyKey Backend Integration

FlyKey uses a separate Symfony backend as an optional cloud layer. The app must keep working without it.

## Repositories

- App/site/content repo: `/Users/sergeytelegin/FlyKey`
- Backend repo/workspace: `/Users/sergeytelegin/FlyKeyBackend`

## Current Backend Capability

The backend already exposes:

- `GET /api/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/me`
- `GET /api/v1/me/entitlements`
- `GET /api/v1/oauth/providers`
- `GET /api/v1/oauth/{provider}/start`
- `GET|POST /api/v1/oauth/{provider}/callback`
- `GET|POST /api/v1/profiles`
- `GET|PATCH|DELETE /api/v1/profiles/{id}`
- `GET|PUT /api/v1/profiles/{id}/state`
- `GET|PUT /api/v1/profiles/{id}/progress`
- `POST /api/v1/migration/local-state`

The backend model is FlyKey-specific:

- `User`
- `Device`
- `Session`
- `ExternalIdentity`
- `OAuthLoginState`
- `Entitlement`
- `FlyKeyProfile`
- `AuditLog`

## Auth Providers

The intended first provider set is:

- email/password
- Google
- Apple
- Microsoft

OAuth provider buttons appear in the app only when the backend reports configured providers from `/api/v1/oauth/providers`.

## Entitlements

Profile sync is protected by:

```text
profile_sync
```

Users can register and sign in without this entitlement, but profile import/sync endpoints return `403` until `profile_sync` is active.

Local grant example in `/Users/sergeytelegin/FlyKeyBackend`:

```sh
php bin/console app:grant-entitlement user@example.com profile_sync
```

## Local Run

Backend:

```sh
cd /Users/sergeytelegin/FlyKeyBackend
docker-compose up -d
php bin/console doctrine:migrations:migrate --no-interaction
php -S 127.0.0.1:8084 -t public
```

Frontend/site:

```sh
cd /Users/sergeytelegin/FlyKey
npm run server
```

Open the app with backend enabled:

```text
http://127.0.0.1:4173/?backendBaseUrl=http://127.0.0.1:8084
```

The `backendBaseUrl` query parameter is accepted only on local development origins (`localhost`, `127.0.0.1`, or a local file). Public pages such as `flykey.org` must not allow a link to swap the API server.

For the deployed website, set `backendBaseUrl` in `app/runtime-config.js`:

```js
window.FLYKEY_API_CONFIG = {
  ...(window.FLYKEY_API_CONFIG || {}),
  backendBaseUrl: "https://api.flykey.org"
};
```

The ready-to-copy production example is in `app/runtime-config.production.example.js`.
The committed `app/runtime-config.js` now points to `https://api.flykey.org`
because the production API smoke tests pass.

The account panel stays hidden when `backendBaseUrl` is not configured.
Packaged desktop production builds use the committed runtime config; keep App
Store privacy answers aligned with the enabled account/cloud behavior.

## Verification

Backend checks:

```sh
cd /Users/sergeytelegin/FlyKeyBackend
php bin/console lint:container
php bin/console doctrine:schema:validate --skip-sync
php bin/phpunit
```

App checks:

```sh
cd /Users/sergeytelegin/FlyKey
npm run check
```

## Release Rule

The first Mac App Store release remains local-first:

- no account required;
- account UI appears only when backend is configured;
- cloud sync remains gated by the `profile_sync` entitlement;
- privacy policy and App Privacy answers must match the enabled account/cloud
  behavior.
