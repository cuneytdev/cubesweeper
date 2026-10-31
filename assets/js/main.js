/* Minesweeper: 3D Puzzle — support site.
   Progressive enhancement only: every page is readable and usable with this file blocked. The FAQ is native
   <details>, the nav is a plain list, and the address below is also written into the HTML as a fallback. */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * The support address. It is written into the HTML of all three pages as well, so the privacy policy and the
   * support page stay readable and contactable with this file blocked — a legal page must not need script to
   * tell someone how to reach us. Change it here *and* in the three index.html files if it ever moves.
   * ------------------------------------------------------------------ */
  var SUPPORT_EMAIL = "cuneytdalan17@gmail.com";

  /* And the App Store listing, once the app is live. Leave it exactly as it is until you have the real
   * URL: while it reads APP_STORE_URL every download control stays a non-clickable "Coming soon to the
   * App Store", which is the honest state. Setting it turns all of them into real links at once.
   *
   *   var APP_STORE_URL = "https://apps.apple.com/app/id0000000000";
   */
  var APP_STORE_URL = "APP_STORE_URL";

  var PLACEHOLDER = "SUPPORT_EMAIL";

  function applySupportEmail() {
    if (SUPPORT_EMAIL === PLACEHOLDER) {
      // Nothing to substitute yet. Say so once in the console rather than shipping a broken-looking mailto.
      if (window.console && console.info) {
        console.info("[support] SUPPORT_EMAIL is still a placeholder — set it in assets/js/main.js.");
      }
      return;
    }

    var nodes = document.querySelectorAll("[data-support-email]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.tagName === "A") {
        var subject = node.getAttribute("data-subject");
        node.href = "mailto:" + SUPPORT_EMAIL + (subject ? "?subject=" + encodeURIComponent(subject) : "");
      }
      // Only swap text that is actually the placeholder, so a button labelled "Email support" keeps its label.
      if (node.textContent.trim() === PLACEHOLDER) {
        node.textContent = SUPPORT_EMAIL;
      }
    }
  }

  function setUpNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    // The list starts open in the markup so it is there without script; collapse it only once we can expand it.
    nav.hidden = true;
    toggle.hidden = false;
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.hidden = open;
    });

    // Escape closes it, and focus goes back to the control that opened it.
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      toggle.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      toggle.focus();
    });
  }

  /* The markup ships with the real link hidden and a "coming soon" sibling visible, so the page is truthful
     with the script blocked. Once APP_STORE_URL is set the pair swaps over. */
  function applyAppStoreUrl() {
    var links = document.querySelectorAll("[data-appstore]");
    var soon = document.querySelectorAll("[data-appstore-soon]");
    var i;

    if (APP_STORE_URL === "APP_STORE_URL" || !APP_STORE_URL) {
      if (links.length && window.console && console.info) {
        console.info("[store] APP_STORE_URL is still a placeholder — set it in assets/js/main.js.");
      }
      return;
    }

    for (i = 0; i < links.length; i++) {
      links[i].href = APP_STORE_URL;
      links[i].hidden = false;
    }
    for (i = 0; i < soon.length; i++) soon[i].hidden = true;
  }

  /* Reveal-on-scroll. The .js-reveal class is set in the document head, and only when motion is welcome, so
     a reader without script or with reduced motion never has anything hidden from them. */
  function setUpReveal() {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    // No IntersectionObserver (older Safari): show everything at once rather than leaving it invisible.
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js-reveal");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        entries[i].target.classList.add("is-in");
        observer.unobserve(entries[i].target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    for (var i = 0; i < items.length; i++) observer.observe(items[i]);
  }

  function setUpFooterYear() {
    var nodes = document.querySelectorAll("[data-year]");
    var year = String(new Date().getFullYear());
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = year;
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    applySupportEmail();
    applyAppStoreUrl();
    setUpNav();
    setUpReveal();
    setUpFooterYear();
  });
})();
