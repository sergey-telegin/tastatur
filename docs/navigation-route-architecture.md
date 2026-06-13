# FlyKey Route And Navigation Architecture

Last updated: 2026-06-13

## Goal

FlyKey should have one route/navigation model across the public web app, Electron desktop app, and any future app shell.

The model should provide:

- stable URL-addressable destinations on web;
- browser back/forward for web;
- the same destination graph for desktop and mobile shells;
- deep-link ready route ids and params;
- less screen/mode state hidden in global variables and controllers;
- route params based on stable ids such as `language`, `moduleId`, `lessonId`, `keyId`, `practiceType`, and `gameId`, not UI indexes.

This repository is currently a static HTML plus vanilla JS app. So the near-term target is a small navigation core for the current runtime, with adapters for web URL history and Electron-style stack behavior.

## Current State

The app starts from `index.html` and loads global scripts in order. Most app state is global:

- `currentLanguage`
- `currentPracticeModule`
- `practiceLineIndex`
- settings dialog state
- learning program dialog state
- custom practice dialog state
- stats/help/fingering state
- onboarding and lesson-tip state

Primary navigation-like actions today are direct function calls:

- `openSettingsDialog()`
- `openLearningProgramDialog()`
- `openCustomPracticeDialog(moduleId)`
- `openStatsDialog()`
- `openHelpDialog()`
- `applySettings({ language, module })`
- `resetModuleProgress(moduleId, language)`
- `openCurrentLessonTip()`
- `openCompletionDialog()`
- `openFingerMapDraft()`

This makes screens work locally, but it means:

- URLs do not represent app destinations;
- browser back/forward cannot close dialogs or return between app sections;
- deep links cannot target a lesson, language, custom practice flow, or fingering editor;
- route identity is mixed with transient state;
- platform-specific hacks, such as mobile redirects, live outside a durable app navigation model.

## Destination Model

Routes should be declared as data, not inferred from controller state.

Initial route set:

| Route id | Web path | Stable params | Notes |
| --- | --- | --- | --- |
| `home` | `/` | none | Default trainer shell. |
| `trainer.lesson` | `/learn/:language/:lessonId` | `language`, `lessonId` | Main practice route for a lesson/module. |
| `trainer.custom` | `/practice/custom/:language` | `language`, optional `sourceId` | User-provided text practice setup/runtime. |
| `trainer.random` | `/practice/random/:language` | `language`, optional `sourceId` | Random text practice setup/runtime. |
| `settings` | `/settings` | optional panel id | Settings destination, not only modal state. |
| `settings.learningProgram` | `/settings/learning-program/:language` | `language` | Learning program picker. |
| `settings.fingering` | `/settings/fingering/:language` | `language`, optional `fingerId`, `keyId` | Finger map editor. |
| `settings.stats` | `/stats/:language` | `language` | Statistics. |
| `help` | `/help` | none | Help dialog/screen. |
| `lesson.tip` | `/learn/:language/:lessonId/intro` | `language`, `lessonId` | Optional routeable intro/tip state. |
| `lesson.complete` | `/learn/:language/:lessonId/complete` | `language`, `lessonId` | Optional completion screen. |
| `mobileGame` | `/mobile-game` or `/game/flykey-jump/:language?` | optional `language` | Mini-game as a first-class destination. |

Canonical ids:

- `language`: one of `en`, `de`, `ru`, `uk`, `kk`.
- `lessonId`: the stable lesson/module id from bundled practice content, such as `lesson1_4` or another content id.
- `keyId`: existing keyboard key ids from `app/utils/keymap.js`.
- `fingerId`: existing finger ids, such as `left-index`.
- `gameId`: stable id for mini-games, initially `flykey-jump`.

Avoid route params such as carousel index, visible tab index, current array offset, or localized lesson title.

## Route State Shape

Add a central route object:

```js
{
  id: "trainer.lesson",
  params: {
    language: "ru",
    lessonId: "lesson1_4"
  },
  query: {
    line: "3"
  },
  mode: "push" // push, replace, restore
}
```

Navigation should be expressed as intents:

```js
navigate({ id: "settings.learningProgram", params: { language: currentLanguage } });
navigate({ id: "trainer.lesson", params: { language: "de", lessonId: "lesson2_1" } });
replaceRoute({ id: "home" });
goBack();
```

Controllers should gradually stop calling each other directly and instead emit intents.

## Adapters

### Web Adapter

Responsibilities:

- parse `location.pathname`, `location.search`, and legacy hashes/query flags;
- create route objects;
- call `history.pushState` / `history.replaceState`;
- listen to `popstate`;
- render/activate the correct app destination;
- preserve legacy URLs and private tooling URLs.

Web URL examples:

- `/`
- `/learn/ru/lesson1_4`
- `/settings/learning-program/ru`
- `/settings/fingering/de?finger=right-index&key=j`
- `/practice/custom/en`
- `/game/flykey-jump/uk`

### Desktop/Electron Adapter

Responsibilities:

- use the same route object and destination renderer;
- optionally keep URLs internal instead of visible;
- map app menu actions to navigation intents;
- preserve existing desktop flags such as `desktop=1` and production state.

### Future App Shell Adapter

Responsibilities:

- map route objects to a stack/deep-link model;
- use the same route ids and params;
- apply platform guards, such as opening `mobileGame` by default on phone.

This gives the project route identity and deep-link discipline without requiring an immediate framework rewrite.

## Migration Plan

### Phase 1: Route Core, No UI Rewrite

Add:

- `app/navigation/routes.js`
- `app/navigation/router.js`
- `app/navigation/web-adapter.js`
- `app/navigation/platform-guards.js`

The first renderer can still call existing functions:

- `settings` -> `openSettingsDialog()`
- `settings.learningProgram` -> `openLearningProgramDialog()`
- `settings.stats` -> `openStatsDialog()`
- `help` -> `openHelpDialog()`
- `trainer.lesson` -> `applySettings({ language, module: lessonId })`

This phase should not change the visual app. It only introduces a real route source of truth and basic URL sync.

Compatibility requirements:

- `/` continues to open the trainer.
- existing `?lessonStoryboard`, `?roadmap`, `?previewWelcome`, `?freshUser`, `?calibrateHands`, and matching hashes keep their current behavior.
- mobile game redirect becomes a route guard, not a standalone early script.

### Phase 2: Dialogs Become Route Destinations

Make the main dialogs route-aware:

- closing a dialog calls `goBack()` if it was opened by navigation;
- browser Back closes the active modal/screen;
- direct URL load opens the correct dialog;
- dialogs no longer need to know who opened them.

Start with low-risk routes:

1. `settings`
2. `settings.stats`
3. `help`
4. `settings.learningProgram`

### Phase 3: Lesson And Practice Routes

Move lesson selection to stable route params:

- `currentPracticeModule` becomes derived from route when the route is `trainer.lesson`;
- `applySettings` becomes a route transition plus state persistence;
- lesson progress remains in storage, keyed by `language` and `lessonId`;
- line position can remain storage-driven at first, then optionally become query-driven.

Add legacy repair:

- if a route references a missing `lessonId`, redirect to first valid lesson for that language;
- if a route references unsupported `language`, redirect to browser/default language.

### Phase 4: Custom Practice And Fingering

Custom practice needs special handling because runtime lines are currently in memory:

- persisted custom text should be keyed by `language`;
- a route can open setup first: `/practice/custom/:language`;
- after Start, runtime can be represented by an ephemeral session id or kept in memory until a later storage design.

Fingering route should expose stable ids:

- `/settings/fingering/:language?finger=left-index&key=a`

The route should select the finger/key but not save changes by itself.

### Phase 5: Mobile Game As Destination

Replace the current separate-page redirect with a route:

- canonical: `/game/flykey-jump/:language?`
- legacy: `/mobile-game.html` redirects or aliases to the route.

Platform guard:

- phone web visiting `/` can replace to `/game/flykey-jump/:language?`;
- desktop visiting `/game/flykey-jump` shows a desktop CTA or allows mouse preview depending on product choice;
- future native shell can deep link to the same destination.

### Phase 6: Optional Framework Migration

Only after the route graph is stable, consider whether to move to a framework router.

Choices:

- keep vanilla route core;
- move web shell to a small client router;
- later port concepts into another app framework only if the product architecture actually moves there.

The important part is not the library. The durable part is route identity, params, and destination ownership.

## Acceptance Criteria

Navigation:

- Back from Settings returns to previous route.
- Direct `/settings` opens settings.
- Direct `/settings/learning-program/ru` opens learning program in Russian.
- Direct `/learn/de/<lessonId>` selects that lesson and language.
- Direct invalid lesson redirects to a valid lesson.
- Refresh preserves the current route.
- `mobileGame` is routeable and not just a one-off redirect.

State:

- `currentLanguage` and `currentPracticeModule` are either route-derived or updated only through router transitions.
- Progress remains keyed by stable `language` + `lessonId`.
- No route uses localized text or array index as identity.

Platform:

- Web URL is visible and back/forward works.
- Electron can use the same navigation intents without relying on browser address bar.
- Phone web can default to the game through a route guard.

## Risks

- Existing onboarding and lesson-tip dialogs pause/resume practice timers. Route close/open must keep `updatePracticeTimerPauseState()` behavior.
- `dialog.showModal()` has browser-specific behavior; route-driven modal open must be idempotent.
- Custom practice runtime text is currently ephemeral and should not be accidentally made shareable by URL until there is a privacy/storage decision.
- Existing private tools use query/hash flags and must be preserved.
- Mobile game currently lives as a separate page; folding it into the main app needs careful CSS isolation.

## Recommended First Implementation Slice

Implement only these first:

1. `app/navigation/routes.js`
2. `app/navigation/router.js`
3. `app/navigation/web-adapter.js`
4. route ids: `home`, `settings`, `settings.learningProgram`, `settings.stats`, `help`
5. browser back closes those dialogs
6. no lesson route migration yet

This proves the architecture while touching the least risky product behavior.
