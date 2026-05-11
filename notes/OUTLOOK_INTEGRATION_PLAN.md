# Outlook Integration Plan — Legal Assist Paralegal Dashboard

**Status:** Planned, not started.
**Created:** End of session, May 3, 2026.

## Goal

Integrate the paralegal's Outlook (Microsoft 365) mailbox into the paralegal dashboard so emails can be read, sent, sorted, auto-filed to client files, and AI-summarized — all without leaving Legal Assist.

## Use cases

- Receive client correspondence and have it auto-filed to the right client matter
- Reply / compose new emails from inside the dashboard, with sent items auto-logged on the client file
- Auto-summarize incoming threads so the paralegal can scan a 2-3 sentence brief instead of rereading the full thread
- Auto-save attachments (PDFs, Word docs, images) to the client's File Management section
- Generate file activity log entries automatically when email is sent or received

## Technical approach: Microsoft Graph API

Microsoft Graph is the official API for accessing Outlook / Microsoft 365 mailboxes. OAuth 2.0 via Microsoft Entra (Azure AD) authorizes the app once; refresh tokens let us read/send mail going forward.

### High-level architecture

```
[Outlook mailbox] <--> [Microsoft Graph API] <--> [Legal Assist server endpoints]
                                                          |
                                                          v
                                                  [Wix CMS — clientfiles, fileactivity, attachments]
                                                          |
                                                          v
                                                  [Claude API for summarization]
```

## Build steps (estimated 2-3 dedicated sessions)

### Session 1 — OAuth + basic inbox read

1. **Register an Azure AD application**
   - Go to https://entra.microsoft.com → App registrations → New registration
   - Name: "Legal Assist Paralegal Dashboard"
   - Supported account types: "Accounts in any organizational directory and personal Microsoft accounts"
   - Redirect URI: `https://www.legalassist.london/api/microsoft/oauth-callback`
   - Note the **Application (Client) ID**
   - Under "Certificates & secrets" → New client secret. Note the **Client Secret value** (only shown once).
   - Under "API permissions" → Add permissions → Microsoft Graph → Delegated:
     - `Mail.Read`
     - `Mail.ReadWrite`
     - `Mail.Send`
     - `User.Read`
     - `offline_access` (so we get refresh tokens)
   - Grant admin consent.

2. **Add to Wix Secrets Manager:**
   - `MICROSOFT_CLIENT_ID`
   - `MICROSOFT_CLIENT_SECRET`
   - `MICROSOFT_REDIRECT_URI` = `https://www.legalassist.london/api/microsoft/oauth-callback`

3. **New files to create:**
   - `src/lib/microsoft-graph-service.ts` — Graph API wrapper (token refresh, fetch wrapper, message endpoints)
   - `src/pages/api/microsoft/oauth-start.ts` — kicks off OAuth (redirects user to Microsoft)
   - `src/pages/api/microsoft/oauth-callback.ts` — handles the callback, exchanges code for tokens, stores in Wix `microsoftTokens` collection keyed by paralegal id
   - `src/pages/api/microsoft/inbox.ts` — proxies a Graph `/me/mailFolders/inbox/messages` call to the dashboard
   - `src/components/pages/paralegal-dashboard/InboxTab.tsx` — UI for reading inbox

4. **Sidebar entry:** add "Inbox" to `ParalegalDashboardPageNew.tsx` `navItems`, in a new `inbox` section or under `clients`.

5. **Settings page:** "Connect Outlook" button that calls `/api/microsoft/oauth-start`. After successful connect, show "Connected as john@firm.com — Disconnect" status.

### Session 2 — Auto-filing + attachment handling

1. **Build the matching engine:** `src/lib/email-client-matcher.ts`
   - Strategy 1: sender email exact match against `clientprofiles.email` → auto-file
   - Strategy 2: subject line contains a file number pattern (regex `/file[\s\-#:]*([0-9]{4}-?[0-9]+)/i`) → match by file number
   - Strategy 3: body mentions a client name → flag for manual confirmation only
   - Strategy 4: domain match (sender domain matches client domain) → low-confidence, manual confirm
   - Returns `{ matched: boolean, clientId?, fileId?, confidence: 'high' | 'medium' | 'low' }`

2. **Webhook subscription** for real-time filing
   - `src/pages/api/microsoft/subscription.ts` — creates a Graph subscription on `/me/messages` with notification URL `https://www.legalassist.london/api/microsoft/webhook`
   - `src/pages/api/microsoft/webhook.ts` — receives notifications, calls matching engine, files emails

3. **Attachment handling**
   - When a filed email has attachments, download each via Graph `/me/messages/{id}/attachments/{aid}/$value`
   - Upload to Wix Media or store as base64 in a CMS collection
   - Link to the client file's File Management section

4. **File activity log entry** auto-created on each filing:
   - Type: `email_received` or `email_sent`
   - From / to / subject / dateReceived / fileId / clientId

### Session 3 — AI summarization, outbound send, compliance

1. **AI summarization via Claude API**
   - Add `ANTHROPIC_API_KEY` to Wix Secrets Manager
   - `src/lib/email-summarizer.ts` — sends email body + thread context to Claude haiku, returns a 2-3 sentence summary
   - Triggered automatically on filing
   - Stored on the file activity log entry

2. **Outbound send**
   - `src/pages/api/microsoft/send.ts` — wraps Graph `/me/sendMail`
   - Compose UI in the InboxTab that supports:
     - To/CC/BCC, subject, body (rich text)
     - Attaching files from the client file (reverse-flow)
     - Sender shown as the paralegal's actual Outlook email
   - Sent emails auto-logged on the client file

3. **LSO compliance**
   - Confirm email retention: Wix CMS records retained for 7 years per By-Law 7.1
   - Audit log: who accessed the email, when, from where
   - Privilege handling: emails marked privileged should be access-controlled

## Build vs. buy — honest comparison

### Custom build (this plan)
- **Cost:** developer time only (2-3 sessions). Plus Claude API tokens (~pennies per email summarized).
- **Pros:** integrates natively with the existing client file structure, full control over filing logic, no monthly fee.
- **Cons:** maintenance burden, you own all bugs, OAuth token refresh edge cases, webhook reliability.

### Off-the-shelf practice management software
- **Cost:** $70-130/month per user.
- Options that have built-in Outlook integration with auto-filing:
  - **Clio Manage** — most established, clio.com
  - **MyCase** — mycase.com
  - **PracticePanther** — practicepanther.com
  - **Smokeball** — smokeball.com (has the most aggressive auto-filing)
- **Pros:** Outlook integration is mature and battle-tested. Plus trust accounting, time tracking, calendar sync, client portal — most of what we've built tonight already exists in these tools.
- **Cons:** monthly cost. Migration effort if you decide to switch later. Less customization.

## Decision criteria

Build custom if:
- You want long-term cost minimization (no monthly fee)
- You enjoy/are willing to maintain the integration yourself
- The 2-3 session time investment fits your schedule

Buy if:
- You want this working in days, not weeks
- $70-130/month is acceptable for the time saved
- You'd rather focus billable hours on legal work, not engineering
- You want vendor support when something breaks

## Next steps when this is picked up

1. Decide build vs. buy.
2. If build: register the Azure AD app, share the Client ID + Client Secret with the dev session, and start with Session 1.
3. If buy: pick a vendor, sign up for trial, migrate client data, decommission relevant Legal Assist modules.

---

**End of plan.**
