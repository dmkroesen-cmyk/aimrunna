/* ============================================================
   peak.athlete · Core Auth Gate
   Sets body[data-ui="core"] ONLY when a user is authenticated.
   Otherwise the legacy Landing + Plan-Creator + Onboarding flow
   remains fully functional. Never modifies app.js.

   Flow:
   - Not logged in → Landing page visible → user can use Login,
     Create Account, or Plan erstellen (Quick/Peak → Onboarding
     → Paywall) exactly as before.
   - Logged in → Core Shell takes over (Heute/Plan/Analyse/Profil).
   - On logout → back to Landing.
   ============================================================ */
(function () {
  "use strict";

  var body = document.body;
  var ATTR = "data-ui";
  var VAL = "core";

  // If ?planner=1 is present in the URL, force legacy Plan Generator
  // view regardless of auth state. "Plan erstellen" from landing.html
  // always routes here, so signed-in users also land on the planner.
  function forceLegacy() {
    if (window.__FORCE_LEGACY__ === true) return true;
    try {
      var qp = new URLSearchParams(window.location.search);
      return qp.get("planner") === "1";
    } catch (_) { return false; }
  }

  function hasSession() {
    if (forceLegacy()) return false;
    try {
      if (typeof window.getCurrentAccount === "function") {
        var a = window.getCurrentAccount();
        if (a && (a.id || a.email || a.profile)) return true;
      }
    } catch (_) {}
    // Fallback: scan localStorage for Supabase session token
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && /sb-.*-auth-token/.test(k)) {
          var v = localStorage.getItem(k);
          if (v && v.length > 20) return true;
        }
      }
    } catch (_) {}
    return false;
  }

  function ensureStylesheet() {
    if (document.getElementById("core-stylesheet")) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "./core/core.css";
    l.id = "core-stylesheet";
    document.head.appendChild(l);
  }

  function removeStylesheet() {
    var l = document.getElementById("core-stylesheet");
    if (l && l.parentNode) l.parentNode.removeChild(l);
  }

  function enableCore() {
    ensureStylesheet();
    if (body.getAttribute(ATTR) === VAL) return;
    body.setAttribute(ATTR, VAL);
    document.dispatchEvent(new CustomEvent("core:ui-enabled"));
    if (window.CoreBridge && typeof window.CoreBridge.syncAll === "function") {
      setTimeout(window.CoreBridge.syncAll, 100);
    }
  }

  function disableCore() {
    if (body.getAttribute(ATTR) !== VAL) {
      removeStylesheet();
      return;
    }
    body.removeAttribute(ATTR);
    removeStylesheet();
    document.dispatchEvent(new CustomEvent("core:ui-disabled"));
  }

  // Initial check — may miss async session restore, so we also poll briefly
  function initialCheck() {
    if (hasSession()) enableCore();
  }

  function pollForSession() {
    var attempts = 0;
    var maxAttempts = 20; // 20 × 250ms = 5s
    var iv = setInterval(function () {
      attempts++;
      if (hasSession()) {
        enableCore();
        clearInterval(iv);
      } else if (attempts >= maxAttempts) {
        clearInterval(iv);
      }
    }, 250);
  }

  // Hook into Supabase auth state once sbAuth is available
  function wireSupabase() {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (window.sbAuth && typeof window.sbAuth.onAuthStateChange === "function") {
        clearInterval(iv);
        try {
          window.sbAuth.onAuthStateChange(function (event, session) {
            // Fresh SIGNED_IN event: user just authenticated through the
            // launcher. Even if the page was opened with ?planner=1 (forced
            // legacy), we must now transition into the Core Shell — the
            // launcher is the ONLY door into the app.
            if (event === "SIGNED_IN" && session && session.user) {
              try { window.__FORCE_LEGACY__ = false; } catch (_) {}
              try {
                var url = new URL(window.location.href);
                if (url.searchParams.has("planner")) {
                  url.searchParams.delete("planner");
                  window.history.replaceState({}, "", url.toString());
                }
              } catch (_) {}
              enableCore();
              return;
            }
            if (forceLegacy()) return;
            if (event === "SIGNED_OUT") {
              disableCore();
              // legacy landing needs to be shown again
              try { window.scrollTo(0, 0); } catch (_) {}
            } else if (event === "INITIAL_SESSION" && session && session.user) {
              enableCore();
            }
          });
        } catch (_) {}
      } else if (tries > 40) {
        clearInterval(iv);
      }
    }, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initialCheck();
      pollForSession();
      wireSupabase();
    });
  } else {
    initialCheck();
    pollForSession();
    wireSupabase();
  }

  window.CoreAuthGate = {
    enable: enableCore,
    disable: disableCore,
    isEnabled: function () { return body.getAttribute(ATTR) === VAL; }
  };
})();
