# Solver Accommodations

Phase one of the Solver Accommodations website: a responsive,
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

Public deployment values can be supplied through `.env.local`, using
`.env.example` as the template:

- `NEXT_PUBLIC_SITE_URL`;
- `NEXT_PUBLIC_WHATSAPP_NUMBER`;
- `NEXT_PUBLIC_CONTACT_EMAIL`;
- `NEXT_PUBLIC_AIRBNB_URL`;
- `NEXT_PUBLIC_BOOKING_URL`.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`;
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`;
- `NEXT_PUBLIC_GOOGLE_MAPS_QUERY`.

These variables contain only public contact and listing information. The
language and feature flags are prepared for future growth but remain disabled
until the corresponding product flows are ready.

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
`sitemap.xml`. Google Maps uses London as the safe default query until the
confirmed service area is supplied. Analytics and Search Console activate only
when their public IDs are configured.
