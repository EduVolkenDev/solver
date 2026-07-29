import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Solver landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Solver Accommodations \| Coming Soon in London<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/solveraccommodations\.com\//i);
  assert.match(html, /Comfortable London stays/);
  assert.match(html, /Coming soon/);
  assert.match(html, /Explore what.*coming/);
  assert.match(html, /data-analytics-event="view_launch_preview"/);
  assert.match(html, /data-analytics-event="launch_interest"/);
  assert.match(html, /A considered London stay experience is/);
  assert.match(html, /Future guest journey/);
  assert.match(html, /Launch FAQs/);
  assert.match(html, /A new owner service/);
  assert.match(html, /Owner consultations are not open yet/);
  assert.match(html, /What to expect from the future service/);
  assert.doesNotMatch(html, /data-analytics-event="whatsapp_enquiry"/);
  assert.doesNotMatch(html, /data-analytics-event="request_valuation"/);
  assert.doesNotMatch(html, /<form class="finder-form"/);
  assert.doesNotMatch(html, /View property/);
  assert.match(html, /Solver Accommodations/);
  assert.match(html, /new-solver-wordmark-complete\.webp/);
  assert.doesNotMatch(html, /solver-mark\.webp/);
  assert.match(html, /solver-signature-door\.webp/);
  assert.match(html, /location-card__map-embed/);
  assert.match(html, /https:\/\/www\.google\.com\/maps\?q=London%2C%20United%20Kingdom&amp;output=embed/);
  assert.match(html, /Explore London/);
  assert.match(html, /solver-icons-super/);
  assert.match(html, /solver-icons-select/);
  assert.match(html, /solver-icons-select11\.webp/);
  assert.match(html, /solver-icons-select20\.webp/);
  assert.match(html, /solver-icons-select26\.webp/);
  assert.match(html, /solver-icons-select5\.webp/);
  assert.doesNotMatch(html, /brand-lockup__words/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Organization"/);
  for (const headingId of ["launch-title", "stays-title", "why-stay-title", "booking-title", "faqs-title", "management-title", "location-title", "contact-title", "about-title", "platforms-title", "dual-cta-title"]) {
    assert.match(html, new RegExp(`id="${headingId}"`));
  }
  for (const sectionId of ["launch", "stays", "management", "areas-covered", "contact", "about", "owner-faqs", "how-it-works", "fees-consultation"]) {
    assert.match(html, new RegExp(`id="${sectionId}"`));
  }
  assert.doesNotMatch(html, /hero-seal|floating-contact/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("publishes production crawl configuration", async () => {
  const robots = await readFile(new URL("public/robots.txt", projectRoot), "utf8");
  const sitemap = await readFile(new URL("public/sitemap.xml", projectRoot), "utf8");

  assert.match(robots, /Sitemap: https:\/\/solveraccommodations\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/solveraccommodations\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solveraccommodations\.com\/privacy<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solveraccommodations\.com\/terms<\/loc>/);
});

test("renders the legal pages", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  const { default: worker } = await import(`${workerUrl.href}?legal=${process.pid}-${Date.now()}`);

  for (const [path, heading] of [["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${heading}<\\/h1>`));
    assert.match(html, /Privacy Policy|Terms of Service/);
    assert.match(html, /Back to Solver Accommodations/);
    assert.match(html, /solver-icons-select(?:12|26)\.webp/);
  }
});

test("keeps the temporary starter preview removed", async () => {
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
  await Promise.all([
    "public/assets/solver-profile-business.webp",
    "public/assets/solver-profile-visitor.webp",
    "public/assets/solver-profile-student.webp",
    "public/assets/solver-icons-select17.webp",
    "public/assets/solver-icons-super7.webp",
    "public/assets/solver-signature-door.webp",
  ].map((asset) => access(new URL(asset, projectRoot))));
  const page = await readFile(new URL("app/page.tsx", projectRoot), "utf8");
  assert.match(page, /SolverLanding/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
});
