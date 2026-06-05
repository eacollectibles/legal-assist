# Project notes for Claude

This file is a memo for Claude — short pointers to long-lived
conventions in this repo so future sessions don't re-derive them.

## Letterhead generator

When the user asks me to "write a letter using the letterhead",
"draft a letter to ...", "send a letter to the LTB / Crown / opposing
counsel", or anything similar, **use the persistent generator at
`letterhead/letterhead.py`**:

```python
from letterhead.letterhead import build_letter
build_letter({
    'signer': 'jeanfrancois',     # or 'candice'
    'date': '...',
    'recipient_person': '...',
    'recipient_title': '...',
    'recipient_lines': ['...', '...'],
    'delivery_note': '...',
    're_line': '...',
    'salutation': 'Dear ...:',
    'body_paragraphs': ['...', '...'],
    'cc': '...',
}, out_path='outputs/<DescriptiveName>.pdf')
```

The engine bootstraps the Allura font on first run and caches the
cursive signature PNG per signer. Two paralegals are configured:

- `jeanfrancois` — Jean-Francois Demers, LSO #P22020 (default)
- `candice` — Candice Fogarty, LSO #P21479

Working example to copy from: `letterhead/example_LTB_scheduling.py`.
Full content-key reference: `letterhead/README.md`.

**Workflow when the user requests a letter:**

1. Ask only the questions actually needed (recipient, re line, body
   points, signer if not obvious). Don't ask for things the engine
   defaults — closing line, cursive signature, letterhead format.
2. Write a small driver script under `outputs/` (e.g.
   `outputs/letter_<short_descriptor>.py`) that imports `build_letter`
   and writes the PDF into `outputs/`.
3. Run it via the workspace bash tool, then share the PDF link
   (computer:// path).

## Paralegal directory

`src/lib/paralegals.ts` is the source of truth for the paralegal list
in the React app. `letterhead/letterhead.py` mirrors it as a Python
dict. Keep both in sync when adding a paralegal.

## Frontend stack

- Astro + React + TypeScript on Cloudflare Workers (`@wix/astro`).
- Wix Data SDK collections used heavily: `clientfiles`, `clientprofiles`,
  `clientdocuments`, `generateddocuments`, `documenttemplates`,
  `financialrecords`, `activitylogs`, `useraccounts`, `assignments`,
  `siteanalytics`, `communicationlog`, `chatconversations`, `chatmessages`.
- `BaseCrudService.getAll(...)` defaults to a 50-row page — always pass
  `{ limit: 1000 }` when scanning across full collections.

## Secrets (Wix Secrets Manager)

Required for full feature parity. Endpoints degrade gracefully when a
secret is missing, so partial config is fine.

- `LA_WIX_API_KEY` + `LA_WIX_SITE_ID` — server-side data access (Wix Data
  scope must be granted on the API key).
- `LA_SQUARE_ACCESS_TOKEN` + `LA_SQUARE_LOCATION_ID` — Square payments.
- `LA_TWILIO_ACCOUNT_SID` + `LA_TWILIO_AUTH_TOKEN` + `LA_TWILIO_FROM_NUMBER`
  — SMS (F-F). Set the From number in E.164 (e.g. `+16399992222`).
- `LA_ANTHROPIC_API_KEY` — AI intake classifier (F-H) AND chat draft-reply
  button (F-I). Uses `claude-haiku-4-5-20251001`.

## Live chat (F-I) — required CMS collections

Create these in Wix CMS before live chat will function. Field types
in parentheses.

**`chatconversations`** (one row per ongoing client thread)
- `_id` (Text, primary)
- `clientId` (Text) — optional; matches `clientprofiles._id` when found by email
- `clientName` (Text)
- `clientEmail` (Text) — natural key for resuming
- `status` (Text) — `open` | `closed`
- `assignedParalegalId` (Text) — `paralegals.ts` id, `''` if unassigned
- `subject` (Text)
- `lastMessageAt` (Date and Time)
- `lastMessagePreview` (Text)
- `unreadByParalegal` (Number)
- `unreadByClient` (Number)
- `fileId` (Text) — optional manual link; when set, every new chat message
  also writes a row to `communicationlog` (LSO By-Law 7.1)
- `typingByClient` (Date and Time) — chat v2 typing indicator
- `typingByParalegal` (Date and Time) — chat v2 typing indicator
- `lastReadByParalegalAt` (Date and Time) — drives client-side read receipts
- `lastReadByClientAt` (Date and Time) — drives paralegal-side read receipts

**`chatmessages`** (one row per message)
- `_id` (Text, primary)
- `conversationId` (Text) — FK to chatconversations._id
- `senderType` (Text) — `client` | `paralegal` | `system`
- `senderId` (Text)
- `senderName` (Text)
- `body` (Text)
- `attachmentUrl` (Text) — optional, Wix Media URL

**`chatpresence`** (one row per paralegal; chat v2)
- `_id` (Text, primary)
- `paralegalId` (Text) — id from `src/lib/paralegals.ts`
- `paralegalName` (Text)
- `status` (Text) — `online` | `away` | `offline`
- `lastSeenAt` (Date and Time) — paralegal-tab heartbeat (~30s cadence)

**`chatvisitors`** (one row per browser session; F-I-14 active-visitor tracking)
- `_id` (Text, primary)
- `sessionId` (Text) — localStorage UUID; natural key
- `clientId` (Text) — populated when visitor is signed in
- `clientName` (Text)
- `clientEmail` (Text)
- `currentPage` (Text) — last URL the visitor was on
- `pageTitle` (Text)
- `referrer` (Text)
- `userAgent` (Text)
- `firstSeenAt` (Date and Time) — first heartbeat
- `lastSeenAt` (Date and Time) — most recent heartbeat (~30s cadence)
- `activeConversationId` (Text) — set when paralegal initiates a chat
- `pendingInitiation` (Text) — JSON blob the visitor's next heartbeat picks up:
  `{conversationId, paralegalId, paralegalName, message, mode, at}`. Cleared
  once delivered. `mode` is `soft` (badge + chime) or `pop` (auto-open bubble).

Permissions: all four collections need "Anyone can Insert + Read" on the
public site so the client widget works. The API key (`LA_WIX_API_KEY`)
also writes via the server endpoints; ensure Wix Data scope is granted.

## Wix CMS used by other features

- `siteanalytics` — Feature 1 (Analytics widget). Created earlier.
- `communicationlog` — exists from earlier work; chat v2 writes
  `communicationType='live_chat'` rows to it when a conversation has a
  `fileId` linked.

## F-J — Paralegal student employee role

Adds a `paralegal_student` user role that can see and edit ONLY the
client files a supervising paralegal has assigned to them. Financial
fields (trust balances, banking, full card numbers) are redacted by
default; the supervising paralegal can flip an `allowFinancialView`
toggle per student.

LSO context: paralegal students may work on files under supervision
of a licensed paralegal per LSO By-Law 4 s.2(2). The supervising
paralegal is responsible for all work product, hence the per-student
allow-list model.

**Routes added:**
- `/student-dashboard` — student view (scoped to assigned files only)
- `/admin/students` — paralegal-side management page

**New `useraccounts` fields (add via Wix CMS):**
- `userType` (Text) — `'paralegal' | 'paralegal_student' | 'client' | 'admin'`
- `supervisingParalegalId` (Text) — student rows only; references
  `paralegals.ts` id of the supervising paralegal.
- `allowFinancialView` (Boolean) — student rows only; default false.

**New `clientfiles` field (add via Wix CMS):**
- `assignedStudentIds` (Text) — comma-separated list of student
  useraccount `_id` values permitted to view + edit this file.

**Key files:**
- `src/lib/student-permissions.ts` — auth helpers (`canViewFile`,
  `filterVisibleFiles`, `redactFinancialsFor`, `shouldRedactFinancials`).
  Use these in every API endpoint that touches client data.
- `src/components/pages/StudentDashboardPage.tsx` — student view.
- `src/components/pages/StudentManagementPage.tsx` — paralegal admin.
- `src/components/paralegal/AssignedStudentsPicker.tsx` — multi-select
  to drop into the file detail page.
- `src/lib/auth-service.ts` — login flow now plumbs `userType` +
  `supervisingParalegalId` + `allowFinancialView` into localStorage.
  Use `getPostLoginRoute(user)` to route post-login.

**Permission rules:**
- Paralegals (`isAdmin === true` OR `userType === 'paralegal'`): see all.
- Students (`userType === 'paralegal_student'`): only files where their
  `_id` appears in `clientfiles.assignedStudentIds`.
- Students without `allowFinancialView`: financial fields are masked
  via `redactFinancialsFor()`. Fields in the redact list:
  `trustBalance`, `generalBalance`, `bankAccount`, `bankRoutingNumber`,
  `cardNumber`, `cardCvv`, `sin`, `fullPaymentHistory`. Special-case
  partial masking: `cardNumber` shows last 4, `dateOfBirth` shows
  year only.

**Audit trail:** when a student edits a file, callers should insert
an `activitylogs` row via `buildStudentEditAuditEntry()` so the
supervising paralegal can review what was changed.
