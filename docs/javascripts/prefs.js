var P = {
  KEY: "__style_picker",
  hex: {
    "red":"#f44336","pink":"#e91e63","purple":"#9c27b0","deep-purple":"#673ab7",
    "indigo":"#3f51b5","blue":"#2196f3","light-blue":"#03a9f4","cyan":"#00bcd4",
    "teal":"#009688","green":"#4caf50","light-green":"#8bc34a","lime":"#cddc39",
    "yellow":"#ffeb3b","amber":"#ffc107","orange":"#ff9800","deep-orange":"#ff5722",
    "brown":"#795548","grey":"#9e9e9e","blue-grey":"#607d8b"
  },
  colors: [
    "red","pink","purple","deep-purple","indigo","blue","light-blue",
    "cyan","teal","green","light-green","lime","yellow","amber",
    "orange","deep-orange","brown","grey","blue-grey"
  ],
  accents: [
    "red","pink","purple","deep-purple","indigo","blue","light-blue",
    "cyan","teal","green","light-green","lime","yellow","amber",
    "orange","deep-orange"
  ]
};

P.load = function () {
  try { return JSON.parse(localStorage.getItem(P.KEY)) || {}; } catch (e) { return {}; }
};

P.save = function (o) {
  localStorage.setItem(P.KEY, JSON.stringify(o));
};

P.clear = function () {
  localStorage.removeItem(P.KEY);
};

P.apply = function (o) {
  document.body.removeAttribute("data-md-color-primary");
  document.body.removeAttribute("data-md-color-accent");
  if (o.primary) document.body.setAttribute("data-md-color-primary", o.primary);
  if (o.accent) document.body.setAttribute("data-md-color-accent", o.accent);
};

P.restore = function () {
  var prefs = P.load();
  if (!prefs.primary && !prefs.accent) return;
  P.apply(prefs);
};

P.renderSwatches = function (colors, current, onPick) {
  var grid = document.createElement("div");
  grid.className = "md-picker-grid";
  colors.forEach(function (c) {
    var sw = document.createElement("div");
    sw.className = "md-swatch" + (c === current ? " active" : "");
    sw.style.background = P.hex[c] || c;
    sw.title = c;
    sw.addEventListener("click", function () {
      grid.querySelectorAll(".md-swatch").forEach(function (s) { s.classList.remove("active"); });
      sw.classList.add("active");
      onPick(c);
    });
    grid.appendChild(sw);
  });
  return grid;
};

P.openModal = function () {
  if (document.querySelector(".md-picker-overlay")) return;
  var prefs = P.load();
  var curP = prefs.primary || document.body.getAttribute("data-md-color-primary") || "";
  var curA = prefs.accent || document.body.getAttribute("data-md-color-accent") || "";

  var overlay = document.createElement("div");
  overlay.className = "md-picker-overlay";
  overlay.style.display = "block";

  var modal = document.createElement("div");
  modal.className = "md-picker-modal";

  var title = document.createElement("h2");
  title.textContent = "Style Picker";
  title.style.marginTop = "0";
  modal.appendChild(title);

  var pH = document.createElement("h3");
  pH.textContent = "Primary";
  modal.appendChild(pH);
  var pGrid = P.renderSwatches(P.colors, curP, function (c) {
    prefs.primary = c;
    P.save(prefs);
    P.apply(prefs);
  });
  modal.appendChild(pGrid);

  var aH = document.createElement("h3");
  aH.textContent = "Accent";
  modal.appendChild(aH);
  var aGrid = P.renderSwatches(P.accents, curA, function (c) {
    prefs.accent = c;
    P.save(prefs);
    P.apply(prefs);
  });
  modal.appendChild(aGrid);

  var actions = document.createElement("div");
  actions.className = "md-picker-actions";

  var resetBtn = document.createElement("button");
  resetBtn.className = "reset";
  resetBtn.textContent = "Reset to defaults";
  resetBtn.addEventListener("click", function () {
    P.clear();
    prefs = {};
    curP = ""; curA = "";
    pGrid.querySelectorAll(".md-swatch").forEach(function (s) { s.classList.remove("active"); });
    aGrid.querySelectorAll(".md-swatch").forEach(function (s) { s.classList.remove("active"); });
    P.apply({});
    location.reload();
  });
  actions.appendChild(resetBtn);

  var closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", function () { overlay.remove(); modal.remove(); });
  actions.appendChild(closeBtn);

  modal.appendChild(actions);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
  overlay.addEventListener("click", function () { overlay.remove(); modal.remove(); });
};

P.addButton = function () {
  var toggle = document.querySelector('.md-header__button[title*="Switch to"]');
  if (!toggle) return;

  var btn = document.createElement("a");
  btn.className = "md-header__button md-icon";
  btn.title = "Style picker";
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm4-2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm-6 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm7.07 5.07l-1.41 1.41c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0z"/></svg>';
  btn.style.cursor = "pointer";
  btn.addEventListener("click", P.openModal);
  toggle.parentNode.insertBefore(btn, toggle.nextSibling);
};

document.addEventListener("DOMContentLoaded", function () {
  P.restore();
  P.addButton();
});
document.addEventListener("DOMContentSwitch", function () {
  P.restore();
  var el = document.querySelector(".md-content");
  if (el) {
    el.style.animation = "none";
    requestAnimationFrame(function () { el.style.animation = ""; });
  }
});
