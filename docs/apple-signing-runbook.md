# FlyKey Apple Signing Runbook

Use this when preparing the release Mac for `npm run release:mas`.

## Current Local Gate

Run:

```sh
npm run release:check-apple-signing
```

The command must find:

- `3rd Party Mac Developer Application`
- `3rd Party Mac Developer Installer`
- a Mac App Store provisioning profile for `org.flykey.app`

## Apple Developer Setup

In Apple Developer:

1. Open Certificates, Identifiers & Profiles.
2. Create or confirm a macOS App ID:
   - Bundle ID: `org.flykey.app`
   - Capabilities: App Sandbox only for v1
3. Create a Mac App Store application certificate:
   - Type: Mac App Distribution
   - Expected Keychain identity name starts with `3rd Party Mac Developer Application:`
4. Create a Mac Installer Distribution certificate:
   - Type: Mac Installer Distribution
   - Expected Keychain identity name starts with `3rd Party Mac Developer Installer:`
5. Download both certificates and install them into the login Keychain.
6. Create a Mac App Store provisioning profile:
   - Distribution type: Mac App Store Connect
   - App ID: `org.flykey.app`
   - Certificate: the Mac App Distribution certificate
7. Download the `.provisionprofile`.
8. Put the profile in:

```text
~/Library/MobileDevice/Provisioning Profiles/
```

## Local Verification

After installing the certificates and profile:

```sh
npm run release:check-apple-signing
```

If ready, the command prints the exact environment variables for the signed build.

## Build

Run:

```sh
npm run release:mas
```

Expected result:

- internal FlyKey checks pass;
- Apple signing check passes;
- Electron Forge creates the MAS app;
- maker-pkg creates the signed `.pkg`;
- packaged app verification runs.

## App Store Connect

Create the app record:

- Platform: macOS
- Name: FlyKey
- Bundle ID: `org.flykey.app`
- SKU: `flykey-macos`
- Category: Education
- Support URL: `https://flykey.org/support.html`
- Privacy Policy URL: `https://flykey.org/privacy.html`

Use text from `docs/app-store-metadata.md`.

Upload the signed `.pkg` through Transporter or Xcode.

## Do Not Enable For v1

Do not enable cloud sync or accounts for the first Mac App Store release.

The current v1 privacy posture depends on the app staying local-first.
