/* ============================================================
   peak.athlete · Device & Viewport Detection
   Sets html[data-device] + html[data-orient] + CSS vars for
   safe areas. Listens to resize + orientation changes.
   ============================================================ */
(function () {
  "use strict";

  var html = document.documentElement;

  function classify(w) {
    if (w < 360) return "xs";
    if (w < 390) return "sm";
    if (w < 430) return "md";
    if (w < 600) return "lg";
    if (w < 1024) return "tab";
    return "desk";
  }

  function detectPlatform() {
    var ua = navigator.userAgent || "";
    var plat = "web";
    if (/iPhone|iPad|iPod/i.test(ua)) plat = "ios";
    else if (/Android/i.test(ua)) plat = "android";
    else if (/Macintosh/i.test(ua)) plat = "mac";
    else if (/Windows/i.test(ua)) plat = "win";
    html.setAttribute("data-platform", plat);

    var isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    html.setAttribute("data-standalone", isStandalone ? "true" : "false");

    var isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    html.setAttribute("data-touch", isTouch ? "true" : "false");
  }

  function apply() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var cls = classify(w);
    var prev = html.getAttribute("data-device");
    if (prev !== cls) {
      html.setAttribute("data-device", cls);
      document.dispatchEvent(new CustomEvent("core:device-changed", { detail: { device: cls, width: w } }));
    }
    html.setAttribute("data-orient", w > h ? "landscape" : "portrait");
    html.style.setProperty("--vw", w + "px");
    html.style.setProperty("--vh", h + "px");
    html.style.setProperty("--dvh", h + "px");
  }

  function onResize() {
    if (window._coreDeviceRaf) return;
    window._coreDeviceRaf = window.requestAnimationFrame(function () {
      window._coreDeviceRaf = null;
      apply();
    });
  }

  detectPlatform();
  apply();
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", apply, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", onResize, { passive: true });
  }

  window.CoreDevice = {
    current: function () { return html.getAttribute("data-device"); },
    isPhone: function () {
      var d = html.getAttribute("data-device");
      return d === "xs" || d === "sm" || d === "md" || d === "lg";
    },
    isTablet: function () { return html.getAttribute("data-device") === "tab"; },
    isDesktop: function () { return html.getAttribute("data-device") === "desk"; }
  };
})();
