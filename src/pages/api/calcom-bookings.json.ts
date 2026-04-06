import type { APIRoute } from 'astro';
import { fetchCalComBookings } from '@/lib/calcom-service';

/**
 * Server-side API endpoint: GET /api/calcom-bookings.json
 * Fetches bookings from Cal.com and returns them in our appointment format.
 * The API key is kept server-side for security.
 *
 * Key lookup order:
 * 1. Wix Secrets Manager (production) — secret name: "CALCOM_API_KEY"
 * 2. Environment variable via import.meta.env (local dev .env.local)
 */
async function getCalcomApiKey(): Promise<string> {
  // Try Wix Secrets Manager first (works in production)
  try {
    const { getSecret } = await import('wix-secrets-backend');
    const secret = await getSecret('CALCOM_API_KEY');
    if (secret) return secret;
  } catch {
    // wix-secrets-backend not available (local dev) — fall through
  }

  // Fallback to environment variable (local dev)
  return import.meta.env.CALCOM_API_KEY || '';
}

export const GET: APIRoute = async () => {
  try {
    const apiKey = await getCalcomApiKey();

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Cal.com API key not configured. Add CALCOM_API_KEY to Wix Secrets Manager (production) or .env.local (local development).',
          bookings: [],
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const bookings = await fetchCalComBookings(apiKey);

    return new Response(
      JSON.stringify({
        success: true,
        bookings,
        count: bookings.length,
        fetchedAt: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Cal.com bookings API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Failed to fetch Cal.com bookings',
        bookings: [],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
