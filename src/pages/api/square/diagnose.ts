import type { APIRoute } from 'astro';

/**
 * GET /api/square/diagnose
 *
 * Diagnostic-only endpoint for troubleshooting why Square credentials
 * aren't being read. Reports per-secret-name whether the value was
 * found, was empty, or whether the lookup threw — and reports the
 * status of the wix-secrets-backend module load itself.
 *
 * SECURITY: this endpoint NEVER returns the secret value itself.
 * For each name we report only the byte length and a hash-like
 * shortprint so you can confirm the value isn't truncated, padded
 * with whitespace, or wrapped in quotes — without revealing the
 * actual contents. The full Access Token never leaves the server.
 *
 * Remove this endpoint (or guard it) before going to production.
 */

const SECRET_NAMES = [
  'SQUARE_ENVIRONMENT',
  'SQUARE_APPLICATION_ID_SANDBOX',
  'SQUARE_LOCATION_ID_SANDBOX',
  'SQUARE_ACCESS_TOKEN_SANDBOX',
  'SQUARE_APPLICATION_ID',
  'SQUARE_LOCATION_ID',
  'SQUARE_ACCESS_TOKEN',
];

interface SecretStatus {
  name: string;
  source: 'wix-secrets-backend' | 'import.meta.env' | 'none';
  found: boolean;
  byteLength: number;
  hasLeadingSpace: boolean;
  hasTrailingSpace: boolean;
  startsWithQuote: boolean;
  endsWithQuote: boolean;
  startsWithExpectedPrefix?: boolean | undefined;
  expectedPrefixHint?: string | undefined;
  shortprint: string;          // e.g. "ab••••cd" — first 2 + ••• + last 2
  errorWhenReading?: string | undefined;
}

function maskValue(v: string): string {
  if (!v) return '(empty)';
  if (v.length <= 4) return '••';
  return `${v.slice(0, 2)}••••${v.slice(-2)} (len ${v.length})`;
}

function expectedPrefixFor(name: string): string | undefined {
  if (name === 'SQUARE_ENVIRONMENT') return undefined; // 'sandbox' or 'production'
  if (name.startsWith('SQUARE_APPLICATION_ID')) {
    return name.endsWith('_SANDBOX') ? 'sandbox-sq0idb-' : 'sq0idp-';
  }
  if (name.startsWith('SQUARE_LOCATION_ID')) return undefined; // 13 chars, no fixed prefix
  if (name.startsWith('SQUARE_ACCESS_TOKEN')) {
    return name.endsWith('_SANDBOX') ? 'EAAAl' : 'EAAA';
  }
  return undefined;
}

async function tryReadFromWix(name: string): Promise<{ value: string | null; error?: string }> {
  try {
    // Hide the specifier behind a runtime variable so the bundler does not
    // rewrite `wix-secrets-backend` into a relative path.
    const moduleName = 'wix-secrets-backend';
    const mod: any = await import(/* @vite-ignore */ moduleName);
    const getSecret = mod?.getSecret || mod?.default?.getSecret;
    if (typeof getSecret !== 'function') {
      return { value: null, error: 'wix-secrets-backend loaded but getSecret is not a function' };
    }
    const v = await getSecret(name);
    return { value: typeof v === 'string' ? v : null };
  } catch (err: any) {
    return { value: null, error: err?.message || String(err) };
  }
}

function tryReadFromEnv(name: string): string {
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env[name] as string | undefined) || '';
}

export const GET: APIRoute = async () => {
  // 1) Probe whether wix-secrets-backend is even loadable in this runtime.
  let moduleLoadError: string | null = null;
  try {
    const moduleName = 'wix-secrets-backend';
    await import(/* @vite-ignore */ moduleName);
  } catch (err: any) {
    moduleLoadError = err?.message || String(err);
  }

  // 2) For each known secret name, try Wix first, then env var fallback.
  // We track the raw value internally only long enough to derive the
  // status flags + shortprint; it never leaves this function scope.
  const results: SecretStatus[] = [];
  // Side-channel: the literal SQUARE_ENVIRONMENT value, used to compute
  // the "active chain" below. NEVER returned in the response.
  let rawEnvironmentValue = '';
  for (const name of SECRET_NAMES) {
    const wix = await tryReadFromWix(name);
    let source: SecretStatus['source'] = 'none';
    let value = '';
    let errorWhenReading: string | undefined;

    if (wix.value && wix.value.length > 0) {
      source = 'wix-secrets-backend';
      value = wix.value;
    } else {
      if (wix.error) errorWhenReading = wix.error;
      const envV = tryReadFromEnv(name);
      if (envV && envV.length > 0) {
        source = 'import.meta.env';
        value = envV;
      }
    }
    if (name === 'SQUARE_ENVIRONMENT') {
      rawEnvironmentValue = value.trim().toLowerCase();
    }

    const expectedPrefix = expectedPrefixFor(name);
    const trimmed = value.trim();

    results.push({
      name,
      source,
      found: value.length > 0,
      byteLength: value.length,
      hasLeadingSpace: value.length > 0 && value !== value.replace(/^\s+/, ''),
      hasTrailingSpace: value.length > 0 && value !== value.replace(/\s+$/, ''),
      startsWithQuote:
        trimmed.startsWith('"') ||
        trimmed.startsWith("'") ||
        trimmed.startsWith('`'),
      endsWithQuote:
        trimmed.endsWith('"') ||
        trimmed.endsWith("'") ||
        trimmed.endsWith('`'),
      startsWithExpectedPrefix: expectedPrefix
        ? trimmed.startsWith(expectedPrefix)
        : undefined,
      expectedPrefixHint: expectedPrefix,
      shortprint: maskValue(value),
      errorWhenReading,
    });
  }

  // 3) Resolve the active environment + which secrets the live config
  //    loader will actually consult, so the user can see the chain.
  //    NOTE: we use the raw SQUARE_ENVIRONMENT value captured above,
  //    NOT the masked shortprint (which would always say "not prod").
  const isProd = rawEnvironmentValue === 'production';
  const activeEnvironment: 'sandbox' | 'production' = isProd ? 'production' : 'sandbox';
  const activeAppIdSecret = isProd ? 'SQUARE_APPLICATION_ID' : 'SQUARE_APPLICATION_ID_SANDBOX';
  const activeLocationSecret = isProd ? 'SQUARE_LOCATION_ID' : 'SQUARE_LOCATION_ID_SANDBOX';
  const activeTokenSecret = isProd ? 'SQUARE_ACCESS_TOKEN' : 'SQUARE_ACCESS_TOKEN_SANDBOX';

  return new Response(
    JSON.stringify(
      {
        success: true,
        moduleLoadError,
        runtime: {
          hasCryptoRandomUUID: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function',
          hasFetch: typeof fetch === 'function',
        },
        chain: {
          activeEnvironment,
          activeEnvironmentSecret: 'SQUARE_ENVIRONMENT',
          activeAppIdSecret,
          activeLocationSecret,
          activeTokenSecret,
        },
        secrets: results,
      },
      null,
      2
    ),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
