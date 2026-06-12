# FlyKey Release Spec

This spec defines the first public release path for FlyKey and the follow-up cloud rollout.

## Release Strategy

FlyKey ships only after the product and backend are both release-ready.

The App Store is the final storefront step, not the place to validate product readiness.

FlyKey reaches that point in stages:

1. Product readiness: app behavior, content, lesson flow, local storage, and UI are stable.
2. Backend readiness: local and production API gates pass.
3. Integration readiness: app and backend work together, including account deletion and profile sync.
4. Release candidate: signed builds and manual QA pass.
5. Store submission: App Store Connect metadata, screenshots, upload, and review.

The first Mac App Store release remains local-first: accounts are optional, and
cloud sync is available only after the backend grants the `profile_sync`
entitlement.

## Pre-Store Readiness

Before any App Store upload:

- `npm run check` passes in `/Users/sergeytelegin/FlyKey`.
- Local FlyKey static/content API smoke passes with `npm run server:smoke`.
- Local FlyKeyBackend PHPUnit passes.
- Local FlyKeyBackend container lint passes.
- Local FlyKeyBackend Doctrine schema validation passes.
- Local FlyKeyBackend deployment check passes.
- Local FlyKeyBackend HTTP API is running.
- `npm run backend:smoke` passes.
- `npm run backend:smoke-sync` passes.
- Manual app QA passes against `https://api.flykey.org`.
- Production backend is deployed and smoke-tested.
- Privacy policy and App Store privacy answers match the actual enabled behavior.

## Mac App Store v1

### Scope

The v1 Mac App Store build includes:

- structured typing lessons;
- local progress;
- local settings;
- custom text practice;
- custom fingering;
- keyboard/finger hints;
- light and dark themes;
- sound and assistant toggles;
- Russian, Ukrainian, Kazakh, German, and English lesson content.

### Excluded From v1

The v1 Mac App Store build excludes:

- required accounts;
- analytics;
- tracking;
- purchases/subscriptions;
- external AI or translation calls.

### Privacy Position

The App Store privacy answer for v1 must cover optional account/cloud behavior
because production runtime config points to `https://api.flykey.org`.

### Release Gates

Before submitting v1:

- `npm run check` passes.
- `npm run release:check-apple-signing` passes on the release Mac.
- `npm run release:mas` produces the signed Mac App Store package.
- MAS readiness check passes.
- App Store assets check passes.
- App icon exists at `build/icon.icns`.
- Privacy page is available at `https://flykey.org/privacy.html`.
- Support page is available at `https://flykey.org/support.html`.
- App Store screenshots exist in `docs/app-store/screenshots/mac`.
- App Store metadata is copied from `docs/app-store-metadata.md`.
- Apple certificates are installed on the release Mac.
- MAS provisioning profile exists for `org.flykey.app`.
- Signed MAS package is built with `npm run make:mas`.
- The packaged app is manually tested in sandbox mode.
- The package is uploaded through Transporter or Xcode.

Use `npm run release:mas` as the main local release command after Apple certificates and the provisioning profile are installed.
Use `docs/apple-signing-runbook.md` for the Apple-side certificate/profile setup.

### Manual QA

Manual QA must cover:

- first launch;
- lesson start;
- typing input;
- accuracy and speed updates;
- lesson progress persistence;
- settings persistence after restart;
- custom text practice;
- custom fingering save/load;
- sound toggle;
- light/dark theme;
- offline launch;
- optional account UI works against `https://api.flykey.org`;
- no analytics/privacy consent banner in desktop production.

## Website Release

The public website can continue to serve:

- product homepage;
- trainer demo/site version;
- support page;
- privacy page;
- content API for lesson bundle/version.

The website runtime config points to `https://api.flykey.org`.

## Backend Stage

The backend is a separate Symfony project at `/Users/sergeytelegin/FlyKeyBackend`.

### Backend Scope

The cloud stage includes:

- email/password auth;
- optional Google, Apple, and Microsoft OAuth;
- account deletion;
- profile sync entitlement;
- profile state sync;
- progress sync;
- admin dashboard;
- audit log;
- deployment checks;
- production backup routine.

### Backend Production Gates

Before enabling backend on `flykey.org`:

- production server is provisioned;
- DNS points `api.flykey.org` to the server;
- HTTPS is active;
- PostgreSQL is private and backed up;
- production secrets are configured outside git;
- `APP_ENV=prod`;
- `APP_DEBUG=0`;
- `REQUIRE_HTTPS=1`;
- CORS allows only FlyKey public origins;
- `/admin` is protected by role and network restrictions;
- migrations run successfully;
- `php bin/console app:deployment-check --env=prod --no-debug` passes;
- `API_BASE_URL=https://api.flykey.org ops/smoke-api.sh` passes;
- privacy policy is reviewed for account/cloud behavior;
- account deletion is verified through `DELETE /api/v1/me`.

### Backend Enablement

Production smoke tests pass, so the runtime config is set to:

```js
window.FLYKEY_API_CONFIG = {
  ...(window.FLYKEY_API_CONFIG || {}),
  backendBaseUrl: "https://api.flykey.org"
};
```

Then verify from the public website and desktop app:

- account panel appears;
- registration succeeds;
- login succeeds;
- logout succeeds;
- account deletion succeeds;
- profile sync remains gated by `profile_sync`;
- sync works after entitlement grant.

## Mac App Store Cloud Update

Cloud sync can be added to a future Mac App Store update only after:

- production backend has real monitoring/backup discipline;
- Sign in with Apple is production-ready if other social login providers are offered;
- App Privacy answers are updated;
- review notes mention account deletion and cloud behavior;
- account UI is tested in packaged desktop production;
- local-first behavior remains available without an account.

## Current Decision

Proceed toward a local-first Mac App Store v1 with optional backend accounts
enabled against `https://api.flykey.org`. The store submission stays last; app,
backend, integration, privacy, signing, and manual QA gates come first.
