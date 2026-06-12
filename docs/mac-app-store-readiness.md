# FlyKey Mac App Store Readiness

This project targets a macOS keyboard trainer. The App Store path is a Mac App Store Electron build, not an iOS app.

## Code Readiness

- Desktop runtime is detected from the Electron entry point.
- Web-only SEO content is hidden in desktop mode.
- Google Analytics and the privacy consent banner are disabled in desktop mode.
- Storyboard and roadmap tooling is disabled in packaged desktop production.
- Cloud/account UI is hidden unless a backend URL is explicitly configured.
- Electron Forge has a separate MAS path through `FLYKEY_BUILD_TARGET=mas`.
- MAS entitlements enable App Sandbox.
- `npm run check:mas-readiness` verifies the release-critical wiring above.

## Build Commands

Regular macOS package:

```sh
npm run package:mac
npm run make:mac
```

Mac App Store package skeleton:

```sh
FLYKEY_MAC_APP_STORE_IDENTITY="3rd Party Mac Developer Application: <Team Name> (<Team ID>)" \
FLYKEY_MAC_INSTALLER_IDENTITY="3rd Party Mac Developer Installer: <Team Name> (<Team ID>)" \
FLYKEY_PROVISIONING_PROFILE="/absolute/path/to/profile.provisionprofile" \
npm run make:mas
```

The exact certificate name and provisioning profile come from Apple Developer / App Store Connect.

## App Store Connect Checklist

- Apple Developer Program membership.
- Bundle ID matching `org.flykey.app`.
- Mac App Store signing certificate.
- Mac App Store provisioning profile.
- App Store Connect app record.
- App name, subtitle, description, keywords, category, age rating.
- macOS screenshots from `docs/app-store/screenshots/mac`.
- Support URL: `https://flykey.org/support.html`.
- Privacy Policy URL: `https://flykey.org/privacy.html`.
- App Privacy answers from `docs/app-store-metadata.md`.

## Current Product Scope

The App Store build should be local-first:

- no account required;
- progress and settings stored locally;
- no analytics inside the Mac app;
- no cloud sync until backend, account deletion, privacy, and Sign in with Apple are production-ready.

## Remaining Manual Release Work

- Create Apple certificates and provisioning profile.
- Run a signed MAS build on the target Mac.
- Test sandboxed app launch, storage, sound, lessons, settings, and restart behavior.
- Upload the pkg through Transporter or Xcode.
- Complete App Review metadata and privacy forms.

## Prepared Submission Assets

- Privacy policy page: `privacy.html`.
- Support page: `support.html`.
- App Store metadata: `docs/app-store-metadata.md`.
- Apple Developer setup checklist: `docs/apple-developer-setup.md`.
- Mac screenshots: `docs/app-store/screenshots/mac`.
