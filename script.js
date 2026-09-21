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
    name: "Health Log",
    iconImage: "icons/health-log.png",
    description: "A private daily health journal for weight, food, habits and workouts, with zero setup.",
    url: "#",
    linkLabel: "Get the App"
  },
  {
    name: "Challenge Accepted",
    iconImage: "icons/challenge-accepted.png",
    description: "Three new challenges every day, made to push you outside your routine. Build a streak and level up.",
    url: "https://apps.apple.com/us/app/challenge-accepted-3-daily/id6805973885",
    linkLabel: "Get the App"
  }
];

function createCard(app) {
  const card = document.createElement("article");
  card.className = "card";

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

  let btn;
  if (!app.url || app.url === "#") {
    btn = document.createElement("span");
    btn.className = "btn disabled";
    btn.textContent = "Coming Soon";
    btn.setAttribute("aria-disabled", "true");
  } else {
    btn = document.createElement("a");
    btn.className = "btn";
    btn.href = app.url;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.textContent = app.linkLabel || "Open";
    btn.setAttribute("aria-label", (app.linkLabel || "Open") + " " + app.name);
  }

  card.append(icon, name, desc, btn);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("app-grid");
  apps.forEach(app => grid.appendChild(createCard(app)));
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
