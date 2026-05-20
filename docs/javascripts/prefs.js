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
  if (o.primary) document.body.setAttribute("data-md-color-primary", o.primary);
  if (o.accent) document.body.setAttribute("data-md-color-accent", o.accent);
  if (o.scheme) document.body.setAttribute("data-md-color-scheme", o.scheme);
};

P.restore = function () {
  var prefs = P.load();
  if (!prefs.primary && !prefs.accent && !prefs.scheme) {
    P.apply({ primary: "brown", accent: "amber", scheme: "slate" });
    return;
  }
  if (document.body.getAttribute("data-md-color-primary") === prefs.primary &&
      document.body.getAttribute("data-md-color-accent") === prefs.accent &&
      document.body.getAttribute("data-md-color-scheme") === prefs.scheme) return;
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
  var curScheme = prefs.scheme || document.body.getAttribute("data-md-color-scheme") || "slate";

  if (!prefs.primary) prefs.primary = curP;
  if (!prefs.accent) prefs.accent = curA;
  if (!prefs.scheme) prefs.scheme = curScheme;

  var overlay = document.createElement("div");
  overlay.className = "md-picker-overlay";
  overlay.style.display = "block";

  var modal = document.createElement("div");
  modal.className = "md-picker-modal";

  var title = document.createElement("h2");
  title.textContent = "Style Picker";
  title.style.marginTop = "0";
  modal.appendChild(title);

  var sH = document.createElement("h3");
  sH.textContent = "Scheme";
  modal.appendChild(sH);

  var schemeDiv = document.createElement("div");
  schemeDiv.className = "md-picker-scheme";

  var darkBtn = document.createElement("button");
  darkBtn.textContent = "Dark";
  if (curScheme === "slate") darkBtn.className = "active";
  darkBtn.addEventListener("click", function () {
    prefs.scheme = "slate";
    P.save(prefs);
    P.apply(prefs);
    darkBtn.className = "active";
    lightBtn.className = "";
  });
  schemeDiv.appendChild(darkBtn);

  var lightBtn = document.createElement("button");
  lightBtn.textContent = "Light";
  if (curScheme === "default") lightBtn.className = "active";
  lightBtn.addEventListener("click", function () {
    prefs.scheme = "default";
    P.save(prefs);
    P.apply(prefs);
    lightBtn.className = "active";
    darkBtn.className = "";
  });
  schemeDiv.appendChild(lightBtn);

  modal.appendChild(schemeDiv);

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
    curP = ""; curA = ""; curScheme = "slate";
    pGrid.querySelectorAll(".md-swatch").forEach(function (s) { s.classList.remove("active"); });
    aGrid.querySelectorAll(".md-swatch").forEach(function (s) { s.classList.remove("active"); });
    darkBtn.className = "active";
    lightBtn.className = "";
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
  if (document.getElementById("style-picker-btn")) return;

  var header = document.querySelector(".md-header__inner");
  if (!header) return;

  var wrapper = document.createElement("div");
  wrapper.id = "style-picker-btn";
  wrapper.style.cssText = "display:inline-flex;align-items:center;cursor:pointer";
  wrapper.title = "Style picker";
  wrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.16-.59-1.59-.36-.42-.59-1.16-.59-1.91 0-1.38 1.12-2.5 2.5-2.5H18c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3.5 4c-.83 0-1.5-.67-1.5-1.5S17.17 8 18 8s1.5.67 1.5 1.5S18.83 11 18 11z"/></svg>';
  wrapper.addEventListener("click", P.openModal);

  var search = header.querySelector(".md-search");
  if (search) {
    header.insertBefore(wrapper, search);
  } else {
    header.appendChild(wrapper);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  P.restore();
  P.addButton();
});
document.addEventListener("DOMContentSwitch", function () {
  P.restore();
  P.addButton();
});
