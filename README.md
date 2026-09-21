# Kopp Studio

A single-page site listing my apps and games. Plain HTML/CSS/JS, no build step.

## Run locally

Open `index.html` directly, or:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Add an app

Edit the `apps` array at the top of `script.js` and add an object:

```js
{
  name: "My App",
  iconImage: "icons/my-app.png",   // or use icon: "🎮" for an emoji
  description: "One or two sentences.",
  url: "https://...",              // "#" shows a disabled "Coming Soon" button
  linkLabel: "Get the App"
}
```

Put PNG icons in `icons/` (256px is plenty). No HTML or CSS changes needed.

## Install as an app (PWA)

The site is installable: `manifest.json` + `service-worker.js` + the icons in `icons/`. On iPhone use Share → Add to Home Screen; on Android/desktop Chrome use the install prompt. It works offline once visited, and online visitors always get the latest files (network-first). The service worker only runs over http(s), not `file://`.

The "Kopp" icon is `icons/icon-512.png` (other sizes are downscaled copies). If you add new files that should work offline, list them in `ASSETS` in `service-worker.js`.

## Deploy on GitHub Pages

1. Push this repo to https://github.com/ckopp22/Kopp-Studio-Website:
   ```sh
   git push -u origin main
   ```
2. On GitHub: Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)`.
3. The site goes live at https://ckopp22.github.io/Kopp-Studio-Website/ within a minute or two.

To update later: edit, `git commit`, `git push`.

Paths are all relative, so the site works the same from a sub-path like this. To serve it at the root URL instead, rename the repo to `ckopp22.github.io`.
