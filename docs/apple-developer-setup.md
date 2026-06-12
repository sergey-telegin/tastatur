# Apple Developer Setup

This file tracks the Apple-side work that cannot be completed from the codebase alone.

## 1. Create App ID

- Go to Apple Developer > Certificates, Identifiers & Profiles.
- Create or confirm an explicit App ID for `org.flykey.app`.
- Platform: macOS.
- Keep capabilities minimal for the first release. The current code only needs App Sandbox.

## 2. Create Certificates

Create these distribution certificates in the Apple Developer account:

- `3rd Party Mac Developer Application: <Team Name> (<Team ID>)`
- `3rd Party Mac Developer Installer: <Team Name> (<Team ID>)`

Install both certificates in the macOS Keychain on the release machine.

## 3. Create Provisioning Profile

- Go to Profiles.
- Select Distribution.
- Select `Mac App Store Connect`.
- Select the App ID matching `org.flykey.app`.
- Select the Mac App Store distribution certificate.
- Generate and download the profile.

Use its absolute path as `FLYKEY_PROVISIONING_PROFILE`.

## 4. Build Locally

```sh
FLYKEY_MAC_APP_STORE_IDENTITY="3rd Party Mac Developer Application: <Team Name> (<Team ID>)" \
FLYKEY_MAC_INSTALLER_IDENTITY="3rd Party Mac Developer Installer: <Team Name> (<Team ID>)" \
FLYKEY_PROVISIONING_PROFILE="/absolute/path/to/FlyKey.provisionprofile" \
npm run make:mas
```

Expected unsigned-local result without certificates:

```text
No identity found for signing.
```

That error means the code pipeline reaches the signing stage and is waiting for Apple credentials.

## 5. Create App Store Connect App Record

- Platform: macOS.
- Name: FlyKey.
- Bundle ID: `org.flykey.app`.
- SKU: `flykey-macos`.
- Primary category: Education.
- Add Support URL and Privacy Policy URL from `docs/app-store-metadata.md`.

## 6. Upload Build

Use Transporter or Xcode. Apple documents upload support through Xcode, altool, Transporter, and the App Store Connect API.

## 7. Fill App Review Material

- Paste metadata from `docs/app-store-metadata.md`.
- Upload screenshots from `docs/app-store/screenshots/mac`.
- Fill App Privacy using the local-first answers in `docs/app-store-metadata.md`.
- Submit for review.
