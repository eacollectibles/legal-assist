# Technical SEO Audit — legalassist.london

**Date:** May 2026
**Score:** 78/100 (well above average for a site this size, but with 2 critical gaps)
**Method:** Codebase review (`public/`, `src/pages/[...slug].astro`, `src/components/Head.tsx`, sitemap.xml, robots.txt) — live URL fetches were blocked by the provenance gate so this audit is source-of-truth rather than render-time.

---

## Executive Summary

Your technical SEO is far stronger than 90% of small-firm legal sites. The Astro SSR layer is doing real work — server-rendered title/description/canonical, server-side schema, and the offscreen `#ssr-seo-content` block that gives Googlebot real text to crawl before React hydrates. That's the right architecture and it explains why the site is indexable at all on a React SPA.

Two critical gaps drag the score down:

1. **The sitemap covers ~297 URLs but the site has ~415+ React pages + 36 blog posts + 355 cities × multiple service templates.** Google literally doesn't know about 40-60% of your indexable pages.
2. **Schema markup is emitted twice** — once server-side in `[...slug].astro`, once client-side in `Head.tsx` — with overlapping `@id` strings. This will trigger duplicate-entity warnings in Google's Rich Results Test.

Fix those two and the score jumps to ~92.

---

## Crawlability — 85/100

### `robots.txt` (`public/robots.txt`)

**Strengths:**
- Private routes properly disallowed (`/admin/`, `/dashboard/`, `/client-intake`, `/booking`, all dashboards and password flows). Good.
- Blocks aggressive crawlers entirely (`MJ12bot`, `DotBot` → `Disallow: /`). Good.
- Throttles `AhrefsBot` and `SemrushBot` with `Crawl-delay: 10`. Reasonable.
- Sitemap URL declared at line 88. Required.

**Issues:**

1. **Line 28 — `Crawl-delay: 1` for all user-agents.** Googlebot ignores this directive (so no harm there), but **Bingbot honors it** — Bing's already slow at 1 page/second. If Bing traffic matters, remove this directive from the wildcard `User-agent: *` block.

2. **Lines 68-86 — AI training bots all blocked.** This is a deliberate choice, not an error, but it's worth a decision pass:
   - `GPTBot`, `ChatGPT-User` → ChatGPT cannot cite or recommend your site
   - `Google-Extended` → Excludes you from Gemini training AND the new SGE/AI Overview answers
   - `anthropic-ai`, `ClaudeBot` → Claude cannot recommend you
   - `CCBot` → Common Crawl, used by many models
   
   **Tradeoff:** You protect your content from being trained on. You lose visibility in the AI answer engines that increasingly precede traditional search. For a service-based local business, AEO/GEO visibility is generally worth more than the protection. **My recommendation:** unblock at minimum `GPTBot`, `ChatGPT-User`, and `Google-Extended`. Keep blocking `CCBot` if you're protective.

### Sitemap (`public/sitemap.xml`)

**Critical issue.** Inventory mismatch:

| Source | URL Count |
|---|---|
| `public/sitemap.xml` | **297 URLs** |
| Sitemap `/locations/*` entries | 157 |
| Sitemap `/services/*` entries | 88 |
| Sitemap `/blog/*` entries | 21 |
| Sitemap `/guides/*` entries | 10 |
| **Actual blog posts in `blogData.ts`** | **36** ← 15 missing from sitemap |
| **Actual cities in `cityData.ts`** | **355** ← far more than 157 location URLs |
| **React page components in `src/components/pages/`** | **~415** |

You're under-representing the site by 40%+. Even the 36 blog posts only have 21 sitemap entries, which means 15 of your most recent posts (likely including the SCC Ahluwalia IPV tort post, the rooming house RTA s. 5(i) post, T6 maintenance applications post, ESA termination/severance/common law notice post, and the 3 traffic/POA posts) are invisible to Google unless they're crawled organically.

**193 of 297 entries have `<lastmod>`, 104 do not (35% missing).** Google uses `lastmod` to prioritize re-crawl when content changes. Missing values force Google to guess.

### Routing (`src/pages/[...slug].astro`)

**Strengths:**
- Canonical URL is built server-side from `Astro.url.pathname`, normalizing trailing slashes (line 23). Correct.
- Private routes get `<meta name="robots" content="noindex, nofollow">` server-side via the regex on line 26. Correct.
- Public routes get `index, follow`. Correct.

---

## Indexation — 80/100

### SSR SEO Content (lines 308-342 of `[...slug].astro`)

**This is the single best thing about your SEO setup.** The `#ssr-seo-content` div renders:
- An `<h1>` derived from the page title
- Page description as a `<p>`
- Breadcrumb nav (when configured)
- FAQ section (when configured)
- Contact block with phone + email

It's visually offscreen (`position: absolute; left: -10000px;`) but in the DOM at render time, so Googlebot sees crawlable text before React hydrates. The comment on lines 304-307 acknowledges this explicitly — "Without this block, every page served the same empty shell to Googlebot, causing Soft 404 / Crawled-not-indexed / Discovered-not-indexed issues across the site." Correct architecture.

A MutationObserver then removes the SSR block once React renders (lines 369-389). Clean.

### Schema.org Markup — duplicate `@id` problem

**Issue:** Both files emit JSON-LD with the SAME `@id`:

| File | When it runs | `@id` |
|---|---|---|
| `src/pages/[...slug].astro` (lines 54-134) | Server-side, all pages | `https://www.legalassist.london/#organization` |
| `src/components/Head.tsx` (lines 22-181) | Client-side via React hydration | `https://www.legalassist.london/#organization` |

The Astro version is the leaner one — it has `LegalService`, `LocalBusiness`, `ProfessionalService` types, address, geo, hours, contact info, areaServed.

The Head.tsx version is **richer** — it adds `hasOfferCatalog`, `hasCredential` (both LSO numbers P22020 + P21479), `sameAs` (Facebook + LinkedIn), `slogan`, `foundingDate`. This data is valuable for rich results.

**Two problems:**
1. Googlebot may parse both blocks (it executes JS for indexing), see two `@id` entries pointing to the same canonical entity, and emit a duplicate-node warning in the Rich Results Test.
2. The Head.tsx schema only reaches JS-executing crawlers. JS-less Googlebot (which still happens for some crawl budgets) sees only the leaner Astro version, losing the credential and offer data.

**Fix:** Migrate the Head.tsx schema additions (`hasOfferCatalog`, `hasCredential`, `sameAs`, `slogan`, `foundingDate`) into the Astro template's `schemaData` constant. Then delete the `<script type="application/ld+json">` block from `Head.tsx`. The richer schema then ships server-side to every crawler, every page.

### `og-image.jpg` reference

`og:image` points to `https://www.legalassist.london/og-image.jpg` on multiple pages. I didn't verify the file exists. Worth confirming with a quick fetch.

---

## Performance — 85/100

### Critical Resource Hints (in `[...slug].astro`)

**Excellent.** Lines 150-178:
- Two specific font files preloaded (`dmsans` and `playfairdisplay`) with `crossorigin="anonymous"` and correct `as="font"` type
- `preconnect` to `static.wixstatic.com` and `static.parastorage.com` (your image and asset CDNs)
- LCP hero image preloaded with `imagesrcset` (responsive — 480w/768w/1024w), `fetchpriority="high"`, and `as="image" type="image/webp"`
- `dns-prefetch` for GTM and GA (deferred non-critical)

This setup eliminates render-blocking and prioritizes LCP correctly.

### Critical CSS (lines 261-278)

Inlined directly in the `<head>`. Covers above-the-fold styles (background, font families, primary/secondary colors, skeleton pulse animation, root layout). Eliminates render-blocking CSS for first paint. Correct.

### Image Strategy

- LCP image uses `<picture>` with WebP source + JPEG fallback (lines 285-301)
- Responsive `srcset` at 480/768/1024 breakpoints
- `loading="lazy"` not applied to LCP image (correct — would defeat the preload)
- Explicit `width` and `height` set → prevents CLS

### Astro Config (`astro.config.mjs`)

- `inlineStylesheets: 'always'` (line 19) — inlines all CSS under default 8KB threshold
- `cssMinify: 'lightningcss'` — faster minifier than the default
- Manual chunks for React vendor, router, lucide icons
- `optimizeDeps.include` pre-bundles common deps

### Potential Performance Wins

1. **Hero image is JPEG/WebP from Wix CDN** — verify the WebP variant is actually served (check the Content-Type response header in DevTools). If `accept: image/webp` isn't being negotiated correctly, you're shipping JPEG to everyone.
2. **MutationObserver in [...slug].astro (lines 369-389)** runs on every page load. It's small but consider if a single `requestAnimationFrame` after the first React render could replace it.
3. **The 163 TypeScript errors** flagged in the build don't directly affect SEO but a few of them (ts(2339) in DocumentWorkflowPage and ParalegalDashboardPage) suggest stale Wix Data SDK types — if React throws at runtime on those pages, hydration fails and Googlebot sees only the SSR shell.

---

## Mobile — 90/100

- Viewport meta on every page with `viewport-fit=cover` (line 187 of Head.tsx)
- `apple-mobile-web-app-capable`, `mobile-web-app-capable` set
- `theme-color`, `msapplication-TileColor` set
- Manifest declared (`/site.webmanifest`)
- Apple touch icon, multiple favicon sizes

No mobile-specific issues found in the codebase. The actual mobile UX (touch targets, intrusive interstitials, font sizes) is a render-time test I can't do from the source files. Run a Google Mobile-Friendly Test on 3-5 representative URLs to confirm.

---

## Security — 95/100

- `referrer-policy: strict-origin-when-cross-origin` set on every page
- `security: checkOrigin: false` in astro.config — this disables CSRF origin checking. Worth noting but not strictly an SEO issue; reconsider if you're seeing form abuse.
- No exposed `.env`, `.git`, or other sensitive paths in robots disallows that I can verify without the live site

---

## URL Structure — 88/100

- Clean, descriptive URLs (`/services/traffic-tickets`, `/locations/london`)
- Trailing-slash normalization happens server-side (line 23 of `[...slug].astro`)
- Lowercase enforced by the routing pattern
- One inconsistency: some city pages live at `/locations/london` (sitemap pattern) while others appear at root like `/woodstock-paralegal`, `/strathroy-chatham-paralegal`, `/st-thomas-paralegal`, `/tillsonburg-paralegal`. **Mixed URL patterns split link equity.** Pick one (`/locations/{city}` is cleaner) and 301-redirect the orphans.

---

## Priority Fix List

### 1. **CRITICAL — Generate sitemap programmatically**
**Why:** 40-60% of indexable pages are missing from the sitemap. Google can't index what it doesn't know about.

**How:** Replace the hand-curated `public/sitemap.xml` with a generated sitemap. Astro has built-in sitemap integration (`@astrojs/sitemap`) — or build a small script that reads `blogData.ts`, `cityData.ts`, and the routed `*Page.tsx` roster and emits XML at build time. Each entry needs `<loc>`, `<lastmod>` (from file mtime or CMS updatedAt), and ideally `<changefreq>`. Add a sitemap index file if you cross 50,000 URLs.

### 2. **CRITICAL — Unify Schema.org markup in the SSR layer**
**Why:** Duplicate `@id` strings will trigger Rich Results Test warnings; the rich schema in Head.tsx is invisible to non-JS crawlers.

**How:** Move `hasOfferCatalog`, `hasCredential`, `sameAs`, `slogan`, `foundingDate` from `Head.tsx` into the `schemaData` constant in `src/pages/[...slug].astro` (around line 54). Delete the `<script type="application/ld+json">` block from `Head.tsx`. Test with the Rich Results Test on 3 representative URLs.

### 3. **HIGH — Decide AI training bot policy**
**Why:** You're currently invisible in ChatGPT, Claude, Perplexity, and Google AI Overviews.

**How:** Edit `public/robots.txt` — at minimum, unblock `GPTBot`, `ChatGPT-User`, and `Google-Extended`. Keep `CCBot` blocked if you want a middle ground. This is a business decision, not a technical one.

### 4. **HIGH — Add `<lastmod>` to all sitemap entries**
**Why:** Google deprioritizes re-crawl of entries without `lastmod`. Your fresh content (new blog posts, updated retainer pages) doesn't get reindexed quickly.

**How:** Solved automatically by Fix #1. If you're not ready to fully programmatic, at minimum hand-add `<lastmod>` to the 104 entries missing it.

### 5. **MEDIUM — Standardize city URL patterns**
**Why:** `/locations/london` and `/london-paralegal` are competing for the same query. Link equity splits.

**How:** Pick `/locations/{city}` (it's already the dominant pattern at 157 entries). 301 the standalone ones (`/woodstock-paralegal`, `/strathroy-chatham-paralegal`, `/st-thomas-paralegal`, `/tillsonburg-paralegal`, `/landlord-tenant-paralegal-london`, `/small-claims-paralegal-london`, `/traffic-ticket-paralegal-london`, `/paralegal-london-ontario`) to their `/locations/{city}` equivalents.

### 6. **MEDIUM — Remove `Crawl-delay: 1` from wildcard robots block**
**Why:** Slows Bingbot. Googlebot ignores it.

**How:** Delete lines 27-28 of `public/robots.txt`. Keep the per-bot delays for AhrefsBot and SemrushBot.

### 7. **LOW — Verify `og-image.jpg` exists**
Quick fetch: `https://www.legalassist.london/og-image.jpg` should return 200 with `Content-Type: image/jpeg`.

### 8. **LOW — Triage the 163 TypeScript errors**
**Why:** Two of the top files (`DocumentWorkflowPage`, `ParalegalDashboardPage`) carry 38 errors combined. If any of these throw at render time, hydration fails and Googlebot sees only the SSR shell. Most of those are private-route pages (admin, dashboard) so the SEO blast radius is limited — but worth a pass.

---

## What I Couldn't Test From the Codebase

- Live HTTP status codes (need to verify all pillar URLs return 200, no 302s, no soft 404s)
- Actual Core Web Vitals from CrUX (need GSC or PageSpeed Insights data)
- Whether the WebP variants are actually served vs JPEG fallback
- HSTS header configuration
- Whether the static.wixstatic.com images have proper cache headers
- The actual rendered HTML for the homepage (live fetch blocked)

The next step that unlocks the rest of this is the GSC export when you have it. Those CSVs will tell us which URLs Google has actually seen, which are getting impressions, and which were "Discovered — currently not indexed" (the polite Google phrase for "you have it in your sitemap but we didn't bother").

---

*Audit v1.0 — May 2026.*
