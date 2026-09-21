# Personal App Showcase - Web App MDD

2026-09-20 · @Someone

A lightweight, single-page HTML/CSS/JavaScript personal website that showcases my apps and games as a responsive grid of cards, built by Claude Code and deployed as a static site.

## 1. Overview & Objective

**Working title:** Personal App Showcase

**Elevator pitch:** A single-page personal website that acts as a landing hub for everything I've built — apps, games, side projects. Visitors land on a home page and see all of them laid out as attractive, scannable cards, each linking straight out to the app store or web page where they can actually use it.

**Primary objective:** Ship a single, self-contained static site (HTML/CSS/JS, no backend, no build tooling) that Claude Code can generate and I can commit to a Git repo and host for free (e.g. GitHub Pages). Adding a new app later should mean editing one JS array — no HTML/CSS changes.

**Target platform:** Fully responsive — desktop, tablet, and mobile browsers.

**Out of scope for v1:** accounts, analytics, backend/database, CMS, multiple pages (this is a single home page).

## 2. Core Features

1. **Header** — Site title / my name, a short tagline, all on the same single page.
2. **App Card Grid** — A responsive grid of cards, one per app/game, auto-populated from a single JS data array on page load.
3. **Each card contains:**

- An icon (emoji or inline SVG — no external image files required)
- The app/game name
- A one-to-two sentence description
- A button/link that opens either an App Store/Play Store URL or a web game URL, in a new tab

4. **Responsive layout** — Grid reflows by breakpoint (e.g. 3 columns desktop, 2 tablet, 1 mobile) rather than staying fixed-width.
5. **Easy to extend** — Adding a new app is a matter of adding one object to the JS array; no HTML or CSS edits needed.

## 3. Screens & UI

Since this is a single home page, "screens" here means layout states at different sizes:

- **Header:** Name/site title + tagline, centered or left-aligned, simple typography.
- **Card grid:** CSS Grid or Flexbox with media-query breakpoints — roughly 3 columns on desktop (≥1024px), 2 on tablet (\~600–1024px), 1 on mobile (<600px).
- **Card design:** Rounded corners, subtle shadow, generous padding, clear visual hierarchy (icon → name → description → button). A gentle hover effect (lift + shadow increase) on desktop pointer devices signals interactivity.
- **Button:** Clearly labeled (e.g. "Play Now", "Get the App"), opens the app store or web game URL in a new tab so visitors don't lose the showcase page.
- **Visual style:** Clean, modern, simple color palette — no clutter, no unnecessary decoration. Should look good with as few as 1 card or as many as 20+.

## 4. Technical Architecture

- **Stack:** Plain HTML5 + CSS3 + vanilla JavaScript. No framework, no bundler, no npm build step — the files that are written are the files that get deployed.
- **Rendering:** `script.js` reads a JS array of app objects and renders one card per entry into the grid container on page load (e.g. via `document.createElement` or template literals + `innerHTML`).
- **State:** None needed — this is a static informational page with no user interaction beyond clicking through to an app.
- **Assets:** Icons are emoji or inline SVG so no external image files or CDN dependencies are required, keeping the page fast and dependency-free.
- **Responsiveness:** CSS Grid/Flexbox with relative units and media queries; must render correctly across common breakpoints (mobile, tablet, desktop).
- **Browser support target:** Latest 2 versions of Chrome, Safari, Firefox, Edge.

## 5. Data Model

App entries live in a single JS array so adding a new app/game is purely a content edit:

```js
const apps = [
 {
 name: "Words Are Hard",
 icon: "\ud83d\udde3\ufe0f",
 description: "A fast-paced party word-guessing game for groups.",
 url: "https://yourusername.github.io/words-are-hard/",
 linkLabel: "Play Now"
 }
 // add more apps here
];
```

**Fields:**

| Field | Type | Purpose |
| --- | --- | --- |
| `name` | string | App/game title shown on the card |
| `icon` | string | Emoji or inline SVG markup for the card icon |
| `description` | string | One-to-two sentence summary |
| `url` | string | App Store, Play Store, or web game URL the button links to |
| `linkLabel` | string | Button text (e.g. "Play Now", "Get the App") |

No other file needs to change to add, remove, or reorder apps — `script.js` just renders whatever is in this array.

## 6. File Structure & Repo Layout

```
personal-app-showcase/
├── index.html # header + card-grid container
├── style.css # layout, responsive breakpoints, card styling
├── script.js # apps data array + render logic
└── README.md # how to run locally + how to add a new app entry
```

Plain relative paths only, so the site works identically opened locally as `file://index.html` or served from a repo's Pages URL. Content (the apps array) stays separate from layout/logic so future updates are single-file edits.

## 7. Deployment

1. **Build:** Claude Code writes `index.html`, `style.css`, and `script.js` directly per the File Structure section above — no compilation step.
2. **Commit:** Files are committed and pushed to my Git repo (e.g. `git add . && git commit -m "..." && git push`).
3. **Host:** The repo's static hosting (e.g. GitHub Pages, enabled on `main` or a `/docs` folder, or any static host pointed at the repo) serves `index.html` at the root — a public URL anyone can open.
4. **Update flow going forward:** Adding a new app, tweaking styling, or fixing copy is a normal commit + push to the same repo; the live site updates automatically.
5. **No environment variables or secrets** are needed since there's no backend or API calls.

## 8. Acceptance Criteria

- [ ] Site loads as a single static page via one URL, no login or install.
- [ ] Home page shows a header (title + tagline) and a grid of app cards.
- [ ] Each card shows an icon, name, description, and a working link/button.
- [ ] Card buttons open the app store or web game URL in a new tab.
- [ ] Grid layout is responsive: reflows cleanly across desktop, tablet, and mobile widths.
- [ ] Cards have a visible hover effect on pointer devices.
- [ ] Adding a new app requires only adding one object to the `apps` array in `script.js` — no HTML/CSS edits.
- [ ] Page looks correct with 1 card and with a larger number of cards (10+).

## 9. Future Enhancements (Out of Scope for v1)

- Filtering/search across apps by category or platform.
- Dark/light theme toggle.
- A dedicated detail page per app (screenshots, longer description).
- Basic analytics on card click-throughs.
- Auto-pulling app metadata (icon, description) from the App Store/Play Store API instead of manual entry.
- "Words Are Hard" entry wired in automatically once that game is live.
