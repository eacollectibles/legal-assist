# Content Strategy: Legal Assist Paralegal Services

**Domain:** legalassist.london
**Date:** May 2026 (v2 — revised after inventory)
**Scope:** Whole-firm organic growth — content + technical SEO + indexation

---

## TL;DR — What Changed Since v1

I originally counted 33 blog posts and recommended adding more. That was wrong about the site's true scale.

**Real inventory:**
- 415 hand-authored React pages in `src/components/pages/`
- 36 blog posts in `src/data/blogData.ts`
- 355 cities in `cityData.ts` driving 10 service templates through `src/pages/[...slug].astro` — a theoretical ~3,500-URL surface
- 234 stale duplicate React pages in `src/src/components/pages/` (125 byte-identical, 111 slightly older)

**Strategic implication:** the site already has enough surface area. The bottleneck is not content volume — it's (1) duplicate-folder cleanup, (2) thin-content risk on the auto-generated city × service pages, (3) indexation proof, and (4) internal linking across a sprawling existing surface. Adding 24 new articles into an unaudited 3,500-URL site would be wasted effort.

The new priority order: **prune → audit → optimize → expand selectively.**

---

## 1. Phase 0 — Pre-Strategy Cleanup (Must Happen First)

These are blockers. Until they're resolved, any new content layered on top compounds the problem.

### 1.1 Remove the duplicate `src/src/components/pages/` folder
234 files, 181 of which appear in the canonical `src/components/pages/` already; the remaining 53 are stale forks. If both folders are reachable in the build, every duplicated URL is competing against itself in Google. Verify which folder Astro is actually compiling, archive the loser, and delete from the build.

### 1.2 Confirm what's actually indexed
Pull a Google Search Console "Pages → Indexed" export. We need to know:
- Are all 355 city × ~10 service URLs being rendered and indexed?
- Are the duplicate routes from the stale folder also in the index?
- How many pages have **zero impressions in 90 days**? Those are candidates for noindex or consolidation.

### 1.3 Audit the auto-generated city pages for thin-content
355 cities × 10 templates is a classic programmatic SEO setup, and Google's Helpful Content Update penalizes templated city pages that aren't materially unique. Spot-check 10 random city × service combinations and answer:
- Is there genuinely city-specific content (court address, local statute reference, regional rent control specifics, local LTB board number)?
- Or is it the same boilerplate with the city name swapped in?

If it's mostly boilerplate, the right move is to **consolidate** — keep ~20 high-value cities (London, Strathroy, Sarnia, Chatham, St. Thomas, Windsor, Kitchener, Hamilton, etc.) and noindex the long tail. A handful of strong city pages outranks 355 thin ones.

### 1.4 Run a technical SEO baseline
- Core Web Vitals (CrUX data for legalassist.london)
- Mobile usability
- Sitemap submission status
- Robots.txt directives
- Render-blocking issues on the catch-all route

Use `searchfit-seo:technical-seo` for this.

---

## 2. Target Audience

Unchanged from v1. Three core personas in order of business value:

**A. Tenants in Southwestern Ontario** — N-notices, repairs, illegal increases, lockouts. Highest LTV.
**B. Drivers with POA charges** — 15-day window, insurance-conscious, decision-stage searchers.
**C. Recently terminated employees** — ESA vs common-law confusion, pressure to sign a release.

Secondary: small claims plaintiffs, HRTO applicants, WSIB-injured workers, small landlords.

---

## 3. Existing Content Surface — Categorized

Counts are from `src/components/pages/`:

| Category | Pages | Notes |
|---|---|---|
| City paralegal landing pages | 164 | Tier-2 expansion |
| LTB / tenant law | 28 | Already strong |
| Traffic / POA | 35 | Already strong |
| Small claims & disputes | 27 | Strong |
| Employment | 16 | Thinner than blog suggests |
| Discrimination (HRTO sub-topics) | 15 | Strong |
| Criminal / charges | 13 | Adequate |
| Guide pages | 11 | Pillar candidates |
| HRTO / Human Rights | 5 | Should be larger given the discrim coverage |
| Tribunals (WSIB/SBT/IRB) | 3 | Underbuilt |
| HowTo* | 2 | Underbuilt |
| Admin / client portal | 12 | Not SEO-relevant |
| Other / uncategorized | ~84 | Includes landing pages, About, Contact, sub-services |

**Blog posts (36):** strong on LTB-tenant, strong on traffic/POA, thinner on employment, almost nothing on small claims procedure or tribunal procedure.

---

## 4. Topical Authority Map (Revised)

Same 5 pillars as v1, but the work shifts from "add cluster articles" to "elect a pillar page from existing inventory and link every existing article into it":

**Pillar 1 — LTB & Tenant:** `LandlordTenantBoardPage.tsx` already exists. Make it the pillar. Internal-link all 28 LTB/tenant pages + relevant blog posts into it. Map every N-form and T-form to a dedicated existing page (most already exist — confirm coverage).

**Pillar 2 — Traffic & POA:** `TrafficTicketsPage` (verify name). 35 sub-pages already exist. Internal-link audit and a single consolidated demerit-points/insurance-impact sub-pillar.

**Pillar 3 — Employment Law:** `EmploymentIssuesPage` is the candidate. Only 16 sub-pages — this is the cluster that genuinely needs growth (Bardal, Waksdale, mitigation, independent contractor test, parental leave). Highest ROI for *new* content.

**Pillar 4 — Small Claims:** Currently 27 dispute-type pages but unclear if there's a real pillar tying them. Build/strengthen a small-claims hub page.

**Pillar 5 — HRTO + Tribunals:** 5 HRTO pages + 15 discrimination pages but only 3 tribunal pages (WSIB/SBT/IRB). The tribunal cluster (WSIB LOE, NEL, WSIAT, SST, CPP-D) is the second cluster needing growth.

---

## 5. Phase 1 — Optimize What Exists (Weeks 1-4)

No new content. Pure optimization across the existing 415 pages.

### Week 1 — Audit + baseline
- [ ] Delete `src/src/components/pages/` after confirming Astro doesn't reference it
- [ ] Pull Search Console export — list every URL with zero clicks and zero impressions in 90 days
- [ ] Run `searchfit-seo:seo-audit` on legalassist.london
- [ ] Run `searchfit-seo:technical-seo` for Core Web Vitals + crawlability

### Week 2 — Schema markup at scale
- [ ] Add `LegalService` schema to every practice-area + city × service page (template-level change, hits all ~3,500 URLs)
- [ ] Add `FAQPage` schema to the 11 GuidePages + the 5 HowTo pages
- [ ] Add `Article` schema to all 36 blog posts (verify it's not already there)
- [ ] Add `BreadcrumbList` schema site-wide
- [ ] Add `LocalBusiness` schema to homepage with full NAP

Use `searchfit-seo:schema-markup` per template.

### Week 3 — Internal linking
- [ ] Run `searchfit-seo:internal-linking` against the whole site
- [ ] Patch orphan pages (any page without an inbound internal link)
- [ ] Add "Related practice areas" and "Related guides" modules to every pillar and sub-pillar
- [ ] Ensure every blog post links to at least 2 practice pages and vice versa

### Week 4 — On-page SEO sweep
- [ ] Run `searchfit-seo:on-page-seo` on the 10 highest-traffic pages and the 10 highest-business-value pages
- [ ] Fix title tags, meta descriptions, H1 uniqueness, image alts
- [ ] Verify each city page has at least 3 city-specific facts (court location, transit route, regional rent guideline, etc.) — otherwise consolidate

---

## 6. Phase 2 — Consolidate the Long Tail (Weeks 5-8)

The 355-city programmatic surface is the biggest risk. Decide what survives.

### Week 5 — Identify the keep list
Pull the city × service combinations by impressions (last 90 days) from GSC. Cut the bottom 50% if they have under ~10 impressions and zero clicks. Map them to 301 redirects to the next-closest live page (usually the regional/county page, e.g. small-town → Middlesex County or Lambton County).

### Week 6 — Enrich the keep list
For the cities that survive (likely 50-100), add genuinely local content:
- Ontario Court of Justice locations (POA addresses)
- LTB regional office addresses
- Local transit + parking info for the courthouse
- Any city-specific bylaw or housing dynamic worth a paragraph
- Local statistic (rental vacancy rate, average dispute timeline at that court)

### Week 7-8 — Build the 5 pillar pages
If the 5 pillar pages already exist (they appear to), upgrade them to true pillar status: 2500-3500 words, comprehensive ToC, links to every cluster article, schema-marked, conversion CTA above the fold.

---

## 7. Phase 3 — Selective Expansion (Weeks 9-16)

Only after Phase 1 + 2 ship. Then add new content — but only where there's a verified gap, not from a generic content calendar.

**Highest-ROI gaps to fill (per category):**

| Gap | Why it matters | Priority |
|---|---|---|
| Bardal factors article + interactive calculator | Single wrongful-dismissal client = months of marketing ROI | 1 |
| Waksdale + termination-clause checker | Same client funnel; high commercial intent | 2 |
| WSIB LOE / NEL / WSIAT cluster (5-8 articles) | Currently 3 pages serve a high-LTV audience | 3 |
| HRTO Form 1 walkthrough + remedies + damages | Decision-stage searchers | 4 |
| T1 / T2 / T3 / T5 / T7 deep dives | Replace the "N4/N12/N13 overview" pattern with form-specific articles | 5 |
| Small claims procedural how-tos (file, defend, counterclaim, collect) | Currently 4 blog posts; should be 12-15 | 6 |

**Format mix going forward (target):** 50% practice-page upgrades, 30% blog articles, 20% interactive tools (calculators, deadline checkers, ticket fine lookups). Tools earn backlinks; articles earn traffic.

---

## 8. Success Metrics

**Lead indicators (weekly):**
- Pages added/updated/redirected
- Orphan-page count (target: zero by Week 4)
- Pages with schema markup as % of total (target: 100% by Week 4)

**Trailing indicators (monthly):**
- Indexed page count from GSC (after Phase 2, this should *decrease* by 30-60% as we noindex thin city pages — that's good)
- Total organic clicks month-over-month
- Average position improvement for tracked keywords
- Click-through rate from impressions (target: lift from sitewide baseline)

**Quarterly:**
- Top-3 rankings for "paralegal [city]" for the 20 cities you keep
- Top-10 rankings for high-intent terms in employment cluster ("wrongful dismissal Ontario", "bardal factors", "constructive dismissal Ontario")
- Inbound leads attributed to organic per quarter

---

## 9. Compliance Reminders (Carry-Over)

Unchanged from v1:
- LSO Rules of Conduct 7.04 — no false/misleading marketing
- No "guaranteed outcome" language anywhere
- No "specialist" claims unless certified
- Comparative claims must be substantiable
- Testimonials must reflect real client experience
- Never use a real client matter without explicit written consent

---

## 10. Recommended Next Actions

In order:

1. **You confirm:** can I delete `src/src/components/pages/` from the build? It's a stale duplicate of 234 files (181 are byte-identical to the canonical folder, the other 53 are older versions).
2. **You provide:** Search Console verification (already have it? share the property access) so I can pull the real indexation + impression data.
3. **I run:** `searchfit-seo:seo-audit` + `searchfit-seo:technical-seo` against legalassist.london to baseline.
4. **I run:** `searchfit-seo:internal-linking` to find orphans before we touch anything.
5. We review results together and pick the first 5-10 surgical fixes.

After that, Phase 1 ships in 4 weeks before any new content gets written.

---

*Strategy v2.0 — May 2026. Supersedes v1, which was based on incomplete inventory data.*
