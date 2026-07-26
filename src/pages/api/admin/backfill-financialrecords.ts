import type { APIRoute } from 'astro';
// Static imports — Cloudflare Workers blocks `Function('return import')()`,
// so the dynamic-import trick from older endpoints will not work here.
// These get bundled at build time and the Wix Astro adapter ships them
// to the worker as part of the deployed bundle.
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';
import { requireAuth } from '@/lib/server/require-auth';

/**
 * POST /api/admin/backfill-financialrecords
 *
 * Server-side backfill for legacy `financialrecords` rows that are
 * missing `journalType` or `fileId`. The client-side button on
 * TrustAccountingPage USED to do this loop directly in the browser
 * via BaseCrudService.update(), but the paralegal account's CMS role
 * does not have UPDATE permission on `financialrecords` — every
 * client-side patch comes back as:
 *
 *   WDE0027: The current user does not have permissions to update on
 *            the financialrecords collection.
 *
 * Rather than ask the user to grant UPDATE permission on the
 * collection (which would also allow accidental writes from anywhere
 * in the app), we route the backfill through this server endpoint and
 * use the Wix SDK's ApiKeyStrategy. The API key runs with site-level
 * permissions and bypasses the per-role UPDATE restriction.
 *
 * Configuration (Wix Secrets Manager — same pair already used by
 * /api/media/upload):
 *   - LA_WIX_API_KEY: Wix API Key with "Manage Data Collections" scope
 *   - LA_WIX_SITE_ID: this site's ID (UUID)
 *
 * Body: empty (no parameters — the backfill is deterministic and
 *       idempotent: every row missing a field gets the same patch
 *       on every run, and rows that already have the fields are
 *       skipped).
 *
 * Returns: {
 *   success: true,
 *   journalTypePatched: number,
 *   fileIdPatched: number,
 *   skipped: number,
 *   failed: number,
 *   failures: string[]   // first 10 errors, each "<id>: <message>"
 * }
 *
 * Sign convention for journalType inference: every legacy row whose
 * `transactionType` is one of the known trust-account types defaults
 * to `journalType = 'trust'`. The paralegal can manually re-tag any
 * rows that should be 'general' afterward from the Journal UI.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

const TRUST_TRANSACTION_TYPES = new Set([
  'trust_deposit',
  'trust_withdrawal',
  'transfer',
  'billing',
  'payment',
  'disbursement',
  'refund',
  'reconciliation',
]);

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getSecretValue(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

export const POST: APIRoute = async ({ request, locals }) => {
  // 1. AUTHENTICATION (was: origin header only).
  //
  //    This endpoint runs with a site-level Wix API key that deliberately
  //    BYPASSES per-role CMS permissions (that is why it exists), and it
  //    writes across `financialrecords` — the trust ledger. An Origin header
  //    is set by the caller and is trivially spoofed, so it never actually
  //    restricted anyone. Admin-only, and now provably so.
  //
  //    requireAuth() also performs the same-origin check as CSRF defence.
  const gate = await requireAuth(request, locals, { roles: ['admin'] });
  if (!gate.ok) return gate.response!;

  // 2. Pick up the API-key + site-id pair from Wix Secrets Manager.
  const apiKey = getSecretValue(locals, 'LA_WIX_API_KEY');
  const siteId = getSecretValue(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    return json(
      {
        success: false,
        error:
          'Wix data credentials not configured. Add LA_WIX_API_KEY and LA_WIX_SITE_ID to Wix Secrets Manager.',
      },
      500
    );
  }

  // 3. Build a site-context Wix Data client.
  if (!createClient || !ApiKeyStrategy || !wixDataItems) {
    return json(
      {
        success: false,
        error:
          'Wix SDK modules unavailable (createClient/ApiKeyStrategy/items).',
      },
      500
    );
  }

  const wixClient = createClient({
    modules: { items: wixDataItems },
    auth: ApiKeyStrategy({ apiKey, siteId }),
  });

  try {
    // 4. Load every financialrecord and every clientfile. The data
    //    SDK paginates at 100 rows by default, so we paginate
    //    explicitly to make sure we cover the whole collection.
    const fetchAll = async (collectionId: string) => {
      const all: any[] = [];
      let offset = 0;
      const limit = 100;
      for (;;) {
        const resp: any = await wixClient.items
          .query(collectionId)
          .skip(offset)
          .limit(limit)
          .find();
        const items: any[] = resp?.items || [];
        all.push(...items);
        if (items.length < limit) break;
        offset += limit;
        // Safety: never iterate past 10,000 rows in one call.
        if (offset > 10_000) break;
      }
      return all;
    };

    const [records, files] = await Promise.all([
      fetchAll('financialrecords'),
      fetchAll('clientfiles'),
    ]);

    // 5. Build a clientId -> most-recent-active-file lookup so the
    //    inner loop is O(1) per record. Mirrors the client-side logic
    //    that the original handleBackfillLegacy() used.
    const filesByClient = new Map<string, any>();
    for (const file of files) {
      const cid = file?.clientId;
      if (!cid) continue;
      const existing = filesByClient.get(cid);
      const fileDate = new Date(file._createdDate || 0).getTime();
      const existingDate = existing
        ? new Date(existing._createdDate || 0).getTime()
        : -1;
      const fileActive = file.status === 'active';
      const existingActive = existing ? existing.status === 'active' : false;
      if (
        !existing ||
        (fileActive && !existingActive) ||
        (fileActive === existingActive && fileDate > existingDate)
      ) {
        filesByClient.set(cid, file);
      }
    }

    // 6. Patch loop. Skip rows that already have both fields.
    let journalTypePatched = 0;
    let fileIdPatched = 0;
    let skipped = 0;
    let failed = 0;
    const failures: string[] = [];

    for (const record of records) {
      const txnType: string | undefined = record.transactionType;
      const journalType: string | undefined = record.journalType;
      const fileId: string | undefined = record.fileId;
      const clientId: string | undefined = record.clientId;

      const patch: Record<string, unknown> = {};
      if (!journalType && txnType && TRUST_TRANSACTION_TYPES.has(txnType)) {
        patch.journalType = 'trust';
      }
      if (!fileId && clientId) {
        const fallbackFile = filesByClient.get(clientId);
        if (fallbackFile?._id) {
          patch.fileId = fallbackFile._id;
        }
      }
      if (Object.keys(patch).length === 0) {
        skipped++;
        continue;
      }

      try {
        // The data SDK's update() takes the full row plus the patch
        // merged in — passing only the diff would clobber the rest of
        // the fields with `undefined`. We spread the existing row and
        // overlay the patch.
        await wixClient.items.update('financialrecords', {
          ...record,
          ...patch,
        });
        if (patch.fileId) fileIdPatched++;
        if (patch.journalType) journalTypePatched++;
      } catch (err: any) {
        failed++;
        if (failures.length < 10) {
          failures.push(`${record._id}: ${err?.message || String(err)}`);
        }
      }
    }

    return json({
      success: true,
      journalTypePatched,
      fileIdPatched,
      skipped,
      failed,
      failures,
      totalRecords: records.length,
      totalFiles: files.length,
    });
  } catch (err: any) {
    return json(
      {
        success: false,
        error: 'Backfill failed at top level: ' + (err?.message || String(err)),
      },
      500
    );
  }
};
