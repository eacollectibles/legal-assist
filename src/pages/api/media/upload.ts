import type { APIRoute } from 'astro';
// Static imports for the Wix SDK. We deliberately avoid
// `Function('return import')()` because Cloudflare Workers blocks
// "Code generation from strings", which makes the dynamic-import
// trick throw at runtime with no useful error. Static imports get
// bundled at build time so the worker can use them directly.
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { files as wixFiles } from '@wix/media';

/**
 * POST /api/media/upload
 *
 * Server-side Wix Media upload using the Wix SDK's ApiKeyStrategy.
 *
 * Why an API key (and not just the auto-injected server auth that
 * `@wix/data` enjoys): `@wix/media`'s upload endpoints require
 * `SITE_MEDIA.MANAGE` scope, which is NOT granted to the default
 * visitor-context client. Without a key, generateFileUploadUrl()
 * returns HTTP 429 "UNKNOWN" (Wix's polite way of saying "you have
 * no permission for this call").
 *
 * Configuration (Wix Secrets Manager):
 *   - LA_WIX_API_KEY: Wix API Key with "Manage Site Media" permission
 *   - LA_WIX_SITE_ID: this site's ID (UUID)
 *
 * Body: { dataUrl: string, fileName: string, mimeType?: string }
 * Returns: { success: true, url, mediaId } | { success: false, error }
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

/**
 * Read a secret value from the Cloudflare Workers env binding.
 *
 * On Cloudflare Workers (which is where Wix Astro deploys), the
 * `wix-secrets-backend` SDK can't be dynamically imported because the
 * runtime blocks `Function('return import')()` ("Code generation from
 * strings disallowed for this context"). The actual secrets live on
 * `locals.runtime.env` (the Cloudflare binding object) — that's where
 * Wix Secrets Manager values are injected at runtime, alongside
 * Cloudflare-defined bindings like ASSETS.
 *
 * The Square diagnose endpoint confirmed this: SQUARE_ACCESS_TOKEN
 * and our new LA_WIX_API_KEY / LA_WIX_SITE_ID all show up in
 * `locals.runtime.env`, but the dynamic-import path errors with
 * 'moduleLoadError: Code generation from strings disallowed'.
 */
function getSecretValue(locals: any, name: string): string {
  const env =
    locals?.runtime?.env ||
    locals?.env ||
    (typeof process !== 'undefined' ? (process as any).env : null);
  if (env && typeof env[name] === 'string' && env[name]) return env[name];
  // Last-ditch: import.meta.env for local dev (.env.local).
  // @ts-expect-error import.meta.env is dynamic
  return (import.meta.env?.[name] as string | undefined) || '';
}

export const POST: APIRoute = async ({ request, locals }) => {
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

  const apiKey = getSecretValue(locals, 'LA_WIX_API_KEY');
  const siteId = getSecretValue(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) {
    return json(
      {
        success: false,
        error:
          'Wix Media credentials not configured. Add LA_WIX_API_KEY and LA_WIX_SITE_ID to Wix Secrets Manager.',
      },
      500
    );
  }

  const tried: string[] = [];

  try {
    // SDK modules are imported statically at the top of this file.
    // Sanity-check that the bundler didn't drop them.
    if (!createClient || !ApiKeyStrategy || !wixFiles) {
      return json(
        {
          success: false,
          error:
            'Wix SDK modules unavailable (createClient/ApiKeyStrategy/files).',
        },
        500
      );
    }

    const wixClient = createClient({
      modules: { files: wixFiles },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });

    tried.push('generateFileUploadUrl');
    // Signature: generateFileUploadUrl(mimeType, options) — mimeType
    // is a positional first argument, NOT a field on the options
    // object. Passing { mimeType, fileName } as one object made the
    // SDK forward an empty mimeType and Wix returned HTTP 400 UNKNOWN.
    const presigned: any = await wixClient.files.generateFileUploadUrl(
      mime,
      {
        fileName: body.fileName,
        sizeInBytes: String(blob.size),
      }
    );
    const uploadUrl: string | undefined =
      presigned?.uploadUrl || presigned?.url;
    if (!uploadUrl) {
      return json(
        {
          success: false,
          error: 'generateFileUploadUrl returned no upload URL.',
          tried,
          presignedKeys: presigned ? Object.keys(presigned) : [],
        },
        500
      );
    }

    // Wix presigned URLs accept a POST with multipart/form-data
    // (field name: "file"). The response is JSON describing the
    // newly-uploaded file.
    tried.push('POST upload');
    const fd = new FormData();
    fd.append('file', blob, body.fileName);
    const uploaded = await fetch(uploadUrl, { method: 'POST', body: fd });
    if (!uploaded.ok) {
      const text = await uploaded.text().catch(() => '');
      return json(
        {
          success: false,
          error: `Upload POST failed HTTP ${uploaded.status}: ${text.slice(0, 300)}`,
          tried,
        },
        500
      );
    }

    const data: any = await uploaded.json().catch(() => ({}));
    // Wix's V3 upload responses come back as { file: { ... } } or
    // { files: [{ ... }] } depending on the endpoint variant. Be
    // permissive about the shape.
    const fileObj =
      data?.file || (Array.isArray(data?.files) ? data.files[0] : null) || data;
    const url: string | undefined =
      fileObj?.url || fileObj?.fileUrl || fileObj?.mediaUrl;
    const mediaId: string | undefined =
      fileObj?.id || fileObj?._id || fileObj?.fileId;
    if (url) {
      return json({ success: true, url, mediaId, method: 'apikey-presigned' }, 200);
    }
    return json(
      {
        success: false,
        error: 'Upload succeeded but response had no file URL.',
        tried,
        responseKeys: data ? Object.keys(data) : [],
      },
      500
    );
  } catch (err: any) {
    const msg =
      err?.message ||
      (typeof err === 'object' ? JSON.stringify(err).slice(0, 500) : String(err));
    return json({ success: false, error: msg, tried }, 500);
  }
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
