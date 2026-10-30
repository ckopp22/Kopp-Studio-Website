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
    description: "A party game of truths and lies.",
    url: "https://ckopp22.github.io/Fact-or-Fake/",
    linkLabel: "Play Now"
  },
  {
    name: "Turtle Tides",
    iconImage: "icons/turtle-tides.png",
    description: "Wesley's sea turtle on an adventure.",
    url: "https://ckopp22.github.io/Turtle-Tides/",
    linkLabel: "Play Now"
  },
  {
    name: "Hard Words",
    iconImage: "icons/hard-words.png",
    description: "A fast party game of shouting words.",
    url: "https://ckopp22.github.io/Hard-Words/",
    linkLabel: "Play Now"
  },
  {
    name: "Herd Mentality",
    iconImage: "icons/herd-mentality.png",
    description: "A cow-themed party game. Match the herd.",
    url: "https://ckopp22.github.io/Herd-Mentality/",
    linkLabel: "Play Now"
  },
  {
    name: "Lighthouse",
    iconImage: "icons/lighthouse.png",
    description: "A push-your-luck dice game.",
    url: "https://ckopp22.github.io/Lighthouse/",
    linkLabel: "Play Now"
  },
  {
    name: "CADAN",
    iconImage: "icons/cadan.png",
    description: "A dice strategy game.",
    url: "https://ckopp22.github.io/CADAN/",
    linkLabel: "Play Now"
  },
  {
    name: "Simple Health Log App",
    iconImage: "icons/health-log.png",
    description: "A private daily health journal.",
    url: "https://apps.apple.com/us/app/simple-health-log-app/id6811933427",
    linkLabel: "Get the App"
  },
  {
    name: "Challenge Accepted",
    iconImage: "icons/challenge-accepted.png",
    description: "Three new challenges every day.",
    url: "https://apps.apple.com/us/app/challenge-accepted-3-daily/id6805973885",
    linkLabel: "Get the App"
  },
  {
    name: "One More Question",
    iconImage: "icons/one-more-question.png",
    description: "Conversation starters for any group.",
    url: "https://apps.apple.com/us/app/one-more-question/id6816315190",
    linkLabel: "Get the App"
  },
  {
    name: "BBC110",
    iconImage: "icons/bbc110.png",
    description: "Design a screen and show it on any TV.",
    url: "https://ckopp22.github.io/BBC110/",
    linkLabel: "Open"
  },
  {
    name: "Brain Freeze",
    iconImage: "icons/brain-freeze.png",
    description: "A party game show for trivia.",
    url: "https://ckopp22.github.io/Brain-Freeze/",
    linkLabel: "Play Now"
  },
  {
    name: "Worship Tiles",
    iconImage: "icons/worship-tiles.png",
    description: "A rhythm tile game.",
    url: "https://ckopp22.github.io/Worship-Tiles/",
    linkLabel: "Play Now"
  },
  {
    name: "Sneaky",
    iconImage: "icons/sneaky.png",
    description: "A stealth game. Sneak past the guards.",
    url: "https://ckopp22.github.io/Sneaky/",
    linkLabel: "Play Now"
  },
  {
    name: "Convert",
    iconImage: "icons/convert.png",
    description: "A cute kg to lb and °C to °F converter.",
    url: "https://ckopp22.github.io/Convert/",
    linkLabel: "Open"
  },
  {
    name: "Farm Run",
    iconImage: "icons/farm-run.png",
    description: "Become a millionaire farmer.",
    url: "https://ckopp22.github.io/FarmRun/",
    linkLabel: "Play Now"
  },
  {
    name: "Simply Racing",
    iconImage: "icons/simply-racing.png",
    description: "A simple, fast racing game.",
    url: "https://ckopp22.github.io/SimpleRacing/",
    linkLabel: "Play Now"
  },
  {
    name: "Go, Go, Go",
    iconImage: "icons/go-go-go.png",
    description: "Swipe to dodge everything in your way.",
    url: "https://ckopp22.github.io/Go/",
    linkLabel: "Play Now"
  },
  {
    name: "Drive Thru",
    iconImage: "icons/drive-thru.png",
    description: "Serve every car at the drive-thru.",
    url: "https://ckopp22.github.io/Drive-Thru/",
    linkLabel: "Play Now"
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
