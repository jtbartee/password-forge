# Password Forge

A cryptographically secure password and passphrase generator that runs entirely in your browser.

**Live:** https://jtbartee.github.io/password-forge/

- **Passwords:** 13 to 64 characters, always with at least one uppercase letter, one number and one symbol
- **Passphrases:** 5 to 10 words from the EFF long wordlist (7,776 words), each capitalized, with one random number and a symbol separator (`-` `.` `_` `+`), so they meet the same requirements
- Randomness from `crypto.getRandomValues`, with rejection sampling for unbiased picks and a secure Fisher–Yates shuffle
- Optional lowercase letters and a look-alike filter (I, l, 1, O, 0, o) for passwords
- **No special characters** switch for sites that reject symbols: passwords use letters and numbers only (still at least one uppercase letter and one number), and passphrases run their words together with no separator, skipping the four hyphenated words in the list (7,772 remain)
- Live strength meter, entropy in bits, pool size and number of possibilities
- Show/hide and one-click copy, with screen-reader announcements that never read the password aloud
- Accessible: visible focus rings, keyboard-operable controls, reduced-motion support
- **Installable and offline:** a web app manifest and a service worker cache the whole app, so it works with no connection
- **No third parties:** fonts are hosted here, and nothing is generated, stored or sent anywhere but your browser

## Passphrase entropy

Capitalization and the separator are fixed, so the randomness comes from the words,
the digit, and which word the digit is attached to:
`words × log2(7776) + log2(10 × words)`. Six words is about 83.5 bits.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole app: markup, styles, script and the embedded wordlist |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest` | Install metadata |
| `icons/` | App icons |
| `fonts/` | Fraunces, Manrope and JetBrains Mono (Latin subset), with their licenses |

## Run locally

Open `index.html` in any modern browser. There is no build step and no dependencies.
Installing and offline use need the page to be served over http(s), for example
`python3 -m http.server` in this folder.

## Updating

Edit and push. The service worker serves the cached copy first and refreshes it in
the background, so returning visitors see a change on their next visit after that.
If you add or rename a file the app loads, add it to `ASSETS` in `sw.js` and bump `CACHE`.

## Credits

Created by John Bartee together with Claude (Anthropic).

- Wordlist: [EFF long wordlist](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases), Electronic Frontier Foundation, CC BY 3.0 US
- Fonts: Fraunces, Manrope and JetBrains Mono, SIL Open Font License 1.1 (see `fonts/`)
