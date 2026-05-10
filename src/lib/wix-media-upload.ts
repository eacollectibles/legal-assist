/**
 * Wix Media upload helper.
 *
 * Wix Data fields cap at 177KB per field, which means a base64-encoded
 * PDF will not fit in a single CMS row. The right place for files is
 * Wix Media (CDN-backed, multi-MB ceiling). This helper accepts either
 * a Blob, a File, or a base64 data URL, attempts to upload via the
 * Wix Media SDK, and returns the resulting permanent URL.
 *
 * Returns null if the SDK is unavailable so callers can fall back to
 * the inline-base64 path for small files. Mirrors the inlined helpers
 * in DocumentsTab.tsx and SectionDocuments.tsx so behaviour stays
 * consistent across paralegal-side and client-side flows.
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

/**
 * Upload to Wix Media. Accepts a File, a Blob, or a base64 data URL.
 * Returns { url, mediaId } on success or null if the SDK isn't
 * available.
 */
export async function uploadToWixMedia(
  input: File | Blob | string,
  fileName: string,
  mimeType?: string
): Promise<WixMediaUploadResult | null> {
  try {
    const wixMedia: any = await import('@wix/media').catch(() => null);
    if (!wixMedia) return null;

    let file: File | Blob;
    if (typeof input === 'string') {
      // assume base64 data URL
      const blob = dataUrlToBlob(input);
      file = new File([blob], fileName, {
        type: mimeType || blob.type || 'application/octet-stream',
      });
    } else if (input instanceof File) {
      file = input;
    } else {
      file = new File([input], fileName, {
        type: mimeType || (input as Blob).type || 'application/octet-stream',
      });
    }

    const filesApi = wixMedia.files || wixMedia.default?.files || wixMedia;

    if (filesApi.uploadFile) {
      const result = await filesApi.uploadFile({
        mimeType:
          mimeType ||
          (file as File).type ||
          'application/octet-stream',
        fileName,
        file,
      });
      const url = result?.file?.url || result?.fileUrl || result?.url;
      const mediaId = result?.file?.id || result?._id || result?.id;
      if (url) return { url, mediaId };
    }

    if (filesApi.generateFileUploadUrl) {
      const presigned = await filesApi.generateFileUploadUrl({
        mimeType:
          mimeType ||
          (file as File).type ||
          'application/octet-stream',
        fileName,
      });
      const uploadUrl = presigned?.uploadUrl || presigned?.url;
      if (!uploadUrl) return null;
      const fd = new FormData();
      fd.append('file', file as Blob, fileName);
      const resp = await fetch(uploadUrl, { method: 'POST', body: fd });
      if (!resp.ok) return null;
      const data = await resp.json().catch(() => ({}));
      const url = data?.file?.url || data?.fileUrl || data?.url;
      const mediaId = data?.file?.id || data?._id || data?.id;
      if (url) return { url, mediaId };
    }
    return null;
  } catch {
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
  // Cheap upper-bound estimate: assume each char is 1-3 bytes in UTF-8.
  // Good enough for the "is this going to bust the 177KB CMS limit"
  // decision. Reaches for TextEncoder when available for accuracy.
  if (typeof TextEncoder !== 'undefined') {
    try {
      return new TextEncoder().encode(s).length;
    } catch {
      /* fall through */
    }
  }
  return s.length * 2;
}
