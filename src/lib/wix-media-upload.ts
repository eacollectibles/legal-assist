/**
 * Wix Media upload helper.
 *
 * Routes all uploads through the server endpoint at /api/media/upload
 * because the browser-side @wix/media SDK calls always return HTTP 429
 * (Wix's polite "no permission" — the visitor session lacks
 * SITE_MEDIA.MANAGE scope). The server endpoint authenticates with a
 * Wix API Key (LA_WIX_API_KEY) that does have the scope.
 *
 * Wix Data fields cap at 177KB per field, which means a base64-encoded
 * PDF will not fit in a single CMS row. The right place for files is
 * Wix Media (CDN-backed, multi-MB ceiling). Callers should prefer
 * this path; the inline-base64 path is a fallback for tiny files
 * only.
 */

export interface WixMediaUploadResult {
  url: string;
  mediaId?: string;
}

/** Convert a base64 data URL into a Blob. */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = /data:([^;]+)/.exec(header || '');
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const bin = atob(base64 || '');
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/** Read a Blob/File as a base64 data URL. */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Upload to Wix Media via the server endpoint. Accepts a File, a Blob,
 * or a base64 data URL. Returns { url, mediaId } on success or null
 * on failure — caller falls back to inline-base64 storage for tiny
 * files. Errors are logged to the console with the server's `tried`
 * debug array so failures are diagnosable.
 */
export async function uploadToWixMedia(
  input: File | Blob | string,
  fileName: string,
  mimeType?: string
): Promise<WixMediaUploadResult | null> {
  try {
    // Normalise to a base64 data URL for the JSON request body.
    let dataUrl: string;
    if (typeof input === 'string') {
      dataUrl = input;
    } else {
      dataUrl = await blobToDataUrl(input);
    }

    const headerMime = /data:([^;]+)/.exec(dataUrl)?.[1];
    const effectiveMime =
      mimeType || headerMime || 'application/octet-stream';

    const resp = await fetch('/api/media/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, fileName, mimeType: effectiveMime }),
    });

    let data: any = null;
    try {
      data = await resp.json();
    } catch {
      // Non-JSON response — already a failure.
    }

    if (!resp.ok || !data?.success || !data?.url) {
      // eslint-disable-next-line no-console
      console.error(
        'Wix Media upload failed (HTTP ' + resp.status + '):',
        data?.error || resp.statusText,
        data?.tried || []
      );
      return null;
    }

    return { url: data.url, mediaId: data.mediaId };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('uploadToWixMedia exception:', err);
    return null;
  }
}

/**
 * Soft size guard for inline storage. Anything over this (200KB) MUST
 * be uploaded to Wix Media because a Wix Data text field cannot hold
 * it. Below this we still prefer Media but inline storage works as
 * a fallback.
 */
export const INLINE_FIELD_LIMIT_BYTES = 200_000;

/** Approximate byte length of a UTF-16 string when encoded as UTF-8. */
export function approxByteLength(s: string): number {
  if (typeof TextEncoder !== 'undefined') {
    try {
      return new TextEncoder().encode(s).length;
    } catch {
      /* fall through */
    }
  }
  return s.length * 2;
}

// ============================================================
// Compressed inline storage for HTML bodies.
// ------------------------------------------------------------
// The 200KB retainer HTML doesn't fit in a Wix Data text field
// (~177KB cap) and Wix Media rejects text/html uploads.
// Solution: gzip the HTML in the browser (CompressionStream) → base64.
// HTML compresses ~8-10× (lots of repeated tags + whitespace), so a
// 200KB retainer becomes ~25KB compressed, ~35KB base64, which fits
// inline comfortably. The reader (PublicSignPage) detects the magic
// prefix and inflates back to the original HTML.
// ============================================================

const COMPRESSED_PREFIX = 'gz1:';

/**
 * Compress a UTF-8 string with gzip and return `gz1:<base64>` so
 * the reader can detect-and-decompress.
 *
 * Falls back to returning the input untouched if CompressionStream
 * isn't available (very old browsers). Caller can size-guard the
 * result against the inline field limit.
 */
export async function compressHtmlForInline(html: string): Promise<string> {
  if (
    typeof (globalThis as any).CompressionStream === 'undefined' ||
    typeof Response === 'undefined'
  ) {
    return html;
  }
  try {
    const stream = new Blob([html]).stream().pipeThrough(
      new (globalThis as any).CompressionStream('gzip')
    );
    const compressedBuf = await new Response(stream).arrayBuffer();
    const bytes = new Uint8Array(compressedBuf);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    const base64 = btoa(binary);
    return COMPRESSED_PREFIX + base64;
  } catch {
    return html;
  }
}

/**
 * Inverse of compressHtmlForInline. If the value starts with `gz1:`
 * it's a gzip+base64 blob; inflate and return. Otherwise return as-is
 * so legacy uncompressed rows keep working.
 */
export async function decompressHtmlFromInline(stored: string): Promise<string> {
  if (!stored || !stored.startsWith(COMPRESSED_PREFIX)) return stored;
  if (
    typeof (globalThis as any).DecompressionStream === 'undefined' ||
    typeof Response === 'undefined'
  ) {
    throw new Error(
      'Browser lacks DecompressionStream — cannot inflate compressed HTML. ' +
        'Use a modern browser (Chrome 80+, Firefox 113+, Safari 16.4+).'
    );
  }
  const base64 = stored.slice(COMPRESSED_PREFIX.length);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const inflated = new Blob([bytes]).stream().pipeThrough(
    new (globalThis as any).DecompressionStream('gzip')
  );
  return await new Response(inflated).text();
}

/** Detect whether a stored string is a compressed-HTML blob. */
export function isCompressedHtml(s: string | null | undefined): boolean {
  return !!s && typeof s === 'string' && s.startsWith(COMPRESSED_PREFIX);
}
