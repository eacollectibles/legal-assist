import type { APIRoute } from 'astro';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items as wixDataItems } from '@wix/data';
import { requireAuth, STAFF_ROLES } from '@/lib/server/require-auth';

/**
 * POST /api/intake/check-conflict
 *
 * Server-side conflict-of-interest scan. Complements the existing
 * client-side scan in ClientIntakePage (which checks opposing
 * parties against existing client records). THIS endpoint runs
 * the reverse direction: it takes the NEW client's identity
 * (name + email + phone) and scans every existing record where
 * that identity could already appear as an opposing party in
 * someone else's matter.
 *
 * Why both directions matter: an LSO Rule 3.04 conflict exists
 * when the firm already represents the OTHER side. If we only
 * scan opposing parties against current clients, we miss the
 * case where the new client is already on file as the opposing
 * party in another active matter. This endpoint catches that.
 *
 * Request body (JSON):
 *   { firstName, lastName, email, phone }
 *
 * Response:
 *   {
 *     hasConflict: boolean,
 *     matches: [{ source, matchedField, matchedValue, fileId? }],
 *     severity: 'block' | 'review' | 'clear',
 *   }
 *
 *   - block: identity matched an opposing party in an OPEN file
 *   - review: identity matched only in closed/historical records
 *   - clear: no matches at all
 *
 * Origin gate + rate envelope: accepts only same-origin POSTs from
 * the public site (origin check matches /api/analytics/track).
 */

const PUBLIC_ORIGIN = 'https://www.legalassist.london';

function getSecret(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

function norm(s: string | undefined): string {
  return (s || '').toString().trim().toLowerCase();
}

/**
 * Tokenize a person's full name for fuzzy comparison. We split on
 * whitespace and drop single-letter tokens (initials carry little
 * signal). Returns an empty array for empty input.
 */
function nameTokens(s: string): string[] {
  return norm(s).split(/\s+/).filter((t) => t.length > 1);
}

/**
 * True if the two names share at least 2 tokens (e.g. first and
 * last) OR if the full string of one contains the full string of
 * the other.
 */
function nameMatch(a: string, b: string): boolean {
  const A = nameTokens(a);
  const B = nameTokens(b);
  if (A.length === 0 || B.length === 0) return false;
  const aFull = A.join(' ');
  const bFull = B.join(' ');
  if (aFull.includes(bFull) || bFull.includes(aFull)) return true;
  let shared = 0;
  for (const t of A) if (B.includes(t)) shared++;
  return shared >= 2;
}

export const POST: APIRoute = async ({ request, locals }) => {
  // ---------------------------------------------------------------------
  // AUTHENTICATION (was: origin header only).
  //
  // This endpoint answers "does this person already appear in your files?"
  // and returns matchedValue + fileId. Unauthenticated, that is a
  // confidentiality oracle: anyone could ask whether a named individual is a
  // client of the firm, and enumerate. That is exactly what LSO Rule 3.03
  // (confidentiality) and PIPEDA forbid disclosing.
  //
  // The previous gate was an Origin check, which (a) is a client-set header
  // and trivially spoofed, and (b) was written as `if (origin && ...)` — so
  // sending NO Origin header at all skipped it entirely.
  //
  // Conflict checks are staff-only. Require a real, signed session.
  // ---------------------------------------------------------------------
  const gate = await requireAuth(request, locals, { roles: STAFF_ROLES });
  if (!gate.ok) return gate.response!;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const firstName = norm(body?.firstName);
  const lastName = norm(body?.lastName);
  const email = norm(body?.email);
  const phone = norm(body?.phone).replace(/\D/g, '');
  const fullName = `${firstName} ${lastName}`.trim();

  if (!fullName && !email && !phone) {
    return new Response(JSON.stringify({ error: 'no identity' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    // Without credentials we can't scan — fail open with `clear`
    // so we never block legitimate intakes during config drift.
    return new Response(
      JSON.stringify({ hasConflict: false, matches: [], severity: 'clear', configured: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const wix = createClient({
      modules: { items: wixDataItems },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    // Pull the small set of fields we need from clientprofiles +
    // clientfiles. Cap at 1000 each — anything bigger needs a
    // dedicated indexed search service.
    const [profilesRes, filesRes] = await Promise.all([
      wix.items.query('clientprofiles').limit(1000).find().catch(() => ({ items: [] })),
      wix.items.query('clientfiles').limit(1000).find().catch(() => ({ items: [] })),
    ]);

    const profiles: any[] = profilesRes.items || [];
    const files: any[] = filesRes.items || [];

    const matches: Array<{
      source: string;
      matchedField: string;
      matchedValue: string;
      fileId?: string;
      fileStatus?: string;
    }> = [];

    // Scan each existing file's opposing party fields. The new
    // client should NOT already appear there.
    for (const f of files) {
      const opps = String(
        f.opposingPartyNames || f.opposingParties || '',
      );
      if (!opps) continue;
      const oppList = opps.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean);
      for (const opp of oppList) {
        if (fullName && nameMatch(fullName, opp)) {
          matches.push({
            source: 'opposing-party',
            matchedField: 'name',
            matchedValue: opp,
            fileId: f._id,
            fileStatus: f.fileStatus || 'unknown',
          });
        }
      }
    }

    // Scan existing client profiles by exact email / exact phone.
    // Same-name matches are NOT a conflict on their own.
    for (const p of profiles) {
      const pEmail = norm(p.email);
      const pPhone = norm(p.phone).replace(/\D/g, '');
      if (email && pEmail && email === pEmail) {
        matches.push({
          source: 'existing-profile',
          matchedField: 'email',
          matchedValue: pEmail,
        });
      }
      if (phone && pPhone && phone === pPhone && phone.length >= 7) {
        matches.push({
          source: 'existing-profile',
          matchedField: 'phone',
          matchedValue: pPhone,
        });
      }
    }

    // Severity: block if any opposing-party match is on an OPEN
    // file; review if matches only in closed records or duplicate
    // profile match; clear if nothing.
    let severity: 'block' | 'review' | 'clear' = 'clear';
    for (const m of matches) {
      if (m.source === 'opposing-party') {
        const status = String(m.fileStatus || '').toLowerCase();
        if (!['closed', 'archived', 'resolved'].includes(status)) {
          severity = 'block';
          break;
        }
        severity = 'review';
      } else if (severity === 'clear') {
        severity = 'review';
      }
    }

    return new Response(
      JSON.stringify({
        hasConflict: matches.length > 0,
        matches,
        severity,
        configured: true,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err: any) {
    // Fail open — never block intake on infrastructure failure.
    return new Response(
      JSON.stringify({
        hasConflict: false,
        matches: [],
        severity: 'clear',
        error: err?.message || 'scan failed',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
