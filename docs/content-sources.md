# FlyKey Content Sources

FlyKey keeps product, interface, and publishing content in separate sources.

## Product Content

Source:

- `practice-content.js`
- `practice-content/modules/module*.js`
- `practice-content/storyboard.js`
- `practice-content/content-version.js`

Generated artifact:

- `practice-content/content-bundle.json`

Used by:

- the website app
- the packaged macOS app
- future backend/content API responses

Workflow:

```sh
npm run content:build
npm run check
```

This layer owns lessons, modules, training lines, lesson tips, lesson images, completion text, and content versioning.

## UI Text

Source:

- `app/data.js`
- UI controllers and views that read from `uiText`

Used by:

- the website app
- the packaged macOS app

This layer owns buttons, settings labels, app states, errors, dialogs, and other system interface strings.

## Marketing And Legal Content

Source:

- `site-content/site-content.js`

Generated artifacts:

- SEO section in `index.html`
- `privacy.html`
- `support.html`
- `docs/app-store-metadata.md`

Workflow:

```sh
npm run site:build
npm run check
```

This layer owns public website copy, SEO copy, App Store Connect text, support copy, privacy policy text, App Privacy answers, and public publishing URLs.

Do not edit the generated artifacts directly for copy changes. Edit `site-content/site-content.js`, regenerate, and let `npm run check` verify that generated files are up to date.
