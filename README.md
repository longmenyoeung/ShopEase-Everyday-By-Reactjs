# Shop everyday — React storefront

A responsive storefront built with React, Vite, and Tailwind CSS. Its light palette combines off-white surfaces, charcoal typography, and muted blue accents. It includes a promotional hero, category browsing, product search, favorites, a persistent shopping bag, a featured deal, and a newsletter preview.

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite. Build for production with `npm run build`, then check the build with `npm run preview`. Deploy the generated `dist/` directory to a static host.

## Project structure

```text
public/
  data/catalog.json       Demo catalog fetched over HTTP
  images/                 Local product/category images and source credits
src/
  components/             Reusable storefront sections and controls
  context/ShopContext.jsx Shopping bag and favorites state/actions
  hooks/                  Catalog fetching and safe browser persistence
  services/api.js         Backend integration boundary
  utils/format.js         Shared currency formatting
  App.jsx                 Page composition, search, and filtering
  main.jsx                React entry point
  styles.css              Tailwind theme, base rules, shared component recipes
tests/                    Desktop and mobile browser tests
scripts/                  Optional asset download utility
```

Components receive data through props. Shared shopping state lives in `ShopContext`; network access lives in `services/api.js`. Product/category content lives in JSON rather than component markup. The catalog hook supports cancellation, loading, errors, and retry.

## Connect your backend

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL=https://your-api.example.com/api`.
3. Implement `GET /api/catalog` with the response shape below, or adapt `getCatalog()` in `src/services/api.js` to your existing endpoints.
4. Restart Vite after changing environment variables. Allow the frontend origin through your backend CORS configuration.

```json
{
  "categories": [
    { "id": "women", "name": "Women", "image": "https://your-cdn.example.com/women.jpg" }
  ],
  "products": [
    {
      "id": "leather-handbag",
      "name": "Classic Leather Handbag",
      "category": "women",
      "categoryLabel": "LITTLE LUXURIES",
      "price": 59.99,
      "originalPrice": 79.99,
      "rating": 4.9,
      "image": "https://your-cdn.example.com/bag.webp",
      "badge": "NEW"
    }
  ],
  "deal": {
    "id": "leather-handbag",
    "name": "Classic Leather Handbag",
    "description": "Your everyday companion.",
    "price": 59.99,
    "originalPrice": 119.99,
    "stock": 23,
    "image": "https://your-cdn.example.com/bag.webp"
  }
}
```

Use stable string IDs, numeric USD prices, and image URLs. `originalPrice`, `badge`, and the entire `deal` are optional. Deal IDs should match their catalog product. Category IDs must match product `category` values. The initial navigation uses `women`, `men`, and `home`; update navigation if your category IDs differ. No API key belongs in `VITE_` variables: these are public browser configuration.

For a larger catalog, move search, filtering, and pagination to the service/backend boundary. For production orders, verify current prices, stock, and totals on the server. Add checkout and newsletter API calls in their respective components. The current newsletter only validates the email and displays an explicit demo acknowledgement; it does not submit or store it. Checkout is intentionally unavailable until a backend is connected.

## Customize and extend

- Edit `public/data/catalog.json` to add products and categories.
- Change the `@theme` tokens at the top of `src/styles.css` for brand colors. Tailwind utilities such as `bg-accent`, `text-muted`, and `border-line` use these tokens throughout the UI.
- Tailwind is integrated through `@tailwindcss/vite` in `vite.config.js`. Hero, brand, and product cards use utility classes directly; repeated controls and sections use shared `@apply` recipes in the components layer. No separate Tailwind config file is needed.
- Compose new sections in `src/App.jsx`; reuse `ProductCard`, `Modal`, and formatting utilities.
- Cart and favorites retain the original localStorage keys `shopease:cart` and `shopease:favorites` so the rebrand preserves existing saved items. Storage errors and invalid stored shapes are handled safely.
- The UI supports keyboard focus, native modal focus trapping, reduced motion, and responsive desktop/mobile layouts.
- Replace sample policies, contact details, offers, and product data before launch.

## Verification

```bash
npm run build
npm run test:e2e
npm run test:production
npm run format
```

`npm run test:production` builds the site first, then runs the complete suite against the generated `dist/` files on a dedicated preview server. `npm run test:e2e` runs the same suite against the development server.

Browser tests use Microsoft Edge (`channel: 'msedge'`) installed on this Windows environment. On another system, install Edge or remove the channel settings in `playwright.config.js` and run `npx playwright install chromium`. The 16 desktop/mobile checks cover rendering/image loading, responsive overflow, hero links, navigation, category filtering, saved favorites, persistent cart quantities/totals, product search, newsletter preview, failed-request recovery, keyboard dialog behavior, and invalid saved browser data. Mobile checks emulate a phone viewport in Edge; they do not replace testing on a physical device or in Safari.

## Assets

Bundled sample product images come from DummyJSON; category photographs come from Unsplash. Exact source URLs are recorded in `public/images/sources.json`. `node scripts/download-assets.mjs` refreshes these local demo assets and requires network access. Replace demo images with your own licensed product photography before a commercial launch. Google Fonts supplies DM Sans and Manrope, with local sans-serif fallbacks if unavailable.
