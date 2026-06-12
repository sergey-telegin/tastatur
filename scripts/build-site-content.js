#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const siteContent = require("../site-content/site-content.js");

const rootDir = path.resolve(__dirname, "..");
const checkOnly = process.argv.includes("--check");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function pageShell({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="robots" content="index, follow">
    <meta name="description" content="${escapeAttribute(description)}">
    <style>
      :root {
        color-scheme: light dark;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.55;
        background: #f7f6f2;
        color: #1d1d1f;
      }

      body {
        margin: 0;
      }

      main {
        box-sizing: border-box;
        max-width: 820px;
        margin: 0 auto;
        padding: 56px 24px 72px;
      }

      h1,
      h2 {
        line-height: 1.15;
        letter-spacing: 0;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 40px;
      }

      h2 {
        margin: 36px 0 10px;
        font-size: 22px;
      }

      p,
      li {
        font-size: 17px;
      }

      a {
        color: #0b57d0;
      }

      .updated {
        color: #66605a;
        margin: 0 0 32px;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          background: #111318;
          color: #f5f2ea;
        }

        .updated {
          color: #bdb6aa;
        }

        a {
          color: #8ab4ff;
        }
      }
    </style>
  </head>
  <body>
    <main>
${body}
    </main>
  </body>
</html>
`;
}

function linkifySupportEmail(text) {
  const email = siteContent.brand.supportEmail;
  return escapeHtml(text).replaceAll(
    escapeHtml(email),
    `<a href="mailto:${escapeAttribute(email)}">${escapeHtml(email)}</a>`
  );
}

function renderPrivacyPage() {
  const privacy = siteContent.legal.privacy;
  const sections = privacy.sections.map(([heading, text]) => `      <h2>${escapeHtml(heading)}</h2>
      <p>
        ${linkifySupportEmail(text)}
      </p>`).join("\n\n");

  return pageShell({
    title: privacy.title,
    description: privacy.description,
    body: `      <h1>${escapeHtml(privacy.title)}</h1>
      <p class="updated">Last updated: ${escapeHtml(siteContent.legal.lastUpdated)}</p>

      <p>
        ${escapeHtml(privacy.intro)}
      </p>

${sections}`
  });
}

function renderSupportSection([heading, value]) {
  if (Array.isArray(value)) {
    const items = value.map(item => `        <li>${escapeHtml(item)}</li>`).join("\n");
    return `      <h2>${escapeHtml(heading)}</h2>
      <ul>
${items}
      </ul>`;
  }

  if (heading === "Privacy") {
    return `      <h2>${escapeHtml(heading)}</h2>
      <p>
        Read the <a href="/privacy.html">FlyKey Privacy Policy</a>.
      </p>`;
  }

  return `      <h2>${escapeHtml(heading)}</h2>
      <p>
        ${linkifySupportEmail(value)}
      </p>`;
}

function renderSupportPage() {
  const support = siteContent.legal.support;
  const sections = support.sections.map(renderSupportSection).join("\n\n");

  return pageShell({
    title: support.title,
    description: support.description,
    body: `      <h1>${escapeHtml(support.title)}</h1>
      <p>
        ${escapeHtml(support.intro)}
      </p>

${sections}`
  });
}

function renderAppStoreMetadata() {
  const { brand, appStore } = siteContent;
  const description = appStore.description.join("\n\n");
  const privacyAnswers = appStore.privacyAnswers
    .map(([label, value]) => `- ${label}: ${value}`)
    .join("\n");
  const screenshotSizes = appStore.screenshotSizes.map(size => `- ${size}`).join("\n");

  return `# FlyKey App Store Metadata

Use this file as the source text for App Store Connect. The current App Store target is macOS only.

## App Information

- App name: ${appStore.appName}
- Subtitle: ${appStore.subtitle}
- Bundle ID: ${appStore.bundleId}
- SKU: ${appStore.sku}
- Primary category: ${appStore.primaryCategory}
- Secondary category: ${appStore.secondaryCategory}
- Age rating: ${appStore.ageRating}
- Copyright: ${appStore.copyright}
- Support URL: ${brand.supportUrl}
- Privacy Policy URL: ${brand.privacyUrl}

## Promotional Text

${appStore.promotionalText}

## Description

${description}

## Keywords

${appStore.keywords}

## What's New

${appStore.whatsNew}

## Review Notes

${appStore.reviewNotes}

## App Privacy Answers

Recommended App Store Connect answer for the current Mac App Store build:

${privacyAnswers}

Explanation: ${appStore.privacyExplanation}

If cloud sync, accounts, analytics, purchases, or external AI/translation are enabled in a future release, these answers must be reviewed and updated before submission.

## Screenshot Requirements

Apple accepts Mac screenshots with a 16:10 aspect ratio. Valid sizes include:

${screenshotSizes}

The generated screenshot pack in \`docs/app-store/screenshots/mac\` uses 1280 x 800 JPG files.
`;
}

function renderSeoSection() {
  const seo = siteContent.seo;
  const nav = seo.nav
    .map(([href, label]) => `          <a href="${escapeAttribute(href)}">${escapeHtml(label)}</a>`)
    .join("\n");
  const summary = seo.summary.map(([title, text]) => `          <article>
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(text)}</p>
          </article>`).join("\n");
  const articles = seo.articles.map(article => `        <article class="seo-article" id="${escapeAttribute(article.id)}">
          <h2>${escapeHtml(article.title)}</h2>
${article.paragraphs.map(paragraph => `          <p>
            ${escapeHtml(paragraph)}
          </p>`).join("\n")}
        </article>`).join("\n\n");
  const faq = seo.faq.map(([summaryText, answer]) => `          <details>
            <summary>${escapeHtml(summaryText)}</summary>
            <p>${escapeHtml(answer)}</p>
          </details>`).join("\n");

  return `    <section class="seo-content" aria-labelledby="seoTitle">
      <div class="seo-content-inner">
        <nav class="seo-nav" aria-label="${escapeAttribute(seo.navLabel)}">
${nav}
        </nav>

        <p class="seo-eyebrow">${escapeHtml(seo.eyebrow)}</p>
        <h1 id="seoTitle">${escapeHtml(seo.title)}</h1>
        <p class="seo-lead">
          ${escapeHtml(seo.lead)}
        </p>
        <div class="seo-summary-grid" aria-label="${escapeAttribute(seo.summaryLabel)}">
${summary}
        </div>

${articles}

        <section class="seo-faq" aria-labelledby="seo-faq-title">
          <h2 id="seo-faq-title">${escapeHtml(seo.faqTitle)}</h2>
${faq}
        </section>
      </div>
    </section>`;
}

function writeIfChanged(relativePath, content) {
  const absolutePath = path.join(rootDir, relativePath);
  const current = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "";

  if (current === content) return false;
  if (checkOnly) {
    throw new Error(`${relativePath} is not generated from site-content/site-content.js`);
  }

  fs.writeFileSync(absolutePath, content);
  return true;
}

function replaceGeneratedBlock(relativePath, startMarker, endMarker, generated) {
  const absolutePath = path.join(rootDir, relativePath);
  const current = fs.readFileSync(absolutePath, "utf8");
  const start = current.indexOf(startMarker);
  const end = current.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`${relativePath} is missing generated block markers`);
  }

  const next = `${current.slice(0, start + startMarker.length)}\n${generated}\n${current.slice(end)}`;
  return writeIfChanged(relativePath, next);
}

const changed = [];
[
  ["privacy.html", renderPrivacyPage()],
  ["support.html", renderSupportPage()],
  ["docs/app-store-metadata.md", renderAppStoreMetadata()]
].forEach(([relativePath, content]) => {
  if (writeIfChanged(relativePath, content)) changed.push(relativePath);
});

if (replaceGeneratedBlock(
  "index.html",
  "    <!-- site-content:seo:start -->",
  "    <!-- site-content:seo:end -->",
  renderSeoSection()
)) {
  changed.push("index.html");
}

if (checkOnly) {
  console.log("Site content generated artifacts are up to date");
} else {
  console.log(changed.length
    ? `Updated ${changed.join(", ")}`
    : "Site content generated artifacts are up to date");
}
