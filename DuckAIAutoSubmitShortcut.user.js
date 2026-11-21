// ==UserScript==
// @name         Duck.ai Auto-Submit Search Shortcut
// @namespace    https://github.com/Master3307
// @version      1.2.1
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

  // Duck.ai may consume q and leave the prompt in the composer,
  // while retaining bang=true in the URL.
  if (!params.has("q") && !params.has("bang")) return;

  const timeoutMs = 15_000;
  const pollMs = 250;
  const startedAt = Date.now();
  let submitted = false;

  function trySubmit() {
    if (submitted || Date.now() - startedAt >= timeoutMs) {
      return true;
    }

    const prompt = document.querySelector(
      'textarea[name="user-prompt"], textarea[aria-label="Ask anything privately"], textarea',
    );

    if (!prompt || !prompt.value.trim()) return false;

    const sendButton = document.querySelector('button[aria-label="Send"]');

    if (
      !sendButton ||
      sendButton.disabled ||
      sendButton.getAttribute("aria-disabled") === "true"
    ) {
      return false;
    }

    submitted = true;
    sendButton.click();
    return true;
  }

  const observer = new MutationObserver(() => {
    if (trySubmit()) {
      observer.disconnect();
      window.clearInterval(timer);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  const timer = window.setInterval(() => {
    if (trySubmit()) {
      observer.disconnect();
      window.clearInterval(timer);
    }
  }, pollMs);

  trySubmit();
})();
