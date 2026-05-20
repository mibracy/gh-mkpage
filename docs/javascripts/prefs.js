document.addEventListener("DOMContentLoaded", function () {
  var btn = document.createElement("a");
  btn.className = "md-header__button md-icon";
  btn.title = "Reset theme to defaults";
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-8l2.5-2.5c-.5-.5-1.16-.8-1.91-.8-1.49 0-2.69 1.2-2.69 2.69S7.1 15.08 8.59 15.08c.84 0 1.58-.38 2.06-1l1.36 1.36c-.89.98-2.16 1.56-3.59 1.56-2.76 0-5-2.24-5-5s2.24-5 5-5c1.38 0 2.63.56 3.54 1.46L15 6v7z"/></svg>';
  btn.style.cursor = "pointer";
  btn.addEventListener("click", function () {
    localStorage.removeItem("__palette");
    location.reload();
  });
  var header = document.querySelector(".md-header__inner .md-header__button:last-child");
  if (header) {
    header.parentNode.insertBefore(btn, header.nextSibling);
  }
});
