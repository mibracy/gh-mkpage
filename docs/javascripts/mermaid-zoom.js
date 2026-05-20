document.addEventListener("DOMContentLoaded", function () {
  var svgs = document.querySelectorAll(".mermaid svg");
  svgs.forEach(function (svg) {
    var scale = 1, tx = 0, ty = 0;
    var container = svg.parentElement;
    container.style.overflow = "hidden";
    container.style.cursor = "grab";
    container.style.position = "relative";

    svg.setAttribute("transform-origin", "0 0");
    svg.setAttribute("style", "transition: transform 0.05s");

    var box = svg.viewBox || { baseVal: { x: 0, y: 0, width: 0, height: 0 } };
    var ox = 0, oy = 0, dragging = false;

    function apply() {
      svg.style.transform = "translate(" + tx + "px, " + ty + "px) scale(" + scale + ")";
    }

    container.addEventListener("wheel", function (e) {
      e.preventDefault();
      var rect = container.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      var ds = e.deltaY > 0 ? 0.9 : 1.1;
      var ns = Math.min(5, Math.max(0.2, scale * ds));
      tx = mx - (mx - tx) * (ns / scale);
      ty = my - (my - ty) * (ns / scale);
      scale = ns;
      apply();
    });

    container.addEventListener("mousedown", function (e) {
      e.preventDefault();
      dragging = true;
      ox = e.clientX - tx;
      oy = e.clientY - ty;
      container.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      tx = e.clientX - ox;
      ty = e.clientY - oy;
      apply();
    });

    document.addEventListener("mouseup", function () {
      if (dragging) {
        dragging = false;
        container.style.cursor = "grab";
      }
    });
  });
});
