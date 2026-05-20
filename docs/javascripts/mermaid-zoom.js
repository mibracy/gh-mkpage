function enableZoom(svg) {
  if (svg.dataset.zoomEnabled) return;
  svg.dataset.zoomEnabled = "1";

  var scale = 1, tx = 0, ty = 0;
  var c = svg.parentElement;
  c.style.overflow = "hidden";
  c.style.cursor = "grab";

  svg.style.transformOrigin = "0 0";

  var ox, oy, drag = false;

  function apply() {
    svg.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
  }

  c.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = c.getBoundingClientRect();
    var mx = e.clientX - r.left, my = e.clientY - r.top;
    var ds = e.deltaY > 0 ? 0.9 : 1.1;
    var ns = Math.min(5, Math.max(0.2, scale * ds));
    tx = mx - (mx - tx) * (ns / scale);
    ty = my - (my - ty) * (ns / scale);
    scale = ns;
    apply();
  });

  c.addEventListener("mousedown", function (e) {
    e.preventDefault();
    drag = true;
    ox = e.clientX - tx;
    oy = e.clientY - ty;
    c.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (!drag) return;
    tx = e.clientX - ox;
    ty = e.clientY - oy;
    apply();
  });

  document.addEventListener("mouseup", function () {
    if (drag) {
      drag = false;
      c.style.cursor = "grab";
    }
  });
}

function scan() {
  document.querySelectorAll(".mermaid svg").forEach(enableZoom);
}

var obs = new MutationObserver(scan);
obs.observe(document.body || document.documentElement, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", scan);
document.addEventListener("readystatechange", scan);
