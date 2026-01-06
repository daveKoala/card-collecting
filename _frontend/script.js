/**
 * Single-file demo:
 * - Renders repeated blocks: (badge + landscape) row then 3 portraits row
 * - Shows missing placeholders
 * - Shows duplicates as ×N
 * - Provides an inspect modal with accessible text (no meaning locked in images)
 */

const data = {
  blocks: [
    {
      title: "The Lion King",
      cards: [
        // Hero row
        {
          id: "lk-badge",
          kind: "badge",
          rarity: "High",
          name: "Circle of Life Emblem",
          desc: "Foil crest. One per page. Visual chase card.",
          collected: true,
          dup: 1,
        },
        {
          id: "lk-land",
          kind: "landscape",
          rarity: "Medium",
          name: "Pride Lands Sunrise",
          desc: "Landscape scene card. Medium value.",
          collected: true,
          dup: 2,
        },

        // Portrait row (3)
        {
          id: "lk-p1",
          kind: "portrait",
          rarity: "Low",
          name: "Simba",
          desc: "Portrait character card.",
          collected: true,
          dup: 3,
        },
        {
          id: "lk-p2",
          kind: "portrait",
          rarity: "Low",
          name: "Nala",
          desc: "Portrait character card.",
          collected: true,
          dup: 1,
        },
        {
          id: "lk-p3",
          kind: "portrait",
          rarity: "Low",
          name: "Timon",
          desc: "Portrait character card.",
          collected: false,
          dup: 0,
        },
      ],
    },
    {
      title: "Beauty and the Beast",
      cards: [
        {
          id: "bb-badge",
          kind: "badge",
          rarity: "High",
          name: "Enchanted Rose",
          desc: "Foil/glow emblem. High value.",
          collected: false,
          dup: 0,
        },
        {
          id: "bb-land",
          kind: "landscape",
          rarity: "Medium",
          name: "Ballroom Scene",
          desc: "Landscape moment card.",
          collected: true,
          dup: 1,
        },

        {
          id: "bb-p1",
          kind: "portrait",
          rarity: "Low",
          name: "Belle",
          desc: "Portrait character card.",
          collected: true,
          dup: 1,
        },
        {
          id: "bb-p2",
          kind: "portrait",
          rarity: "Low",
          name: "Lumière",
          desc: "Portrait character card.",
          collected: true,
          dup: 2,
        },
        {
          id: "bb-p3",
          kind: "portrait",
          rarity: "Low",
          name: "Cogsworth",
          desc: "Portrait character card.",
          collected: false,
          dup: 0,
        },
      ],
    },
    {
      title: "Aladdin",
      cards: [
        {
          id: "al-badge",
          kind: "badge",
          rarity: "High",
          name: "Magic Lamp",
          desc: "Foil chase card.",
          collected: true,
          dup: 1,
        },
        {
          id: "al-land",
          kind: "landscape",
          rarity: "Medium",
          name: "Cave of Wonders",
          desc: "Landscape location card.",
          collected: false,
          dup: 0,
        },

        {
          id: "al-p1",
          kind: "portrait",
          rarity: "Low",
          name: "Aladdin",
          desc: "Portrait character card.",
          collected: true,
          dup: 1,
        },
        {
          id: "al-p2",
          kind: "portrait",
          rarity: "Low",
          name: "Jasmine",
          desc: "Portrait character card.",
          collected: false,
          dup: 0,
        },
        {
          id: "al-p3",
          kind: "portrait",
          rarity: "Low",
          name: "Genie",
          desc: "Portrait character card.",
          collected: true,
          dup: 2,
        },
      ],
    },
  ],
};

const albumBody = document.getElementById("albumBody");
const progressPill = document.getElementById("progressPill");
const toggleCompactBtn = document.getElementById("toggleCompact");
const shuffleMissingBtn = document.getElementById("shuffleMissing");

const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalKV = document.getElementById("modalKV");
const modalDesc = document.getElementById("modalDesc");
const modalPreview = document.getElementById("modalPreview");
const srAnnouncement = document.getElementById("srAnnouncement");

const findTradeBtn = document.getElementById("findTradeBtn");
const toggleTradeReadyBtn = document.getElementById("toggleTradeReadyBtn");

let lastFocusedEl = null;
let compact = false;
let activeCard = null;

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("data-")) node.setAttribute(k, v);
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) node.appendChild(child);
  return node;
}

function cardAriaLabel(card) {
  if (!card.collected)
    return `Uncollected card: ${card.name}. Type: ${card.kind}. Rarity: ${card.rarity}.`;
  const dupText =
    card.dup > 1 ? `You have ${card.dup} copies.` : `You have 1 copy.`;
  return `${card.name}. Type: ${card.kind}. Rarity: ${card.rarity}. Collected. ${dupText} Tap to inspect.`;
}

function render() {
  albumBody.innerHTML = "";

  data.blocks.forEach((block, idx) => {
    const blockEl = el("div", {
      class: "block",
      "aria-label": `Subset ${idx + 1}: ${block.title}`,
    });

    // Optional mini header per block (kept quiet)
    const mini = el(
      "div",
      { class: "pill", style: "align-self:flex-start; margin-bottom: 2px;" },
      [el("span", { text: `Subset: ${block.title}` })]
    );
    blockEl.appendChild(mini);

    // Hero row: badge + landscape
    const heroRow = el("div", { class: "row-hero" });
    // Portrait row: 3 portraits
    const portraitRow = el("div", { class: "row-portraits" });

    // Expect ordering: [badge, landscape, portrait, portrait, portrait]
    const [badge, landscape, p1, p2, p3] = block.cards;

    heroRow.appendChild(renderCard(badge, true));
    heroRow.appendChild(renderCard(landscape, true));

    portraitRow.appendChild(renderCard(p1, false));
    portraitRow.appendChild(renderCard(p2, false));
    portraitRow.appendChild(renderCard(p3, false));

    blockEl.appendChild(heroRow);
    blockEl.appendChild(portraitRow);

    albumBody.appendChild(blockEl);
  });

  updateProgress();
}

function renderCard(card, isHeroRow) {
  const classes = ["card"];
  const isMissing = !card.collected;

  if (card.kind === "portrait") classes.push("portrait");
  if (card.kind === "badge") classes.push("badge", "hero");
  if (card.kind === "landscape") classes.push("landscape", "hero");
  if (isMissing) classes.push("missing");

  const node = el("div", {
    class: classes.join(" "),
    role: isMissing ? "img" : "button",
    tabindex: isMissing ? "-1" : "0",
    "aria-label": cardAriaLabel(card),
    "data-id": card.id,
    "data-kind": card.kind,
    "data-rarity": card.rarity,
    "data-dup": String(card.dup || 1),
  });

  const img = el("div", { class: "img", "aria-hidden": "true" });
  const frame = el("div", { class: "frame", "aria-hidden": "true" });

  // Duplicate badge
  const dup = el("div", { class: "dup", "aria-hidden": "true" }, [
    el("span", { text: `×${card.dup}` }),
  ]);

  // Label strip (optional in compact mode)
  const label = el("div", { class: "label", "aria-hidden": "true" }, [
    el("div", { class: "name", text: card.name }),
    el("div", {
      class: "type",
      text:
        card.kind === "badge"
          ? "Badge"
          : card.kind === "landscape"
          ? "Landscape"
          : "Portrait",
    }),
  ]);

  node.appendChild(img);
  node.appendChild(frame);
  node.appendChild(dup);
  node.appendChild(label);

  if (isMissing) {
    node.appendChild(
      el("div", {
        class: "silhouette",
        text: "Holding image\n(not collected yet)",
      })
    );
  } else {
    node.addEventListener("click", () => openModal(card, node));
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card, node);
      }
    });
  }

  return node;
}

function updateProgress() {
  const allCards = data.blocks.flatMap((b) => b.cards);
  const collected = allCards.filter((c) => c.collected).length;
  const missing = allCards.length - collected;
  const duplicates = allCards
    .filter((c) => c.collected && (c.dup || 1) > 1)
    .reduce((acc, c) => acc + ((c.dup || 1) - 1), 0);

  progressPill.innerHTML = `<strong>${collected}</strong> collected · <strong>${missing}</strong> missing · <strong>${duplicates}</strong> duplicates`;
}

function openModal(card, sourceEl) {
  activeCard = card;
  lastFocusedEl = sourceEl;

  modalTitle.textContent = card.name;

  const kindLabel =
    card.kind === "badge"
      ? "Badge"
      : card.kind === "landscape"
      ? "Landscape"
      : "Portrait";
  const dupCount = card.collected ? card.dup || 1 : 0;

  // Key-value tags
  modalKV.innerHTML = "";
  modalKV.appendChild(tag(`Type: ${kindLabel}`));
  modalKV.appendChild(tag(`Rarity: ${card.rarity}`));
  modalKV.appendChild(tag(`Copies: ${dupCount}`));

  modalDesc.textContent = card.desc;

  // Preview uses the same visual style (no real imagery in this demo)
  modalPreview.className = "preview";
  modalPreview.innerHTML = "";
  const previewImg = document.createElement("div");
  previewImg.className = "img";
  modalPreview.appendChild(previewImg);

  // Apply similar background vibe based on kind
  if (card.kind === "badge")
    previewImg.style.animation = "foilSweep 2.8s ease-in-out infinite";
  // Add a subtle tint shift so preview feels different per card id
  previewImg.style.filter = `hue-rotate(${hashHue(card.id)}deg) saturate(1.15)`;

  // Announce for screen readers
  srAnnouncement.textContent = `${card.name}. ${kindLabel}. ${card.rarity}. You have ${dupCount} copies.`;

  // Buttons are stubs for now
  findTradeBtn.onclick = () => alert(`Stub: Find trade for "${card.name}"`);
  toggleTradeReadyBtn.onclick = () =>
    alert(`Stub: Toggle open-to-trade for "${card.name}"`);

  modalBackdrop.classList.add("open");
  // Focus close button (simple focus management)
  closeModalBtn.focus();
}

function closeModal() {
  modalBackdrop.classList.remove("open");
  if (lastFocusedEl) lastFocusedEl.focus();
  activeCard = null;
}

function tag(text) {
  const t = document.createElement("span");
  t.className = "tag";
  t.textContent = text;
  return t;
}

function hashHue(str) {
  // small deterministic hue rotation per id
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return (h % 60) - 30; // [-30..+29]
}

// Controls
const labelModes = ["none", "dupes", "full"];
let labelModeIndex = 0;

const labelModeBtn = document.getElementById("toggleLabels");

document.getElementById("app").setAttribute("data-label-mode", "none");
labelModeBtn.textContent = "Labels: none";

labelModeBtn.addEventListener("click", () => {
  labelModeIndex = (labelModeIndex + 1) % labelModes.length;
  const mode = labelModes[labelModeIndex];
  document.getElementById("app").setAttribute("data-label-mode", mode);
  labelModeBtn.textContent = `Labels: ${mode}`;
});

shuffleMissingBtn.addEventListener("click", () => {
  // Toggle a few cards between missing/collected to play with layout.
  const all = data.blocks.flatMap((b) => b.cards);
  const candidates = all.filter((c) => c.kind !== "badge"); // keep badges stable-ish
  for (let i = 0; i < candidates.length; i++) {
    if (Math.random() < 0.28) {
      candidates[i].collected = !candidates[i].collected;
      if (candidates[i].collected)
        candidates[i].dup =
          1 + (Math.random() < 0.35 ? Math.floor(Math.random() * 3) : 0);
      else candidates[i].dup = 0;
    }
  }
  render();
});

// Modal close behaviors
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop.classList.contains("open"))
    closeModal();
});

// Initial render
render();
