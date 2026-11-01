# CHAOS website

A static site. No build step, no installs.

| File | What it is |
|---|---|
| `index.html` | Page structure and all styling |
| `script.js` | Products, bag, size picker, signup demo, hero effects |
| `img/` | The three emblem images (white, burgundy, layered) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Run it on your computer
Double-click `index.html`. Or, for a local server:
```
python3 -m http.server 8000
```
then open http://localhost:8000

## Launch on GitHub Pages
1. Create a free GitHub account and a new public repository named `chaos`.
2. Upload `index.html`, `script.js`, `README.md`, `.nojekyll` and the `img` folder (the three PNGs must be inside a folder named `img`).
3. Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.
4. Wait a minute. Your site is at `https://YOUR-USERNAME.github.io/chaos/`.

Own domain: Settings > Pages > Custom domain, then add the DNS records GitHub shows at your registrar.

## Change the content
- **Products and prices:** top of `script.js`, the `P` array. Each item has a name, tag, price and print style.
- **Colors:** the `:root` block at the top of the `<style>` in `index.html` (`--ink`, `--blood`, `--bone`).
- **Social links:** footer in `index.html` (`href="#"`) and the Instagram button in the Lookbook section.

## Before a real launch
- Prices, product names and tags are samples.
- The signup form is a demo: it collects nothing. Connect an email service.
- There is no checkout. "Add to bag" only changes the counter. Use Shopify, a payment link service, or cash on delivery with an order form.
- Replace the Lookbook tiles with real photos.
