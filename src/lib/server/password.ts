/**
 * Password hashing — server-side, Web Crypto only (Cloudflare Workers safe).
 * =========================================================================
 *
 * WHY THIS EXISTS
 * ---------------
 * The original scheme (see `hashPassword()` in src/lib/auth-service.ts) is
 * SHA-256(password + STATIC_SALT), computed IN THE BROWSER. That is weak in
 * two independent ways:
 *
 *   1. A single unsalted-per-user, single-iteration SHA-256 is fast to
 *      brute-force offline (billions of guesses/sec on a GPU).
 *   2. Because login compared hashes client-side, the browser had to download
 *      every `useraccounts` row — including every user's passwordHash.
 *
 * This module replaces it with PBKDF2-HMAC-SHA256, 210,000 iterations, a
 * random 16-byte per-user salt (OWASP 2023 guidance for PBKDF2-SHA256), and
 * it is only ever called on the server, so hashes never reach a browser.
 *
 * MIGRATION (transparent, no forced reset)
 * ----------------------------------------
 * `verifyPassword()` accepts BOTH formats:
 *   - new:    "pbkdf2$<iterations>$<saltB64>$<hashB64>"
 *   - legacy: 64-char lowercase hex (the old SHA-256 digest)
 * When a legacy hash verifies, we return needsUpgrade=true and the login
 * endpoint silently rewrites the row with a PBKDF2 hash. Users keep their
 * existing password and never notice. Once no legacy rows remain, the legacy
 * branch can be deleted.
 */

/** The static salt baked into the legacy client-side hash. Needed ONLY so we
 *  can still verify (and then upgrade) passwords set under the old scheme. */
const LEGACY_STATIC_SALT = 'legalassist_2026_secure_salt';

const PBKDF2_ITERATIONS = 210_000;
const PBKDF2_DIGEST = 'SHA-256';
const PBKDF2_KEY_BITS = 256;
const SALT_BYTES = 16;

// ---------------------------------------------------------------- base64
function toB64(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function fromB64(b64: string): Uint8Array {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

// ------------------------------------------------------- constant-time eq
/** Compare without leaking length/content via early exit. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const enc = new TextEncoder();
  return timingSafeEqual(enc.encode(a), enc.encode(b));
}

// ----------------------------------------------------------------- PBKDF2
async function deriveBits(
  password: string,
  salt: Uint8Array,
  iterations: number
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    // `salt as unknown as BufferSource`: TS models Uint8Array as
    // Uint8Array<ArrayBufferLike>, which it will not accept as BufferSource
    // (SharedArrayBuffer). Same friction already present in pdf-form-filler.ts.
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations,
      hash: PBKDF2_DIGEST,
    },
    key,
    PBKDF2_KEY_BITS
  );
  return new Uint8Array(bits);
}

/** Hash a password with PBKDF2 + a fresh random per-user salt. */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await deriveBits(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(salt)}$${toB64(hash)}`;
}

/** The legacy browser-side scheme, reproduced so we can verify old rows. */
async function legacyHash(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + LEGACY_STATIC_SALT);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export interface VerifyResult {
  /** Did the password match? */
  ok: boolean;
  /** True when it matched a LEGACY hash — caller should rewrite it as PBKDF2. */
  needsUpgrade: boolean;
}

/**
 * Verify a plaintext password against either hash format.
 * Never throws on malformed input — returns { ok:false }.
 */
export async function verifyPassword(
  password: string,
  stored: string | undefined | null
): Promise<VerifyResult> {
  if (!password || !stored) return { ok: false, needsUpgrade: false };

  // --- new format ---
  if (stored.startsWith('pbkdf2$')) {
    const parts = stored.split('$');
    if (parts.length !== 4) return { ok: false, needsUpgrade: false };
    const iterations = parseInt(parts[1], 10);
    if (!Number.isFinite(iterations) || iterations < 1000) {
      return { ok: false, needsUpgrade: false };
    }
    try {
      const salt = fromB64(parts[2]);
      const expected = fromB64(parts[3]);
      const actual = await deriveBits(password, salt, iterations);
      return { ok: timingSafeEqual(actual, expected), needsUpgrade: false };
    } catch {
      return { ok: false, needsUpgrade: false };
    }
  }

  // --- legacy format (unsalted-per-user SHA-256 hex) ---
  const candidate = await legacyHash(password);
  const ok = timingSafeEqualStr(candidate, stored.trim().toLowerCase());
  // A successful legacy match is exactly when we want to re-hash.
  return { ok, needsUpgrade: ok };
}

/** True when a stored hash is still on the old scheme. */
export function isLegacyHash(stored: string | undefined | null): boolean {
  return !!stored && !stored.startsWith('pbkdf2$');
}
