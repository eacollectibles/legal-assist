# Route Mismatch Audit Report
**Generated: 2026-01-23**

## SUMMARY
Found multiple mismatches between Router.tsx, seoConfig.ts, and public/sitemap.xml.

## CRITICAL MISMATCHES FOUND

### 1. **seoConfig.ts has INVALID routes (not in Router.tsx)**
These routes exist in seoConfig but NOT in Router.tsx:

- `/signup` - seoConfig has it, but Router uses `/client-signup`
- `/login` - seoConfig has it, but Router uses `/client-login`
- `/services/landlord-tenant` - seoConfig has it, but Router uses `/services/landlord-tenant-board`
- `/services/small-claims` - seoConfig has it, but Router uses `/services/small-claims-court`
- `/services/human-rights` - seoConfig has it, but Router uses `/services/human-rights-tribunal`
- `/services/employment-issues` - seoConfig has it, but Router uses `/services/employment-issues` ✓ (CORRECT)
- `/services/employment` - seoConfig has it, but Router uses `/services/employment-issues`
- `/services/employment-standards` - seoConfig has it, but NO route in Router
- `/services/severance-review` - seoConfig has it, but NO route in Router
- `/services/employment-discrimination` - seoConfig has it, but Router uses `/services/workplace-discrimination`
- `/services/hrto-process` - seoConfig has it, but NO route in Router
- `/services/bylaw-violations` - seoConfig has it, but NO route in Router
- `/services/trespass-charges` - seoConfig has it, but NO route in Router
- `/services/liquor-licence-violations` - seoConfig has it, but NO route in Router
- `/services/fire-code-violations` - seoConfig has it, but NO route in Router
- `/services/minor-criminal-charges` - seoConfig has it, but NO route in Router
- `/services/mischief-charges` - seoConfig has it, but NO route in Router
- `/services/assault-charges` - seoConfig has it, but NO route in Router
- `/services/causing-disturbance` - seoConfig has it, but NO route in Router
- `/locations/*` - seoConfig has many location routes that don't exist in Router
- `/guides/*` - seoConfig has many guide routes that don't exist in Router

### 2. **sitemap.xml has INVALID routes**
- `/services/small-claims` should be `/services/small-claims-court`
- `/services/landlord-tenant` should be `/services/landlord-tenant-board`
- `/services/human-rights` should be `/services/human-rights-tribunal`
- `/services/employment-issues` ✓ (CORRECT)
- `/legal-news` - NOT in Router.tsx
- `/guides/*` routes - NOT in Router.tsx
- `/locations/*` routes - NOT in Router.tsx

### 3. **Router.tsx routes NOT in seoConfig.ts**
- `/services/landlord-tenant-board` - Router has it, seoConfig uses `/services/landlord-tenant`
- `/services/small-claims-court` - Router has it, seoConfig uses `/services/small-claims`
- `/services/human-rights-tribunal` - Router has it, seoConfig uses `/services/human-rights`
- `/services/workplace-discrimination` - Router has it, seoConfig uses `/services/employment-discrimination`

## PRIVATE ROUTES (should NOT be in sitemap)
These are correctly excluded from sitemap but need verification in AutoSEO.tsx:
- `/admin/*`
- `/dashboard`
- `/client-dashboard`
- `/client-login`
- `/client-signup`
- `/intake`
- `/booking`
- `/upload`
- `/paralegal-dashboard`
- `/meeting-request`

## RECOMMENDATIONS

### ACTION 1: Fix seoConfig.ts
Update all route keys to match Router.tsx exactly:
- `/signup` → DELETE (private route)
- `/login` → DELETE (private route)
- `/services/landlord-tenant` → `/services/landlord-tenant-board`
- `/services/small-claims` → `/services/small-claims-court`
- `/services/human-rights` → `/services/human-rights-tribunal`
- `/services/employment` → DELETE (not in Router)
- `/services/employment-discrimination` → `/services/workplace-discrimination`
- DELETE all `/services/employment-standards`, `/services/severance-review`, `/services/hrto-process`
- DELETE all `/services/bylaw-violations`, `/services/trespass-charges`, etc. (not in Router)
- DELETE all `/locations/*` routes (not in Router)
- DELETE all `/guides/*` routes (not in Router)

### ACTION 2: Fix sitemap.xml
Update URLs to match Router.tsx:
- `/services/small-claims` → `/services/small-claims-court`
- `/services/landlord-tenant` → `/services/landlord-tenant-board`
- `/services/human-rights` → `/services/human-rights-tribunal`
- REMOVE `/legal-news` (not in Router)
- REMOVE all `/guides/*` (not in Router)
- REMOVE all `/locations/*` (not in Router)

### ACTION 3: Add Redirects in Router.tsx
Add Navigate routes for legacy URLs:
```
<Route path="/signup" element={<Navigate to="/client-signup" replace />} />
<Route path="/login" element={<Navigate to="/client-login" replace />} />
<Route path="/services/small-claims" element={<Navigate to="/services/small-claims-court" replace />} />
<Route path="/services/landlord-tenant" element={<Navigate to="/services/landlord-tenant-board" replace />} />
<Route path="/services/human-rights" element={<Navigate to="/services/human-rights-tribunal" replace />} />
```

### ACTION 4: Verify AutoSEO.tsx
Current regex for private routes:
```
/^\\/(admin|dashboard|client-dashboard|login|signup|client-login|client-signup|intake|booking|upload|paralegal-dashboard|meeting-request)/
```
This is CORRECT and covers all private routes.

## NEXT STEPS
1. Update seoConfig.ts to remove non-existent routes
2. Update sitemap.xml to match Router.tsx
3. Add redirect routes to Router.tsx
4. Test all URLs to ensure no 404s
