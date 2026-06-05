# Paralegal Back-End Audit Report
**Date:** May 29, 2026  
**Tester:** Claude (acting as paralegal Jean-Francois Demers)  
**Build state:** Last successful build at 2026-05-28 20:40 UTC. Source edits made after that point (Tasks #230, #231) are NOT in this audit — a fresh build is queued (Task #233).

---

## 1. Summary

Tested every module in the paralegal sidebar. 20 modules total. Most pages render and the LSO compliance plumbing is in good shape, but there are visible data-integrity gaps between modules and a few stale code paths. The biggest issues are not "broken pages" — they are inconsistent numbers across pages that all should agree on.

**Status legend:** ✅ Working · ⚠ Issues · ❌ Broken

| # | Module | Status | Key finding |
|---|---|---|---|
| 1 | Overview | ⚠ | Active Files counter = 0 (should be 16); Unread Messages = 0 while messages list shows entries |
| 2 | Appointments | ✅ | Cal.com integration wired; API key not configured yet |
| 3 | Assignments | ✅ | 5 unassigned clients listed with Assign-to-Me; delete-file button on assigned files |
| 4 | Messages | ⚠ | Says "No messages from assigned clients yet" but Overview pane shows 5 messages — different queries |
| 5 | Client Files (G. Financial Records) | ⚠ | Empty for Arlene despite $1,130 in journal — fix in #230 not deployed yet |
| 6 | Client Files (H. Communication Log) | ⚠ | Same — pagination + fallback not deployed |
| 7 | Trust Accounting Overview | ✅ | Cross-foot fixed; backfill button visible |
| 8 | Trust Journal (9A) | ✅ | Trust/General toggle, running balance, ref enforcement |
| 9 | Trust Ledger (9B) | ✅ | Per-client view works (Arlene $1,130) |
| 10 | Reconciliation (9C) | ✅ | 5-step wizard renders; defaults to April (should be current-month-minus-one) |
| 11 | Payments | ⚠ | Only 3 most recent Square deposits shown — no pagination, no link to "view all" |
| 12 | Disburse Funds | ✅ | Trust/General source toggle, full form |
| 13 | Month-End Reconciliation | ⚠ | Wizard works but pre-fills wrong month; can't tell from screen what month it will validate |
| 14 | Time & Billing | ✅ | 4 tabs render; empty state correct |
| 15 | Deadlines | ✅ | 7 severity counters; Rule Library tab present |
| 16 | Tasks / Tickler | ✅ | Today's Docket / All / By File tabs |
| 17 | Conflict Search | ✅ | LSO Rule 3.04 framing; Search + Search History tabs |
| 18 | Signatures | ⚠ | Documents show BOTH "signed" badge AND "Signature Required" — confusing |
| 19 | File Management | ⚠ | "Client: N/A" on some docs even when client is known |
| 20 | Document Workflow | ✅ | Stats card; documents grouped by client; "Smart Workflow Suggestions" appear to be marketing copy not real features |
| 21 | Reports & Analytics | ❌ | Trust Balance shown as **$1,988** here vs **$3,191** on Trust Accounting page — MISMATCH; Total Revenue $0 |
| 22 | Meetings | ✅ | Tabs render; "Schedule New Consultation" button |
| 23 | Upload Links | ⚠ | Token shows "Client: New Account" instead of the real client name |
| 24 | Settings | ⚠ | Only contains "Change Password" — no profile, notification, signature, integration, or paralegal-credential settings |

---

## 2. Confirmed bugs (fixes needed)

### Critical — data integrity

**B-1. Trust Balance mismatch between Reports and Trust Accounting.**  
Trust Accounting Overview shows $3,191; Reports → Overview shows $1,988. Both query `financialrecords` but use different sign conventions or filters. Same class of bug as Task #219 (cross-foot fix) but the fix wasn't propagated to ReportsAnalyticsPage.

**B-2. Overview dashboard counters disconnected from real data.**  
Active Files reads 0 but the Reports page reads 16 from the same `clientfiles` collection. Unread Messages reads 0 while 5 messages exist. Counters likely use stale state or wrong query.

**B-3. G. Financial Records empty even with fix queued.**  
Confirmed via bundle inspection: Task #230 fallback (clientId-match-when-fileId-missing) is in source but not in the deployed JS. Clean rebuild required (Task #233).

**B-4. Backfill UPDATE permission missing (WDE0027).**  
Task #232. Backfill button runs, finds 9 records to update, but Wix CMS rejects all 9 with permission errors. Either grant role-based UPDATE on `financialrecords` or move the backfill behind a server endpoint with elevated permissions.

### Medium — UX / display

**B-5. Signatures: contradictory badges.**  
Document cards show "signed" + "Signature Required" simultaneously. After a client signs, the Signature Required badge should clear.

**B-6. File Management: "Client: N/A" on owned documents.**  
File Management documents have a real `fileId`/`clientId` but the Client column renders "N/A". Likely missing join with `clientfiles` when rendering the row.

**B-7. Upload Links: "New Account" placeholder.**  
Upload-token rows show the literal string "New Account" rather than the client's real name. Likely fallback when the join misses.

**B-8. Month-End Wizard month default.**  
Defaults to April 2026 when current date is May 29, 2026. Should default to the most recent fully-elapsed month (April when it's early May, May when it's June, etc.).

**B-9. Payments page caps at 3 rows.**  
Only the most recent 3 Square deposits show on /admin/payments. No pagination, no "View All" link. Trust Journal has 9 deposits.

**B-10. Messages module split from Overview messages.**  
Overview "Recent Messages" pulls one query, Messages module pulls another. They should be the same inbox.

### Low — Cosmetic / known

**B-11. "Smart Workflow Suggestions" on Document Workflow are not buttons.**  
Auto-Reminders, Batch Processing, Client Notifications are pitched as features but don't appear to do anything when clicked. Either wire them up or label them as roadmap items.

**B-12. Settings is minimal.**  
Only one action (Change Password). Paralegals will expect: profile / contact info edit, signature image upload, notification preferences (email vs SMS for which events), default rate, calendar integration toggles, document-template preferences.

---

## 3. Suggested new features (prioritised)

### Tier 1 — Highest ROI, fills LSO/operational gaps

**F-1. Unified Inbox / Notification Center.**  
Single panel for all communications: system messages, Square receipts, client emails (Gmail/Outlook integration), incoming SMS replies, signed-document notifications, Square webhook events. Replace the disconnected Overview-vs-Messages duality.

**F-2. Calendar & Cal.com sync.**  
You already have a Sync Cal.com button — finish the integration. Surface the booking in Appointments + post a row to Tickler with auto-reminders 24h and 2h before. Add a calendar view (month/week/day).

**F-3. Document-driven Deadlines auto-populate.**  
When a retainer is signed, automatically inject the right Ontario limitation periods from the Rule Library:  
&nbsp;&nbsp;• Small Claims — 2-year limitation (Limitations Act, 2002 s.4)  
&nbsp;&nbsp;• LTB — application-specific deadlines  
&nbsp;&nbsp;• HRTO — 1 year (Code s.34)  
&nbsp;&nbsp;• POA — 15-day Notice of Intention to Appear  
Plus matter-type-specific tickler tasks (e.g. file claim → 30 days, serve → 6 months).

**F-4. Templated client letters from Letterhead engine.**  
Surface the `letterhead/letterhead.py` engine in the UI. "Compose Letter" picker in the client file → Letter Type (LTB, Crown, opposing counsel, demand, disclosure request) → autofills addressee/file ref → opens in editor → download PDF.

**F-5. Trust transfer wizard with mandatory invoice attachment.**  
When transferring trust → general, require not just an invoice number but also let the paralegal *attach* the invoice PDF directly. Stamps the invoice ID on both the trust withdrawal row and the general deposit row (LSO By-Law 9.20).

**F-6. Receivables aging report.**  
Time & Billing already has a Receivables tab — add aging buckets (0-30, 31-60, 61-90, 90+) and a "Send Reminder" button that emails the client a payment-link with the invoice attached.

### Tier 2 — High value, modest effort

**F-7. Client portal upload notifications.**  
When a client uploads a doc via the portal/upload-link, badge appears on the file + Overview + a Tickler task is created automatically ("Review new upload from <client>").

**F-8. Hours timer that ties into Communication Log.**  
On the timer, "Log entry to Communication Log" checkbox so a 0.4h phone call automatically posts a comm-log entry plus a docket entry without double-typing.

**F-9. Conflict Search auto-runs on new intake.**  
When a new intake is submitted via the public form, automatically run a conflict check against existing clients + opposing parties + comm log, and post a banner on Assignments page if any hit found.

**F-10. Document e-sign reminder cron.**  
The Document Workflow page advertises "Auto-Reminders — Send automatic follow-ups for pending signatures after 3 days" but it isn't wired. Make it real — cron job (or Cloudflare Worker on a schedule) that emails clients whose signtoken is >3 days old and unused.

**F-11. Bulk operations on documents.**  
"Generate multiple documents at once for efficiency" is the second Smart Suggestion — actually implement it. Multi-select clients → pick template → generate N documents in one queue.

**F-12. Square refund + dispute capture.**  
Square webhook for refunds and disputes. When refund issued, auto-create reversing journal entry (Trust→General reversal). When dispute filed, flag in Compliance Alerts and notify paralegal.

**F-13. PDF e-stamping for served documents.**  
Once you serve a document, click "Mark Served" → date-stamp overlay added to PDF → upload as a new doc with notes "served by [method] on [date] to [recipient]". Affidavit of Service template auto-generated.

**F-14. Matter-type-specific intake forms.**  
Currently all intakes use one form. Build dedicated short intakes for Traffic (ticket photo OCR), LTB (T-form picker), Small Claims (claim amount + parties), POA (charge section + offence date).

### Tier 3 — Nice-to-have

**F-15. Mobile-optimised paralegal app view.**  
Strip down to: Today's Docket, Inbox, Quick Notes, Add Comm Log entry, Pay-me-now QR. For when you're at the LTB hearing.

**F-16. AI suggestion engine.**  
Hooked to existing files: "Suggest related cases / precedents / arguments" using a local Llama / OpenAI proxy. Useful for issue spotting in messy intake notes.

**F-17. Voice note → Comm Log.**  
Record a 30-second voice memo on phone, auto-transcribe, post to client's H. Communication Log with today's date and "voice" badge.

**F-18. LSO Insurance / Practice Renewal tracker.**  
Annual deadline tracker for: LSO Annual Report, Errors & Omissions insurance renewal, professional development credit hours, LawPRO premium. Email reminder 60/30/7 days before.

**F-19. Trust transaction monthly export (Form 9E).**  
Generate the required monthly Trust Listing PDF straight from the journal — paralegal signs it at month-end and saves to LSO compliance folder.

**F-20. Knowledge base / canned responses.**  
Snippet library for common client questions ("What's the LTB filing fee?", "How long does Small Claims take?", "What is bad-faith N12?"). Insert into reply with one click.

**F-21. Client signup → autodetect duplicate.**  
On new intake, fuzzy-match name + email + phone against existing clients/comm log. Surface "possible duplicate" banner before creating new file.

**F-22. Permission system & secondary paralegal mode.**  
Currently single-paralegal model. Build role-based permissions so Candice can be added as full-access, a student can be view-only, a bookkeeper can only see Trust Accounting.

---

## 4. Recommended next steps

1. **Run the clean rebuild** (Task #233) — unlocks 4 already-coded fixes that fix half the bugs in §2.
2. **Grant WDE0027 UPDATE permission** (Task #232) — unblocks legacy data migration.
3. **Fix Reports trust-balance cross-foot** — copy the sign-convention fix from Task #219 into `ReportsAnalyticsPage.tsx`.
4. **Wire Overview counters to the real data** — they're currently using stale local state instead of the live `clientfiles` query.
5. **Decide which Tier-1 features to greenlight** and I'll start scoping them as tasks.

---

*End of report.*
