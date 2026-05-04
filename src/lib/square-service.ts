/**
 * Square Payments service.
 *
 * Wraps Square's Payments API for use from Astro server endpoints. The
 * Web Payments SDK on the client tokenizes the card and produces a
 * `sourceId` (a one-time card nonce); this service takes that nonce and
 * actually charges the card via Square's REST API.
 *
 * Credentials are read from Wix Secrets Manager in production and fall
 * back to `import.meta.env` for local development. The active environment
 * (`sandbox` vs `production`) is controlled by the `SQUARE_ENVIRONMENT`
 * secret/env var.
 *
 * Public IDs (Application ID, Location ID) are exposed to the browser via
 * `/api/square/config`. The Access Token is NEVER sent to the browser.
 */

// ============================================================
// TYPES
// ============================================================

export type SquareEnvironment = 'sandbox' | 'production';

export interface SquareConfig {
  environment: SquareEnvironment;
  applicationId: string;
  locationId: string;
  /** API base URL for the active environment. */
  apiBaseUrl: string;
  /** Web Payments SDK CDN URL for the active environment. */
  sdkUrl: string;
}

/**
 * Public-only subset of {@link SquareConfig} that is safe to send to the
 * browser. Notably does not include the access token.
 */
export type PublicSquareConfig = Pick<
  SquareConfig,
  'environment' | 'applicationId' | 'locationId' | 'sdkUrl'
>;

export interface CreatePaymentInput {
  /** One-time card nonce from the Web Payments SDK (`result.token`). */
  sourceId: string;
  /** Amount in the smallest currency unit (cents for CAD/USD). */
  amountCents: number;
  /** ISO 4217 currency code. Defaults to 'CAD'. */
  currency?: string;
  /** Idempotency key — defaults to a uuid v4 if not supplied. */
  idempotencyKey?: string;
  /**
   * Recordkeeping classification — one of:
   *  - 'trust_deposit'    Funds going into trust (LSO By-Law 9)
   *  - 'invoice_payment'  Payment of an invoice already issued
   *  - 'consultation'     Up-front consultation / fixed-fee payment
   */
  paymentType: 'trust_deposit' | 'invoice_payment' | 'consultation';
  matterId?: string;
  matterReference?: string;
  clientId?: string;
  clientName?: string;
  buyerEmail?: string;
  /** Optional free-text note that appears on the Square receipt. */
  note?: string;
}

export interface CreatePaymentResult {
  ok: boolean;
  /** Square payment id (always returned by Square, even for failures). */
  paymentId?: string;
  status?: string;
  receiptUrl?: string;
  receiptNumber?: string;
  /** Total amount actually charged, in cents. */
  amountCents?: number;
  currency?: string;
  /** Human-readable error message if `ok` is false. */
  errorMessage?: string;
  /** Square error code if available. */
  errorCode?: string;
}

// ============================================================
// CONFIG LOADER
// ============================================================

/**
 * Reads a value from Wix Secrets Manager first, then falls back to
 * `import.meta.env` for local-dev parity with the Cal.com integration.
 */
async function readSecret(name: string): Promise<string> {
  try {
    // Build the dynamic import via a Function constructor so the import
    // string only exists at runtime. This is invisible to ALL bundlers
    // (Vite, Rollup, Wix's pipeline) — they cannot statically analyze
    // it, so they cannot rewrite "wix-secrets-backend" into a relative
    // path like "pages/api/square/wix-secrets-backend".
    const importer = new Function('m', 'return import(m)') as (m: string) => Promise<any>;
    const mod: any = await importer('wix-secrets-backend');
    const getSecret = mod?.getSecret || mod?.default?.getSecret;
    if (typeof getSecret === 'function') {
      const secret = await getSecret(name);
      if (secret) return secret;
    }
  } catch {
    // wix-secrets-backend isn't bound in local dev — fall through.
  }
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env[name] as string | undefined) || '';
}

/**
 * Resolves the active Square config (env, application id, location id,
 * API base URL, CDN URL). Used by both the public `/api/square/config`
 * endpoint and the server-side `createPayment` helper below.
 *
 * Lookup order for each value:
 *   1. Environment-specific secret (e.g. `SQUARE_APPLICATION_ID_SANDBOX`)
 *   2. Generic secret (e.g. `SQUARE_APPLICATION_ID`)
 */
export async function loadSquareConfig(): Promise<SquareConfig> {
  const envRaw = (await readSecret('SQUARE_ENVIRONMENT')).toLowerCase();
  const environment: SquareEnvironment = envRaw === 'production' ? 'production' : 'sandbox';
  const suffix = environment === 'production' ? '' : '_SANDBOX';

  const applicationId =
    (await readSecret(`SQUARE_APPLICATION_ID${suffix}`)) ||
    (await readSecret('SQUARE_APPLICATION_ID'));
  const locationId =
    (await readSecret(`SQUARE_LOCATION_ID${suffix}`)) ||
    (await readSecret('SQUARE_LOCATION_ID'));

  const apiBaseUrl =
    environment === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';
  const sdkUrl =
    environment === 'production'
      ? 'https://web.squarecdn.com/v1/square.js'
      : 'https://sandbox.web.squarecdn.com/v1/square.js';

  return { environment, applicationId, locationId, apiBaseUrl, sdkUrl };
}

/**
 * Public-only view of the config — the only thing safe to send to the
 * browser. Excludes the access token (which is never returned by this
 * module — the access token is read on demand inside {@link createPayment}
 * and never leaves the server).
 */
export async function loadPublicSquareConfig(): Promise<PublicSquareConfig> {
  const cfg = await loadSquareConfig();
  return {
    environment: cfg.environment,
    applicationId: cfg.applicationId,
    locationId: cfg.locationId,
    sdkUrl: cfg.sdkUrl,
  };
}

// ============================================================
// PAYMENTS API CLIENT
// ============================================================

/**
 * Read the active access token. Resolution order:
 *   1. `SQUARE_ACCESS_TOKEN_SANDBOX` (when env is sandbox)
 *   2. `SQUARE_ACCESS_TOKEN` (production, or as a generic fallback)
 */
async function readAccessToken(env: SquareEnvironment): Promise<string> {
  if (env === 'sandbox') {
    const sandbox = await readSecret('SQUARE_ACCESS_TOKEN_SANDBOX');
    if (sandbox) return sandbox;
  }
  return await readSecret('SQUARE_ACCESS_TOKEN');
}

/**
 * Build a stable idempotency key. Square requires this to be unique per
 * payment intent; if the same key is reused, Square returns the original
 * payment instead of charging twice.
 */
function genIdempotencyKey(): string {
  // Workers / modern runtimes have crypto.randomUUID().
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback — good enough for idempotency, not security.
  return `idem-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Charges a card using Square's Payments API.
 *
 * The `sourceId` must come from the Web Payments SDK's `card.tokenize()`
 * call on the client. Raw card data must never reach this server.
 */
export async function createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
  if (!input.sourceId) {
    return { ok: false, errorMessage: 'Missing sourceId (card token).' };
  }
  if (!Number.isFinite(input.amountCents) || input.amountCents <= 0) {
    return { ok: false, errorMessage: 'Amount must be a positive number of cents.' };
  }

  const cfg = await loadSquareConfig();
  if (!cfg.applicationId || !cfg.locationId) {
    return {
      ok: false,
      errorMessage:
        'Square is not configured. Add SQUARE_APPLICATION_ID and SQUARE_LOCATION_ID to Wix Secrets Manager.',
    };
  }

  const accessToken = await readAccessToken(cfg.environment);
  if (!accessToken) {
    return {
      ok: false,
      errorMessage:
        'Square access token not configured. Add SQUARE_ACCESS_TOKEN (or SQUARE_ACCESS_TOKEN_SANDBOX) to Wix Secrets Manager.',
    };
  }

  // Build a one-line note Square will store on the payment + receipt.
  const noteParts = [input.note];
  if (input.paymentType === 'trust_deposit') noteParts.unshift('Trust Deposit');
  else if (input.paymentType === 'invoice_payment') noteParts.unshift('Invoice Payment');
  else if (input.paymentType === 'consultation') noteParts.unshift('Consultation');
  if (input.matterReference) noteParts.push(`File: ${input.matterReference}`);
  const note = noteParts.filter(Boolean).join(' — ').slice(0, 500);

  const body = {
    source_id: input.sourceId,
    idempotency_key: input.idempotencyKey || genIdempotencyKey(),
    amount_money: {
      amount: Math.round(input.amountCents),
      currency: (input.currency || 'CAD').toUpperCase(),
    },
    location_id: cfg.locationId,
    note,
    buyer_email_address: input.buyerEmail || undefined,
    reference_id: input.matterId || input.clientId || undefined,
  };

  let resp: Response;
  try {
    resp = await fetch(`${cfg.apiBaseUrl}/v2/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-09-19',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (err: any) {
    return {
      ok: false,
      errorMessage: `Network error contacting Square: ${err?.message || String(err)}`,
    };
  }

  let data: any;
  try {
    data = await resp.json();
  } catch {
    data = {};
  }

  if (!resp.ok) {
    const firstError = Array.isArray(data?.errors) && data.errors[0];
    return {
      ok: false,
      errorMessage:
        firstError?.detail ||
        firstError?.code ||
        `Square API error (HTTP ${resp.status}).`,
      errorCode: firstError?.code,
    };
  }

  const payment = data?.payment;
  if (!payment) {
    return { ok: false, errorMessage: 'Unexpected response from Square (no payment in body).' };
  }

  return {
    ok: true,
    paymentId: payment.id,
    status: payment.status,
    receiptUrl: payment.receipt_url,
    receiptNumber: payment.receipt_number,
    amountCents: payment.amount_money?.amount,
    currency: payment.amount_money?.currency,
  };
}
