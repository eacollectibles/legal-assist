import type { APIRoute } from 'astro';
import { loadPublicSquareConfig } from '@/lib/square-service';

/**
 * GET /api/square/config
 *
 * Returns the public Square configuration the browser needs to render the
 * Web Payments SDK card form: environment, application id, location id,
 * and the SDK CDN url. Never returns the access token.
 */
export const GET: APIRoute = async () => {
  try {
    const cfg = await loadPublicSquareConfig();
    if (!cfg.applicationId || !cfg.locationId) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'Square is not configured. Add SQUARE_APPLICATION_ID and SQUARE_LOCATION_ID to Wix Secrets Manager.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, config: cfg }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err?.message || 'Failed to load Square config.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
