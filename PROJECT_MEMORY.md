# Legal Assist — Project Memory

> Comprehensive context snapshot for the LegalAssist paralegal-practice
> website. Captures repo state, stack, features, config, and outstanding
> git work as of **2026-06-04**. Intended as a single "load-everything"
> memory file for future sessions.

---

## 1. Location & identity

- **Local directory (PC):** `C:\Users\jeanf\Downloads\legal-assist-main (3)\legal-assist-main`
- **Live site:** https://www.legalassist.london
- **Practice:** Legal Assist Paralegal Services, London, Ontario
- **Branch:** `main` (in sync with `origin/main` — nothing unpushed)
- **Regulatory frame:** Law Society of Ontario (LSO) — By-Law 9 (trust
  accounting), By-Law 7.1 (record-keeping), By-Law 4 s.2(2) (student
  supervision).

### Paralegals (source of truth: `src/lib/paralegals.ts`, mirrored in `letterhead/letterhead.py`)
- `jeanfrancois` — Jean-Francois Demers, LSO #P22020 (default signer)
- `candice` — Candice Fogarty, LSO #P21479

---

## 2. Tech stack

- **Framework:** Astro + React + TypeScript
- **Hosting:** Cloudflare Workers (`@wix/astro`)
- **Data:** Wix Data SDK. `BaseCrudService.getAll(...)` defaults to a
  50-row page — **always pass `{ limit: 1000 }`** when scanning full
  collections.
- **AI:** `claude-haiku-4-5-20251001` (intake classifier F-H, chat
  draft-reply F-I).

### Wix Data collections in use
`clientfiles`, `clientprofiles`, `clientdocuments`, `generateddocuments`,
`documenttemplates`, `financialrecords`, `activitylogs`, `useraccounts`,
`assignments`, `siteanalytics`, `communicationlog`, `chatconversations`,
`chatmessages`, `chatpresence`, `chatvisitors`.

---

## 3. Secrets (Wix Secrets Manager)

Endpoints degrade gracefully when a secret is missing, so partial config
is fine.

| Secret | Purpose |
|---|---|
| `LA_WIX_API_KEY` + `LA_WIX_SITE_ID` | Server-side data access (Wix Data scope required) |
| `LA_SQUARE_ACCESS_TOKEN` + `LA_SQUARE_LOCATION_ID` | Square payments |
| `LA_TWILIO_ACCOUNT_SID` + `LA_TWILIO_AUTH_TOKEN` + `LA_TWILIO_FROM_NUMBER` | SMS (F-F); From number in E.164, e.g. `+16399992222` |
| `LA_ANTHROPIC_API_KEY` | AI intake classifier (F-H) + chat draft-reply (F-I) |

---

## 4. Major features

### Letterhead generator (`letterhead/letterhead.py`)
Persistent PDF letter generator. Bootstraps the Allura font on first run,
caches a cursive signature PNG per signer. Use `build_letter({...},
out_path='outputs/<Name>.pdf')`. Working example:
`letterhead/example_LTB_scheduling.py`. Full key reference:
`letterhead/README.md`. Workflow: ask only for recipient/re-line/body/
signer → write a driver script in `outputs/` → run via bash → share the
PDF.

### Live chat (F-I)
Client ↔ paralegal real-time chat. CMS collections: `chatconversations`,
`chatmessages`, `chatpresence`, `chatvisitors` (schemas detailed in
`CLAUDE.md`). All four need "Anyone can Insert + Read" on the public site.
When a conversation has a `fileId`, every message also writes a
`communicationlog` row (`communicationType='live_chat'`) per LSO By-Law 7.1.

### Paralegal student employee role (F-J)
`paralegal_student` user role — sees/edits ONLY files a supervising
paralegal assigned. Financial fields redacted by default; supervisor can
flip `allowFinancialView` per student. Routes: `/student-dashboard`,
`/admin/students`. Auth helpers in `src/lib/student-permissions.ts`
(`canViewFile`, `filterVisibleFiles`, `redactFinancialsFor`,
`shouldRedactFinancials`). New `useraccounts` fields: `userType`,
`supervisingParalegalId`, `allowFinancialView`. New `clientfiles` field:
`assignedStudentIds` (comma-separated student `_id`s). Redact list:
`trustBalance`, `generalBalance`, `bankAccount`, `bankRoutingNumber`,
`cardNumber` (shows last 4), `cardCvv`, `sin`, `fullPaymentHistory`,
`dateOfBirth` (year only). Student edits log an `activitylogs` row via
`buildStudentEditAuditEntry()`.

### Trust accounting (LSO By-Law 9)
Admin page `/admin/trust-accounting` with tabs: Overview, Transaction
Journal (9A), Client Ledgers (9B), Reconciliation (9C). Monthly
reconciliation required. "Generate This Month's Snapshot" auto-populates
client ledger totals; bank statement balance still entered manually.

**State as of 2026-06-04:** Total trust balance **$1,205.00** across 3
funded clients (14 transactions). ⚠️ The **May 2026** reconciliation on
record shows a **$3,027.24 discrepancy** (bank $4,232.24 vs ledgers
$1,205.00) — needs investigation, not roll-forward.

### Other modules
SMS (`sms-service.ts`), e-transfer (`etransfer.ts`,
`EtransferOption.tsx`), intake classifier (`intake-classifier.ts`),
analytics (`analytics.ts`, `siteanalytics`), Form 9E generator
(`form9e-generator.ts`), deadlines (`deadlines.ts`).

---

## 5. Outstanding git state (uncommitted) — 2026-06-04

Branch `main` is in sync with `origin/main`; the only outstanding work is
**local uncommitted changes**.

### Modified (36 tracked files)
`CLAUDE.md`, `blog-posts/ahluwalia-scc-ipv-tort-2026.md`, `package.json`,
`public/sitemap.xml`, `src/components/Router.tsx`,
`src/components/seoConfig.ts`, `src/data/blogData.ts`,
`src/lib/auth-service.ts`, `src/lib/email-service.ts`,
`src/lib/pdf-generator.ts`, `src/lib/retainer-html-generator.ts`,
`src/pages/[...slug].astro`, `src/routes/adminRoutes.ts`,
`src/styles/global.css`,
`templates/ltb-cash-for-keys-retainer-template.html`, plus these pages:
`ClientFileManagementPage`, `ClientLoginPage`, `ContactPage`,
`HomePageNew`, `HumanRightsTribunalPage`, `LandlordRightsGuidePage`,
`LandlordTenantBoardPage`, `MeetOurTeamPage`,
`MonthEndReconciliationPage`, `ParalegalDashboardPageNew`, `PayPage`,
`ReportsAnalyticsPage`, `SmallClaimsCourtGuidePage`, `SmallClaimsPage`,
`TenantRightsGuidePage`, `TrafficTicketsPage`, `TrustAccountingPage`,
`UploadTokenManagementPage`, `dashboard/MyFileTab`,
`paralegal-dashboard/FileManagementTab`,
`paralegal-dashboard/MessagesTab`.

### Untracked (new) — grouped
- **Chat:** `src/components/chat/`, `src/lib/chat-client.ts`,
  `chat-server.ts`, `chat-notifications.ts`, `chat-canned-replies.ts`,
  `chat-quick-actions.ts`, `src/pages/api/chat/`,
  `paralegal-dashboard/LiveChatTab.tsx`,
  `paralegal-dashboard/ActiveVisitorsPanel.tsx`
- **Student role:** `pages/StudentDashboardPage.tsx`,
  `pages/StudentManagementPage.tsx`, `src/lib/student-permissions.ts`,
  `src/components/paralegal-dashboard/`, `src/components/paralegal/`
- **Payments / SMS / intake:** `payments/EtransferOption.tsx`,
  `src/lib/etransfer.ts`, `sms-service.ts`, `intake-classifier.ts`,
  `src/pages/api/sms/`, `src/pages/api/intake/`
- **Analytics / tracking / visitors / admin:** `src/lib/analytics.ts`,
  `src/pages/api/analytics/`, `src/pages/api/track/`,
  `src/pages/api/visitors/`, `src/pages/api/admin/`
- **UI / misc:** `AuthorityCitations.tsx`, `DownloadGuideButton.tsx`,
  `StickyMobileCallBar.tsx`, `TrustBar.tsx`, `src/components/client/`,
  `src/lib/deadlines.ts`, `src/lib/form9e-generator.ts`,
  `scripts/build.mjs`, `PARALEGAL_AUDIT_2026-05-29.md`
- **⚠️ Probably should NOT be committed:**
  `src/components/seoConfig.ts.broken-2026-05-29` (stale broken backup),
  `LTB_CashForKeys_Retainer_v1.7_SAMPLE.pdf` (sample binary — consider
  Git LFS or `.gitignore`).

### Commit everything in one go (PowerShell)
```powershell
cd "C:\Users\jeanf\Downloads\legal-assist-main (3)\legal-assist-main"; git add -A; git commit -m "Add live chat, student-employee role, SMS/e-transfer, analytics, and page updates"
```
Before committing, consider removing the two artifacts above:
```powershell
Remove-Item "src/components/seoConfig.ts.broken-2026-05-29"
# and add LTB_CashForKeys_Retainer_v1.7_SAMPLE.pdf to .gitignore if it shouldn't ship
```

---

## 6. Conventions reminders

- Keep `src/lib/paralegals.ts` and `letterhead/letterhead.py` in sync when
  adding a paralegal.
- Always `{ limit: 1000 }` on `BaseCrudService.getAll`.
- New Wix CMS fields/collections must be created in the Wix dashboard
  before the related feature works (chat, student role).
