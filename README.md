# Duck.ai Auto-Submit Search Shortcut

Automatically sends a prompt when Duck.ai opens from a search shortcut URL. Instead of just adding the prompt to the chat and waiting for you to press **Send**, the script clicks **Send** for you.

For example, a DuckDuckGo search shortcut like `https://duckduckgo.com/?q=!ai+%s` will open Duck.ai with your search terms as the prompt, then send that prompt automatically.

The script waits for the prompt and Send button to load, then submits once. It stops waiting after 10 seconds.

It only runs when the Duck.ai URL contains a `q` parameter with text or a `bang` parameter. If the prompt isn’t ready in time, it won’t submit anything.

**🔗・Links**

- [Install (Raw)](https://github.com/Master3307/duck-ai-auto-submit-shortcut/raw/refs/heads/master/DuckAIAutoSubmitShortcut.user.js)
- [Greasy Fork](https://greasyfork.org/en/scripts/606511-duck-ai-auto-submit-search-shortcut)
- [OpenUserJS](https://openuserjs.org/scripts/MrKoby07/Duck.ai_Auto-Submit_Search_Shortcut)


**🚀・Installation**

1. Install a userscript manager, such as Tampermonkey or Violentmonkey.
2. Click **Install (Raw)** above.
3. Confirm the installation in your userscript manager.
4. Open Duck.ai using your search shortcut URL.

**⚙️・How It Works**

The script checks for a prompt containing text and an enabled Send button. When both are available, it clicks Send once. It stops checking after 10 seconds.

**📄・License**

[MIT License](https://github.com/Master3307/duck-ai-auto-submit-shortcut/blob/master/LICENSE)
