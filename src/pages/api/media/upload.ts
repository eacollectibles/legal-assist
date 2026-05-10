import type { APIRoute } from 'astro';

/**
 * POST /api/media/upload
 *
 * Server-side Wix Media upload. Accepts a base64-encoded payload and
 * uploads it to Wix Media using the server context (which has the
 * elevated permissions and SDK methods needed to actually complete
 * the upload).
 *
 * Body: { dataUrl: string, fileName: string, mimeType?: string }
 *
 * Browser-side @wix/media uploads are unreliable because the SDK's
 * uploadFile / generateFileUploadUrl methods need server-side
 * context to authenticate with Wix's media backend. So we route
 * everything through here.
 *
 * Returns { success, url, mediaId } on success or
 * { success: false, error } on failure.
 */

const ALLOWED_ORIGINS = new Set<string>([
  'https://www.legalassist.london',
  'https://legalassist.london',
  'http://localhost:4321',
  'http://localhost:3000',
]);

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB hard cap

function dataUrlToBlob(dataUrl: string): { blob: Blob; mime: string } {
  const [header, base64] = dataUrl.split(',');
  const mimeMatch = /data:([^;]+)/.exec(header || '');
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const bin = atob(base64 || '');
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return { blob: new Blob([bytes], { type: mime }), mime };
}

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const fromAllowed =
    (origin && ALLOWED_ORIGINS.has(origin)) ||
    (!origin && [...ALLOWED_ORIGINS].some((o) => referer.startsWith(o)));
  if (!fromAllowed) {
    return json({ success: false, error: 'Forbidden origin.' }, 403);
  }

  let body: { dataUrl?: string; fileName?: string; mimeType?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400);
  }

  if (!body.dataUrl || typeof body.dataUrl !== 'string') {
    return json({ success: false, error: 'Missing dataUrl.' }, 400);
  }
  if (!body.fileName || typeof body.fileName !== 'string') {
    return json({ success: false, error: 'Missing fileName.' }, 400);
  }
  if (!body.dataUrl.startsWith('data:')) {
    return json({ success: false, error: 'dataUrl must be a base64 data URL.' }, 400);
  }

  let blob: Blob, mime: string;
  try {
    const r = dataUrlToBlob(body.dataUrl);
    blob = r.blob;
    mime = body.mimeType || r.mime;
  } catch (err: any) {
    return json(
      { success: false, error: 'Could not decode data URL: ' + (err?.message || err) },
      400
    );
  }

  if (blob.size > MAX_BYTES) {
    return json(
      {
        success: false,
        error: `File is ${Math.round(blob.size / 1024 / 1024)} MB which exceeds the ${
          MAX_BYTES / 1024 / 1024
        } MB upload ceiling.`,
      },
      413
    );
  }

  // Try the @wix/media SDK in the order most-likely-to-work-first.
  // We expose every error message we encounter so the client can show
  // the real failure instead of silently falling back to broken base64.
  const tried: string[] = [];

  try {
    const wixMedia: any = await import('@wix/media').catch(() => null);
    if (!wixMedia) {
      return json(
        {
          success: false,
          error: '@wix/media SDK is not available in this build.',
          tried,
        },
        500
      );
    }

    const filesApi = wixMedia.files || wixMedia.default?.files || wixMedia;

    // Strategy 1: uploadFile (legacy / Velo-style)
    if (typeof filesApi.uploadFile === 'function') {
      tried.push('uploadFile');
      try {
        const result = await filesApi.uploadFile({
          mimeType: mime,
          fileName: body.fileName,
          file: blob,
          parentFolderId: 'media-root',
        });
        const url = result?.file?.url || result?.fileUrl || result?.url;
        const mediaId =
          result?.file?.id || result?.file?._id || result?._id || result?.id;
        if (url) return json({ success: true, url, mediaId, method: 'uploadFile' }, 200);
      } catch (e: any) {
        tried.push('uploadFile-failed: ' + (e?.message || String(e)));
      }
    }

    // Strategy 2: importFile (newer SDK pattern - takes a URL, not a blob)
    // We can't use this directly with a blob, skip.

    // Strategy 3: generateFileUploadUrl + manual PUT/POST
    if (typeof filesApi.generateFileUploadUrl === 'function') {
      tried.push('generateFileUploadUrl');
      try {
        const presigned = await filesApi.generateFileUploadUrl({
          mimeType: mime,
          fileName: body.fileName,
        });
        const uploadUrl = presigned?.uploadUrl || presigned?.url;
        if (!uploadUrl) {
          tried.push('generateFileUploadUrl-no-url');
        } else {
          // Wix presigned URLs typically accept a PUT with the raw blob.
          // Try PUT first; fall back to POST if that fails.
          let uploaded: Response | null = null;
          try {
            uploaded = await fetch(uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': mime },
              body: blob,
            });
          } catch (e: any) {
            tried.push('PUT-fetch-failed: ' + (e?.message || e));
          }
          if (!uploaded || !uploaded.ok) {
            // Try POST with FormData as fallback
            try {
              const fd = new FormData();
              fd.append('file', blob, body.fileName);
              uploaded = await fetch(uploadUrl, { method: 'POST', body: fd });
            } catch (e: any) {
              tried.push('POST-fetch-failed: ' + (e?.message || e));
            }
          }
          if (uploaded && uploaded.ok) {
            const data = await uploaded.json().catch(() => ({} as any));
            const url = data?.file?.url || data?.fileUrl || data?.url;
            const mediaId =
              data?.file?.id || data?.file?._id || data?._id || data?.id;
            if (url) {
              return json(
                { success: true, url, mediaId, method: 'generateFileUploadUrl' },
                200
              );
            }
            tried.push('upload-response-no-url');
          } else if (uploaded) {
            tried.push(`upload-http-${uploaded.status}`);
          }
        }
      } catch (e: any) {
        tried.push('generateFileUploadUrl-failed: ' + (e?.message || String(e)));
      }
    }

    return json(
      {
        success: false,
        error:
          'Could not upload to Wix Media. SDK call paths attempted: ' +
          tried.join(' | '),
        tried,
      },
      500
    );
  } catch (err: any) {
    return json(
      {
        success: false,
        error: err?.message || String(err),
        tried,
      },
      500
    );
  }
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
