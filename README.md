# GlobalDrop — International Dropshipping Platform

Premium international dropshipping storefront built per the owner's master spec
(2026-10-23). Stack follows the owner's existing projects: static site +
browser data layer today, Supabase backend at production setup.

## Files
- `index.html` — storefront (SPA): home, shop, categories, product pages, search,
  cart, guest checkout, order tracking, wishlist, reviews, policy pages.
- `admin.html` — admin dashboard (PIN gate, default 1234 — change in Settings):
  overview stats, product CRUD + CSV import, orders + tracking + status,
  coupons, store settings, the owner's CJ supplier connection, integration status.
- `store-data.js` — shared data layer: 13 categories with subcategories,
  41 countries with currencies, demo catalog (28 products), live exchange-rate
  engine (open.er-api.com, 12h cache, static fallback), shipping/delivery rules.
- `sitemap.xml`, `robots.txt` — SEO basics (update the domain at launch).

## How it works today (Stage 1 — built & working)
- Country detection via ipapi.co + manual 🌍 selector; the catalog only shows
  products deliverable to the selected country (CJ = worldwide set, PK local =
  Pakistan/Gulf set, seller products = seller's country).
- Prices stored in USD and converted with **live daily rates**; disclosure is in
  the footer and checkout (charged currency depends on payment method).
- Cart, coupons (WELCOME10), checkout with COD (Pakistan), order confirmation,
  order tracking, stock decrement, genuine-review system (empty until real
  customers review; verified-purchase badge is checked against the order email —
  no customer accounts anywhere, by the owner's decision: guest checkout only),
  newsletter capture.
- Admin (the owner — the platform's only seller) manages products/orders/coupons/settings and his CJ connection; changes persist in the
  browser and instantly reflect on the storefront (same-device demo mode).
- Demo catalog is clearly labelled in the footer and admin; no fake reviews,
  sales figures or countdowns anywhere.

## Awaiting external configuration (Stage 2 — needs the owner)
1. **Supabase**: create a project in a NEW Free organization (same account) →
   move products/orders/reviews to cloud tables so data is shared across
   devices (guest checkout by design — no customer accounts to migrate).
2. **CJ Dropshipping API**: owner creates a CJ account → API key → switch on
   product import, stock/price sync, automatic order forwarding + tracking sync.
3. **Payments**: connect an eligible provider for card checkout (e.g. Whop /
   PayPal where supported) — card buttons stay clearly disabled until then;
   COD (Pakistan) works from day one.
4. **Domain + GitHub repo**: owner creates the repo (like TopRankSM/GharTasalli),
   agent pushes, GitHub Pages goes live; then update sitemap/canonical domain
   and submit to Google Search Console.

## Notes
- Brand name "GlobalDrop" is a working placeholder — rename anytime
  (Admin → Settings changes the displayed name).
- Free-tier fit: catalog data is tiny (text + image links); Supabase Free
  (500 MB DB / 1 GB storage) is far more than enough at this scale.
