# Solar Hisab Calculator

A free, static, multilingual solar sizing and cost-estimation calculator for a global audience. The brand is country-neutral; the project name and future custom domain should not include a country name.

## Included in Step 1

- Responsive calculator interface and appliance-based daily energy estimate.
- 21 country/market planning assumptions in `rates.json`.
- 25 language choices, including RTL support for Urdu, Arabic, Persian, Pashto and Sindhi.
- Solar panel count, indicative system size, inverter suggestion and broad budget estimate.
- SEO metadata, WebApplication structured data, sitemap and robots file.
- Educational solar guide in `blog/`.
- Scheduled GitHub Actions reminder to review market assumptions.

## Run locally

This is a static website. Open `index.html` through a local static server so that the browser can load `rates.json` with fetch. No backend, database or paid service is required.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then save.
4. Wait for GitHub Pages to publish the site. The default address will be based on this repository name and GitHub username.
5. A future custom domain can be a neutral global name, without a country code or country name. Check domain availability before buying; no domain purchase is required for GitHub Pages.

## Important accuracy notes

Figures in `rates.json` are illustrative planning assumptions, not verified live market prices. The workflow opens a periodic review issue; it does not automatically fetch or validate supplier prices. Update figures only after checking dated, reliable local sources.

The calculator is educational only. A qualified local solar professional must verify site conditions, electrical design, battery requirements, local codes and final costs. No search ranking or financial result is guaranteed.
