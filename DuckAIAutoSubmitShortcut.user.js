// ==UserScript==
// @name         Duck.ai Auto-Submit Search Shortcut
// @namespace    https://github.com/Master3307
// @version      1.1.0
// @description  Automatically submits a prefilled Duck.ai prompt opened through a search shortcut URL
// @author       MrKoby07
// @license      MIT
// @homepageURL  https://github.com/Master3307/duck-ai-auto-submit-shortcut
// @supportURL   https://github.com/Master3307/duck-ai-auto-submit-shortcut/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duck.ai
// @downloadURL  https://github.com/Master3307/duck-ai-auto-submit-shortcut/raw/refs/heads/master/duck-ai-auto-submit-shortcut.user.js
// @updateURL    https://github.com/Master3307/duck-ai-auto-submit-shortcut/raw/refs/heads/master/duck-ai-auto-submit-shortcut.user.js
// @match        https://duck.ai/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const hasShortcut = params.has("bang") || params.has("q");

  if (!hasShortcut) return;

  const timeoutMs = 10_000;
  const pollMs = 200;
  const startedAt = Date.now();
  let submitted = false;

  const timer = window.setInterval(() => {
    if (submitted || Date.now() - startedAt >= timeoutMs) {
      window.clearInterval(timer);
      return;
    }

    const prompt = document.querySelector('textarea, input[type="text"]');
    if (!prompt || !prompt.value.trim()) return;

    const form = prompt.closest("form");
    const sendButton =
      form?.querySelector('button[type="submit"]') ||
      document.querySelector(
        'button[type="submit"], button[aria-label*="Send" i]',
      );

    if (
      !sendButton ||
      sendButton.disabled ||
      sendButton.getAttribute("aria-disabled") === "true"
    ) {
      return;
    }

    submitted = true;
    window.clearInterval(timer);
    sendButton.click();
  }, pollMs);
})();
