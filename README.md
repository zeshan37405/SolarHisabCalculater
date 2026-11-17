# Solar Hisab Calculator

A free, static, multilingual solar sizing and cost-estimation calculator for a global audience. The brand is country-neutral and does not require a paid domain, backend, database or hosting service.

## Website features

- Responsive solar calculator for desktop and mobile.
- Appliance-based daily energy estimate with editable wattage and hours.
- Add and remove custom appliances; results update as inputs change.
- Optional 20% design safety margin.
- Approximate system capacity, 580W panel count and inverter suggestion.
- 21 country/market cost assumptions and 25 language choices, including RTL support for Urdu, Arabic, Persian, Pashto and Sindhi.
- About, Privacy Policy, Terms and educational guide pages.
- Search metadata, structured data, sitemap and robots.txt.
- Scheduled GitHub Actions reminder every 10 days to review market assumptions.

## Publish for free with GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then save.
4. Wait for the Pages deployment to finish. The repository address is expected to be:
   https://zeshan37405.github.io/SolarHisabCalculater/
5. If Pages is already enabled, check the **Actions** tab for the latest Pages build status.

No paid domain is required. A custom domain is optional and must be checked for availability before purchase.

## Run locally

Open the repository through a local static web server so the browser can load `rates.json`. The project has no backend.

## Accuracy and safety

The values in `rates.json` are illustrative planning assumptions, not live supplier prices or verified quotations. The scheduled workflow creates a review reminder; it does not automatically collect or verify prices. Update assumptions only after checking dated, reliable local sources.

The calculator is educational only. A qualified local solar professional must verify site conditions, electrical design, panel and inverter compatibility, battery requirements, local codes, grid rules and final costs. No savings, performance or search ranking is guaranteed.
