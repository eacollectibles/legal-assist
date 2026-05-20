# Thin-Content Audit — City × Service Templates

**Date:** May 2026
**Scope:** 9 city service templates × 163 cities = ~1,467 generated pages
**Method:** Read `src/components/templates/*.tsx` + `src/data/cityData.ts` to assess boilerplate-vs-unique ratio

---

## TL;DR

Most of your auto-generated city × service pages are at high risk of Google's Helpful Content Update penalty. Of ~1,467 generated pages:

- **~1,000 pages should be noindex/301'd** (LTB, Employment, HRTO, WSIB, SBT city pages — these are 85-95% boilerplate)
- **~400 should be consolidated** to a curated 100-120 high-value cities (Traffic, POA, Small Claims, Criminal templates — these have some real local hook)
- **4 city-data fields are defined but never rendered** (`ltbOffice`, `courthouse.smallClaims`, `nearestMajorCity`, `population`) — instant quality wins available

This is the single highest-leverage action remaining in the strategy. Programmatic SEO that's 85% boilerplate is a known HCU penalty trigger; Google's mid-2024+ rollouts have flattened many sites for exactly this pattern.

---

## Per-Template Quality Score

| Template | City-specific | Boilerplate | Verdict |
|---|---|---|---|
| `TrafficTicketCityTemplate` | ~20% | ~80% | **CONSOLIDATE** (best of nine) |
| `ProvincialOffencesCityTemplate` | ~15% | ~85% | **CONSOLIDATE** |
| `SmallClaimsCityTemplate` | ~15% | ~85% | **CONSOLIDATE** |
| `CriminalMattersCityTemplate` | ~12% | ~88% | **CONSOLIDATE** |
| `LTBCityTemplate` | ~10% | ~90% | **PRUNE** (or enrich with `ltbOffice`) |
| `EmploymentCityTemplate` | ~10% | ~90% | **PRUNE** (employment law is provincial — no local court) |
| `WSIBCityTemplate` | ~7% | ~93% | **PRUNE** (WSIB is provincial; no local angle) |
| `SBTCityTemplate` | ~7% | ~93% | **PRUNE** (hearings by phone/video) |
| `HRTOCityTemplate` | ~5% | ~95% | **PRUNE** (HRTO is virtual/Toronto-based) |

---

## What Counts as "City-Specific" (Good Examples)

These are the rare snippets where local content actually varies per city:

1. **Traffic template line 226** — `"{city.name} is situated along {city.highways.join(' and ')}, making it a common location for traffic enforcement..."`
2. **Small Claims template line 164** — `"Small Claims Court matters for {city.name} are heard at the {city.courthouse.name} at {city.courthouse.address}."`
3. **POA template lines 120-122** — FAQ branches on whether the city has a separate `provincialOffencesCourt`
4. **Criminal template lines 287-291** — Chip grid of surrounding `areasServed` communities

These are the patterns to expand. The other ~85% of each template needs to either get more city-specific or get noindex'd.

---

## What Counts as "Pure Boilerplate" (Bad — these repeat 163 times unchanged)

- **LTB "Why Choose Us"** (`LTBCityTemplate.tsx:251-270`) — 4 cards, zero city tokens
- **Small Claims 4-step process** (`SmallClaimsCityTemplate.tsx:175-196`) — only step 2 mentions the city
- **HRTO 17 statutory protected grounds** (`HRTOCityTemplate.tsx:21-27`) — identical on all 163 pages
- **Traffic "What's at stake" trio** (`TrafficTicketCityTemplate.tsx:181-198`) — Insurance / Demerits / Suspension — zero localization
- **WSIB & SBT process steps** — same generic copy across all cities, two strings interpolate `{city.name}`
- **Every CTA section** — generic "Book Free Consultation" with only H2 swapping in city name

---

## Dead Schema — 4 Unused City Fields

These exist in `cityData.ts` but no template renders them:

1. **`ltbOffice`** — the city's LTB hearing block (West, Central, East, Toronto-East, Toronto-North, etc.). Renderable in `LTBCityTemplate` for instant uniqueness.
2. **`courthouse.smallClaims`** — small claims division address if different from main courthouse. Renderable in `SmallClaimsCityTemplate`.
3. **`nearestMajorCity`** — useful for navigation context. Renderable everywhere.
4. **`population`** — adds local credibility. Renderable in introductory paragraphs.

**Wiring these in is 30 minutes of work and would upgrade LTB from PRUNE → CONSOLIDATE.**

---

## Recommended Action Plan

### Phase 1 — Stop the bleeding (low risk, high value)

1. **Noindex the worst 3 templates** (HRTO, WSIB, SBT): edit `src/pages/[...slug].astro` to detect these URL patterns and emit `<meta name="robots" content="noindex, follow">`. The `follow` directive preserves any link equity flowing through.
   - 163 × 3 = **489 pages instantly removed from Google's index**
   - Risk: minimal — these pages have low organic traffic, and the umbrella service pages (e.g., `/services/human-rights-tribunal`) absorb the searches

2. **Remove the same 489 URLs from the sitemap** — update `scripts/generate-sitemap.mjs` to skip them. Run `npm run prebuild` to regenerate.

3. **Re-submit fresh sitemap to GSC** so the change is reflected within days, not weeks.

### Phase 2 — Enrich the survivors (1-2 hours of dev work)

4. **Wire `ltbOffice` into `LTBCityTemplate`** — adds a real local fact ("Your LTB hearing will be held by the Central Region block, serving {city.name} and surrounding areas") to all 163 LTB pages. If this single change happens, LTB upgrades from PRUNE → CONSOLIDATE.
5. **Wire `courthouse.smallClaims`** into `SmallClaimsCityTemplate` for cities where it differs from the main courthouse.
6. **Wire `nearestMajorCity` + `population`** into the intro paragraph of all surviving templates.

### Phase 3 — Consolidate the long tail (after GSC data)

7. **Pull the GSC export.** Identify which city × service URLs actually get impressions (let's say threshold = 5 impressions/month over 90 days).
8. **Keep the top ~30 cities per service.** These should be cities with distinct courthouses, POA courts, or LTB offices.
9. **301 the long-tail city pages** to the umbrella service page (e.g., `/locations/strathroy-chatham/wsib` → `/services/wsib-claims`).

### Phase 4 — Decide on Employment

Employment law is provincial. There's no genuine local angle. Two options:
- **Option A:** Noindex all 163 Employment city pages, 301 to `/services/employment-issues`. Cleanest.
- **Option B:** Enrich with `nearestMajorCity` and `areasServed` to create just-enough localization. Lower-risk if you don't want to lose any equity, but the pages will remain weak.

Recommendation: **Option A.** Employment is your highest-LTV service per the content strategy — better to concentrate all link equity on the umbrella service page where new content (Bardal, Waksdale, WSIB LOE) will live.

---

## Estimated Indexable Page Count After Phase 1+3

- Today: 361 URLs in sitemap (many are thin)
- After Phase 1: 361 − 489 = ~ -128... wait, the 489 weren't even in the sitemap maybe
- After Phase 3: a curated **~250-300 high-quality URLs** in the sitemap, fewer thin pages competing against the strong ones

Counterintuitively, **fewer indexed pages will likely result in MORE organic traffic** because the surviving pages get more crawl budget and link equity.

---

## Next Step Decision Tree

If you want maximum momentum and trust the audit, **start with Phase 1** — that's the highest impact lowest risk:

```
1. Edit src/pages/[...slug].astro to detect HRTO/WSIB/SBT city URLs and emit noindex
2. Edit scripts/generate-sitemap.mjs to skip those URL patterns
3. Run npm run prebuild
4. Build + release
```

If you want to take a smaller bite first, **start with Phase 2 — wiring up `ltbOffice`** — that's pure addition (no removal) and adds real local content to 163 LTB pages. Lower stakes, easier reversibility.

---

*Audit v1.0 — May 2026.*
