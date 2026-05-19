# Internal Linking Audit — Legal Assist

**Date:** May 2026
**Method:** Static analysis of all `href` and `<Link to>` references across `src/components/**/*.tsx`
**Routes analyzed:** 302 from `seoConfig.ts` + 36 blog posts + 163 city slugs
**Total internal links found:** 819

---

## TL;DR

The biggest issues are structural, not stylistic:

1. **Critical bug** in `LocationsHubPage.tsx:259` uses a relative path (`to={city.slug}` instead of `to={`/locations/${city.slug}`}`) — silently breaks links to all 163 city pages from the location hub.
2. **75% of all internal links** (612 of 819) go to `/contact`. Massive equity concentration on one page that doesn't rank for anything.
3. **6 high-value local landing pages are completely orphaned** — `/aylmer-paralegal`, `/ingersoll-paralegal`, `/st-thomas-paralegal`, `/strathroy-chatham-paralegal`, `/tillsonburg-paralegal`, `/woodstock-paralegal` have zero incoming links from anywhere.
4. **84 service pages** appear in `seoConfig.ts` but have zero internal links.
5. **250+ leaf pages have exactly ONE outgoing internal link** — always `/contact`. No "Related services", no parent breadcrumb, no sibling cross-links.

Fix the bug first (Section 1), then work the structural patterns (Sections 2-3). Anchor-text cleanup (Section 4) is the lowest priority — meaningful but won't move rankings on its own.

---

## 1. Critical Bug — Single-line fix unlocks 163 pages

**File:** `src/components/pages/LocationsHubPage.tsx`
**Line 259:** uses a relative `to={city.slug}` instead of an absolute path.

```jsx
// BEFORE (broken — only works when user is already at /locations/)
<Link to={city.slug}>{city.name}</Link>

// AFTER (correct — works from anywhere on the site)
<Link to={`/locations/${city.slug}`}>{city.name}</Link>
```

**Why it matters:** Internal crawlers (including Googlebot's link graph analysis) treat the broken relative paths as orphan signals. All 163 city pages effectively have zero inbound links from the hub. Fixing this de-orphans 163 pages in one edit.

---

## 2. Top-20 Orphan Pages (excluding the 163 cities fixed by #1)

| # | Route | Type | Why it matters |
|---|---|---|---|
| 1 | `/aylmer-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 2 | `/ingersoll-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 3 | `/st-thomas-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 4 | `/strathroy-chatham-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 5 | `/tillsonburg-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 6 | `/woodstock-paralegal` | Local landing | Tier-1 SEO geo+service — unreachable |
| 7 | `/guides` | Hub | Root of resources tree — no entry point |
| 8 | `/locations` | Hub | Hub exists, nothing links to it |
| 9 | `/services/provincial-offences` | Service hub | Children exist; the umbrella itself is orphaned |
| 10 | `/services/distracted-driving` | Service | High-volume traffic keyword |
| 11 | `/services/no-insurance-defence` | Service | High-stakes |
| 12 | `/services/red-light-tickets` | Service | High-volume traffic keyword |
| 13 | `/services/careless-driving-defence` | Service | High-stakes |
| 14 | `/services/speeding-ticket-defence` | Service | High-volume traffic keyword |
| 15 | `/services/stop-sign-ticket` | Service | High-volume traffic keyword |
| 16 | `/services/illegal-lockout` | Service | High-conversion tenant service |
| 17 | `/services/wrongful-termination` | Service | High-value employment service |
| 18 | `/services/unpaid-wages` | Service | High-volume employment service |
| 19 | `/services/wsib-claims` | Service | Distinct vertical without umbrella linkage |
| 20 | All 163 city pages | Local landing | Fixed by #1 bug fix |

**Recommended fix patterns:**

- **Local landing pages (#1-6)** — add to `Footer.tsx` "Service Areas" block, and link from the relevant `/locations/{nearest-city}` page as "Also serving..."
- **Hub pages (#7-9)** — add to `Header.tsx` navigation or Footer "Resources"/"Locations" columns
- **Service orphans (#10-19)** — link from their service umbrella pages (e.g., `/services/traffic-tickets` → all 6 traffic sub-services)

---

## 3. Dead-End Pages — top 10 with only `/contact` outbound

These are public pages with exactly one outgoing internal link (`/contact`). Add 2-4 contextual cross-links per page to keep crawlers and equity flowing.

| # | File | Recommended additions |
|---|---|---|
| 1 | `ProvincialOffencesPage.tsx` | Link to all 20 POA sub-services in a "Specific charges" section |
| 2 | `TrafficTicketsPage.tsx` | Link to all 20 ticket sub-services in a "Charge types" grid |
| 3 | `LandlordTenantBoardPage.tsx` | Link to N-form pages, T-form pages, related guides |
| 4 | `LandlordServicesPage.tsx` | Link to all landlord-side sub-services |
| 5 | `TenantServicesPage.tsx` | Link to all tenant-side sub-services |
| 6 | `WSIBClaimsPage.tsx` | Link to `/services/social-benefits-tribunal`, related blog posts |
| 7 | `SmallClaimsProcessPage.tsx` | Link to specific dispute-type pages (debt, contractor, lent money) |
| 8 | `DemeritPointsGuidePage.tsx` | Link to every demerit-bearing ticket service |
| 9 | `RentIncreaseGuidePage.tsx` | Link to AGI, illegal rent increase, T3 application pages |
| 10 | `LegalDeadlinesGuidePage.tsx` | Link to every tribunal/court page with statutory deadlines |

This is a systemic pattern — likely 200+ similar pages. A reasonable refactor: build a `<RelatedServices>` component that takes a service category and renders 3-4 cards from `seoConfig`. Drop it into every leaf page.

---

## 4. Link Equity Concentration

| Rank | Route | Inbound links | Share |
|---|---|---|---|
| 1 | `/contact` | **612** | 74.7% |
| 2 | `/services` | 17 | 2.1% |
| 3 | `/booking` | 14 | 1.7% |
| 4 | `/` (home) | 8 | 1.0% |
| 5 | `/services/landlord-tenant-board` | 7 | 0.9% |
| 6 | `/client-signup` | 6 | 0.7% |
| 7 | `/services/small-claims-court` | 6 | 0.7% |
| 8 | `/about` | 5 | 0.6% |
| 9 | `/blog` | 5 | 0.6% |
| 10 | `/legal-news` | 5 | 0.6% |

**Observations:**
- `/contact` absorbing 75% of internal link equity is fine for users (they want to convert) but means Google sees one giant hub with everything spoking into it. That's not ranking-positive — Google wants topical clusters where service pillars are the hubs, not a generic contact page.
- The homepage is shockingly low at 8 inbound links. Most leaf pages don't have a breadcrumb home link.
- `/blog` and `/legal-news` tied at 5 — they duplicate functionality. Consolidate or 301 one to the other.
- `/booking` (14) ranks above the homepage. Suggests booking CTAs are everywhere but the home link is missing from most pages.

**Fix:** introduce a breadcrumb component (`<Breadcrumbs>`) that renders Home → Section → Page on every leaf, and a "Related Services" component on every service page. That alone re-routes hundreds of links into the topical hub pages where they belong.

---

## 5. Weak Anchor Text — 10 representative samples

Most of these come from card grids with a generic "Learn More" button. The fix is to interpolate the target's service name into the anchor.

| # | File:line | Current anchor | Suggested |
|---|---|---|---|
| 1 | `ServicesPage.tsx:474, 479, 484, ...` (13×) | `"Learn More"` | `"Read about {service.name}"` |
| 2 | `LondonParalegalPage.tsx:64, 72, 80, 88, 96, 104` | `"Learn More"` | `"Read about {service.name} in London"` |
| 3 | `HRTOLondonPage.tsx:61-101` (6×) | `"Learn More"` | `"Read about {topic}"` |
| 4 | `LandlordTenantLondonPage.tsx:61-101` (6×) | `"Learn More"` | `"Read about {topic} at the LTB"` |
| 5 | `SmallClaimsLondonPage.tsx:61-101` (6×) | `"Learn More"` | `"Read about {topic} in Small Claims"` |
| 6 | `AylmerParalegalPage.tsx:46` | `"Learn More"` | Service-specific |
| 7 | `IngersollParalegalPage.tsx:46` | `"Learn More"` | Service-specific |
| 8 | `BarrieParalegalPage.tsx:44` | `"Learn more"` | Service-specific |
| 9 | `MiltonParalegalPage.tsx:44` | `"Learn more"` | Service-specific |
| 10 | `LandlordServicesPage.tsx:50` | `"Learn More"` | Service-specific |

Conservatively 50+ "Learn More" instances total. Fix once in the shared card component, propagate everywhere.

---

## Fix Priority

1. **Critical** — Fix `LocationsHubPage.tsx:259` — 1 line, unlocks 163 city pages.
2. **High** — Add the 6 orphan local-landing pages to `Footer.tsx` Service Areas + link from nearest city pages.
3. **High** — Wire the 3 orphan hubs (`/guides`, `/locations`, `/services/provincial-offences`) into `Header.tsx` or `Footer.tsx`.
4. **High** — Build a `<RelatedServices>` component and drop it into the 10 dead-end pages in Section 3.
5. **Medium** — Add a `<Breadcrumbs>` component to every leaf page; that alone fixes the homepage-inbound-link gap.
6. **Medium** — Standardize the "Learn More" pattern into a card-component prop that interpolates the target name.
7. **Low** — Decide `/blog` vs `/legal-news` — pick one as canonical, 301 the other.

---

*Audit v1.0 — May 2026.*
