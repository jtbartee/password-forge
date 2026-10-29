# Password Forge

A cryptographically secure password generator in a single HTML file.

**Live:** https://jtbartee.github.io/password-forge/

- Minimum 13 characters (slider up to 64), always with at least one uppercase letter, one number and one symbol
- Randomness from `crypto.getRandomValues`, with rejection sampling for unbiased picks and a secure Fisher–Yates shuffle
- Optional lowercase letters and a look-alike filter (I, l, 1, O, 0, o)
- Live strength meter, entropy in bits, pool size and number of possibilities
- Show/hide and one-click copy, with screen-reader announcements that never read the password aloud
- Accessible: visible focus rings, keyboard-operable switches, reduced-motion support
- Installable as a PWA (manifest and icons embedded inline)

Passwords are generated locally in your browser and never transmitted.

## Run locally

Open `index.html` in any modern browser. There is no build step and no dependencies.

## Credits

Created by John Bartee together with Claude (Anthropic).
