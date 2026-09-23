const defaultSites = [
  {
    name: "Google",
    icon: "🔎",
    description: "Search the web",
    url: "https://www.google.com/"
  },
  {
    name: "Wikipedia",
    icon: "📖",
    description: "Free encyclopedia",
    url: "https://www.wikipedia.org/"
  },
  {
    name: "Khan Academy",
    icon: "🎓",
    description: "Learning resources",
    url: "https://www.khanacademy.org/"
  },
  {
    name: "GitHub",
    icon: "💻",
    description: "Code and projects",
    url: "https://github.com/"
  }
];

const cards = document.querySelector("#cards");
const viewerSection = document.querySelector("#viewerSection");
const viewer = document.querySelector("#viewer");
const viewerTitle = document.querySelector("#viewerTitle");
const message = document.querySelector("#message");
const urlInput = document.querySelector("#urlInput");

let sites = JSON.parse(localStorage.getItem("schoolPortalSites") || "null") || defaultSites;
let currentUrl = "";

function renderCards() {
  cards.innerHTML = "";

  sites.forEach((site, index) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-icon">${escapeHtml(site.icon || "🌐")}</div>
      <h3>${escapeHtml(site.name)}</h3>
      <p>${escapeHtml(site.description || site.url)}</p>
      <div class="card-actions">
        <button data-open="${index}">View</button>
        <button class="small-btn" data-tab="${index}">New tab</button>
      </div>
    `;

    cards.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[char]));
}

function normalizeUrl(value) {
  let url = value.trim();
  if (!url) return null;

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    return new URL(url).href;
  } catch {
    return null;
  }
}

function showViewer(url, title = "Viewer") {
  currentUrl = url;
  viewerTitle.textContent = title;
  viewer.src = url;
  viewerSection.classList.remove("hidden");
  viewerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  message.textContent = "";
}

cards.addEventListener("click", event => {
  const viewIndex = event.target.dataset.open;
  const tabIndex = event.target.dataset.tab;

  if (viewIndex !== undefined) {
    const site = sites[Number(viewIndex)];
    showViewer(site.url, site.name);
  }

  if (tabIndex !== undefined) {
    window.open(sites[Number(tabIndex)].url, "_blank", "noopener,noreferrer");
  }
});

document.querySelector("#urlForm").addEventListener("submit", event => {
  event.preventDefault();

  const url = normalizeUrl(urlInput.value);

  if (!url) {
    message.textContent = "That doesn't look like a valid web address.";
    return;
  }

  showViewer(url, "Website Viewer");
});

document.querySelector("#closeViewerBtn").addEventListener("click", () => {
  viewer.src = "about:blank";
  viewerSection.classList.add("hidden");
});

document.querySelector("#newTabBtn").addEventListener("click", () => {
  if (currentUrl) window.open(currentUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("schoolPortalDark", document.body.classList.contains("dark"));
});

document.querySelector("#editBtn").addEventListener("click", () => {
  const instructions = [
    "Edit shortcuts by changing the 'defaultSites' array in script.js.",
    "",
    "Each entry looks like:",
    '{ name: "My Site", icon: "🌐", description: "Description", url: "https://example.com/" }',
    "",
    "Then commit the change to GitHub."
  ].join("\n");

  alert(instructions);
});

if (localStorage.getItem("schoolPortalDark") === "true") {
  document.body.classList.add("dark");
}

renderCards();
