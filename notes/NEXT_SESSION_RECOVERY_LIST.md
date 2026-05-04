# Next Session — Recovery List

**Created:** End of session, May 3, 2026.
**Context:** Prior session work was partially lost during a corruption-recovery `git checkout HEAD -- .` operation. The work was in the working tree but never committed, so the checkout wiped it. The current commit `ee9bfb3` reflects the diminished state.

## Definitely missing from `ee9bfb3` (verified by local file inspection)

### 1. `src/components/Head.tsx`

- **Add `P22020` to the `hasCredential` block.** It currently has the block structure but no LSO number.
- **Remove `"streetAddress": "P.O Box 1000"`, `"postalCode": "N6A 2L1"`** from the address structured data. Keep only `addressLocality`, `addressRegion`, `addressCountry`.
- **Verify the JSON-LD shows both LSO numbers** (Jean-Francois P22020 and Candice P21479) if they're meant to be there.

### 2. `src/components/pages/HomePageNew.tsx`

- **Add LSO numbers to the home banner.** Should read something like: `"Licensed Ontario Paralegals · LSO #P22020 & #P21479"` — currently the banner only has generic language.
- **Verify "Serving All of Ontario"** language (not "London, Ontario") — task #47/48 from prior session.

### 3. `src/components/Footer.tsx`

- **Add a credit line** with Jean-Francois Demers, P22020 (and possibly Candice P21479) to the footer.

### 4. `src/components/pages/MeetOurTeamPage.tsx`

- **Add Jean-Francois Demers' Licensed Paralegal status with LSO #P22020.** Currently only Candice's P21479 section exists.
- **Verify tel: hrefs** are `+12262725153` (E.164 format with `+1` prefix) — task #60.

### 5. `src/lib/pdf-form-filler.ts`

- **Verify `lsoLicenseNumber: 'P22020'`** is set as the default paralegal LSO number.

### 6. `src/components/pages/LondonParalegalPage.tsx`

- **Verify tel: hrefs** are `+12262725153`.
- **Verify "Ontario" branding** instead of "London, Ontario".

## Other prior session work to verify

These were marked as completed in the prior session but may also have been lost:

- `(555) 123-4567` placeholders replaced with real phone — verify nothing has `(555)`
- Mobile Resources dropdown scroll fix — `#mobile-menu` CSS rules in `src/styles/global.css`
- Scan Ticket disabled with "Coming Soon" badge in `TicketQuoteCalculator.tsx`
- "Proceed with Retainer" button auto-advance to Conflict of Interest step
- Email-failure cleanup + missing-field redirect in `ClientIntakePage.tsx`

## Square fix upgrade (also for next session)

The current dynamic-import-with-variable-name approach (`/* @vite-ignore */` + `vite.ssr.external`) does not survive Wix's bundler. Diagnose endpoint at https://www.legalassist.london/api/square/diagnose still shows the path-rewrite error after publishing `ee9bfb3`.

**Upgrade to:** `Function()` constructor approach in 3 files:
- `src/lib/square-service.ts`
- `src/pages/api/square/diagnose.ts`
- `src/pages/api/calcom-bookings.json.ts`

Pattern:
```typescript
const importer = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
const mod: any = await importer('wix-secrets-backend');
const getSecret = mod?.getSecret || mod?.default?.getSecret;
```

This is invisible to all static analyzers because the import string only exists at function-call time.

## File-corruption investigation

Three different bulk-edit approaches (xargs sed, atomic per-file sed, Edit tool) all triggered file corruption. Need to identify the corrupting process before another bulk operation is attempted.

Suspects to investigate:
1. Wix CLI watcher running in background (`Get-Process | Where-Object {$_.ProcessName -match "wix"}`)
2. OneDrive / iCloud sync on the project folder
3. Windows Defender / antivirus real-time scanning (add exclusion for project folder)
4. VS Code's `tsserver` or file watcher persisting after editor close
5. Wix Studio's local agent if present

Process to confirm a culprit:
- Kill suspected process
- Run a small bulk edit (5-10 files)
- Verify no corruption
- Re-enable suspect, retry, see if corruption returns

## Brand rename (deferred)

`LegalAssist` → `Legal Assist` across ~44 active files. Three attempts have been corrupted. Defer until file-corruption investigation is complete.

## Recovery checkpoints

- **`v1-good-state-pre-corruption-investigation`** — tag pointing to `ee9bfb3`. Always recoverable.
- **`f8314ba`** — original baseline (predates retainer UI + sidebar restore + blog posts).
- **`9b42044`** — Square fix + SMS exports.

If a future session gets corrupted and needs reset:
```powershell
git reset --hard v1-good-state-pre-corruption-investigation
```

---

**End of recovery list.**
