import type { APIRoute } from 'astro';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { files as wixFiles } from '@wix/media';
import { checkOrigin, getSecret, json } from '@/lib/chat-server';

/**
 * POST /api/chat/upload-url
 *
 * Mints a signed Wix Media upload URL the chat widget can PUT
 * a file to directly. Used by BOTH the client bubble (paperclip
 * → file picker) and the paralegal Live Chat tab.
 *
 * Body: { mimeType, fileName }
 * Response: { uploadUrl, mediaUrl, fileId } — caller PUTs the
 *           file bytes to `uploadUrl`, then sends a chat message
 *           with attachmentUrl=mediaUrl.
 *
 * Same security envelope as the retainer Wix Media uploader:
 * size caps enforced by Wix on the PUT response, mime types
 * restricted to images and PDF on this endpoint.
 */

const ALLOWED_MIMES = new Set([
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic',
  'application/pdf',
]);
const MAX_SIZE_MB = 10;

export const POST: APIRoute = async ({ request, locals }) => {
  if (!checkOrigin(request)) return json({ error: 'forbidden' }, 403);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'invalid body' }, 400); }

  const mimeType = String(body?.mimeType || '').toLowerCase();
  const fileName = String(body?.fileName || 'attachment').slice(0, 200);
  if (!mimeType || !ALLOWED_MIMES.has(mimeType)) {
    return json({ error: 'unsupported mime type' }, 400);
  }

  const apiKey = getSecret(locals, 'LA_WIX_API_KEY');
  const siteId = getSecret(locals, 'LA_WIX_SITE_ID');
  if (!apiKey || !siteId) return json({ error: 'not configured' }, 200);

  try {
    const wixClient = createClient({
      modules: { files: wixFiles },
      auth: ApiKeyStrategy({ apiKey, siteId }),
    });
    // Positional args: see existing usage in src/pages/api/sign/upload-token.ts
    const r: any = await wixClient.files.generateFileUploadUrl(
      mimeType,
      {
        fileName,
        parentFolderId: 'chat-attachments',
        sizeInBytes: MAX_SIZE_MB * 1024 * 1024,
      },
    );
    return json({
      uploadUrl: r?.uploadUrl || '',
      // The eventual public URL is returned post-upload; for v1 we
      // ask the caller to send the upload's response back as the
      // attachmentUrl.
    });
  } catch (err: any) {
    return json({ error: err?.message || 'upload-url failed' });
  }
};
