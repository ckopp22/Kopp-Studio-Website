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

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("app-grid");
  apps.forEach(app => grid.appendChild(createCard(app)));
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
