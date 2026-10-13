// Add, remove or reorder apps by editing this array — nothing else needs to change.
//
// Fields:
//   name        Title shown on the card
//   icon        Emoji shown when there is no iconImage
//   iconImage   Optional path to a PNG, e.g. "icons/my-app.png". Overrides `icon`.
//   description One or two sentences
//   url         App Store / Play Store / web game URL. Use "#" for "not available yet".
//   linkLabel   Button text, e.g. "Play Now", "Get the App"
const apps = [
  {
    name: "Fact or Fake",
    iconImage: "icons/fact-or-fake.png",
    description: "A pass-and-play party game of surprising truths and convincing lies. Can you spot the fact from the fake?",
    url: "https://ckopp22.github.io/Fact-or-Fake/",
    linkLabel: "Play Now"
  },
  {
    name: "Turtle Tides",
    iconImage: "icons/turtle-tides.png",
    description: "Guide a little sea turtle into an adventure! (Created by Wesley)",
    url: "https://ckopp22.github.io/Turtle-Tides/",
    linkLabel: "Play Now"
  },
  {
    name: "Hard Words",
    iconImage: "icons/hard-words.png",
    description: "A fast, silly party game for a group in one room. Be the fastest to shout a word that starts with the first letter of the image.",
    url: "https://ckopp22.github.io/Hard-Words/",
    linkLabel: "Play Now"
  },
  {
    name: "Herd Mentality",
    iconImage: "icons/herd-mentality.png",
    description: "A cow-themed party game. Shout your answer at the same time, and score Cow Coins for matching the herd.",
    url: "https://ckopp22.github.io/Herd-Mentality/",
    linkLabel: "Play Now"
  },
  {
    name: "Lighthouse",
    iconImage: "icons/lighthouse.png",
    description: "A push-your-luck dice game for a group sharing one device. Bank your points, but dodge the Lighthouse faces that can wipe you out.",
    url: "https://ckopp22.github.io/Lighthouse/",
    linkLabel: "Play Now"
  },
  {
    name: "CADAN",
    iconImage: "icons/cadan.png",
    description: "A dice strategy game. Roll, keep and re-roll, then spend your dice to build roads, settlements, cities and knights. Highest score after 15 turns wins.",
    url: "https://ckopp22.github.io/CADAN/",
    linkLabel: "Play Now"
  },
  {
    name: "Simple Health Log App",
    iconImage: "icons/health-log.png",
    description: "A private daily health journal for weight, food, habits and workouts, with zero setup.",
    url: "https://apps.apple.com/us/app/simple-health-log-app/id6811933427",
    linkLabel: "Get the App"
  },
  {
    name: "Challenge Accepted",
    iconImage: "icons/challenge-accepted.png",
    description: "Three new challenges every day, made to push you outside your routine. Build a streak and level up.",
    url: "https://apps.apple.com/us/app/challenge-accepted-3-daily/id6805973885",
    linkLabel: "Get the App"
  },
  {
    name: "One More Question",
    iconImage: "icons/one-more-question.png",
    description: "A conversation starter for groups, families, couples and friends. Tap through 15+ decks of questions, or write your own, all offline.",
    url: "https://apps.apple.com/us/app/one-more-question/id6816315190",
    linkLabel: "Get the App"
  },
  {
    name: "BBC110",
    iconImage: "icons/bbc110.png",
    description: "Design a screen, hit Publish, and show it on any TV or projector.",
    url: "https://ckopp22.github.io/BBC110/",
    linkLabel: "Open"
  }
];

function createCard(app) {
  const live = app.url && app.url !== "#";
  const card = document.createElement(live ? "a" : "article");
  card.className = "card";
  if (live) {
    card.href = app.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", (app.linkLabel || "Open") + " " + app.name);
  }

  const icon = document.createElement("div");
  icon.className = "card-icon";
  if (app.iconImage) {
    const img = document.createElement("img");
    img.src = app.iconImage;
    img.alt = "";
    img.loading = "lazy";
    icon.appendChild(img);
  } else {
    icon.textContent = app.icon || "✨";
    icon.setAttribute("aria-hidden", "true");
  }

  const name = document.createElement("h2");
  name.className = "card-name";
  name.textContent = app.name;

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = app.description;

  const btn = document.createElement("span");
  if (live) {
    btn.className = "chevron";
    btn.setAttribute("aria-hidden", "true");
    btn.textContent = "\u203A";
  } else {
    btn.className = "btn disabled";
    btn.textContent = "Coming Soon";
  }

  const body = document.createElement("div");
  body.className = "card-body";
  body.append(name, desc);

  card.append(icon, body, btn);
  return card;
}

const ORDER_KEY = "app-order";

function loadOrder() {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY)) || []; } catch (e) { return []; }
}

function saveOrder(grid) {
  const names = [...grid.children].map(r => r.dataset.name);
  try { localStorage.setItem(ORDER_KEY, JSON.stringify(names)); } catch (e) {}
}

function createRow(app) {
  const row = document.createElement("div");
  row.className = "card-row";
  row.dataset.name = app.name;

  const handle = document.createElement("div");
  handle.className = "drag-handle";
  handle.setAttribute("aria-hidden", "true");
  handle.title = "Drag to reorder";
  handle.innerHTML = "<span></span><span></span><span></span>";

  row.append(handle, createCard(app));
  return row;
}

function enableDrag(grid) {
  let dragging = null;
  let ghost = null;
  let offX = 0;
  let offY = 0;

  grid.addEventListener("pointerdown", e => {
    const handle = e.target.closest(".drag-handle");
    if (!handle) return;
    dragging = handle.parentElement;
    const r = dragging.getBoundingClientRect();
    offX = e.clientX - r.left;
    offY = e.clientY - r.top;
    ghost = dragging.cloneNode(true);
    ghost.className = "card-row drag-ghost";
    ghost.style.width = r.width + "px";
    ghost.style.left = r.left + "px";
    ghost.style.top = r.top + "px";
    document.body.appendChild(ghost);
    dragging.classList.add("dragging");
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  grid.addEventListener("pointermove", e => {
    if (!dragging) return;
    ghost.style.left = e.clientX - offX + "px";
    ghost.style.top = e.clientY - offY + "px";
    const over = document.elementFromPoint(e.clientX, e.clientY);
    const target = over && over.closest(".card-row");
    if (!target || target === dragging || target.parentElement !== grid) return;
    const rows = [...grid.children];
    const before = rows.indexOf(dragging) > rows.indexOf(target);
    grid.insertBefore(dragging, before ? target : target.nextSibling);
  });

  const end = () => {
    if (!dragging) return;
    dragging.classList.remove("dragging");
    ghost.remove();
    dragging = ghost = null;
    saveOrder(grid);
  };
  grid.addEventListener("pointerup", end);
  grid.addEventListener("pointercancel", end);
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("app-grid");
  const saved = loadOrder();
  const rank = a => { const i = saved.indexOf(a.name); return i === -1 ? saved.length : i; };
  [...apps].sort((a, b) => rank(a) - rank(b)).forEach(app => grid.appendChild(createRow(app)));
  enableDrag(grid);
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
