# Solver Accommodations

Phase one of the Solver Accommodation K&D Limited website: a responsive,
single-page hospitality presence for short stays in London.

## Run locally

```bash
npm install
npm run dev
```

The app uses the workspace Sites starter with React 19, Next-compatible
vinext, TypeScript and Cloudflare-ready deployment configuration.

## Configure before publication

Commercial details are intentionally centralized in
`app/config/solver.ts`:

- WhatsApp Business number;
- email address;
- official Airbnb and Booking.com URLs;
- production site URL/domain;
- privacy policy and terms URLs or pages;
- confirmed residential/service area wording.

Until those values are supplied, enquiry buttons safely return visitors to the
contact section and platform cards remain clearly marked as unconfigured.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
node --test tests/rendered-html.test.mjs
```

The hero and logo assets live in `public/assets/` and are served as optimized
WebP files. The page includes initial metadata, JSON-LD, `robots.txt`, and
`sitemap.xml`.
