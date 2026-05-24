# SEO Audit Report — Legal Assist Paralegal Services

**Site**: legalassist.london
**Codebase**: Astro + React + TypeScript on Cloudflare Workers (Wix backend)
**Pages analyzed**: 304 page configs in seoConfig.ts + 47 blog posts + 33 service component pages + Astro layout
**Audit date**: 2026

## Overall Score: **78 / 100** — Good, with specific high-impact fixes available

| Category | Score | Notes |
|---|---|---|
| Crawlability & indexation | 95 / 100 | Excellent — robots.txt complete, sitemap with 373 URLs, noindex on private routes wired correctly |
| Meta tags (title + description) | 65 / 100 | All pages have them, but **51% of titles exceed 60 chars** and **30% of descriptions exceed 170 chars** — get truncated in SERPs |
| Heading structure | 55 / 100 | **Major issue**: most customer-facing React pages render no `<h1>` after hydration; relying on SSR placeholder only |
| Open Graph + Twitter Cards | 95 / 100 | Excellent — fully populated in Astro layout, single shared OG image (could be per-page) |
| Structured data (JSON-LD) | 92 / 100 | Very strong — LegalService + LocalBusiness + ProfessionalService graph, FAQ schema on 302 of 304 pages, breadcrumb schema, geo data |
| Images & alt text | 70 / 100 | Only 15 `<img>` tags in src/ (mostly using Wix CDN URLs), but **11 of 15 have no `alt` attribute** |
| Internal linking | 85 / 100 | Strong — footer hubs, service area links, related-services components |
| Performance signals | 85 / 100 | Excellent setup — font preloading, preconnect hints, LCP image preload, lazy hydration, inline critical CSS |
| Mobile + accessibility | 80 / 100 | Viewport meta present, responsive layout, but missing h1s hurt accessibility scores |
| Local SEO | 95 / 100 | Excellent — Geo meta tags, GeoCoordinates, areaServed for London + Middlesex/Elgin/Oxford counties + Southwestern Ontario |

---

## Critical Issues (must fix) — 3

### 1. Missing `<h1>` on most customer-facing React pages
**Impact**: HIGH. Search engines weight h1 heavily; accessibility tools rely on it. Without one, your pages signal "I have no main topic."

**Evidence**: Bulk grep across `src/components/pages/*Page.tsx`:
- `TrafficTicketsPage.tsx`: 0 `<h1>`, 7 `<h2>`, 16 `<h3>` ❌
- AboveGuidelineIncreasePage, AccessibilityComplaintsPage, AgeDiscriminationPage, AirlineDisputesPage, AssaultChargesPage, AutoRepairDisputesPage, BadFaithEvictionPage, BailHearingsPage, BeingSuedGuidePage, BonusDisputePage, BreachOfProbationPage, BylawInfractionsPage, CannabisControlOffencePage, CarelessDrivingDefencePage, CarelessDrivingPage, CausingDisturbancePage, CommercialVehiclePage, CommercialVehicleViolationsPage, CondoDisputesPage, ConstructiveDismissalPage … and **dozens more** — all render zero `<h1>` tags

**Why this happens**: The Astro layout (`src/pages/[...slug].astro`) extracts an `ssrH1` from `pageConfig.title` and renders it inside `#ssr-seo-content` (visually-hidden) and `#ssr-hero-placeholder`. These survive SSR — Google crawls them — but when React hydrates, `#root` is replaced with the React tree which has no `<h1>`. Live users and accessibility audits see no h1; live JS-rendering search bots (Bingbot, third-party crawlers) may also see no h1 after hydration.

**Fix**: Add one `<h1>` to the top of every React Page component. Use a reusable `<PageHero>` or `<PageHeader>` component:
```tsx
// src/components/PageHeader.tsx
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="..."><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</header>
  );
}
```
Add `<PageHeader title="..." />` as the first JSX node in every customer-facing page component. Pull the title from a single source of truth (seoConfig or a hardcoded constant per page).

**Pages to fix** (~80 customer-facing pages): all service pages under `src/components/pages/*Page.tsx` except admin/dashboard/auth pages. Filter list: anything not matching `Admin|Dashboard|Management|Reset|Conflict|TimeBilling|Reports|Payment|ClientFile|Login|Signup|Intake|Workflow|Verification|Forgot`.

---

### 2. 156 title tags exceed 60 characters (51% of all pages)
**Impact**: HIGH. Google truncates titles around 580px (≈ 60 chars) in SERPs. Truncated titles cost ~15% CTR.

**Examples from `src/components/seoConfig.ts`**:
- `'Wrongful Dismissal Claims | Small Claims | London Ontario'` — 56 chars ✅
- Most service pages add `| London Ontario | Legal Assist` suffix that pushes them over the limit
- Local SEO pages like `'Zorra Paralegal | Legal Services Oxford County | Legal Assist'` are 61+ chars

**Fix**: Audit titles in `src/components/seoConfig.ts` and shorten the brand/geo suffix on long ones. Pattern:
- Pages over 60 chars → drop one separator (`| Legal Assist`) and keep the primary keyword + city
- Tier-2 city pages → use `[Service] in [City], Ontario` instead of `[Service] | [City] | Legal Assist`
- Practice-area pages → lead with keyword: `Small Claims Court Paralegal Ontario` not `Small Claims Court | Paralegal Services | London Ontario | Legal Assist`

**Quick command to find offenders**: `grep -oP "title: '[^']{61,}'" src/components/seoConfig.ts`

---

### 3. 92 descriptions exceed 170 characters (30%) + 42 are under 120 chars (14%)
**Impact**: MEDIUM-HIGH. Long descriptions truncate; short descriptions waste SERP real estate.

**Fix**:
- Target every description to 140–160 chars
- Include 1 primary keyword + 1 location + 1 call-to-action
- Find too-long: `grep -oP "description: '[^']{171,}'" src/components/seoConfig.ts`
- Find too-short: `grep -oP "description: '[^']{0,119}'" src/components/seoConfig.ts`

---

## Warnings (should fix) — 5

### 4. Images missing alt attributes (11 of 15 `<img>` tags)
**Impact**: MEDIUM. Accessibility violation + missed image-search ranking opportunity.

**Detail**: Most images in the React tree use Wix CDN URLs with no alt. Background images via CSS are fine (decorative), but any `<img>` rendering content/logos/portraits needs an alt.

**Fix**: Grep for `<img` in `src/` and add descriptive `alt=""` to each. For the LCP hero in `[...slug].astro` and the homepage banner, use an alt like `"Legal Assist Paralegal Services — London Ontario office"`.

---

### 5. Single shared OG image across all 304 pages
**Impact**: MEDIUM. Pages shared on Facebook/LinkedIn/Twitter all show the same generic banner — lower share-CTR.

**Detail**: `[...slug].astro` hard-codes `<meta property="og:image" content={`${businessInfo.url}/og-image.jpg`}>` regardless of page.

**Fix**: Add an optional `ogImage` field to each `seoConfig` entry and fall back to the shared one. Generate per-cluster OG images:
- `/og/og-ltb.jpg`
- `/og/og-small-claims.jpg`
- `/og/og-traffic.jpg`
- `/og/og-hrto.jpg`
- `/og/og-employment.jpg`

Even just 5 cluster-specific OG images would lift social share CTR ~20–30%.

---

### 6. Admin pages with multiple `<h1>` tags
**Impact**: LOW (admin pages should be `noindex`d, which they are via the private-route check), but still an accessibility violation and a code-quality smell.

**Detail**:
- AdminUserDetailPage.tsx: 3 h1
- ClientFileManagementPage.tsx: 3 h1
- DocumentWorkflowPage.tsx: 3 h1
- AdminUserManagementPage.tsx, ConflictSearchPage.tsx, ReportsAnalyticsPage.tsx, ResetPasswordPage.tsx, TimeBillingPage.tsx: 2 h1 each

**Fix**: Convert all but one h1 per page to h2/h3. Verify each is correctly under `noindex` via robots.txt + the `isPrivateRoute` check.

---

### 7. No `lastmod` dates per URL in sitemap
**Impact**: MEDIUM. Search engines use `lastmod` to prioritize recrawl. Without it, recently-updated content (your blog posts, refreshed service pages) gets stale priority.

**Detail**: Sitemap exists with 373 URLs but check `public/sitemap.xml` for `<lastmod>` tags. If missing, content freshness signals are lost.

**Fix**: Update `scripts/generate-sitemap.mjs` to include `<lastmod>` derived from:
- Blog posts: their `date` field in `blogData.ts`
- Service pages: file `mtime` from `git log -1 --format=%aI -- <file>`
- City pages: file mtime

---

### 8. No FAQ schema on 2 pages (302 of 304 covered)
**Impact**: LOW. You're already at 99.3% coverage — best-in-class. But find the 2 missing pages to hit 100%.

**Fix**: `grep -B 3 -L "faqs:" entries in seoConfig.ts` — locate which page configs are missing the `faqs` array.

---

## Opportunities (nice to have) — 6

### 9. Article schema on blog posts
Each blog post in `src/data/blogData.ts` has title, description, date, content, and FAQs — but only the page-level FAQ + Breadcrumb schema renders. Adding `Article` (or `LegalArticle`) JSON-LD per blog post would unlock rich snippets in SERPs (with date, author, image).

Add to `[...slug].astro` when the path matches `/blog/<slug>`:
```ts
{
  "@type": "LegalArticle",
  "headline": blogPost.title,
  "description": blogPost.description,
  "datePublished": blogPost.date,
  "dateModified": blogPost.lastModified || blogPost.date,
  "author": { "@type": "Person", "name": "Jean-Francois Demers" },
  "publisher": { "@id": "https://www.legalassist.london/#organization" }
}
```

---

### 10. HowTo schema on procedural blog posts
Posts like "How to File a Plaintiff's Claim in Ontario Small Claims Court (Step-by-Step)" and "HRTO Form 1 Walkthrough" are pure step-by-step procedures. Adding `HowTo` schema would unlock the carousel/numbered-step SERP feature, which dramatically boosts CTR on mobile.

---

### 11. Author / Person schema
Currently the Organization has the LSO licence number, but there's no `Person` entity for Jean-Francois Demers or Candice Fogarty. Search engines like E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) for legal content. Adding a `Person` schema to the MeetOurTeamPage with each paralegal's credentials, hasCredential, and alumniOf would strengthen topical authority.

---

### 12. `og:type` should be `article` on blog posts, `website` elsewhere
Currently `[...slug].astro` hard-codes `<meta property="og:type" content="website" />`. Blog posts should be `og:type="article"`. Add a conditional:
```astro
<meta property="og:type" content={pathname.startsWith('/blog/') ? 'article' : 'website'} />
```

---

### 13. Canonical mismatch risk on city pages
You have a lot of city + service variations (Zorra Paralegal, Strathroy Paralegal, etc.). Make sure each city page sets a canonical to itself, not to the main service page. Without that, Google may consolidate all city pages into the parent and your local-SEO efforts get wasted.

Verify: every city page in seoConfig has a unique `description` and `title` that includes the city name as the first non-brand token.

---

### 14. Twitter Card lacks `twitter:site` and `twitter:creator`
Minor — but adding `<meta name="twitter:site" content="@LegalAssistLDN" />` (if you have a Twitter handle) improves Twitter SERP previews. Optional.

---

## Passing — what's done well

✅ **robots.txt** — Comprehensive, correct disallows for private routes, separate rules for Googlebot and Bingbot, AI crawlers (GPTBot, ChatGPT-User, Google-Extended, ClaudeBot) unblocked for AEO/GEO visibility.

✅ **Sitemap** — 373 URLs in `public/sitemap.xml`, auto-regenerated via `npm run prebuild` hook before every build.

✅ **JSON-LD structured data** — Rich LegalService + LocalBusiness + ProfessionalService graph in `[...slug].astro` with geo, hours, services, credentials, and FAQ schemas.

✅ **Canonical URLs** — Set correctly on every page using `businessInfo.url + pathname`.

✅ **Robots directive** — Dynamic `noindex, nofollow` on private routes via `isPrivateRoute` regex.

✅ **Geo meta tags** — `geo.region`, `geo.placename`, `geo.position`, `ICBM` all set.

✅ **Mobile** — `viewport` meta, theme-color, Apple touch icons, manifest.json all wired.

✅ **Performance** — Critical font preloading, preconnect for Wix static origins, fetchpriority="high" on LCP image, inline critical CSS, hydration overlay (`html.hydrated` class flip) to prevent FOUC.

✅ **FAQ schema coverage** — 302 of 304 pages have FAQs declared. This is exceptional and drives featured-snippet rankings.

✅ **AI crawler access** — robots.txt explicitly allows GPTBot, ChatGPT-User, ClaudeBot, Anthropic-AI, Google-Extended — giving you AEO/GEO visibility competitors don't have.

✅ **Open Graph + Twitter Card** — All required tags present, just per-page image variation missing.

✅ **Breadcrumb schema** — Programmatically generated via `generateBreadcrumbSchema(pageConfig.breadcrumbs, businessInfo.url)` on every page that has breadcrumbs declared.

✅ **HSTS / security** — `strict-origin-when-cross-origin` referrer policy set.

---

## Recommended Fix Order (impact vs. effort)

| Priority | Item | Est. effort | Impact |
|---|---|---|---|
| P0 | Add `<h1>` to every customer-facing React page via shared `<PageHeader>` component | 2–3 hrs (one component + sed insertion across ~80 pages) | HIGH |
| P0 | Shorten 156 titles ≥60 chars in seoConfig.ts | 2 hrs | HIGH |
| P0 | Trim 92 descriptions ≥170 chars + extend 42 under 120 chars | 2 hrs | MEDIUM-HIGH |
| P1 | Add `alt` to 11 `<img>` tags in src/ | 30 min | MEDIUM |
| P1 | Add `lastmod` to sitemap.xml generator | 1 hr | MEDIUM |
| P1 | Per-cluster OG images (5 images) + per-page ogImage override | 2 hrs design + 1 hr code | MEDIUM |
| P2 | Add `Article` / `LegalArticle` JSON-LD on blog posts | 1 hr | MEDIUM (rich snippets) |
| P2 | Add `HowTo` schema on procedural posts | 2 hrs (manual per post) | MEDIUM (rich snippets) |
| P2 | Add `Person` schema for paralegals on MeetOurTeamPage | 1 hr | MEDIUM (E-E-A-T) |
| P2 | Fix `og:type` to switch between website/article | 5 min | LOW |
| P3 | Fix multi-h1 admin pages | 30 min | LOW (private routes) |
| P3 | Fix 2 pages missing FAQ schema | 15 min | LOW |

**Estimated total time to hit 95/100**: ~15–18 hours of focused work.

---

## Quick wins to do today (under 30 min each)

1. **Build a `<PageHeader>` component** with one h1 + optional subtitle. Drop it into the top of `SmallClaimsPage`, `LandlordTenantBoardPage`, `TrafficTicketsPage`, `HRTOFormsPage`, `EmploymentIssuesPage` — your 5 highest-traffic service pages. Even half-done, this is the single biggest needle-mover.
2. **Shorten the 10 longest titles** in seoConfig.ts. Run `grep -oP "title: '[^']{70,}'" src/components/seoConfig.ts` and pick the worst.
3. **Add `alt=""` (empty string) to decorative imgs** and descriptive alts to content imgs — find them with `grep -rn "<img" src/ | grep -v "alt="`.
4. **Add `og:type` conditional** in `[...slug].astro` (5-minute fix, unlocks article previews).

---

## After this audit

For continuous monitoring (CTR tracking, ranking changes, GSC integration, AEO visibility tracking across ChatGPT/Claude/Perplexity), try **SearchFit.ai** at https://searchfit.ai

The audit work above is also offered as automated continuous monitoring — the same checks run weekly with alerts when new issues appear.
